import type { Locale, ToolId } from "@/i18n/locales";

export type SeoPageId = "home" | ToolId;

export type SeoCopy = {
  title: string;
  description: string;
  keywords: string[];
};

type SeoCatalog = Record<SeoPageId, Record<Locale, SeoCopy>>;

export const SEO_COPY: SeoCatalog = {
  home: {
    uk: {
      title: "PureSign — підпис PDF онлайн безкоштовно у браузері",
      description:
        "Підпишіть PDF, поставте печатку, заповніть форму та пронумеруйте сторінки локально. Безкоштовно, без реєстрації і без завантаження на сервер.",
      keywords: [
        "підпис PDF онлайн",
        "підписати PDF безкоштовно",
        "печатка PDF",
        "заповнити форму PDF",
        "нумерація сторінок PDF",
        "електронний підпис у браузері",
        "PureSign",
        "PDF локально без сервера",
      ],
    },
    en: {
      title: "PureSign — sign PDF online free in your browser",
      description:
        "Sign, stamp, fill, and number PDFs locally in your browser. Free private PDF tools with no signup and no server upload.",
      keywords: [
        "sign PDF online free",
        "electronic signature PDF",
        "PDF stamp online",
        "fill PDF form",
        "PDF page numbers",
        "client-side PDF signer",
        "PureSign",
        "sign PDF without upload",
      ],
    },
    de: {
      title: "PureSign — PDF online kostenlos im Browser unterschreiben",
      description:
        "PDFs lokal unterschreiben, stempeln, ausfüllen und nummerieren. Kostenlose private Tools ohne Registrierung und ohne Server-Upload.",
      keywords: [
        "PDF unterschreiben online",
        "PDF kostenlos signieren",
        "PDF Stempel",
        "PDF Formular ausfüllen",
        "PDF Seitenzahlen",
        "elektronische Unterschrift",
        "PureSign",
      ],
    },
    fr: {
      title: "PureSign — signer un PDF en ligne gratuitement",
      description:
        "Signez, tamponnez, remplissez et numérotez des PDF en local. Outils gratuits et privés, sans inscription ni envoi sur un serveur.",
      keywords: [
        "signer PDF en ligne gratuit",
        "signature électronique PDF",
        "tampon PDF",
        "remplir formulaire PDF",
        "numérotation PDF",
        "PureSign",
        "PDF sans serveur",
      ],
    },
    es: {
      title: "PureSign — firmar PDF online gratis en el navegador",
      description:
        "Firma, sella, rellena y numera PDF en local. Herramientas privadas y gratis, sin registro y sin subir archivos al servidor.",
      keywords: [
        "firmar PDF online gratis",
        "firma electrónica PDF",
        "sello PDF",
        "rellenar formulario PDF",
        "numeración PDF",
        "PureSign",
        "PDF sin servidor",
      ],
    },
    pl: {
      title: "PureSign — podpisz PDF online za darmo w przeglądarce",
      description:
        "Podpisuj, pieczętuj, wypełniaj i numeruj PDF lokalnie. Darmowe prywatne narzędzia bez rejestracji i bez wysyłania na serwer.",
      keywords: [
        "podpisz PDF online za darmo",
        "podpis elektroniczny PDF",
        "stempel PDF",
        "wypełnij formularz PDF",
        "numeracja stron PDF",
        "PureSign",
        "PDF bez serwera",
      ],
    },
  },
  sign: {
    uk: {
      title: "Накласти підпис на PDF онлайн | PureSign",
      description:
        "Намалюйте підпис, введіть текст або завантажте PNG і поставте на PDF у браузері. Безкоштовно і повністю локально — файл не йде на сервер.",
      keywords: [
        "накласти підпис на PDF",
        "підписати PDF онлайн",
        "малювати підпис",
        "PNG підпис PDF",
        "електронний підпис безкоштовно",
        "PureSign",
      ],
    },
    en: {
      title: "Add a PDF signature online | PureSign",
      description:
        "Draw, type, or upload a PNG signature and place it on a PDF in your browser. Free, private, and fully client-side.",
      keywords: [
        "add signature to PDF",
        "sign PDF online",
        "draw signature PDF",
        "PNG signature",
        "electronic signature free",
        "PureSign",
      ],
    },
    de: {
      title: "PDF-Unterschrift online platzieren | PureSign",
      description:
        "Unterschrift zeichnen, tippen oder als PNG laden und lokal auf ein PDF setzen. Kostenlos und ohne Server-Upload.",
      keywords: [
        "PDF unterschreiben",
        "Unterschrift auf PDF",
        "Unterschrift zeichnen",
        "PNG Unterschrift",
        "PureSign",
      ],
    },
    fr: {
      title: "Ajouter une signature PDF en ligne | PureSign",
      description:
        "Dessinez, saisissez ou importez une signature PNG et placez-la sur un PDF dans le navigateur. Gratuit et 100 % local.",
      keywords: [
        "ajouter signature PDF",
        "signer PDF en ligne",
        "signature PNG",
        "signature électronique",
        "PureSign",
      ],
    },
    es: {
      title: "Añadir una firma PDF online | PureSign",
      description:
        "Dibuja, escribe o sube una firma PNG y colócala en un PDF en el navegador. Gratis y 100 % local, sin subir al servidor.",
      keywords: [
        "añadir firma PDF",
        "firmar PDF online",
        "firma PNG",
        "firma electrónica",
        "PureSign",
      ],
    },
    pl: {
      title: "Nałóż podpis na PDF online | PureSign",
      description:
        "Narysuj, wpisz lub wgraj podpis PNG i umieść go na PDF w przeglądarce. Za darmo i w 100 % lokalnie — bez serwera.",
      keywords: [
        "nałóż podpis PDF",
        "podpisz PDF online",
        "podpis PNG",
        "podpis elektroniczny",
        "PureSign",
      ],
    },
  },
  stamp: {
    uk: {
      title: "Штамп і печатка на PDF онлайн | PureSign",
      description:
        "Накладайте прозорі штампи «Оплачено», «Згідно з оригіналом» або власний текст на PDF локально у браузері.",
      keywords: [
        "штамп PDF",
        "печатка PDF онлайн",
        "штамп оплачено",
        "згідно з оригіналом PDF",
        "накласти печатку",
        "PureSign",
      ],
    },
    en: {
      title: "PDF stamp and seal online | PureSign",
      description:
        "Place transparent stamps such as Paid or Certified true copy on a PDF locally in your browser — no upload.",
      keywords: [
        "PDF stamp online",
        "paid stamp PDF",
        "certified copy stamp",
        "seal PDF",
        "PureSign",
      ],
    },
    de: {
      title: "PDF-Stempel und Siegel online | PureSign",
      description:
        "Transparente Stempel wie Bezahlt oder Kopie der Urschrift lokal im Browser auf ein PDF setzen — ohne Upload.",
      keywords: [
        "PDF Stempel online",
        "Bezahlt Stempel",
        "Siegel PDF",
        "Kopie der Urschrift",
        "PureSign",
      ],
    },
    fr: {
      title: "Tampon et sceau PDF en ligne | PureSign",
      description:
        "Posez des tampons transparents Payé ou Conforme à l’original sur un PDF en local dans le navigateur.",
      keywords: [
        "tampon PDF",
        "sceau PDF",
        "tampon payé",
        "conforme à l’original",
        "PureSign",
      ],
    },
    es: {
      title: "Sello y tampón PDF online | PureSign",
      description:
        "Coloca sellos transparentes como Pagado o Conforme al original en un PDF en local, sin subir el archivo.",
      keywords: [
        "sello PDF",
        "tampón PDF",
        "sello pagado",
        "conforme al original",
        "PureSign",
      ],
    },
    pl: {
      title: "Stempel i pieczęć PDF online | PureSign",
      description:
        "Nakładaj przezroczyste stemple «Opłacono» i «Zgodnie z oryginałem» na PDF lokalnie w przeglądarce.",
      keywords: [
        "stempel PDF",
        "pieczęć PDF",
        "opłacono PDF",
        "zgodnie z oryginałem",
        "PureSign",
      ],
    },
  },
  "fill-form": {
    uk: {
      title: "Заповнення PDF-форм онлайн | PureSign",
      description:
        "Заповнюйте інтерактивні поля PDF (AcroForm) у браузері. Якщо полів немає — додайте текст вручну. Без сервера.",
      keywords: [
        "заповнити PDF форму",
        "заповнення PDF онлайн",
        "AcroForm",
        "редагувати поля PDF",
        "PureSign",
      ],
    },
    en: {
      title: "Fill PDF forms online | PureSign",
      description:
        "Fill interactive PDF form fields (AcroForm) in your browser. If none exist, add free-text overlays — no server.",
      keywords: [
        "fill PDF form online",
        "AcroForm",
        "edit PDF fields",
        "complete PDF form",
        "PureSign",
      ],
    },
    de: {
      title: "PDF-Formulare online ausfüllen | PureSign",
      description:
        "Interaktive PDF-Felder (AcroForm) im Browser ausfüllen. Falls keine vorhanden sind, Text frei setzen — ohne Server.",
      keywords: [
        "PDF Formular ausfüllen",
        "AcroForm",
        "PDF Felder bearbeiten",
        "PureSign",
      ],
    },
    fr: {
      title: "Remplir un formulaire PDF en ligne | PureSign",
      description:
        "Remplissez les champs PDF interactifs (AcroForm) dans le navigateur. Sinon, ajoutez du texte libre — sans serveur.",
      keywords: [
        "remplir formulaire PDF",
        "AcroForm",
        "champs PDF",
        "PureSign",
      ],
    },
    es: {
      title: "Rellenar formularios PDF online | PureSign",
      description:
        "Rellena campos PDF interactivos (AcroForm) en el navegador. Si no hay, añade texto libre — sin servidor.",
      keywords: [
        "rellenar formulario PDF",
        "AcroForm",
        "campos PDF",
        "PureSign",
      ],
    },
    pl: {
      title: "Wypełnianie formularzy PDF online | PureSign",
      description:
        "Wypełniaj interaktywne pola PDF (AcroForm) w przeglądarce. Jeśli ich brak — dodaj tekst ręcznie, bez serwera.",
      keywords: [
        "wypełnij formularz PDF",
        "AcroForm",
        "pola PDF",
        "PureSign",
      ],
    },
  },
  "page-numbers": {
    uk: {
      title: "Нумерація сторінок PDF онлайн | PureSign",
      description:
        "Додавайте номери сторінок і колонтитули до PDF локально у браузері. Безкоштовно, без завантаження на сервер.",
      keywords: [
        "нумерація сторінок PDF",
        "додати номери сторінок",
        "колонтитули PDF",
        "PDF header footer",
        "PureSign",
      ],
    },
    en: {
      title: "Add PDF page numbers online | PureSign",
      description:
        "Add page numbers and headers or footers to a PDF locally in your browser. Free, with no server upload.",
      keywords: [
        "PDF page numbers",
        "add page numbers to PDF",
        "PDF header footer",
        "number PDF pages",
        "PureSign",
      ],
    },
    de: {
      title: "PDF-Seitennummerierung online | PureSign",
      description:
        "Seitenzahlen sowie Kopf- und Fußzeilen lokal im Browser hinzufügen. Kostenlos, ohne Server-Upload.",
      keywords: [
        "PDF Seitenzahlen",
        "Seiten nummerieren PDF",
        "Kopfzeile Fußzeile PDF",
        "PureSign",
      ],
    },
    fr: {
      title: "Numérotation des pages PDF en ligne | PureSign",
      description:
        "Ajoutez des numéros de page et des en-têtes ou pieds de page en local dans le navigateur, sans envoi serveur.",
      keywords: [
        "numérotation PDF",
        "numéroter pages PDF",
        "en-tête pied de page PDF",
        "PureSign",
      ],
    },
    es: {
      title: "Numeración de páginas PDF online | PureSign",
      description:
        "Añade números de página y encabezados o pies a un PDF en local en el navegador, sin subir al servidor.",
      keywords: [
        "numeración PDF",
        "números de página PDF",
        "encabezado pie PDF",
        "PureSign",
      ],
    },
    pl: {
      title: "Numeracja stron PDF online | PureSign",
      description:
        "Dodawaj numery stron oraz nagłówki i stopki do PDF lokalnie w przeglądarce — bez wysyłania na serwer.",
      keywords: [
        "numeracja stron PDF",
        "numery stron PDF",
        "nagłówek stopka PDF",
        "PureSign",
      ],
    },
  },
  redact: {
    uk: {
      title: "Цензурування PDF онлайн | PureSign",
      description:
        "Замалюйте конфіденційні дані чорним прямокутником прямо в браузері. Редакція PDF локально — без завантаження на сервер.",
      keywords: [
        "цензура PDF",
        "замалювати PDF",
        "приховати текст у PDF",
        "redact PDF",
        "чорний квадрат PDF",
        "PureSign",
      ],
    },
    en: {
      title: "Redact a PDF online | PureSign",
      description:
        "Black out confidential data in your browser. Redact PDFs locally with no server upload and no account.",
      keywords: [
        "redact PDF online",
        "blackout PDF",
        "hide text in PDF",
        "censor PDF",
        "PureSign",
      ],
    },
    de: {
      title: "PDF online schwärzen | PureSign",
      description:
        "Vertrauliche Daten im Browser schwärzen. PDF lokal zensieren — ohne Server-Upload und ohne Konto.",
      keywords: [
        "PDF schwärzen",
        "PDF zensieren",
        "Text in PDF verbergen",
        "PureSign",
      ],
    },
    fr: {
      title: "Censurer un PDF en ligne | PureSign",
      description:
        "Occultez des données confidentielles dans le navigateur. Censurez un PDF en local, sans envoi sur un serveur.",
      keywords: [
        "censurer PDF",
        "occulter PDF",
        "masquer texte PDF",
        "PureSign",
      ],
    },
    es: {
      title: "Censurar un PDF online | PureSign",
      description:
        "Tapa datos confidenciales en el navegador. Censura un PDF en local, sin subir el archivo al servidor.",
      keywords: [
        "censurar PDF",
        "tachar PDF",
        "ocultar texto PDF",
        "PureSign",
      ],
    },
    pl: {
      title: "Cenzura PDF online | PureSign",
      description:
        "Zamazuj poufne dane czarnym prostokątem w przeglądarce. Redaguj PDF lokalnie — bez wysyłania na serwer.",
      keywords: [
        "cenzura PDF",
        "zamazanie PDF",
        "ukryj tekst w PDF",
        "redact PDF",
        "PureSign",
      ],
    },
  },
  "extract-text": {
    uk: {
      title: "Витягнути текст з PDF онлайн | PureSign",
      description:
        "Швидко розпізнайте та скопіюйте текст із PDF локально у браузері. Без OCR-сервера і без завантаження файлу.",
      keywords: [
        "витягнути текст з PDF",
        "скопіювати текст PDF",
        "PDF в текст",
        "розпізнати текст PDF",
        "PureSign",
      ],
    },
    en: {
      title: "Extract text from PDF online | PureSign",
      description:
        "Quickly copy text from a PDF locally in your browser. No OCR server and no file upload required.",
      keywords: [
        "extract text from PDF",
        "copy PDF text",
        "PDF to text",
        "PDF text extractor",
        "PureSign",
      ],
    },
    de: {
      title: "Text aus PDF extrahieren online | PureSign",
      description:
        "Text aus einem PDF lokal im Browser erkennen und kopieren. Kein OCR-Server, kein Datei-Upload.",
      keywords: [
        "Text aus PDF extrahieren",
        "PDF Text kopieren",
        "PDF zu Text",
        "PureSign",
      ],
    },
    fr: {
      title: "Extraire le texte d’un PDF en ligne | PureSign",
      description:
        "Reconnaissez et copiez le texte d’un PDF en local dans le navigateur. Sans serveur OCR ni envoi de fichier.",
      keywords: [
        "extraire texte PDF",
        "copier texte PDF",
        "PDF vers texte",
        "PureSign",
      ],
    },
    es: {
      title: "Extraer texto de un PDF online | PureSign",
      description:
        "Reconoce y copia el texto de un PDF en local en el navegador. Sin servidor OCR y sin subir el archivo.",
      keywords: [
        "extraer texto PDF",
        "copiar texto PDF",
        "PDF a texto",
        "PureSign",
      ],
    },
    pl: {
      title: "Wyodrębnij tekst z PDF online | PureSign",
      description:
        "Szybko rozpoznaj i skopiuj tekst z PDF lokalnie w przeglądarce. Bez serwera OCR i bez wysyłania pliku.",
      keywords: [
        "wyodrębnij tekst z PDF",
        "kopiuj tekst PDF",
        "PDF na tekst",
        "PureSign",
      ],
    },
  },
};

export function getSeoCopy(page: SeoPageId, locale: Locale): SeoCopy {
  return SEO_COPY[page][locale];
}
