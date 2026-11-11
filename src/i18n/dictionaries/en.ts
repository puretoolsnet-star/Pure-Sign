import type { Dictionary } from "@/i18n/types";

export const en: Dictionary = {
  brand: {
    name: "PureSign",
    tagline: "Sign and fill PDFs locally.",
  },
  nav: {
    selectLanguage: "Language",
    menuAria: "Site menu",
    menuClose: "Close menu",
  },
  ecosystem: {
    menuLabel: "Our ecosystem",
    menuShort: "Ecosystem",
    menuAria: "Projects in our ecosystem",
    menuHint:
      "Related utilities with local in-browser processing — one team, one privacy philosophy.",
    activeHere: "Active",
    comingSoon: "Coming soon",
    close: "Close ecosystem menu",
    items: {
      purepdf: {
        name: "PurePDF",
        tagline: "Tools for working with PDF.",
      },
      pureQr: {
        name: "PureQR",
        tagline: "QR code generator and manager.",
      },
      pureSign: {
        name: "PureSign",
        tagline: "Sign and fill PDFs locally.",
      },
      pureTable: {
        name: "PureTable",
        tagline: "Business utility for parsing invoices into Excel/CSV.",
      },
    },
  },
  security: {
    badge: "Client-Side • 100% local",
    badgeShort: "Local processing",
    pointLocal: "Processed only in your browser",
    pointNoUpload: "No server uploads",
    pointPrivate: "Privacy by default",
    toolNote: "Client-Side: files stay on your device.",
  },
  home: {
    heroTitle: "Every document-signing tool in one dark workspace.",
    heroSubtitle:
      "Sign, stamp, number, and fill PDF documents privately in your browser.",
    toolsAria: "PureSign tool catalog",
    toolsHeading: "Tool catalog",
    toolsCatalogHint:
      "Collapse and expand categories with the arrow — everything runs locally in your browser.",
    expandCategory: "Expand category",
    collapseCategory: "Collapse category",
    toolCategories: {
      signaturesStamps: {
        title: "Signatures & stamps",
        subtitle: "Sign, seal, and date-time stamps on PDFs.",
      },
      formsLayout: {
        title: "Forms & layout",
        subtitle: "Fill forms, numbering, headers, and redaction.",
      },
      analysisSecurity: {
        title: "Analysis & security",
        subtitle: "Text extraction, encryption, and unlocking.",
      },
      proBatch: {
        title: "Pro / batch",
        subtitle: "Batch signing with ZIP export.",
      },
    },
    openTool: "Open →",
  },
  footer: {
    privacyBadge: "100% in-browser",
    tagline: "No document ever leaves your device.",
    rights: "© PureSign. Private document signing.",
  },
  common: {
    backToTools: "Back to tools",
    dropzoneTitle: "Drop a PDF here or click to browse",
    dropzoneHint: "The file is processed only on this device.",
    downloadPdf: "Download PDF",
    dropzoneMultipleTitle: "Drop one or more PDFs here",
    processing: "Processing…",
    clear: "Clear",
    apply: "Apply",
    pageLabel: (index, total) => `Page ${index} of ${total}`,
    prevPage: "Previous",
    nextPage: "Next",
    copy: "Copy",
    copied: "Copied",
    remove: "Remove",
  },
  tools: {
    sign: {
      title: "Place a signature",
      description: "Drawn, typed, or PNG image signature.",
      hint: "Draw, type, or upload a PNG and place it on the page.",
      action: "Download signed PDF",
      errors: {
        invalid: "Choose a PDF file.",
        failed: "Could not apply the signature.",
      },
    },
    stamp: {
      title: "Add a stamp / seal",
      description:
        "Transparent stamps such as “Paid” or “Certified true copy”.",
      hint: "Pick a preset stamp or type your own text.",
      action: "Download stamped PDF",
      errors: {
        invalid: "Choose a PDF file.",
        failed: "Could not apply the stamp.",
      },
    },
    "date-stamp": {
      title: "Date / time stamp",
      description: "Place a live date, time, or combined stamp on the PDF.",
      hint: "Pick a format and click the page to place the stamp.",
      action: "Download stamped PDF",
      errors: {
        invalid: "Choose a PDF file.",
        failed: "Could not apply the date stamp.",
      },
    },
    "fill-form": {
      title: "Fill PDF forms",
      description: "Type into the document’s interactive fields.",
      hint: "Form fields are read locally. If none exist, add free text.",
      action: "Download filled PDF",
      errors: {
        invalid: "Choose a PDF file.",
        failed: "Could not fill the form.",
      },
    },
    "page-numbers": {
      title: "Page numbering",
      description: "Add page numbers or running headers and footers.",
      hint: "Choose position, format, and margin.",
      action: "Download numbered PDF",
      errors: {
        invalid: "Choose a PDF file.",
        failed: "Could not add page numbers.",
      },
    },
    redact: {
      title: "Redaction / blackout",
      description: "Hide confidential data behind a black box.",
      hint: "Drag with a finger or mouse to black out a region.",
      action: "Download redacted PDF",
      errors: {
        invalid: "Choose a PDF file.",
        failed: "Could not apply redaction.",
      },
    },
    "extract-text": {
      title: "Extract text",
      description: "Quickly recognise and copy text from the document.",
      hint: "Text is read from the PDF in your browser.",
      action: "Copy text",
      errors: {
        invalid: "Choose a PDF file.",
        failed: "Could not extract text.",
      },
    },
    "protect-pdf": {
      title: "Password-protect PDF",
      description: "Encrypt the document with an opening password.",
      hint: "The password is applied locally — we never store it.",
      action: "Download encrypted PDF",
      errors: {
        invalid: "Choose a PDF file.",
        failed: "Could not encrypt the PDF.",
      },
    },
    "unlock-pdf": {
      title: "Unlock PDF",
      description: "Remove a password or editing and printing restrictions.",
      hint: "Enter the current password if the file is protected.",
      action: "Download unlocked PDF",
      errors: {
        invalid: "Choose a PDF file.",
        failed: "Could not unlock the PDF. Check the password.",
      },
    },
    "batch-sign": {
      title: "Batch signing",
      description: "One signature across multiple PDFs, exported as ZIP.",
      hint: "Add files, place the signature on the preview, then export the pack.",
      action: "Apply to all",
      errors: {
        invalid: "Add at least one valid PDF.",
        failed: "Could not sign the batch.",
      },
    },
  },
  sign: {
    draw: "Draw",
    type: "Type",
    image: "PNG",
    clearPad: "Clear canvas",
    typePlaceholder: "Your name",
    uploadPng: "Upload a transparent PNG",
    placeHint: "Click the page to place the signature.",
    size: "Size",
    emptyPad: "Draw, type, or upload a signature first.",
    canvasAria: "Signature drawing canvas",
  },
  stamp: {
    presetsLabel: "Preset stamps",
    customLabel: "Custom text",
    customPlaceholder: "Stamp text",
    placeHint: "Click the page to place the stamp.",
    size: "Size",
    color: "Color",
    paid: "PAID",
    certified: "CERTIFIED TRUE COPY",
    confidential: "CONFIDENTIAL",
    approved: "APPROVED",
    received: "RECEIVED",
    copyStamp: "COPY",
  },
  fillForm: {
    fieldsTitle: "Form fields",
    noFields:
      "No interactive fields found. Click the page to add text.",
    freeTextHint: "Click the document to insert free text.",
    textPlaceholder: "Text on the page",
    flatten: "Flatten fields",
    fieldFallback: (index) => `Field ${index}`,
  },
  pageNumbers: {
    position: "Position",
    format: "Format",
    fontSize: "Font size",
    margin: "Margin",
    headerLeft: "Header left",
    headerCenter: "Header center",
    headerRight: "Header right",
    footerLeft: "Footer left",
    footerCenter: "Footer center",
    footerRight: "Footer right",
    formatSimple: "1",
    formatOf: "1 / N",
    formatPageOf: "Page 1 of N",
  },
  redact: {
    drawHint: "Press and drag to black out a region.",
    boxes: (count) => `${count} redaction box(es)`,
    undo: "Undo last",
  },
  extract: {
    resultTitle: "Extracted text",
    empty: "No text layer was found in this document.",
    downloadTxt: "Download .txt",
    pagesExtracted: (count) => `Pages processed: ${count}`,
  },
  dateStamp: {
    formatLabel: "Stamp format",
    formatDate: "Date",
    formatTime: "Time",
    formatDateTime: "Date & time",
    previewLabel: "Preview",
    placeHint: "Click the page to place the date or time stamp.",
    size: "Size",
    color: "Color",
  },
  protect: {
    passwordLabel: "PDF open password",
    passwordConfirm: "Confirm password",
    mismatch: "Passwords do not match.",
    minLength: "Use at least 4 characters.",
  },
  unlock: {
    passwordLabel: "Current password (if any)",
    passwordHint: "Leave empty if the PDF has no password",
    wrongPassword: "Wrong password or corrupted file.",
  },
  batchSign: {
    filesSelected: (count) => `Files selected: ${count}`,
    clearList: "Clear list",
    positionNote:
      "Signature placement on the preview applies to page 1 of every PDF in the batch.",
    zipAction: "Download ZIP of signed PDFs",
  },
  botProtection: {
    rateLimited: "Please wait a few seconds before downloading another file.",
    unavailable:
      "Background browser verification did not complete. Refresh the page and try again.",
  },
  rewardedAd: {
    sponsored: "Support the project",
    title: "Support the project with a short ad",
    message:
      "A short sponsor view is the only condition that keeps PureSign free, fully private, and without sign-ups or subscriptions.",
    watch: "Watch sponsor video to download",
    watching: "Sponsor view in progress…",
    download: "Download file",
    waitHint:
      "Tap the button below to start the Adsterra sponsor block. There is no way to continue without watching.",
    progress: (seconds) => `${seconds}s`,
    thanks: "Thank you for the support. Your file will download now.",
    close: "Close",
    slotLabel: "Adsterra sponsor block",
  },
};
