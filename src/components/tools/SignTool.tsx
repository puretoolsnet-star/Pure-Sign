"use client";

import { PenTool } from "lucide-react";
import { useCallback, useState } from "react";

import { FileDropzone } from "@/components/tools/FileDropzone";
import { SignDocumentWorkspace } from "@/components/tools/signature/SignDocumentWorkspace";
import { ToolShell } from "@/components/tools/ToolShell";
import { useI18n } from "@/i18n/context";
import { downloadBytes } from "@/lib/download";
import { useGuardedDownload } from "@/lib/use-guarded-download";
import { exportWithOverlays } from "@/lib/document/export-document";
import { pickSignableFile } from "@/lib/document/pick-document";
import type { PdfOverlay } from "@/lib/pdf/overlays";

export function SignTool() {
  const { t } = useI18n();
  const copy = t.tools.sign;
  const [file, setFile] = useState<File | null>(null);
  const [overlays, setOverlays] = useState<PdfOverlay[]>([]);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { requestDownload, feedback } = useGuardedDownload();

  const addFile = useCallback(
    (files: File[]) => {
      const picked = pickSignableFile(files);
      if (!picked) {
        setError(copy.errors.invalid);
        return;
      }
      setError(null);
      setFile(picked);
      setOverlays([]);
    },
    [copy.errors.invalid],
  );

  const download = async () => {
    if (!file || overlays.length === 0) return;
    setProcessing(true);
    setError(null);
    try {
      const { bytes, extension } = await exportWithOverlays(file, overlays);
      const base = file.name.replace(/\.[^.]+$/, "");
      downloadBytes(bytes, `${base}-signed.${extension}`);
    } catch {
      setError(copy.errors.failed);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <ToolShell toolId="sign" icon={PenTool} compact className="!pt-2 sm:!pt-3">
      <div className="sign-workspace min-w-0 space-y-3">
        {!file ? (
          <FileDropzone title={t.common.dropzoneTitle} hint={copy.hint} onFiles={addFile} />
        ) : (
          <SignDocumentWorkspace
            file={file}
            overlays={overlays}
            setOverlays={setOverlays}
            onError={setError}
            onDownload={() => requestDownload(download)}
            processing={processing}
          />
        )}
        {error && <p className="text-sm text-rose-400">{error}</p>}
        {feedback}
      </div>
    </ToolShell>
  );
}