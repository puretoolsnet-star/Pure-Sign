export async function renderStampPng(options: {
  text: string;
  color: string;
  lightImprint?: boolean;
}): Promise<string> {
  const { renderRectStampPng } = await import("@/lib/stamps/render-stamp");
  return renderRectStampPng({
    shape: "rect",
    label: options.text,
    color: options.color,
    lightImprint: options.lightImprint,
  });
}

export type TypedSignatureStyle = "script" | "business";

export async function renderTypedSignaturePng(
  text: string,
  options?: { style?: TypedSignatureStyle; color?: string },
): Promise<string> {
  const style = options?.style ?? "script";
  const color = options?.color ?? "#111827";
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas is not available.");

  const fontSize = style === "business" ? 52 : 64;
  const font =
    style === "business"
      ? `600 ${fontSize}px ui-sans-serif, system-ui, sans-serif`
      : `italic 600 ${fontSize}px "Segoe Script", "Brush Script MT", Georgia, serif`;

  ctx.font = font;
  const width = Math.max(280, Math.ceil(ctx.measureText(text).width + 48));
  canvas.width = width;
  canvas.height = style === "business" ? 96 : 120;

  ctx.font = font;
  ctx.fillStyle = color;
  ctx.textBaseline = "middle";
  ctx.fillText(text, 24, canvas.height / 2);

  return canvas.toDataURL("image/png");
}

