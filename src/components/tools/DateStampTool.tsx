"use client";

import { CalendarClock, Loader2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

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

type DateFormat = "date" | "time" | "datetime";

const COLORS = ["#06b6d4", "#64748b", "#059669", "#d97706"];

function loadImageSize(src: string) {
  return new Promise<{ width: number; height: number }>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve({ width: image.width, height: image.height });
    image.onerror = () => reject(new Error("image"));
    image.src = src;
  });
}

export function DateStampTool() {
  const { locale, t } = useI18n();
  const copy = t.tools["date-stamp"];
  const [file, setFile] = useState<File | null>(null);
  const [format, setFormat] = useState<DateFormat>("datetime");
  const [color, setColor] = useState(COLORS[0]);
  const [size, setSize] = useState(0.28);
  const [overlays, setOverlays] = useState<PdfOverlay[]>([]);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const preview = usePdfPreview(file);
  const { requestDownload, modal } = useRewardedDownload();

  const [stampText, setStampText] = useState("—");

  useEffect(() => {
    const now = new Date();
    if (format === "date") {
      setStampText(new Intl.DateTimeFormat(locale, { dateStyle: "medium" }).format(now));
      return;
    }
    if (format === "time") {
      setStampText(new Intl.DateTimeFormat(locale, { timeStyle: "short" }).format(now));
      return;
    }
    setStampText(
      new Intl.DateTimeFormat(locale, {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(now),
    );
  }, [format, locale]);

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

  const formatStamp = useCallback(() => {
    const now = new Date();
    if (format === "date") {
      return new Intl.DateTimeFormat(locale, { dateStyle: "medium" }).format(now);
    }
    if (format === "time") {
      return new Intl.DateTimeFormat(locale, { timeStyle: "short" }).format(now);
    }
    return new Intl.DateTimeFormat(locale, {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(now);
  }, [format, locale]);

  const place = async (x: number, y: number) => {
    const label = formatStamp();
    const dataUrl = await renderStampPng({ text: label, color });
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
      downloadBytes(bytes, file.name.replace(/\.pdf$/i, "") + "-date-stamped.pdf");
    } catch {
      setError(copy.errors.failed);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <ToolShell toolId="date-stamp" icon={CalendarClock}>
      <div className="space-y-6">
        {!file ? (
          <FileDropzone title={t.common.dropzoneTitle} hint={copy.hint} onFiles={addFile} />
        ) : (
          <>
            <div className="glass-card space-y-4 rounded-2xl border-slate-800/60 p-4">
              <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
                {t.dateStamp.formatLabel}
              </p>
              <div className="flex flex-wrap gap-2">
                {(
                  [
                    ["date", t.dateStamp.formatDate],
                    ["time", t.dateStamp.formatTime],
                    ["datetime", t.dateStamp.formatDateTime],
                  ] as const
                ).map(([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setFormat(value)}
                    className={cn(
                      "rounded-xl px-3 py-2 text-sm font-medium",
                      format === value
                        ? "bg-cyan-500/20 text-white"
                        : "text-gray-400 hover:bg-white/5 hover:text-white",
                    )}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <p className="text-sm text-gray-300">
                <span className="text-gray-500">{t.dateStamp.previewLabel}: </span>
                {stampText}
              </p>
              <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
                {t.dateStamp.color}
              </p>
              <div className="flex flex-wrap gap-2">
                {COLORS.map((item) => (
                  <button
                    key={item}
                    type="button"
                    aria-label={item}
                    onClick={() => setColor(item)}
                    className={cn(
                      "h-8 w-8 rounded-full ring-2 ring-offset-2 ring-offset-slate-900",
                      color === item ? "ring-cyan-400" : "ring-transparent",
                    )}
                    style={{ backgroundColor: item }}
                  />
                ))}
              </div>
              <label className="block text-sm text-gray-400">
                {t.dateStamp.size}
                <input
                  type="range"
                  min={0.12}
                  max={0.5}
                  step={0.01}
                  value={size}
                  onChange={(event) => setSize(Number(event.target.value))}
                  className="mt-2 w-full"
                />
              </label>
              <p className="text-xs text-gray-500">{t.dateStamp.placeHint}</p>
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
