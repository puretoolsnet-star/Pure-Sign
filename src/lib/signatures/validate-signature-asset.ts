/** Returns true if PNG data URL has non-trivial opaque/dark ink pixels. */
export async function signatureHasVisibleInk(dataUrl: string): Promise<boolean> {
  if (!dataUrl.startsWith("data:image")) return false;

  try {
    const image = await loadImage(dataUrl);
    const canvas = document.createElement("canvas");
    const w = Math.min(image.width, 512);
    const h = Math.min(image.height, 256);
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return false;
    ctx.drawImage(image, 0, 0, w, h);
    const { data } = ctx.getImageData(0, 0, w, h);
    let darkPixels = 0;
    for (let i = 0; i < data.length; i += 4) {
      const a = data[i + 3]!;
      if (a < 24) continue;
      const r = data[i]!;
      const g = data[i + 1]!;
      const b = data[i + 2]!;
      const lum = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
      if (lum < 0.92) darkPixels += 1;
      if (darkPixels > 12) return true;
    }
    return false;
  } catch {
    return false;
  }
}

export function trimSignatureCanvasToPng(canvas: HTMLCanvasElement): string | null {
  const ctx = canvas.getContext("2d");
  if (!ctx || canvas.width < 1 || canvas.height < 1) return null;

  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  const { width, height, data } = ctx.getImageData(0, 0, canvas.width, canvas.height);
  ctx.restore();
  let top = height;
  let left = width;
  let right = 0;
  let bottom = 0;
  let ink = 0;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      const a = data[i + 3]!;
      if (a < 16) continue;
      const r = data[i]!;
      const g = data[i + 1]!;
      const b = data[i + 2]!;
      const lum = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
      if (lum > 0.96 && a < 200) continue;
      ink += 1;
      top = Math.min(top, y);
      left = Math.min(left, x);
      right = Math.max(right, x);
      bottom = Math.max(bottom, y);
    }
  }

  if (ink < 8 || right <= left || bottom <= top) return null;

  const pad = Math.max(8, Math.floor(Math.min(width, height) * 0.04));
  const cropX = Math.max(0, left - pad);
  const cropY = Math.max(0, top - pad);
  const cropW = Math.min(width - cropX, right - left + 1 + pad * 2);
  const cropH = Math.min(height - cropY, bottom - top + 1 + pad * 2);

  const out = document.createElement("canvas");
  out.width = cropW;
  out.height = cropH;
  const outCtx = out.getContext("2d");
  if (!outCtx) return null;
  outCtx.drawImage(canvas, cropX, cropY, cropW, cropH, 0, 0, cropW, cropH);
  return out.toDataURL("image/png");
}

function loadImage(dataUrl: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("image"));
    img.src = dataUrl;
  });
}