"use client";

import { useEffect, useMemo, useState } from "react";

import { useI18n } from "@/i18n/context";
import { cn } from "@/lib/cn";
import { metaToRenderOptions, renderDocumentStampPng } from "@/lib/stamps/render-stamp";
import { DEFAULT_STAMP_INK, STAMP_INK_PRESETS } from "@/lib/stamps/stamp-ink-presets";
import type { DocumentStampMeta, StampShape } from "@/lib/stamps/types";

type StampSourcePanelProps = {
  compact?: boolean;
  size: number;
  onSizeChange: (value: number) => void;
  onAssetChange: (dataUrl: string | null) => void;
  onMetaChange: (meta: DocumentStampMeta | null) => void;
};

export function StampSourcePanel({
  size,
  onSizeChange,
  onAssetChange,
  onMetaChange,
}: StampSourcePanelProps) {
  const { t } = useI18n();
  const primaryPresets = useMemo(
    () => [t.stamp.certified, t.stamp.paid, t.stamp.agreed, t.stamp.approved],
    [t],
  );
  const extraPresets = useMemo(
    () => [t.stamp.confidential, t.stamp.received, t.stamp.copyStamp],
    [t],
  );
  const presets = useMemo(
    () => [...primaryPresets, ...extraPresets],
    [primaryPresets, extraPresets],
  );

  const [shape, setShape] = useState<StampShape>("rect");
  const [label, setLabel] = useState(primaryPresets[0]);
  const [ringText, setRingText] = useState(primaryPresets[0]);
  const [color, setColor] = useState<string>(DEFAULT_STAMP_INK);
  const [lightImprint, setLightImprint] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const meta = useMemo((): DocumentStampMeta | null => {
    const trimmed = label.trim();
    if (!trimmed) return null;
    return {
      shape,
      label: trimmed,
      ringText: (ringText.trim() || trimmed).toUpperCase(),
      color,
      lightImprint,
    };
  }, [shape, label, ringText, color, lightImprint]);

  useEffect(() => {
    onMetaChange(meta);
  }, [meta, onMetaChange]);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      if (!meta) {
        setPreviewUrl(null);
        onAssetChange(null);
        return;
      }
      try {
        const dataUrl = await renderDocumentStampPng(metaToRenderOptions(meta));
        if (cancelled) return;
        setPreviewUrl(dataUrl);
        onAssetChange(dataUrl);
      } catch {
        if (!cancelled) {
          setPreviewUrl(null);
          onAssetChange(null);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [meta, onAssetChange]);

  const inkTitle = (id: (typeof STAMP_INK_PRESETS)[number]["id"]) => {
    if (id === "seal") return t.sign.stampInkSeal;
    if (id === "ballpoint") return t.sign.inkBallpoint;
    if (id === "black") return t.sign.inkBlack;
    if (id === "graphite") return t.sign.inkGraphite;
    if (id === "blue") return t.sign.inkBlue;
    if (id === "red") return t.sign.inkRed;
    return t.stamp.color;
  };

  return (
    <div className="min-w-0 space-y-3">
      <div className="flex w-full min-w-0 flex-wrap gap-2">
        {(
          [
            ["rect", t.sign.stampShapeRect],
            ["round", t.sign.stampShapeRound],
          ] as const
        ).map(([value, text]) => (
          <button
            key={value}
            type="button"
            onClick={() => {
              setShape(value);
              onSizeChange(value === "round" ? 0.26 : 0.32);
            }}
            className={cn(
              "min-w-0 flex-1 rounded-xl px-3 py-2 text-sm font-medium sm:flex-none",
              shape === value
                ? "bg-primary/20 text-white"
                : "text-gray-400 hover:bg-white/5 hover:text-white",
            )}
          >
            {text}
          </button>
        ))}
      </div>

      <p className="text-xs font-medium uppercase tracking-wider text-gray-500">{t.stamp.presetsLabel}</p>
      <div className="flex flex-wrap gap-2">
        {primaryPresets.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => {
              setLabel(item);
              setRingText(item);
            }}
            className={cn(
              "rounded-full border px-3 py-1.5 text-xs font-semibold",
              label === item
                ? "border-cyan-400/40 bg-cyan-500/15 text-cyan-100"
                : "border-slate-800/60 text-gray-300 hover:border-slate-700",
            )}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-1.5">
        {extraPresets.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => {
              setLabel(item);
              setRingText(item);
            }}
            className={cn(
              "rounded-full border px-3 py-1.5 text-xs font-semibold",
              label === item
                ? "border-cyan-400/40 bg-cyan-500/15 text-cyan-100"
                : "border-slate-800/60 text-gray-300 hover:border-slate-700",
            )}
          >
            {item}
          </button>
        ))}
      </div>

      <label className="block text-sm text-gray-400">
        {shape === "round" ? t.sign.stampCenterText : t.stamp.customLabel}
        <input
          className="input-field mt-1.5"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder={t.stamp.customPlaceholder}
        />
      </label>

      {shape === "round" ? (
        <label className="block text-sm text-gray-400">
          {t.sign.stampRingText}
          <input
            className="input-field mt-1.5"
            value={ringText}
            onChange={(e) => setRingText(e.target.value)}
            placeholder={t.sign.stampRingPlaceholder}
          />
        </label>
      ) : null}

      <p className="text-[11px] text-gray-500">{t.sign.documentInkPreview}</p>
      <div className="flex min-w-0 flex-wrap items-center gap-2">
        <span className="w-full text-xs text-gray-500 sm:w-auto">{t.sign.inkColor}</span>
        {STAMP_INK_PRESETS.map((preset) => (
          <button
            key={preset.id}
            type="button"
            aria-pressed={color === preset.color}
            title={inkTitle(preset.id)}
            onClick={() => setColor(preset.color)}
            className={cn(
              "h-7 w-7 rounded-full border border-slate-700/80 ring-2 ring-offset-2 ring-offset-slate-900",
              color === preset.color ? preset.ring : "ring-transparent",
            )}
            style={{ backgroundColor: preset.color }}
          />
        ))}
      </div>

      <div className="rounded-lg border border-slate-400/40 bg-[#f4f1ea] px-3 py-4 shadow-inner">
        {previewUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={previewUrl}
            alt=""
            className="mx-auto max-h-28 w-auto max-w-full object-contain"
          />
        ) : (
          <p className="text-center text-xs text-slate-500">{t.sign.typePreviewEmpty}</p>
        )}
      </div>

      <label className="flex items-center gap-2 text-xs text-gray-400">
        <input
          type="checkbox"
          checked={lightImprint}
          onChange={(e) => setLightImprint(e.target.checked)}
          className="rounded border-slate-600"
        />
        {t.sign.stampLightImprint}
      </label>

      <label className="block text-sm text-gray-400">
        {t.sign.size}
        <input
          type="range"
          min={0.14}
          max={shape === "round" ? 0.45 : 0.55}
          step={0.01}
          value={size}
          onChange={(event) => onSizeChange(Number(event.target.value))}
          className="mt-2 w-full min-w-0 touch-none"
        />
      </label>
    </div>
  );
}