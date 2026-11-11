"use client";

import { Loader2, LockOpen } from "lucide-react";
import { useCallback, useState } from "react";

import { FileDropzone } from "@/components/tools/FileDropzone";
import { ToolShell } from "@/components/tools/ToolShell";
import { useI18n } from "@/i18n/context";
import { downloadBytes } from "@/lib/download";
import { useRewardedDownload } from "@/lib/use-rewarded-download";
import { PdfPasswordRequiredError, unlockPdf } from "@/lib/pdf/unlock";
import { pickPdfFile } from "@/lib/pdf/pick-pdf";

export function UnlockPdfTool() {
  const { t } = useI18n();
  const copy = t.tools["unlock-pdf"];
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState("");
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
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
      const bytes = await unlockPdf(file, password.trim() || undefined);
      downloadBytes(bytes, file.name.replace(/\.pdf$/i, "") + "-unlocked.pdf");
    } catch (error) {
      if (error instanceof PdfPasswordRequiredError) {
        setError(copy.hint);
        return;
      }
      setError(password ? t.unlock.wrongPassword : copy.errors.failed);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <ToolShell toolId="unlock-pdf" icon={LockOpen}>
      <div className="space-y-6">
        {!file ? (
          <FileDropzone title={t.common.dropzoneTitle} hint={copy.hint} onFiles={addFile} />
        ) : (
          <div className="glass-card space-y-4 rounded-2xl border-slate-800/60 p-4 sm:p-5">
            <p className="text-sm text-gray-300">{file.name}</p>
            <label className="block text-sm text-gray-400">
              {t.unlock.passwordLabel}
              <input
                type="password"
                autoComplete="current-password"
                className="input-field mt-2"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder={t.unlock.passwordHint}
              />
            </label>
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
                  setPassword("");
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
