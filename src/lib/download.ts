export function downloadBytes(
  data: Uint8Array,
  filename: string,
  mime = "application/pdf",
) {
  const blob = new Blob([data as BlobPart], { type: mime });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

export function downloadText(text: string, filename: string) {
  downloadBytes(new TextEncoder().encode(text), filename, "text/plain;charset=utf-8");
}

export async function downloadZip(
  entries: { name: string; bytes: Uint8Array }[],
  filename: string,
) {
  const JSZip = (await import("jszip")).default;
  const zip = new JSZip();
  for (const entry of entries) {
    zip.file(entry.name, entry.bytes);
  }
  const bytes = await zip.generateAsync({ type: "uint8array" });
  downloadBytes(bytes, filename, "application/zip");
}
