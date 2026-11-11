import type { ToolId } from "@/i18n/config";
import type { EcosystemProjectId } from "@/lib/ecosystem";

export type Dictionary = {
  brand: {
    name: string;
    tagline: string;
  };
  nav: {
    selectLanguage: string;
    menuAria: string;
    menuClose: string;
  };
  ecosystem: {
    menuLabel: string;
    menuShort: string;
    menuAria: string;
    menuHint: string;
    activeHere: string;
    comingSoon: string;
    close: string;
    items: Record<EcosystemProjectId, { name: string; tagline: string }>;
  };
  security: {
    badge: string;
    badgeShort: string;
    pointLocal: string;
    pointNoUpload: string;
    pointPrivate: string;
    toolNote: string;
  };
  home: {
    heroTitle: string;
    heroSubtitle: string;
    toolsAria: string;
    toolsHeading: string;
    toolsCatalogHint: string;
    expandCategory: string;
    collapseCategory: string;
    toolCategories: {
      signaturesStamps: { title: string; subtitle: string };
      formsLayout: { title: string; subtitle: string };
      analysisSecurity: { title: string; subtitle: string };
      proBatch: { title: string; subtitle: string };
    };
    openTool: string;
  };
  footer: {
    privacyBadge: string;
    tagline: string;
    rights: string;
  };
  common: {
    backToTools: string;
    dropzoneTitle: string;
    dropzoneHint: string;
    downloadPdf: string;
    dropzoneMultipleTitle: string;
    processing: string;
    clear: string;
    apply: string;
    pageLabel: (index: number, total: number) => string;
    prevPage: string;
    nextPage: string;
    copy: string;
    copied: string;
    remove: string;
  };
  tools: Record<
    ToolId,
    {
      title: string;
      description: string;
      hint: string;
      action: string;
      errors: {
        invalid: string;
        failed: string;
      };
    }
  >;
  sign: {
    draw: string;
    type: string;
    image: string;
    clearPad: string;
    typePlaceholder: string;
    uploadPng: string;
    placeHint: string;
    size: string;
    emptyPad: string;
    canvasAria: string;
  };
  stamp: {
    presetsLabel: string;
    customLabel: string;
    customPlaceholder: string;
    placeHint: string;
    size: string;
    color: string;
    paid: string;
    certified: string;
    confidential: string;
    approved: string;
    received: string;
    copyStamp: string;
  };
  fillForm: {
    fieldsTitle: string;
    noFields: string;
    freeTextHint: string;
    textPlaceholder: string;
    flatten: string;
    fieldFallback: (index: number) => string;
  };
  pageNumbers: {
    position: string;
    format: string;
    fontSize: string;
    margin: string;
    headerLeft: string;
    headerCenter: string;
    headerRight: string;
    footerLeft: string;
    footerCenter: string;
    footerRight: string;
    formatSimple: string;
    formatOf: string;
    formatPageOf: string;
  };
  redact: {
    drawHint: string;
    boxes: (count: number) => string;
    undo: string;
  };
  extract: {
    resultTitle: string;
    empty: string;
    downloadTxt: string;
    pagesExtracted: (count: number) => string;
  };
  dateStamp: {
    formatLabel: string;
    formatDate: string;
    formatTime: string;
    formatDateTime: string;
    previewLabel: string;
    placeHint: string;
    size: string;
    color: string;
  };
  protect: {
    passwordLabel: string;
    passwordConfirm: string;
    mismatch: string;
    minLength: string;
  };
  unlock: {
    passwordLabel: string;
    passwordHint: string;
    wrongPassword: string;
  };
  batchSign: {
    filesSelected: (count: number) => string;
    clearList: string;
    positionNote: string;
    zipAction: string;
  };
  botProtection: {
    rateLimited: string;
    unavailable: string;
  };
  rewardedAd: {
    sponsored: string;
    title: string;
    message: string;
    watch: string;
    watching: string;
    download: string;
    waitHint: string;
    progress: (seconds: number) => string;
    thanks: string;
    close: string;
    slotLabel: string;
  };
};
