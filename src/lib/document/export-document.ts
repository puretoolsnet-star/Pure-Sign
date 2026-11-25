import { applyOverlays, type PdfOverlay } from "@/lib/pdf/overlays";
import { documentKind } from "@/lib/document/pick-document";

export async function exportWithOverlays(
  file: File,
  overlays: PdfOverlay[],
): Promise<{ bytes: Uint8Array; mime: string; extension: string }> {
  if (documentKind(file) === "pdf") {
    const bytes = await applyOverlays(file, overlays);
    return { bytes, mime: "application/pdf", extension: "pdf" };
  }

  const imageUrl = await readFileDataUrl(file);
  const composite = await compositeOverlaysOnImage(imageUrl, overlays, 0);
  const bytes = dataUrlToBytes(composite);
  const ext = file.name.match(/\.(\w+)$/i)?.[1]?.toLowerCase() ?? "png";
  const mime =
    ext === "jpg" || ext === "jpeg"
      ? "image/jpeg"
      : ext === "webp"
        ? "image/webp"
        : "image/png";
  return { bytes, mime, extension: ext === "jpg" ? "jpg" : ext };
}

function readFileDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("read"));
    reader.readAsDataURL(file);
  });
}

function dataUrlToBytes(dataUrl: string) {
  const base64 = dataUrl.split(",")[1] ?? "";
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i)!;
  return bytes;
}

function loadImage(url: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("image"));
    image.src = url;
  });
}

async function compositeOverlaysOnImage(
  baseUrl: string,
  overlays: PdfOverlay[],
  pageIndex: number,
) {
  const base = await loadImage(baseUrl);
  const canvas = document.createElement("canvas");
  canvas.width = base.width;
  canvas.height = base.height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas is not available.");
  ctx.drawImage(base, 0, 0);

  for (const overlay of overlays.filter((item) => item.pageIndex === pageIndex)) {
    const w = overlay.width * canvas.width;
    const h = overlay.height * canvas.height;
    const x = overlay.x * canvas.width;
    const y = overlay.y * canvas.height;
    if (overlay.kind === "image" && overlay.dataUrl) {
      const stamp = await loadImage(overlay.dataUrl);
      ctx.drawImage(stamp, x, y, w, h);
    } else if (overlay.kind === "rect") {
      ctx.fillStyle = overlay.color ?? "#000000";
      ctx.fillRect(x, y, w, h);
    } else if (overlay.kind === "text" && overlay.text) {
      ctx.fillStyle = overlay.color ?? "#0f172a";
      ctx.font = `600 ${Math.max(12, h * 0.72)}px system-ui,sans-serif`;
      ctx.fillText(overlay.text, x + 2, y + h * 0.78);
    }
  }

  return canvas.toDataURL("image/png");
}