import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

export type ToolWorkspaceLayoutProps = {
  children: ReactNode;
  className?: string;
  workspaceClassName?: string;
};

export function ToolWorkspaceLayout({
  children,
  className,
  workspaceClassName,
}: ToolWorkspaceLayoutProps) {
  return (
    <div className={cn("sign-workspace min-w-0", className)}>
      <div className={cn("relative z-10 min-w-0 overflow-x-clip", workspaceClassName)}>
        {children}
      </div>
    </div>
  );
}