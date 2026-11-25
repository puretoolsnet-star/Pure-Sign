export type DocumentKind = "pdf" | "image";

export function pickSignableFile(files: File[]): File | null {
  return (
    files.find((file) => {
      const name = file.name.toLowerCase();
      return (
        file.type === "application/pdf" ||
        name.endsWith(".pdf") ||
        file.type.startsWith("image/") ||
        /\.(png|jpe?g|webp)$/i.test(name)
      );
    }) ?? null
  );
}

export function documentKind(file: File): DocumentKind {
  const name = file.name.toLowerCase();
  if (file.type === "application/pdf" || name.endsWith(".pdf")) return "pdf";
  return "image";
}