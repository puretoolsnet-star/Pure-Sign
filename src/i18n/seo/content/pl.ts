import type { SeoPageContentCatalog } from "@/i18n/seo/content-types";

export const pl: SeoPageContentCatalog = {
  home: {
    heading: "Podpisuj PDF online bez wysyłania plików na serwer",
    intro:
      "PureSign to darmowy signer PDF i przestrzeń podpisu elektronicznego w przeglądarce. Narysuj podpis, wgraj PNG, pieczętuj, wypełnij formularz lub zaszyfruj plik lokalnie — bez konta i bez wysyłania dokumentu.",
    benefitsHeading: "Dlaczego podpisywać lokalnie w przeglądarce",
    benefits: [
      {
        title: "Plik nie opuszcza urządzenia",
        text: "Podpis, pieczęcie, formularze i szyfrowanie działają w przeglądarce. PureSign nie odbiera, nie przechowuje ani nie przesyła Twoich PDF.",
      },
      {
        title: "Darmowy podpis elektroniczny bez znaku wodnego",
        text: "Narysuj podpis, wpisz imię lub wgraj obraz i umieść go na dowolnej stronie — bez rejestracji.",
      },
      {
        title: "Pełny prywatny zestaw narzędzi PDF",
        text: "Stemple, data i godzina, formularze, numeracja, cenzura, wyodrębnianie tekstu, hasło i podpis wsadowy.",
      },
    ],
    sections: [
      {
        heading: "Podpisy i stemple",
        text: "Podpisz PDF, dodaj pieczęć Opłacono lub Zgodnie z oryginałem albo umieść bieżącą datę i godzinę — wizualnie na podglądzie strony.",
      },
      {
        heading: "Formularze i układ",
        text: "Wypełniaj pola AcroForm, numeruj strony, dodawaj nagłówki lub stopki i zamazuj poufny tekst przed udostępnieniem pliku.",
      },
      {
        heading: "Analiza i bezpieczeństwo",
        text: "Wyodrębnij kopiowalny tekst, zaszyfruj PDF hasłem otwarcia lub usuń hasło, które już znasz — również w pełni lokalnie.",
      },
      {
        heading: "Podpis wsadowy",
        text: "Nałóż jeden podpis na wiele PDF i pobierz ZIP. Masowe podpisywanie zostaje w przeglądarce, tak jak signer jednego pliku.",
      },
    ],
    faqHeading: "Częste pytania",
    faq: [
      {
        question: "Czy mogę podpisać PDF online za darmo?",
        answer:
          "Tak. Wszystkie narzędzia są darmowe w przeglądarce. Nie ma rejestracji, subskrypcji ani znaku wodnego na podpisanym PDF.",
      },
      {
        question: "Czy wysyłacie dokumenty na serwer?",
        answer:
          "Nie. Podpisywanie PDF i pozostałe narzędzia działają lokalnie na Twoim urządzeniu. Pliki nie są wysyłane na serwer PureSign do przetwarzania.",
      },
      {
        question: "Jakie narzędzia podpisu są dostępne?",
        answer:
          "Możesz narysować podpis, wpisać imię lub wgrać PNG i umieścić je na PDF. Osobno są stemple, stempel daty i podpis kilku plików naraz.",
      },
      {
        question: "W jakich językach działa witryna?",
        answer:
          "PureSign jest dostępny po polsku, angielsku, ukraińsku, niemiecku, francusku i hiszpańsku. Każde narzędzie ma zlokalizowaną stronę.",
      },
    ],
  },
  sign: {
    heading: "Podpisz PDF online za darmo — narysuj lub wgraj podpis elektroniczny",
    intro:
      "Podpisz PDF w przeglądarce bez konta. Narysuj podpis odręczny, wpisz imię lub wgraj cyfrowy PNG, umieść go na stronie i pobierz plik. Dokument zostaje na Twoim urządzeniu.",
    benefitsHeading: "Jak dodać podpis elektroniczny",
    benefits: [
      {
        title: "Rysowanie podpisu",
        text: "Pisz myszą, touchpadem lub palcem na padzie, potem kliknij podgląd PDF, aby umieścić znak.",
      },
      {
        title: "Wgranie podpisu cyfrowego",
        text: "Zaimportuj PNG istniejącego podpisu lub pieczęci — najlepiej z przezroczystym tłem — i ustaw go jak mokry tusz.",
      },
      {
        title: "Bez serwera i bez konta",
        text: "Umieszczanie, skalowanie i eksport działają lokalnie. Zamknięcie karty usuwa plik, jeśli nie pobrałeś wyniku.",
      },
    ],
    sections: [
      {
        heading: "Rysowanie podpisu na PDF",
        text: "Otwórz kartę rysowania, podpisz się na padzie i dotknij podglądu strony. Możesz dodać kilka znaków i przesunąć każdy przed pobraniem.",
      },
      {
        heading: "Wgranie podpisu cyfrowego",
        text: "W karcie obrazu wczytaj PNG. Zeskanowany podpis lub pieczęć firmy trafia w zwykłe miejsce podpisu.",
      },
      {
        heading: "Podpisanie PDF i pobranie",
        text: "Zmień rozmiar podpisu, w razie potrzeby zmień stronę i zapisz nowy PDF. Oryginał nie jest nadpisywany, dopóki nie zachowasz pobrania.",
      },
    ],
    faqHeading: "FAQ podpisu PDF",
    faq: [
      {
        question: "Jak podpisać PDF online za darmo?",
        answer:
          "Upuść PDF w narzędziu, narysuj lub wgraj podpis, kliknij stronę, aby go umieścić, i pobierz. Konto nie jest potrzebne; przetwarzanie odbywa się w przeglądarce.",
      },
      {
        question: "Czy mogę wgrać istniejący podpis cyfrowy?",
        answer:
          "Tak. Wybierz opcję obrazu i plik PNG. Obraz jest odczytywany lokalnie; nie jest wysyłany na nasze serwery.",
      },
      {
        question: "Czy to kwalifikowany podpis elektroniczny (QES)?",
        answer:
          "Nie. PureSign umieszcza wizualny / zwykły podpis elektroniczny (SES) na PDF. Nie wydaje kwalifikowanego certyfikatu eIDAS. Gdy prawo wymaga QES, skorzystaj z kwalifikowanego dostawcy.",
      },
      {
        question: "Czy PDF opuszcza komputer?",
        answer:
          "Nie. Rysowanie, wgranie PNG, umieszczenie podpisu i eksport odbywają się lokalnie w przeglądarce.",
      },
    ],
  },
  stamp: {
    heading: "Stempel i pieczęć PDF bez wysyłania pliku",
    intro:
      "Nakładaj przezroczyste stemple Opłacono, Zgodnie z oryginałem, Poufne lub własny tekst na PDF. Pieczęć widać na podglądzie i jest spłaszczana lokalnie w przeglądarce.",
    benefitsHeading: "Stemple, które zostają prywatne",
    benefits: [
      {
        title: "Gotowe pieczęcie",
        text: "Nakładaj typowe stemple biurowe jednym kliknięciem, potem przesuwaj i skaluj je na stronie.",
      },
      {
        title: "Własny tekst stempla",
        text: "Wpisz dział, oznaczenie kopii lub wiersz akceptacji z przezroczystym tłem.",
      },
      {
        title: "Lokalne przetwarzanie PDF",
        text: "Dokument nie idzie na serwer. Nowy PDF ze stemplem pobierasz z tego urządzenia.",
      },
    ],
    sections: [
      {
        heading: "Stemple biurowe na PDF",
        text: "Użyj Opłacono, Zatwierdzono, Odebrano lub Poufne, gdy potrzebny jest czytelny status na skanie lub dokumencie cyfrowym.",
      },
      {
        heading: "Zgodność z oryginałem i własne pieczęcie",
        text: "Umieść stempel poświadczonej kopii lub napisz własną pieczęć i ustaw ją przy nagłówku lub bloku podpisu.",
      },
    ],
    faqHeading: "FAQ stempla PDF",
    faq: [
      {
        question: "Czy mogę ostemplować PDF online za darmo?",
        answer:
          "Tak. Wybierz szablon lub własny tekst, kliknij stronę i pobierz. Rejestracja nie jest potrzebna.",
      },
      {
        question: "Czy stempel ma przezroczyste tło?",
        answer:
          "Tak. Szablony i własny tekst rysowane są z przezroczystym tłem, więc treść PDF pozostaje czytelna.",
      },
      {
        question: "Czy plik jest wysyłany, aby go ostemplować?",
        answer:
          "Nie. Stempel nakłada się w przeglądarce. PDF zostaje na urządzeniu, dopóki nie pobierzesz wyniku.",
      },
      {
        question: "Czy mogę użyć własnego sformułowania?",
        answer:
          "Tak. Przełącz na własny tekst, wpisz pieczęć i umieść ją jak każdy inny stempel.",
      },
    ],
  },
  "date-stamp": {
    heading: "Stempel daty lub czasu na PDF w przeglądarce",
    intro:
      "Umieść bieżącą datę, godzinę lub oba na dowolnej stronie PDF. Stempel powstaje lokalnie z zegara urządzenia i nie wymaga serwera.",
    benefitsHeading: "Stempel daty bez wysyłania pliku",
    benefits: [
      {
        title: "Data, czas lub oba",
        text: "Wybierz format i kliknij podgląd, aby zostawić czytelną znacznik na stronie.",
      },
      {
        title: "Rozmiar i kolor na stronie",
        text: "Dopasuj rozmiar i kolor do pola formularza, stopki lub wiersza „otrzymano”.",
      },
      {
        title: "Prywatność domyślnie",
        text: "PDF nie jest nigdzie wysyłany. Nowy plik eksportujesz z tej samej karty przeglądarki.",
      },
    ],
    sections: [
      {
        heading: "Oznaczyć otrzymany dokument",
        text: "Umieść datę lub datę i godzinę na poczcie, fakturach lub podpisanych kopiach, gdy potrzebny jest widoczny znacznik odbioru.",
      },
      {
        heading: "Data na PDF bez opuszczania urządzenia",
        text: "Ponieważ stempel powstaje w przeglądarce, poufne pliki można datować bez internetowego konwertera.",
      },
    ],
    faqHeading: "FAQ stempla daty PDF",
    faq: [
      {
        question: "Jak dodać dzisiejszą datę na PDF?",
        answer:
          "Otwórz stempel daty, wybierz datę, czas lub oba, kliknij stronę i pobierz. Wartość pochodzi z zegara urządzenia.",
      },
      {
        question: "Czy mogę stemplem oznaczyć też godzinę?",
        answer:
          "Tak. Przed umieszczeniem przełącz format na sam czas albo na połączoną datę i godzinę.",
      },
      {
        question: "Czy plik jest wysyłany wraz ze znacznikiem czasu?",
        answer:
          "Nie. Znacznik rysowany jest lokalnie. PureSign nie otrzymuje PDF.",
      },
      {
        question: "Czy mogę przesunąć stempel po umieszczeniu?",
        answer:
          "Tak. Nakładki można przesuwać i skalować na podglądzie przed eksportem PDF.",
      },
    ],
  },
  "fill-form": {
    heading: "Wypełnianie formularzy PDF online bez wysyłania pliku",
    intro:
      "Wypełniaj interaktywne pola AcroForm w przeglądarce albo dodaj dowolny tekst, gdy PDF nie ma pól. Wypełnianie jest lokalne — formularz nie trafia na serwer.",
    benefitsHeading: "Wypełnianie formularzy na urządzeniu",
    benefits: [
      {
        title: "Interaktywne pola PDF",
        text: "Wykryte pola AcroForm wypełniasz na miejscu, potem są spłaszczane w pobranym pliku.",
      },
      {
        title: "Dowolny tekst, gdy nie ma pól",
        text: "Skany i płaskie PDF też działają: wpisz wiersz i umieść go w lukę.",
      },
      {
        title: "Bez konta",
        text: "Otwórz, wypełnij, pobierz. Po zamknięciu karty nic nie zostaje zapisane.",
      },
    ],
    sections: [
      {
        heading: "Wypełnić AcroForm w przeglądarce",
        text: "Jeśli PDF ma pola formularza, pojawiają się na liście, aby lokalnie wpisać imiona, daty i odpowiedzi.",
      },
      {
        heading: "Dodać tekst na płaski PDF",
        text: "Gdy dokument to tylko skan, umieść nakładki tekstu na stronie zamiast drukować i skanować ponownie.",
      },
    ],
    faqHeading: "FAQ formularzy PDF",
    faq: [
      {
        question: "Czy mogę wypełnić formularz PDF za darmo?",
        answer:
          "Tak. Upuść plik, wypełnij pola lub tekst i pobierz. Rejestracja nie jest potrzebna.",
      },
      {
        question: "Co, jeśli mój PDF nie ma pól formularza?",
        answer:
          "Dodaj nakładki dowolnego tekstu i umieść je na stronie. To pokrywa skany i spłaszczone dokumenty.",
      },
      {
        question: "Czy przechowujecie wpisane odpowiedzi?",
        answer:
          "Nie. Wartości pól zostają w przeglądarce. Do PDF trafiają dopiero przy pobraniu.",
      },
      {
        question: "Czy formularz jest wysyłany, aby go wypełnić?",
        answer:
          "Nie. Odczyt pól i zapis wypełnionego PDF odbywa się na Twoim urządzeniu.",
      },
    ],
  },
  "page-numbers": {
    heading: "Numeracja stron i nagłówki PDF w przeglądarce",
    intro:
      "Ponumeruj wszystkie strony albo dodaj nagłówek i stopkę lokalnie. Wybierz pozycję i format, potem pobierz nowy PDF — oryginał nie jest wysyłany na serwer.",
    benefitsHeading: "Numery stron bez wysyłania",
    benefits: [
      {
        title: "Nagłówki i stopki",
        text: "Umieszczaj numery po lewej, na środku lub po prawej w pasie nagłówka albo stopki.",
      },
      {
        title: "Elastyczne formaty",
        text: "Prosty numer, n z N albo etykieta „Strona n z N” jak w dokumentach biurowych.",
      },
      {
        title: "Lokalny eksport",
        text: "Numeracja rysowana jest w przeglądarce. Prywatna kopia zostaje na tym urządzeniu.",
      },
    ],
    sections: [
      {
        heading: "Ponumerować umowę lub raport",
        text: "Dodaj spójne numery stron przed podpisem, drukiem lub archiwizacją wielostronicowego PDF.",
      },
      {
        heading: "Nagłówki bez edytora desktopowego",
        text: "Ustaw margines i rozmiar czcionki w przeglądarce, bez instalacji dodatkowego oprogramowania PDF.",
      },
    ],
    faqHeading: "FAQ numeracji PDF",
    faq: [
      {
        question: "Jak dodać numery stron do PDF za darmo?",
        answer:
          "Wybierz pozycję i format, zastosuj numerację i pobierz. Narzędzie działa lokalnie w przeglądarce.",
      },
      {
        question: "Czy jest format „Strona 1 z 10”?",
        answer:
          "Tak. Wybierz format z całkowitą liczbą stron i wyeksportuj PDF.",
      },
      {
        question: "Czy nagłówki są wysyłane wraz z dokumentem?",
        answer:
          "Nie. Nagłówki, stopki i numery stron zapisywane są lokalnie. Plik nie trafia na serwer.",
      },
      {
        question: "Czy numeracja zasłoni treść?",
        answer:
          "Sam sterujesz pozycją i marginesem, żeby numery siedziały w pasie nagłówka lub stopki, a nie na tekście głównym.",
      },
    ],
  },
  redact: {
    heading: "Cenzura PDF lokalnie — zamazuj tekst w przeglądarce",
    intro:
      "Ukryj poufne imiona, numery lub akapity czarnymi prostokątami, zanim udostępnisz plik. Redakcja działa na urządzeniu; PDF nie jest wysyłany do cenzury.",
    benefitsHeading: "Prywatna redakcja na urządzeniu",
    benefits: [
      {
        title: "Rysowanie czarnych pól",
        text: "Przeciągnij na podglądzie strony, aby zakryć obszar, którego nie wolno odczytać.",
      },
      {
        title: "Cofnięcie przed eksportem",
        text: "Usuń pole, jeśli zakryłeś za dużo, i pobierz dopiero gdy strona wygląda dobrze.",
      },
      {
        title: "Bez przetwarzania u osób trzecich",
        text: "Wrażliwe strony nie opuszczają przeglądarki — po to jest lokalna cenzura.",
      },
    ],
    sections: [
      {
        heading: "Zamazanie danych osobowych",
        text: "Zakryj numery kont, adresy lub dane medyczne na skanie, zanim wyślesz PDF.",
      },
      {
        heading: "Cenzura bez pakietu biurowego",
        text: "Nie potrzeba Adobe Acrobat ani edytora desktopowego — pola są spłaszczane w pobranym pliku.",
      },
    ],
    faqHeading: "FAQ cenzury PDF",
    faq: [
      {
        question: "Czy mogę ocenzurować PDF online za darmo?",
        answer:
          "Tak. Narysuj czarne prostokąty na podglądzie i pobierz. Nie ma konta ani kolejki na serwerze.",
      },
      {
        question: "Czy ukryty tekst naprawdę znika?",
        answer:
          "Narzędzie maluje nieprzezroczyste pola na stronie i eksportuje nowy PDF. Dla pewności nie udostępniaj też oryginału bez cenzury.",
      },
      {
        question: "Czy widzicie dokument, który cenzuruję?",
        answer:
          "Nie. Pola rysowane są w przeglądarce. PureSign nie otrzymuje PDF.",
      },
      {
        question: "Czy mogę zamazać kilka miejsc na jednej stronie?",
        answer:
          "Tak. Dodaj tyle pól, ile trzeba, cofnij ostatnie w razie potrzeby i wyeksportuj.",
      },
    ],
  },
  "extract-text": {
    heading: "Wyodrębnij tekst z PDF lokalnie w przeglądarce",
    intro:
      "Skopiuj zaznaczalny tekst z PDF bez chmurowego OCR. Wyodrębnianie działa na urządzeniu, więc dokument nie jest wysyłany do rozpoznawania.",
    benefitsHeading: "Wyodrębnianie tekstu bez serwera",
    benefits: [
      {
        title: "Kopiowanie w jednym kroku",
        text: "Wczytaj PDF, odczytaj wyodrębniony tekst, skopiuj go lub pobierz plik .txt.",
      },
      {
        title: "Bez konta OCR",
        text: "Wbudowany tekst PDF jest czytany lokalnie. Skan-obraz bez warstwy tekstu może nic nie dać.",
      },
      {
        title: "Dokumenty zostają prywatne",
        text: "Umowy i listy nie idą do API rozpoznawania.",
      },
    ],
    sections: [
      {
        heading: "Kopiować tekst PDF bez wysyłania",
        text: "Przydatne, gdy potrzebujesz cytatu, adresu lub klauzuli z cyfrowego PDF i nie chcesz strony-konwertera.",
      },
      {
        heading: "Czego to narzędzie nie robi",
        text: "Nie uruchamia chmurowego OCR. Jeśli skan nie ma warstwy tekstu, użyj osobnego OCR — ten extractor nie wymyśli tekstu z pikseli.",
      },
    ],
    faqHeading: "FAQ wyodrębniania tekstu PDF",
    faq: [
      {
        question: "Jak skopiować tekst z PDF za darmo?",
        answer:
          "Upuść plik, poczekaj na lokalny odczyt, potem skopiuj wynik lub pobierz plik tekstowy.",
      },
      {
        question: "Czy PDF jest wysyłany, aby wyodrębnić tekst?",
        answer:
          "Nie. Tekst jest czytany w przeglądarce ze struktury PDF. Plik nie trafia na serwer.",
      },
      {
        question: "Czy zadziała na sfotografowanej stronie?",
        answer:
          "Tylko jeśli PDF ma już warstwę tekstu. Zdjęcia i skany bez OCR zwykle nie mają nic do wyodrębnienia.",
      },
      {
        question: "Czy mogę zachować kopię .txt?",
        answer:
          "Tak. Pobierz wyodrębniony tekst po zakończeniu lokalnego odczytu.",
      },
    ],
  },
  "protect-pdf": {
    heading: "Zabezpiecz PDF hasłem w przeglądarce",
    intro:
      "Zaszyfruj PDF hasłem otwarcia, nie wysyłając pliku na serwer. Hasło jest stosowane lokalnie i nie jest przechowywane przez PureSign.",
    benefitsHeading: "Lokalne szyfrowanie PDF",
    benefits: [
      {
        title: "Ustaw hasło otwarcia",
        text: "Wybierz hasło, potwierdź je i pobierz zablokowany PDF, który pyta o nie przed wyświetleniem.",
      },
      {
        title: "Nic nie jest przechowywane",
        text: "Nie zatrzymujemy hasła ani dokumentu. Oba istnieją tylko w tej sesji przeglądarki.",
      },
      {
        title: "Za darmo i bez konta",
        text: "Zabezpiecz plik w jednym przebiegu — przydatne przed wysłaniem umowy lub skanu dokumentu tożsamości.",
      },
    ],
    sections: [
      {
        heading: "Zablokować PDF przed wysłaniem",
        text: "Zaszyfruj pobranie, a hasło przekaż innym kanałem, żeby załącznik nie był domyślnie czytelny w drodze.",
      },
      {
        heading: "Szyfrowanie zostaje na urządzeniu",
        text: "Szyfr jest stosowany w przeglądarce. Nie ma kroku wysyłki, który ujawniłby niechroniony oryginał.",
      },
    ],
    faqHeading: "FAQ hasła PDF",
    faq: [
      {
        question: "Czy mogę zaszyfrować PDF online za darmo?",
        answer:
          "Tak. Wpisz i potwierdź hasło otwarcia, potem pobierz chroniony plik. Konto nie jest potrzebne.",
      },
      {
        question: "Czy przechowujecie moje hasło?",
        answer:
          "Nie. Hasło służy lokalnie do szyfrowania pliku i nie jest wysyłane do PureSign.",
      },
      {
        question: "Co, jeśli zapomnę hasła?",
        answer:
          "Nie możemy go odzyskać. Zachowaj kopię hasła albo niechronionego oryginału w bezpiecznym miejscu.",
      },
      {
        question: "Czy PDF jest wysyłany, aby go zablokować?",
        answer:
          "Nie. Szyfrowanie działa w przeglądarce na Twoim urządzeniu.",
      },
    ],
  },
  "unlock-pdf": {
    heading: "Odblokuj PDF lokalnie, jeśli znasz hasło",
    intro:
      "Usuń hasło otwarcia lub ograniczenia druku w przeglądarce. Hasło musisz już znać — to nie jest usługa łamania, a plik nie jest wysyłany.",
    benefitsHeading: "Prywatne odblokowywanie PDF",
    benefits: [
      {
        title: "Otworzyć własny plik",
        text: "Wpisz znane hasło, aby zapisać odblokowaną kopię do edycji lub druku.",
      },
      {
        title: "Bez brute-force i bez wysyłki",
        text: "Narzędzie odszyfrowuje tylko hasłem, które podajesz, lokalnie. Nie zgaduje haseł.",
      },
      {
        title: "Zostaje na urządzeniu",
        text: "Chroniony PDF nie opuszcza karty przeglądarki.",
      },
    ],
    sections: [
      {
        heading: "Usunąć hasło, które już znasz",
        text: "Przydatne, gdy dostałeś zablokowany PDF i masz hasło, ale potrzebujesz kopii otwieranej bez pytania.",
      },
      {
        heading: "To nie narzędzie do łamania haseł",
        text: "Jeśli hasła nie znasz, PureSign nie odblokuje pliku. Ten limit jest zamierzony.",
      },
    ],
    faqHeading: "FAQ odblokowywania PDF",
    faq: [
      {
        question: "Czy mogę usunąć hasło PDF online?",
        answer:
          "Tylko jeśli już znasz hasło otwarcia. Wpisz je lokalnie i pobierz odblokowaną kopię. Nie łamiemy haseł.",
      },
      {
        question: "Czy zablokowany PDF jest wysyłany?",
        answer:
          "Nie. Odszyfrowanie działa w przeglądarce. Plik zostaje na urządzeniu.",
      },
      {
        question: "Co się stanie przy złym haśle?",
        answer:
          "Odblokowanie się nie uda, oryginalny chroniony plik pozostaje bez zmian. Spróbuj poprawnego hasła; nie ma maila resetującego.",
      },
      {
        question: "Czy możecie odzyskać zapomniane hasło?",
        answer:
          "Nie. PureSign nie widzi pliku ani hasła, więc po naszej stronie nie ma czego odzyskiwać.",
      },
    ],
  },
  "batch-sign": {
    heading: "Podpis wsadowy PDF online — jeden podpis, wiele plików",
    intro:
      "Nałóż ten sam narysowany, wpisany lub wgrany podpis na kilka PDF i pobierz ZIP. Masowe podpisywanie działa w przeglądarce; dokumenty nie są wysyłane na serwer.",
    benefitsHeading: "Lokalny masowy podpis elektroniczny",
    benefits: [
      {
        title: "Jeden znak, wiele PDF",
        text: "Przygotuj podpis raz, dodaj kilka plików i wyeksportuj ZIP podpisanych kopii.",
      },
      {
        title: "Rysowanie lub wgranie",
        text: "Te same opcje co przy jednym pliku: pad, wpisane imię lub PNG.",
      },
      {
        title: "Prywatne przetwarzanie wsadowe",
        text: "Paczka umów lub formularzy HR nie opuszcza tego urządzenia podczas podpisywania.",
      },
    ],
    sections: [
      {
        heading: "Podpisać folder PDF",
        text: "Podpis wsadowy sprawdza się, gdy każdy plik potrzebuje tego samego wizualnego podpisu w podobnym miejscu — potem pobierasz ZIP.",
      },
      {
        heading: "Nadal w pełni po stronie klienta",
        text: "Wiele plików nie zmienia modelu prywatności: każdy PDF jest podpisywany lokalnie, potem pakowany w przeglądarce.",
      },
    ],
    faqHeading: "FAQ podpisu wsadowego PDF",
    faq: [
      {
        question: "Czy mogę podpisać wiele PDF naraz za darmo?",
        answer:
          "Tak. Dodaj kilka plików, przygotuj jeden podpis, umieść go i pobierz ZIP. Konto nie jest potrzebne.",
      },
      {
        question: "Czy pliki są wysyłane do podpisu wsadowego?",
        answer:
          "Nie. Każdy PDF jest przetwarzany w przeglądarce. PureSign nie otrzymuje dokumentów.",
      },
      {
        question: "Czy dostanę osobne podpisane pliki?",
        answer:
          "Tak. Pobranie to archiwum ZIP z podpisaną kopią każdego wybranego PDF.",
      },
      {
        question: "Czy mogę i narysować, i wgrać podpis?",
        answer:
          "Tak. Podpis wsadowy używa tych samych opcji rysowania, wpisywania i obrazu co signer jednego PDF.",
      },
    ],
  },
};
