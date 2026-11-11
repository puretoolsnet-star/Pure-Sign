import { decryptPDF, isEncrypted } from "@pdfsmaller/pdf-decrypt";
import { PDFDocument } from "pdf-lib";

export class PdfPasswordRequiredError extends Error {
  constructor() {
    super("password_required");
    this.name = "PdfPasswordRequiredError";
  }
}

export async function unlockPdf(
  file: File,
  password?: string,
): Promise<Uint8Array> {
  const raw = new Uint8Array(await file.arrayBuffer());
  const info = await isEncrypted(raw);

  if (!info.encrypted) {
    const pdfDoc = await PDFDocument.load(raw, { ignoreEncryption: true });
    return pdfDoc.save();
  }

  if (!password?.trim()) {
    throw new PdfPasswordRequiredError();
  }

  const decrypted = await decryptPDF(raw, password.trim());
  const pdfDoc = await PDFDocument.load(decrypted, { ignoreEncryption: true });
  return pdfDoc.save();
}
