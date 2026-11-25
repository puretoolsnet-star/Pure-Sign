"use client";

import { Check, Copy, Download, FileText, Loader2, ScanLine, ScanText, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";

import { PdfPageCanvas } from "@/components/tools/PdfPageCanvas";
import { useI18n } from "@/i18n/context";
import { cn } from "@/lib/cn";
import { downloadText } from "@/lib/download";
import {
  extractWithFallback,
  type ExtractProgress,
  type RelativeRect,
} from "@/lib/pdf/extract-text";

type ExtractMode = "all" | "page" | "region";

type ExtractTextWorkspaceProps = {
  file: File;
  pageImage: string | null;
  pageIndex: number;
  numPages: number;
  loading: boolean;
  onPageChange: (index: number) => void;
  text: string;
  setText: (value: string) => void;
  pagesProcessed: number;
  setPagesProcessed: (count: number) => void;
  onExtractError: (message: string | null) => void;
  onRunProtected: (
    task: () => Promise<void>,
    setError: (message: string | null) => void,
  ) => Promise<void | boolean>;
  requestDownload: (task: () => void) => void;
};

export function ExtractTextWorkspace({
  file,
  pageImage,
  pageIndex,
  numPages,
  loading,
  onPageChange,
  text,
  setText,
  pagesProcessed,
  setPagesProcessed,
  onExtractError,
  onRunProtected,
  requestDownload,
}: ExtractTextWorkspaceProps) {
  const { locale, t } = useI18n();
  const [mode, setMode] = useState<ExtractMode>("page");
  const [region, setRegion] = useState<RelativeRect | null>(null);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState<ExtractProgress | null>(null);
  const [source, setSource] = useState<"text-layer" | "ocr" | null>(null);
  const [copied, setCopied] = useState(false);

  const statusLabel = useMemo(() => {
    if (!processing || !progress) return null;
    if (progress.phase === "reading") {
      if (progress.pageCount && progress.page) {
        return t.extract.statusReadingPage(progress.page, progress.pageCount);
      }
      return t.extract.statusReading;
    }
    const percent = Math.round(progress.progress * 100);
    if (progress.pageCount && progress.page) {
      return t.extract.statusOcrPage(progress.page, progress.pageCount, percent);
    }
    return t.extract.statusOcr(percent);
  }, [processing, progress, t.extract]);

  const runExtract = () => {
    void onRunProtected(async () => {
      setProcessing(true);
      setProgress(null);
      setCopied(false);
      onExtractError(null);
      try {
        const result = await extractWithFallback(
          file,
          locale,
          mode,
          pageIndex,
          mode === "region" ? region : null,
          setProgress,
        );
        setText(result.text);
        setPagesProcessed(result.pages);
        setSource(result.source);
        if (!result.text.trim()) {
          onExtractError(null);
        }
      } catch {
        onExtractError(t.tools["extract-text"].errors.failed);
        setText("");
        setSource(null);
      } finally {
        setProcessing(false);
        setProgress(null);
      }
    }, onExtractError);
  };

  const copyText = async () => {
    if (!text.trim()) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  const modeButton = (id: ExtractMode, icon: React.ReactNode, label: string) => (
    <button
      type="button"
      className={cn(
        "btn-secondary inline-flex min-h-10 flex-1 items-center justify-center gap-1.5 px-2 py-2 text-xs sm:flex-none sm:px-3 sm:text-sm",
        mode === id && "bg-cyan-500/20 text-white ring-1 ring-cyan-500/40",
      )}
      onClick={() => {
        setMode(id);
        if (id !== "region") setRegion(null);
      }}
    >
      {icon}
      <span className="truncate">{label}</span>
    </button>
  );

  return (
    <div className="flex min-w-0 flex-col gap-3">
      <p className="text-xs text-gray-500">{t.extract.workspaceHint}</p>

      <div className="sign-workspace sticky bottom-0 z-20 -mx-1 border-t border-slate-800/70 bg-slate-950/95 px-1 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur-md sm:static sm:mx-0 sm:rounded-2xl sm:border sm:bg-slate-900/80 sm:px-2 sm:pb-2 sm:pt-2">
        <div className="flex min-w-0 flex-wrap gap-1.5">
          {modeButton("all", <FileText className="h-4 w-4 shrink-0" aria-hidden />, t.extract.modeAll)}
          {modeButton("page", <ScanText className="h-4 w-4 shrink-0" aria-hidden />, t.extract.modePage)}
          {modeButton(
            "region",
            <ScanLine className="h-4 w-4 shrink-0" aria-hidden />,
            t.extract.modeRegion,
          )}
        </div>
        <p className="mt-1.5 px-0.5 text-xs text-cyan-400/90 lg:hidden">
          {mode === "region" ? t.extract.regionHintMobile : t.extract.modeHintMobile(mode)}
        </p>
        <p className="mt-0.5 hidden px-0.5 text-xs text-gray-500 lg:block">
          {mode === "region" ? t.extract.regionHint : t.extract.modeHint(mode)}
        </p>
        <button
          type="button"
          className="btn-primary mt-2 inline-flex min-h-11 w-full items-center justify-center gap-2 sm:w-auto"
          disabled={processing || (mode === "region" && !region)}
          onClick={runExtract}
        >
          {processing ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : null}
          {t.extract.runExtract}
        </button>
      </div>

      {mode !== "all" ? (
        <PdfPageCanvas
          pageImage={pageImage}
          pageIndex={pageIndex}
          numPages={numPages}
          overlays={[]}
          interaction={mode === "region" ? "draw-rect" : "none"}
          loading={loading}
          onPageChange={onPageChange}
          draftRectStyle="select"
          selectionRect={region}
          onDrawRect={(rect) => setRegion(rect)}
          placeHint={mode === "region" ? t.extract.regionHintMobile : undefined}
        />
      ) : null}

      {mode === "region" && region ? (
        <button
          type="button"
          className="btn-secondary min-h-10 w-full sm:w-auto"
          onClick={() => setRegion(null)}
        >
          {t.extract.clearRegion}
        </button>
      ) : null}

      {processing && statusLabel ? (
        <div className="rounded-xl border border-slate-800/70 bg-slate-900/60 px-3 py-2">
          <p className="inline-flex items-center gap-2 text-sm text-cyan-300/95">
            <Loader2 className="h-4 w-4 shrink-0 animate-spin" aria-hidden />
            {statusLabel}
          </p>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-800">
            <div
              className="h-full rounded-full bg-cyan-500/80 transition-all duration-300"
              style={{ width: `${Math.round((progress?.progress ?? 0) * 100)}%` }}
            />
          </div>
        </div>
      ) : null}

      <div className="glass-card min-w-0 space-y-3 rounded-2xl border border-slate-800/60 p-3 sm:p-4">
        <div className="flex min-w-0 flex-wrap items-center justify-between gap-2">
          <h2 className="text-sm font-semibold text-white">{t.extract.resultTitle}</h2>
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-gray-500">
            {pagesProcessed > 0 ? <span>{t.extract.pagesExtracted(pagesProcessed)}</span> : null}
            {source ? (
              <span className="text-cyan-400/80">
                {source === "ocr" ? t.extract.sourceOcr : t.extract.sourceTextLayer}
              </span>
            ) : null}
            {text.trim() ? <span>{t.extract.characters(text.length)}</span> : null}
          </div>
        </div>

        <textarea
          className="input-field min-h-48 w-full min-w-0 resize-y font-mono text-sm leading-relaxed sm:min-h-64"
          value={text}
          placeholder={t.extract.emptyPlaceholder}
          onChange={(event) => setText(event.target.value)}
          disabled={processing}
        />

        <div className="grid grid-cols-1 gap-2 min-[420px]:grid-cols-3">
          <button
            type="button"
            className={cn(
              "btn-primary inline-flex min-h-11 w-full items-center justify-center gap-2",
              copied && "ring-2 ring-emerald-400/50",
            )}
            disabled={!text.trim() || processing}
            onClick={() => void copyText()}
          >
            {copied ? <Check className="h-4 w-4" aria-hidden /> : <Copy className="h-4 w-4" aria-hidden />}
            {copied ? t.extract.copied : t.extract.copy}
          </button>
          <button
            type="button"
            className="btn-secondary inline-flex min-h-11 w-full items-center justify-center gap-2"
            disabled={!text.trim() || processing}
            onClick={() =>
              requestDownload(() =>
                downloadText(text, file.name.replace(/\.pdf$/i, "") + ".txt"),
              )
            }
          >
            <Download className="h-4 w-4" aria-hidden />
            {t.extract.downloadTxt}
          </button>
          <button
            type="button"
            className="btn-secondary inline-flex min-h-11 w-full items-center justify-center gap-2"
            disabled={processing && !text}
            onClick={() => {
              setText("");
              setPagesProcessed(0);
              setSource(null);
              setCopied(false);
            }}
          >
            <Trash2 className="h-4 w-4" aria-hidden />
            {t.extract.clearResult}
          </button>
        </div>
      </div>
    </div>
  );
}