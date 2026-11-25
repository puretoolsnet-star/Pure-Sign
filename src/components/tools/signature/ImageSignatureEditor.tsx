"use client";

import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

import { INK_PRESETS } from "@/components/tools/SignaturePad";
import { SignaturePaperSurface } from "@/components/tools/signature/SignaturePaperSurface";
import type { PadSurfaceMode } from "@/lib/signatures/paper-surface";
import { useI18n } from "@/i18n/context";
import { cn } from "@/lib/cn";
import { processSignaturePhoto } from "@/lib/signatures/image-process";

type ImageSignatureEditorProps = {
  rawDataUrl: string | null;
  onRawDataUrl: (dataUrl: string | null) => void;
  onProcessed: (dataUrl: string | null) => void;
  onInkColorChange?: (color: string) => void;
  displaySurface?: PadSurfaceMode;
};

export function ImageSignatureEditor({
  rawDataUrl,
  onRawDataUrl,
  onProcessed,
  onInkColorChange,
  displaySurface = "paper",
}: ImageSignatureEditorProps) {
  const { t } = useI18n();
  const [threshold, setThreshold] = useState(210);
  const [inkColor, setInkColor] = useState<string>(INK_PRESETS[0].color);
  const [trim, setTrim] = useState(true);
  const [preview, setPreview] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    onInkColorChange?.(inkColor);
  }, [inkColor, onInkColorChange]);

  useEffect(() => {
    let cancelled = false;
    async function run() {
      if (!rawDataUrl) {
        setPreview(null);
        onProcessed(null);
        return;
      }
      setBusy(true);
      try {
        const result = await processSignaturePhoto(rawDataUrl, {
          backgroundThreshold: threshold,
          inkColor,
          trim,
        });
        if (cancelled) return;
        setPreview(result);
        onProcessed(result);
      } catch {
        if (!cancelled) {
          setPreview(rawDataUrl);
          onProcessed(rawDataUrl);
        }
      } finally {
        if (!cancelled) setBusy(false);
      }
    }
    void run();
    return () => {
      cancelled = true;
    };
  }, [rawDataUrl, threshold, inkColor, trim, onProcessed]);

  if (!rawDataUrl) {
    return (
      <label className="btn-secondary cursor-pointer">
        {t.sign.uploadImage}
        <input
          type="file"
          accept="image/png,image/jpeg,image/webp,.png,.jpg,.jpeg,.webp"
          className="hidden"
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = () => onRawDataUrl(String(reader.result));
            reader.readAsDataURL(file);
            event.target.value = "";
          }}
        />
      </label>
    );
  }

  return (
    <div className="min-w-0 space-y-3">
      <label className="btn-secondary inline-flex cursor-pointer">
        {t.sign.replaceImage}
        <input
          type="file"
          accept="image/png,image/jpeg,image/webp,.png,.jpg,.jpeg,.webp"
          className="hidden"
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = () => onRawDataUrl(String(reader.result));
            reader.readAsDataURL(file);
            event.target.value = "";
          }}
        />
      </label>

      <label className="block text-xs text-gray-500">
        {t.sign.bgThreshold}
        <input
          type="range"
          min={160}
          max={252}
          step={1}
          value={threshold}
          onChange={(event) => setThreshold(Number(event.target.value))}
          className="mt-1.5 w-full"
        />
      </label>

      <label className="flex items-center gap-2 text-xs text-gray-400">
        <input type="checkbox" checked={trim} onChange={(e) => setTrim(e.target.checked)} />
        {t.sign.autoTrim}
      </label>

      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs text-gray-500">{t.sign.photoInk}</span>
        {INK_PRESETS.map((preset) => (
          <button
            key={preset.id}
            type="button"
            aria-pressed={inkColor === preset.color}
            onClick={() => setInkColor(preset.color)}
            className={cn(
              "h-7 w-7 rounded-full border border-slate-700/80 ring-2 ring-offset-2 ring-offset-slate-900",
              inkColor === preset.color ? preset.ring : "ring-transparent",
            )}
            style={{ backgroundColor: preset.color }}
          />
        ))}
      </div>

      <SignaturePaperSurface
        mode={displaySurface}
        className="relative flex h-24 min-h-24 items-center justify-center"
      >
        {busy ? <Loader2 className="h-5 w-5 animate-spin text-slate-500" /> : null}
        {preview && !busy ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={preview} alt="" className="max-h-20 max-w-full object-contain" />
        ) : null}
      </SignaturePaperSurface>
    </div>
  );
}