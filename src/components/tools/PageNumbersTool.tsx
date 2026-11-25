"use client";

import { Hash } from "lucide-react";
import { useCallback, useState } from "react";

import { PageNumbersWorkspace } from "@/components/tools/page-numbers/PageNumbersWorkspace";
import { FileDropzone } from "@/components/tools/FileDropzone";
import { ToolShell } from "@/components/tools/ToolShell";
import { useI18n } from "@/i18n/context";
import { useGuardedDownload } from "@/lib/use-guarded-download";
import { pickPdfFile } from "@/lib/pdf/pick-pdf";
import { usePdfPreview } from "@/lib/pdf/use-pdf-preview";

export function PageNumbersTool() {
  const { t } = useI18n();
  const copy = t.tools["page-numbers"];
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const preview = usePdfPreview(file);
  const { requestDownload, feedback } = useGuardedDownload();
  const [downloading, setDownloading] = useState(false);

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

  return (
    <ToolShell toolId="page-numbers" icon={Hash}>
      <div className="min-w-0 space-y-4">
        {!file ? (
          <FileDropzone title={t.common.dropzoneTitle} hint={copy.hint} onFiles={addFile} />
        ) : (
          <>
            <PageNumbersWorkspace
              file={file}
              pageImage={preview.pageImage}
              pageIndex={preview.pageIndex}
              numPages={preview.numPages}
              pageSize={preview.pageSize}
              loading={preview.loading}
              onPageChange={preview.setPageIndex}
              onError={setError}
              requestDownload={(task) => {
                void requestDownload(async () => {
                  setDownloading(true);
                  try {
                    await task();
                  } finally {
                    setDownloading(false);
                  }
                });
              }}
              downloading={downloading}
              downloadLabel={copy.action}
            />
            <button type="button" className="btn-secondary w-full sm:w-auto" onClick={() => setFile(null)}>
              {t.common.clear}
            </button>
          </>
        )}
        {error && <p className="text-sm text-rose-400">{error}</p>}
        {feedback}
      </div>
    </ToolShell>
  );
}