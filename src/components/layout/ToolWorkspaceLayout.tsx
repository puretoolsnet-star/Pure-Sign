import type { ReactNode } from "react";

import { AdBanner } from "@/components/ads/AdBanner";
import { cn } from "@/lib/cn";

export type ToolWorkspaceLayoutProps = {
  children: ReactNode;
  className?: string;
  workspaceClassName?: string;
  adSlot?: string;
  adClassName?: string;
};

export function ToolWorkspaceLayout({
  children,
  className,
  workspaceClassName,
  adSlot = "tool-sidebar",
  adClassName,
}: ToolWorkspaceLayoutProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_min(100%,17.5rem)] lg:items-start lg:gap-8",
        className,
      )}
    >
      <div
        className={cn("relative z-10 order-1 min-w-0 lg:order-none", workspaceClassName)}
      >
        {children}
      </div>
      <AdBanner
        layout="sidebar"
        slot={adSlot}
        className={cn("lg:sticky lg:top-6 lg:self-start", adClassName)}
      />
    </div>
  );
}