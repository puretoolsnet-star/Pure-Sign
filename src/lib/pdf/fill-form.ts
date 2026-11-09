import { PDFDocument, PDFCheckBox, PDFDropdown, PDFTextField } from "pdf-lib";

export type FormFieldInfo = {
  name: string;
  type: "text" | "checkbox" | "dropdown" | "other";
  value: string;
  options?: string[];
};

export async function readPdfFormFields(file: File): Promise<FormFieldInfo[]> {
  const pdfDoc = await PDFDocument.load(await file.arrayBuffer(), {
    ignoreEncryption: true,
  });
  const form = pdfDoc.getForm();
  return form.getFields().map((field) => {
    const name = field.getName();
    if (field instanceof PDFTextField) {
      return { name, type: "text", value: field.getText() ?? "" };
    }
    if (field instanceof PDFCheckBox) {
      return { name, type: "checkbox", value: field.isChecked() ? "true" : "false" };
    }
    if (field instanceof PDFDropdown) {
      return {
        name,
        type: "dropdown",
        value: field.getSelected()[0] ?? "",
        options: field.getOptions(),
      };
    }
    return { name, type: "other", value: "" };
  });
}

export async function fillPdfForm(
  file: File,
  values: Record<string, string>,
  flatten: boolean,
): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.load(await file.arrayBuffer(), {
    ignoreEncryption: true,
  });
  const form = pdfDoc.getForm();

  for (const field of form.getFields()) {
    const name = field.getName();
    const next = values[name];
    if (next === undefined) continue;

    try {
      if (field instanceof PDFTextField) {
        field.setText(next);
      } else if (field instanceof PDFCheckBox) {
        if (next === "true") field.check();
        else field.uncheck();
      } else if (field instanceof PDFDropdown && next) {
        field.select(next);
      }
    } catch {
      /* skip incompatible field */
    }
  }

  if (flatten) {
    try {
      form.flatten();
    } catch {
      /* some forms cannot flatten */
    }
  }

  return pdfDoc.save();
}
