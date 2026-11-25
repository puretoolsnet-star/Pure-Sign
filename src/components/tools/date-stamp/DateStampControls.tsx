"use client";

import { useMemo } from "react";

import { DATE_STAMP_INK_PRESETS } from "@/lib/date-stamp/ink-presets";
import {
  formatDateStampText,
  toDateInputValue,
  toTimeInputValue,
  type DateStampFormat,
} from "@/lib/date-stamp/format";
import { useI18n } from "@/i18n/context";
import { cn } from "@/lib/cn";

type DateStampControlsProps = {
  format: DateStampFormat;
  onFormatChange: (format: DateStampFormat) => void;
  instant: Date;
  onInstantChange: (instant: Date) => void;
  color: string;
  onColorChange: (color: string) => void;
  size: number;
  onSizeChange: (size: number) => void;
  editingSelected: boolean;
  compact?: boolean;
  showSize?: boolean;
};

export function DateStampControls({
  format,
  onFormatChange,
  instant,
  onInstantChange,
  color,
  onColorChange,
  size,
  onSizeChange,
  editingSelected,
  compact,
  showSize = true,
}: DateStampControlsProps) {
  const { locale, t } = useI18n();
  const preview = useMemo(
    () => formatDateStampText(instant, format, locale),
    [instant, format, locale],
  );

  const inkLabel = (id: (typeof DATE_STAMP_INK_PRESETS)[number]["id"]) => {
    if (id === "black") return t.sign.inkBlack;
    if (id === "ballpoint") return t.sign.inkBallpoint;
    if (id === "graphite") return t.sign.inkGraphite;
    if (id === "blue") return t.sign.inkBlue;
    if (id === "red") return t.sign.inkRed;
    return t.dateStamp.customColor;
  };

  const presetColors: string[] = DATE_STAMP_INK_PRESETS.map((p) => p.color);
  const customActive = !presetColors.includes(color);

  return (
    <div
      className={cn(
        compact ? "space-y-2" : "glass-card space-y-3 rounded-2xl border-slate-800/60 p-3 sm:space-y-4 sm:p-4",
      )}
    >
      {editingSelected ? (
        <p className="text-xs text-cyan-400/90">{t.dateStamp.editSelectedHint}</p>
      ) : null}

      <div>
        <p className="text-[11px] font-medium uppercase tracking-wider text-gray-500">
          {t.dateStamp.formatLabel}
        </p>
        <div className="mt-2 flex flex-wrap gap-1.5">
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
              onClick={() => onFormatChange(value)}
              className={cn(
                "rounded-xl px-2.5 py-1.5 text-xs font-medium sm:px-3 sm:py-2 sm:text-sm",
                format === value
                  ? "bg-cyan-500/20 text-white"
                  : "text-gray-400 hover:bg-white/5 hover:text-white",
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-end">
        {(format === "date" || format === "datetime") && (
          <label className="min-w-0 flex-1 text-xs text-gray-400 sm:max-w-[11rem]">
            {t.dateStamp.pickDate}
            <input
              type="date"
              value={toDateInputValue(instant)}
              onChange={(event) => {
                const [y, m, d] = event.target.value.split("-").map(Number);
                if (!y || !m || !d) return;
                const next = new Date(instant);
                next.setFullYear(y, m - 1, d);
                onInstantChange(next);
              }}
              className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900/80 px-2 py-2 text-sm text-white [color-scheme:dark]"
            />
          </label>
        )}
        {(format === "time" || format === "datetime") && (
          <label className="min-w-0 flex-1 text-xs text-gray-400 sm:max-w-[8.5rem]">
            {t.dateStamp.pickTime}
            <input
              type="time"
              value={toTimeInputValue(instant)}
              onChange={(event) => {
                const [h, min] = event.target.value.split(":").map(Number);
                if (Number.isNaN(h) || Number.isNaN(min)) return;
                const next = new Date(instant);
                next.setHours(h, min, 0, 0);
                onInstantChange(next);
              }}
              className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900/80 px-2 py-2 text-sm text-white [color-scheme:dark]"
            />
          </label>
        )}
        <button
          type="button"
          className="btn-secondary w-full shrink-0 px-3 py-2 text-xs sm:w-auto sm:text-sm"
          onClick={() => onInstantChange(new Date())}
        >
          {t.dateStamp.today}
        </button>
      </div>

      <p className="text-sm text-gray-300">
        <span className="text-gray-500">{t.dateStamp.previewLabel}: </span>
        <span className="font-medium" style={{ color }}>
          {preview}
        </span>
      </p>

      <div>
        <p className="text-[11px] font-medium uppercase tracking-wider text-gray-500">
          {t.dateStamp.digitColor}
        </p>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          {DATE_STAMP_INK_PRESETS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              aria-label={inkLabel(preset.id)}
              title={inkLabel(preset.id)}
              onClick={() => onColorChange(preset.color)}
              className={cn(
                "h-8 w-8 rounded-full ring-2 ring-offset-2 ring-offset-slate-900",
                color === preset.color ? preset.ring : "ring-transparent",
              )}
              style={{ backgroundColor: preset.color }}
            />
          ))}
          <label className="flex items-center gap-2 text-xs text-gray-500">
            <span className="sr-only sm:not-sr-only">{t.dateStamp.customColor}</span>
            <input
              type="color"
              value={customActive ? color : "#111111"}
              onChange={(event) => onColorChange(event.target.value)}
              className={cn(
                "h-8 w-10 cursor-pointer rounded border border-slate-600 bg-transparent",
                customActive && "ring-2 ring-cyan-400/60",
              )}
              aria-label={t.dateStamp.customColor}
            />
          </label>
        </div>
      </div>

      {showSize ? (
        <label className="block text-xs text-gray-400 sm:text-sm">
          {t.dateStamp.size}
          <input
            type="range"
            min={0.12}
            max={0.5}
            step={0.01}
            value={size}
            onChange={(event) => onSizeChange(Number(event.target.value))}
            className="mt-1 w-full touch-none"
          />
        </label>
      ) : null}

      {!compact ? (
        <p className="text-[11px] leading-snug text-gray-500 sm:text-xs">{t.dateStamp.placeHint}</p>
      ) : null}
    </div>
  );
}