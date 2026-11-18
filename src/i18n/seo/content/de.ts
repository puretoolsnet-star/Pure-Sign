import type { SeoPageContentCatalog } from "@/i18n/seo/content-types";

export const de: SeoPageContentCatalog = {
  home: {
    heading: "PDFs online unterschreiben, ohne sie auf einen Server zu senden",
    intro:
      "PureSign ist ein kostenloser PDF-Signer und e-Signatur-Arbeitsbereich im Browser. Unterschrift zeichnen, PNG laden, stempeln, Formulare ausfüllen oder verschlüsseln — lokal, ohne Konto und ohne Datei-Upload.",
    benefitsHeading: "Warum lokal im Browser signieren",
    benefits: [
      {
        title: "Die Datei verlässt das Gerät nicht",
        text: "Signatur, Stempel, Formulare und Verschlüsselung laufen im Browser. PureSign empfängt, speichert oder überträgt Ihre PDFs nicht.",
      },
      {
        title: "Kostenlose e-Signatur ohne Wasserzeichen",
        text: "Zeichnen Sie eine Unterschrift, tippen Sie einen Namen oder laden Sie ein Signaturbild und platzieren Sie es auf jeder Seite — ohne Registrierung.",
      },
      {
        title: "Vollständiges privates PDF-Toolkit",
        text: "Stempel, Datum/Uhrzeit, Formulare, Seitenzahlen, Schwärzen, Textextrakt, Passwortschutz und Stapelsignatur.",
      },
    ],
    sections: [
      {
        heading: "Unterschriften und Stempel",
        text: "PDF signieren, Siegel wie Bezahlt oder Kopie der Urschrift setzen oder einen aktuellen Datums-/Zeitstempel visuell auf der Seitenvorschau platzieren.",
      },
      {
        heading: "Formulare und Layout",
        text: "Interaktive AcroForm-Felder ausfüllen, Seiten nummerieren, Kopf- und Fußzeilen setzen und vertraulichen Text schwärzen, bevor Sie die Datei teilen.",
      },
      {
        heading: "Analyse und Sicherheit",
        text: "Kopierbaren Text extrahieren, ein PDF mit Öffnungspasswort verschlüsseln oder ein bekanntes Passwort entfernen — ebenfalls vollständig lokal.",
      },
      {
        heading: "Stapelsignatur",
        text: "Eine Signatur auf mehrere PDFs anwenden und ein ZIP herunterladen. Die Massensignatur bleibt im Browser, wie der Einzeldatei-Signer.",
      },
    ],
    faqHeading: "Häufige Fragen",
    faq: [
      {
        question: "Kann ich ein PDF online kostenlos unterschreiben?",
        answer:
          "Ja. Alle Tools sind im Browser kostenlos. Es gibt keine Registrierung, kein Abo und kein Wasserzeichen auf dem signierten PDF.",
      },
      {
        question: "Laden Sie meine Dokumente auf einen Server hoch?",
        answer:
          "Nein. PDF-Signatur und die anderen Tools laufen lokal auf Ihrem Gerät. Dateien werden nicht zur Verarbeitung an einen PureSign-Server gesendet.",
      },
      {
        question: "Welche Signatur-Tools gibt es?",
        answer:
          "Sie können eine Unterschrift zeichnen, einen Namen tippen oder ein PNG laden und auf ein PDF setzen. Zusätzlich gibt es Stempel, Datumsstempel und Stapelsignatur mehrerer Dateien.",
      },
      {
        question: "In welchen Sprachen ist die Seite verfügbar?",
        answer:
          "PureSign gibt es auf Deutsch, Englisch, Ukrainisch, Französisch, Spanisch und Polnisch. Jedes Tool hat eine passende lokalisierte Seite.",
      },
    ],
  },
  sign: {
    heading: "PDF online kostenlos unterschreiben — Zeichnen oder Signatur hochladen",
    intro:
      "Unterschreiben Sie ein PDF im Browser ohne Konto. Zeichnen Sie eine handschriftliche Unterschrift, tippen Sie Ihren Namen oder laden Sie ein PNG, platzieren Sie es auf der Seite und laden Sie die Datei herunter. Das Dokument bleibt auf Ihrem Gerät.",
    benefitsHeading: "So fügen Sie eine e-Signatur hinzu",
    benefits: [
      {
        title: "Unterschrift zeichnen",
        text: "Schreiben Sie mit Maus, Trackpad oder Touch auf dem Signaturpad und klicken Sie dann auf die PDF-Vorschau.",
      },
      {
        title: "Digitale Signatur hochladen",
        text: "Importieren Sie ein PNG einer vorhandenen Unterschrift oder eines Siegels — ideal mit transparentem Hintergrund — und setzen Sie es wie nasse Tinte.",
      },
      {
        title: "Kein Server, kein Konto",
        text: "Platzieren, Skalieren und Export laufen lokal. Das Schließen des Tabs verwirft die Datei, sofern Sie das Ergebnis nicht heruntergeladen haben.",
      },
    ],
    sections: [
      {
        heading: "Unterschrift auf ein PDF zeichnen",
        text: "Öffnen Sie den Zeichen-Tab, unterschreiben Sie auf dem Pad und tippen Sie auf die Seitenvorschau. Sie können mehrere Marken setzen und vor dem Download verschieben.",
      },
      {
        heading: "Digitale Signatur hochladen",
        text: "Laden Sie im Bild-Tab ein PNG. Eine gescannte Unterschrift oder ein Firmensiegel sitzt an der üblichen Signaturzeile.",
      },
      {
        heading: "PDF signieren und herunterladen",
        text: "Skalieren Sie die Unterschrift, wechseln Sie bei Bedarf die Seite und speichern Sie ein neues PDF. Das Original wird nicht überschrieben, bis Sie den Download behalten.",
      },
    ],
    faqHeading: "FAQ zur PDF-Unterschrift",
    faq: [
      {
        question: "Wie unterschreibe ich ein PDF online kostenlos?",
        answer:
          "Ziehen Sie ein PDF in den Signer, zeichnen oder laden Sie eine Unterschrift, klicken Sie auf die Seite und laden Sie herunter. Kein Konto nötig, die Verarbeitung läuft im Browser.",
      },
      {
        question: "Kann ich eine vorhandene digitale Signatur hochladen?",
        answer:
          "Ja. Wählen Sie die Bildoption und eine PNG-Datei. Das Bild wird lokal gelesen und nicht auf unsere Server hochgeladen.",
      },
      {
        question: "Ist das eine qualifizierte elektronische Signatur (QES)?",
        answer:
          "Nein. PureSign setzt eine visuelle / einfache elektronische Signatur (SES) auf das PDF. Es wird kein qualifiziertes Zertifikat nach eIDAS ausgestellt. Nutzen Sie einen qualifizierten Vertrauensdiensteanbieter, wenn das Gesetz QES verlangt.",
      },
      {
        question: "Verlässt mein PDF den Computer?",
        answer:
          "Nein. Zeichnen, PNG-Import, Platzieren der Unterschrift und Export geschehen lokal im Browser.",
      },
    ],
  },
  stamp: {
    heading: "PDF-Stempel und Siegel ohne Datei-Upload",
    intro:
      "Setzen Sie transparente Stempel wie Bezahlt, Kopie der Urschrift, Vertraulich oder eigenen Text auf ein PDF. Das Siegel liegt auf der Seitenvorschau und wird lokal im Browser eingefügt.",
    benefitsHeading: "Stempel, die privat bleiben",
    benefits: [
      {
        title: "Fertige Siegel",
        text: "Übliche Bürostempel mit einem Klick setzen, danach auf der Seite verschieben und skalieren.",
      },
      {
        title: "Eigener Stempeltext",
        text: "Geben Sie eine Abteilung, einen Kopie-Vermerk oder eine Freigabezeile mit transparentem Hintergrund ein.",
      },
      {
        title: "Lokale PDF-Verarbeitung",
        text: "Das Dokument geht nicht auf einen Server. Sie laden ein neues gestempeltes PDF von diesem Gerät.",
      },
    ],
    sections: [
      {
        heading: "Bürostempel auf einem PDF",
        text: "Nutzen Sie Bezahlt, Genehmigt, Empfangen oder Vertraulich, wenn ein klarer Status auf Scan oder Digitaldokument nötig ist.",
      },
      {
        heading: "Beglaubigte Kopie und eigene Siegel",
        text: "Setzen Sie einen Stempel „Kopie der Urschrift“ oder schreiben Sie ein eigenes Siegel und platzieren Sie es am Briefkopf oder Signaturblock.",
      },
    ],
    faqHeading: "FAQ zum PDF-Stempel",
    faq: [
      {
        question: "Kann ich ein PDF online kostenlos stempeln?",
        answer:
          "Ja. Wählen Sie eine Vorlage oder eigenen Text, klicken Sie auf die Seite und laden Sie herunter. Keine Registrierung.",
      },
      {
        question: "Hat der Stempel einen transparenten Hintergrund?",
        answer:
          "Ja. Vorlagen und eigene Stempel werden mit transparentem Hintergrund gezeichnet, der PDF-Text bleibt lesbar.",
      },
      {
        question: "Wird die Datei zum Stempeln hochgeladen?",
        answer:
          "Nein. Das Stempeln läuft im Browser. Das PDF bleibt auf dem Gerät, bis Sie das Ergebnis herunterladen.",
      },
      {
        question: "Kann ich eigenen Wortlaut verwenden?",
        answer:
          "Ja. Wechseln Sie zu eigenem Text, geben Sie das Siegel ein und platzieren Sie es wie jeden anderen Stempel.",
      },
    ],
  },
  "date-stamp": {
    heading: "Datums- oder Zeitstempel auf ein PDF im Browser",
    intro:
      "Setzen Sie ein aktuelles Datum, eine Uhrzeit oder beides auf jede PDF-Seite. Der Stempel entsteht lokal aus der Geräteuhr und braucht keinen Server.",
    benefitsHeading: "Datumsstempel ohne Upload",
    benefits: [
      {
        title: "Datum, Zeit oder beides",
        text: "Wählen Sie das Format und klicken Sie auf die Vorschau, um eine lesbare Marke zu setzen.",
      },
      {
        title: "Größe und Farbe auf der Seite",
        text: "Passen Sie Größe und Farbe an ein Formularfeld, eine Fußzeile oder eine Empfangszeile an.",
      },
      {
        title: "Privat standardmäßig",
        text: "Das PDF wird nirgendwohin gesendet. Sie exportieren eine neue Datei aus demselben Browser-Tab.",
      },
    ],
    sections: [
      {
        heading: "Eingangsdokument zeitstempeln",
        text: "Setzen Sie Datum oder Datum/Uhrzeit auf Post, Rechnungen oder signierte Kopien, wenn ein sichtbarer Empfangsvermerk nötig ist.",
      },
      {
        heading: "PDF datieren, ohne das Gerät zu verlassen",
        text: "Weil der Stempel im Browser entsteht, können vertrauliche Dateien ohne Online-Konverter datiert werden.",
      },
    ],
    faqHeading: "FAQ zum PDF-Datumsstempel",
    faq: [
      {
        question: "Wie setze ich das heutige Datum auf ein PDF?",
        answer:
          "Öffnen Sie den Datumsstempel, wählen Sie Datum, Zeit oder beides, klicken Sie auf die Seite und laden Sie herunter. Der Wert kommt von der Geräteuhr.",
      },
      {
        question: "Kann ich auch die Uhrzeit stempeln?",
        answer:
          "Ja. Stellen Sie das Format auf nur Zeit oder auf kombiniertes Datum und Uhrzeit, bevor Sie platzieren.",
      },
      {
        question: "Wird die Datei mit dem Zeitstempel hochgeladen?",
        answer:
          "Nein. Die Marke wird lokal gezeichnet. PureSign erhält das PDF nicht.",
      },
      {
        question: "Kann ich den Stempel nach dem Setzen verschieben?",
        answer:
          "Ja. Overlays lassen sich in der Vorschau verschieben und skalieren, bevor Sie das PDF exportieren.",
      },
    ],
  },
  "fill-form": {
    heading: "PDF-Formulare online ausfüllen, ohne die Datei zu senden",
    intro:
      "Füllen Sie interaktive AcroForm-Felder im Browser oder setzen Sie Freitext, wenn ein PDF keine Felder hat. Das Ausfüllen bleibt lokal — das Formular wird nicht auf einen Server hochgeladen.",
    benefitsHeading: "Formulare auf Ihrem Gerät ausfüllen",
    benefits: [
      {
        title: "Interaktive PDF-Felder",
        text: "Erkannte AcroForm-Felder werden vor Ort ausgefüllt und dann in die heruntergeladene Datei eingefügt.",
      },
      {
        title: "Freitext ohne Felder",
        text: "Scans und flache PDFs funktionieren ebenfalls: Tippen Sie eine Zeile und setzen Sie sie in die Lücke.",
      },
      {
        title: "Kein Konto nötig",
        text: "Öffnen, ausfüllen, herunterladen. Nach dem Schließen des Tabs wird nichts gespeichert.",
      },
    ],
    sections: [
      {
        heading: "AcroForm im Browser ausfüllen",
        text: "Enthält das PDF Formularfelder, erscheinen sie in einer Liste, damit Namen, Daten und Antworten lokal eingetragen werden.",
      },
      {
        heading: "Text auf ein flaches PDF setzen",
        text: "Ist das Dokument nur ein Scan, platzieren Sie Text-Overlays auf der Seite statt erneut zu drucken und zu scannen.",
      },
    ],
    faqHeading: "FAQ zu PDF-Formularen",
    faq: [
      {
        question: "Kann ich ein PDF-Formular kostenlos ausfüllen?",
        answer:
          "Ja. Ziehen Sie die Datei in das Tool, füllen Sie Felder oder Text aus und laden Sie herunter. Keine Registrierung.",
      },
      {
        question: "Was, wenn mein PDF keine Formularfelder hat?",
        answer:
          "Fügen Sie Freitext-Overlays hinzu und platzieren Sie sie auf der Seite. Das deckt Scans und abgeflachte Dokumente ab.",
      },
      {
        question: "Speichern Sie die eingegebenen Antworten?",
        answer:
          "Nein. Feldwerte bleiben im Browser. Sie stehen erst im PDF, wenn Sie herunterladen.",
      },
      {
        question: "Wird das Formular zum Ausfüllen hochgeladen?",
        answer:
          "Nein. Felder lesen und das ausgefüllte PDF schreiben geschehen auf Ihrem Gerät.",
      },
    ],
  },
  "page-numbers": {
    heading: "PDF-Seitenzahlen und Kopfzeilen im Browser",
    intro:
      "Nummerieren Sie alle Seiten oder fügen Sie Kopf- und Fußzeilen lokal hinzu. Wählen Sie Position und Format, dann laden Sie ein neues PDF — das Original geht nicht auf einen Server.",
    benefitsHeading: "Seitenzahlen ohne Upload",
    benefits: [
      {
        title: "Kopf- und Fußzeilen",
        text: "Setzen Sie Zahlen links, mittig oder rechts im Kopf- oder Fußbereich.",
      },
      {
        title: "Flexible Formate",
        text: "Einfache Zahl, n von N oder die Beschriftung „Seite n von N“ wie in Bürodokumenten.",
      },
      {
        title: "Lokaler Export",
        text: "Die Nummerierung wird im Browser gezeichnet. Die private Kopie bleibt auf diesem Gerät.",
      },
    ],
    sections: [
      {
        heading: "Vertrag oder Bericht nummerieren",
        text: "Setzen Sie einheitliche Seitenzahlen, bevor Sie ein mehrseitiges PDF signieren, drucken oder archivieren.",
      },
      {
        heading: "Kopfzeilen ohne Desktop-Editor",
        text: "Rand und Schriftgröße im Browser einstellen, ohne extra PDF-Software zu installieren.",
      },
    ],
    faqHeading: "FAQ zur PDF-Nummerierung",
    faq: [
      {
        question: "Wie füge ich kostenlos Seitenzahlen zu einem PDF hinzu?",
        answer:
          "Wählen Sie Position und Format, wenden Sie die Nummerierung an und laden Sie herunter. Das Tool läuft lokal im Browser.",
      },
      {
        question: "Gibt es das Format „Seite 1 von 10“?",
        answer:
          "Ja. Wählen Sie ein Format mit Gesamtseitenzahl und exportieren Sie das PDF.",
      },
      {
        question: "Werden Kopfzeilen mit dem Dokument hochgeladen?",
        answer:
          "Nein. Kopf-/Fußzeilen und Seitenzahlen werden lokal geschrieben. Die Datei geht nicht auf einen Server.",
      },
      {
        question: "Überdeckt die Nummerierung den Inhalt?",
        answer:
          "Sie steuern Position und Rand, sodass Zahlen im Kopf- oder Fußbereich sitzen und nicht auf dem Fließtext.",
      },
    ],
  },
  redact: {
    heading: "PDF lokal schwärzen — Text im Browser abdecken",
    intro:
      "Verbergen Sie vertrauliche Namen, Nummern oder Absätze mit schwarzen Rechtecken, bevor Sie eine Datei teilen. Die Schwärzung läuft auf dem Gerät; das PDF wird nicht zur Zensur hochgeladen.",
    benefitsHeading: "Private Schwärzung auf dem Gerät",
    benefits: [
      {
        title: "Schwarze Flächen ziehen",
        text: "Ziehen Sie auf der Seitenvorschau, um den Bereich abzudecken, der nicht lesbar sein soll.",
      },
      {
        title: "Rückgängig vor dem Export",
        text: "Entfernen Sie eine Fläche, wenn zu viel verdeckt wurde, und laden Sie erst herunter, wenn die Seite stimmt.",
      },
      {
        title: "Keine Drittverarbeitung",
        text: "Sensible Seiten verlassen den Browser nicht — genau deshalb lokal schwärzen.",
      },
    ],
    sections: [
      {
        heading: "Personenbezogene Daten abdecken",
        text: "Kontonummern, Adressen oder medizinische Angaben auf einem Scan abdecken, bevor Sie das PDF mailen.",
      },
      {
        heading: "Schwärzen ohne Office-Paket",
        text: "Kein Adobe Acrobat oder Desktop-Editor nötig — die Flächen werden in den Download eingefügt.",
      },
    ],
    faqHeading: "FAQ zum PDF-Schwärzen",
    faq: [
      {
        question: "Kann ich ein PDF online kostenlos schwärzen?",
        answer:
          "Ja. Zeichnen Sie schwarze Rechtecke auf der Vorschau und laden Sie herunter. Kein Konto, keine Server-Warteschlange.",
      },
      {
        question: "Ist der versteckte Text wirklich entfernt?",
        answer:
          "Das Tool malt undurchsichtige Flächen auf die Seite und exportiert ein neues PDF. Zur Sicherheit teilen Sie das ungeschwärzte Original nicht zusätzlich.",
      },
      {
        question: "Sehen Sie das Dokument, das ich schwärze?",
        answer:
          "Nein. Die Flächen werden im Browser gezeichnet. PureSign erhält das PDF nicht.",
      },
      {
        question: "Kann ich mehrere Stellen auf einer Seite schwärzen?",
        answer:
          "Ja. Fügen Sie so viele Flächen hinzu wie nötig, machen Sie die letzte bei Bedarf rückgängig und exportieren Sie.",
      },
    ],
  },
  "extract-text": {
    heading: "Text aus einem PDF lokal im Browser extrahieren",
    intro:
      "Kopieren Sie auswählbaren Text aus einem PDF ohne Cloud-OCR. Die Extraktion läuft auf dem Gerät, das Dokument wird nicht zum Erkennen hochgeladen.",
    benefitsHeading: "Textextrakt ohne Server",
    benefits: [
      {
        title: "In einem Schritt kopieren",
        text: "Laden Sie das PDF, lesen Sie den extrahierten Text, kopieren Sie ihn oder laden Sie eine .txt-Datei.",
      },
      {
        title: "Kein OCR-Konto",
        text: "Eingebetteter PDF-Text wird lokal gelesen. Bildscans ohne Textebene liefern oft keinen Text.",
      },
      {
        title: "Dokumente bleiben privat",
        text: "Verträge und Briefe gehen nicht an eine Erkennungs-API.",
      },
    ],
    sections: [
      {
        heading: "PDF-Text ohne Upload kopieren",
        text: "Nützlich, wenn Sie ein Zitat, eine Adresse oder eine Klausel aus einem digitalen PDF brauchen und keine Converter-Website wollen.",
      },
      {
        heading: "Was dieses Tool nicht tut",
        text: "Es startet keine Cloud-OCR. Hat ein Scan keine Textebene, nutzen Sie ein eigenes OCR-Produkt — dieser Extraktor erfindet keinen Text aus Pixeln.",
      },
    ],
    faqHeading: "FAQ zur PDF-Textextraktion",
    faq: [
      {
        question: "Wie kopiere ich kostenlos Text aus einem PDF?",
        answer:
          "Ziehen Sie die Datei in den Extraktor, warten Sie auf das lokale Lesen und kopieren Sie das Ergebnis oder laden Sie eine Textdatei.",
      },
      {
        question: "Wird das PDF zur Extraktion hochgeladen?",
        answer:
          "Nein. Text wird im Browser aus der PDF-Struktur gelesen. Die Datei geht nicht auf einen Server.",
      },
      {
        question: "Funktioniert das bei einer fotografierten Seite?",
        answer:
          "Nur wenn das PDF bereits eine Textebene hat. Fotos und Scans ohne OCR haben meist nichts zu extrahieren.",
      },
      {
        question: "Kann ich eine .txt-Kopie behalten?",
        answer:
          "Ja. Laden Sie den extrahierten Text nach dem lokalen Lesen als Datei herunter.",
      },
    ],
  },
  "protect-pdf": {
    heading: "PDF im Browser mit Passwort schützen",
    intro:
      "Verschlüsseln Sie ein PDF mit einem Öffnungspasswort, ohne die Datei auf einen Server zu senden. Das Passwort wird lokal gesetzt und von PureSign nicht gespeichert.",
    benefitsHeading: "Lokale PDF-Verschlüsselung",
    benefits: [
      {
        title: "Öffnungspasswort setzen",
        text: "Wählen Sie ein Passwort, bestätigen Sie es und laden Sie ein gesperrtes PDF, das vor dem Öffnen danach fragt.",
      },
      {
        title: "Nichts wird gespeichert",
        text: "Wir behalten weder Passwort noch Dokument. Beides existiert nur in dieser Browser-Sitzung.",
      },
      {
        title: "Kostenlos und ohne Konto",
        text: "Schützen Sie eine Datei in einem Durchgang — praktisch vor dem Mailen eines Vertrags oder Ausweisscans.",
      },
    ],
    sections: [
      {
        heading: "PDF vor dem Versand sperren",
        text: "Verschlüsseln Sie den Download und teilen Sie das Passwort über einen anderen Kanal, damit der Anhang unterwegs nicht standardmäßig lesbar ist.",
      },
      {
        heading: "Verschlüsselung bleibt auf dem Gerät",
        text: "Die Verschlüsselung läuft im Browser. Es gibt keinen Upload-Schritt, der das ungeschützte Original preisgeben würde.",
      },
    ],
    faqHeading: "FAQ zum PDF-Passwort",
    faq: [
      {
        question: "Kann ich ein PDF online kostenlos verschlüsseln?",
        answer:
          "Ja. Geben Sie ein Öffnungspasswort ein, bestätigen Sie es und laden Sie die geschützte Datei. Kein Konto nötig.",
      },
      {
        question: "Speichern Sie mein Passwort?",
        answer:
          "Nein. Das Passwort wird lokal zum Verschlüsseln genutzt und nicht an PureSign gesendet.",
      },
      {
        question: "Was, wenn ich das Passwort vergesse?",
        answer:
          "Wir können es nicht wiederherstellen. Bewahren Sie eine Kopie des Passworts oder des ungeschützten Originals sicher auf.",
      },
      {
        question: "Wird das PDF zum Sperren hochgeladen?",
        answer:
          "Nein. Die Verschlüsselung läuft im Browser auf Ihrem Gerät.",
      },
    ],
  },
  "unlock-pdf": {
    heading: "PDF lokal entsperren, wenn Sie das Passwort kennen",
    intro:
      "Entfernen Sie ein Öffnungspasswort oder Druckbeschränkungen im Browser. Das Passwort müssen Sie bereits kennen — das ist kein Cracking-Dienst, und die Datei wird nicht hochgeladen.",
    benefitsHeading: "Privates PDF-Entsperren",
    benefits: [
      {
        title: "Eine Datei öffnen, die Ihnen gehört",
        text: "Geben Sie das bekannte Passwort ein, um eine entsperrte Kopie zum Bearbeiten oder Drucken zu speichern.",
      },
      {
        title: "Kein Brute-Force, kein Upload",
        text: "Das Tool entschlüsselt nur mit dem Passwort, das Sie lokal eingeben. Es rät keine Passwörter.",
      },
      {
        title: "Bleibt auf dem Gerät",
        text: "Das geschützte PDF verlässt den Browser-Tab nicht.",
      },
    ],
    sections: [
      {
        heading: "Ein bekanntes Passwort entfernen",
        text: "Nützlich, wenn Sie ein gesperrtes PDF und das Passwort haben, aber eine Kopie ohne Abfrage beim Öffnen brauchen.",
      },
      {
        heading: "Kein Passwort-Cracking",
        text: "Wenn Sie das Passwort nicht kennen, kann PureSign die Datei nicht entsperren. Diese Grenze ist Absicht.",
      },
    ],
    faqHeading: "FAQ zum PDF-Entsperren",
    faq: [
      {
        question: "Kann ich ein PDF-Passwort online entfernen?",
        answer:
          "Nur wenn Sie das Öffnungspasswort bereits kennen. Geben Sie es lokal ein und laden Sie eine entsperrte Kopie. Wir knacken keine Passwörter.",
      },
      {
        question: "Wird das gesperrte PDF hochgeladen?",
        answer:
          "Nein. Die Entschlüsselung läuft im Browser. Die Datei bleibt auf Ihrem Gerät.",
      },
      {
        question: "Was passiert bei einem falschen Passwort?",
        answer:
          "Das Entsperren schlägt fehl, die originale geschützte Datei bleibt unverändert. Versuchen Sie das richtige Passwort; es gibt keine Reset-Mail.",
      },
      {
        question: "Können Sie ein vergessenes Passwort wiederherstellen?",
        answer:
          "Nein. PureSign sieht weder Datei noch Passwort, daher gibt es bei uns nichts wiederherzustellen.",
      },
    ],
  },
  "batch-sign": {
    heading: "PDF-Stapelsignatur online — eine Unterschrift, viele Dateien",
    intro:
      "Wenden Sie dieselbe gezeichnete, getippte oder hochgeladene Signatur auf mehrere PDFs an und laden Sie ein ZIP. Die Massensignatur läuft im Browser; die Dokumente gehen nicht auf einen Server.",
    benefitsHeading: "Lokale Bulk-e-Signatur",
    benefits: [
      {
        title: "Eine Marke, viele PDFs",
        text: "Bereiten Sie eine Signatur einmal vor, legen Sie mehrere Dateien ab und exportieren Sie ein ZIP signierter Kopien.",
      },
      {
        title: "Zeichnen oder hochladen",
        text: "Dieselben Optionen wie beim Einzel-Signer: Pad, getippter Name oder PNG.",
      },
      {
        title: "Private Stapelverarbeitung",
        text: "Ein Paket Verträge oder HR-Formulare verlässt dieses Gerät während der Signatur nicht.",
      },
    ],
    sections: [
      {
        heading: "Einen Ordner PDFs signieren",
        text: "Die Stapelsignatur eignet sich, wenn jede Datei dieselbe visuelle Unterschrift an ähnlicher Stelle braucht — danach laden Sie das ZIP.",
      },
      {
        heading: "Weiterhin vollständig clientseitig",
        text: "Mehrere Dateien ändern das Datenschutzmodell nicht: jedes PDF wird lokal signiert und dann im Browser gepackt.",
      },
    ],
    faqHeading: "FAQ zur PDF-Stapelsignatur",
    faq: [
      {
        question: "Kann ich mehrere PDFs auf einmal kostenlos signieren?",
        answer:
          "Ja. Fügen Sie mehrere Dateien hinzu, bereiten Sie eine Signatur vor, platzieren Sie sie und laden Sie ein ZIP. Kein Konto nötig.",
      },
      {
        question: "Werden die Dateien für die Stapelsignatur hochgeladen?",
        answer:
          "Nein. Jedes PDF wird im Browser verarbeitet. PureSign erhält die Dokumente nicht.",
      },
      {
        question: "Bekomme ich einzelne signierte Dateien?",
        answer:
          "Ja. Der Download ist ein ZIP-Archiv mit einer signierten Kopie jedes ausgewählten PDFs.",
      },
      {
        question: "Kann ich zeichnen und auch eine Signatur hochladen?",
        answer:
          "Ja. Die Stapelsignatur nutzt dieselben Zeichen-, Tippen- und Bildoptionen wie der Einzel-PDF-Signer.",
      },
    ],
  },
};
