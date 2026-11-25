function loadImage(url: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("image"));
    image.src = url;
  });
}

function hexToRgb(hex: string) {
  const value = hex.replace("#", "");
  const int = Number.parseInt(value.length === 3 ? value.repeat(2) : value, 16);
  return {
    r: (int >> 16) & 255,
    g: (int >> 8) & 255,
    b: int & 255,
  };
}

export async function processSignaturePhoto(
  dataUrl: string,
  options: {
    backgroundThreshold: number;
    inkColor: string;
    trim: boolean;
  },
): Promise<string> {
  const image = await loadImage(dataUrl);
  const canvas = document.createElement("canvas");
  canvas.width = image.width;
  canvas.height = image.height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas is not available.");
  ctx.drawImage(image, 0, 0);

  let { width, height } = canvas;
  const imageData = ctx.getImageData(0, 0, width, height);
  const { data } = imageData;
  const threshold = options.backgroundThreshold;
  const ink = hexToRgb(options.inkColor);

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i]!;
    const g = data[i + 1]!;
    const b = data[i + 2]!;
    const avg = (r + g + b) / 3;
    const spread = Math.max(r, g, b) - Math.min(r, g, b);
    if (avg >= threshold && spread < 48) {
      data[i + 3] = 0;
      continue;
    }
    const darkness = 1 - avg / 255;
    data[i] = Math.round(ink.r * darkness + (255 - darkness * 255) * (r / 255));
    data[i + 1] = Math.round(ink.g * darkness + (255 - darkness * 255) * (g / 255));
    data[i + 2] = Math.round(ink.b * darkness + (255 - darkness * 255) * (b / 255));
    data[i + 3] = Math.round(Math.min(255, darkness * 255 * 1.2 + data[i + 3]! * 0.15));
  }
  ctx.putImageData(imageData, 0, 0);

  if (options.trim) {
    const trimmed = trimTransparent(ctx, width, height);
    const out = document.createElement("canvas");
    out.width = trimmed.width;
    out.height = trimmed.height;
    const outCtx = out.getContext("2d");
    if (!outCtx) return canvas.toDataURL("image/png");
    outCtx.putImageData(trimmed, 0, 0);
    return out.toDataURL("image/png");
  }

  return canvas.toDataURL("image/png");
}

function trimTransparent(ctx: CanvasRenderingContext2D, width: number, height: number) {
  const imageData = ctx.getImageData(0, 0, width, height);
  const { data } = imageData;
  let top = height;
  let left = width;
  let right = 0;
  let bottom = 0;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const alpha = data[(y * width + x) * 4 + 3]!;
      if (alpha > 12) {
        top = Math.min(top, y);
        left = Math.min(left, x);
        right = Math.max(right, x);
        bottom = Math.max(bottom, y);
      }
    }
  }

  if (right <= left || bottom <= top) {
    return imageData;
  }

  const pad = 8;
  const cropX = Math.max(0, left - pad);
  const cropY = Math.max(0, top - pad);
  const cropW = Math.min(width - cropX, right - left + 1 + pad * 2);
  const cropH = Math.min(height - cropY, bottom - top + 1 + pad * 2);
  return ctx.getImageData(cropX, cropY, cropW, cropH);
}