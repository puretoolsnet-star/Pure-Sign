import type { Dictionary } from "@/i18n/types";

export const pl: Dictionary = {
  brand: {
    name: "PureSign",
    tagline: "Podpisuj i wypełniaj PDF lokalnie.",
  },
  nav: {
    selectLanguage: "Język",
    menuAria: "Menu witryny",
    menuClose: "Zamknij menu",
  },
  ecosystem: {
    menuLabel: "Nasz ekosystem",
    menuShort: "Ekosystem",
    menuAria: "Projekty naszego ekosystemu",
    menuHint:
      "Powiązane narzędzia z lokalnym przetwarzaniem w przeglądarce — jeden zespół, jedna filozofia prywatności.",
    activeHere: "Aktywne",
    comingSoon: "Wkrótce",
    close: "Zamknij menu ekosystemu",
    items: {
      purepdf: {
        name: "PurePDF",
        tagline: "Narzędzia do pracy z PDF.",
      },
      pureConvert: {
        name: "PureConvert",
        tagline: "Konwersja formatów plików — lokalnie w przeglądarce.",
      },
      pureImage: {
        name: "PureImage",
        tagline: "Edytuj i konwertuj obrazy lokalnie w przeglądarce.",
      },
      pureQr: {
        name: "PureQR",
        tagline: "Generator i menedżer kodów QR.",
      },
      pureSign: {
        name: "PureSign",
        tagline: "Podpis i wypełnianie PDF lokalnie.",
      },
      pureTable: {
        name: "PureTable",
        tagline: "Narzędzie biznesowe do parsowania faktur do Excel/CSV.",
      },
      pureText: {
        name: "PureText",
        tagline: "Narzędzia tekstowe — lokalnie w przeglądarce.",
      },
    },
  },
  security: {
    badge: "Client-Side • 100% lokalnie",
    badgeShort: "Przetwarzanie lokalne",
    pointLocal: "Przetwarzanie tylko w Twojej przeglądarce",
    pointNoUpload: "Bez wysyłania na serwer",
    pointPrivate: "Prywatność domyślnie",
    toolNote: "Client-Side: pliki zostają na Twoim urządzeniu.",
  },
  home: {
    heroTitle: "Wszystkie narzędzia podpisu w jednej ciemnej przestrzeni roboczej.",
    heroSubtitle:
      "Podpisuj, pieczętuj, numeruj i wypełniaj dokumenty PDF prywatnie w przeglądarce.",
    toolsAria: "Katalog narzędzi PureSign",
    toolsHeading: "Katalog narzędzi",
    toolsCatalogHint:
      "Zwijaj i rozwijaj kategorie strzałką — wszystko działa lokalnie w przeglądarce.",
    expandCategory: "Rozwiń kategorię",
    collapseCategory: "Zwiń kategorię",
    toolCategories: {
      signaturesStamps: {
        title: "Podpisy i stemple",
        subtitle: "Podpis, pieczęcie i znaczniki daty i czasu.",
      },
      formsLayout: {
        title: "Formularze i układ",
        subtitle: "Wypełnianie, numeracja, nagłówki i cenzura.",
      },
      analysisSecurity: {
        title: "Analiza i bezpieczeństwo",
        subtitle: "Tekst, szyfrowanie i odblokowanie.",
      },
      proBatch: {
        title: "Pro / operacje masowe",
        subtitle: "Podpis wsadowy z eksportem ZIP.",
      },
    },
    openTool: "Otwórz →",
  },
  footer: {
    privacyBadge: "100% w przeglądarce",
    tagline: "Żaden dokument nie opuszcza Twojego urządzenia.",
    rights: "© PureSign. Prywatny podpis dokumentów.",
  },
  common: {
    backToTools: "Wróć do narzędzi",
    dropzoneTitle: "Upuść PDF tutaj lub kliknij, aby wybrać",
    dropzoneHint: "Plik jest przetwarzany tylko na tym urządzeniu.",
    downloadPdf: "Pobierz PDF",
    dropzoneMultipleTitle: "Upuść jeden lub więcej plików PDF",
    processing: "Przetwarzanie…",
    clear: "Wyczyść",
    apply: "Zastosuj",
    pageLabel: (index, total) => `Strona ${index} z ${total}`,
    prevPage: "Poprzednia",
    nextPage: "Następna",
    copy: "Kopiuj",
    copied: "Skopiowano",
    remove: "Usuń",
  },
  tools: {
    sign: {
      title: "Nałóż podpis",
      description: "Podpis narysowany, tekstowy lub z obrazu PNG.",
      hint: "Dodaj PDF lub obraz, utwórz podpis i przeciągnij go na stronę.",
      action: "Pobierz podpisany PDF",
      errors: {
        invalid: "Wybierz plik PDF lub obrazu.",
        failed: "Nie udało się nałożyć podpisu.",
      },
    },
    stamp: {
      title: "Dodaj pieczęć / stempel",
      description:
        "Nakładanie stempli z przezroczystym tłem: „Opłacono”, „Zgodnie z oryginałem”.",
      hint: "Wybierz gotowy stempel lub wpisz własny tekst.",
      action: "Pobierz PDF ze stemplem",
      errors: {
        invalid: "Wybierz plik PDF.",
        failed: "Nie udało się nałożyć stempla.",
      },
    },
    "date-stamp": {
      title: "Stempel daty / czasu",
      description: "Automatyczna data, godzina lub oba na stronie PDF.",
      hint: "Wybierz format i kliknij stronę, aby umieścić znacznik.",
      action: "Pobierz PDF ze znacznikiem",
      errors: {
        invalid: "Wybierz plik PDF.",
        failed: "Nie udało się nałożyć znacznika daty.",
      },
    },
    "fill-form": {
      title: "Wypełnianie formularzy PDF",
      description: "Interaktywne wpisywanie tekstu w pola dokumentu.",
      hint: "Pola formularza są odczytywane lokalnie. Jeśli ich brak — dodaj tekst ręcznie.",
      action: "Pobierz wypełniony PDF",
      errors: {
        invalid: "Wybierz plik PDF.",
        failed: "Nie udało się wypełnić formularza.",
      },
    },
    "page-numbers": {
      title: "Numeracja stron",
      description: "Dodawanie numerów stron lub nagłówków i stopek.",
      hint: "Wybierz pozycję, format i odstęp.",
      action: "Pobierz ponumerowany PDF",
      errors: {
        invalid: "Wybierz plik PDF.",
        failed: "Nie udało się dodać numeracji.",
      },
    },
    redact: {
      title: "Cenzura / zamazanie",
      description: "Ukrywanie poufnych danych czarnym kwadratem.",
      hint: "Przeciągnij palcem lub myszą, aby zamazać fragment.",
      action: "Pobierz ocenzurowany PDF",
      errors: {
        invalid: "Wybierz plik PDF.",
        failed: "Nie udało się zastosować cenzury.",
      },
    },
    "extract-text": {
      title: "Wyodrębnianie tekstu",
      description: "Szybkie rozpoznawanie i kopiowanie tekstu z dokumentu.",
      hint: "Tekst jest odczytywany z PDF w przeglądarce.",
      action: "Kopiuj tekst",
      errors: {
        invalid: "Wybierz plik PDF.",
        failed: "Nie udało się wyodrębnić tekstu.",
      },
    },
    "protect-pdf": {
      title: "Hasło i szyfrowanie PDF",
      description: "Ustaw hasło otwarcia dokumentu przed wysyłką.",
      hint: "Hasło jest stosowane lokalnie — nie przechowujemy go.",
      action: "Pobierz zaszyfrowany PDF",
      errors: {
        invalid: "Wybierz plik PDF.",
        failed: "Nie udało się zaszyfrować PDF.",
      },
    },
    "unlock-pdf": {
      title: "Odblokowanie PDF",
      description: "Usuń hasło lub ograniczenia druku i kopiowania.",
      hint: "Wpisz bieżące hasło, jeśli plik jest chroniony.",
      action: "Pobierz odblokowany PDF",
      errors: {
        invalid: "Wybierz plik PDF.",
        failed: "Nie udało się odblokować PDF. Sprawdź hasło.",
      },
    },
    "batch-sign": {
      title: "Podpis wsadowy",
      description: "Jeden podpis dla wielu PDF z eksportem ZIP.",
      hint: "Dodaj pliki, umieść podpis na podglądzie i eksportuj paczkę.",
      action: "Zastosuj do wszystkich",
      errors: {
        invalid: "Dodaj co najmniej jeden poprawny PDF.",
        failed: "Nie udało się podpisać paczki.",
      },
    },
  },
  sign: {
    draw: "Rysuj",
    type: "Tekst",
    image: "PNG",
    clearPad: "Wyczyść płótno",
    undo: "Cofnij",
    lineWidth: "Grubość linii",
    inkColor: "Kolor atramentu",
    canvasHint: "Podpisz tutaj",
    inkBlack: "Czarny atrament",
    inkBlue: "Niebieski",
    inkBallpoint: "Długopis",
    insertNoVisibleInk:
      "Brak widocznego atramentu na papierze. Narysuj ponownie lub wybierz ciemniejszy kolor.",
    documentInkPreview: "Podgląd na białym papierze (jak w dokumencie)",
    inkLight: "Jasny atrament",
    inkGraphite: "Grafit",
    inkRed: "Czerwony atrament",
    padSurface: "Tło płótna",
    padSurfacePaper: "Jasny arkusz",
    padSurfaceGrid: "Przezroczysta siatka",
    padSurfaceDark: "Ciemne tło",
    padSurfaceAutoHint:
      "Jasny atrament wymaga ciemnego tła — tylko podgląd, bez eksportu tła.",
    typePlaceholder: "Twoje imię",
    typeStyle: "Styl czcionki",
    typeStyleScript: "Odręczny",
    typeStyleBusiness: "Biznesowy",
    typePreview: "Podgląd podpisu",
    typePreviewEmpty: "Wpisz tekst, by zobaczyć podgląd",
    uploadPng: "Wgraj przezroczysty PNG",
    uploadImage: "Wgraj zdjęcie podpisu",
    replaceImage: "Zmień obraz",
    bgThreshold: "Próg usuwania papieru",
    autoTrim: "Przytnij puste marginesy",
    photoInk: "Kolor atramentu",
    savedTitle: "Zapisane w tej przeglądarce",
    savedUse: (name) => `Użyj „${name}”`,
    savedDelete: (name) => `Usuń „${name}”`,
    savedDefaultName: (date) => `Podpis ${date}`,
    saveAs: "Zapisz jako",
    saveAsPlaceholder: "Nazwa (opcjonalnie)",
    saveLocal: "Zapisz",
    placeHint: "Dotknij lub kliknij stronę, by umieścić podpis.",
    overlayHint: "Przeciągaj, zmieniaj rozmiar w rogu — zapisuj podpisy lokalnie do szybkiego wklejania.",
    placeAllPages: "Na każdej stronie",
    quickMarks: "Szybkie znaki",
    markCheck: "Ptaszek",
    markCross: "Krzyżyk",
    dragOverlay: "Przeciągnij lub zmień rozmiar",
    overlayHideFrames: "Ukryj ramki",
    overlayShowFrames: "Pokaż ramki",
    removeSelected: "Usuń zaznaczone",
    addSignature: "Dodaj podpis",
    addInitials: "Inicjały",
    addDate: "Data",
    addText: "Tekst",
    addStamp: "Pieczątka",
    stampSheetHint: "Wybierz preset lub wpisz tekst pieczątki lub okrągłej pieczęci, potem wstaw.",
    stampShapeRect: "Pieczątka prostokątna",
    stampShapeRound: "Pieczęć okrągła",
    stampCenterText: "Tekst centralny",
    stampRingText: "Tekst wokół koła",
    stampRingPlaceholder: "np. POŚWIADCZONA KOPIA",
    stampLightImprint: "Lekki odcisk (półprzezroczysty)",
    stampInkSeal: "Atrament pieczęci",
    insertIntoDocument: "Wstaw do dokumentu",
    creatorSheetHint: "Utwórz podpis tutaj — dokument pozostaje widoczny.",
    documentFocusHint: "Dotknij elementu na stronie, aby go przesunąć. Dodawaj podpis z paska na dole.",
    duplicateOverlay: "Duplikuj",
    overlayAllPages: "Wszystkie strony",
    downloadDocument: "Pobierz",
    textOnPagePlaceholder: "Tekst na stronie",
    dateSheetHint:
      "Wybierz datę i/lub godzinę, format, kolor i rozmiar na jasnym podglądzie — potem wstaw na stronę.",
    dateOnPageLabel: "Tekst daty",
    dateOnPagePlaceholder: "np. 25.11.2026",
    editDateOnDocument: "Edytujesz wybraną datę na dokumencie.",
    editTextOnDocument: "Edytujesz wybrany tekst na dokumencie.",
    documentFontLabel: "Czcionka",
    documentFontPreview: "Podgląd na arkuszu",
    documentFontPreviewSample: "Twój tekst",
    documentFontSans: "Nowoczesny sans",
    documentFontSerif: "Klasyczny serif",
    documentFontScript: "Elegancki pismo",
    documentFontMono: "Techniczne mono",
    documentTextColor: "Kolor tekstu",
    sizeOnDocument: "Rozmiar na stronie",
    sizeOnDocumentDesktop: "Dopasuj rozmiar (zaznaczony element)",
    desktopDragHint:
      "Przeciągnij, by przesunąć; uchwyt w rogu zmienia rozmiar. Dotknij strony poza elementem, aby ukryć ramkę.",
    desktopSavedHint: "Kliknij zapisany podpis, aby wstawić go na bieżącej stronie.",
    size: "Rozmiar na stronie",
    emptyPad: "Najpierw narysuj, wpisz lub wgraj podpis.",
    canvasAria: "Płótno do rysowania podpisu",
  },
  stamp: {
    presetsLabel: "Gotowe stemple",
    customLabel: "Własny tekst",
    customPlaceholder: "Tekst stempla",
    placeHint: "Kliknij stronę, aby postawić stempel.",
    size: "Rozmiar",
    color: "Kolor",
    paid: "OPŁACONO",
    certified: "ZGODNIE Z ORYGINAŁEM",
    confidential: "POUFNE",
    approved: "ZATWIERDZONO",
    agreed: "POGODZONE",
    received: "OTRZYMANO",
    copyStamp: "KOPIA",
  },
  fillForm: {
    fieldsTitle: "Pola formularza",
    fieldsCount: (count) => {
      if (count === 1) return "1 pole";
      const mod10 = count % 10;
      const mod100 = count % 100;
      if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return `${count} pola`;
      return `${count} pól`;
    },
    noFields:
      "Brak pól interaktywnych — dodawaj bloki tekstu na stronie (skany i zwykłe PDF).",
    workspaceHint: "Wypełnij pola poniżej albo umieszczaj tekst bezpośrednio na podglądzie dokumentu.",
    freeTextTitle: "Tekst na stronie",
    freeTextHint: "Wpisz tekst, wybierz czcionkę i kolor, potem naciśnij „Umieść na stronie”.",
    addTextOnPage: "Umieść na stronie",
    placeActive: "Dotknij dokumentu…",
    tapPageHint: "Dotknij lub kliknij miejsce na stronie, gdzie ma być tekst.",
    textPlaceholder: "Imię, data, kwota…",
    flatten: "Osadź pola w pliku PDF",
    fieldFallback: (index) => `Pole ${index}`,
  },
  pageNumbers: {
    workspaceHint: "Podgląd na stronie aktualizuje się na żywo — pobierz PDF, gdy wygląda dobrze.",
    position: "Pozycja na stronie",
    format: "Format numeru",
    fontSize: "Rozmiar czcionki",
    margin: "Odstęp od krawędzi",
    color: "Kolor tekstu",
    fontLabel: "Czcionka",
    fontSans: "Sans",
    fontSerif: "Szeryfowa",
    fontScript: "Odręczna",
    fontMono: "Mono",
    skipFirstPage: "Bez numeru na pierwszej stronie (okładka)",
    startNumber: "Numeracja od",
    startNumberHint: "Pierwsza numerowana strona pokaże tę wartość (często 1 po okładce).",
    documentPageCount: (count) => {
      if (count === 1) return "1 strona w tym dokumencie";
      const mod10 = count % 10;
      const mod100 = count % 100;
      if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14))
        return `${count} strony w tym dokumencie`;
      return `${count} stron w tym dokumencie`;
    },
    numberedPagesCount: (count) => {
      if (count === 1) return "1 strona zostanie ponumerowana";
      const mod10 = count % 10;
      const mod100 = count % 100;
      if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14))
        return `${count} strony zostaną ponumerowane`;
      return `${count} stron zostanie ponumerowanych`;
    },
    noNumberOnThisPage: "Brak numeru na tym arkuszu (zgodnie z ustawieniami).",
    livePreviewHint: "Numer na tej stronie:",
    headerLeft: "Nagłówek lewo",
    headerCenter: "Nagłówek środek",
    headerRight: "Nagłówek prawo",
    footerLeft: "Stopka lewo",
    footerCenter: "Stopka środek",
    footerRight: "Stopka prawo",
    formatSimple: "1",
    formatOf: "1 / N",
    formatPageOf: "Strona 1 z N",
  },
  redact: {
    workspaceHint: "Zamaluj obszary na podglądzie i pobierz ocenzurowany PDF.",
    drawMode: "Rysuj",
    editMode: "Przesuń i rozmiar",
    drawHint: "Przytrzymaj i przeciągnij na stronie, aby dodać prostokąt.",
    drawHintMobile: "Przeciągnij po stronie — strona nie przewija się w tym trybie.",
    editHint: "Dotknij prostokąta, by go przesunąć lub zmienić rozmiar. „Rysuj” — kolejny.",
    editHintMobile: "Dotknij, przeciągnij lub zmień rozmiar. Nowy prostokąt przez „Rysuj”.",
    inkColor: "Kolor prostokąta",
    inkPreset: (id) =>
      id === "black" ? "Czarny" : id === "graphite" ? "Grafitowy" : "Ciemnoniebieski",
    boxesOnPage: (count) =>
      count === 1 ? "1 prostokąt na tej stronie" : `${count} prostokątów na tej stronie`,
    boxes: (count) => (count === 1 ? "1 prostokąt łącznie" : `${count} prostokątów łącznie`),
    clearPage: "Wyczyść stronę",
    clearAll: "Wyczyść wszystko",
    deleteSelected: "Usuń zaznaczone",
    undo: "Cofnij ostatnie",
  },
  extract: {
    workspaceHint:
      "Wybierz zakres, uruchom ekstrakcję, edytuj, kopiuj lub pobierz. Wszystko na Twoim urządzeniu.",
    modeAll: "Cały dokument",
    modePage: "Ta strona",
    modeRegion: "Obszar na stronie",
    modeHint: (mode) =>
      mode === "all"
        ? "Wszystkie strony. Najpierw warstwa tekstu, przy skanach OCR na urządzeniu."
        : mode === "page"
          ? "Tekst z wyświetlanej strony."
          : "Narysuj prostokąt, aby pobrać tylko ten fragment.",
    modeHintMobile: (mode) =>
      mode === "all"
        ? "Wszystkie strony — tekst lub OCR."
        : mode === "page"
          ? "Tylko bieżąca strona."
          : "Przeciągnij, aby zaznaczyć obszar.",
    regionHint: "Zaznacz prostokątem i naciśnij „Wyodrębnij tekst”.",
    regionHintMobile: "Przeciągnij po stronie — bez przewijania podczas zaznaczania.",
    clearRegion: "Wyczyść zaznaczenie",
    runExtract: "Wyodrębnij tekst",
    statusReading: "Odczyt warstwy tekstu…",
    statusReadingPage: (page, total) => `Odczyt tekstu (${page}/${total})…`,
    statusOcr: (percent) => `Rozpoznawanie (${percent}%)…`,
    statusOcrPage: (page, total, percent) =>
      `Rozpoznawanie — strona ${page}/${total} (${percent}%)…`,
    sourceTextLayer: "Z warstwy PDF",
    sourceOcr: "OCR (skan)",
    resultTitle: "Wyodrębniony tekst",
    empty: "W tym dokumencie nie znaleziono warstwy tekstowej.",
    emptyPlaceholder: "Tekst pojawi się tutaj. Możesz go edytować przed kopiowaniem.",
    copy: "Kopiuj",
    copied: "Skopiowano",
    downloadTxt: "Pobierz .txt",
    clearResult: "Wyczyść tekst",
    characters: (count) => `${count.toLocaleString()} znaków`,
    pagesExtracted: (count) => `Przetworzono stron: ${count}`,
  },
  dateStamp: {
    formatLabel: "Format znacznika",
    formatDate: "Data",
    formatTime: "Godzina",
    formatDateTime: "Data i godzina",
    previewLabel: "Podgląd",
    placeHint: "Dotknij lub kliknij stronę. Zaznacz znacznik, by zmienić datę lub kolor.",
    size: "Rozmiar",
    color: "Kolor",
    pickDate: "Data",
    pickTime: "Godzina",
    today: "Dziś",
    digitColor: "Kolor cyfr",
    customColor: "Własny kolor",
    editSelectedHint: "Edytujesz wybrany znacznik na dokumencie.",
    dropHint: "Upuść PDF lub obraz, wybierz datę i kolor, potem umieść na stronie.",
    invalidFile: "Wybierz plik PDF lub obraz.",
    downloadStampedPdf: "Pobierz PDF ze znacznikiem",
    downloadStampedImage: "Pobierz obraz ze znacznikiem",
  },
  protect: {
    workspaceHint: "Ustaw hasło otwarcia i pobierz zaszyfrowany PDF. Wszystko na Twoim urządzeniu.",
    lostPasswordWarning:
      "Utraconego hasła nie da się odzyskać. Przechowuj hasło w bezpiecznym miejscu.",
    passwordLabel: "Hasło otwarcia",
    passwordConfirm: "Potwierdź hasło",
    showPassword: "Pokaż hasło",
    hidePassword: "Ukryj hasło",
    strengthHint: "Siła hasła",
    strengthWeak: "Słabe",
    strengthFair: "Średnie",
    strengthGood: "Silne",
    mismatch: "Hasła się nie zgadzają.",
    minLength: "Hasło musi mieć co najmniej 4 znaki.",
    restrictionsTitle: "Ograniczenia druku i kopiowania (opcjonalnie)",
    restrictionsHint:
      "Większości wystarczy hasło otwarcia. Włącz, aby zablokować druk lub kopiowanie tekstu po otwarciu.",
    restrictPrinting: "Zablokuj drukowanie",
    restrictCopying: "Zablokuj kopiowanie tekstu",
    ownerPasswordLabel: "Hasło właściciela (opcjonalnie)",
    ownerPasswordHint:
      "Zostaw puste — ograniczenia zostaną ustawione automatycznie. Do udostępnienia wystarczy hasło otwarcia.",
    statusEncrypting: "Szyfrowanie…",
    alreadyEncrypted: "Plik jest już zaszyfrowany. Najpierw go odblokuj, potem chroń ponownie.",
    passwordEncoding:
      "Hasło zawiera znaki niedozwolone przy szyfrowaniu. Użyj prostszego lub opartego na literach łacińskich.",
  },
  unlock: {
    workspaceHint:
      "Usuń hasło otwarcia lub ograniczenia druku i kopiowania. Plik jest przetwarzany tylko na urządzeniu.",
    passwordLabel: "Hasło otwarcia lub właściciela",
    passwordPlaceholder: "Puste, jeśli nieznane",
    passwordHintEncrypted:
      "Wpisz hasło do otwarcia pliku. Działa też hasło właściciela.",
    passwordHintOpen:
      "Brak hasła otwarcia — pobierz kopię bez ograniczeń bez wpisywania hasła.",
    showPassword: "Pokaż hasło",
    hidePassword: "Ukryj hasło",
    wrongPassword: "Nieprawidłowe hasło. Sprawdź i spróbuj ponownie.",
    passwordRequired: "Ten PDF wymaga hasła otwarcia.",
    statusChecking: "Sprawdzanie zabezpieczeń…",
    statusEncrypted:
      "Wykryto hasło lub ograniczenia — wpisz hasło, jeśli plik go wymaga przy otwarciu.",
    statusNoEncryption:
      "Brak hasła otwarcia — możesz pobrać kopię bez ograniczeń bez hasła.",
    statusUnlocking: "Odblokowywanie…",
    successUnlocked: "Pobrano odblokowaną kopię.",
  },
  batchSign: {
    workspaceHint:
      "Dodaj PDF-y, utwórz podpis, umieść na podglądzie, pobierz ZIP z podpisanymi plikami.",
    filesSelected: (count) => `Wybrano plików: ${count}`,
    addFiles: "Dodaj PDF",
    clearList: "Wyczyść listę",
    removeFile: "Usuń plik",
    previewFileHint: "Dotknij nazwy, aby podejrzeć. Pozycja dotyczy wszystkich PDF w paczce.",
    pageTargetTitle: "Na której stronie podpisać",
    targetFirst: "Każdy PDF — pierwsza strona.",
    targetFirstShort: "Pierwsza",
    targetLast: "Każdy PDF — ostatnia strona.",
    targetLastShort: "Ostatnia",
    targetPage: (page) =>
      `Każdy PDF — strona ${page} (lub ostatnia, jeśli dokument jest krótszy).`,
    targetPageShort: "Numer strony",
    pageNumberLabel: "Numer strony (1 = pierwsza)",
    positionNote:
      "Przeciągnij podpis na podglądzie, by ustawić miejsce i rozmiar — to samo w każdym pliku.",
    placeHintMobile: "Dotknij stronę — bez przewijania podczas umieszczania.",
    progressStatus: (index, total, fileName) =>
      `Podpisywanie ${index}/${total}: ${fileName}`,
    zipAction: "Pobierz ZIP z podpisanymi PDF",
    zipProcessing: "Podpisywanie i pakowanie ZIP…",
    failedProtected: (name) => `${name} — chroniony hasłem. Najpierw odblokuj.`,
    failedCorrupt: (name) => `${name} — nie można odczytać PDF.`,
    failedGeneric: (name) => `${name} — podpis nie powiódł się.`,
    partialSuccess: (ok, failed) =>
      `ZIP: ${ok} podpisanych plików. Pominięto: ${failed} — lista poniżej.`,
  },
  botProtection: {
    rateLimited:
      "Poczekaj kilka sekund przed kolejnym pobraniem pliku.",
    unavailable:
      "Weryfikacja przeglądarki nie powiodła się. Odśwież stronę i spróbuj ponownie.",
  },
};
