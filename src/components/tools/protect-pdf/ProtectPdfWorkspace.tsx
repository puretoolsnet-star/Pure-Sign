"use client";

import { ChevronDown, Download, Loader2, ShieldAlert } from "lucide-react";

import { PasswordField } from "@/components/tools/PasswordField";
import { useMemo, useState } from "react";

import { useI18n } from "@/i18n/context";
import { cn } from "@/lib/cn";

type PasswordStrength = 0 | 1 | 2 | 3;

function measureStrength(password: string): PasswordStrength {
  if (!password) return 0;
  if (password.length < 4) return 1;
  let score = 0;
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[^\w\s]/.test(password)) score += 1;
  if (score <= 1) return 1;
  if (score <= 3) return 2;
  return 3;
}

type ProtectPdfWorkspaceProps = {
  fileName: string;
  password: string;
  setPassword: (value: string) => void;
  confirm: string;
  setConfirm: (value: string) => void;
  restrictPrinting: boolean;
  setRestrictPrinting: (value: boolean) => void;
  restrictCopying: boolean;
  setRestrictCopying: (value: boolean) => void;
  ownerPassword: string;
  setOwnerPassword: (value: string) => void;
  processing: boolean;
  onDownload: () => void;
  downloadLabel: string;
};

export function ProtectPdfWorkspace({
  fileName,
  password,
  setPassword,
  confirm,
  setConfirm,
  restrictPrinting,
  setRestrictPrinting,
  restrictCopying,
  setRestrictCopying,
  ownerPassword,
  setOwnerPassword,
  processing,
  onDownload,
  downloadLabel,
}: ProtectPdfWorkspaceProps) {
  const { t } = useI18n();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [advancedOpen, setAdvancedOpen] = useState(false);

  const strength = useMemo(() => measureStrength(password), [password]);
  const mismatch = confirm.length > 0 && password !== confirm;
  const canSubmit = password.length >= 4 && confirm.length >= 4 && password === confirm && !processing;

  const strengthLabel =
    strength === 0
      ? null
      : strength === 1
        ? t.protect.strengthWeak
        : strength === 2
          ? t.protect.strengthFair
          : t.protect.strengthGood;

  const restrictionsOn = restrictPrinting || restrictCopying;

  return (
    <div className="flex min-w-0 flex-col gap-3">
      <p className="text-xs text-gray-500">{t.protect.workspaceHint}</p>

      <div className="glass-card min-w-0 space-y-4 rounded-2xl border border-slate-800/60 p-3 sm:p-4">
        <p className="truncate text-sm font-medium text-white" title={fileName}>
          {fileName}
        </p>

        <div
          className="flex gap-2 rounded-xl border border-amber-500/25 bg-amber-500/10 px-3 py-2.5 text-xs leading-relaxed text-amber-100/95"
          role="note"
        >
          <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" aria-hidden />
          <p>{t.protect.lostPasswordWarning}</p>
        </div>

        <PasswordField
          id="protect-password"
          label={t.protect.passwordLabel}
          value={password}
          onChange={setPassword}
          visible={showPassword}
          onToggleVisible={() => setShowPassword((current) => !current)}
          showLabel={t.protect.showPassword}
          hideLabel={t.protect.hidePassword}
          autoComplete="new-password"
        />

        {password ? (
          <div className="space-y-1.5">
            <div className="flex items-center justify-between gap-2 text-xs">
              <span className="text-gray-500">{t.protect.strengthHint}</span>
              {strengthLabel ? (
                <span
                  className={cn(
                    strength === 1 && "text-rose-400",
                    strength === 2 && "text-amber-300",
                    strength === 3 && "text-emerald-400",
                  )}
                >
                  {strengthLabel}
                </span>
              ) : null}
            </div>
            <div className="flex h-1.5 gap-1">
              {[1, 2, 3].map((level) => (
                <div
                  key={level}
                  className={cn(
                    "h-full flex-1 rounded-full bg-slate-800 transition-colors",
                    strength >= level &&
                      (strength === 1
                        ? "bg-rose-500/80"
                        : strength === 2
                          ? "bg-amber-400/80"
                          : "bg-emerald-500/80"),
                  )}
                />
              ))}
            </div>
          </div>
        ) : null}

        <PasswordField
          id="protect-password-confirm"
          label={t.protect.passwordConfirm}
          value={confirm}
          onChange={setConfirm}
          visible={showConfirm}
          onToggleVisible={() => setShowConfirm((current) => !current)}
          showLabel={t.protect.showPassword}
          hideLabel={t.protect.hidePassword}
          autoComplete="new-password"
        />
        {mismatch ? <p className="text-xs text-rose-400">{t.protect.mismatch}</p> : null}

        <details
          className="group rounded-xl border border-slate-800/70 bg-slate-900/40"
          open={advancedOpen}
          onToggle={(event) => setAdvancedOpen((event.target as HTMLDetailsElement).open)}
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-2 px-3 py-2.5 text-sm text-gray-300 marker:content-none">
            <span>{t.protect.restrictionsTitle}</span>
            <ChevronDown
              className="h-4 w-4 shrink-0 text-gray-500 transition-transform group-open:rotate-180"
              aria-hidden
            />
          </summary>
          <div className="space-y-3 border-t border-slate-800/60 px-3 pb-3 pt-2">
            <p className="text-xs text-gray-500">{t.protect.restrictionsHint}</p>
            <label className="flex min-h-11 cursor-pointer items-center gap-3 text-sm text-gray-300">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-slate-600 bg-slate-900 text-cyan-500"
                checked={restrictPrinting}
                onChange={(event) => setRestrictPrinting(event.target.checked)}
              />
              {t.protect.restrictPrinting}
            </label>
            <label className="flex min-h-11 cursor-pointer items-center gap-3 text-sm text-gray-300">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-slate-600 bg-slate-900 text-cyan-500"
                checked={restrictCopying}
                onChange={(event) => setRestrictCopying(event.target.checked)}
              />
              {t.protect.restrictCopying}
            </label>
            {restrictionsOn ? (
              <PasswordField
                id="protect-owner-password"
                label={t.protect.ownerPasswordLabel}
                value={ownerPassword}
                onChange={setOwnerPassword}
                visible={showPassword}
                onToggleVisible={() => setShowPassword((current) => !current)}
                showLabel={t.protect.showPassword}
                hideLabel={t.protect.hidePassword}
                autoComplete="new-password"
              />
            ) : null}
            {restrictionsOn ? (
              <p className="text-xs text-gray-500">{t.protect.ownerPasswordHint}</p>
            ) : null}
          </div>
        </details>
      </div>

      <div className="sign-workspace sticky bottom-0 z-20 -mx-1 border-t border-slate-800/70 bg-slate-950/95 px-1 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur-md sm:static sm:mx-0 sm:rounded-2xl sm:border sm:bg-slate-900/80 sm:px-3 sm:pb-3 sm:pt-3">
        <button
          type="button"
          className="btn-primary inline-flex min-h-11 w-full min-w-0 items-center justify-center gap-2 text-sm sm:w-auto"
          disabled={!canSubmit}
          onClick={onDownload}
        >
          {processing ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <Download className="h-4 w-4" aria-hidden />}
          {processing ? t.protect.statusEncrypting : downloadLabel}
        </button>
      </div>
    </div>
  );
}