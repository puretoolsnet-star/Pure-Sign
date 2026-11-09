export function pickPdfFile(files: File[]): File | null {
  return (
    files.find(
      (file) =>
        file.type === "application/pdf" ||
        file.name.toLowerCase().endsWith(".pdf"),
    ) ?? null
  );
}

export function overlaySizeFromImage(
  imageWidth: number,
  imageHeight: number,
  pageWidth: number,
  pageHeight: number,
  relativeWidth: number,
) {
  const aspect = imageWidth / Math.max(imageHeight, 1);
  const width = relativeWidth;
  const height = (relativeWidth / aspect) * (pageWidth / Math.max(pageHeight, 1));
  return { width, height };
}

export function clampOverlay(
  x: number,
  y: number,
  width: number,
  height: number,
) {
  return {
    x: Math.min(Math.max(x, 0), Math.max(1 - width, 0)),
    y: Math.min(Math.max(y, 0), Math.max(1 - height, 0)),
    width: Math.min(width, 1),
    height: Math.min(height, 1),
  };
}
