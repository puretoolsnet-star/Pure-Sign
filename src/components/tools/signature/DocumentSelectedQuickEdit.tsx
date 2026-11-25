"use client";

import { useEffect, useRef, useState } from "react";

import { useI18n } from "@/i18n/context";
import { cn } from "@/lib/cn";
import { DATE_STAMP_INK_PRESETS } from "@/lib/date-stamp/ink-presets";
import { DOCUMENT_TEXT_FONTS, type DocumentTextFontId } from "@/lib/document-text/fonts";
import { renderDocumentTextPng, textOverlayDimensionsForWidth } from "@/lib/document-text/render-text-png";
import type { PdfOverlay } from "@/lib/pdf/overlays";
import { SignDateOnPageEdit } from "@/components/tools/signature/SignDateOnPageEdit";
import { resignStampOverlayGraphics } from "@/lib/sign-workspace/sign-stamp";
import { STAMP_INK_PRESETS } from "@/lib/stamps/stamp-ink-presets";
import type { DocumentStampMeta } from "@/lib/stamps/types";

type DocumentSelectedQuickEditProps = {
  overlay: PdfOverlay;
  pageSize: { width: number; height: number };
  onOverlayPatched: (id: string, patch: Partial<PdfOverlay>) => void;
};

export function DocumentSelectedQuickEdit({
  overlay,
  pageSize,
  onOverlayPatched,
}: DocumentSelectedQuickEditProps) {
  const isStamp = Boolean(overlay.documentStampMeta);
  const isDate = Boolean(overlay.signDateMeta || overlay.stampMeta);
  const isText = Boolean(overlay.textMeta || overlay.kind === "text");

  if (!isStamp && !isDate && !isText) return null;

  if (isStamp) {
    return <StampQuickEdit overlay={overlay} pageSize={pageSize} onOverlayPatched={onOverlayPatched} />;
  }

  if (isDate) {
    return (
      <SignDateOnPageEdit overlay={overlay} pageSize={pageSize} onOverlayPatched={onOverlayPatched} />
    );
  }

  return <TextQuickEdit overlay={overlay} pageSize={pageSize} onOverlayPatched={onOverlayPatched} />;
}

function StampQuickEdit({
  overlay,
  pageSize,
  onOverlayPatched,
}: {
  overlay: PdfOverlay;
  pageSize: { width: number; height: number };
  onOverlayPatched: DocumentSelectedQuickEditProps["onOverlayPatched"];
}) {
  const { t } = useI18n();
  const skip = useRef(false);
  const meta = overlay.documentStampMeta!;
  const [label, setLabel] = useState(meta.label);
  const [ringText, setRingText] = useState(meta.ringText);
  const [color, setColor] = useState(meta.color);
  const [lightImprint, setLightImprint] = useState(meta.lightImprint);

  useEffect(() => {
    skip.current = true;
    setLabel(meta.label);
    setRingText(meta.ringText);
    setColor(meta.color);
    setLightImprint(meta.lightImprint);
  }, [overlay.id, meta.label, meta.ringText, meta.color, meta.lightImprint]);

  const apply = async (next: DocumentStampMeta) => {
    if (!next.label.trim()) return;
    const { dataUrl, height } = await resignStampOverlayGraphics(
      next,
      overlay.width,
      pageSize,
    );
    onOverlayPatched(overlay.id, {
      kind: "image",
      dataUrl,
      height,
      color: next.color,
      documentStampMeta: next,
    });
  };

  const maybeApply = (next: DocumentStampMeta) => {
    if (skip.current) {
      skip.current = false;
      return;
    }
    void apply(next);
  };

  const snapshot = (): DocumentStampMeta => ({
    shape: meta.shape,
    label,
    ringText: ringText.trim() || label.trim(),
    color,
    lightImprint,
  });

  return (
    <div className="space-y-1.5 rounded-xl border border-slate-800/80 bg-slate-900/60 px-2 py-2">
      <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center">
        <input
          className="input-field min-w-0 flex-1 py-1.5 text-sm"
          value={label}
          onChange={(e) => {
            setLabel(e.target.value);
            maybeApply({ ...snapshot(), label: e.target.value });
          }}
          onBlur={() => void apply(snapshot())}
          aria-label={meta.shape === "round" ? t.sign.stampCenterText : t.stamp.customLabel}
        />
        <div className="flex shrink-0 flex-wrap items-center gap-1.5">
          {STAMP_INK_PRESETS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => {
                setColor(preset.color);
                maybeApply({ ...snapshot(), color: preset.color });
              }}
              className={cn(
                "h-7 w-7 rounded-full ring-2 ring-offset-1 ring-offset-slate-900",
                color === preset.color ? preset.ring : "ring-transparent",
              )}
              style={{ backgroundColor: preset.color }}
            />
          ))}
        </div>
      </div>
      {meta.shape === "round" ? (
        <input
          className="input-field py-1.5 text-sm"
          value={ringText}
          onChange={(e) => {
            setRingText(e.target.value);
            maybeApply({ ...snapshot(), ringText: e.target.value });
          }}
          onBlur={() => void apply(snapshot())}
          placeholder={t.sign.stampRingPlaceholder}
          aria-label={t.sign.stampRingText}
        />
      ) : null}
      <label className="flex items-center gap-2 text-[11px] text-gray-500">
        <input
          type="checkbox"
          checked={lightImprint}
          onChange={(e) => {
            setLightImprint(e.target.checked);
            maybeApply({ ...snapshot(), lightImprint: e.target.checked });
          }}
        />
        {t.sign.stampLightImprint}
      </label>
    </div>
  );
}

function TextQuickEdit({
  overlay,
  pageSize,
  onOverlayPatched,
}: {
  overlay: PdfOverlay;
  pageSize: { width: number; height: number };
  onOverlayPatched: DocumentSelectedQuickEditProps["onOverlayPatched"];
}) {
  const { t } = useI18n();
  const skip = useRef(false);
  const [fontId, setFontId] = useState<DocumentTextFontId>(overlay.textMeta?.fontId ?? "sans");
  const [text, setText] = useState(overlay.textMeta?.text ?? overlay.text ?? "");
  const [color, setColor] = useState(
    overlay.textMeta?.color ?? overlay.color ?? DATE_STAMP_INK_PRESETS[0].color,
  );

  useEffect(() => {
    skip.current = true;
    setFontId(overlay.textMeta?.fontId ?? "sans");
    setText(overlay.textMeta?.text ?? overlay.text ?? "");
    setColor(overlay.textMeta?.color ?? overlay.color ?? DATE_STAMP_INK_PRESETS[0].color);
  }, [overlay.id, overlay.text, overlay.textMeta, overlay.color]);

  const apply = async (nextText: string, nextColor: string, nextFontId: DocumentTextFontId) => {
    const trimmed = nextText.trim();
    if (!trimmed) return;
    const dataUrl = await renderDocumentTextPng({
      text: trimmed,
      color: nextColor,
      fontId: nextFontId,
    });
    const dims = await textOverlayDimensionsForWidth(
      dataUrl,
      pageSize.width,
      pageSize.height,
      overlay.width,
    );
    onOverlayPatched(overlay.id, {
      kind: "image",
      dataUrl,
      height: dims.height,
      text: undefined,
      textMeta: { text: trimmed, color: nextColor, fontId: nextFontId },
      color: nextColor,
    });
  };

  const maybeApply = (nextText: string, nextColor: string, nextFontId: DocumentTextFontId) => {
    if (skip.current) {
      skip.current = false;
      return;
    }
    void apply(nextText, nextColor, nextFontId);
  };

  const fontLabel = (id: DocumentTextFontId) => {
    if (id === "sans") return t.sign.documentFontSans;
    if (id === "serif") return t.sign.documentFontSerif;
    if (id === "script") return t.sign.documentFontScript;
    return t.sign.documentFontMono;
  };

  return (
    <div className="space-y-2 rounded-xl border border-slate-800/80 bg-slate-900/60 px-2 py-2">
      <p className="text-xs text-cyan-400/90">{t.sign.editTextOnDocument}</p>
      <input
        className="input-field w-full py-1.5 text-sm"
        value={text}
        onChange={(e) => {
          const v = e.target.value;
          setText(v);
          maybeApply(v, color, fontId);
        }}
        onBlur={() => void apply(text, color, fontId)}
        aria-label={t.sign.textOnPagePlaceholder}
        placeholder={t.sign.textOnPagePlaceholder}
      />
      <div className="grid grid-cols-4 gap-1">
        {DOCUMENT_TEXT_FONTS.map((font) => (
          <button
            key={font.id}
            type="button"
            title={fontLabel(font.id)}
            onClick={() => {
              setFontId(font.id);
              void apply(text, color, font.id);
            }}
            className={cn(
              "truncate rounded-lg border px-1 py-1 text-[10px]",
              fontId === font.id
                ? "border-cyan-500/50 bg-cyan-500/15 text-white"
                : "border-slate-800/80 text-gray-400",
              font.previewClass,
            )}
          >
            Aa
          </button>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-1.5">
        {DATE_STAMP_INK_PRESETS.map((preset) => (
          <button
            key={preset.id}
            type="button"
            onClick={() => {
              setColor(preset.color);
              maybeApply(text, preset.color, fontId);
            }}
            className={cn(
              "h-7 w-7 rounded-full ring-2 ring-offset-1 ring-offset-slate-900",
              color === preset.color ? preset.ring : "ring-transparent",
            )}
            style={{ backgroundColor: preset.color }}
          />
        ))}
      </div>
    </div>
  );
}