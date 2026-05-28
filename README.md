Le Séquenceur IA

Bâtissez votre progression d'éducation à l'intelligence artificielle, de la 6ème à la terminale, en quelques clics.

À propos
Le Séquenceur IA est un outil d'ingénierie pédagogique conçu pour les enseignants du second degré qui souhaitent intégrer l'éducation à l'IA dans leurs disciplines. Il permet de bâtir une progression cohérente sur l'année autour des trois axes de la Progression IA de la DRANE Île-de-France et des compétences du CRCN, puis de détailler chaque séance dans le moindre détail (compétences travaillées, supports, déroulé minuté, trace écrite, devoirs) — le tout via une interface intuitive avec aperçu A4 en temps réel.
Le principe est simple : vous créez une séquence par niveau (Séquence IA 6ème, 5ème, etc.), vous y ajoutez ses séances, et chaque séance se construit à gauche tandis que l'aperçu papier se met à jour à droite. Une fois prêtes, vos fiches s'exportent en PDF, Markdown ou Word/OpenDocument.
Licence du projet : GNU GPL v3
Source des items : Progression IA de la DRANE Île-de-France, sous AGPL v3+
Auteur
Charlie ROLLO
Professeur d'anglais
Académie de Versailles
Contact : charlie.rollo@ac-versailles.fr
Principe de fonctionnement
Le Séquenceur IA est un fichier HTML autonome (aucune dépendance externe, aucune installation, aucun serveur). Il s'ouvre directement dans un navigateur et structure votre travail autour de deux espaces complémentaires.
Espace Séquenceur — du tableau de bord à la fiche de séance
L'onglet Séquenceur affiche un tableau de bord où vos séquences apparaissent comme des tuiles, groupées par niveau (6ème, 5ème, 4ème, 3ème pour le collège ; Seconde, Première, Terminale pour le lycée). Chaque tuile contient directement ses séances — pas de fiche de séquence intermédiaire.
1 — Création d'une séquence
Un clic sur ＋ Nouvelle séquence ouvre une modale (niveau obligatoire, titre et année facultatifs). La séquence apparaît immédiatement comme tuile, prête à accueillir ses séances.
2 — Compétences numériques (quatre réservoirs)
Chaque séance puise ses compétences travaillées dans quatre réservoirs distincts :

⚙️ Savoir comment fonctionnent les IA — 8 items (algorithme, token, biais, approche statistique, entraînement, IA adaptative vs générative…)
🔍 Identifier les enjeux des IA — 11 items (coût environnemental, métiers impactés, vérification, autonomie, plagiat, souveraineté…)
📖 Apprendre avec l'IA — 11 items (mémoriser, esprit critique, oral en interaction, esprit critique, stratégies d'apprentissage…)
💻 Compétences du CRCN — 16 sous-compétences réparties dans les 5 domaines du Cadre de Référence des Compétences Numériques

Pour chaque axe, vous pouvez piocher dans le référentiel ou ajouter un item personnalisé. Chaque ajout dans une séance enrichit automatiquement la séquence parente.
3 — Fiche de séance
L'éditeur de séance présente, dans l'ordre sur l'aperçu A4 :

Compétences numériques (axes IA + CRCN, le CRCN étant sous-groupé par domaine)
Supports (URLs cliquables)
Déroulé de la séance (activités chronométrées, total automatique)
Trace écrite attendue (police manuscrite par défaut)
Devoirs (URLs auto-converties en liens)

L'enseignant peut aussi ajouter une image d'illustration (bannière ou ronde), choisir une police personnalisée et ajuster la taille du texte.
Espace Progression — vision d'ensemble et couverture
L'onglet Progression permet de planifier l'année. Une progression rassemble des séquences sur un périmètre de niveaux que vous choisissez (cases à cocher : 6ème, 5ème… avec raccourcis « Tout collège », « Tout lycée », « Tout »).
Couverture des compétences
Le tracker affiche en permanence la checklist intégrale des 46 compétences du référentiel (30 axes IA + 16 CRCN), avec un marqueur ✓ vert pour chaque compétence couverte par au moins une séquence et un marqueur ○ rouge pour celles qu'il reste à aborder. Le CRCN est sous-groupé par domaine pour une lecture facilitée. Une barre de progression résume la couverture en pourcentage.
Couverture des niveaux
Un second indicateur vérifie que tous les niveaux du périmètre choisi sont effectivement représentés par au moins une séquence.
Aperçu et exports
Chaque élément ajouté apparaît instantanément sur la fiche A4 virtuelle. Quatre formats d'export sont proposés pour chaque fiche (séance) et pour la progression :

PDF via la fenêtre d'impression du navigateur (mise en page A4 optimisée, sans les outils d'édition)
Markdown (aperçu, copie presse-papier, téléchargement)
Word (.doc) ou OpenDocument (.odt) pour réutilisation
JSON pour la progression (sauvegarde / import / partage entre collègues)

Points forts de l'outil

Conformité : items issus de la Progression IA officielle de la DRANE Île-de-France et du référentiel CRCN.
Zéro code : aucune compétence technique requise, tout se fait à la souris.
Confidentialité totale : aucune donnée n'est envoyée sur un serveur. Tout est stocké localement dans le localStorage de votre navigateur.
Hors ligne : le fichier fonctionne sans connexion internet une fois ouvert.
Léger : un seul fichier HTML d'environ 110 ko, aucun framework, aucune dépendance.
Responsive : interface utilisable sur ordinateur, tablette et téléphone (l'éditeur s'empile verticalement sur petits écrans).
Thème clair / sombre : commutateur global, choix mémorisé.
Persistance : vos séquences, séances et progressions restent disponibles à la prochaine ouverture du fichier.

Hébergement et utilisation

Utilisation directe : Le Séquenceur IA sur Apps Éducation
Hébergement : Forge des Communs Numériques Éducatifs (Ministère de l'Éducation nationale) — hébergement gratuit via Git

Code source
https://forge.apps.education.fr/lelabodecharlie/le-sequenceur-ia
Signalements et suggestions : tickets de la forge
Crédits

Items des trois axes IA : Progression IA — DRANE Île-de-France, sous licence AGPL v3+.
Compétences numériques : Cadre de Référence des Compétences Numériques (CRCN) — Ministère de l'Éducation nationale.
Projet jumeau pour les langues vivantes : Le Séquenceur LV.