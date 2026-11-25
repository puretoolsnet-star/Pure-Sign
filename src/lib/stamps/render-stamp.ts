import type { DocumentStampMeta, StampShape } from "@/lib/stamps/types";

export type StampRenderOptions = {
  shape: StampShape;
  label: string;
  ringText?: string;
  color: string;
  lightImprint?: boolean;
};

function hexWithAlpha(hex: string, alpha: number) {
  const value = hex.replace("#", "");
  const int = Number.parseInt(value.length === 3 ? value.repeat(2) : value, 16);
  const r = (int >> 16) & 255;
  const g = (int >> 8) & 255;
  const b = int & 255;
  return `rgba(${r},${g},${b},${alpha})`;
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + width, y, x + width, y + height, radius);
  ctx.arcTo(x + width, y + height, x, y + height, radius);
  ctx.arcTo(x, y + height, x, y, radius);
  ctx.arcTo(x, y, x + width, y, radius);
  ctx.closePath();
}

function drawArcText(
  ctx: CanvasRenderingContext2D,
  text: string,
  cx: number,
  cy: number,
  radius: number,
  startAngle: number,
  sweep: number,
  color: string,
) {
  const chars = text.toUpperCase().split("").filter(Boolean);
  if (chars.length === 0) return;
  const step = sweep / Math.max(chars.length - 1, 1);
  ctx.fillStyle = color;
  ctx.font = `700 15px ui-sans-serif, system-ui, sans-serif`;
  chars.forEach((char, index) => {
    const angle = startAngle + step * index;
    const x = cx + Math.cos(angle) * radius;
    const y = cy + Math.sin(angle) * radius;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle + Math.PI / 2);
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(char, 0, 0);
    ctx.restore();
  });
}

export async function renderDocumentStampPng(options: StampRenderOptions): Promise<string> {
  if (options.shape === "round") {
    return renderRoundSealPng(options);
  }
  return renderRectStampPng(options);
}

export async function renderRectStampPng(options: StampRenderOptions): Promise<string> {
  const text = options.label.trim();
  if (!text) throw new Error("empty");
  const ink = options.lightImprint ? hexWithAlpha(options.color, 0.62) : options.color;
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas is not available.");

  const fontSize = 38;
  ctx.font = `700 ${fontSize}px ui-sans-serif, system-ui, sans-serif`;
  const metrics = ctx.measureText(text.toUpperCase());
  const padX = 32;
  const padY = 20;
  canvas.width = Math.ceil(metrics.width + padX * 2);
  canvas.height = Math.ceil(fontSize + padY * 2);

  const radius = 12;
  roundRect(ctx, 4, 4, canvas.width - 8, canvas.height - 8, radius);
  ctx.strokeStyle = ink;
  ctx.lineWidth = options.lightImprint ? 4 : 5;
  ctx.stroke();

  ctx.font = `700 ${fontSize}px ui-sans-serif, system-ui, sans-serif`;
  ctx.fillStyle = ink;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text.toUpperCase(), canvas.width / 2, canvas.height / 2 + 1);

  return canvas.toDataURL("image/png");
}

export async function renderRoundSealPng(options: StampRenderOptions): Promise<string> {
  const center = options.label.trim();
  const ring = (options.ringText ?? center).trim();
  if (!center && !ring) throw new Error("empty");

  const ink = options.lightImprint ? hexWithAlpha(options.color, 0.62) : options.color;
  const size = 280;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas is not available.");

  const cx = size / 2;
  const cy = size / 2;
  const outer = size / 2 - 8;
  const inner = outer - 14;

  ctx.strokeStyle = ink;
  ctx.lineWidth = options.lightImprint ? 3.5 : 4.5;
  ctx.beginPath();
  ctx.arc(cx, cy, outer, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(cx, cy, inner, 0, Math.PI * 2);
  ctx.stroke();

  if (ring) {
    drawArcText(ctx, ring, cx, cy, outer - 10, -Math.PI * 0.85, Math.PI * 0.7, ink);
  }

  if (center) {
    const words = center.toUpperCase().split(/\s+/).slice(0, 3);
    ctx.fillStyle = ink;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    const lines = words.length > 1 ? words : [center.toUpperCase()];
    const lineSize = lines.length > 1 ? 22 : 28;
    ctx.font = `700 ${lineSize}px ui-sans-serif, system-ui, sans-serif`;
    const startY = cy - ((lines.length - 1) * lineSize) / 2;
    lines.forEach((line, i) => {
      ctx.fillText(line, cx, startY + i * (lineSize + 4));
    });
  }

  if (center) {
    ctx.font = `700 18px ui-sans-serif, system-ui, sans-serif`;
    ctx.fillText("★", cx, cy + 36);
  }

  return canvas.toDataURL("image/png");
}

export function metaToRenderOptions(meta: DocumentStampMeta): StampRenderOptions {
  return {
    shape: meta.shape,
    label: meta.label,
    ringText: meta.ringText,
    color: meta.color,
    lightImprint: meta.lightImprint,
  };
}