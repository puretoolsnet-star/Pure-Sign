"use client";

import { Download, Loader2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { PdfPageCanvas } from "@/components/tools/PdfPageCanvas";
import { DATE_STAMP_INK_PRESETS } from "@/lib/date-stamp/ink-presets";
import type { DocumentTextFontId } from "@/lib/document-text/fonts";
import { DOCUMENT_TEXT_FONTS } from "@/lib/document-text/fonts";
import { renderDocumentTextPng } from "@/lib/document-text/render-text-png";
import { useI18n } from "@/i18n/context";
import { cn } from "@/lib/cn";
import {
  formatPageNumberLabel,
  pageNumberRelativeBox,
  resolveDisplayedPageNumbers,
} from "@/lib/pdf/page-number-layout";
import {
  addPageNumbers,
  type PageNumberFormat,
  type PageNumberPosition,
} from "@/lib/pdf/page-numbers";
import type { PdfOverlay } from "@/lib/pdf/overlays";
import { overlaySizeFromImage } from "@/lib/pdf/pick-pdf";
import { loadImageSize } from "@/lib/signatures/load-image-size";

type PageNumbersWorkspaceProps = {
  file: File;
  pageImage: string | null;
  pageIndex: number;
  numPages: number;
  pageSize: { width: number; height: number };
  loading: boolean;
  onPageChange: (index: number) => void;
  onError: (message: string | null) => void;
  requestDownload: (task: () => Promise<void>) => void;
  downloading: boolean;
  downloadLabel: string;
};

const POSITIONS: PageNumberPosition[] = [
  "header-left",
  "header-center",
  "header-right",
  "footer-left",
  "footer-center",
  "footer-right",
];

export function PageNumbersWorkspace({
  file,
  pageImage,
  pageIndex,
  numPages,
  pageSize,
  loading,
  onPageChange,
  onError,
  requestDownload,
  downloading,
  downloadLabel,
}: PageNumbersWorkspaceProps) {
  const { t } = useI18n();
  const [position, setPosition] = useState<PageNumberPosition>("footer-center");
  const [format, setFormat] = useState<PageNumberFormat>("of");
  const [fontSize, setFontSize] = useState(12);
  const [margin, setMargin] = useState(24);
  const [fontId, setFontId] = useState<DocumentTextFontId>("sans");
  const [color, setColor] = useState<string>(DATE_STAMP_INK_PRESETS[0].color);
  const [skipFirstPage, setSkipFirstPage] = useState(false);
  const [startNumber, setStartNumber] = useState(1);
  const [previewOverlays, setPreviewOverlays] = useState<PdfOverlay[]>([]);

  const resolved = useMemo(
    () => resolveDisplayedPageNumbers(pageIndex, numPages, startNumber, skipFirstPage),
    [pageIndex, numPages, skipFirstPage, startNumber],
  );

  const totalNumbered = useMemo(
    () => (skipFirstPage ? Math.max(0, numPages - 1) : numPages),
    [numPages, skipFirstPage],
  );

  const previewLabel = useMemo(() => {
    if (!resolved) return "";
    return formatPageNumberLabel(format, resolved.display, resolved.totalNumbered, (c, total) =>
      t.common.pageLabel(c, total),
    );
  }, [format, resolved, t.common]);

  useEffect(() => {
    let cancelled = false;
    if (!pageImage || numPages === 0 || !resolved || !previewLabel) {
      setPreviewOverlays([]);
      return;
    }

    void (async () => {
      try {
        const dataUrl = await renderDocumentTextPng({
          text: previewLabel,
          color,
          fontId,
        });
        const image = await loadImageSize(dataUrl);
        const textWidthPt = previewLabel.length * fontSize * 0.52;
        const rel = pageNumberRelativeBox(
          position,
          margin,
          fontSize,
          textWidthPt,
          pageSize.width,
          pageSize.height,
        );
        const relativeWidth = Math.min(0.45, (textWidthPt / pageSize.width) * 1.05);
        const dims = overlaySizeFromImage(
          image.width,
          image.height,
          pageSize.width,
          pageSize.height,
          relativeWidth,
        );
        if (cancelled) return;
        setPreviewOverlays([
          {
            id: "page-number-preview",
            pageIndex,
            kind: "image",
            dataUrl,
            x: rel.x,
            y: rel.y,
            width: dims.width,
            height: dims.height,
          },
        ]);
      } catch {
        if (!cancelled) setPreviewOverlays([]);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [
    color,
    fontId,
    fontSize,
    margin,
    pageImage,
    pageIndex,
    pageSize.height,
    pageSize.width,
    position,
    previewLabel,
    skipFirstPage,
    startNumber,
    numPages,
    resolved,
  ]);

  const positionLabel = (pos: PageNumberPosition) => {
    const map: Record<PageNumberPosition, string> = {
      "header-left": t.pageNumbers.headerLeft,
      "header-center": t.pageNumbers.headerCenter,
      "header-right": t.pageNumbers.headerRight,
      "footer-left": t.pageNumbers.footerLeft,
      "footer-center": t.pageNumbers.footerCenter,
      "footer-right": t.pageNumbers.footerRight,
    };
    return map[pos];
  };

  const formatLabel = (value: PageNumberFormat) => {
    if (value === "simple") return t.pageNumbers.formatSimple;
    if (value === "of") return t.pageNumbers.formatOf;
    return t.pageNumbers.formatPageOf;
  };

  const fontLabel = (id: DocumentTextFontId) => {
    if (id === "sans") return t.pageNumbers.fontSans;
    if (id === "serif") return t.pageNumbers.fontSerif;
    if (id === "mono") return t.pageNumbers.fontMono;
    return t.pageNumbers.fontScript;
  };

  const performDownload = async () => {
    onError(null);
    try {
      const bytes = await addPageNumbers(file, {
        position,
        format,
        fontSize,
        margin,
        color,
        fontId,
        skipFirstPage,
        startNumber,
        pageOfTemplate: (current, total) => t.common.pageLabel(current, total),
      });
      const { downloadBytes } = await import("@/lib/download");
      downloadBytes(bytes, file.name.replace(/\.pdf$/i, "") + "-numbered.pdf");
    } catch {
      onError(t.tools["page-numbers"].errors.failed);
      throw new Error("download-failed");
    }
  };

  return (
    <div className="flex min-w-0 flex-col gap-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="min-w-0 flex-1 text-xs text-gray-500">{t.pageNumbers.workspaceHint}</p>
        <button
          type="button"
          className="btn-primary inline-flex shrink-0 items-center gap-1.5 text-sm"
          disabled={downloading}
          onClick={() => requestDownload(performDownload)}
        >
          {downloading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
          {downloadLabel}
        </button>
      </div>

      <div className="flex flex-col gap-1.5 rounded-xl border border-slate-800/70 bg-slate-900/50 px-3 py-2.5 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
        <p className="text-sm font-medium text-white">{t.pageNumbers.documentPageCount(numPages)}</p>
        <p className="text-xs text-gray-400">
          {t.pageNumbers.numberedPagesCount(totalNumbered)}
          <span className="mx-2 hidden text-slate-700 sm:inline" aria-hidden>
            ·
          </span>
          <span className="mt-0.5 block sm:mt-0 sm:inline">
            {t.common.pageLabel(pageIndex + 1, numPages)}
          </span>
        </p>
      </div>

      <PdfPageCanvas
        pageImage={pageImage}
        pageIndex={pageIndex}
        numPages={numPages}
        overlays={previewOverlays}
        interaction="none"
        loading={loading}
        onPageChange={onPageChange}
      />

      <div className="glass-card space-y-4 rounded-2xl border border-slate-800/60 p-3 sm:p-4">
        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
            {t.pageNumbers.position}
          </p>
          <div className="grid max-w-xs grid-cols-3 gap-1.5 sm:max-w-sm">
            {POSITIONS.map((pos) => (
              <button
                key={pos}
                type="button"
                aria-pressed={position === pos}
                aria-label={positionLabel(pos)}
                title={positionLabel(pos)}
                onClick={() => setPosition(pos)}
                className={cn(
                  "relative aspect-[4/5] rounded-xl border bg-slate-950/80 p-1 transition-colors",
                  position === pos
                    ? "border-cyan-500/50 ring-1 ring-cyan-500/40"
                    : "border-slate-800/80 hover:border-slate-700",
                )}
              >
                <span className="block h-full w-full rounded-md border border-slate-700/60 bg-slate-900/50" />
                <span
                  className={cn(
                    "absolute h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-sm",
                    pos === "header-left" && "left-1.5 top-1.5",
                    pos === "header-center" && "left-1/2 top-1.5 -translate-x-1/2",
                    pos === "header-right" && "right-1.5 top-1.5",
                    pos === "footer-left" && "bottom-1.5 left-1.5",
                    pos === "footer-center" && "bottom-1.5 left-1/2 -translate-x-1/2",
                    pos === "footer-right" && "bottom-1.5 right-1.5",
                  )}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
            {t.pageNumbers.format}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {(["simple", "of", "page-of"] as const).map((value) => (
              <button
                key={value}
                type="button"
                aria-pressed={format === value}
                onClick={() => setFormat(value)}
                className={cn(
                  "btn-secondary px-3 py-1.5 text-xs",
                  format === value && "bg-cyan-500/20 text-white ring-1 ring-cyan-500/40",
                )}
              >
                {formatLabel(value)}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3 rounded-xl border border-slate-800/60 bg-slate-950/40 p-3">
          <label className="flex items-center gap-2 text-sm text-gray-300">
            <input
              type="checkbox"
              className="accent-primary"
              checked={skipFirstPage}
              onChange={(event) => setSkipFirstPage(event.target.checked)}
            />
            {t.pageNumbers.skipFirstPage}
          </label>
          <label className="block text-sm text-gray-300">
            {t.pageNumbers.startNumber}
            <input
              type="number"
              min={1}
              max={9999}
              className="input-field mt-1.5 w-full max-w-[8rem]"
              value={startNumber}
              onChange={(event) => {
                const next = Number(event.target.value);
                setStartNumber(Number.isFinite(next) ? Math.min(9999, Math.max(1, next)) : 1);
              }}
            />
            <span className="mt-1 block text-xs text-gray-500">{t.pageNumbers.startNumberHint}</span>
          </label>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
            {t.pageNumbers.fontLabel}
          </p>
          <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-4">
            {DOCUMENT_TEXT_FONTS.map((font) => (
              <button
                key={font.id}
                type="button"
                onClick={() => setFontId(font.id)}
                className={cn(
                  "rounded-xl border px-2 py-2 text-left text-[11px]",
                  fontId === font.id
                    ? "border-cyan-500/50 bg-cyan-500/15 text-white"
                    : "border-slate-800/80 text-gray-400",
                  font.previewClass,
                )}
              >
                {fontLabel(font.id)}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
            {t.pageNumbers.color}
          </p>
          <div className="flex flex-wrap gap-2">
            {DATE_STAMP_INK_PRESETS.map((preset) => (
              <button
                key={preset.id}
                type="button"
                aria-label={preset.id}
                onClick={() => setColor(preset.color)}
                className={cn(
                  "h-8 w-8 rounded-full ring-2 ring-offset-2 ring-offset-slate-900",
                  color === preset.color ? preset.ring : "ring-transparent",
                )}
                style={{ backgroundColor: preset.color }}
              />
            ))}
          </div>
        </div>

        <label className="block text-xs text-gray-400">
          {t.pageNumbers.fontSize}: {fontSize} pt
          <input
            type="range"
            min={8}
            max={22}
            step={1}
            value={fontSize}
            onChange={(event) => setFontSize(Number(event.target.value))}
            className="mt-1 w-full touch-none"
          />
        </label>
        <label className="block text-xs text-gray-400">
          {t.pageNumbers.margin}: {margin} pt
          <input
            type="range"
            min={12}
            max={48}
            step={1}
            value={margin}
            onChange={(event) => setMargin(Number(event.target.value))}
            className="mt-1 w-full touch-none"
          />
        </label>

        <p className="text-xs text-gray-500">
          {resolved ? (
            <>
              {t.pageNumbers.livePreviewHint}{" "}
              <span className="font-medium text-gray-300">{previewLabel}</span>
            </>
          ) : (
            t.pageNumbers.noNumberOnThisPage
          )}
        </p>
      </div>
    </div>
  );
}
