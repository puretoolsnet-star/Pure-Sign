"use client";

import { useCallback, useState, type ReactNode } from "react";

import { useBotProtection } from "@/components/bot-protection/BotProtectionProvider";
import { useI18n } from "@/i18n/context";
import { runRewardedVideoGate } from "@/lib/rewarded-video/useRewardedVideo";

export function useGuardedDownload(): {
  requestDownload: (action: () => void | Promise<void>) => void;
  feedback: ReactNode;
} {
  const { guardAction } = useBotProtection();
  const { t } = useI18n();
  const [botError, setBotError] = useState<string | null>(null);

  const requestDownload = useCallback(
    (action: () => void | Promise<void>) => {
      void (async () => {
        setBotError(null);
        const guard = await guardAction();
        if (!guard.ok) {
          setBotError(
            guard.code === "rate_limit"
              ? t.botProtection.rateLimited
              : t.botProtection.unavailable,
          );
          return;
        }

        await runRewardedVideoGate(action);
      })();
    },
    [guardAction, t.botProtection.rateLimited, t.botProtection.unavailable],
  );

  return {
    requestDownload,
    feedback: botError ? (
      <p className="text-sm text-rose-400" role="alert">
        {botError}
      </p>
    ) : null,
  };
}