"use client";

import { SavedSignaturesStrip } from "@/components/tools/signature/SavedSignaturesStrip";
import { useI18n } from "@/i18n/context";

type DesktopSavedSignaturesRailProps = {
  onApply: (dataUrl: string) => void;
};

export function DesktopSavedSignaturesRail({ onApply }: DesktopSavedSignaturesRailProps) {
  const { t } = useI18n();

  return (
    <aside className="hidden min-w-0 lg:block">
      <div className="glass-card sticky top-2 max-h-[calc(100vh-11rem)] space-y-2 overflow-y-auto rounded-2xl border-slate-800/60 p-3">
        <p className="text-xs font-medium text-gray-400">{t.sign.savedTitle}</p>
        <p className="text-[11px] leading-snug text-gray-500">{t.sign.desktopSavedHint}</p>
        <SavedSignaturesStrip
          displaySurface="paper"
          onApply={onApply}
          className="[&_ul]:flex-col [&_li]:w-full"
        />
      </div>
    </aside>
  );
}