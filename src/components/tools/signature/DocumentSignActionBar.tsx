"use client";

import { Calendar, Download, Loader2, PenLine, Type, WholeWord } from "lucide-react";

import { useI18n } from "@/i18n/context";
import { cn } from "@/lib/cn";

type DocumentSignActionBarProps = {
  onAddSignature: () => void;
  onAddInitials: () => void;
  onAddDate: () => void;
  onAddText: () => void;
  onDownload: () => void;
  downloadDisabled?: boolean;
  downloading?: boolean;
  className?: string;
};

export function DocumentSignActionBar({
  onAddSignature,
  onAddInitials,
  onAddDate,
  onAddText,
  onDownload,
  downloadDisabled,
  downloading,
  className,
}: DocumentSignActionBarProps) {
  const { t } = useI18n();

  const actions = [
    { id: "sign", icon: PenLine, label: t.sign.addSignature, onClick: onAddSignature },
    { id: "initials", icon: WholeWord, label: t.sign.addInitials, onClick: onAddInitials },
    { id: "date", icon: Calendar, label: t.sign.addDate, onClick: onAddDate },
    { id: "text", icon: Type, label: t.sign.addText, onClick: onAddText },
  ] as const;

  return (
    <div
      className={cn(
        "sign-workspace sticky bottom-0 z-20 -mx-1 border-t border-slate-800/70 bg-slate-950/95 px-1 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur-md sm:static sm:mx-0 sm:rounded-2xl sm:border sm:bg-slate-900/80 sm:px-2 sm:pb-2 sm:pt-2",
        className,
      )}
    >
      <div className="flex min-w-0 gap-1 overflow-x-auto pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {actions.map((action) => (
          <button
            key={action.id}
            type="button"
            onClick={action.onClick}
            className={cn(
              "btn-secondary flex min-w-0 shrink-0 flex-col items-center gap-0.5 px-2.5 py-2 text-[10px] sm:flex-row sm:gap-1.5 sm:px-3 sm:text-xs",
            )}
          >
            <action.icon className="h-4 w-4 shrink-0" aria-hidden />
            <span className="max-w-[4.5rem] truncate sm:max-w-none">{action.label}</span>
          </button>
        ))}
        <button
          type="button"
          className="btn-primary ml-auto flex min-w-0 shrink-0 items-center gap-1.5 px-3 py-2 text-xs sm:text-sm"
          disabled={downloadDisabled || downloading}
          onClick={onDownload}
        >
          {downloading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
          <span className="truncate">{t.sign.downloadDocument}</span>
        </button>
      </div>
    </div>
  );
}