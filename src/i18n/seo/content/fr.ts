import type { SeoPageContentCatalog } from "@/i18n/seo/content-types";

export const fr: SeoPageContentCatalog = {
  home: {
    heading: "Signez des PDF en ligne sans les envoyer sur un serveur",
    intro:
      "PureSign est un espace gratuit de signature PDF et de signature électronique dans le navigateur. Dessinez une signature, importez un PNG, tamponnez, remplissez un formulaire ou chiffrez un fichier en local — sans compte ni envoi du document.",
    benefitsHeading: "Pourquoi signer en local dans le navigateur",
    benefits: [
      {
        title: "Le fichier ne quitte pas l’appareil",
        text: "Signature, tampons, formulaires et chiffrement s’exécutent dans le navigateur. PureSign ne reçoit, ne stocke ni ne transmet vos PDF.",
      },
      {
        title: "Signature électronique gratuite, sans filigrane",
        text: "Dessinez une signature, saisissez un nom ou importez une image et placez-la sur n’importe quelle page — sans inscription.",
      },
      {
        title: "Une boîte à outils PDF privée",
        text: "Tampons, horodatage, formulaires, numérotation, occultation, extraction de texte, mot de passe et signature par lot.",
      },
    ],
    sections: [
      {
        heading: "Signatures et tampons",
        text: "Signez un PDF, ajoutez un sceau Payé ou Conforme à l’original, ou posez un tampon date/heure — visuellement sur l’aperçu de page.",
      },
      {
        heading: "Formulaires et mise en page",
        text: "Remplissez les champs AcroForm, numérotez les pages, ajoutez en-têtes ou pieds de page et masquez le texte confidentiel avant d’envoyer le fichier.",
      },
      {
        heading: "Analyse et sécurité",
        text: "Extrayez le texte sélectionnable, chiffrez un PDF avec un mot de passe d’ouverture ou retirez un mot de passe que vous connaissez déjà — toujours en local.",
      },
      {
        heading: "Signature par lot",
        text: "Appliquez une signature à plusieurs PDF et téléchargez un ZIP. La signature groupée reste dans le navigateur, comme le signataire d’un seul fichier.",
      },
    ],
    faqHeading: "Questions fréquentes",
    faq: [
      {
        question: "Peut-on signer un PDF en ligne gratuitement ?",
        answer:
          "Oui. Tous les outils sont gratuits dans le navigateur. Pas d’inscription, pas d’abonnement et pas de filigrane sur le PDF signé.",
      },
      {
        question: "Envoyez-vous mes documents sur un serveur ?",
        answer:
          "Non. La signature PDF et les autres outils s’exécutent en local sur votre appareil. Les fichiers ne sont pas envoyés à un serveur PureSign.",
      },
      {
        question: "Quels outils de signature sont inclus ?",
        answer:
          "Vous pouvez dessiner une signature, saisir un nom ou importer un PNG, puis le placer sur un PDF. Des outils connexes couvrent tampons, horodatage et signature de plusieurs fichiers.",
      },
      {
        question: "Quelles langues le site prend-il en charge ?",
        answer:
          "PureSign est disponible en français, anglais, ukrainien, allemand, espagnol et polonais. Chaque outil a une page localisée.",
      },
    ],
  },
  sign: {
    heading: "Signer un PDF en ligne gratuitement — dessiner ou importer une signature",
    intro:
      "Signez un PDF dans le navigateur sans créer de compte. Dessinez une signature manuscrite, saisissez votre nom ou importez un PNG, placez-le sur la page et téléchargez le fichier. Le document reste sur votre appareil.",
    benefitsHeading: "Comment ajouter une signature électronique",
    benefits: [
      {
        title: "Dessiner une signature",
        text: "Écrivez avec la souris, le pavé ou l’écran tactile sur le pad, puis cliquez sur l’aperçu PDF pour poser la marque.",
      },
      {
        title: "Importer une signature numérique",
        text: "Importez un PNG d’une signature ou d’un sceau existant — idéalement à fond transparent — et placez-le comme une encre humide.",
      },
      {
        title: "Sans serveur, sans compte",
        text: "Placement, redimensionnement et export se font en local. Fermer l’onglet jette le fichier si vous n’avez pas téléchargé le résultat.",
      },
    ],
    sections: [
      {
        heading: "Dessiner une signature sur un PDF",
        text: "Ouvrez l’onglet dessin, signez sur le pad et touchez l’aperçu. Vous pouvez ajouter plusieurs marques et les déplacer avant le téléchargement.",
      },
      {
        heading: "Importer une signature numérique",
        text: "Dans l’onglet image, chargez un PNG. Une signature scannée ou un sceau d’entreprise se place à l’emplacement habituel.",
      },
      {
        heading: "Signer le PDF et télécharger",
        text: "Redimensionnez la signature, changez de page si besoin, puis enregistrez un nouveau PDF. L’original n’est pas écrasé tant que vous ne conservez pas le téléchargement.",
      },
    ],
    faqHeading: "FAQ signature PDF",
    faq: [
      {
        question: "Comment signer un PDF en ligne gratuitement ?",
        answer:
          "Déposez un PDF dans l’outil, dessinez ou importez une signature, cliquez sur la page pour la placer et téléchargez. Aucun compte n’est requis ; le traitement se fait dans le navigateur.",
      },
      {
        question: "Puis-je importer une signature numérique existante ?",
        answer:
          "Oui. Choisissez l’option image et un fichier PNG. L’image est lue en local ; elle n’est pas envoyée sur nos serveurs.",
      },
      {
        question: "S’agit-il d’une signature électronique qualifiée (SEQ / QES) ?",
        answer:
          "Non. PureSign place une signature électronique simple / visuelle (SES) sur le PDF. Aucun certificat qualifié eIDAS n’est délivré. Utilisez un prestataire de confiance qualifié si la loi exige une SEQ.",
      },
      {
        question: "Le PDF quitte-t-il l’ordinateur ?",
        answer:
          "Non. Dessin, import PNG, placement de la signature et export se font en local dans le navigateur.",
      },
    ],
  },
  stamp: {
    heading: "Tampon et sceau PDF sans envoyer le fichier",
    intro:
      "Posez des tampons transparents Payé, Conforme à l’original, Confidentiel ou un texte libre sur un PDF. Le sceau s’affiche sur l’aperçu et est aplati en local dans le navigateur.",
    benefitsHeading: "Des tampons qui restent privés",
    benefits: [
      {
        title: "Sceaux prêts à l’emploi",
        text: "Appliquez des tampons de bureau d’un clic, puis déplacez-les et redimensionnez-les sur la page.",
      },
      {
        title: "Texte de tampon personnalisé",
        text: "Saisissez un service, une mention de copie ou une ligne d’approbation avec un fond transparent.",
      },
      {
        title: "Traitement PDF local",
        text: "Le document n’est pas envoyé sur un serveur. Vous téléchargez un nouveau PDF tamponné depuis cet appareil.",
      },
    ],
    sections: [
      {
        heading: "Tampons de bureau sur un PDF",
        text: "Utilisez Payé, Approuvé, Reçu ou Confidentiel lorsqu’un statut visuel est nécessaire sur un scan ou un document numérique.",
      },
      {
        heading: "Copie conforme et sceaux personnalisés",
        text: "Placez un tampon Conforme à l’original ou rédigez un sceau, puis positionnez-le sur l’en-tête ou le bloc signature.",
      },
    ],
    faqHeading: "FAQ tampon PDF",
    faq: [
      {
        question: "Puis-je tamponner un PDF en ligne gratuitement ?",
        answer:
          "Oui. Choisissez un modèle ou un texte, cliquez sur la page et téléchargez. Aucune inscription.",
      },
      {
        question: "Le tampon a-t-il un fond transparent ?",
        answer:
          "Oui. Modèles et textes personnalisés sont dessinés avec un fond transparent pour laisser le PDF lisible.",
      },
      {
        question: "Le fichier est-il envoyé pour être tamponné ?",
        answer:
          "Non. Le tamponnage se fait dans le navigateur. Le PDF reste sur l’appareil jusqu’au téléchargement du résultat.",
      },
      {
        question: "Puis-je utiliser mon propre libellé ?",
        answer:
          "Oui. Passez en texte personnalisé, saisissez le sceau et placez-le comme n’importe quel tampon.",
      },
    ],
  },
  "date-stamp": {
    heading: "Tampon date ou heure sur un PDF dans le navigateur",
    intro:
      "Placez une date, une heure ou les deux sur n’importe quelle page PDF. Le tampon est généré en local à partir de l’horloge de l’appareil, sans serveur.",
    benefitsHeading: "Horodatage sans envoi de fichier",
    benefits: [
      {
        title: "Date, heure ou les deux",
        text: "Choisissez le format et cliquez sur l’aperçu pour poser une marque lisible.",
      },
      {
        title: "Taille et couleur sur la page",
        text: "Ajustez taille et couleur pour un champ de formulaire, un pied de page ou une ligne « reçu le ».",
      },
      {
        title: "Privé par défaut",
        text: "Le PDF n’est envoyé nulle part. Vous exportez un nouveau fichier depuis le même onglet.",
      },
    ],
    sections: [
      {
        heading: "Horodater un document reçu",
        text: "Posez une date ou une date/heure sur le courrier, les factures ou les copies signées lorsqu’une marque de réception est utile.",
      },
      {
        heading: "Dater un PDF sans quitter l’appareil",
        text: "Comme le tampon est créé dans le navigateur, les fichiers confidentiels peuvent être datés sans convertisseur en ligne.",
      },
    ],
    faqHeading: "FAQ tampon date PDF",
    faq: [
      {
        question: "Comment ajouter la date du jour sur un PDF ?",
        answer:
          "Ouvrez le tampon date, choisissez date, heure ou les deux, cliquez sur la page et téléchargez. La valeur vient de l’horloge de l’appareil.",
      },
      {
        question: "Puis-je tamponner l’heure en plus de la date ?",
        answer:
          "Oui. Passez le format sur heure seule ou sur date et heure combinées avant de placer le tampon.",
      },
      {
        question: "Le fichier est-il envoyé avec l’horodatage ?",
        answer:
          "Non. La marque est dessinée en local. PureSign ne reçoit pas le PDF.",
      },
      {
        question: "Puis-je déplacer le tampon après l’avoir posé ?",
        answer:
          "Oui. Les calques se déplacent et se redimensionnent sur l’aperçu avant l’export du PDF.",
      },
    ],
  },
  "fill-form": {
    heading: "Remplir un formulaire PDF en ligne sans envoyer le fichier",
    intro:
      "Complétez les champs AcroForm interactifs dans le navigateur, ou ajoutez du texte libre si le PDF n’a pas de champs. Le remplissage reste local — le formulaire n’est pas envoyé sur un serveur.",
    benefitsHeading: "Remplissage de formulaires sur l’appareil",
    benefits: [
      {
        title: "Champs PDF interactifs",
        text: "Les champs AcroForm détectés se remplissent sur place, puis sont aplatis dans le fichier téléchargé.",
      },
      {
        title: "Texte libre s’il n’y a pas de champs",
        text: "Les scans et PDF plats fonctionnent aussi : saisissez une ligne et placez-la dans le blanc.",
      },
      {
        title: "Sans compte",
        text: "Ouvrez, remplissez, téléchargez. Rien n’est conservé après la fermeture de l’onglet.",
      },
    ],
    sections: [
      {
        heading: "Remplir un AcroForm dans le navigateur",
        text: "Si le PDF contient des champs, ils s’affichent en liste pour saisir noms, dates et réponses en local.",
      },
      {
        heading: "Ajouter du texte sur un PDF plat",
        text: "Quand le document n’est qu’un scan, posez des calques de texte sur la page au lieu d’imprimer et rescanner.",
      },
    ],
    faqHeading: "FAQ formulaires PDF",
    faq: [
      {
        question: "Puis-je remplir un formulaire PDF gratuitement ?",
        answer:
          "Oui. Déposez le fichier, complétez les champs ou le texte, puis téléchargez. Aucune inscription.",
      },
      {
        question: "Et si mon PDF n’a pas de champs de formulaire ?",
        answer:
          "Ajoutez des calques de texte libre et placez-les sur la page. Cela couvre les scans et documents aplatis.",
      },
      {
        question: "Stockez-vous les réponses saisies ?",
        answer:
          "Non. Les valeurs restent dans le navigateur. Elles n’entrent dans le PDF qu’au téléchargement.",
      },
      {
        question: "Le formulaire est-il envoyé pour être rempli ?",
        answer:
          "Non. La lecture des champs et l’écriture du PDF rempli se font sur votre appareil.",
      },
    ],
  },
  "page-numbers": {
    heading: "Numérotation et en-têtes PDF dans le navigateur",
    intro:
      "Numérotez chaque page ou ajoutez en-tête et pied de page en local. Choisissez position et format, puis téléchargez un nouveau PDF — l’original n’est pas envoyé sur un serveur.",
    benefitsHeading: "Numéros de page sans envoi",
    benefits: [
      {
        title: "En-têtes et pieds de page",
        text: "Placez les numéros à gauche, au centre ou à droite de la bande d’en-tête ou de pied.",
      },
      {
        title: "Formats souples",
        text: "Un numéro simple, n sur N, ou le libellé « Page n sur N » comme dans les documents de bureau.",
      },
      {
        title: "Export local",
        text: "La pagination est dessinée dans le navigateur. La copie privée reste sur cet appareil.",
      },
    ],
    sections: [
      {
        heading: "Numéroter un contrat ou un rapport",
        text: "Ajoutez une numérotation cohérente avant de signer, imprimer ou archiver un PDF de plusieurs pages.",
      },
      {
        heading: "En-têtes sans éditeur de bureau",
        text: "Réglez marge et taille de police dans le navigateur, sans installer de logiciel PDF supplémentaire.",
      },
    ],
    faqHeading: "FAQ numérotation PDF",
    faq: [
      {
        question: "Comment ajouter gratuitement des numéros de page à un PDF ?",
        answer:
          "Choisissez position et format, appliquez la numérotation et téléchargez. L’outil s’exécute en local dans le navigateur.",
      },
      {
        question: "Le format « Page 1 sur 10 » est-il disponible ?",
        answer:
          "Oui. Choisissez un format avec le nombre total de pages, puis exportez le PDF.",
      },
      {
        question: "Les en-têtes sont-ils envoyés avec le document ?",
        answer:
          "Non. En-têtes, pieds de page et numéros sont écrits en local. Le fichier n’est pas envoyé sur un serveur.",
      },
      {
        question: "La numérotation va-t-elle recouvrir le contenu ?",
        answer:
          "Vous contrôlez position et marge pour que les numéros restent dans la bande d’en-tête ou de pied, pas sur le corps du texte.",
      },
    ],
  },
  redact: {
    heading: "Censurer un PDF en local — masquer du texte dans le navigateur",
    intro:
      "Masquez des noms, numéros ou paragraphes confidentiels avec des rectangles noirs avant de partager un fichier. L’occultation s’exécute sur l’appareil ; le PDF n’est pas envoyé pour censure.",
    benefitsHeading: "Occultation privée sur l’appareil",
    benefits: [
      {
        title: "Tracer des zones noires",
        text: "Glissez sur l’aperçu pour couvrir la zone qui ne doit plus être lisible.",
      },
      {
        title: "Annuler avant l’export",
        text: "Retirez une zone trop large, puis téléchargez seulement lorsque la page convient.",
      },
      {
        title: "Sans traitement tiers",
        text: "Les pages sensibles ne quittent pas le navigateur — c’est tout l’intérêt d’une censure locale.",
      },
    ],
    sections: [
      {
        heading: "Masquer des données personnelles",
        text: "Couvrez numéros de compte, adresses ou détails médicaux sur un scan avant d’envoyer le PDF.",
      },
      {
        heading: "Censurer sans suite bureautique",
        text: "Pas besoin d’Adobe Acrobat ni d’éditeur de bureau : les zones sont aplaties dans le téléchargement.",
      },
    ],
    faqHeading: "FAQ occultation PDF",
    faq: [
      {
        question: "Puis-je censurer un PDF en ligne gratuitement ?",
        answer:
          "Oui. Tracez des rectangles noirs sur l’aperçu et téléchargez. Pas de compte, pas de file d’attente serveur.",
      },
      {
        question: "Le texte masqué est-il vraiment retiré ?",
        answer:
          "L’outil peint des zones opaques sur la page et exporte un nouveau PDF. Pour plus de sûreté, ne partagez pas aussi l’original non censuré.",
      },
      {
        question: "Voyez-vous le document que je censure ?",
        answer:
          "Non. Les zones sont dessinées dans le navigateur. PureSign ne reçoit pas le PDF.",
      },
      {
        question: "Puis-je masquer plusieurs zones sur une page ?",
        answer:
          "Oui. Ajoutez autant de rectangles que nécessaire, annulez le dernier si besoin, puis exportez.",
      },
    ],
  },
  "extract-text": {
    heading: "Extraire le texte d’un PDF en local dans le navigateur",
    intro:
      "Copiez le texte sélectionnable d’un PDF sans OCR dans le cloud. L’extraction s’exécute sur l’appareil, le document n’est pas envoyé pour reconnaissance.",
    benefitsHeading: "Extraction de texte sans serveur",
    benefits: [
      {
        title: "Copier en une étape",
        text: "Chargez le PDF, lisez le texte extrait, copiez-le ou téléchargez un fichier .txt.",
      },
      {
        title: "Sans compte OCR",
        text: "Le texte intégré au PDF est lu en local. Un scan image sans couche texte peut ne rien donner.",
      },
      {
        title: "Documents restés privés",
        text: "Contrats et lettres ne partent pas vers une API de reconnaissance.",
      },
    ],
    sections: [
      {
        heading: "Copier le texte PDF sans envoi",
        text: "Utile pour une citation, une adresse ou une clause d’un PDF numérique, sans site de conversion.",
      },
      {
        heading: "Ce que cet outil ne fait pas",
        text: "Il ne lance pas d’OCR cloud. Si un scan n’a pas de couche texte, utilisez un OCR dédié — cet extracteur n’invente pas de texte à partir des pixels.",
      },
    ],
    faqHeading: "FAQ extraction de texte PDF",
    faq: [
      {
        question: "Comment copier gratuitement le texte d’un PDF ?",
        answer:
          "Déposez le fichier, attendez la lecture locale, puis copiez le résultat ou téléchargez un fichier texte.",
      },
      {
        question: "Le PDF est-il envoyé pour extraire le texte ?",
        answer:
          "Non. Le texte est lu dans le navigateur à partir de la structure PDF. Le fichier n’est pas envoyé sur un serveur.",
      },
      {
        question: "Cela marche-t-il sur une page photographiée ?",
        answer:
          "Seulement si le PDF contient déjà une couche texte. Photos et scans sans OCR n’ont généralement rien à extraire.",
      },
      {
        question: "Puis-je garder une copie .txt ?",
        answer:
          "Oui. Téléchargez le texte extrait une fois la lecture locale terminée.",
      },
    ],
  },
  "protect-pdf": {
    heading: "Protéger un PDF par mot de passe dans le navigateur",
    intro:
      "Chiffrez un PDF avec un mot de passe d’ouverture sans envoyer le fichier sur un serveur. Le mot de passe est appliqué en local et n’est pas stocké par PureSign.",
    benefitsHeading: "Chiffrement PDF local",
    benefits: [
      {
        title: "Définir un mot de passe d’ouverture",
        text: "Choisissez un mot de passe, confirmez-le et téléchargez un PDF verrouillé qui le demande avant l’affichage.",
      },
      {
        title: "Rien n’est stocké",
        text: "Nous ne conservons ni le mot de passe ni le document. Les deux n’existent que dans cette session de navigateur.",
      },
      {
        title: "Gratuit et sans compte",
        text: "Protégez un fichier en une passe — utile avant d’envoyer un contrat ou un scan d’identité.",
      },
    ],
    sections: [
      {
        heading: "Verrouiller un PDF avant l’envoi",
        text: "Chiffrez le téléchargement, puis transmettez le mot de passe par un autre canal pour que la pièce jointe ne soit pas lisible par défaut en transit.",
      },
      {
        heading: "Le chiffrement reste sur l’appareil",
        text: "Le chiffrement s’applique dans le navigateur. Aucune étape d’upload n’expose l’original non protégé.",
      },
    ],
    faqHeading: "FAQ mot de passe PDF",
    faq: [
      {
        question: "Puis-je chiffrer un PDF en ligne gratuitement ?",
        answer:
          "Oui. Saisissez et confirmez un mot de passe d’ouverture, puis téléchargez le fichier protégé. Aucun compte n’est requis.",
      },
      {
        question: "Stockez-vous mon mot de passe ?",
        answer:
          "Non. Le mot de passe sert localement à chiffrer le fichier et n’est pas envoyé à PureSign.",
      },
      {
        question: "Que se passe-t-il si j’oublie le mot de passe ?",
        answer:
          "Nous ne pouvons pas le récupérer. Conservez une copie du mot de passe ou de l’original non protégé en lieu sûr.",
      },
      {
        question: "Le PDF est-il envoyé pour le verrouiller ?",
        answer:
          "Non. Le chiffrement s’exécute dans le navigateur sur votre appareil.",
      },
    ],
  },
  "unlock-pdf": {
    heading: "Déverrouiller un PDF en local si vous connaissez le mot de passe",
    intro:
      "Retirez un mot de passe d’ouverture ou des restrictions d’impression dans le navigateur. Il faut déjà connaître le mot de passe — ce n’est pas un service de cassage, et le fichier n’est pas envoyé.",
    benefitsHeading: "Déverrouillage PDF privé",
    benefits: [
      {
        title: "Ouvrir un fichier qui vous appartient",
        text: "Saisissez le mot de passe connu pour enregistrer une copie déverrouillée à éditer ou imprimer.",
      },
      {
        title: "Sans brute-force, sans envoi",
        text: "L’outil ne déchiffre qu’avec le mot de passe que vous fournissez, en local. Il ne devine pas les mots de passe.",
      },
      {
        title: "Reste sur l’appareil",
        text: "Le PDF protégé ne quitte pas l’onglet du navigateur.",
      },
    ],
    sections: [
      {
        heading: "Retirer un mot de passe déjà connu",
        text: "Utile lorsque vous avez reçu un PDF verrouillé et le mot de passe, mais besoin d’une copie qui s’ouvre sans invite.",
      },
      {
        heading: "Pas un outil de cassage",
        text: "Si vous ignorez le mot de passe, PureSign ne peut pas déverrouiller le fichier. Cette limite est volontaire.",
      },
    ],
    faqHeading: "FAQ déverrouillage PDF",
    faq: [
      {
        question: "Puis-je retirer un mot de passe PDF en ligne ?",
        answer:
          "Seulement si vous connaissez déjà le mot de passe d’ouverture. Saisissez-le en local et téléchargez une copie déverrouillée. Nous ne cassons pas les mots de passe.",
      },
      {
        question: "Le PDF verrouillé est-il envoyé ?",
        answer:
          "Non. Le déchiffrement s’exécute dans le navigateur. Le fichier reste sur l’appareil.",
      },
      {
        question: "Que se passe-t-il si le mot de passe est faux ?",
        answer:
          "Le déverrouillage échoue et le fichier protégé d’origine est inchangé. Essayez le bon mot de passe ; il n’y a pas d’e-mail de réinitialisation.",
      },
      {
        question: "Pouvez-vous récupérer un mot de passe oublié ?",
        answer:
          "Non. PureSign ne voit ni le fichier ni le mot de passe, donc rien à récupérer de notre côté.",
      },
    ],
  },
  "batch-sign": {
    heading: "Signature PDF par lot en ligne — une signature, plusieurs fichiers",
    intro:
      "Appliquez la même signature dessinée, saisie ou importée à plusieurs PDF et téléchargez un ZIP. La signature groupée s’exécute dans le navigateur ; les documents ne sont pas envoyés sur un serveur.",
    benefitsHeading: "Signature électronique groupée en local",
    benefits: [
      {
        title: "Une marque, plusieurs PDF",
        text: "Préparez une signature une fois, ajoutez plusieurs fichiers et exportez un ZIP de copies signées.",
      },
      {
        title: "Dessiner ou importer",
        text: "Les mêmes options que le signataire unitaire : pad, nom saisi ou PNG.",
      },
      {
        title: "Traitement par lot privé",
        text: "Un lot de contrats ou de formulaires RH ne quitte pas cet appareil pendant la signature.",
      },
    ],
    sections: [
      {
        heading: "Signer un dossier de PDF",
        text: "La signature par lot convient lorsque chaque fichier a besoin de la même marque visuelle au même endroit, puis vous téléchargez le ZIP.",
      },
      {
        heading: "Toujours 100 % côté client",
        text: "Plusieurs fichiers ne changent pas le modèle de confidentialité : chaque PDF est signé en local, puis empaqueté dans le navigateur.",
      },
    ],
    faqHeading: "FAQ signature PDF par lot",
    faq: [
      {
        question: "Puis-je signer plusieurs PDF à la fois gratuitement ?",
        answer:
          "Oui. Ajoutez plusieurs fichiers, préparez une signature, placez-la et téléchargez un ZIP. Aucun compte n’est requis.",
      },
      {
        question: "Les fichiers sont-ils envoyés pour la signature par lot ?",
        answer:
          "Non. Chaque PDF est traité dans le navigateur. PureSign ne reçoit pas les documents.",
      },
      {
        question: "Obtiens-je des fichiers signés séparés ?",
        answer:
          "Oui. Le téléchargement est une archive ZIP contenant une copie signée de chaque PDF sélectionné.",
      },
      {
        question: "Puis-je dessiner et aussi importer une signature ?",
        answer:
          "Oui. La signature par lot utilise les mêmes options dessin, saisie et image que le signataire d’un seul PDF.",
      },
    ],
  },
};
