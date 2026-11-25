"use client";

import { useI18n } from "@/i18n/context";
import { cn } from "@/lib/cn";
import type { PadSurfaceMode } from "@/lib/signatures/paper-surface";

type PadSurfaceSwitchProps = {
  value: PadSurfaceMode;
  onChange: (mode: PadSurfaceMode) => void;
  autoDark?: boolean;
  className?: string;
};

export function PadSurfaceSwitch({
  value,
  onChange,
  autoDark = false,
  className,
}: PadSurfaceSwitchProps) {
  const { t } = useI18n();
  const options: { id: PadSurfaceMode; label: string }[] = [
    { id: "paper", label: t.sign.padSurfacePaper },
    { id: "grid", label: t.sign.padSurfaceGrid },
    { id: "dark", label: t.sign.padSurfaceDark },
  ];

  return (
    <div className={cn("min-w-0 space-y-1.5", className)}>
      <p className="text-xs text-gray-500">{t.sign.padSurface}</p>
      <div className="flex min-w-0 flex-wrap gap-1.5" role="group" aria-label={t.sign.padSurface}>
        {options.map((item) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={value === item.id}
            onClick={() => onChange(item.id)}
            className={cn(
              "min-w-0 flex-1 rounded-lg px-2 py-1.5 text-[11px] font-medium leading-tight sm:flex-none sm:text-xs",
              value === item.id
                ? "bg-cyan-500/20 text-cyan-100 ring-1 ring-cyan-500/35"
                : "bg-white/5 text-gray-400 hover:bg-white/8 hover:text-gray-200",
            )}
          >
            {item.label}
          </button>
        ))}
      </div>
      {autoDark ? (
        <p className="text-[11px] leading-snug text-amber-300/90">{t.sign.padSurfaceAutoHint}</p>
      ) : null}
    </div>
  );
}