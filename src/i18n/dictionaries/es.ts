import type { Dictionary } from "@/i18n/types";

export const es: Dictionary = {
  brand: {
    name: "PureSign",
    tagline: "Firma y rellena PDF en local.",
  },
  nav: {
    selectLanguage: "Idioma",
    menuAria: "Menú del sitio",
    menuClose: "Cerrar menú",
  },
  ecosystem: {
    menuLabel: "Nuestro ecosistema",
    menuShort: "Ecosistema",
    menuAria: "Proyectos de nuestro ecosistema",
    menuHint:
      "Utilidades relacionadas con procesamiento local en el navegador — un equipo, una filosofía de privacidad.",
    activeHere: "Activo",
    comingSoon: "Próximamente",
    close: "Cerrar menú del ecosistema",
    items: {
      purepdf: {
        name: "PurePDF",
        tagline: "Herramientas para trabajar con PDF.",
      },
      pureQr: {
        name: "PureQR",
        tagline: "Generador y gestor de códigos QR.",
      },
      pureSign: {
        name: "PureSign",
        tagline: "Firma y relleno de PDF en local.",
      },
      pureTable: {
        name: "PureTable",
        tagline: "Utilidad empresarial para parsear facturas a Excel/CSV.",
      },
    },
  },
  security: {
    badge: "Client-Side • 100% local",
    badgeShort: "Procesamiento local",
    pointLocal: "Procesado solo en tu navegador",
    pointNoUpload: "Sin subidas al servidor",
    pointPrivate: "Privacidad por defecto",
    toolNote: "Client-Side: los archivos permanecen en tu dispositivo.",
  },
  home: {
    heroTitle: "Todas las herramientas de firma en un espacio de trabajo oscuro.",
    heroSubtitle:
      "Firma, sella, numera y rellena documentos PDF en privado en tu navegador.",
    toolsAria: "Herramientas de firma PDF",
    toolsHeading: "Herramientas de firma PDF",
    openTool: "Abrir →",
  },
  footer: {
    privacyBadge: "100% en el navegador",
    tagline: "Ningún documento sale de tu dispositivo.",
    rights: "© PureSign. Firma privada de documentos.",
  },
  common: {
    backToTools: "Volver a las herramientas",
    dropzoneTitle: "Suelta un PDF aquí o haz clic para elegir",
    dropzoneHint: "El archivo se procesa solo en este dispositivo.",
    downloadPdf: "Descargar PDF",
    processing: "Procesando…",
    clear: "Borrar",
    apply: "Aplicar",
    pageLabel: (index, total) => `Página ${index} de ${total}`,
    prevPage: "Anterior",
    nextPage: "Siguiente",
    copy: "Copiar",
    copied: "Copiado",
    remove: "Eliminar",
  },
  tools: {
    sign: {
      title: "Colocar una firma",
      description: "Firma dibujada, escrita o imagen PNG.",
      hint: "Dibuja, escribe o sube un PNG y colócalo en la página.",
      action: "Descargar PDF firmado",
      errors: {
        invalid: "Elige un archivo PDF.",
        failed: "No se pudo aplicar la firma.",
      },
    },
    stamp: {
      title: "Añadir sello / tampón",
      description:
        "Sellos transparentes como «Pagado» o «Conforme al original».",
      hint: "Elige un sello predefinido o escribe el tuyo.",
      action: "Descargar PDF sellado",
      errors: {
        invalid: "Elige un archivo PDF.",
        failed: "No se pudo aplicar el sello.",
      },
    },
    "fill-form": {
      title: "Rellenar formularios PDF",
      description: "Escribe en los campos interactivos del documento.",
      hint: "Los campos se leen en local. Si no hay, añade texto libre.",
      action: "Descargar PDF rellenado",
      errors: {
        invalid: "Elige un archivo PDF.",
        failed: "No se pudo rellenar el formulario.",
      },
    },
    "page-numbers": {
      title: "Numeración de páginas",
      description: "Añadir números de página o encabezados y pies.",
      hint: "Elige posición, formato y margen.",
      action: "Descargar PDF numerado",
      errors: {
        invalid: "Elige un archivo PDF.",
        failed: "No se pudieron añadir los números de página.",
      },
    },
    redact: {
      title: "Censura / tachado",
      description: "Ocultar datos confidenciales con un recuadro negro.",
      hint: "Arrastra con el dedo o el ratón para tapar una zona.",
      action: "Descargar PDF censurado",
      errors: {
        invalid: "Elige un archivo PDF.",
        failed: "No se pudo aplicar la censura.",
      },
    },
    "extract-text": {
      title: "Extraer texto",
      description: "Reconocer y copiar rápidamente el texto del documento.",
      hint: "El texto se lee del PDF en tu navegador.",
      action: "Copiar texto",
      errors: {
        invalid: "Elige un archivo PDF.",
        failed: "No se pudo extraer el texto.",
      },
    },
  },
  sign: {
    draw: "Dibujar",
    type: "Texto",
    image: "PNG",
    clearPad: "Limpiar lienzo",
    typePlaceholder: "Tu nombre",
    uploadPng: "Subir un PNG transparente",
    placeHint: "Haz clic en la página para colocar la firma.",
    size: "Tamaño",
    emptyPad: "Primero dibuja, escribe o sube una firma.",
    canvasAria: "Lienzo para dibujar la firma",
  },
  stamp: {
    presetsLabel: "Sellos listos",
    customLabel: "Texto personalizado",
    customPlaceholder: "Texto del sello",
    placeHint: "Haz clic en la página para colocar el sello.",
    size: "Tamaño",
    color: "Color",
    paid: "PAGADO",
    certified: "CONFORME AL ORIGINAL",
    confidential: "CONFIDENCIAL",
    approved: "APROBADO",
    received: "RECIBIDO",
    copyStamp: "COPIA",
  },
  fillForm: {
    fieldsTitle: "Campos del formulario",
    noFields:
      "No hay campos interactivos. Haz clic en la página para añadir texto.",
    freeTextHint: "Haz clic en el documento para insertar texto libre.",
    textPlaceholder: "Texto en la página",
    flatten: "Aplanar campos (flatten)",
    fieldFallback: (index) => `Campo ${index}`,
  },
  pageNumbers: {
    position: "Posición",
    format: "Formato",
    fontSize: "Tamaño de fuente",
    margin: "Margen",
    headerLeft: "Encabezado izquierda",
    headerCenter: "Encabezado centro",
    headerRight: "Encabezado derecha",
    footerLeft: "Pie izquierda",
    footerCenter: "Pie centro",
    footerRight: "Pie derecha",
    formatSimple: "1",
    formatOf: "1 / N",
    formatPageOf: "Página 1 de N",
  },
  redact: {
    drawHint: "Mantén pulsado y arrastra para tapar una zona de negro.",
    boxes: (count) => `${count} zona(s) de censura`,
    undo: "Deshacer último",
  },
  extract: {
    resultTitle: "Texto extraído",
    empty: "No se encontró una capa de texto en este documento.",
    downloadTxt: "Descargar .txt",
    pagesExtracted: (count) => `Páginas procesadas: ${count}`,
  },
  botProtection: {
    rateLimited:
      "Espera unos segundos antes de descargar otro archivo.",
    unavailable:
      "La verificación del navegador no se completó. Actualiza la página e inténtalo de nuevo.",
  },
  rewardedAd: {
    sponsored: "Apoya el proyecto",
    title: "Descargar el documento listo",
    message:
      "Un breve bloque de patrocinio es la única condición para mantener PureSign gratis, totalmente privado y sin registros ni suscripciones.",
    watch: "Ver vídeo del patrocinador para descargar",
    watching: "Reproducción del patrocinador en curso…",
    download: "Descargar archivo",
    waitHint:
      "Pulsa el botón para iniciar el bloque Adsterra. No se puede continuar sin verlo.",
    progress: (seconds) => `${seconds} s`,
    thanks: "Gracias por el apoyo. El archivo se descargará ahora.",
    close: "Cerrar",
    slotLabel: "Bloque patrocinador Adsterra",
  },
};
