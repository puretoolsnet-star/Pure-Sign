"use client";

import { Hash, Loader2 } from "lucide-react";
import { useCallback, useState } from "react";

import { FileDropzone } from "@/components/tools/FileDropzone";
import { PdfPageCanvas } from "@/components/tools/PdfPageCanvas";
import { ToolShell } from "@/components/tools/ToolShell";
import { useI18n } from "@/i18n/context";
import { downloadBytes } from "@/lib/download";
import { useRewardedDownload } from "@/lib/use-rewarded-download";
import {
  addPageNumbers,
  type PageNumberFormat,
  type PageNumberPosition,
} from "@/lib/pdf/page-numbers";
import { pickPdfFile } from "@/lib/pdf/pick-pdf";
import { usePdfPreview } from "@/lib/pdf/use-pdf-preview";

export function PageNumbersTool() {
  const { t } = useI18n();
  const copy = t.tools["page-numbers"];
  const [file, setFile] = useState<File | null>(null);
  const [position, setPosition] = useState<PageNumberPosition>("footer-center");
  const [format, setFormat] = useState<PageNumberFormat>("of");
  const [fontSize, setFontSize] = useState(12);
  const [margin, setMargin] = useState(24);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const preview = usePdfPreview(file);
  const { requestDownload, modal } = useRewardedDownload();

  const addFile = useCallback(
    (files: File[]) => {
      const pdf = pickPdfFile(files);
      if (!pdf) {
        setError(copy.errors.invalid);
        return;
      }
      setError(null);
      setFile(pdf);
    },
    [copy.errors.invalid],
  );

  const download = async () => {
    if (!file) return;
    setProcessing(true);
    setError(null);
    try {
      const bytes = await addPageNumbers(file, {
        position,
        format,
        fontSize,
        margin,
        pageOfTemplate: (current, total) =>
          t.common.pageLabel(current, total),
      });
      downloadBytes(bytes, file.name.replace(/\.pdf$/i, "") + "-numbered.pdf");
    } catch {
      setError(copy.errors.failed);
    } finally {
      setProcessing(false);
    }
  };

  const positions: Array<[PageNumberPosition, string]> = [
    ["header-left", t.pageNumbers.headerLeft],
    ["header-center", t.pageNumbers.headerCenter],
    ["header-right", t.pageNumbers.headerRight],
    ["footer-left", t.pageNumbers.footerLeft],
    ["footer-center", t.pageNumbers.footerCenter],
    ["footer-right", t.pageNumbers.footerRight],
  ];

  const formats: Array<[PageNumberFormat, string]> = [
    ["simple", t.pageNumbers.formatSimple],
    ["of", t.pageNumbers.formatOf],
    ["page-of", t.pageNumbers.formatPageOf],
  ];

  return (
    <ToolShell toolId="page-numbers" icon={Hash}>
      <div className="space-y-6">
        {!file ? (
          <FileDropzone title={t.common.dropzoneTitle} hint={copy.hint} onFiles={addFile} />
        ) : (
          <>
            <div className="glass-card grid gap-4 rounded-2xl border-slate-800/60 p-4 sm:grid-cols-2">
              <label className="text-sm text-gray-400">
                {t.pageNumbers.position}
                <select
                  className="input-field mt-2"
                  value={position}
                  onChange={(event) =>
                    setPosition(event.target.value as PageNumberPosition)
                  }
                >
                  {positions.map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="text-sm text-gray-400">
                {t.pageNumbers.format}
                <select
                  className="input-field mt-2"
                  value={format}
                  onChange={(event) =>
                    setFormat(event.target.value as PageNumberFormat)
                  }
                >
                  {formats.map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="text-sm text-gray-400">
                {t.pageNumbers.fontSize}: {fontSize}px
                <input
                  type="range"
                  min={8}
                  max={22}
                  value={fontSize}
                  onChange={(event) => setFontSize(Number(event.target.value))}
                  className="mt-2 w-full"
                />
              </label>
              <label className="text-sm text-gray-400">
                {t.pageNumbers.margin}: {margin}pt
                <input
                  type="range"
                  min={12}
                  max={48}
                  value={margin}
                  onChange={(event) => setMargin(Number(event.target.value))}
                  className="mt-2 w-full"
                />
              </label>
            </div>

            <PdfPageCanvas
              pageImage={preview.pageImage}
              pageIndex={preview.pageIndex}
              numPages={preview.numPages}
              overlays={[]}
              interaction="none"
              loading={preview.loading}
              onPageChange={preview.setPageIndex}
            />

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                className="btn-primary"
                disabled={processing}
                onClick={() => requestDownload(download)}
              >
                {processing ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                {copy.action}
              </button>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setFile(null)}
              >
                {t.common.clear}
              </button>
            </div>
          </>
        )}
        {error && <p className="text-sm text-rose-400">{error}</p>}
        {modal}
      </div>
    </ToolShell>
  );
}
