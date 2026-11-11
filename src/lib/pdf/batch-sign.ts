import { applyOverlays, type PdfOverlay } from "@/lib/pdf/overlays";
import { pickPdfFile } from "@/lib/pdf/pick-pdf";

export function pickPdfFiles(files: File[]): File[] {
  return files.filter((file) => pickPdfFile([file]));
}

export async function signPdfFiles(
  files: File[],
  overlay: Omit<PdfOverlay, "id" | "pageIndex">,
): Promise<{ name: string; bytes: Uint8Array }[]> {
  const results: { name: string; bytes: Uint8Array }[] = [];

  for (const file of files) {
    const fullOverlay: PdfOverlay = {
      ...overlay,
      id: crypto.randomUUID(),
      pageIndex: 0,
    };
    const bytes = await applyOverlays(file, [fullOverlay]);
    const base = file.name.replace(/\.pdf$/i, "");
    results.push({ name: `${base}-signed.pdf`, bytes });
  }

  return results;
}
