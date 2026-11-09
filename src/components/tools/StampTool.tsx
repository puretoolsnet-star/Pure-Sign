"use client";

import { Loader2, Stamp } from "lucide-react";
import { useCallback, useMemo, useState } from "react";

import { FileDropzone } from "@/components/tools/FileDropzone";
import { PdfPageCanvas } from "@/components/tools/PdfPageCanvas";
import { ToolShell } from "@/components/tools/ToolShell";
import { useI18n } from "@/i18n/context";
import { downloadBytes } from "@/lib/download";
import { useRewardedDownload } from "@/lib/use-rewarded-download";
import { cn } from "@/lib/cn";
import { applyOverlays, createOverlayId, type PdfOverlay } from "@/lib/pdf/overlays";
import { clampOverlay, overlaySizeFromImage, pickPdfFile } from "@/lib/pdf/pick-pdf";
import { renderStampPng } from "@/lib/pdf/stamp-image";
import { usePdfPreview } from "@/lib/pdf/use-pdf-preview";

const COLORS = ["#ef4444", "#2563eb", "#059669", "#d97706"];

function loadImageSize(src: string) {
  return new Promise<{ width: number; height: number }>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve({ width: image.width, height: image.height });
    image.onerror = () => reject(new Error("image"));
    image.src = src;
  });
}

export function StampTool() {
  const { t } = useI18n();
  const copy = t.tools.stamp;
  const presets = useMemo(
    () => [
      t.stamp.paid,
      t.stamp.certified,
      t.stamp.confidential,
      t.stamp.approved,
      t.stamp.received,
      t.stamp.copyStamp,
    ],
    [t],
  );
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState(presets[0]);
  const [color, setColor] = useState(COLORS[0]);
  const [size, setSize] = useState(0.32);
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

  const place = async (x: number, y: number) => {
    if (!text.trim()) return;
    const dataUrl = await renderStampPng({ text: text.trim(), color });
    const image = await loadImageSize(dataUrl);
    const dims = overlaySizeFromImage(
      image.width,
      image.height,
      preview.pageSize.width,
      preview.pageSize.height,
      size,
    );
    const box = clampOverlay(x - dims.width / 2, y - dims.height / 2, dims.width, dims.height);
    setOverlays((current) => [
      ...current,
      {
        id: createOverlayId(),
        pageIndex: preview.pageIndex,
        kind: "image",
        dataUrl,
        ...box,
      },
    ]);
  };

  const download = async () => {
    if (!file || overlays.length === 0) return;
    setProcessing(true);
    setError(null);
    try {
      const bytes = await applyOverlays(file, overlays);
      downloadBytes(bytes, file.name.replace(/\.pdf$/i, "") + "-stamped.pdf");
    } catch {
      setError(copy.errors.failed);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <ToolShell toolId="stamp" icon={Stamp}>
      <div className="space-y-6">
        {!file ? (
          <FileDropzone title={t.common.dropzoneTitle} hint={copy.hint} onFiles={addFile} />
        ) : (
          <>
            <div className="glass-card space-y-4 rounded-2xl border-slate-800/60 p-4">
              <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
                {t.stamp.presetsLabel}
              </p>
              <div className="flex flex-wrap gap-2">
                {presets.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setText(item)}
                    className={cn(
                      "rounded-full border px-3 py-1.5 text-xs font-semibold",
                      text === item
                        ? "border-rose-400/40 bg-rose-500/15 text-rose-200"
                        : "border-slate-800/60 text-gray-300 hover:border-slate-700",
                    )}
                  >
                    {item}
                  </button>
                ))}
              </div>
              <label className="block text-sm text-gray-400">
                {t.stamp.customLabel}
                <input
                  className="input-field mt-2"
                  value={text}
                  onChange={(event) => setText(event.target.value)}
                  placeholder={t.stamp.customPlaceholder}
                />
              </label>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm text-gray-400">{t.stamp.color}</span>
                {COLORS.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setColor(item)}
                    className={cn(
                      "h-7 w-7 rounded-full ring-2 ring-offset-2 ring-offset-background",
                      color === item ? "ring-white" : "ring-transparent",
                    )}
                    style={{ background: item }}
                    aria-label={item}
                  />
                ))}
              </div>
              <label className="block text-sm text-gray-400">
                {t.stamp.size}
                <input
                  type="range"
                  min={0.16}
                  max={0.6}
                  step={0.01}
                  value={size}
                  onChange={(event) => setSize(Number(event.target.value))}
                  className="mt-2 w-full"
                />
              </label>
              <p className="text-xs text-gray-500">{t.stamp.placeHint}</p>
            </div>

            <PdfPageCanvas
              pageImage={preview.pageImage}
              pageIndex={preview.pageIndex}
              numPages={preview.numPages}
              overlays={overlays}
              loading={preview.loading}
              onPageChange={preview.setPageIndex}
              onPlace={place}
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
