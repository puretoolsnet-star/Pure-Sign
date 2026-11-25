import { dateStampDimensionsForWidth } from "@/lib/date-stamp/render-overlay";
import {
  metaToRenderOptions,
  renderDocumentStampPng,
  type StampRenderOptions,
} from "@/lib/stamps/render-stamp";
import type { DocumentStampMeta } from "@/lib/stamps/types";

export async function resignStampOverlayGraphics(
  meta: DocumentStampMeta,
  relativeWidth: number,
  pageSize: { width: number; height: number },
) {
  const dataUrl = await renderDocumentStampPng(metaToRenderOptions(meta));
  const dims = await dateStampDimensionsForWidth(
    dataUrl,
    pageSize.width,
    pageSize.height,
    relativeWidth,
  );
  return { dataUrl, height: dims.height };
}

export async function renderStampForInsert(meta: DocumentStampMeta) {
  return renderDocumentStampPng(metaToRenderOptions(meta));
}

export type { StampRenderOptions };