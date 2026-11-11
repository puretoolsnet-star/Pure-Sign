"use client";

import { Files, Loader2 } from "lucide-react";
import { useCallback, useRef, useState } from "react";

import { FileDropzone } from "@/components/tools/FileDropzone";
import { PdfPageCanvas } from "@/components/tools/PdfPageCanvas";
import {
  SignaturePad,
  type SignaturePadHandle,
} from "@/components/tools/SignaturePad";
import { ToolShell } from "@/components/tools/ToolShell";
import { useI18n } from "@/i18n/context";
import { downloadZip } from "@/lib/download";
import { useRewardedDownload } from "@/lib/use-rewarded-download";
import { cn } from "@/lib/cn";
import { signPdfFiles } from "@/lib/pdf/batch-sign";
import { pickPdfFiles } from "@/lib/pdf/batch-sign";
import { createOverlayId, type PdfOverlay } from "@/lib/pdf/overlays";
import { clampOverlay, overlaySizeFromImage } from "@/lib/pdf/pick-pdf";
import { renderTypedSignaturePng } from "@/lib/pdf/stamp-image";
import { usePdfPreview } from "@/lib/pdf/use-pdf-preview";

type Mode = "draw" | "type" | "image";

function loadImageSize(src: string) {
  return new Promise<{ width: number; height: number }>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve({ width: image.width, height: image.height });
    image.onerror = () => reject(new Error("image"));
    image.src = src;
  });
}

export function BatchSignTool() {
  const { t } = useI18n();
  const copy = t.tools["batch-sign"];
  const padRef = useRef<SignaturePadHandle | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [previewFile, setPreviewFile] = useState<File | null>(null);
  const [mode, setMode] = useState<Mode>("draw");
  const [typed, setTyped] = useState("");
  const [uploaded, setUploaded] = useState<string | null>(null);
  const [size, setSize] = useState(0.24);
  const [placement, setPlacement] = useState<PdfOverlay | null>(null);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const preview = usePdfPreview(previewFile);
  const { requestDownload, modal } = useRewardedDownload();

  const addFiles = useCallback(
    (incoming: File[]) => {
      const pdfs = pickPdfFiles(incoming);
      if (!pdfs.length) {
        setError(copy.errors.invalid);
        return;
      }
      setError(null);
      setFiles((current) => {
        const merged = [...current];
        for (const pdf of pdfs) {
          if (!merged.some((item) => item.name === pdf.name && item.size === pdf.size)) {
            merged.push(pdf);
          }
        }
        return merged;
      });
      setPreviewFile((current) => current ?? pdfs[0]);
      setPlacement(null);
    },
    [copy.errors.invalid],
  );

  const currentAsset = useCallback(async () => {
    if (mode === "draw") {
      return padRef.current?.toDataURL() ?? null;
    }
    if (mode === "type") {
      if (!typed.trim()) return null;
      return renderTypedSignaturePng(typed.trim());
    }
    return uploaded;
  }, [mode, typed, uploaded]);

  const place = async (x: number, y: number) => {
    const dataUrl = await currentAsset();
    if (!dataUrl) {
      setError(t.sign.emptyPad);
      return;
    }
    const image = await loadImageSize(dataUrl);
    const dims = overlaySizeFromImage(
      image.width,
      image.height,
      preview.pageSize.width,
      preview.pageSize.height,
      size,
    );
    const box = clampOverlay(x - dims.width / 2, y - dims.height / 2, dims.width, dims.height);
    setError(null);
    setPlacement({
      id: createOverlayId(),
      pageIndex: 0,
      kind: "image",
      dataUrl,
      ...box,
    });
  };

  const exportZip = async () => {
    if (!files.length || !placement?.dataUrl) return;
    setProcessing(true);
    setError(null);
    try {
      const signed = await signPdfFiles(files, {
        kind: "image",
        dataUrl: placement.dataUrl,
        x: placement.x,
        y: placement.y,
        width: placement.width,
        height: placement.height,
      });
      await downloadZip(signed, "puresign-batch-signed.zip");
    } catch {
      setError(copy.errors.failed);
    } finally {
      setProcessing(false);
    }
  };

  const overlayPreview = placement ? [placement] : [];

  return (
    <ToolShell toolId="batch-sign" icon={Files}>
      <div className="space-y-6">
        {files.length === 0 ? (
          <FileDropzone
            title={t.common.dropzoneMultipleTitle}
            hint={copy.hint}
            onFiles={addFiles}
            multiple
          />
        ) : (
          <>
            <div className="glass-card flex flex-wrap items-center justify-between gap-3 rounded-2xl border-slate-800/60 p-4">
              <p className="text-sm font-medium text-white">
                {t.batchSign.filesSelected(files.length)}
              </p>
              <div className="flex flex-wrap gap-2">
                <label className="btn-secondary cursor-pointer">
                  PDF+
                  <input
                    type="file"
                    accept="application/pdf,.pdf"
                    multiple
                    className="hidden"
                    onChange={(event) => {
                      const list = event.target.files;
                      if (!list?.length) return;
                      addFiles(Array.from(list));
                      event.target.value = "";
                    }}
                  />
                </label>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => {
                    setFiles([]);
                    setPreviewFile(null);
                    setPlacement(null);
                  }}
                >
                  {t.batchSign.clearList}
                </button>
              </div>
            </div>

            <div className="glass-card space-y-4 rounded-2xl border-slate-800/60 p-4">
              <div className="flex w-full min-w-0 flex-wrap gap-2">
                {(["draw", "type", "image"] as const).map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setMode(item)}
                    className={cn(
                      "min-w-0 flex-1 rounded-xl px-3 py-2 text-sm font-medium sm:flex-none",
                      mode === item
                        ? "bg-cyan-500/20 text-white"
                        : "text-gray-400 hover:bg-white/5 hover:text-white",
                    )}
                  >
                    {t.sign[item]}
                  </button>
                ))}
              </div>

              {mode === "draw" && (
                <div className="space-y-3">
                  <SignaturePad handleRef={padRef} ariaLabel={t.sign.canvasAria} />
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => padRef.current?.clear()}
                  >
                    {t.sign.clearPad}
                  </button>
                </div>
              )}

              {mode === "type" && (
                <input
                  className="input-field"
                  value={typed}
                  onChange={(event) => setTyped(event.target.value)}
                  placeholder={t.sign.typePlaceholder}
                />
              )}

              {mode === "image" && (
                <label className="btn-secondary cursor-pointer">
                  {t.sign.uploadPng}
                  <input
                    type="file"
                    accept="image/png"
                    className="hidden"
                    onChange={(event) => {
                      const png = event.target.files?.[0];
                      if (!png) return;
                      const reader = new FileReader();
                      reader.onload = () => setUploaded(String(reader.result));
                      reader.readAsDataURL(png);
                    }}
                  />
                </label>
              )}

              <label className="block text-sm text-gray-400">
                {t.sign.size}
                <input
                  type="range"
                  min={0.12}
                  max={0.5}
                  step={0.01}
                  value={size}
                  onChange={(event) => setSize(Number(event.target.value))}
                  className="mt-2 w-full"
                />
              </label>
              <p className="text-xs text-gray-500">{t.batchSign.positionNote}</p>
            </div>

            {previewFile && (
              <PdfPageCanvas
                pageImage={preview.pageImage}
                pageIndex={preview.pageIndex}
                numPages={preview.numPages}
                overlays={overlayPreview}
                loading={preview.loading}
                onPageChange={preview.setPageIndex}
                onPlace={place}
                onRemoveOverlay={() => setPlacement(null)}
              />
            )}

            <p className="text-xs text-gray-500">{t.sign.placeHint}</p>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                className="btn-primary"
                disabled={processing || !placement || files.length === 0}
                onClick={() => requestDownload(exportZip)}
              >
                {processing ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                {t.batchSign.zipAction}
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
