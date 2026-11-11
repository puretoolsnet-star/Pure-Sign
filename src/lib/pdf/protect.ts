import { encryptPDF } from "@pdfsmaller/pdf-encrypt";
import { PDFDocument } from "pdf-lib";

export async function protectPdfWithPassword(
  file: File,
  password: string,
): Promise<Uint8Array> {
  const raw = new Uint8Array(await file.arrayBuffer());
  const pdfDoc = await PDFDocument.load(raw, { ignoreEncryption: true });
  const normalized = await pdfDoc.save();
  return encryptPDF(normalized, password, {
    ownerPassword: password,
    allowPrinting: true,
    allowCopying: true,
    allowModifying: false,
    allowAnnotating: true,
    allowFillingForms: true,
  });
}
