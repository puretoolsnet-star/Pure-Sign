"use client";

import { LockKeyhole } from "lucide-react";
import { useCallback, useState } from "react";

import { ProtectPdfWorkspace } from "@/components/tools/protect-pdf/ProtectPdfWorkspace";
import { FileDropzone } from "@/components/tools/FileDropzone";
import { ToolShell } from "@/components/tools/ToolShell";
import { useI18n } from "@/i18n/context";
import { downloadBytes } from "@/lib/download";
import { useGuardedDownload } from "@/lib/use-guarded-download";
import { ProtectPdfError, protectPdfWithPassword } from "@/lib/pdf/protect";
import { pickPdfFile } from "@/lib/pdf/pick-pdf";

export function ProtectPdfTool() {
  const { t } = useI18n();
  const copy = t.tools["protect-pdf"];
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [restrictPrinting, setRestrictPrinting] = useState(false);
  const [restrictCopying, setRestrictCopying] = useState(false);
  const [ownerPassword, setOwnerPassword] = useState("");
  const [processing, setProcessing] = useState(false);
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
      setFile(pdf);
      setPassword("");
      setConfirm("");
      setOwnerPassword("");
      setRestrictPrinting(false);
      setRestrictCopying(false);
    },
    [copy.errors.invalid],
  );

  const resolveError = (cause: unknown) => {
    if (cause instanceof ProtectPdfError) {
      if (cause.code === "already_encrypted") return t.protect.alreadyEncrypted;
      if (cause.code === "password_encoding") return t.protect.passwordEncoding;
    }
    return copy.errors.failed;
  };

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
      const bytes = await protectPdfWithPassword(file, password, {
        allowPrinting: !restrictPrinting,
        allowCopying: !restrictCopying,
        ownerPassword: ownerPassword.trim() || undefined,
      });
      downloadBytes(bytes, file.name.replace(/\.pdf$/i, "") + "-protected.pdf");
    } catch (cause) {
      setError(resolveError(cause));
    } finally {
      setProcessing(false);
    }
  };

  const reset = () => {
    setFile(null);
    setPassword("");
    setConfirm("");
    setOwnerPassword("");
    setRestrictPrinting(false);
    setRestrictCopying(false);
    setError(null);
  };

  return (
    <ToolShell toolId="protect-pdf" icon={LockKeyhole}>
      <div className="min-w-0 space-y-4">
        {!file ? (
          <FileDropzone title={t.common.dropzoneTitle} hint={copy.hint} onFiles={addFile} />
        ) : (
          <ProtectPdfWorkspace
            fileName={file.name}
            password={password}
            setPassword={setPassword}
            confirm={confirm}
            setConfirm={setConfirm}
            restrictPrinting={restrictPrinting}
            setRestrictPrinting={setRestrictPrinting}
            restrictCopying={restrictCopying}
            setRestrictCopying={setRestrictCopying}
            ownerPassword={ownerPassword}
            setOwnerPassword={setOwnerPassword}
            processing={processing}
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