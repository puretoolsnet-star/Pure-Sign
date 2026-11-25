"use client";

import { TextCursorInput } from "lucide-react";
import { useCallback, useState } from "react";

import { FillFormWorkspace } from "@/components/tools/fill-form/FillFormWorkspace";
import { FileDropzone } from "@/components/tools/FileDropzone";
import { ToolShell } from "@/components/tools/ToolShell";
import { useI18n } from "@/i18n/context";
import { downloadBytes } from "@/lib/download";
import { useGuardedDownload } from "@/lib/use-guarded-download";
import { fillPdfForm, readPdfFormFields, type FormFieldInfo } from "@/lib/pdf/fill-form";
import { applyOverlays, type PdfOverlay } from "@/lib/pdf/overlays";
import { pickPdfFile } from "@/lib/pdf/pick-pdf";
import { usePdfPreview } from "@/lib/pdf/use-pdf-preview";

export function FillFormTool() {
  const { t } = useI18n();
  const copy = t.tools["fill-form"];
  const [file, setFile] = useState<File | null>(null);
  const [fields, setFields] = useState<FormFieldInfo[]>([]);
  const [values, setValues] = useState<Record<string, string>>({});
  const [flatten, setFlatten] = useState(true);
  const [overlays, setOverlays] = useState<PdfOverlay[]>([]);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const preview = usePdfPreview(file);
  const { requestDownload, feedback } = useGuardedDownload();

  const addFile = useCallback(
    async (incoming: File[]) => {
      const pdf = pickPdfFile(incoming);
      if (!pdf) {
        setError(copy.errors.invalid);
        return;
      }
      setError(null);
      setFile(pdf);
      setOverlays([]);
      try {
        const nextFields = await readPdfFormFields(pdf);
        setFields(nextFields);
        setValues(Object.fromEntries(nextFields.map((field) => [field.name, field.value])));
      } catch {
        setFields([]);
      }
    },
    [copy.errors.invalid],
  );

  const download = async () => {
    if (!file) return;
    setProcessing(true);
    setError(null);
    try {
      let bytes = await fillPdfForm(file, values, flatten && fields.length > 0);
      if (overlays.length > 0) {
        const blob = new File([bytes as BlobPart], file.name, {
          type: "application/pdf",
        });
        bytes = await applyOverlays(blob, overlays);
      }
      downloadBytes(bytes, file.name.replace(/\.pdf$/i, "") + "-filled.pdf");
    } catch {
      setError(copy.errors.failed);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <ToolShell toolId="fill-form" icon={TextCursorInput}>
      <div className="space-y-4">
        {!file ? (
          <FileDropzone title={t.common.dropzoneTitle} hint={copy.hint} onFiles={(files) => void addFile(files)} />
        ) : (
          <>
            <FillFormWorkspace
              fields={fields}
              values={values}
              onValuesChange={setValues}
              flatten={flatten}
              onFlattenChange={setFlatten}
              overlays={overlays}
              setOverlays={setOverlays}
              pageImage={preview.pageImage}
              pageIndex={preview.pageIndex}
              numPages={preview.numPages}
              pageSize={preview.pageSize}
              loading={preview.loading}
              onPageChange={preview.setPageIndex}
              onDownload={() => requestDownload(download)}
              downloading={processing}
            />
            <button
              type="button"
              className="btn-secondary w-full sm:w-auto"
              onClick={() => {
                setFile(null);
                setFields([]);
                setOverlays([]);
              }}
            >
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