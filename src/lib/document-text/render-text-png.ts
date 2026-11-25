import { canvasFontForId, type DocumentTextFontId } from "@/lib/document-text/fonts";
import { overlaySizeFromImage } from "@/lib/pdf/pick-pdf";

export async function renderDocumentTextPng(options: {
  text: string;
  color: string;
  fontId: DocumentTextFontId;
}) {
  const { text, color, fontId } = options;
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas is not available.");

  const font = canvasFontForId(fontId);
  ctx.font = font;
  const metrics = ctx.measureText(text);
  const padX = 12;
  const padY = 10;
  canvas.width = Math.ceil(metrics.width + padX * 2);
  canvas.height = Math.ceil(62 + padY * 2);

  ctx.font = font;
  ctx.fillStyle = color;
  ctx.textBaseline = "middle";
  ctx.textAlign = "left";
  ctx.fillText(text, padX, canvas.height / 2);

  return canvas.toDataURL("image/png");
}

function loadImageSize(src: string) {
  return new Promise<{ width: number; height: number }>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve({ width: image.width, height: image.height });
    image.onerror = () => reject(new Error("image"));
    image.src = src;
  });
}

export async function textOverlayDimensionsForWidth(
  dataUrl: string,
  pageWidth: number,
  pageHeight: number,
  relativeWidth: number,
) {
  const image = await loadImageSize(dataUrl);
  return overlaySizeFromImage(
    image.width,
    image.height,
    pageWidth,
    pageHeight,
    relativeWidth,
  );
}