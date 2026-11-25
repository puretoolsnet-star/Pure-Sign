"use client";

import { Eraser } from "lucide-react";
import { useCallback, useState } from "react";

import { RedactWorkspace } from "@/components/tools/redact/RedactWorkspace";
import { FileDropzone } from "@/components/tools/FileDropzone";
import { ToolShell } from "@/components/tools/ToolShell";
import { useI18n } from "@/i18n/context";
import { downloadBytes } from "@/lib/download";
import { useGuardedDownload } from "@/lib/use-guarded-download";
import { applyOverlays, type PdfOverlay } from "@/lib/pdf/overlays";
import { pickPdfFile } from "@/lib/pdf/pick-pdf";
import { usePdfPreview } from "@/lib/pdf/use-pdf-preview";

export function RedactTool() {
  const { t } = useI18n();
  const copy = t.tools.redact;
  const [file, setFile] = useState<File | null>(null);
  const [overlays, setOverlays] = useState<PdfOverlay[]>([]);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const preview = usePdfPreview(file);
  const { requestDownload, feedback } = useGuardedDownload();

  const addFile = useCallback(
    (files: File[]) => {
      const pdf = pickPdfFile(files);
      if (!pdf) {
        setError(copy.errors.invalid);
        return;
      }
      setError(null);
      setFile(pdf);
      setOverlays([]);
    },
    [copy.errors.invalid],
  );

  const download = async () => {
    if (!file || overlays.length === 0) return;
    setProcessing(true);
    setError(null);
    try {
      const bytes = await applyOverlays(file, overlays);
      downloadBytes(bytes, file.name.replace(/\.pdf$/i, "") + "-redacted.pdf");
    } catch {
      setError(copy.errors.failed);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <ToolShell toolId="redact" icon={Eraser}>
      <div className="min-w-0 space-y-4">
        {!file ? (
          <FileDropzone title={t.common.dropzoneTitle} hint={copy.hint} onFiles={addFile} />
        ) : (
          <>
            <RedactWorkspace
              pageImage={preview.pageImage}
              pageIndex={preview.pageIndex}
              numPages={preview.numPages}
              loading={preview.loading}
              onPageChange={preview.setPageIndex}
              overlays={overlays}
              setOverlays={setOverlays}
              onDownload={() => requestDownload(download)}
              downloading={processing}
              downloadLabel={copy.action}
            />
            <button
              type="button"
              className="btn-secondary w-full sm:w-auto"
              onClick={() => {
                setFile(null);
                setOverlays([]);
              }}
            >
              {t.common.clear}
            </button>
          </>
        )}
        {error && <p className="text-sm text-rose-400">{error}</p>}
        {feedback}
      </div>
    </ToolShell>
  );
}