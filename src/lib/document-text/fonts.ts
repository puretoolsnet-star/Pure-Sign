export type DocumentTextFontId = "sans" | "serif" | "script" | "mono";

export const DOCUMENT_TEXT_FONTS: {
  id: DocumentTextFontId;
  canvas: string;
  previewClass: string;
}[] = [
  {
    id: "sans",
    canvas: '600 52px ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif',
    previewClass: 'font-sans font-semibold',
  },
  {
    id: "serif",
    canvas: '600 50px Georgia, "Times New Roman", Cambria, serif',
    previewClass: "font-serif font-semibold",
  },
  {
    id: "script",
    canvas: 'italic 600 56px "Segoe Script", "Brush Script MT", "Palace Script MT", cursive',
    previewClass: 'font-[family-name:var(--font-script-fallback)] italic font-semibold',
  },
  {
    id: "mono",
    canvas: '500 46px ui-monospace, "Cascadia Mono", Consolas, "Courier New", monospace',
    previewClass: "font-mono font-medium",
  },
];

export function canvasFontForId(id: DocumentTextFontId) {
  return DOCUMENT_TEXT_FONTS.find((item) => item.id === id)?.canvas ?? DOCUMENT_TEXT_FONTS[0].canvas;
}