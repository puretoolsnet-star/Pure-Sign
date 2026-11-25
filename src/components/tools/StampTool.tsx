"use client";

import { Loader2, Stamp } from "lucide-react";
import { useCallback, useState } from "react";

import { FileDropzone } from "@/components/tools/FileDropzone";
import { PdfPageCanvas } from "@/components/tools/PdfPageCanvas";
import { DocumentSelectedQuickEdit } from "@/components/tools/signature/DocumentSelectedQuickEdit";
import { StampInlinePanel } from "@/components/tools/signature/StampInlinePanel";
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

export function StampTool() {
  const { t } = useI18n();
  const copy = t.tools.stamp;
  const [file, setFile] = useState<File | null>(null);
  const [overlays, setOverlays] = useState<PdfOverlay[]>([]);
  const [selectedOverlayId, setSelectedOverlayId] = useState<string | null>(null);
  const [stampPanelOpen, setStampPanelOpen] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const preview = useDocumentPreview(file);
  const { requestDownload, feedback } = useGuardedDownload();

  const addFile = useCallback(
    (files: File[]) => {
      const picked = pickSignableFile(files);
      if (!picked) {
        setError(copy.errors.invalid);
        return;
      }
      setError(null);
      setFile(picked);
      setOverlays([]);
      setStampPanelOpen(true);
    },
    [copy.errors.invalid],
  );

  const placeStampOverlay = useCallback(
    async (
      dataUrl: string,
      relativeWidth: number,
      extra: Partial<PdfOverlay> = {},
    ) => {
      const image = await loadImageSize(dataUrl);
      const dims = overlaySizeFromImage(
        image.width,
        image.height,
        preview.pageSize.width,
        preview.pageSize.height,
        relativeWidth,
      );
      const box = clampOverlay(0.5 - dims.width / 2, 0.58 - dims.height / 2, dims.width, dims.height);
      const overlay: PdfOverlay = {
        id: createOverlayId(),
        pageIndex: preview.pageIndex,
        kind: "image",
        dataUrl,
        ...box,
        ...extra,
      };
      setOverlays((current) => [...current, overlay]);
      setSelectedOverlayId(overlay.id);
    },
    [preview.pageIndex, preview.pageSize.height, preview.pageSize.width],
  );

  const selected = overlays.find((item) => item.id === selectedOverlayId) ?? null;

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
      const { bytes, extension, mime } = await exportWithOverlays(file, overlays);
      const base = file.name.replace(/\.[^.]+$/, "");
      downloadBytes(bytes, `${base}-stamped.${extension}`, mime);
    } catch {
      setError(copy.errors.failed);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <ToolShell toolId="stamp" icon={Stamp}>
      <div className="min-w-0 space-y-3">
        {!file ? (
          <FileDropzone title={t.common.dropzoneTitle} hint={copy.hint} onFiles={addFile} />
        ) : (
          <>
            <StampInlinePanel
              open={stampPanelOpen}
              onClose={() => setStampPanelOpen(false)}
              onInsert={(payload) => {
                void placeStampOverlay(payload.dataUrl, payload.relativeWidth, {
                  documentStampMeta: payload.meta,
                  color: payload.meta.color,
                });
              }}
            />
            {!stampPanelOpen ? (
              <button
                type="button"
                className="btn-secondary w-full text-sm"
                onClick={() => setStampPanelOpen(true)}
              >
                {t.sign.addStamp}
              </button>
            ) : null}
            {selected?.documentStampMeta ? (
              <DocumentSelectedQuickEdit
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
                {copy.action}
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