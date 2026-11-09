import type { Dictionary } from "@/i18n/types";

export const de: Dictionary = {
  brand: {
    name: "PureSign",
    tagline: "PDFs lokal unterschreiben und ausfüllen.",
  },
  nav: {
    selectLanguage: "Sprache",
    menuAria: "Seitenmenü",
    menuClose: "Menü schließen",
  },
  ecosystem: {
    menuLabel: "Unser Ökosystem",
    menuShort: "Ökosystem",
    menuAria: "Projekte in unserem Ökosystem",
    menuHint:
      "Verwandte Tools mit lokaler Verarbeitung im Browser — ein Team, eine Datenschutzphilosophie.",
    activeHere: "Aktiv",
    comingSoon: "Demnächst",
    close: "Ökosystemmenü schließen",
    items: {
      purepdf: {
        name: "PurePDF",
        tagline: "Werkzeuge für die Arbeit mit PDF.",
      },
      pureQr: {
        name: "PureQR",
        tagline: "QR-Code-Generator und -Manager.",
      },
      pureSign: {
        name: "PureSign",
        tagline: "PDF lokal unterschreiben und ausfüllen.",
      },
      pureTable: {
        name: "PureTable",
        tagline: "Business-Tool zum Parsen von Rechnungen nach Excel/CSV.",
      },
    },
  },
  security: {
    badge: "Client-Side • 100% lokal",
    badgeShort: "Lokale Verarbeitung",
    pointLocal: "Verarbeitung nur in Ihrem Browser",
    pointNoUpload: "Kein Upload auf Server",
    pointPrivate: "Privatsphäre standardmäßig",
    toolNote: "Client-Side: Dateien bleiben auf Ihrem Gerät.",
  },
  home: {
    heroTitle: "Alle Signatur-Tools in einem dunklen Arbeitsbereich.",
    heroSubtitle:
      "Unterschreiben, stempeln, nummerieren und PDF-Formulare privat im Browser ausfüllen.",
    toolsAria: "PDF-Signaturwerkzeuge",
    toolsHeading: "PDF-Signaturwerkzeuge",
    openTool: "Öffnen →",
  },
  footer: {
    privacyBadge: "100% im Browser",
    tagline: "Kein Dokument verlässt Ihr Gerät.",
    rights: "© PureSign. Private Dokumentsignatur.",
  },
  common: {
    backToTools: "Zurück zu den Tools",
    dropzoneTitle: "PDF hierher ziehen oder klicken zum Auswählen",
    dropzoneHint: "Die Datei wird nur auf diesem Gerät verarbeitet.",
    downloadPdf: "PDF herunterladen",
    processing: "Verarbeitung…",
    clear: "Leeren",
    apply: "Anwenden",
    pageLabel: (index, total) => `Seite ${index} von ${total}`,
    prevPage: "Zurück",
    nextPage: "Weiter",
    copy: "Kopieren",
    copied: "Kopiert",
    remove: "Entfernen",
  },
  tools: {
    sign: {
      title: "Unterschrift platzieren",
      description: "Gezeichnete, getippte oder PNG-Unterschrift.",
      hint: "Zeichnen, tippen oder PNG laden und auf der Seite platzieren.",
      action: "Signiertes PDF herunterladen",
      errors: {
        invalid: "Bitte eine PDF-Datei wählen.",
        failed: "Unterschrift konnte nicht angewendet werden.",
      },
    },
    stamp: {
      title: "Stempel / Siegel hinzufügen",
      description:
        "Transparente Stempel wie „Bezahlt“ oder „Kopie der Urschrift“.",
      hint: "Vorgefertigten Stempel wählen oder eigenen Text eingeben.",
      action: "Gestempeltes PDF herunterladen",
      errors: {
        invalid: "Bitte eine PDF-Datei wählen.",
        failed: "Stempel konnte nicht angewendet werden.",
      },
    },
    "fill-form": {
      title: "PDF-Formulare ausfüllen",
      description: "Interaktive Felder des Dokuments ausfüllen.",
      hint: "Felder werden lokal gelesen. Falls keine vorhanden sind, Text frei setzen.",
      action: "Ausgefülltes PDF herunterladen",
      errors: {
        invalid: "Bitte eine PDF-Datei wählen.",
        failed: "Formular konnte nicht ausgefüllt werden.",
      },
    },
    "page-numbers": {
      title: "Seitennummerierung",
      description: "Seitenzahlen oder Kopf-/Fußzeilen hinzufügen.",
      hint: "Position, Format und Abstand wählen.",
      action: "Nummeriertes PDF herunterladen",
      errors: {
        invalid: "Bitte eine PDF-Datei wählen.",
        failed: "Seitenzahlen konnten nicht hinzugefügt werden.",
      },
    },
    redact: {
      title: "Schwärzen / Zensur",
      description: "Vertrauliche Daten hinter einem schwarzen Kasten verbergen.",
      hint: "Mit Finger oder Maus ziehen, um einen Bereich zu schwärzen.",
      action: "Geschwärztes PDF herunterladen",
      errors: {
        invalid: "Bitte eine PDF-Datei wählen.",
        failed: "Schwärzung konnte nicht angewendet werden.",
      },
    },
    "extract-text": {
      title: "Text extrahieren",
      description: "Text schnell erkennen und aus dem Dokument kopieren.",
      hint: "Der Text wird im Browser aus der PDF gelesen.",
      action: "Text kopieren",
      errors: {
        invalid: "Bitte eine PDF-Datei wählen.",
        failed: "Text konnte nicht extrahiert werden.",
      },
    },
  },
  sign: {
    draw: "Zeichnen",
    type: "Text",
    image: "PNG",
    clearPad: "Leinwand leeren",
    typePlaceholder: "Ihr Name",
    uploadPng: "Transparentes PNG hochladen",
    placeHint: "Klicken Sie auf die Seite, um die Unterschrift zu platzieren.",
    size: "Größe",
    emptyPad: "Bitte zuerst zeichnen, tippen oder eine Unterschrift laden.",
    canvasAria: "Zeichenfläche für die Unterschrift",
  },
  stamp: {
    presetsLabel: "Fertige Stempel",
    customLabel: "Eigener Text",
    customPlaceholder: "Stempeltext",
    placeHint: "Klicken Sie auf die Seite, um den Stempel zu setzen.",
    size: "Größe",
    color: "Farbe",
    paid: "BEZAHLT",
    certified: "KOPIE DER URSCHRIFT",
    confidential: "VERTRAULICH",
    approved: "GENEHMIGT",
    received: "EMPFANGEN",
    copyStamp: "KOPIE",
  },
  fillForm: {
    fieldsTitle: "Formularfelder",
    noFields:
      "Keine interaktiven Felder gefunden. Klicken Sie auf die Seite, um Text hinzuzufügen.",
    freeTextHint: "Klicken Sie ins Dokument, um freien Text einzufügen.",
    textPlaceholder: "Text auf der Seite",
    flatten: "Felder festschreiben (flatten)",
    fieldFallback: (index) => `Feld ${index}`,
  },
  pageNumbers: {
    position: "Position",
    format: "Format",
    fontSize: "Schriftgröße",
    margin: "Abstand",
    headerLeft: "Kopf links",
    headerCenter: "Kopf mittig",
    headerRight: "Kopf rechts",
    footerLeft: "Fuß links",
    footerCenter: "Fuß mittig",
    footerRight: "Fuß rechts",
    formatSimple: "1",
    formatOf: "1 / N",
    formatPageOf: "Seite 1 von N",
  },
  redact: {
    drawHint: "Ziehen Sie, um einen Bereich schwarz zu überdecken.",
    boxes: (count) => `${count} Schwärzungsbereich(e)`,
    undo: "Letztes rückgängig",
  },
  extract: {
    resultTitle: "Extrahierter Text",
    empty: "In diesem Dokument wurde keine Textschicht gefunden.",
    downloadTxt: ".txt herunterladen",
    pagesExtracted: (count) => `Verarbeitete Seiten: ${count}`,
  },
  botProtection: {
    rateLimited:
      "Bitte warten Sie einige Sekunden vor dem nächsten Dateidownload.",
    unavailable:
      "Die Hintergrundprüfung des Browsers ist fehlgeschlagen. Seite neu laden und erneut versuchen.",
  },
  rewardedAd: {
    sponsored: "Projekt unterstützen",
    title: "Fertiges Dokument herunterladen",
    message:
      "Ein kurzer Sponsor-Block ist die einzige Bedingung, damit PureSign kostenlos, vollständig privat und ohne Registrierung oder Abo bleibt.",
    watch: "Sponsor-Video ansehen, um herunterzuladen",
    watching: "Sponsor-Ansicht läuft…",
    download: "Datei herunterladen",
    waitHint:
      "Tippen Sie unten, um den Adsterra-Sponsorblock zu starten. Ein Fortfahren ohne Ansehen ist nicht möglich.",
    progress: (seconds) => `${seconds} s`,
    thanks: "Danke für die Unterstützung. Die Datei wird jetzt heruntergeladen.",
    close: "Schließen",
    slotLabel: "Adsterra-Sponsorblock",
  },
};
