"use client";

import { Files, Trash2 } from "lucide-react";
import { useCallback, useState } from "react";

import { BatchSignWorkspace } from "@/components/tools/batch-sign/BatchSignWorkspace";
import { ToolShell } from "@/components/tools/ToolShell";
import { useI18n } from "@/i18n/context";
import { downloadZip } from "@/lib/download";
import { useGuardedDownload } from "@/lib/use-guarded-download";
import {
  defaultBatchZipName,
  pickPdfFiles,
  signPdfFiles,
  type BatchPageTarget,
  type BatchSignFailure,
  type BatchSignProgress,
} from "@/lib/pdf/batch-sign";
import type { PdfOverlay } from "@/lib/pdf/overlays";
import { usePdfPreview } from "@/lib/pdf/use-pdf-preview";

export function BatchSignTool() {
  const { t } = useI18n();
  const copy = t.tools["batch-sign"];
  const [files, setFiles] = useState<File[]>([]);
  const [previewFile, setPreviewFile] = useState<File | null>(null);
  const [placement, setPlacement] = useState<PdfOverlay | null>(null);
  const [selectedOverlayId, setSelectedOverlayId] = useState<string | null>(null);
  const [pageTargetMode, setPageTargetMode] = useState<BatchPageTarget["mode"]>("last");
  const [pageNumber, setPageNumber] = useState(1);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState<BatchSignProgress | null>(null);
  const [failures, setFailures] = useState<BatchSignFailure[]>([]);
  const [error, setError] = useState<string | null>(null);
  const preview = usePdfPreview(previewFile);
  const { requestDownload, feedback } = useGuardedDownload();

  const addFiles = useCallback(
    (incoming: File[]) => {
      const pdfs = pickPdfFiles(incoming);
      if (!pdfs.length) {
        setError(copy.errors.invalid);
        return;
      }
      setError(null);
      setFailures([]);
      setFiles((current) => {
        const merged = [...current];
        for (const pdf of pdfs) {
          if (!merged.some((item) => item.name === pdf.name && item.size === pdf.size)) {
            merged.push(pdf);
          }
        }
        return merged;
      });
      setPreviewFile((current) => current ?? pdfs[0]);
      setPlacement(null);
    },
    [copy.errors.invalid],
  );

  const removeFile = (index: number) => {
    setFiles((current) => {
      const next = current.filter((_, i) => i !== index);
      const removed = current[index];
      setPreviewFile((preview) => {
        if (!preview || !removed) return next[0] ?? null;
        if (preview.name === removed.name && preview.size === removed.size) {
          return next[0] ?? null;
        }
        return preview;
      });
      return next;
    });
    setPlacement(null);
    setFailures([]);
  };

  const pageTarget: BatchPageTarget =
    pageTargetMode === "page" ? { mode: "page", pageNumber } : { mode: pageTargetMode };

  const failureMessage = (item: BatchSignFailure) => {
    switch (item.code) {
      case "protected":
        return t.batchSign.failedProtected(item.name);
      case "corrupt":
        return t.batchSign.failedCorrupt(item.name);
      default:
        return t.batchSign.failedGeneric(item.name);
    }
  };

  const exportZip = async () => {
    if (!files.length || !placement?.dataUrl) return;
    setProcessing(true);
    setError(null);
    setFailures([]);
    setProgress({ index: 0, total: files.length, fileName: files[0].name, status: "signing" });
    try {
      const outcome = await signPdfFiles(
        files,
        {
          kind: "image",
          dataUrl: placement.dataUrl,
          x: placement.x,
          y: placement.y,
          width: placement.width,
          height: placement.height,
        },
        pageTarget,
        setProgress,
      );

      if (outcome.signed.length === 0) {
        setError(copy.errors.failed);
        setFailures(outcome.failed);
        return;
      }

      await downloadZip(outcome.signed, defaultBatchZipName());
      setFailures(outcome.failed);
      if (outcome.failed.length > 0) {
        setError(t.batchSign.partialSuccess(outcome.signed.length, outcome.failed.length));
      }
    } catch {
      setError(copy.errors.failed);
    } finally {
      setProcessing(false);
      setProgress(null);
    }
  };

  return (
    <ToolShell toolId="batch-sign" icon={Files} className="!pt-4 sm:!pt-5">
      <div className="sign-workspace min-w-0 space-y-3">
        <BatchSignWorkspace
          files={files}
          onAddFiles={addFiles}
          onRemoveFile={removeFile}
          onClearFiles={() => {
            setFiles([]);
            setPreviewFile(null);
            setPlacement(null);
            setFailures([]);
          }}
          previewFile={previewFile}
          onPreviewFile={setPreviewFile}
          preview={preview}
          placement={placement}
          setPlacement={setPlacement}
          selectedOverlayId={selectedOverlayId}
          setSelectedOverlayId={setSelectedOverlayId}
          pageTargetMode={pageTargetMode}
          setPageTargetMode={setPageTargetMode}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
          processing={processing}
          progress={progress}
          onDownloadZip={() => requestDownload(exportZip)}
          dropHint={copy.hint}
        />

        {failures.length > 0 ? (
          <ul className="space-y-1 rounded-xl border border-rose-500/25 bg-rose-500/10 px-3 py-2 text-xs text-rose-200">
            {failures.map((item) => (
              <li key={item.name} className="flex gap-2">
                <Trash2 className="mt-0.5 h-3.5 w-3.5 shrink-0 opacity-80" aria-hidden />
                {failureMessage(item)}
              </li>
            ))}
          </ul>
        ) : null}

        {error ? <p className="text-sm text-rose-400">{error}</p> : null}
        {feedback}
      </div>
    </ToolShell>
  );
}