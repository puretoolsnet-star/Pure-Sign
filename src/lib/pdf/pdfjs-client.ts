import type { PDFDocumentProxy } from "pdfjs-dist";

let workerConfigured = false;

export async function loadPdfJs() {
  const pdfjs = await import("pdfjs-dist");

  if (!workerConfigured && typeof window !== "undefined") {
    pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
    workerConfigured = true;
  }

  return pdfjs;
}

export async function openPdfDocument(file: File): Promise<PDFDocumentProxy> {
  const pdfjs = await loadPdfJs();
  const data = new Uint8Array(await file.arrayBuffer());
  const task = pdfjs.getDocument({ data });
  return task.promise;
}

export async function renderPdfPage(
  pdf: PDFDocumentProxy,
  pageNumber: number,
  scale = 1.6,
): Promise<{ dataUrl: string; width: number; height: number }> {
  const page = await pdf.getPage(pageNumber);
  const base = page.getViewport({ scale: 1 });
  const viewport = page.getViewport({ scale });
  const canvas = document.createElement("canvas");
  canvas.width = Math.floor(viewport.width);
  canvas.height = Math.floor(viewport.height);
  const context = canvas.getContext("2d");
  if (!context) {
    throw new Error("Canvas rendering is not available in this browser.");
  }

  await page.render({ canvas, canvasContext: context, viewport }).promise;

  return {
    dataUrl: canvas.toDataURL("image/png"),
    width: base.width,
    height: base.height,
  };
}
