import { applyOverlays, type PdfOverlay } from "@/lib/pdf/overlays";
import { openPdfDocument } from "@/lib/pdf/pdfjs-client";
import { pickPdfFile } from "@/lib/pdf/pick-pdf";

export function pickPdfFiles(files: File[]): File[] {
  return files.filter((file) => pickPdfFile([file]));
}

export type BatchPageTarget =
  | { mode: "first" }
  | { mode: "last" }
  | { mode: "page"; pageNumber: number };

export type BatchSignProgress = {
  index: number;
  total: number;
  fileName: string;
  status: "signing" | "ok" | "failed";
};

export type BatchSignFailureCode = "invalid" | "protected" | "corrupt" | "page";

export type BatchSignedEntry = { name: string; bytes: Uint8Array };

export type BatchSignFailure = {
  name: string;
  code: BatchSignFailureCode;
};

export type BatchSignOutcome = {
  signed: BatchSignedEntry[];
  failed: BatchSignFailure[];
};

async function resolvePageIndex(file: File, target: BatchPageTarget): Promise<number> {
  const pdf = await openPdfDocument(file);
  try {
    const count = pdf.numPages;
    if (target.mode === "first") return 0;
    if (target.mode === "last") return Math.max(0, count - 1);
    const wanted = Math.max(1, Math.floor(target.pageNumber));
    return Math.min(count - 1, wanted - 1);
  } finally {
    await pdf.destroy();
  }
}

function classifyError(error: unknown): BatchSignFailureCode {
  const message =
    error instanceof Error ? error.message.toLowerCase() : String(error).toLowerCase();
  if (message.includes("password") || message.includes("encrypt")) {
    return "protected";
  }
  if (message.includes("invalid") || message.includes("parse") || message.includes("xref")) {
    return "corrupt";
  }
  return "corrupt";
}

export async function signPdfFiles(
  files: File[],
  overlay: Omit<PdfOverlay, "id" | "pageIndex">,
  pageTarget: BatchPageTarget,
  onProgress?: (progress: BatchSignProgress) => void,
): Promise<BatchSignOutcome> {
  const signed: BatchSignedEntry[] = [];
  const failed: BatchSignFailure[] = [];

  for (let index = 0; index < files.length; index += 1) {
    const file = files[index];
    onProgress?.({
      index: index + 1,
      total: files.length,
      fileName: file.name,
      status: "signing",
    });

    try {
      const pageIndex = await resolvePageIndex(file, pageTarget);
      const fullOverlay: PdfOverlay = {
        ...overlay,
        id: crypto.randomUUID(),
        pageIndex,
      };
      const bytes = await applyOverlays(file, [fullOverlay]);
      const base = file.name.replace(/\.pdf$/i, "");
      signed.push({ name: `${base}-signed.pdf`, bytes });
      onProgress?.({
        index: index + 1,
        total: files.length,
        fileName: file.name,
        status: "ok",
      });
    } catch (error) {
      failed.push({ name: file.name, code: classifyError(error) });
      onProgress?.({
        index: index + 1,
        total: files.length,
        fileName: file.name,
        status: "failed",
      });
    }
  }

  return { signed, failed };
}

export function defaultBatchZipName(): string {
  const stamp = new Date().toISOString().slice(0, 10);
  return `puresign-batch-${stamp}.zip`;
}