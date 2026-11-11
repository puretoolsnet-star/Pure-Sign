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
      hint: "Narysuj, wpisz lub wgraj PNG i umieść na stronie.",
      action: "Pobierz podpisany PDF",
      errors: {
        invalid: "Wybierz plik PDF.",
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
    typePlaceholder: "Twoje imię",
    uploadPng: "Wgraj przezroczysty PNG",
    placeHint: "Kliknij stronę, aby umieścić podpis.",
    size: "Rozmiar",
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
    received: "OTRZYMANO",
    copyStamp: "KOPIA",
  },
  fillForm: {
    fieldsTitle: "Pola formularza",
    noFields:
      "Nie znaleziono pól interaktywnych. Kliknij stronę, aby dodać tekst.",
    freeTextHint: "Kliknij dokument, aby wstawić dowolny tekst.",
    textPlaceholder: "Tekst na stronie",
    flatten: "Spłaszcz pola (flatten)",
    fieldFallback: (index) => `Pole ${index}`,
  },
  pageNumbers: {
    position: "Pozycja",
    format: "Format",
    fontSize: "Rozmiar czcionki",
    margin: "Odstęp",
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
    drawHint: "Przytrzymaj i przeciągnij, aby zamazać obszar na czarno.",
    boxes: (count) => `${count} stref(y) cenzury`,
    undo: "Cofnij ostatnie",
  },
  extract: {
    resultTitle: "Wyodrębniony tekst",
    empty: "W tym dokumencie nie znaleziono warstwy tekstowej.",
    downloadTxt: "Pobierz .txt",
    pagesExtracted: (count) => `Przetworzono stron: ${count}`,
  },
  dateStamp: {
    formatLabel: "Format znacznika",
    formatDate: "Data",
    formatTime: "Godzina",
    formatDateTime: "Data i godzina",
    previewLabel: "Podgląd",
    placeHint: "Kliknij stronę, aby umieścić znacznik daty lub czasu.",
    size: "Rozmiar",
    color: "Kolor",
  },
  protect: {
    passwordLabel: "Hasło otwarcia PDF",
    passwordConfirm: "Potwierdź hasło",
    mismatch: "Hasła się nie zgadzają.",
    minLength: "Hasło musi mieć co najmniej 4 znaki.",
  },
  unlock: {
    passwordLabel: "Bieżące hasło (jeśli jest)",
    passwordHint: "Zostaw puste, jeśli PDF nie ma hasła",
    wrongPassword: "Nieprawidłowe hasło lub uszkodzony plik.",
  },
  batchSign: {
    filesSelected: (count) => `Wybrano plików: ${count}`,
    clearList: "Wyczyść listę",
    positionNote:
      "Pozycja na podglądzie dotyczy pierwszej strony każdego PDF w paczce.",
    zipAction: "Pobierz ZIP z podpisanymi PDF",
  },
  botProtection: {
    rateLimited:
      "Poczekaj kilka sekund przed kolejnym pobraniem pliku.",
    unavailable:
      "Weryfikacja przeglądarki nie powiodła się. Odśwież stronę i spróbuj ponownie.",
  },
  rewardedAd: {
    sponsored: "Wesprzyj projekt",
    title: "Pobierz gotowy dokument",
    message:
      "Krótki blok sponsora to jedyny warunek, by PureSign pozostał darmowy, w pełni prywatny i bez rejestracji oraz subskrypcji.",
    watch: "Obejrzyj wideo sponsora, aby pobrać",
    watching: "Trwa odtwarzanie sponsora…",
    download: "Pobierz plik",
    waitHint:
      "Kliknij przycisk poniżej, aby uruchomić blok Adsterra. Nie można kontynuować bez obejrzenia.",
    progress: (seconds) => `${seconds} s`,
    thanks: "Dziękujemy za wsparcie. Plik zaraz się pobierze.",
    close: "Zamknij",
    slotLabel: "Blok sponsora Adsterra",
  },
};
