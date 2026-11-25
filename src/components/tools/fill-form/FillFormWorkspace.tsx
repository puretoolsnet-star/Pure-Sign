"use client";

import { Download, Loader2, MapPin, TextCursorInput } from "lucide-react";
import { useCallback, useState } from "react";

import { DocumentTextEditor } from "@/components/tools/signature/DocumentTextEditor";
import { DocumentSelectedQuickEdit } from "@/components/tools/signature/DocumentSelectedQuickEdit";
import { PdfPageCanvas } from "@/components/tools/PdfPageCanvas";
import type { FormFieldInfo } from "@/lib/pdf/fill-form";
import type { DocumentTextFontId } from "@/lib/document-text/fonts";
import { renderDocumentTextPng } from "@/lib/document-text/render-text-png";
import { DATE_STAMP_INK_PRESETS } from "@/lib/date-stamp/ink-presets";
import { useI18n } from "@/i18n/context";
import { createOverlayId, type PdfOverlay } from "@/lib/pdf/overlays";
import { clampOverlay, overlaySizeFromImage } from "@/lib/pdf/pick-pdf";
import { loadImageSize } from "@/lib/signatures/load-image-size";
import { cn } from "@/lib/cn";

type FillFormWorkspaceProps = {
  fields: FormFieldInfo[];
  values: Record<string, string>;
  onValuesChange: (next: Record<string, string>) => void;
  flatten: boolean;
  onFlattenChange: (value: boolean) => void;
  overlays: PdfOverlay[];
  setOverlays: React.Dispatch<React.SetStateAction<PdfOverlay[]>>;
  pageImage: string | null;
  pageIndex: number;
  numPages: number;
  pageSize: { width: number; height: number };
  loading: boolean;
  onPageChange: (index: number) => void;
  onDownload: () => void;
  downloading: boolean;
};

export function FillFormWorkspace({
  fields,
  values,
  onValuesChange,
  flatten,
  onFlattenChange,
  overlays,
  setOverlays,
  pageImage,
  pageIndex,
  numPages,
  pageSize,
  loading,
  onPageChange,
  onDownload,
  downloading,
}: FillFormWorkspaceProps) {
  const { t } = useI18n();
  const [placeMode, setPlaceMode] = useState(false);
  const [draftText, setDraftText] = useState("");
  const [draftColor, setDraftColor] = useState<string>(DATE_STAMP_INK_PRESETS[0].color);
  const [draftFontId, setDraftFontId] = useState<DocumentTextFontId>("sans");
  const [draftSize, setDraftSize] = useState(0.22);
  const [selectedOverlayId, setSelectedOverlayId] = useState<string | null>(null);

  const selected = overlays.find((item) => item.id === selectedOverlayId) ?? null;

  const placeText = useCallback(
    async (x: number, y: number) => {
      const trimmed = draftText.trim();
      if (!trimmed) return;
      const dataUrl = await renderDocumentTextPng({
        text: trimmed,
        color: draftColor,
        fontId: draftFontId,
      });
      const image = await loadImageSize(dataUrl);
      const dims = overlaySizeFromImage(
        image.width,
        image.height,
        pageSize.width,
        pageSize.height,
        draftSize,
      );
      const box = clampOverlay(x - dims.width / 2, y - dims.height / 2, dims.width, dims.height);
      const overlay: PdfOverlay = {
        id: createOverlayId(),
        pageIndex,
        kind: "image",
        dataUrl,
        ...box,
        textMeta: { text: trimmed, color: draftColor, fontId: draftFontId },
        color: draftColor,
      };
      setOverlays((current) => [...current, overlay]);
      setSelectedOverlayId(overlay.id);
      setPlaceMode(false);
    },
    [draftColor, draftFontId, draftSize, draftText, pageIndex, pageSize, setOverlays],
  );

  const resizeSelected = (relativeWidth: number) => {
    if (!selected) return;
    const aspect = selected.height / Math.max(selected.width, 0.0001);
    const nextH = relativeWidth * aspect;
    const patch = clampOverlay(selected.x, selected.y, relativeWidth, nextH);
    setOverlays((current) =>
      current.map((item) => (item.id === selected.id ? { ...item, ...patch } : item)),
    );
  };

  return (
    <div className="flex min-w-0 flex-col gap-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="min-w-0 flex-1 text-xs text-gray-500">{t.fillForm.workspaceHint}</p>
        <button
          type="button"
          className="btn-primary inline-flex shrink-0 items-center gap-1.5 text-sm"
          disabled={downloading}
          onClick={onDownload}
        >
          {downloading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
          {t.tools["fill-form"].action}
        </button>
      </div>

      {fields.length > 0 ? (
        <details className="glass-card group rounded-2xl border border-slate-800/60 p-0" open>
          <summary className="cursor-pointer list-none px-4 py-3 text-sm font-semibold text-white marker:content-none [&::-webkit-details-marker]:hidden">
            <span className="flex items-center justify-between gap-2">
              {t.fillForm.fieldsTitle}
              <span className="text-xs font-normal text-gray-500">
                {t.fillForm.fieldsCount(fields.length)}
              </span>
            </span>
          </summary>
          <div className="space-y-3 border-t border-slate-800/60 px-4 pb-4 pt-3">
            <ul className="max-h-48 space-y-3 overflow-y-auto overscroll-contain">
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
                          onValuesChange({
                            ...values,
                            [field.name]: event.target.checked ? "true" : "false",
                          })
                        }
                      />
                    ) : field.type === "dropdown" ? (
                      <select
                        className="input-field mt-2"
                        value={values[field.name] ?? ""}
                        onChange={(event) =>
                          onValuesChange({ ...values, [field.name]: event.target.value })
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
                          onValuesChange({ ...values, [field.name]: event.target.value })
                        }
                      />
                    )}
                  </label>
                </li>
              ))}
            </ul>
            <label className="flex items-center gap-2 text-sm text-gray-300">
              <input
                type="checkbox"
                className="accent-primary"
                checked={flatten}
                onChange={(event) => onFlattenChange(event.target.checked)}
              />
              {t.fillForm.flatten}
            </label>
          </div>
        </details>
      ) : (
        <p className="rounded-xl border border-slate-800/60 bg-slate-900/40 px-3 py-2 text-xs text-gray-400">
          {t.fillForm.noFields}
        </p>
      )}

      <section className="glass-card space-y-3 rounded-2xl border border-slate-800/60 p-3 sm:p-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-white">
          <TextCursorInput className="h-4 w-4 text-cyan-400" aria-hidden />
          {t.fillForm.freeTextTitle}
        </div>
        <DocumentTextEditor
          compact
          text={draftText}
          onTextChange={setDraftText}
          fontId={draftFontId}
          onFontIdChange={setDraftFontId}
          color={draftColor}
          onColorChange={setDraftColor}
          size={draftSize}
          onSizeChange={setDraftSize}
        />
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            className={cn(
              "btn-secondary inline-flex items-center gap-1.5",
              placeMode && "bg-cyan-500/20 text-white ring-1 ring-cyan-500/40",
            )}
            disabled={!draftText.trim()}
            onClick={() => setPlaceMode((current) => !current)}
          >
            <MapPin className="h-4 w-4 shrink-0" aria-hidden />
            {placeMode ? t.fillForm.placeActive : t.fillForm.addTextOnPage}
          </button>
          {placeMode ? (
            <p className="text-xs text-cyan-400/90">{t.fillForm.tapPageHint}</p>
          ) : (
            <p className="text-xs text-gray-500">{t.fillForm.freeTextHint}</p>
          )}
        </div>
      </section>

      {selected?.textMeta ? (
        <DocumentSelectedQuickEdit
          overlay={selected}
          pageSize={pageSize}
          onOverlayPatched={(id, patch) =>
            setOverlays((current) =>
              current.map((item) => (item.id === id ? { ...item, ...patch } : item)),
            )
          }
        />
      ) : null}

      <PdfPageCanvas
        pageImage={pageImage}
        pageIndex={pageIndex}
        numPages={numPages}
        overlays={overlays}
        loading={loading}
        onPageChange={onPageChange}
        interaction={placeMode ? "place" : "none"}
        editableOverlays={!placeMode}
        desktopDragHint={!placeMode}
        selectedOverlayId={selectedOverlayId}
        onSelectOverlay={setSelectedOverlayId}
        onPlace={(x, y) => void placeText(x, y)}
        onOverlayChange={(id, patch) =>
          setOverlays((current) =>
            current.map((item) => (item.id === id ? { ...item, ...patch } : item)),
          )
        }
        onRemoveOverlay={(id) => {
          setOverlays((current) => current.filter((item) => item.id !== id));
          setSelectedOverlayId((current) => (current === id ? null : current));
        }}
        selectedOverlay={selected}
        onSelectedOverlayResize={resizeSelected}
        placeHint={placeMode ? t.fillForm.tapPageHint : undefined}
        overlayToolbar="minimal"
      />
    </div>
  );
}