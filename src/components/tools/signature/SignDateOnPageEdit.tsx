"use client";

import { useEffect, useRef, useState } from "react";

import { DateStampControls } from "@/components/tools/date-stamp/DateStampControls";
import { useI18n } from "@/i18n/context";
import type { DateStampFormat } from "@/lib/date-stamp/format";
import { formatDateStampText } from "@/lib/date-stamp/format";
import type { PdfOverlay, SignDateOverlayMeta } from "@/lib/pdf/overlays";
import {
  normalizeSignDateMeta,
  resignDateOverlayGraphics,
  resolveSignDateLabel,
} from "@/lib/sign-workspace/sign-date";

type SignDateOnPageEditProps = {
  overlay: PdfOverlay;
  pageSize: { width: number; height: number };
  onOverlayPatched: (id: string, patch: Partial<PdfOverlay>) => void;
};

export function SignDateOnPageEdit({
  overlay,
  pageSize,
  onOverlayPatched,
}: SignDateOnPageEditProps) {
  const { locale, t } = useI18n();
  const skip = useRef(false);

  const resolveInitial = () =>
    normalizeSignDateMeta(
      overlay.signDateMeta ??
        (overlay.stampMeta
          ? {
              instant: overlay.stampMeta.instant,
              format: overlay.stampMeta.format,
              color: overlay.stampMeta.color,
            }
          : undefined),
      locale,
    );

  const [format, setFormat] = useState<DateStampFormat>("date");
  const [instant, setInstant] = useState(() => new Date());
  const [color, setColor] = useState("#111111");
  const [customLabel, setCustomLabel] = useState("");

  useEffect(() => {
    skip.current = true;
    const next = resolveInitial();
    if (!next) return;
    setFormat(next.format);
    setInstant(new Date(next.instant));
    setColor(next.color);
    setCustomLabel(next.customLabel ?? "");
  }, [overlay.id, overlay.signDateMeta, overlay.stampMeta, locale]); // eslint-disable-line react-hooks/exhaustive-deps

  const initial = resolveInitial();
  if (!initial) return null;

  const buildMeta = (): SignDateOverlayMeta => ({
    instant: instant.toISOString(),
    format,
    color,
    customLabel: customLabel.trim() || undefined,
  });

  const apply = async (meta: SignDateOverlayMeta) => {
    if (!resolveSignDateLabel(meta, locale).trim()) return;
    const { dataUrl, height } = await resignDateOverlayGraphics(
      meta,
      locale,
      overlay.width,
      pageSize,
    );
    onOverlayPatched(overlay.id, {
      kind: "image",
      dataUrl,
      height,
      color: meta.color,
      signDateMeta: meta,
      stampMeta: undefined,
    });
  };

  const maybeApply = (meta: SignDateOverlayMeta) => {
    if (skip.current) {
      skip.current = false;
      return;
    }
    void apply(meta);
  };

  const formatted = formatDateStampText(instant, format, locale);

  return (
    <div className="space-y-2 rounded-xl border border-slate-800/80 bg-slate-900/60 px-2 py-2">
      <DateStampControls
        compact
        editingSelected
        showSize={false}
        format={format}
        onFormatChange={(value) => {
          setFormat(value);
          maybeApply({ ...buildMeta(), format: value });
        }}
        instant={instant}
        onInstantChange={(value) => {
          setInstant(value);
          maybeApply({ ...buildMeta(), instant: value.toISOString() });
        }}
        color={color}
        onColorChange={(value) => {
          setColor(value);
          maybeApply({ ...buildMeta(), color: value });
        }}
        size={overlay.width}
        onSizeChange={() => undefined}
      />
      <input
        className="input-field py-1.5 text-sm"
        value={customLabel}
        onChange={(e) => {
          const v = e.target.value;
          setCustomLabel(v);
          maybeApply({ ...buildMeta(), customLabel: v.trim() || undefined });
        }}
        onBlur={() => void apply(buildMeta())}
        placeholder={formatted}
        aria-label={t.sign.dateOnPageLabel}
      />
    </div>
  );
}