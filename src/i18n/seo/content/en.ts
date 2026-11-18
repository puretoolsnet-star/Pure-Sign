import type { SeoPageContentCatalog } from "@/i18n/seo/content-types";

export const en: SeoPageContentCatalog = {
  home: {
    heading: "Sign PDF files online without sending them to a server",
    intro:
      "PureSign is a free online PDF signer and e-signature workspace that runs entirely in your browser. Draw a signature, upload a PNG, stamp a page, fill a form, or encrypt a file locally — with no account and no document upload.",
    benefitsHeading: "Why sign locally in the browser",
    benefits: [
      {
        title: "Your file never leaves the device",
        text: "Signing, stamps, forms, and encryption run in the browser. PureSign does not receive, store, or transmit your PDFs.",
      },
      {
        title: "Free e-signature, no watermark",
        text: "Draw a handwritten mark, type a name, or upload a digital signature image and place it on any page — free, with no signup.",
      },
      {
        title: "A full private PDF toolkit",
        text: "Stamps, date-time marks, form fill, page numbers, redaction, text extraction, password protection, and batch signing.",
      },
    ],
    sections: [
      {
        heading: "Signatures and stamps",
        text: "Sign a PDF, add a seal such as Paid or Certified true copy, or place a live date and time stamp — all visually, on the page preview.",
      },
      {
        heading: "Forms and layout",
        text: "Fill interactive AcroForm fields, number pages, add headers or footers, and black out confidential text before you share a file.",
      },
      {
        heading: "Analysis and security",
        text: "Extract selectable text, encrypt a PDF with an opening password, or remove a password you already know — still fully local.",
      },
      {
        heading: "Batch signing",
        text: "Apply one signature to several PDFs and download a ZIP pack. Bulk signing stays in the browser, just like the single-file signer.",
      },
    ],
    faqHeading: "Frequently asked questions",
    faq: [
      {
        question: "Is PureSign a free online PDF signer?",
        answer:
          "Yes. Every tool is free to use in the browser. There is no registration, no subscription, and no watermark on the signed PDF.",
      },
      {
        question: "Do you upload my documents to a server?",
        answer:
          "No. PDF signing and the other tools run locally on your device. Files are not uploaded to a PureSign server for processing.",
      },
      {
        question: "Which signature tools are included?",
        answer:
          "You can draw a signature, type a name, or upload a PNG, then place it on a PDF. Related tools cover stamps, date marks, and batch signing several files at once.",
      },
      {
        question: "Which languages does the site support?",
        answer:
          "PureSign is available in English, Ukrainian, German, French, Spanish, and Polish. Each tool has a matching localized page.",
      },
    ],
  },
  sign: {
    heading: "Free online PDF signer — draw or upload an e-signature",
    intro:
      "Sign a PDF in your browser without creating an account. Draw a handwritten signature, type your name, or upload a digital PNG, place it on the page, and download the signed file. The document stays on your device.",
    benefitsHeading: "Ways to add an e-signature",
    benefits: [
      {
        title: "Draw a signature",
        text: "Write with a mouse, trackpad, or touch screen on the signature pad, then click the PDF preview to place the mark.",
      },
      {
        title: "Upload a digital signature",
        text: "Import a PNG of an existing signature or seal — transparent backgrounds work best — and position it like wet ink.",
      },
      {
        title: "No server, no account",
        text: "Placement, resizing, and export run locally. Closing the tab discards the file unless you downloaded the result.",
      },
    ],
    sections: [
      {
        heading: "Draw a signature on a PDF",
        text: "Open the draw tab, sign on the pad, and tap the page preview. You can add more than one mark and move each overlay before download.",
      },
      {
        heading: "Upload a digital signature image",
        text: "Use the image tab to load a PNG. A scanned wet-ink signature or a company seal can be placed at the usual signature line.",
      },
      {
        heading: "Sign the PDF and download",
        text: "Resize the signature, switch pages if needed, then save a new PDF. The original file is not overwritten until you choose to keep the download.",
      },
    ],
    faqHeading: "PDF signature FAQ",
    faq: [
      {
        question: "How do I sign a PDF online for free?",
        answer:
          "Drop a PDF into the signer, draw or upload a signature, click the page to place it, and download. No account is required and the file is processed in the browser.",
      },
      {
        question: "Can I upload an existing digital signature?",
        answer:
          "Yes. Choose the image option and pick a PNG. The image is read locally; it is not uploaded to our servers.",
      },
      {
        question: "Is this a qualified electronic signature (QES)?",
        answer:
          "No. PureSign places a visual / simple electronic signature (SES) on the PDF. It does not issue a qualified certificate under eIDAS. Use a qualified trust service when the law requires QES.",
      },
      {
        question: "Does my PDF leave the computer?",
        answer:
          "No. Drawing, uploading a PNG, placing the signature, and exporting the file all happen locally in the browser.",
      },
    ],
  },
  stamp: {
    heading: "Add a PDF stamp or seal without uploading the file",
    intro:
      "Place transparent stamps such as Paid, Certified true copy, Confidential, or your own wording on a PDF. The seal sits on the page preview and is flattened locally in your browser.",
    benefitsHeading: "Stamps that stay private",
    benefits: [
      {
        title: "Ready-made seals",
        text: "Apply common office stamps in one click, then move and resize them on the page.",
      },
      {
        title: "Custom stamp text",
        text: "Type your own label — a department name, a copy mark, or an approval line — with a transparent background.",
      },
      {
        title: "Local PDF processing",
        text: "The document never goes to a server. You download a new stamped PDF from this device.",
      },
    ],
    sections: [
      {
        heading: "Office stamps on a PDF",
        text: "Use Paid, Approved, Received, or Confidential when you need a clear visual status on a scanned or digital document.",
      },
      {
        heading: "Certified copy and custom seals",
        text: "Place a Certified true copy stamp or write a custom seal, then position it over the letterhead or signature block.",
      },
    ],
    faqHeading: "PDF stamp FAQ",
    faq: [
      {
        question: "Can I stamp a PDF for free online?",
        answer:
          "Yes. Choose a preset or enter custom text, click the page to place the stamp, and download. There is no signup.",
      },
      {
        question: "Does the stamp have a transparent background?",
        answer:
          "Yes. Preset and custom stamps are drawn with a transparent background so the underlying PDF remains readable.",
      },
      {
        question: "Is the file uploaded to stamp it?",
        answer:
          "No. Stamping runs in the browser. The PDF stays on your device until you download the result.",
      },
      {
        question: "Can I use my own wording?",
        answer:
          "Yes. Switch to custom text, type the seal you need, and place it like any other stamp.",
      },
    ],
  },
  "date-stamp": {
    heading: "Add a date or time stamp to a PDF in the browser",
    intro:
      "Place a live date, time, or date-and-time mark on any PDF page. The stamp is generated locally from your device clock and never requires a server.",
    benefitsHeading: "Date stamps without upload",
    benefits: [
      {
        title: "Date, time, or both",
        text: "Pick the format you need and click the preview to drop a readable timestamp on the page.",
      },
      {
        title: "Sized and colored on the page",
        text: "Adjust size and color so the mark fits a form field, a footer, or a received-on line.",
      },
      {
        title: "Private by default",
        text: "The PDF is not sent anywhere. You export a new file from the same browser tab.",
      },
    ],
    sections: [
      {
        heading: "Timestamp a received document",
        text: "Drop a live date or datetime on incoming mail, invoices, or signed copies when you need a visible received mark.",
      },
      {
        heading: "Date a PDF without leaving the device",
        text: "Because the stamp is built in the browser, confidential files can be dated without an online conversion service.",
      },
    ],
    faqHeading: "PDF date stamp FAQ",
    faq: [
      {
        question: "How do I add today’s date to a PDF?",
        answer:
          "Open the date stamp tool, choose date, time, or datetime, click the page, and download. The value comes from your device clock.",
      },
      {
        question: "Can I stamp time as well as date?",
        answer:
          "Yes. Switch the format to time only or to a combined date and time stamp before placing it.",
      },
      {
        question: "Is the timestamp uploaded with my file?",
        answer:
          "No. The mark is drawn locally. PureSign does not receive the PDF.",
      },
      {
        question: "Can I move the stamp after placing it?",
        answer:
          "Yes. Overlays can be repositioned and resized on the preview before you export the PDF.",
      },
    ],
  },
  "fill-form": {
    heading: "Fill PDF forms online without sending the file away",
    intro:
      "Complete interactive AcroForm fields in the browser, or add free-text overlays when a PDF has no fields. Filling stays local — the form is not uploaded to a server.",
    benefitsHeading: "Form fill that stays on your device",
    benefits: [
      {
        title: "Interactive PDF fields",
        text: "Detected AcroForm fields can be filled in place, then flattened into the downloaded file.",
      },
      {
        title: "Free-text when there are no fields",
        text: "Scanned or flat PDFs still work: type a line and place it where a blank should be completed.",
      },
      {
        title: "No account required",
        text: "Open the form, complete it, and download. Nothing is stored after you close the tab.",
      },
    ],
    sections: [
      {
        heading: "Fill an AcroForm in the browser",
        text: "If the PDF contains form fields, they are listed so you can complete names, dates, and check-style answers locally.",
      },
      {
        heading: "Add text on a flat PDF",
        text: "When a document is only a scan, place typed overlays on the page instead of printing and scanning again.",
      },
    ],
    faqHeading: "PDF form FAQ",
    faq: [
      {
        question: "Can I fill a PDF form for free?",
        answer:
          "Yes. Drop the file into the form tool, complete the fields or add text, and download. There is no registration.",
      },
      {
        question: "What if my PDF has no form fields?",
        answer:
          "Add free-text overlays and place them on the page. This covers scans and flattened documents.",
      },
      {
        question: "Do you store the answers I type?",
        answer:
          "No. Field values stay in the browser. They are written into the PDF only when you download it.",
      },
      {
        question: "Is the form uploaded to fill it?",
        answer:
          "No. Reading fields and writing the completed PDF happen on your device.",
      },
    ],
  },
  "page-numbers": {
    heading: "Add PDF page numbers and headers in the browser",
    intro:
      "Number every page or add a header and footer locally. Choose position and format, then download a new PDF — the original file is not sent to a server.",
    benefitsHeading: "Page numbers without upload",
    benefits: [
      {
        title: "Headers and footers",
        text: "Place numbers at the left, center, or right of the header or footer band.",
      },
      {
        title: "Flexible formats",
        text: "Use a simple number, n of N, or a Page n of N label that matches office documents.",
      },
      {
        title: "Local export",
        text: "Pagination is drawn in the browser. You keep a private copy on this device.",
      },
    ],
    sections: [
      {
        heading: "Number a contract or report",
        text: "Add consistent page numbers before you sign, print, or archive a multi-page PDF.",
      },
      {
        heading: "Headers without a desktop editor",
        text: "Set margin and font size in the browser instead of installing extra PDF software.",
      },
    ],
    faqHeading: "PDF page numbers FAQ",
    faq: [
      {
        question: "How do I add page numbers to a PDF for free?",
        answer:
          "Choose a position and format, apply the numbering, and download. The tool runs locally in your browser.",
      },
      {
        question: "Can I use “Page 1 of 10” style numbering?",
        answer:
          "Yes. Pick a format that includes the total page count, then export the PDF.",
      },
      {
        question: "Are headers uploaded with my document?",
        answer:
          "No. Headers, footers, and page numbers are written locally. The file is not sent to a server.",
      },
      {
        question: "Will numbering overwrite my content?",
        answer:
          "You control position and margin so numbers sit in the header or footer band rather than on the body text.",
      },
    ],
  },
  redact: {
    heading: "Redact a PDF locally — black out text in the browser",
    intro:
      "Hide confidential names, numbers, or paragraphs with black rectangles before you share a file. Redaction runs on your device; the PDF is not uploaded for censorship.",
    benefitsHeading: "Private on-device redaction",
    benefits: [
      {
        title: "Draw blackout boxes",
        text: "Drag on the page preview to cover the area that should not be readable.",
      },
      {
        title: "Undo before export",
        text: "Remove a box if you covered too much, then download only when the page looks right.",
      },
      {
        title: "No third-party processing",
        text: "Sensitive pages never leave the browser, which is the point of local redaction.",
      },
    ],
    sections: [
      {
        heading: "Black out personal data",
        text: "Cover account numbers, addresses, or medical details on a scan before you email the PDF.",
      },
      {
        heading: "Redact without an office suite",
        text: "You do not need Adobe Acrobat or a desktop editor — the boxes are flattened into the download.",
      },
    ],
    faqHeading: "PDF redaction FAQ",
    faq: [
      {
        question: "Can I redact a PDF online for free?",
        answer:
          "Yes. Draw black rectangles on the preview and download. There is no account and no server-side redaction queue.",
      },
      {
        question: "Is the hidden text really removed?",
        answer:
          "The tool paints opaque boxes onto the page and exports a new PDF. For the highest assurance, also avoid sharing the original unredacted file.",
      },
      {
        question: "Do you see the document I redact?",
        answer:
          "No. Boxes are drawn in the browser. PureSign does not receive the PDF.",
      },
      {
        question: "Can I redact several areas on one page?",
        answer:
          "Yes. Add as many boxes as you need, undo the last one if required, then export.",
      },
    ],
  },
  "extract-text": {
    heading: "Extract text from a PDF locally in your browser",
    intro:
      "Copy selectable text out of a PDF without an OCR cloud service. Extraction runs on the device, so the document is not uploaded to recognize its contents.",
    benefitsHeading: "Text extraction without a server",
    benefits: [
      {
        title: "Copy in one step",
        text: "Load the PDF and read the extracted text, then copy it or download a .txt file.",
      },
      {
        title: "No OCR account",
        text: "Embedded PDF text is read locally. Image-only scans without a text layer may yield little or no text.",
      },
      {
        title: "Private documents stay private",
        text: "Contracts and letters are not sent to a recognition API.",
      },
    ],
    sections: [
      {
        heading: "Copy PDF text without upload",
        text: "Use this when you need a quote, an address, or a clause from a digital PDF and do not want a conversion website.",
      },
      {
        heading: "What this tool does not do",
        text: "It does not run cloud OCR. If a scan has no text layer, use a dedicated OCR product — this extractor will not invent text from pixels.",
      },
    ],
    faqHeading: "PDF text extraction FAQ",
    faq: [
      {
        question: "How do I copy text from a PDF for free?",
        answer:
          "Drop the file into the extractor, wait for the local read, then copy the result or download a text file.",
      },
      {
        question: "Does extraction upload my PDF?",
        answer:
          "No. Text is read in the browser from the PDF structure. The file is not sent to a server.",
      },
      {
        question: "Will it work on a photographed page?",
        answer:
          "Only if the PDF already contains a text layer. Photos and scans without OCR usually have nothing to extract.",
      },
      {
        question: "Can I keep a .txt copy?",
        answer:
          "Yes. Download the extracted text as a file after the local read finishes.",
      },
    ],
  },
  "protect-pdf": {
    heading: "Password-protect a PDF in the browser",
    intro:
      "Encrypt a PDF with an opening password without sending the file to a server. The password is applied locally and is not stored by PureSign.",
    benefitsHeading: "Local PDF encryption",
    benefits: [
      {
        title: "Set an opening password",
        text: "Choose a password, confirm it, and download a locked PDF that asks for it before viewing.",
      },
      {
        title: "Nothing stored",
        text: "We do not keep your password or the document. Both exist only in this browser session.",
      },
      {
        title: "Free and account-free",
        text: "Protect a file in one pass — useful before you email a contract or an ID scan.",
      },
    ],
    sections: [
      {
        heading: "Lock a PDF before you send it",
        text: "Encrypt the download, then share the password through a separate channel so the attachment is not readable in transit by default.",
      },
      {
        heading: "Encryption stays on the device",
        text: "The cipher is applied in the browser. There is no upload step that would expose the unprotected original.",
      },
    ],
    faqHeading: "PDF password FAQ",
    faq: [
      {
        question: "Can I encrypt a PDF online for free?",
        answer:
          "Yes. Enter and confirm an opening password, then download the protected file. No account is required.",
      },
      {
        question: "Do you store my password?",
        answer:
          "No. The password is used locally to encrypt the file and is not sent to PureSign.",
      },
      {
        question: "What if I forget the password?",
        answer:
          "We cannot recover it. Keep a copy of the password or of the unprotected original in a safe place.",
      },
      {
        question: "Is the PDF uploaded to lock it?",
        answer:
          "No. Encryption runs in the browser on your device.",
      },
    ],
  },
  "unlock-pdf": {
    heading: "Unlock a PDF locally when you know the password",
    intro:
      "Remove an opening password or printing restrictions in the browser. You must already know the password — this is not a cracking service, and the file is not uploaded.",
    benefitsHeading: "Private PDF unlock",
    benefits: [
      {
        title: "Open a file you own",
        text: "Enter the known password so you can save an unlocked copy for editing or printing.",
      },
      {
        title: "No brute-force, no upload",
        text: "The tool only decrypts with the password you provide, locally. It will not guess passwords.",
      },
      {
        title: "Stay on the device",
        text: "The protected PDF never leaves the browser tab.",
      },
    ],
    sections: [
      {
        heading: "Remove a password you already know",
        text: "Use this when you received a locked PDF and have the password, but need a copy that opens without a prompt.",
      },
      {
        heading: "Not a password-cracking tool",
        text: "If you do not know the password, PureSign cannot unlock the file. That limit is intentional.",
      },
    ],
    faqHeading: "Unlock PDF FAQ",
    faq: [
      {
        question: "Can I remove a PDF password online?",
        answer:
          "Only if you already know the opening password. Enter it locally and download an unlocked copy. We do not crack passwords.",
      },
      {
        question: "Is the locked PDF uploaded?",
        answer:
          "No. Decryption runs in the browser. The file stays on your device.",
      },
      {
        question: "What happens if the password is wrong?",
        answer:
          "Unlock fails and the original protected file is unchanged. Try the correct password; there is no reset email.",
      },
      {
        question: "Can you recover a forgotten password?",
        answer:
          "No. PureSign never sees the file or the password, so there is nothing to recover on our side.",
      },
    ],
  },
  "batch-sign": {
    heading: "Batch sign PDFs online — one signature, many files",
    intro:
      "Apply the same drawn, typed, or uploaded signature to several PDFs and download a ZIP. Bulk signing runs in the browser; the documents are not uploaded to a server.",
    benefitsHeading: "Local bulk e-signature",
    benefits: [
      {
        title: "One mark, many PDFs",
        text: "Prepare a signature once, drop in several files, and export a ZIP of signed copies.",
      },
      {
        title: "Draw or upload",
        text: "The same signature options as the single-file signer: pad, typed name, or PNG.",
      },
      {
        title: "Private batch processing",
        text: "A pack of contracts or HR forms never leaves this device during signing.",
      },
    ],
    sections: [
      {
        heading: "Sign a folder of PDFs",
        text: "Use batch sign when every file needs the same visual signature in a similar place, then download the ZIP pack.",
      },
      {
        heading: "Still fully client-side",
        text: "Multiple files do not change the privacy model: each PDF is signed locally, then packed in the browser.",
      },
    ],
    faqHeading: "Batch PDF signature FAQ",
    faq: [
      {
        question: "Can I sign multiple PDFs at once for free?",
        answer:
          "Yes. Add several files, prepare one signature, place it, and download a ZIP. No account is required.",
      },
      {
        question: "Are the files uploaded for batch signing?",
        answer:
          "No. Each PDF is processed in the browser. PureSign does not receive the documents.",
      },
      {
        question: "Do I get separate signed files?",
        answer:
          "Yes. The download is a ZIP archive containing a signed copy of each PDF you selected.",
      },
      {
        question: "Can I draw and also upload a signature?",
        answer:
          "Yes. Batch sign uses the same draw, type, and image options as the single PDF signer.",
      },
    ],
  },
};
