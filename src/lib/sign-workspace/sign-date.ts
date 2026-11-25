import { formatDateStampText, type DateStampFormat } from "@/lib/date-stamp/format";
import { dateStampDimensionsForWidth } from "@/lib/date-stamp/render-overlay";
import type { SignDateOverlayMeta } from "@/lib/pdf/overlays";
import { renderStampPng } from "@/lib/pdf/stamp-image";

export function resolveSignDateLabel(meta: SignDateOverlayMeta, locale: string) {
  const custom = meta.customLabel?.trim();
  if (custom) return custom;
  return formatDateStampText(new Date(meta.instant), meta.format, locale);
}

/** @deprecated legacy overlay meta with only label */
export function normalizeSignDateMeta(
  raw: SignDateOverlayMeta | { label: string; color: string } | undefined,
  locale: string,
): SignDateOverlayMeta | null {
  if (!raw) return null;
  if ("instant" in raw && raw.instant) {
    return {
      instant: raw.instant,
      format: raw.format,
      color: raw.color,
      customLabel: raw.customLabel,
    };
  }
  if ("label" in raw) {
    return {
      instant: new Date().toISOString(),
      format: "date",
      color: raw.color,
      customLabel: raw.label,
    };
  }
  return null;
}

export async function renderSignDatePng(label: string, color: string) {
  const text = label.trim();
  if (!text) throw new Error("empty");
  return renderStampPng({ text, color });
}

export async function resignDateOverlayGraphics(
  meta: SignDateOverlayMeta,
  locale: string,
  relativeWidth: number,
  pageSize: { width: number; height: number },
) {
  const label = resolveSignDateLabel(meta, locale);
  const dataUrl = await renderSignDatePng(label, meta.color);
  const dims = await dateStampDimensionsForWidth(
    dataUrl,
    pageSize.width,
    pageSize.height,
    relativeWidth,
  );
  return { dataUrl, height: dims.height };
}

export type { DateStampFormat };