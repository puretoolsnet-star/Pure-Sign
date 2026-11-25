import { formatDateStampText, type DateStampFormat } from "@/lib/date-stamp/format";
import { overlaySizeFromImage } from "@/lib/pdf/pick-pdf";
import { renderStampPng } from "@/lib/pdf/stamp-image";

function loadImageSize(src: string) {
  return new Promise<{ width: number; height: number }>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve({ width: image.width, height: image.height });
    image.onerror = () => reject(new Error("image"));
    image.src = src;
  });
}

export async function renderDateStampDataUrl(options: {
  instant: Date;
  format: DateStampFormat;
  color: string;
  locale: string;
}) {
  const text = formatDateStampText(options.instant, options.format, options.locale);
  return renderStampPng({ text, color: options.color });
}

export async function dateStampDimensionsForWidth(
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