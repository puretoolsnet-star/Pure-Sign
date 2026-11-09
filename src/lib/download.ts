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
