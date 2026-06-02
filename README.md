# Classe Vibe

> Outil web de suivi de classe — points, groupes/maisons, passeports, plan de classe et tirage au sort. 100 % local, sans serveur, sans inscription.

## ✨ Présentation

Classe Vibe est une application web pour enseignants du primaire au lycée. Elle permet de gérer plusieurs classes, suivre la progression des élèves au quotidien, attribuer des points positifs ou négatifs, organiser la classe en maisons/groupes (façon Poudlard), distribuer des tampons sur un passeport de réussites, faire des tirages au sort à la roue de la fortune et concevoir son plan de classe en glisser-déposer.

Tout est stocké dans le navigateur de l'enseignant. Aucune inscription, aucun serveur, aucune donnée transmise à un tiers.

## 🚀 Démarrer en 30 secondes

1. Ouvrir l'application : [classe-vibe sur la Forge](https://forge.apps.education.fr/lelabodecharlie/classe-vibe/)
2. Cliquer sur **+ Nouvelle classe**
3. Donner un nom à la classe (et un niveau libre si tu veux : "6ème", "CM2", "Terminale STMG"…)
4. Activer ou non les **groupes** et les **passeports**
5. Ajouter des élèves manuellement ou via la tuile **📋 Importer une liste** (CSV/TXT ou simple collage)

C'est prêt.

## 🎯 Fonctionnalités principales

### Suivi de classe au quotidien
- **Score par élève** (10 par défaut, modifiable au reset du lundi)
- **8 comportements positifs et 8 négatifs** prédéfinis, modifiables et extensibles
- **Attribution flexible** : à un élève, à tout un groupe, à toute la classe
- **Historique** des 40 dernières actions
- **Classement** des élèves et des groupes
- **Reset du lundi** pour repartir à 10 chaque semaine

### Groupes / Maisons (optionnel)
- Crée des **groupes colorés** avec emblème (emoji ou image) et nom personnalisé
- Le label "Groupe" est **librement renommable** par classe : Maison, Équipe, Clan, Tribu…
- 🏆 **Trophée animé** sur le groupe en tête
- **Couleur du groupe propagée automatiquement** aux cartes des élèves membres

### Passeports / Tampons (optionnel)
- Système de **tampons indépendant des points**, façon carnet de réussites
- Tampons personnalisables avec emoji ou image (URL)
- **Visuel doré distinctif** dans la modale d'attribution
- Compteur de tampons visible sur la carte de chaque élève

### 🎡 Tirage au sort
- **Roue de la fortune** animée (6-9 tours, easing naturel)
- **Exclusion automatique** des élèves déjà tirés (un élève différent à chaque spin)
- Bouton "🗑 Retirer de la roue" pour exclure manuellement
- **Répartition aléatoire** en N groupes (2 à 20) façon Fisher-Yates

### 🪑 Plan de classe
- **Glisser-déposer libre** des tables sur une grille
- Tables 1 place ou 2 places, rotation libre
- Clic-pour-assigner un élève à une chaise
- Désambiguïsation automatique des prénoms identiques (initiale du nom ajoutée)
- **Bouton Imprimer** avec CSS d'impression dédiée

### 📺 Projection (mode TBI)
- Vue **plein écran sombre** avec grandes lettres, pensée pour le fond de classe
- Code de session court (4 caractères) affiché en grand
- Classement groupes + élèves trié par score

### Synchro tablette ↔ tableau (sans serveur)
- Sur la tablette : **📺 Projeter** → **⬇ Exporter** télécharge un snapshot `classevibe-CODE.json`
- Transférer le fichier (AirDrop, mail, Drive, clé USB…)
- Sur l'ordinateur de classe : **📥 J'ai un code de projection** → charger le fichier → projection plein écran en lecture seule

### Avatars
- **70 avatars Lorelei** (style cartoon doux)
- Choix manuel ou aléatoire
- Avatar déterministe par défaut basé sur le prénom

## 🔒 Confidentialité

- **100 % local** : tout est stocké dans le `localStorage` du navigateur
- **Aucune inscription**, aucun compte, aucun cookie
- **Aucune donnée transmise à un serveur tiers** (sauf l'API DiceBear pour afficher les avatars, qui ne reçoit que le seed textuel — aucun nom d'élève n'est transmis)
- **Exportation libre** de tes données au format JSON
- **Suppression totale** possible à tout moment depuis Mentions légales

## 🌐 Compatibilité

- Tous les navigateurs récents (Chrome, Firefox, Safari, Edge)
- Ordinateur, tablette, téléphone, TBI
- Mode hors ligne possible (sauf chargement initial des polices et avatars)

## 📦 Installation locale

Classe Vibe est un fichier HTML unique sans dépendance de build :

```bash
git clone https://forge.apps.education.fr/lelabodecharlie/classe-vibe.git
cd classe-vibe
# Ouvrir public/index.html dans un navigateur, c'est tout
```

Aucun `npm install`, aucun bundler, aucun framework. L'application complète tient dans un seul fichier HTML d'environ 130 Ko.

## 🛠 Architecture technique

- **HTML/CSS/JS vanilla** (pas de framework)
- **ES5** intégral pour compatibilité maximale (pas de `let`, pas d'arrow function dans les boucles critiques)
- **Stockage** : `localStorage` avec préfixe `cvibe_v5_`
- **Avatars** : API DiceBear Lorelei via `<img>` avec `loading="lazy"`
- **Police** : Nunito chargée depuis Google Fonts
- **Pas de service worker** (à venir pour le vrai offline)

## 🤝 Contribuer

Les suggestions et signalements de bugs sont les bienvenus via les [tickets de la Forge](https://forge.apps.education.fr/lelabodecharlie/classe-vibe/-/work_items).

Toute contribution doit citer Charlie ROLLO comme auteur original (clause de la licence GPLv3).

## 📜 Licence et crédits

**Licence** : [GNU General Public License v3.0 (GPLv3)](https://www.gnu.org/licenses/gpl-3.0.fr.html)

**Auteur** : Charlie ROLLO — [charlie.rollo@ac-versailles.fr](mailto:charlie.rollo@ac-versailles.fr)

**Hébergement** : Forge des Communs Numériques Éducatifs, Ministère de l'Éducation nationale (110 rue de Grenelle, 75007 Paris).

**Inspiré de** : [La Classe des Héros](https://vibe-edu.forge.apps.education.fr/la-classe-des-heros/) (vibe-edu).

**Avatars** : [Lorelei](https://www.figma.com/community/file/1198749693280469639) par [Lisa Wischofsky](https://www.instagram.com/lischi_art/), sous licence [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/), servis par l'API publique [DiceBear](https://www.dicebear.com).

**Police** : [Nunito](https://fonts.google.com/specimen/Nunito) (Open Font License).

---

Voir le [CHANGELOG](./CHANGELOG) pour la liste détaillée des évolutions.