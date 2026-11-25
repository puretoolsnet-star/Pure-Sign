export type PadSurfaceMode = "paper" | "grid" | "dark";

export function isLightInk(hex: string): boolean {
  const value = hex.replace("#", "");
  const normalized =
    value.length === 3
      ? value
          .split("")
          .map((c) => c + c)
          .join("")
      : value;
  const int = Number.parseInt(normalized, 16);
  if (Number.isNaN(int)) return false;
  const r = (int >> 16) & 255;
  const g = (int >> 8) & 255;
  const b = int & 255;
  const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  return luminance > 0.72;
}

/** UI-only surface: never baked into exported PNG. */
export function resolvePadSurface(
  mode: PadSurfaceMode,
  inkColor: string,
): { surface: PadSurfaceMode; autoDark: boolean } {
  if (isLightInk(inkColor) && (mode === "paper" || mode === "grid")) {
    return { surface: "dark", autoDark: true };
  }
  return { surface: mode, autoDark: false };
}

export const PAPER_SURFACE_CLASS: Record<PadSurfaceMode, string> = {
  paper: "signature-paper-surface--paper",
  grid: "signature-paper-surface--grid",
  dark: "signature-paper-surface--dark",
};