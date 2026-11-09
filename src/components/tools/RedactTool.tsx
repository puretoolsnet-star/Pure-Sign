"use client";

import { Eraser, Loader2 } from "lucide-react";
import { useCallback, useState } from "react";

import { FileDropzone } from "@/components/tools/FileDropzone";
import { PdfPageCanvas } from "@/components/tools/PdfPageCanvas";
import { ToolShell } from "@/components/tools/ToolShell";
import { useI18n } from "@/i18n/context";
import { downloadBytes } from "@/lib/download";
import { useRewardedDownload } from "@/lib/use-rewarded-download";
import { applyOverlays, createOverlayId, type PdfOverlay } from "@/lib/pdf/overlays";
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
  const { requestDownload, modal } = useRewardedDownload();

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
      <div className="space-y-6">
        {!file ? (
          <FileDropzone title={t.common.dropzoneTitle} hint={copy.hint} onFiles={addFile} />
        ) : (
          <>
            <div className="glass-card space-y-2 rounded-2xl border-slate-800/60 p-4">
              <p className="text-sm text-gray-300">{t.redact.drawHint}</p>
              <p className="text-xs text-gray-500">{t.redact.boxes(overlays.length)}</p>
            </div>

            <PdfPageCanvas
              pageImage={preview.pageImage}
              pageIndex={preview.pageIndex}
              numPages={preview.numPages}
              overlays={overlays}
              interaction="draw-rect"
              loading={preview.loading}
              onPageChange={preview.setPageIndex}
              onDrawRect={(rect) =>
                setOverlays((current) => [
                  ...current,
                  {
                    id: createOverlayId(),
                    pageIndex: preview.pageIndex,
                    kind: "rect",
                    ...rect,
                  },
                ])
              }
              onRemoveOverlay={(id) =>
                setOverlays((current) => current.filter((item) => item.id !== id))
              }
            />

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                className="btn-primary"
                disabled={processing || overlays.length === 0}
                onClick={() => requestDownload(download)}
              >
                {processing ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                {copy.action}
              </button>
              <button
                type="button"
                className="btn-secondary"
                disabled={overlays.length === 0}
                onClick={() => setOverlays((current) => current.slice(0, -1))}
              >
                {t.redact.undo}
              </button>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => {
                  setFile(null);
                  setOverlays([]);
                }}
              >
                {t.common.clear}
              </button>
            </div>
          </>
        )}
        {error && <p className="text-sm text-rose-400">{error}</p>}
        {modal}
      </div>
    </ToolShell>
  );
}
