import type { PageNumberFormat, PageNumberPosition } from "@/lib/pdf/page-numbers";
import type { DocumentTextFontId } from "@/lib/document-text/fonts";

export type PageNumberFontId = DocumentTextFontId;

/** Display values for page numbering (after skip-first and start offset). */
export function resolveDisplayedPageNumbers(
  pageIndex: number,
  numPages: number,
  startNumber: number,
  skipFirstPage: boolean,
): { display: number; totalNumbered: number } | null {
  if (numPages <= 0) return null;
  if (skipFirstPage && pageIndex === 0) return null;
  const totalNumbered = skipFirstPage ? Math.max(0, numPages - 1) : numPages;
  if (totalNumbered === 0) return null;
  const offset = skipFirstPage ? 1 : 0;
  const display = startNumber + pageIndex - offset;
  return { display, totalNumbered };
}

export function formatPageNumberLabel(
  format: PageNumberFormat,
  current: number,
  total: number,
  pageOfTemplate: (current: number, total: number) => string,
): string {
  if (format === "simple") return String(current);
  if (format === "of") return `${current} / ${total}`;
  return pageOfTemplate(current, total);
}

export function estimateTextWidthPt(label: string, fontSizePt: number): number {
  return label.length * fontSizePt * 0.52;
}

/** Relative box (0–1, origin top-left) for preview overlays on the page image. */
export function pageNumberRelativeBox(
  position: PageNumberPosition,
  marginPt: number,
  fontSizePt: number,
  textWidthPt: number,
  pageWidthPt: number,
  pageHeightPt: number,
): { x: number; y: number; width: number; height: number } {
  const isHeader = position.startsWith("header");
  const heightRel = Math.min(0.12, (fontSizePt * 1.35) / pageHeightPt);
  const widthRel = Math.min(0.45, textWidthPt / pageWidthPt);
  const marginX = marginPt / pageWidthPt;
  const marginY = marginPt / pageHeightPt;

  let x = marginX;
  if (position.endsWith("center")) x = 0.5 - widthRel / 2;
  if (position.endsWith("right")) x = 1 - marginX - widthRel;

  let y: number;
  if (isHeader) {
    y = marginY;
  } else {
    y = 1 - marginY - heightRel;
  }

  return {
    x: Math.max(0, Math.min(1 - widthRel, x)),
    y: Math.max(0, Math.min(1 - heightRel, y)),
    width: widthRel,
    height: heightRel,
  };
}

export function hexToPdfRgb(hex: string) {
  const value = hex.replace("#", "");
  const int = Number.parseInt(value.length === 3 ? value.repeat(2) : value, 16);
  return {
    r: ((int >> 16) & 255) / 255,
    g: ((int >> 8) & 255) / 255,
    b: (int & 255) / 255,
  };
}