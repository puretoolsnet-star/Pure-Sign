"use client";

import { LockOpen } from "lucide-react";
import { useCallback, useState } from "react";

import { UnlockPdfWorkspace } from "@/components/tools/unlock-pdf/UnlockPdfWorkspace";
import { FileDropzone } from "@/components/tools/FileDropzone";
import { ToolShell } from "@/components/tools/ToolShell";
import { useI18n } from "@/i18n/context";
import { downloadBytes } from "@/lib/download";
import { useGuardedDownload } from "@/lib/use-guarded-download";
import {
  PdfPasswordRequiredError,
  PdfWrongPasswordError,
  unlockPdf,
} from "@/lib/pdf/unlock";
import { pickPdfFile } from "@/lib/pdf/pick-pdf";

export function UnlockPdfTool() {
  const { t } = useI18n();
  const copy = t.tools["unlock-pdf"];
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState("");
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { requestDownload, feedback } = useGuardedDownload();

  const addFile = useCallback(
    (files: File[]) => {
      const pdf = pickPdfFile(files);
      if (!pdf) {
        setError(copy.errors.invalid);
        return;
      }
      setError(null);
      setSuccess(false);
      setFile(pdf);
      setPassword("");
    },
    [copy.errors.invalid],
  );

  const download = async () => {
    if (!file) return;
    setProcessing(true);
    setError(null);
    setSuccess(false);
    try {
      const result = await unlockPdf(file, password);
      downloadBytes(result.bytes, bytesFileName(file.name));
      setSuccess(true);
      window.setTimeout(() => setSuccess(false), 2800);
    } catch (cause) {
      if (cause instanceof PdfPasswordRequiredError) {
        setError(t.unlock.passwordRequired);
        return;
      }
      if (cause instanceof PdfWrongPasswordError) {
        setError(t.unlock.wrongPassword);
        return;
      }
      setError(copy.errors.failed);
    } finally {
      setProcessing(false);
    }
  };

  const reset = () => {
    setFile(null);
    setPassword("");
    setError(null);
    setSuccess(false);
  };

  return (
    <ToolShell toolId="unlock-pdf" icon={LockOpen}>
      <div className="min-w-0 space-y-4">
        {!file ? (
          <FileDropzone title={t.common.dropzoneTitle} hint={copy.hint} onFiles={addFile} />
        ) : (
          <UnlockPdfWorkspace
            file={file}
            password={password}
            setPassword={setPassword}
            processing={processing}
            success={success}
            onDownload={() => requestDownload(download)}
            downloadLabel={copy.action}
          />
        )}
        {file ? (
          <button type="button" className="btn-secondary w-full sm:w-auto" onClick={reset}>
            {t.common.clear}
          </button>
        ) : null}
        {error ? <p className="text-sm text-rose-400">{error}</p> : null}
        {feedback}
      </div>
    </ToolShell>
  );
}

function bytesFileName(name: string): string {
  return name.replace(/\.pdf$/i, "") + "-unlocked.pdf";
}