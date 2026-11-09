export async function renderStampPng(options: {
  text: string;
  color: string;
}): Promise<string> {
  const { text, color } = options;
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas is not available.");

  const fontSize = 42;
  ctx.font = `700 ${fontSize}px ui-sans-serif, system-ui, sans-serif`;
  const metrics = ctx.measureText(text);
  const padX = 36;
  const padY = 22;
  canvas.width = Math.ceil(metrics.width + padX * 2);
  canvas.height = Math.ceil(fontSize + padY * 2);

  const radius = 14;
  roundRect(ctx, 4, 4, canvas.width - 8, canvas.height - 8, radius);
  ctx.strokeStyle = color;
  ctx.lineWidth = 6;
  ctx.stroke();

  ctx.font = `700 ${fontSize}px ui-sans-serif, system-ui, sans-serif`;
  ctx.fillStyle = color;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, canvas.width / 2, canvas.height / 2 + 1);

  return canvas.toDataURL("image/png");
}

export async function renderTypedSignaturePng(text: string): Promise<string> {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas is not available.");

  const fontSize = 64;
  ctx.font = `italic 600 ${fontSize}px Georgia, "Times New Roman", serif`;
  const width = Math.max(280, Math.ceil(ctx.measureText(text).width + 48));
  canvas.width = width;
  canvas.height = 120;

  ctx.font = `italic 600 ${fontSize}px Georgia, "Times New Roman", serif`;
  ctx.fillStyle = "#0f172a";
  ctx.textBaseline = "middle";
  ctx.fillText(text, 24, canvas.height / 2);

  return canvas.toDataURL("image/png");
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
