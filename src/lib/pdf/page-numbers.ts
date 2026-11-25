import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

import {
  estimateTextWidthPt,
  formatPageNumberLabel,
  hexToPdfRgb,
  resolveDisplayedPageNumbers,
  type PageNumberFontId,
} from "@/lib/pdf/page-number-layout";

export type PageNumberPosition =
  | "header-left"
  | "header-center"
  | "header-right"
  | "footer-left"
  | "footer-center"
  | "footer-right";

export type PageNumberFormat = "simple" | "of" | "page-of";

function standardFont(id: PageNumberFontId) {
  if (id === "serif") return StandardFonts.TimesRoman;
  if (id === "mono") return StandardFonts.Courier;
  if (id === "script") return StandardFonts.HelveticaOblique;
  return StandardFonts.Helvetica;
}

export async function addPageNumbers(
  file: File,
  options: {
    position: PageNumberPosition;
    format: PageNumberFormat;
    fontSize: number;
    margin: number;
    color: string;
    fontId: PageNumberFontId;
    skipFirstPage: boolean;
    startNumber: number;
    pageOfTemplate: (current: number, total: number) => string;
  },
): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.load(await file.arrayBuffer(), {
    ignoreEncryption: true,
  });
  const font = await pdfDoc.embedFont(standardFont(options.fontId));
  const pages = pdfDoc.getPages();
  const numPages = pages.length;
  const tint = hexToPdfRgb(options.color);
  const startNumber = Math.max(1, Math.floor(options.startNumber));

  pages.forEach((page, index) => {
    const resolved = resolveDisplayedPageNumbers(
      index,
      numPages,
      startNumber,
      options.skipFirstPage,
    );
    if (!resolved) return;

    const label = formatPageNumberLabel(
      options.format,
      resolved.display,
      resolved.totalNumbered,
      options.pageOfTemplate,
    );
    const { position, fontSize, margin } = options;
    const { width, height } = page.getSize();
    const textWidth = font.widthOfTextAtSize(label, fontSize);
    const isHeader = position.startsWith("header");
    const y = isHeader ? height - margin - fontSize : margin;
    let x = margin;
    if (position.endsWith("center")) x = (width - textWidth) / 2;
    if (position.endsWith("right")) x = width - margin - textWidth;

    page.drawText(label, {
      x,
      y,
      size: fontSize,
      font,
      color: rgb(tint.r, tint.g, tint.b),
    });
  });

  return pdfDoc.save();
}

export { estimateTextWidthPt, formatPageNumberLabel };