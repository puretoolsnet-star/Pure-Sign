"use client";

import { CheckCircle2, Download, Info, Loader2, LockKeyhole } from "lucide-react";
import { useEffect, useState } from "react";

import { PasswordField } from "@/components/tools/PasswordField";
import { useI18n } from "@/i18n/context";
import { cn } from "@/lib/cn";
import { inspectPdfEncryption } from "@/lib/pdf/unlock";

type FileProtection = "loading" | "open" | "encrypted";

type UnlockPdfWorkspaceProps = {
  file: File;
  password: string;
  setPassword: (value: string) => void;
  processing: boolean;
  success: boolean;
  onDownload: () => void;
  downloadLabel: string;
};

export function UnlockPdfWorkspace({
  file,
  password,
  setPassword,
  processing,
  success,
  onDownload,
  downloadLabel,
}: UnlockPdfWorkspaceProps) {
  const { t } = useI18n();
  const [showPassword, setShowPassword] = useState(false);
  const [protection, setProtection] = useState<FileProtection>("loading");

  useEffect(() => {
    let cancelled = false;
    setProtection("loading");
    void inspectPdfEncryption(file)
      .then((info) => {
        if (cancelled) return;
        setProtection(info.encrypted ? "encrypted" : "open");
      })
      .catch(() => {
        if (!cancelled) setProtection("open");
      });
    return () => {
      cancelled = true;
    };
  }, [file]);

  const statusText =
    protection === "loading"
      ? t.unlock.statusChecking
      : protection === "encrypted"
        ? t.unlock.statusEncrypted
        : t.unlock.statusNoEncryption;

  return (
    <div className="flex min-w-0 flex-col gap-3">
      <p className="text-xs text-gray-500">{t.unlock.workspaceHint}</p>

      <div className="glass-card min-w-0 space-y-4 rounded-2xl border border-slate-800/60 p-3 sm:p-4">
        <p className="truncate text-sm font-medium text-white" title={file.name}>
          {file.name}
        </p>

        <div
          className={cn(
            "flex gap-2 rounded-xl border px-3 py-2.5 text-xs leading-relaxed",
            protection === "encrypted"
              ? "border-cyan-500/25 bg-cyan-500/10 text-cyan-100/95"
              : "border-slate-700/60 bg-slate-900/50 text-gray-300",
          )}
          role="status"
        >
          {protection === "encrypted" ? (
            <LockKeyhole className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" aria-hidden />
          ) : (
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" aria-hidden />
          )}
          <p>{statusText}</p>
        </div>

        <PasswordField
          id="unlock-password"
          label={t.unlock.passwordLabel}
          value={password}
          onChange={setPassword}
          visible={showPassword}
          onToggleVisible={() => setShowPassword((current) => !current)}
          showLabel={t.unlock.showPassword}
          hideLabel={t.unlock.hidePassword}
          autoComplete="current-password"
          placeholder={t.unlock.passwordPlaceholder}
          hint={
            protection === "encrypted"
              ? t.unlock.passwordHintEncrypted
              : t.unlock.passwordHintOpen
          }
        />
      </div>

      {success ? (
        <p className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-300">
          <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden />
          {t.unlock.successUnlocked}
        </p>
      ) : null}

      <div className="sign-workspace sticky bottom-0 z-20 -mx-1 border-t border-slate-800/70 bg-slate-950/95 px-1 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur-md sm:static sm:mx-0 sm:rounded-2xl sm:border sm:bg-slate-900/80 sm:px-3 sm:pb-3 sm:pt-3">
        <button
          type="button"
          className="btn-primary inline-flex min-h-11 w-full min-w-0 items-center justify-center gap-2 text-sm sm:w-auto"
          disabled={processing || protection === "loading"}
          onClick={onDownload}
        >
          {processing ? (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
          ) : (
            <Download className="h-4 w-4" aria-hidden />
          )}
          {processing ? t.unlock.statusUnlocking : downloadLabel}
        </button>
      </div>
    </div>
  );
}