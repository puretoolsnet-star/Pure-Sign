import type { Worker } from "tesseract.js";
import type { Locale } from "@/i18n/locales";
import { loadPdfJs, openPdfDocument } from "@/lib/pdf/pdfjs-client";

export type RelativeRect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

type PositionedChar = {
  str: string;
  x: number;
  y: number;
  width: number;
  height: number;
};

const LOCALE_OCR: Record<Locale, string> = {
  en: "eng",
  uk: "ukr",
  de: "deu",
  es: "spa",
  fr: "fra",
  pl: "pol",
};

export type ExtractProgress = {
  phase: "reading" | "ocr";
  /** 0–1 for the current operation */
  progress: number;
  page?: number;
  pageCount?: number;
};

function hasMeaningfulText(text: string): boolean {
  return text.replace(/\s+/g, " ").trim().length >= 2;
}

function formatPageBlock(pageNumber: number, body: string): string {
  const trimmed = body.replace(/\s+/g, " ").trim();
  if (!trimmed) return `--- ${pageNumber} ---`;
  return `--- ${pageNumber} ---\n${trimmed}`;
}

async function positionedTextOnPage(
  file: File,
  pageNumber: number,
): Promise<{ items: PositionedChar[] }> {
  const pdf = await openPdfDocument(file);
  const pdfjs = await loadPdfJs();
  try {
    const page = await pdf.getPage(pageNumber);
    const viewport = page.getViewport({ scale: 1 });
    const content = await page.getTextContent();
    const items: PositionedChar[] = [];
    for (const raw of content.items) {
      if (!("str" in raw) || !raw.str) continue;
      const matrix = pdfjs.Util.transform(viewport.transform, raw.transform);
      const fontHeight = Math.hypot(matrix[2], matrix[3]) || 12;
      const width =
        raw.width > 0
          ? raw.width / viewport.width
          : (fontHeight * 0.55 * raw.str.length) / viewport.width;
      const x = matrix[4] / viewport.width;
      const top = (matrix[5] - fontHeight) / viewport.height;
      const y = 1 - top - fontHeight / viewport.height;
      items.push({
        str: raw.str,
        x,
        y: Math.max(0, y),
        width: Math.max(width, 0.001),
        height: Math.max(fontHeight / viewport.height, 0.001),
      });
    }
    return { items };
  } finally {
    await pdf.destroy();
  }
}

function rectsIntersect(a: RelativeRect, b: PositionedChar): boolean {
  const ax2 = a.x + a.width;
  const ay2 = a.y + a.height;
  const bx2 = b.x + b.width;
  const by2 = b.y + b.height;
  return b.x < ax2 && bx2 > a.x && b.y < ay2 && by2 > a.y;
}

function joinPositionedItems(items: PositionedChar[]): string {
  if (items.length === 0) return "";
  const sorted = [...items].sort((left, right) => {
    const row = left.y - right.y;
    if (Math.abs(row) > 0.012) return row;
    return left.x - right.x;
  });
  const lines: string[] = [];
  let current = "";
  let lastY = sorted[0].y;
  for (const item of sorted) {
    if (Math.abs(item.y - lastY) > 0.018 && current) {
      lines.push(current.replace(/\s+/g, " ").trim());
      current = item.str;
      lastY = item.y;
      continue;
    }
    current = current ? `${current} ${item.str}` : item.str;
    lastY = item.y;
  }
  if (current) lines.push(current.replace(/\s+/g, " ").trim());
  return lines.join("\n");
}

async function textLayerFromPage(
  file: File,
  pageNumber: number,
  region?: RelativeRect | null,
): Promise<string> {
  const { items } = await positionedTextOnPage(file, pageNumber);
  const filtered = region ? items.filter((item) => rectsIntersect(region, item)) : items;
  return joinPositionedItems(filtered);
}

export async function extractPdfText(file: File): Promise<{
  text: string;
  pages: number;
}> {
  const pdf = await openPdfDocument(file);
  const pages = pdf.numPages;
  await pdf.destroy();
  const chunks: string[] = [];
  for (let pageNumber = 1; pageNumber <= pages; pageNumber += 1) {
    const body = await textLayerFromPage(file, pageNumber);
    chunks.push(formatPageBlock(pageNumber, body));
  }
  return {
    text: chunks.join("\n\n").trim(),
    pages,
  };
}

export async function extractPdfPageText(file: File, pageIndex: number): Promise<string> {
  return textLayerFromPage(file, pageIndex + 1);
}

export async function extractPdfRegionText(
  file: File,
  pageIndex: number,
  region: RelativeRect,
): Promise<string> {
  return textLayerFromPage(file, pageIndex + 1, region);
}

async function pageCanvas(
  file: File,
  pageNumber: number,
  region: RelativeRect | null,
  scale = 2.2,
): Promise<HTMLCanvasElement> {
  const pdf = await openPdfDocument(file);
  try {
    const page = await pdf.getPage(pageNumber);
    const viewport = page.getViewport({ scale });
    const canvas = document.createElement("canvas");
    canvas.width = Math.floor(viewport.width);
    canvas.height = Math.floor(viewport.height);
    const context = canvas.getContext("2d");
    if (!context) throw new Error("Canvas not available");
    await page.render({ canvas, canvasContext: context, viewport }).promise;

    if (!region || region.width < 0.01 || region.height < 0.01) {
      return canvas;
    }

    const sx = Math.max(0, Math.floor(region.x * canvas.width));
    const sy = Math.max(0, Math.floor(region.y * canvas.height));
    const sw = Math.min(canvas.width - sx, Math.floor(region.width * canvas.width));
    const sh = Math.min(canvas.height - sy, Math.floor(region.height * canvas.height));
    if (sw < 8 || sh < 8) return canvas;

    const cropped = document.createElement("canvas");
    cropped.width = sw;
    cropped.height = sh;
    const cropCtx = cropped.getContext("2d");
    if (!cropCtx) return canvas;
    cropCtx.drawImage(canvas, sx, sy, sw, sh, 0, 0, sw, sh);
    return cropped;
  } finally {
    await pdf.destroy();
  }
}

async function createOcrWorker(
  locale: Locale,
  onRecognizeProgress?: (progress: number) => void,
): Promise<Worker> {
  const { createWorker } = await import("tesseract.js");
  const lang = `${LOCALE_OCR[locale]}+eng`;
  return createWorker(lang, 1, {
    logger: (message) => {
      if (message.status === "recognizing text") {
        onRecognizeProgress?.(message.progress);
      }
    },
  });
}

export async function ocrPdfPage(
  file: File,
  pageIndex: number,
  _locale: Locale,
  region: RelativeRect | null,
  worker: Worker,
): Promise<string> {
  const canvas = await pageCanvas(file, pageIndex + 1, region, 2.2);
  const result = await worker.recognize(canvas);
  return result.data.text.replace(/\r\n/g, "\n").trim();
}

export async function extractWithFallback(
  file: File,
  locale: Locale,
  mode: "all" | "page" | "region",
  pageIndex: number,
  region: RelativeRect | null,
  onProgress?: (progress: ExtractProgress) => void,
): Promise<{ text: string; pages: number; usedOcr: boolean; source: "text-layer" | "ocr" }> {
  onProgress?.({ phase: "reading", progress: 0 });

  const pdf = await openPdfDocument(file);
  const pageCount = pdf.numPages;
  await pdf.destroy();

  if (mode === "page") {
    let text = await extractPdfPageText(file, pageIndex);
    if (hasMeaningfulText(text)) {
      onProgress?.({ phase: "reading", progress: 1 });
      return { text, pages: 1, usedOcr: false, source: "text-layer" };
    }
    onProgress?.({ phase: "ocr", progress: 0, page: pageIndex + 1, pageCount: 1 });
    const worker = await createOcrWorker(locale, (p) => {
      onProgress?.({ phase: "ocr", progress: p, page: pageIndex + 1, pageCount: 1 });
    });
    try {
      text = await ocrPdfPage(file, pageIndex, locale, null, worker);
    } finally {
      await worker.terminate();
    }
    return { text: text || "", pages: 1, usedOcr: true, source: "ocr" };
  }

  if (mode === "region") {
    if (!region || region.width < 0.01 || region.height < 0.01) {
      return { text: "", pages: 1, usedOcr: false, source: "text-layer" };
    }
    let text = await extractPdfRegionText(file, pageIndex, region);
    if (hasMeaningfulText(text)) {
      onProgress?.({ phase: "reading", progress: 1 });
      return { text, pages: 1, usedOcr: false, source: "text-layer" };
    }
    onProgress?.({ phase: "ocr", progress: 0, page: pageIndex + 1, pageCount: 1 });
    const worker = await createOcrWorker(locale, (p) => {
      onProgress?.({ phase: "ocr", progress: p, page: pageIndex + 1, pageCount: 1 });
    });
    try {
      text = await ocrPdfPage(file, pageIndex, locale, region, worker);
    } finally {
      await worker.terminate();
    }
    return { text: text || "", pages: 1, usedOcr: true, source: "ocr" };
  }

  const chunks: string[] = [];
  let anyText = false;
  for (let pageNumber = 1; pageNumber <= pageCount; pageNumber += 1) {
    onProgress?.({
      phase: "reading",
      progress: pageNumber / pageCount,
      page: pageNumber,
      pageCount,
    });
    const body = await textLayerFromPage(file, pageNumber);
    if (hasMeaningfulText(body)) anyText = true;
    chunks.push(formatPageBlock(pageNumber, body));
  }

  if (anyText) {
    return {
      text: chunks.join("\n\n").trim(),
      pages: pageCount,
      usedOcr: false,
      source: "text-layer",
    };
  }

  const ocrChunks: string[] = [];
  let ocrPageBase = 0;
  const worker = await createOcrWorker(locale, (p) => {
    onProgress?.({
      phase: "ocr",
      progress: ocrPageBase + p / pageCount,
      page: Math.min(pageCount, Math.floor(ocrPageBase * pageCount) + 1),
      pageCount,
    });
  });
  try {
    for (let pageNumber = 1; pageNumber <= pageCount; pageNumber += 1) {
      ocrPageBase = (pageNumber - 1) / pageCount;
      onProgress?.({
        phase: "ocr",
        progress: ocrPageBase,
        page: pageNumber,
        pageCount,
      });
      const body = await ocrPdfPage(file, pageNumber - 1, locale, null, worker);
      ocrChunks.push(formatPageBlock(pageNumber, body));
    }
  } finally {
    await worker.terminate();
  }

  return {
    text: ocrChunks.join("\n\n").trim(),
    pages: pageCount,
    usedOcr: true,
    source: "ocr",
  };
}