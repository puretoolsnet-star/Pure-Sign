"use client";

import { useEffect, useState, type ReactNode } from "react";

import { INK_PRESETS } from "@/components/tools/SignaturePad";
import { SignaturePaperSurface } from "@/components/tools/signature/SignaturePaperSurface";
import type { PadSurfaceMode } from "@/lib/signatures/paper-surface";

/** Mini preview on white paper — mimics how ink looks on the document. */
function DocumentPaperPreview({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-lg border border-slate-400/40 bg-white px-2 py-1 shadow-inner ${className ?? ""}`}
    >
      {children}
    </div>
  );
}
import { useI18n } from "@/i18n/context";
import { cn } from "@/lib/cn";
import {
  renderTypedSignaturePng,
  type TypedSignatureStyle,
} from "@/lib/pdf/stamp-image";

type TypedSignatureEditorProps = {
  value: string;
  onChange: (value: string) => void;
  style: TypedSignatureStyle;
  onStyleChange: (style: TypedSignatureStyle) => void;
  color: string;
  onColorChange: (color: string) => void;
  onPreview: (dataUrl: string | null) => void;
  displaySurface?: PadSurfaceMode;
};

export function TypedSignatureEditor({
  value,
  onChange,
  style,
  onStyleChange,
  color,
  onColorChange,
  onPreview,
  displaySurface = "paper",
}: TypedSignatureEditorProps) {
  const { t } = useI18n();
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function run() {
      if (!value.trim()) {
        setPreview(null);
        onPreview(null);
        return;
      }
      const dataUrl = await renderTypedSignaturePng(value.trim(), { style, color });
      if (cancelled) return;
      setPreview(dataUrl);
      onPreview(dataUrl);
    }
    void run();
    return () => {
      cancelled = true;
    };
  }, [value, style, color, onPreview]);

  return (
    <div className="min-w-0 space-y-3">
      <input
        className="input-field"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={t.sign.typePlaceholder}
      />
      <TypeStylePicker label={t.sign.typeStyle} t={t} style={style} onStyleChange={onStyleChange} />
      <p className="text-[11px] text-gray-500">{t.sign.documentInkPreview}</p>
      <div className="flex min-w-0 flex-wrap items-center gap-2">
        <span className="w-full text-xs text-gray-500 sm:w-auto">{t.sign.inkColor}</span>
        {INK_PRESETS.map((preset) => (
          <button
            key={preset.id}
            type="button"
            aria-pressed={color === preset.color}
            onClick={() => onColorChange(preset.color)}
            className={cn(
              "h-7 w-7 rounded-full border border-slate-700/80 ring-2 ring-offset-2 ring-offset-slate-900",
              color === preset.color ? preset.ring : "ring-transparent",
            )}
            style={{ backgroundColor: preset.color }}
          />
        ))}
      </div>
      <div aria-label={t.sign.typePreview}>
      <SignaturePaperSurface
        mode={displaySurface}
        className="flex h-20 min-h-20 items-center justify-center px-3"
        showBaseline
      >
        {preview ? (
          <DocumentPaperPreview className="mx-auto w-fit max-w-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={preview}
              alt=""
              className="signature-overlay-image max-h-14 max-w-full object-contain"
            />
          </DocumentPaperPreview>
        ) : (
          <span
            className={cn(
              "text-xs",
              displaySurface === "dark" ? "text-slate-400" : "text-slate-500",
            )}
          >
            {t.sign.typePreviewEmpty}
          </span>
        )}
      </SignaturePaperSurface>
      </div>
    </div>
  );
}

function TypeStylePicker({
  label,
  t,
  style,
  onStyleChange,
}: {
  label: string;
  t: ReturnType<typeof useI18n>["t"];
  style: TypedSignatureStyle;
  onStyleChange: (s: TypedSignatureStyle) => void;
}) {
  return (
    <div className="flex min-w-0 flex-wrap gap-2">
      <span className="w-full text-xs text-gray-500">{label}</span>
      {(["script", "business"] as const).map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => onStyleChange(item)}
          className={cn(
            "min-w-0 flex-1 rounded-xl px-3 py-2 text-xs font-medium sm:flex-none",
            style === item
              ? "bg-cyan-500/20 text-white"
              : "text-gray-400 hover:bg-white/5 hover:text-white",
          )}
        >
          {item === "script" ? t.sign.typeStyleScript : t.sign.typeStyleBusiness}
        </button>
      ))}
    </div>
  );
}