"use client";

import { PenTool, Loader2 } from "lucide-react";
import { useCallback, useRef, useState } from "react";

import { FileDropzone } from "@/components/tools/FileDropzone";
import { PdfPageCanvas } from "@/components/tools/PdfPageCanvas";
import {
  SignaturePad,
  type SignaturePadHandle,
} from "@/components/tools/SignaturePad";
import { ToolShell } from "@/components/tools/ToolShell";
import { useI18n } from "@/i18n/context";
import { downloadBytes } from "@/lib/download";
import { useRewardedDownload } from "@/lib/use-rewarded-download";
import { cn } from "@/lib/cn";
import { applyOverlays, createOverlayId, type PdfOverlay } from "@/lib/pdf/overlays";
import { clampOverlay, overlaySizeFromImage, pickPdfFile } from "@/lib/pdf/pick-pdf";
import { renderTypedSignaturePng } from "@/lib/pdf/stamp-image";
import { usePdfPreview } from "@/lib/pdf/use-pdf-preview";

type Mode = "draw" | "type" | "image";

function loadImageSize(src: string) {
  return new Promise<{ width: number; height: number }>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve({ width: image.width, height: image.height });
    image.onerror = () => reject(new Error("image"));
    image.src = src;
  });
}

export function SignTool() {
  const { t } = useI18n();
  const copy = t.tools.sign;
  const padRef = useRef<SignaturePadHandle | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [mode, setMode] = useState<Mode>("draw");
  const [typed, setTyped] = useState("");
  const [uploaded, setUploaded] = useState<string | null>(null);
  const [size, setSize] = useState(0.28);
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

  const currentAsset = useCallback(async () => {
    if (mode === "draw") {
      return padRef.current?.toDataURL() ?? null;
    }
    if (mode === "type") {
      if (!typed.trim()) return null;
      return renderTypedSignaturePng(typed.trim());
    }
    return uploaded;
  }, [mode, typed, uploaded]);

  const place = async (x: number, y: number) => {
    const dataUrl = await currentAsset();
    if (!dataUrl) {
      setError(t.sign.emptyPad);
      return;
    }
    const image = await loadImageSize(dataUrl);
    const dims = overlaySizeFromImage(
      image.width,
      image.height,
      preview.pageSize.width,
      preview.pageSize.height,
      size,
    );
    const box = clampOverlay(x - dims.width / 2, y - dims.height / 2, dims.width, dims.height);
    setError(null);
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
      downloadBytes(bytes, file.name.replace(/\.pdf$/i, "") + "-signed.pdf");
    } catch {
      setError(copy.errors.failed);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <ToolShell toolId="sign" icon={PenTool}>
      <div className="space-y-6">
        {!file ? (
          <FileDropzone
            title={t.common.dropzoneTitle}
            hint={copy.hint}
            onFiles={addFile}
          />
        ) : (
          <>
            <div className="glass-card space-y-4 rounded-2xl border-slate-800/60 p-4">
              <div className="flex w-full min-w-0 flex-wrap gap-2">
                {(["draw", "type", "image"] as const).map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setMode(item)}
                    className={cn(
                      "min-w-0 flex-1 rounded-xl px-3 py-2 text-sm font-medium sm:flex-none",
                      mode === item
                        ? "bg-primary/20 text-white"
                        : "text-gray-400 hover:bg-white/5 hover:text-white",
                    )}
                  >
                    {t.sign[item]}
                  </button>
                ))}
              </div>

              {mode === "draw" && (
                <div className="space-y-3">
                  <SignaturePad handleRef={padRef} ariaLabel={t.sign.canvasAria} />
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => padRef.current?.clear()}
                  >
                    {t.sign.clearPad}
                  </button>
                </div>
              )}

              {mode === "type" && (
                <input
                  className="input-field"
                  value={typed}
                  onChange={(event) => setTyped(event.target.value)}
                  placeholder={t.sign.typePlaceholder}
                />
              )}

              {mode === "image" && (
                <label className="btn-secondary cursor-pointer">
                  {t.sign.uploadPng}
                  <input
                    type="file"
                    accept="image/png"
                    className="hidden"
                    onChange={(event) => {
                      const png = event.target.files?.[0];
                      if (!png) return;
                      const reader = new FileReader();
                      reader.onload = () => setUploaded(String(reader.result));
                      reader.readAsDataURL(png);
                    }}
                  />
                </label>
              )}

              {uploaded && mode === "image" && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={uploaded} alt="" className="h-16 object-contain" />
              )}

              <label className="block text-sm text-gray-400">
                {t.sign.size}
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
              <p className="text-xs text-gray-500">{t.sign.placeHint}</p>
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
