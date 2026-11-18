import { TOOL_IDS, type Locale, type ToolId } from "@/i18n/locales";

export type SeoPageId = "home" | ToolId;

export const SEO_PAGE_IDS: readonly SeoPageId[] = ["home", ...TOOL_IDS];

export type SeoCopy = {
  title: string;
  description: string;
  keywords: string[];
};

type SeoCatalog = Record<SeoPageId, Record<Locale, SeoCopy>>;

export const SEO_COPY: SeoCatalog = {
  home: {
    uk: {
      title: "Підписати PDF онлайн безкоштовно | PureSign",
      description:
        "Підписати PDF онлайн безкоштовно: електронний підпис, печатка, форми та нумерація локально в браузері. Без реєстрації і без завантаження документів на сервер.",
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
      title: "Free Online PDF Signer and e-Signature | PureSign",
      description:
        "Free online PDF signer and e-signature tools. Draw or upload a signature, stamp, fill, and number PDFs locally in your browser — no signup, no server upload.",
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
      title: "PDF online kostenlos unterschreiben | PureSign",
      description:
        "PDF online kostenlos unterschreiben: e-Signatur, Stempel, Formulare und Seitenzahlen lokal im Browser. Ohne Registrierung und ohne Server-Upload.",
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
      title: "Signer un PDF en ligne gratuitement | PureSign",
      description:
        "Signer un PDF en ligne gratuitement : signature électronique, tampon, formulaires et numérotation en local dans le navigateur. Sans inscription ni envoi sur un serveur.",
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
      title: "Firmar PDF online gratis | PureSign",
      description:
        "Firmar PDF online gratis: firma electrónica, sello, formularios y numeración en el navegador. Sin registro y sin subir documentos al servidor.",
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
      title: "Podpisz PDF online za darmo | PureSign",
      description:
        "Podpisz PDF online za darmo: podpis elektroniczny, pieczęć, formularze i numeracja lokalnie w przeglądarce. Bez rejestracji i bez wysyłania na serwer.",
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
      title: "Підписати PDF онлайн — малювання та завантаження підпису | PureSign",
      description:
        "Підписати PDF онлайн безкоштовно: намалюйте підпис, введіть ім’я або завантажте цифровий PNG і поставте на документ у браузері. Файл не йде на сервер.",
      keywords: [
        "підписати PDF онлайн безкоштовно",
        "накласти підпис на PDF",
        "малювання підпису",
        "завантаження цифрового підпису",
        "PNG підпис PDF",
        "електронний підпис безкоштовно",
        "PureSign",
      ],
    },
    en: {
      title: "Sign PDF Online Free — Draw or Upload e-Signature | PureSign",
      description:
        "Free online PDF signer: draw a signature, type your name, or upload a digital PNG and place it on the document in your browser. No server upload.",
      keywords: [
        "sign PDF online free",
        "draw signature online",
        "upload digital signature",
        "add signature to PDF",
        "PNG signature PDF",
        "electronic signature free",
        "PureSign",
      ],
    },
    de: {
      title: "PDF unterschreiben — Zeichnen oder Signatur hochladen | PureSign",
      description:
        "PDF online kostenlos unterschreiben: Unterschrift zeichnen, tippen oder als PNG hochladen und lokal auf das Dokument setzen. Ohne Server-Upload.",
      keywords: [
        "PDF unterschreiben",
        "Unterschrift auf PDF",
        "Unterschrift zeichnen",
        "PNG Unterschrift",
        "PureSign",
      ],
    },
    fr: {
      title: "Signer un PDF — dessiner ou importer une signature | PureSign",
      description:
        "Signer un PDF en ligne gratuitement : dessinez une signature, saisissez un nom ou importez un PNG, puis placez-le sur le document. Sans envoi serveur.",
      keywords: [
        "ajouter signature PDF",
        "signer PDF en ligne",
        "signature PNG",
        "signature électronique",
        "PureSign",
      ],
    },
    es: {
      title: "Firmar PDF — dibujar o subir firma electrónica | PureSign",
      description:
        "Firmar PDF online gratis: dibuja una firma, escribe tu nombre o sube un PNG digital y colócalo en el documento. Sin subir al servidor.",
      keywords: [
        "añadir firma PDF",
        "firmar PDF online",
        "firma PNG",
        "firma electrónica",
        "PureSign",
      ],
    },
    pl: {
      title: "Podpisz PDF — narysuj lub wgraj podpis elektroniczny | PureSign",
      description:
        "Podpisz PDF online za darmo: narysuj podpis, wpisz imię lub wgraj cyfrowy PNG i umieść na dokumencie. Bez wysyłania na serwer.",
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
  "date-stamp": {
    uk: {
      title: "Штамп дати та часу на PDF онлайн | PureSign",
      description:
        "Поставте штамп з поточною датою, часом або датою й часом на PDF у браузері. Безкоштовно, локально і без завантаження файлу на сервер.",
      keywords: [
        "штамп дати PDF",
        "штамп часу PDF",
        "дата на PDF онлайн",
        "timestamp PDF",
        "PureSign",
      ],
    },
    en: {
      title: "PDF date and time stamp online | PureSign",
      description:
        "Place a live date, time, or datetime stamp on a PDF in your browser. Free, private, and fully local — no server upload.",
      keywords: [
        "PDF date stamp",
        "PDF timestamp",
        "add date to PDF",
        "datetime stamp PDF",
        "PureSign",
      ],
    },
    de: {
      title: "PDF Datum- und Zeitstempel online | PureSign",
      description:
        "Setzen Sie Datum, Uhrzeit oder beides lokal im Browser auf ein PDF. Kostenlos, privat und ohne Server-Upload.",
      keywords: [
        "PDF Zeitstempel",
        "PDF Datumstempel",
        "Datum auf PDF",
        "PureSign",
      ],
    },
    fr: {
      title: "Tampon date et heure PDF en ligne | PureSign",
      description:
        "Horodatez un PDF avec la date, l’heure ou les deux dans le navigateur. Gratuit, local, sans envoi sur un serveur.",
      keywords: [
        "tampon date PDF",
        "horodatage PDF",
        "date sur PDF",
        "PureSign",
      ],
    },
    es: {
      title: "Sello de fecha y hora PDF online | PureSign",
      description:
        "Añade fecha, hora o ambas a un PDF en el navegador. Gratis, local y sin subir el archivo al servidor.",
      keywords: [
        "sello fecha PDF",
        "marca temporal PDF",
        "fecha en PDF",
        "PureSign",
      ],
    },
    pl: {
      title: "Stempel daty i czasu PDF online | PureSign",
      description:
        "Nałóż aktualną datę, godzinę lub oba znaczniki na PDF w przeglądarce. Za darmo, lokalnie, bez wysyłania na serwer.",
      keywords: [
        "stempel daty PDF",
        "znacznik czasu PDF",
        "data na PDF",
        "PureSign",
      ],
    },
  },
  "protect-pdf": {
    uk: {
      title: "Зашифрувати PDF паролем онлайн | PureSign",
      description:
        "Встановіть пароль відкриття та зашифруйте PDF локально у браузері. Безкоштовно, без реєстрації і без надсилання файлу на сервер.",
      keywords: [
        "зашифрувати PDF",
        "пароль PDF онлайн",
        "захистити PDF паролем",
        "шифрування PDF",
        "PureSign",
      ],
    },
    en: {
      title: "Password-protect a PDF online | PureSign",
      description:
        "Encrypt a PDF with an opening password in your browser. Free client-side protection with no signup and no file upload.",
      keywords: [
        "encrypt PDF",
        "PDF password",
        "password protect PDF online",
        "lock PDF",
        "PureSign",
      ],
    },
    de: {
      title: "PDF mit Passwort schützen online | PureSign",
      description:
        "PDF lokal im Browser mit einem Öffnungspasswort verschlüsseln. Kostenlos, ohne Konto und ohne Server-Upload.",
      keywords: [
        "PDF verschlüsseln",
        "PDF Passwort",
        "PDF schützen online",
        "PureSign",
      ],
    },
    fr: {
      title: "Protéger un PDF par mot de passe | PureSign",
      description:
        "Chiffrez un PDF avec un mot de passe d’ouverture dans le navigateur. Gratuit, 100 % local, sans envoi de fichier.",
      keywords: [
        "chiffrer PDF",
        "mot de passe PDF",
        "protéger PDF en ligne",
        "PureSign",
      ],
    },
    es: {
      title: "Proteger PDF con contraseña online | PureSign",
      description:
        "Cifra un PDF con contraseña de apertura en el navegador. Gratis, local y sin subir el archivo al servidor.",
      keywords: [
        "cifrar PDF",
        "contraseña PDF",
        "proteger PDF online",
        "PureSign",
      ],
    },
    pl: {
      title: "Zabezpiecz PDF hasłem online | PureSign",
      description:
        "Zaszyfruj PDF hasłem otwarcia lokalnie w przeglądarce. Za darmo, bez konta i bez wysyłania pliku na serwer.",
      keywords: [
        "szyfrowanie PDF",
        "hasło PDF",
        "zabezpiecz PDF hasłem",
        "PureSign",
      ],
    },
  },
  "unlock-pdf": {
    uk: {
      title: "Розблокувати PDF онлайн | PureSign",
      description:
        "Зніміть пароль відкриття або обмеження друку з PDF у браузері. Працює локально — файл не завантажується на сервер.",
      keywords: [
        "розблокувати PDF",
        "зняти пароль PDF",
        "відкрити захищений PDF",
        "unlock PDF",
        "PureSign",
      ],
    },
    en: {
      title: "Unlock a PDF online | PureSign",
      description:
        "Remove a PDF opening password or printing restrictions in your browser. Private and local — your file never leaves the device.",
      keywords: [
        "unlock PDF",
        "remove PDF password",
        "unlock protected PDF",
        "decrypt PDF online",
        "PureSign",
      ],
    },
    de: {
      title: "PDF entsperren online | PureSign",
      description:
        "Öffnungspasswort oder Druckbeschränkungen lokal im Browser entfernen. Die Datei bleibt auf Ihrem Gerät — ohne Server-Upload.",
      keywords: [
        "PDF entsperren",
        "PDF Passwort entfernen",
        "geschütztes PDF öffnen",
        "PureSign",
      ],
    },
    fr: {
      title: "Déverrouiller un PDF en ligne | PureSign",
      description:
        "Supprimez le mot de passe d’ouverture ou les restrictions d’un PDF dans le navigateur. Traitement local, sans envoi serveur.",
      keywords: [
        "déverrouiller PDF",
        "mot de passe PDF",
        "enlever mot de passe PDF",
        "PureSign",
      ],
    },
    es: {
      title: "Desbloquear PDF online | PureSign",
      description:
        "Quita la contraseña de apertura o las restricciones de un PDF en el navegador. Local y privado, sin subir el archivo.",
      keywords: [
        "desbloquear PDF",
        "quitar contraseña PDF",
        "abrir PDF protegido",
        "PureSign",
      ],
    },
    pl: {
      title: "Odblokuj PDF online | PureSign",
      description:
        "Usuń hasło otwarcia lub ograniczenia PDF w przeglądarce. Plik zostaje na urządzeniu — bez wysyłania na serwer.",
      keywords: [
        "odblokuj PDF",
        "usuń hasło PDF",
        "otwórz chroniony PDF",
        "PureSign",
      ],
    },
  },
  "batch-sign": {
    uk: {
      title: "Пакетне підписання PDF онлайн | PureSign",
      description:
        "Підпишіть кілька PDF одним підписом і завантажте ZIP-архів. Усі файли обробляються локально у браузері, без сервера.",
      keywords: [
        "пакетне підписання PDF",
        "підписати кілька PDF",
        "ZIP підписані PDF",
        "масовий підпис PDF",
        "PureSign",
      ],
    },
    en: {
      title: "Batch sign PDFs online | PureSign",
      description:
        "Sign multiple PDFs with one signature and download a ZIP pack. Free, private, and fully client-side — no server upload.",
      keywords: [
        "batch sign PDF",
        "sign multiple PDF",
        "bulk PDF signature",
        "ZIP signed PDF",
        "PureSign",
      ],
    },
    de: {
      title: "PDF-Stapelsignatur online | PureSign",
      description:
        "Mehrere PDFs mit einer Signatur signieren und als ZIP herunterladen. Kostenlos, lokal im Browser, ohne Server-Upload.",
      keywords: [
        "PDF Stapel signieren",
        "mehrere PDF signieren",
        "ZIP signierte PDF",
        "PureSign",
      ],
    },
    fr: {
      title: "Signature PDF par lot en ligne | PureSign",
      description:
        "Signez plusieurs PDF avec une seule signature et exportez un ZIP. Gratuit, 100 % local, sans envoi sur un serveur.",
      keywords: [
        "signature lot PDF",
        "signer plusieurs PDF",
        "signature groupée PDF",
        "PureSign",
      ],
    },
    es: {
      title: "Firma PDF por lotes online | PureSign",
      description:
        "Firma varios PDF con una sola firma y descarga un ZIP. Gratis, local en el navegador y sin subir archivos al servidor.",
      keywords: [
        "firmar PDF por lotes",
        "firma múltiple PDF",
        "ZIP PDF firmados",
        "PureSign",
      ],
    },
    pl: {
      title: "Podpis wsadowy PDF online | PureSign",
      description:
        "Podpisz wiele PDF jednym podpisem i pobierz archiwum ZIP. Za darmo, lokalnie w przeglądarce, bez wysyłania na serwer.",
      keywords: [
        "podpis wsadowy PDF",
        "wiele PDF podpis",
        "hurtowy podpis PDF",
        "PureSign",
      ],
    },
  },
};

export function getSeoCopy(page: SeoPageId, locale: Locale): SeoCopy {
  return SEO_COPY[page][locale];
}
