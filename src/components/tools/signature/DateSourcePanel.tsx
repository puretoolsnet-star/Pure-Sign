"use client";

import { useEffect, useMemo, useState } from "react";

import { DateStampControls } from "@/components/tools/date-stamp/DateStampControls";
import { useI18n } from "@/i18n/context";
import type { DateStampFormat } from "@/lib/date-stamp/format";
import { DATE_STAMP_INK_PRESETS } from "@/lib/date-stamp/ink-presets";
import type { SignDateOverlayMeta } from "@/lib/pdf/overlays";
import { renderSignDatePng, resolveSignDateLabel } from "@/lib/sign-workspace/sign-date";

type DateSourcePanelProps = {
  size: number;
  onSizeChange: (value: number) => void;
  onAssetChange: (dataUrl: string | null) => void;
  onMetaChange: (meta: SignDateOverlayMeta | null) => void;
};

export function DateSourcePanel({
  size,
  onSizeChange,
  onAssetChange,
  onMetaChange,
}: DateSourcePanelProps) {
  const { locale, t } = useI18n();
  const [instant, setInstant] = useState<Date | undefined>(undefined);
  const [format, setFormat] = useState<DateStampFormat>("date");
  const [color, setColor] = useState<string>(DATE_STAMP_INK_PRESETS[0].color);
  const [customLabel, setCustomLabel] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    setInstant(new Date());
    setFormat("date");
    setColor(DATE_STAMP_INK_PRESETS[0].color);
    setCustomLabel("");
  }, []);

  const meta = useMemo((): SignDateOverlayMeta | null => {
    if (!instant) return null;
    return {
      instant: instant.toISOString(),
      format,
      color,
      customLabel: customLabel.trim() || undefined,
    };
  }, [instant, format, color, customLabel]);

  const previewText = useMemo(() => {
    if (!meta) return "";
    return resolveSignDateLabel(meta, locale);
  }, [meta, locale]);

  useEffect(() => {
    onMetaChange(meta);
  }, [meta, onMetaChange]);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      if (!meta || !previewText.trim()) {
        setPreviewUrl(null);
        onAssetChange(null);
        return;
      }
      try {
        const dataUrl = await renderSignDatePng(previewText, meta.color);
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
  }, [meta, previewText, onAssetChange]);

  if (!instant) return null;

  return (
    <div className="min-w-0 space-y-2">
      <DateStampControls
        compact
        editingSelected={false}
        format={format}
        onFormatChange={setFormat}
        instant={instant}
        onInstantChange={setInstant}
        color={color}
        onColorChange={setColor}
        size={size}
        onSizeChange={onSizeChange}
        showSize={false}
      />
      <label className="block text-xs text-gray-400">
        {t.sign.dateOnPageLabel}
        <input
          className="input-field mt-1 text-sm"
          value={customLabel}
          onChange={(e) => setCustomLabel(e.target.value)}
          placeholder={previewText}
        />
      </label>
      <div className="rounded-lg border border-slate-400/40 bg-[#f4f1ea] px-3 py-3 shadow-inner">
        {previewUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={previewUrl}
            alt=""
            className="mx-auto max-h-16 w-auto max-w-full object-contain"
          />
        ) : (
          <p className="text-center text-xs text-slate-500">{t.sign.typePreviewEmpty}</p>
        )}
      </div>
      <label className="block text-sm text-gray-400">
        {t.sign.size}
        <input
          type="range"
          min={0.12}
          max={0.5}
          step={0.01}
          value={size}
          onChange={(e) => onSizeChange(Number(e.target.value))}
          className="mt-1 w-full touch-none"
        />
      </label>
    </div>
  );
}