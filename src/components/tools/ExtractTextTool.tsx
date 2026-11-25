"use client";

import { ScanText } from "lucide-react";
import { useCallback, useState } from "react";

import { ExtractTextWorkspace } from "@/components/tools/extract-text/ExtractTextWorkspace";
import { FileDropzone } from "@/components/tools/FileDropzone";
import { ToolShell } from "@/components/tools/ToolShell";
import { useI18n } from "@/i18n/context";
import { useProtectedAction } from "@/lib/bot-protection/use-protected-action";
import { useGuardedDownload } from "@/lib/use-guarded-download";
import { pickPdfFile } from "@/lib/pdf/pick-pdf";
import { usePdfPreview } from "@/lib/pdf/use-pdf-preview";

export function ExtractTextTool() {
  const { t } = useI18n();
  const copy = t.tools["extract-text"];
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState("");
  const [pagesProcessed, setPagesProcessed] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const preview = usePdfPreview(file);
  const { requestDownload, feedback } = useGuardedDownload();
  const { runProtected } = useProtectedAction();

  const addFile = useCallback(
    (files: File[]) => {
      const pdf = pickPdfFile(files);
      if (!pdf) {
        setError(copy.errors.invalid);
        return;
      }
      setError(null);
      setFile(pdf);
      setText("");
      setPagesProcessed(0);
    },
    [copy.errors.invalid],
  );

  return (
    <ToolShell toolId="extract-text" icon={ScanText}>
      <div className="min-w-0 space-y-4">
        {!file ? (
          <FileDropzone title={t.common.dropzoneTitle} hint={copy.hint} onFiles={addFile} />
        ) : (
          <>
            <ExtractTextWorkspace
              file={file}
              pageImage={preview.pageImage}
              pageIndex={preview.pageIndex}
              numPages={preview.numPages}
              loading={preview.loading}
              onPageChange={preview.setPageIndex}
              text={text}
              setText={setText}
              pagesProcessed={pagesProcessed}
              setPagesProcessed={setPagesProcessed}
              onExtractError={setError}
              onRunProtected={(task) => runProtected(task, setError)}
              requestDownload={requestDownload}
            />
            <button
              type="button"
              className="btn-secondary w-full sm:w-auto"
              onClick={() => {
                setFile(null);
                setText("");
                setPagesProcessed(0);
                setError(null);
              }}
            >
              {t.common.clear}
            </button>
          </>
        )}
        {error ? <p className="text-sm text-rose-400">{error}</p> : null}
        {feedback}
      </div>
    </ToolShell>
  );
}