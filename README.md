# Lexidatelier 🛠

**Créez, organisez et imprimez vos propres fiches pour le boîtier Lexidata.**

Lexidatelier est une application web libre qui permet aux enseignants de concevoir
des fiches compatibles avec le boîtier mécanique Lexidata, sans jamais avoir à
consulter une table de codes ni à réfléchir à l'ordre des réponses.

➡️ **[Ouvrir Lexidatelier](https://lelabodecharlie.forge.apps.education.fr/lexidatelier/)**

---

## Le principe

Le boîtier Lexidata est un dispositif d'autocorrection : l'élève place douze
curseurs sur la position qu'il pense être la bonne, puis le boîtier valide.
Chaque fiche correspond à une combinaison **Groupe × Série**, qui impose l'ordre
exact dans lequel les bonnes réponses doivent apparaître.

Concevoir une fiche à la main suppose donc de consulter une grille de codes, puis
d'agencer soi-même ses propositions dans le bon ordre — une opération fastidieuse
et propice aux erreurs.

**Lexidatelier fait ce travail pour vous.** Vous saisissez vos questions, vos
propositions, et vous cochez simplement la bonne réponse. L'application place
automatiquement chaque bonne réponse sur la position exigée par le boîtier.

---

## Fonctionnalités

### 🎯 Le moteur Lexidata
- **3 600 combinaisons** (60 groupes × 60 séries) calculées automatiquement.
- Algorithme rétro-conçu à partir du classeur officiel « Générateur de codes
  lexidata », et **validé sur les 720 valeurs** de sa grille de réponses.
- **Placement automatique** de la bonne réponse : vous cochez, l'application agence.
- **Aide anti-doublon** : les combinaisons déjà utilisées dans un même dossier
  sont signalées, pour éviter deux fiches corrigées à l'identique.

### ✏️ La création
- Éditeur en **écran partagé** : saisie à gauche, aperçu A4 en temps réel à droite.
- 12 questions, avec **2 ou 3 réponses** au choix (utile pour un *there is / there are*).
- **Deux mises en page** :
  - *Question texte → réponses* — un tableau, une ligne par question ;
  - *Question image → réponses texte* — de grandes illustrations avec les réponses
    en toutes lettres, façon fiche Lexidata classique.
- **Images** par import depuis l'ordinateur (compressées automatiquement) ou par URL.
- **Bannière décorative** en fond d'en-tête, recadrable au glisser-déposer.
- **5 styles** de fiche, du plus sobre au plus ludique.
- **11 polices**, dont OpenDyslexic, Luciole (basse vision), Andika (apprentis
  lecteurs) et [Marelle](https://marelle.forge.apps.education.fr/), la police
  cursive libre de la Forge, dans ses deux variantes (hampes longues ou courtes).

### 📂 L'organisation
- Un **tableau de bord** avec des dossiers thématiques que vous créez librement.
- Fiches classées par dossier : créer, dupliquer, supprimer.
- **Sauvegarde automatique** dans le navigateur.
- **Export / import** de fiches au format JSON.

### ☁️ La synchronisation
- Connexion à votre **Nuage apps.education.fr** en un clic.
- Vos fiches vous suivent d'un appareil à l'autre — **dans votre propre Nuage**,
  avec vos propres identifiants.

### 🖨️ L'impression
- **A4 portrait**, aperçu à la taille réelle.
- **Ajustement automatique** pour garantir la tenue sur une seule page, avec une
  alerte si un contenu déborde.
- Impression **en couleur** par défaut, ou en **niveaux de gris** au choix
  pour économiser l'encre.
- L'interface disparaît : seule la fiche s'imprime.

---

## Vie privée

**Aucune donnée personnelle n'est collectée ni transmise.** Tout est stocké
localement dans votre navigateur. L'application ne charge aucune ressource tierce
et fonctionne hors ligne. Si vous activez la synchronisation, vos fiches
transitent uniquement vers *votre* Nuage, avec *vos* identifiants.

---

## Installation

L'application tient dans un **unique fichier** `public/index.html` : ni backend,
ni base de données, ni dépendance. Il suffit de le servir en statique.

### Générer les PDF du parcours CP

Le script suivant génère un PDF A4 pour chacune des fiches du parcours CP dans
le dossier `sortie-pdf/` :

```powershell
npm install
npx playwright install chromium
npm run pdf:cp
```

Cette commande genere aussi automatiquement `corrige-parcours-cp-v2.pdf` et
`recueil-parcours-cp-v2.pdf` dans le meme dossier de sortie, apres les fiches
individuelles.

Pour générer un seul PDF contenant le corrigé de toutes les fiches :

```powershell
npm run pdf:corrige
```

Pour générer un seul PDF contenant toutes les fiches, prêt a envoyer a
l'impression :

```powershell
npm run pdf:recueil
```

Pour choisir un autre dossier de sortie, donnez-le en argument :

```powershell
npm run pdf:cp -- mes-pdf-cp
```

Sur la Forge, les GitLab Pages publient automatiquement le dossier `public/`.

### Les polices (facultatif)

Le sélecteur de polices fonctionne sans rien installer : tant qu'un fichier est
absent, l'application se rabat proprement sur les polices du système.

Pour activer les polices personnalisées, déposez les fichiers dans
**`public/polices/`**, à côté de `index.html`.

> ⚠️ Le dossier doit impérativement être dans `public/` : sur GitLab Pages, c'est
> le seul dossier publié. Le chemin relatif évite par ailleurs tout problème de
> CORS — les polices web ne se chargent pas de façon fiable depuis une URL `raw`.

Les formats `.woff2`, `.ttf` et `.otf` sont tous acceptés (`.woff2` reste le plus
léger). Les noms de fichiers attendus, **casse comprise** :

| Police | Source | Fichiers attendus |
|---|---|---|
| Fredoka | Google Fonts | `fredoka-400.woff2`, `fredoka-700.woff2` |
| Baloo 2 | Google Fonts | `Baloo_2.woff2` *(police variable, un seul fichier)* |
| Quicksand | Google Fonts | `quicksand-latin-400-normal.ttf`, `quicksand-latin-700-normal.ttf` |
| Nunito | Google Fonts | `Nunito-Regular.ttf`, `Nunito-Bold.ttf` |
| Comfortaa | Google Fonts | `Comfortaa-Regular.ttf`, `Comfortaa-Bold.ttf` |
| Andika | [SIL](https://software.sil.org/andika/) | `Andika-400.ttf`, `Andika-700.ttf` |
| Luciole | [luciole-vision.com](https://www.luciole-vision.com/) | `Luciole-400.woff2`, `Luciole-700.woff2` |
| OpenDyslexic | [opendyslexic.org](https://opendyslexic.org/) | `OpenDyslexic-Regular.otf` *(gras synthétique)* |
| Marelle | [Forge](https://marelle.forge.apps.education.fr/) | `marelle-regular.ttf` *(hampes longues)* |
| Marelle 2 | [Forge](https://marelle.forge.apps.education.fr/) | `Marelle2-Regular.ttf` *(hampes courtes)* |

Pour ajouter, retirer ou renommer une police, modifiez la constante `POLICES` en
tête du script : chaque entrée liste ses fichiers et leur graisse, et le format
CSS est déduit automatiquement de l'extension.

> 💡 [google-webfonts-helper](https://gwfh.mranftl.com) fournit directement les
> `.woff2` des polices Google (charset **latin**, graisses **400** et **700**).

### La synchronisation Nuage (facultatif)

1. Importez `workflow_lexidatelier_n8n.json` dans votre instance n8n, puis activez-le.
2. Copiez l'URL de production du webhook.
3. Reportez-la dans la constante `NUAGE_WEBHOOK` en tête du script.

Le workflow reçoit `{ action, username, password, server, data }` et gère les
actions `test`, `load` et `save` vers le Nuage (WebDAV Nextcloud). Les identifiants
ne sont jamais stockés côté serveur : ils transitent à chaque requête et servent
uniquement à écrire dans le Nuage de l'enseignant.

> ⚠️ Invitez toujours les enseignants à créer un **mot de passe d'application**
> (Nuage → Paramètres → Sécurité), jamais leur mot de passe principal.

---

## Contribuer

Les suggestions et signalements sont les bienvenus :
👉 **[Ouvrir un ticket](https://forge.apps.education.fr/lelabodecharlie/lexidatelier/-/work_items)**

Le [journal des modifications](CHANGELOG) retrace les évolutions de l'application.

---

## Crédits et licence

**Éditeur** : Charlie ROLLO — [charlie.rollo@ac-versailles.fr](mailto:charlie.rollo@ac-versailles.fr)

**Hébergement** : Forge des Communs Numériques Éducatifs, Ministère de l'Éducation
nationale — 110 rue de Grenelle, 75007 Paris.

**Licence** : [GNU General Public License v3.0](https://www.gnu.org/licenses/gpl-3.0.fr.html) (GPLv3).
Toute redistribution ou modification doit citer l'auteur original : **Charlie ROLLO**.

Les polices proposées restent soumises à leurs licences respectives
(SIL Open Font License pour la plupart, CC BY pour Luciole).

---

*Cultivé dans la [Forge des Communs Numériques Éducatifs](https://forge.apps.education.fr/) 🌱*