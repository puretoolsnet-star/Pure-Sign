"use client";

import { CalendarClock, Loader2 } from "lucide-react";
import { useCallback, useState } from "react";

import { FileDropzone } from "@/components/tools/FileDropzone";
import { PdfPageCanvas } from "@/components/tools/PdfPageCanvas";
import { DateInlinePanel } from "@/components/tools/signature/DateInlinePanel";
import { SignDateOnPageEdit } from "@/components/tools/signature/SignDateOnPageEdit";
import { ToolShell } from "@/components/tools/ToolShell";
import { exportWithOverlays } from "@/lib/document/export-document";
import { pickSignableFile } from "@/lib/document/pick-document";
import { useDocumentPreview } from "@/lib/document/use-document-preview";
import { useI18n } from "@/i18n/context";
import { downloadBytes } from "@/lib/download";
import { useGuardedDownload } from "@/lib/use-guarded-download";
import { createOverlayId, type PdfOverlay } from "@/lib/pdf/overlays";
import { clampOverlay, overlaySizeFromImage } from "@/lib/pdf/pick-pdf";
import { loadImageSize } from "@/lib/signatures/load-image-size";

export function DateStampTool() {
  const { t } = useI18n();
  const copy = t.tools["date-stamp"];
  const [file, setFile] = useState<File | null>(null);
  const [overlays, setOverlays] = useState<PdfOverlay[]>([]);
  const [selectedOverlayId, setSelectedOverlayId] = useState<string | null>(null);
  const [datePanelOpen, setDatePanelOpen] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const preview = useDocumentPreview(file);
  const { requestDownload, feedback } = useGuardedDownload();

  const addFile = useCallback(
    (files: File[]) => {
      const picked = pickSignableFile(files);
      if (!picked) {
        setError(t.dateStamp.invalidFile);
        return;
      }
      setError(null);
      setFile(picked);
      setOverlays([]);
      setDatePanelOpen(true);
    },
    [t.dateStamp.invalidFile],
  );

  const placeDate = useCallback(
    async (payload: {
      dataUrl: string;
      relativeWidth: number;
      meta: NonNullable<PdfOverlay["signDateMeta"]>;
    }) => {
      const image = await loadImageSize(payload.dataUrl);
      const dims = overlaySizeFromImage(
        image.width,
        image.height,
        preview.pageSize.width,
        preview.pageSize.height,
        payload.relativeWidth,
      );
      const box = clampOverlay(0.5 - dims.width / 2, 0.58 - dims.height / 2, dims.width, dims.height);
      const overlay: PdfOverlay = {
        id: createOverlayId(),
        pageIndex: preview.pageIndex,
        kind: "image",
        dataUrl: payload.dataUrl,
        signDateMeta: payload.meta,
        color: payload.meta.color,
        ...box,
      };
      setOverlays((current) => [...current, overlay]);
      setSelectedOverlayId(overlay.id);
    },
    [preview.pageIndex, preview.pageSize.height, preview.pageSize.width],
  );

  const selected = overlays.find((item) => item.id === selectedOverlayId) ?? null;
  const selectedDate =
    selected && (selected.signDateMeta || selected.stampMeta);

  const resizeSelected = (relativeWidth: number) => {
    if (!selected) return;
    const aspect = selected.height / Math.max(selected.width, 0.0001);
    const nextH = relativeWidth * aspect;
    const patch = clampOverlay(selected.x, selected.y, relativeWidth, nextH);
    setOverlays((current) =>
      current.map((item) => (item.id === selected.id ? { ...item, ...patch } : item)),
    );
  };

  const download = async () => {
    if (!file || overlays.length === 0) return;
    setProcessing(true);
    setError(null);
    try {
      const { bytes, mime, extension } = await exportWithOverlays(file, overlays);
      const base = file.name.replace(/\.[^.]+$/i, "");
      downloadBytes(bytes, `${base}-date-stamped.${extension}`, mime);
    } catch {
      setError(copy.errors.failed);
    } finally {
      setProcessing(false);
    }
  };

  const downloadLabel =
    preview.kind === "image" ? t.dateStamp.downloadStampedImage : t.dateStamp.downloadStampedPdf;

  return (
    <ToolShell toolId="date-stamp" icon={CalendarClock}>
      <div className="min-w-0 space-y-3">
        {!file ? (
          <FileDropzone title={t.common.dropzoneTitle} hint={t.dateStamp.dropHint} onFiles={addFile} />
        ) : (
          <>
            <DateInlinePanel
              open={datePanelOpen}
              onClose={() => setDatePanelOpen(false)}
              onInsert={(payload) => void placeDate(payload)}
            />
            {!datePanelOpen ? (
              <button
                type="button"
                className="btn-secondary w-full text-sm"
                onClick={() => setDatePanelOpen(true)}
              >
                {t.sign.addDate}
              </button>
            ) : null}
            {selectedDate && selected ? (
              <SignDateOnPageEdit
                overlay={selected}
                pageSize={preview.pageSize}
                onOverlayPatched={(id, patch) =>
                  setOverlays((current) =>
                    current.map((item) => (item.id === id ? { ...item, ...patch } : item)),
                  )
                }
              />
            ) : null}
            <PdfPageCanvas
              pageImage={preview.pageImage}
              pageIndex={preview.pageIndex}
              numPages={preview.numPages}
              overlays={overlays}
              loading={preview.loading}
              onPageChange={preview.setPageIndex}
              interaction="none"
              editableOverlays
              overlayToolbar="minimal"
              selectedOverlayId={selectedOverlayId}
              onSelectOverlay={setSelectedOverlayId}
              onOverlayChange={(id, patch) =>
                setOverlays((current) =>
                  current.map((item) => (item.id === id ? { ...item, ...patch } : item)),
                )
              }
              onRemoveOverlay={(id) => {
                setOverlays((current) => current.filter((item) => item.id !== id));
                setSelectedOverlayId((current) => (current === id ? null : current));
              }}
              desktopDragHint
              selectedOverlay={selected}
              onSelectedOverlayResize={resizeSelected}
            />
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                className="btn-primary"
                disabled={processing || overlays.length === 0}
                onClick={() => requestDownload(download)}
              >
                {processing ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                {downloadLabel}
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
        {feedback}
      </div>
    </ToolShell>
  );
}