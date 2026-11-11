"use client";

import { Loader2, LockKeyhole } from "lucide-react";
import { useCallback, useState } from "react";

import { FileDropzone } from "@/components/tools/FileDropzone";
import { ToolShell } from "@/components/tools/ToolShell";
import { useI18n } from "@/i18n/context";
import { downloadBytes } from "@/lib/download";
import { useRewardedDownload } from "@/lib/use-rewarded-download";
import { protectPdfWithPassword } from "@/lib/pdf/protect";
import { pickPdfFile } from "@/lib/pdf/pick-pdf";

export function ProtectPdfTool() {
  const { t } = useI18n();
  const copy = t.tools["protect-pdf"];
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
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
    if (password.length < 4) {
      setError(t.protect.minLength);
      return;
    }
    if (password !== confirm) {
      setError(t.protect.mismatch);
      return;
    }
    setProcessing(true);
    setError(null);
    try {
      const bytes = await protectPdfWithPassword(file, password);
      downloadBytes(bytes, file.name.replace(/\.pdf$/i, "") + "-protected.pdf");
    } catch {
      setError(copy.errors.failed);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <ToolShell toolId="protect-pdf" icon={LockKeyhole}>
      <div className="space-y-6">
        {!file ? (
          <FileDropzone title={t.common.dropzoneTitle} hint={copy.hint} onFiles={addFile} />
        ) : (
          <div className="glass-card space-y-4 rounded-2xl border-slate-800/60 p-4 sm:p-5">
            <p className="text-sm text-gray-300">{file.name}</p>
            <label className="block text-sm text-gray-400">
              {t.protect.passwordLabel}
              <input
                type="password"
                autoComplete="new-password"
                className="input-field mt-2"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </label>
            <label className="block text-sm text-gray-400">
              {t.protect.passwordConfirm}
              <input
                type="password"
                autoComplete="new-password"
                className="input-field mt-2"
                value={confirm}
                onChange={(event) => setConfirm(event.target.value)}
              />
            </label>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                className="btn-primary"
                disabled={processing || !password || !confirm}
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
                  setConfirm("");
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
