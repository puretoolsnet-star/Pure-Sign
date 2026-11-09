import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

export type PageNumberPosition =
  | "header-left"
  | "header-center"
  | "header-right"
  | "footer-left"
  | "footer-center"
  | "footer-right";

export type PageNumberFormat = "simple" | "of" | "page-of";

export async function addPageNumbers(
  file: File,
  options: {
    position: PageNumberPosition;
    format: PageNumberFormat;
    fontSize: number;
    margin: number;
    pageOfTemplate: (current: number, total: number) => string;
  },
): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.load(await file.arrayBuffer(), {
    ignoreEncryption: true,
  });
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const pages = pdfDoc.getPages();
  const total = pages.length;
  const { position, format, fontSize, margin, pageOfTemplate } = options;

  pages.forEach((page, index) => {
    const current = index + 1;
    const label =
      format === "simple"
        ? String(current)
        : format === "of"
          ? `${current} / ${total}`
          : pageOfTemplate(current, total);

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
      color: rgb(0.15, 0.18, 0.25),
    });
  });

  return pdfDoc.save();
}
