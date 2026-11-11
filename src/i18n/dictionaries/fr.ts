import type { Dictionary } from "@/i18n/types";

export const fr: Dictionary = {
  brand: {
    name: "PureSign",
    tagline: "Signez et remplissez des PDF en local.",
  },
  nav: {
    selectLanguage: "Langue",
    menuAria: "Menu du site",
    menuClose: "Fermer le menu",
  },
  ecosystem: {
    menuLabel: "Notre écosystème",
    menuShort: "Écosystème",
    menuAria: "Projets de notre écosystème",
    menuHint:
      "Utilitaires liés avec traitement local dans le navigateur — une équipe, une philosophie de confidentialité.",
    activeHere: "Actif",
    comingSoon: "Bientôt",
    close: "Fermer le menu écosystème",
    items: {
      purepdf: {
        name: "PurePDF",
        tagline: "Outils pour travailler avec des PDF.",
      },
      pureQr: {
        name: "PureQR",
        tagline: "Générateur et gestionnaire de codes QR.",
      },
      pureSign: {
        name: "PureSign",
        tagline: "Signature et remplissage de PDF en local.",
      },
      pureTable: {
        name: "PureTable",
        tagline: "Utilitaire métier pour parser des factures vers Excel/CSV.",
      },
    },
  },
  security: {
    badge: "Client-Side • 100 % local",
    badgeShort: "Traitement local",
    pointLocal: "Traitement uniquement dans votre navigateur",
    pointNoUpload: "Aucun envoi vers un serveur",
    pointPrivate: "Confidentialité par défaut",
    toolNote: "Client-Side : les fichiers restent sur votre appareil.",
  },
  home: {
    heroTitle: "Tous les outils de signature dans un espace de travail sombre.",
    heroSubtitle:
      "Signez, tamponnez, numérotez et remplissez des PDF en privé dans votre navigateur.",
    toolsAria: "Catalogue d’outils PureSign",
    toolsHeading: "Catalogue d’outils",
    toolsCatalogHint:
      "Réduisez ou développez les catégories avec la flèche — tout s’exécute localement dans le navigateur.",
    expandCategory: "Développer la catégorie",
    collapseCategory: "Réduire la catégorie",
    toolCategories: {
      signaturesStamps: {
        title: "Signatures et tampons",
        subtitle: "Signer, tamponner, date et heure sur le PDF.",
      },
      formsLayout: {
        title: "Formulaires et mise en page",
        subtitle: "Remplissage, numérotation, en-têtes et censure.",
      },
      analysisSecurity: {
        title: "Analyse et sécurité",
        subtitle: "Texte, chiffrement et déverrouillage.",
      },
      proBatch: {
        title: "Pro / lot",
        subtitle: "Signature par lot avec export ZIP.",
      },
    },
    openTool: "Ouvrir →",
  },
  footer: {
    privacyBadge: "100 % dans le navigateur",
    tagline: "Aucun document ne quitte votre appareil.",
    rights: "© PureSign. Signature privée de documents.",
  },
  common: {
    backToTools: "Retour aux outils",
    dropzoneTitle: "Déposez un PDF ici ou cliquez pour parcourir",
    dropzoneHint: "Le fichier est traité uniquement sur cet appareil.",
    downloadPdf: "Télécharger le PDF",
    dropzoneMultipleTitle: "Déposez un ou plusieurs PDF ici",
    processing: "Traitement…",
    clear: "Effacer",
    apply: "Appliquer",
    pageLabel: (index, total) => `Page ${index} sur ${total}`,
    prevPage: "Précédent",
    nextPage: "Suivant",
    copy: "Copier",
    copied: "Copié",
    remove: "Supprimer",
  },
  tools: {
    sign: {
      title: "Poser une signature",
      description: "Signature dessinée, saisie ou image PNG.",
      hint: "Dessinez, saisissez ou importez un PNG et placez-le sur la page.",
      action: "Télécharger le PDF signé",
      errors: {
        invalid: "Choisissez un fichier PDF.",
        failed: "Impossible d’appliquer la signature.",
      },
    },
    stamp: {
      title: "Ajouter un tampon / sceau",
      description:
        "Tampons transparents : « Payé », « Conforme à l’original ».",
      hint: "Choisissez un tampon prédéfini ou saisissez votre texte.",
      action: "Télécharger le PDF tamponné",
      errors: {
        invalid: "Choisissez un fichier PDF.",
        failed: "Impossible d’appliquer le tampon.",
      },
    },
    "date-stamp": {
      title: "Tampon date / heure",
      description: "Date, heure ou les deux sur le PDF en un clic.",
      hint: "Choisissez le format et cliquez sur la page.",
      action: "Télécharger le PDF horodaté",
      errors: {
        invalid: "Choisissez un fichier PDF.",
        failed: "Impossible d’appliquer l’horodatage.",
      },
    },
    "fill-form": {
      title: "Remplir des formulaires PDF",
      description: "Saisie interactive dans les champs du document.",
      hint: "Les champs sont lus en local. S’il n’y en a pas, ajoutez du texte libre.",
      action: "Télécharger le PDF rempli",
      errors: {
        invalid: "Choisissez un fichier PDF.",
        failed: "Impossible de remplir le formulaire.",
      },
    },
    "page-numbers": {
      title: "Numérotation des pages",
      description: "Ajouter des numéros de page ou des en-têtes / pieds de page.",
      hint: "Choisissez la position, le format et la marge.",
      action: "Télécharger le PDF numéroté",
      errors: {
        invalid: "Choisissez un fichier PDF.",
        failed: "Impossible d’ajouter la numérotation.",
      },
    },
    redact: {
      title: "Censure / occultation",
      description: "Masquer des données confidentielles derrière un carré noir.",
      hint: "Faites glisser le doigt ou la souris pour occulter une zone.",
      action: "Télécharger le PDF censuré",
      errors: {
        invalid: "Choisissez un fichier PDF.",
        failed: "Impossible d’appliquer l’occultation.",
      },
    },
    "extract-text": {
      title: "Extraire le texte",
      description: "Reconnaître et copier rapidement le texte du document.",
      hint: "Le texte est lu depuis le PDF dans votre navigateur.",
      action: "Copier le texte",
      errors: {
        invalid: "Choisissez un fichier PDF.",
        failed: "Impossible d’extraire le texte.",
      },
    },
    "protect-pdf": {
      title: "Mot de passe et chiffrement PDF",
      description: "Définissez un mot de passe d’ouverture du document.",
      hint: "Le mot de passe est appliqué localement — nous ne le stockons pas.",
      action: "Télécharger le PDF chiffré",
      errors: {
        invalid: "Choisissez un fichier PDF.",
        failed: "Impossible de chiffrer le PDF.",
      },
    },
    "unlock-pdf": {
      title: "Déverrouiller le PDF",
      description: "Supprimez le mot de passe ou les restrictions d’impression.",
      hint: "Saisissez le mot de passe actuel si le fichier est protégé.",
      action: "Télécharger le PDF déverrouillé",
      errors: {
        invalid: "Choisissez un fichier PDF.",
        failed: "Impossible de déverrouiller le PDF. Vérifiez le mot de passe.",
      },
    },
    "batch-sign": {
      title: "Signature par lot",
      description: "Une signature pour plusieurs PDF, export en ZIP.",
      hint: "Ajoutez des fichiers, placez la signature sur l’aperçu, exportez.",
      action: "Appliquer à tous",
      errors: {
        invalid: "Ajoutez au moins un PDF valide.",
        failed: "Impossible de signer le lot.",
      },
    },
  },
  sign: {
    draw: "Dessiner",
    type: "Texte",
    image: "PNG",
    clearPad: "Effacer le canevas",
    typePlaceholder: "Votre nom",
    uploadPng: "Importer un PNG transparent",
    placeHint: "Cliquez sur la page pour placer la signature.",
    size: "Taille",
    emptyPad: "Dessinez, saisissez ou importez d’abord une signature.",
    canvasAria: "Zone de dessin de la signature",
  },
  stamp: {
    presetsLabel: "Tampons prêts",
    customLabel: "Texte personnalisé",
    customPlaceholder: "Texte du tampon",
    placeHint: "Cliquez sur la page pour poser le tampon.",
    size: "Taille",
    color: "Couleur",
    paid: "PAYÉ",
    certified: "CONFORME À L’ORIGINAL",
    confidential: "CONFIDENTIEL",
    approved: "APPROUVÉ",
    received: "REÇU",
    copyStamp: "COPIE",
  },
  fillForm: {
    fieldsTitle: "Champs du formulaire",
    noFields:
      "Aucun champ interactif. Cliquez sur la page pour ajouter du texte.",
    freeTextHint: "Cliquez sur le document pour insérer du texte libre.",
    textPlaceholder: "Texte sur la page",
    flatten: "Aplatir les champs (flatten)",
    fieldFallback: (index) => `Champ ${index}`,
  },
  pageNumbers: {
    position: "Position",
    format: "Format",
    fontSize: "Taille de police",
    margin: "Marge",
    headerLeft: "En-tête gauche",
    headerCenter: "En-tête centre",
    headerRight: "En-tête droite",
    footerLeft: "Pied gauche",
    footerCenter: "Pied centre",
    footerRight: "Pied droite",
    formatSimple: "1",
    formatOf: "1 / N",
    formatPageOf: "Page 1 sur N",
  },
  redact: {
    drawHint: "Maintenez et glissez pour noircir une zone.",
    boxes: (count) => `${count} zone(s) d’occultation`,
    undo: "Annuler le dernier",
  },
  extract: {
    resultTitle: "Texte extrait",
    empty: "Aucune couche de texte n’a été trouvée dans ce document.",
    downloadTxt: "Télécharger .txt",
    pagesExtracted: (count) => `Pages traitées : ${count}`,
  },
  dateStamp: {
    formatLabel: "Format du tampon",
    formatDate: "Date",
    formatTime: "Heure",
    formatDateTime: "Date et heure",
    previewLabel: "Aperçu",
    placeHint: "Cliquez sur la page pour placer le tampon date/heure.",
    size: "Taille",
    color: "Couleur",
  },
  protect: {
    passwordLabel: "Mot de passe d’ouverture",
    passwordConfirm: "Confirmer le mot de passe",
    mismatch: "Les mots de passe ne correspondent pas.",
    minLength: "Utilisez au moins 4 caractères.",
  },
  unlock: {
    passwordLabel: "Mot de passe actuel (le cas échéant)",
    passwordHint: "Laissez vide si le PDF n’a pas de mot de passe",
    wrongPassword: "Mot de passe incorrect ou fichier corrompu.",
  },
  batchSign: {
    filesSelected: (count) => `Fichiers sélectionnés : ${count}`,
    clearList: "Vider la liste",
    positionNote:
      "La position sur l’aperçu s’applique à la page 1 de chaque PDF du lot.",
    zipAction: "Télécharger le ZIP des PDF signés",
  },
  botProtection: {
    rateLimited:
      "Veuillez patienter quelques secondes avant un nouveau téléchargement.",
    unavailable:
      "La vérification du navigateur a échoué. Actualisez la page et réessayez.",
  },
  rewardedAd: {
    sponsored: "Soutenir le projet",
    title: "Télécharger le document prêt",
    message:
      "Un court bloc sponsor est la seule condition pour garder PureSign gratuit, entièrement privé, sans inscription ni abonnement.",
    watch: "Regarder la vidéo sponsor pour télécharger",
    watching: "Visionnage sponsor en cours…",
    download: "Télécharger le fichier",
    waitHint:
      "Appuyez ci-dessous pour lancer le bloc Adsterra. Impossible de continuer sans le regarder.",
    progress: (seconds) => `${seconds} s`,
    thanks: "Merci pour le soutien. Le fichier va se télécharger.",
    close: "Fermer",
    slotLabel: "Bloc sponsor Adsterra",
  },
};
