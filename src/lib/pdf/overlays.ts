import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

export type OverlayKind = "image" | "text" | "rect";

export type PdfOverlay = {
  id: string;
  pageIndex: number;
  kind: OverlayKind;
  /** Relative 0–1 coordinates from the top-left of the page. */
  x: number;
  y: number;
  width: number;
  height: number;
  bytes?: Uint8Array;
  dataUrl?: string;
  text?: string;
  color?: string;
};

function hexToRgb(hex: string) {
  const value = hex.replace("#", "");
  const int = Number.parseInt(value.length === 3 ? value.repeat(2) : value, 16);
  return {
    r: ((int >> 16) & 255) / 255,
    g: ((int >> 8) & 255) / 255,
    b: (int & 255) / 255,
  };
}

async function dataUrlToBytes(dataUrl: string): Promise<Uint8Array> {
  const response = await fetch(dataUrl);
  return new Uint8Array(await response.arrayBuffer());
}

export async function applyOverlays(
  file: File,
  overlays: PdfOverlay[],
): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.load(await file.arrayBuffer(), {
    ignoreEncryption: true,
  });
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const pages = pdfDoc.getPages();

  for (const overlay of overlays) {
    const page = pages[overlay.pageIndex];
    if (!page) continue;
    const { width: pageWidth, height: pageHeight } = page.getSize();
    const width = overlay.width * pageWidth;
    const height = overlay.height * pageHeight;
    const x = overlay.x * pageWidth;
    const y = pageHeight - overlay.y * pageHeight - height;

    if (overlay.kind === "image") {
      const bytes =
        overlay.bytes ??
        (overlay.dataUrl ? await dataUrlToBytes(overlay.dataUrl) : null);
      if (!bytes) continue;
      const image = await pdfDoc.embedPng(bytes);
      page.drawImage(image, { x, y, width, height });
      continue;
    }

    if (overlay.kind === "text" && overlay.text) {
      const size = Math.max(8, height * 0.72);
      const tint = overlay.color
        ? hexToRgb(overlay.color)
        : { r: 0.07, g: 0.09, b: 0.15 };
      page.drawText(overlay.text, {
        x: x + 2,
        y: y + height * 0.22,
        size,
        font,
        color: rgb(tint.r, tint.g, tint.b),
      });
      continue;
    }

    if (overlay.kind === "rect") {
      page.drawRectangle({
        x,
        y,
        width,
        height,
        color: rgb(0, 0, 0),
        borderColor: rgb(0, 0, 0),
        borderWidth: 0,
      });
    }
  }

  return pdfDoc.save();
}

export function createOverlayId() {
  return crypto.randomUUID();
}
