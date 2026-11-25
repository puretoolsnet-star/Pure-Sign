"use client";

import type { ReactNode } from "react";

import { cn } from "@/lib/cn";
import {
  PAPER_SURFACE_CLASS,
  type PadSurfaceMode,
} from "@/lib/signatures/paper-surface";

type SignaturePaperSurfaceProps = {
  mode: PadSurfaceMode;
  children?: ReactNode;
  className?: string;
  frameClassName?: string;
  showBaseline?: boolean;
  compact?: boolean;
};

export function SignaturePaperSurface({
  mode,
  children,
  className,
  frameClassName,
  showBaseline = true,
  compact = false,
}: SignaturePaperSurfaceProps) {
  return (
    <div
      className={cn(
        "signature-paper-frame min-w-0 overflow-hidden rounded-xl border border-slate-600/40 bg-slate-900/30 p-[3px] shadow-inner shadow-black/25",
        frameClassName,
      )}
    >
      <div
        className={cn(
          "signature-paper-surface relative min-w-0 overflow-hidden",
          PAPER_SURFACE_CLASS[mode],
          compact ? "min-h-[6.75rem]" : "min-h-[7.75rem] sm:min-h-[8.25rem]",
          className,
        )}
      >
        {showBaseline ? (
          <div
            className="signature-paper-baseline pointer-events-none absolute inset-x-0 z-0 select-none"
            aria-hidden
          />
        ) : null}
        <div className="relative z-10 min-h-[inherit]">{children}</div>
      </div>
    </div>
  );
}