"use client";

import { DATE_STAMP_INK_PRESETS } from "@/lib/date-stamp/ink-presets";
import { DOCUMENT_TEXT_FONTS, type DocumentTextFontId } from "@/lib/document-text/fonts";
import { useI18n } from "@/i18n/context";
import { cn } from "@/lib/cn";

type DocumentTextEditorProps = {
  text: string;
  onTextChange: (value: string) => void;
  fontId: DocumentTextFontId;
  onFontIdChange: (id: DocumentTextFontId) => void;
  color: string;
  onColorChange: (color: string) => void;
  size?: number;
  onSizeChange?: (size: number) => void;
  compact?: boolean;
  editingSelected?: boolean;
};

export function DocumentTextEditor({
  text,
  onTextChange,
  fontId,
  onFontIdChange,
  color,
  onColorChange,
  size,
  onSizeChange,
  compact,
  editingSelected,
}: DocumentTextEditorProps) {
  const { t } = useI18n();
  const sample = text.trim() || t.sign.documentFontPreviewSample;
  const presetColors: string[] = DATE_STAMP_INK_PRESETS.map((p) => p.color);
  const customActive = !presetColors.includes(color);

  const fontLabel = (id: DocumentTextFontId) => {
    if (id === "sans") return t.sign.documentFontSans;
    if (id === "serif") return t.sign.documentFontSerif;
    if (id === "script") return t.sign.documentFontScript;
    return t.sign.documentFontMono;
  };

  const previewClass =
    DOCUMENT_TEXT_FONTS.find((f) => f.id === fontId)?.previewClass ?? "font-sans font-semibold";

  return (
    <div className={cn("space-y-3", compact && "space-y-2")}>
      {editingSelected ? (
        <p className="text-xs text-cyan-400/90">{t.sign.editTextOnDocument}</p>
      ) : null}
      <input
        className="input-field text-sm"
        value={text}
        onChange={(e) => onTextChange(e.target.value)}
        placeholder={t.sign.textOnPagePlaceholder}
      />
      <div>
        <p className="text-[11px] font-medium uppercase tracking-wider text-gray-500">
          {t.sign.documentFontLabel}
        </p>
        <div className="mt-1.5 grid grid-cols-2 gap-1.5 sm:grid-cols-4">
          {DOCUMENT_TEXT_FONTS.map((font) => (
            <button
              key={font.id}
              type="button"
              onClick={() => onFontIdChange(font.id)}
              className={cn(
                "rounded-xl border px-2 py-2 text-left text-[11px] leading-tight transition-colors",
                fontId === font.id
                  ? "border-cyan-500/50 bg-cyan-500/15 text-white"
                  : "border-slate-800/80 bg-slate-900/50 text-gray-400 hover:border-slate-700",
              )}
            >
              <span className="block truncate font-medium">{fontLabel(font.id)}</span>
              <span
                className={cn(
                  "mt-1 block truncate text-base text-gray-100",
                  font.id === "sans" && "font-sans font-semibold",
                  font.id === "serif" && "font-serif font-semibold",
                  font.id === "script" && "italic font-semibold",
                  font.id === "mono" && "font-mono text-sm font-medium",
                )}
                style={{ color }}
              >
                {sample.slice(0, 18)}
              </span>
            </button>
          ))}
        </div>
      </div>
      <div
        className="rounded-xl border border-slate-800/70 bg-[#f4f1ea] px-3 py-2.5"
        aria-live="polite"
      >
        <p className="text-[10px] uppercase tracking-wide text-slate-500">{t.sign.documentFontPreview}</p>
        <p className={cn("mt-1 truncate text-lg text-slate-900", previewClass)} style={{ color }}>
          {sample}
        </p>
      </div>
      <div>
        <p className="text-[11px] font-medium uppercase tracking-wider text-gray-500">
          {t.sign.documentTextColor}
        </p>
        <div className="mt-1.5 flex flex-wrap items-center gap-2">
          {DATE_STAMP_INK_PRESETS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => onColorChange(preset.color)}
              className={cn(
                "h-7 w-7 rounded-full ring-2 ring-offset-2 ring-offset-slate-900",
                color === preset.color ? preset.ring : "ring-transparent",
              )}
              style={{ backgroundColor: preset.color }}
            />
          ))}
          <input
            type="color"
            value={customActive ? color : "#111111"}
            onChange={(e) => onColorChange(e.target.value)}
            className={cn(
              "h-8 w-10 cursor-pointer rounded border border-slate-600 bg-transparent",
              customActive && "ring-2 ring-cyan-400/60",
            )}
            aria-label={t.dateStamp.customColor}
          />
        </div>
      </div>
      {onSizeChange && size !== undefined ? (
        <label className="block text-xs text-gray-400">
          {t.sign.sizeOnDocument}
          <input
            type="range"
            min={0.08}
            max={0.55}
            step={0.005}
            value={size}
            onChange={(e) => onSizeChange(Number(e.target.value))}
            className="mt-1 w-full touch-none"
          />
        </label>
      ) : null}
    </div>
  );
}