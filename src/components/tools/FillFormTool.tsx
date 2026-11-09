"use client";

import { Loader2, TextCursorInput } from "lucide-react";
import { useCallback, useState } from "react";

import { FileDropzone } from "@/components/tools/FileDropzone";
import { PdfPageCanvas } from "@/components/tools/PdfPageCanvas";
import { ToolShell } from "@/components/tools/ToolShell";
import { useI18n } from "@/i18n/context";
import { downloadBytes } from "@/lib/download";
import { useRewardedDownload } from "@/lib/use-rewarded-download";
import { fillPdfForm, readPdfFormFields, type FormFieldInfo } from "@/lib/pdf/fill-form";
import { applyOverlays, createOverlayId, type PdfOverlay } from "@/lib/pdf/overlays";
import { clampOverlay, pickPdfFile } from "@/lib/pdf/pick-pdf";
import { usePdfPreview } from "@/lib/pdf/use-pdf-preview";

export function FillFormTool() {
  const { t } = useI18n();
  const copy = t.tools["fill-form"];
  const [file, setFile] = useState<File | null>(null);
  const [fields, setFields] = useState<FormFieldInfo[]>([]);
  const [values, setValues] = useState<Record<string, string>>({});
  const [freeText, setFreeText] = useState("");
  const [flatten, setFlatten] = useState(true);
  const [overlays, setOverlays] = useState<PdfOverlay[]>([]);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const preview = usePdfPreview(file);
  const { requestDownload, modal } = useRewardedDownload();

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
        setValues(
          Object.fromEntries(nextFields.map((field) => [field.name, field.value])),
        );
      } catch {
        setFields([]);
      }
    },
    [copy.errors.invalid],
  );

  const place = (x: number, y: number) => {
    if (!freeText.trim()) return;
    const width = 0.28;
    const height = 0.035;
    const box = clampOverlay(x - width / 2, y - height / 2, width, height);
    setOverlays((current) => [
      ...current,
      {
        id: createOverlayId(),
        pageIndex: preview.pageIndex,
        kind: "text",
        text: freeText.trim(),
        ...box,
      },
    ]);
  };

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
      <div className="space-y-6">
        {!file ? (
          <FileDropzone title={t.common.dropzoneTitle} hint={copy.hint} onFiles={(files) => void addFile(files)} />
        ) : (
          <>
            <div className="glass-card space-y-4 rounded-2xl border-slate-800/60 p-4">
              <h2 className="text-sm font-semibold text-white">{t.fillForm.fieldsTitle}</h2>
              {fields.length === 0 ? (
                <p className="text-sm text-gray-400">{t.fillForm.noFields}</p>
              ) : (
                <ul className="space-y-3">
                  {fields.map((field, index) => (
                    <li key={field.name}>
                      <label className="block text-sm text-gray-300">
                        {field.name || t.fillForm.fieldFallback(index + 1)}
                        {field.type === "checkbox" ? (
                          <input
                            type="checkbox"
                            className="ml-2 accent-primary"
                            checked={values[field.name] === "true"}
                            onChange={(event) =>
                              setValues((current) => ({
                                ...current,
                                [field.name]: event.target.checked ? "true" : "false",
                              }))
                            }
                          />
                        ) : field.type === "dropdown" ? (
                          <select
                            className="input-field mt-2"
                            value={values[field.name] ?? ""}
                            onChange={(event) =>
                              setValues((current) => ({
                                ...current,
                                [field.name]: event.target.value,
                              }))
                            }
                          >
                            <option value="">—</option>
                            {(field.options ?? []).map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <input
                            className="input-field mt-2"
                            value={values[field.name] ?? ""}
                            onChange={(event) =>
                              setValues((current) => ({
                                ...current,
                                [field.name]: event.target.value,
                              }))
                            }
                          />
                        )}
                      </label>
                    </li>
                  ))}
                </ul>
              )}
              {fields.length > 0 && (
                <label className="flex items-center gap-2 text-sm text-gray-300">
                  <input
                    type="checkbox"
                    className="accent-primary"
                    checked={flatten}
                    onChange={(event) => setFlatten(event.target.checked)}
                  />
                  {t.fillForm.flatten}
                </label>
              )}
              <label className="block text-sm text-gray-400">
                {t.fillForm.freeTextHint}
                <input
                  className="input-field mt-2"
                  value={freeText}
                  onChange={(event) => setFreeText(event.target.value)}
                  placeholder={t.fillForm.textPlaceholder}
                />
              </label>
            </div>

            <PdfPageCanvas
              pageImage={preview.pageImage}
              pageIndex={preview.pageIndex}
              numPages={preview.numPages}
              overlays={overlays}
              loading={preview.loading}
              onPageChange={preview.setPageIndex}
              onPlace={place}
              onRemoveOverlay={(id) =>
                setOverlays((current) => current.filter((item) => item.id !== id))
              }
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
                onClick={() => {
                  setFile(null);
                  setFields([]);
                  setOverlays([]);
                }}
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
