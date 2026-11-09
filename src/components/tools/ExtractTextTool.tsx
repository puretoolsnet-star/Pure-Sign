"use client";

import { Check, Loader2, ScanText } from "lucide-react";
import { useCallback, useState } from "react";

import { FileDropzone } from "@/components/tools/FileDropzone";
import { ToolShell } from "@/components/tools/ToolShell";
import { useI18n } from "@/i18n/context";
import { useProtectedAction } from "@/lib/bot-protection/use-protected-action";
import { downloadText } from "@/lib/download";
import { useRewardedDownload } from "@/lib/use-rewarded-download";
import { extractPdfText } from "@/lib/pdf/extract-text";
import { pickPdfFile } from "@/lib/pdf/pick-pdf";

export function ExtractTextTool() {
  const { t } = useI18n();
  const copy = t.tools["extract-text"];
  const [fileName, setFileName] = useState<string | null>(null);
  const [text, setText] = useState("");
  const [pages, setPages] = useState(0);
  const [processing, setProcessing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { requestDownload, modal } = useRewardedDownload();
  const { runProtected } = useProtectedAction();

  const addFile = useCallback(
    async (files: File[]) => {
      const pdf = pickPdfFile(files);
      if (!pdf) {
        setError(copy.errors.invalid);
        return;
      }

      await runProtected(async () => {
        setCopied(false);
        setProcessing(true);
        setFileName(pdf.name);
        try {
          const result = await extractPdfText(pdf);
          setText(result.text);
          setPages(result.pages);
        } catch {
          setError(copy.errors.failed);
          setText("");
        } finally {
          setProcessing(false);
        }
      }, setError);
    },
    [copy.errors.failed, copy.errors.invalid, runProtected],
  );

  const copyText = async () => {
    if (!text) return;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <ToolShell toolId="extract-text" icon={ScanText}>
      <div className="space-y-6">
        <FileDropzone
          title={t.common.dropzoneTitle}
          hint={copy.hint}
          onFiles={(files) => void addFile(files)}
          disabled={processing}
        />

        {processing && (
          <p className="inline-flex items-center gap-2 text-sm text-gray-400">
            <Loader2 className="h-4 w-4 animate-spin" />
            {t.common.processing}
          </p>
        )}

        {(text || fileName) && !processing && (
          <div className="glass-card space-y-3 rounded-2xl border-slate-800/60 p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-sm font-semibold text-white">
                {t.extract.resultTitle}
              </h2>
              <p className="text-xs text-gray-500">
                {t.extract.pagesExtracted(pages)}
              </p>
            </div>
            <textarea
              className="input-field min-h-64 w-full min-w-0 font-mono text-sm"
              value={text || t.extract.empty}
              readOnly
            />
            <div className="flex flex-wrap gap-3">
              <button type="button" className="btn-primary" onClick={() => void copyText()}>
                {copied ? <Check className="h-4 w-4" /> : null}
                {copied ? t.common.copied : copy.action}
              </button>
              <button
                type="button"
                className="btn-secondary"
                disabled={!text}
                onClick={() =>
                  requestDownload(() =>
                    downloadText(
                      text,
                      (fileName ?? "document").replace(/\.pdf$/i, "") + ".txt",
                    ),
                  )
                }
              >
                {t.extract.downloadTxt}
              </button>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => {
                  setFileName(null);
                  setText("");
                  setPages(0);
                }}
              >
                {t.common.clear}
              </button>
            </div>
          </div>
        )}
        {error && <p className="text-sm text-rose-400">{error}</p>}
        {modal}
      </div>
    </ToolShell>
  );
}
