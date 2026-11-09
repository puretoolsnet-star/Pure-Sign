"use client";

import type { ReactNode } from "react";

import { BotProtectionProvider } from "@/components/bot-protection/BotProtectionProvider";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <BotProtectionProvider>
      <div
        id="puresign-app-root"
        className="relative z-[1] flex min-h-dvh min-w-0 w-full max-w-full flex-1 flex-col"
      >
        {children}
      </div>
    </BotProtectionProvider>
  );
}
