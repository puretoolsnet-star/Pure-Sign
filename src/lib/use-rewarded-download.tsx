"use client";

import { useCallback, useRef, useState, type ReactNode } from "react";

import { RewardedDownloadModal } from "@/components/ads/RewardedDownloadModal";
import { useBotProtection } from "@/components/bot-protection/BotProtectionProvider";
import { useI18n } from "@/i18n/context";

export function useRewardedDownload(): {
  requestDownload: (action: () => void | Promise<void>) => void;
  modal: ReactNode;
} {
  const { guardAction } = useBotProtection();
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [sessionKey, setSessionKey] = useState(0);
  const [botError, setBotError] = useState<string | null>(null);
  const pendingRef = useRef<(() => void | Promise<void>) | null>(null);

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

        pendingRef.current = action;
        setSessionKey((key) => key + 1);
        setOpen(true);
      })();
    },
    [guardAction, t.botProtection.rateLimited, t.botProtection.unavailable],
  );

  const close = useCallback(() => {
    setOpen(false);
  }, []);

  const complete = useCallback(async () => {
    await pendingRef.current?.();
  }, []);

  return {
    requestDownload,
    modal: (
      <>
        {botError ? (
          <p className="text-sm text-rose-400" role="alert">
            {botError}
          </p>
        ) : null}
        <RewardedDownloadModal
          open={open}
          sessionKey={sessionKey}
          onClose={close}
          onUnlocked={complete}
        />
      </>
    ),
  };
}
