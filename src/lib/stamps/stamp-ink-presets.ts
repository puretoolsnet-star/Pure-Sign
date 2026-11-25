/** Inks for stamps & seals — visible on white paper. */
export const STAMP_INK_PRESETS = [
  { id: "seal", color: "#1e3a8a", ring: "ring-blue-500/50" },
  { id: "ballpoint", color: "#0f296a", ring: "ring-blue-400/50" },
  { id: "black", color: "#111111", ring: "ring-white/30" },
  { id: "graphite", color: "#374151", ring: "ring-slate-400/50" },
  { id: "blue", color: "#1d4ed8", ring: "ring-sky-400/45" },
  { id: "red", color: "#b91c1c", ring: "ring-red-400/45" },
] as const;

export const DEFAULT_STAMP_INK = STAMP_INK_PRESETS[0].color;