"use client";

import { Download, FileText, Loader2, Trash2, X } from "lucide-react";
import { useRef, useState } from "react";

import { FileDropzone } from "@/components/tools/FileDropzone";
import { PdfPageCanvas } from "@/components/tools/PdfPageCanvas";
import { SignatureSourcePanel } from "@/components/tools/signature/SignatureSourcePanel";
import type { SignaturePadHandle } from "@/components/tools/SignaturePad";
import { useI18n } from "@/i18n/context";
import { cn } from "@/lib/cn";
import type { BatchSignProgress } from "@/lib/pdf/batch-sign";
import { createOverlayId, type PdfOverlay } from "@/lib/pdf/overlays";
import { clampOverlay, overlaySizeFromImage } from "@/lib/pdf/pick-pdf";
import { loadImageSize } from "@/lib/signatures/load-image-size";
import type { usePdfPreview } from "@/lib/pdf/use-pdf-preview";

type PageTargetMode = "first" | "last" | "page";

type BatchSignWorkspaceProps = {
  files: File[];
  onAddFiles: (files: File[]) => void;
  onRemoveFile: (index: number) => void;
  onClearFiles: () => void;
  previewFile: File | null;
  onPreviewFile: (file: File) => void;
  preview: ReturnType<typeof usePdfPreview>;
  placement: PdfOverlay | null;
  setPlacement: React.Dispatch<React.SetStateAction<PdfOverlay | null>>;
  selectedOverlayId: string | null;
  setSelectedOverlayId: (id: string | null) => void;
  pageTargetMode: PageTargetMode;
  setPageTargetMode: (mode: PageTargetMode) => void;
  pageNumber: number;
  setPageNumber: (value: number) => void;
  processing: boolean;
  progress: BatchSignProgress | null;
  onDownloadZip: () => void;
  dropHint: string;
};

export function BatchSignWorkspace({
  files,
  onAddFiles,
  onRemoveFile,
  onClearFiles,
  previewFile,
  onPreviewFile,
  preview,
  placement,
  setPlacement,
  selectedOverlayId,
  setSelectedOverlayId,
  pageTargetMode,
  setPageTargetMode,
  pageNumber,
  setPageNumber,
  processing,
  progress,
  onDownloadZip,
  dropHint,
}: BatchSignWorkspaceProps) {
  const { t } = useI18n();
  const padRef = useRef<SignaturePadHandle | null>(null);
  const [size, setSize] = useState(0.24);
  const [assetUrl, setAssetUrl] = useState<string | null>(null);
  const [placeError, setPlaceError] = useState<string | null>(null);

  const place = async (x: number, y: number) => {
    if (!assetUrl) {
      setPlaceError(t.sign.emptyPad);
      return;
    }
    const image = await loadImageSize(assetUrl);
    const dims = overlaySizeFromImage(
      image.width,
      image.height,
      preview.pageSize.width,
      preview.pageSize.height,
      size,
    );
    const box = clampOverlay(x - dims.width / 2, y - dims.height / 2, dims.width, dims.height);
    setPlaceError(null);
    const next: PdfOverlay = {
      id: createOverlayId(),
      pageIndex: preview.pageIndex,
      kind: "image",
      dataUrl: assetUrl,
      ...box,
    };
    setPlacement(next);
    setSelectedOverlayId(next.id);
  };

  const overlayPreview = placement ? [placement] : [];
  const progressPercent = progress
    ? Math.round((progress.index / Math.max(progress.total, 1)) * 100)
    : 0;

  const targetHint =
    pageTargetMode === "first"
      ? t.batchSign.targetFirst
      : pageTargetMode === "last"
        ? t.batchSign.targetLast
        : t.batchSign.targetPage(pageNumber);

  if (files.length === 0) {
    return (
      <FileDropzone
        title={t.common.dropzoneMultipleTitle}
        hint={dropHint}
        onFiles={onAddFiles}
        multiple
      />
    );
  }

  return (
    <div className="flex min-w-0 flex-col gap-3">
      <p className="text-xs text-gray-500">{t.batchSign.workspaceHint}</p>

      <div className="glass-card min-w-0 space-y-3 rounded-2xl border border-slate-800/60 p-3 sm:p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-sm font-medium text-white">{t.batchSign.filesSelected(files.length)}</p>
          <div className="flex flex-wrap gap-2">
            <label className="btn-secondary inline-flex min-h-10 cursor-pointer items-center px-3">
              {t.batchSign.addFiles}
              <input
                type="file"
                accept="application/pdf,.pdf"
                multiple
                className="hidden"
                onChange={(event) => {
                  const list = event.target.files;
                  if (!list?.length) return;
                  onAddFiles(Array.from(list));
                  event.target.value = "";
                }}
              />
            </label>
            <button type="button" className="btn-secondary min-h-10" onClick={onClearFiles}>
              {t.batchSign.clearList}
            </button>
          </div>
        </div>

        <ul className="max-h-40 min-w-0 space-y-1 overflow-y-auto overflow-x-hidden">
          {files.map((file, index) => (
            <li
              key={`${file.name}-${file.size}-${index}`}
              className={cn(
                "flex min-w-0 items-center gap-2 rounded-lg border px-2 py-1.5 text-xs",
                previewFile?.name === file.name && previewFile.size === file.size
                  ? "border-cyan-500/40 bg-cyan-500/10 text-white"
                  : "border-slate-800/60 bg-slate-900/40 text-gray-300",
              )}
            >
              <FileText className="h-3.5 w-3.5 shrink-0 opacity-70" aria-hidden />
              <button
                type="button"
                className="min-w-0 flex-1 truncate text-left"
                onClick={() => onPreviewFile(file)}
                title={file.name}
              >
                {file.name}
              </button>
              <button
                type="button"
                className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-gray-400 hover:bg-slate-800 hover:text-rose-300"
                aria-label={t.batchSign.removeFile}
                onClick={() => onRemoveFile(index)}
              >
                <X className="h-4 w-4" aria-hidden />
              </button>
            </li>
          ))}
        </ul>
        <p className="text-xs text-gray-500">{t.batchSign.previewFileHint}</p>
      </div>

      <div className="glass-card min-w-0 space-y-3 rounded-2xl border border-slate-800/60 p-3 sm:p-4">
        <span className="text-xs font-medium uppercase tracking-wider text-gray-500">
          {t.batchSign.pageTargetTitle}
        </span>
        <div className="flex min-w-0 flex-wrap gap-1.5">
          {(["first", "last", "page"] as const).map((mode) => (
            <button
              key={mode}
              type="button"
              className={cn(
                "btn-secondary min-h-10 flex-1 px-2 text-xs sm:flex-none sm:text-sm",
                pageTargetMode === mode && "bg-cyan-500/20 text-white ring-1 ring-cyan-500/40",
              )}
              onClick={() => setPageTargetMode(mode)}
            >
              {mode === "first"
                ? t.batchSign.targetFirstShort
                : mode === "last"
                  ? t.batchSign.targetLastShort
                  : t.batchSign.targetPageShort}
            </button>
          ))}
        </div>
        {pageTargetMode === "page" ? (
          <label className="block text-xs text-gray-400">
            {t.batchSign.pageNumberLabel}
            <input
              type="number"
              min={1}
              max={999}
              className="input-field mt-1.5 min-h-10 w-full min-w-0 sm:max-w-[8rem]"
              value={pageNumber}
              onChange={(event) => setPageNumber(Math.max(1, Number(event.target.value) || 1))}
            />
          </label>
        ) : null}
        <p className="text-xs text-cyan-400/85 lg:hidden">{targetHint}</p>
        <p className="hidden text-xs text-gray-500 lg:block">{targetHint}</p>
      </div>

      <div className="grid min-w-0 gap-3 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-start">
        <section className="glass-card min-w-0 rounded-2xl border border-slate-800/60 p-3 sm:p-4">
          <SignatureSourcePanel
            padRef={padRef}
            compact
            size={size}
            onSizeChange={setSize}
            onAssetChange={setAssetUrl}
            placeAllPages={false}
            onPlaceAllPagesChange={() => undefined}
            showPlaceAllPages={false}
          />
          <p className="mt-3 text-xs text-gray-500">{t.batchSign.positionNote}</p>
        </section>

        {previewFile ? (
          <section className="flex min-w-0 flex-col gap-2">
            <PdfPageCanvas
              pageImage={preview.pageImage}
              pageIndex={preview.pageIndex}
              numPages={preview.numPages}
              overlays={overlayPreview}
              loading={preview.loading}
              onPageChange={preview.setPageIndex}
              onPlace={place}
              editableOverlays
              selectedOverlayId={selectedOverlayId}
              onSelectOverlay={setSelectedOverlayId}
              desktopDragHint
              onOverlayChange={(id, patch) =>
                setPlacement((current) =>
                  current && current.id === id ? { ...current, ...patch } : current,
                )
              }
              onRemoveOverlay={() => {
                setPlacement(null);
                setSelectedOverlayId(null);
              }}
              interaction={placement ? "none" : "place"}
              placeHint={t.batchSign.placeHintMobile}
            />
            {placeError ? <p className="text-xs text-rose-400">{placeError}</p> : null}
          </section>
        ) : null}
      </div>

      {processing && progress ? (
        <div className="rounded-xl border border-slate-800/70 bg-slate-900/60 px-3 py-2.5">
          <p className="text-sm text-gray-200">
            {t.batchSign.progressStatus(progress.index, progress.total, progress.fileName)}
          </p>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-800">
            <div
              className="h-full rounded-full bg-cyan-500/80 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      ) : null}

      <div className="sign-workspace sticky bottom-0 z-20 -mx-1 border-t border-slate-800/70 bg-slate-950/95 px-1 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur-md sm:static sm:mx-0 sm:rounded-2xl sm:border sm:bg-slate-900/80 sm:px-3 sm:pb-3 sm:pt-3">
        <button
          type="button"
          className="btn-primary inline-flex min-h-11 w-full min-w-0 items-center justify-center gap-2 text-sm sm:w-auto"
          disabled={processing || !placement || files.length === 0}
          onClick={onDownloadZip}
        >
          {processing ? (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
          ) : (
            <Download className="h-4 w-4" aria-hidden />
          )}
          {processing ? t.batchSign.zipProcessing : t.batchSign.zipAction}
        </button>
      </div>
    </div>
  );
}