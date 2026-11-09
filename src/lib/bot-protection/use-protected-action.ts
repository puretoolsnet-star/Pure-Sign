"use client";

import { useCallback } from "react";

import { useBotProtection } from "@/components/bot-protection/BotProtectionProvider";
import { useI18n } from "@/i18n/context";

export function useProtectedAction() {
  const { guardAction } = useBotProtection();
  const { t } = useI18n();

  const runProtected = useCallback(
    async (
      action: () => void | Promise<void>,
      setError: (message: string | null) => void,
    ) => {
      const guard = await guardAction();
      if (!guard.ok) {
        setError(
          guard.code === "rate_limit"
            ? t.botProtection.rateLimited
            : t.botProtection.unavailable,
        );
        return false;
      }

      setError(null);
      await action();
      return true;
    },
    [guardAction, t.botProtection.rateLimited, t.botProtection.unavailable],
  );

  return { runProtected, guardAction };
}
