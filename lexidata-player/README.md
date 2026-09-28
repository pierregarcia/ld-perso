# Lexidata Player

Simulateur tactile du boîtier de réponses Lexidata. L'application n'affiche pas les fiches : elle remplace uniquement le boîtier physique et conserve son principe d'autocorrection.

## Utilisation

1. Choisir un groupe et une série entre 1 et 60.
2. Sélectionner une position (1, 2 ou 3) pour chacune des 12 questions de la fiche papier.
3. Corriger librement les réponses. Une erreur n'est jamais indiquée.
4. Lorsque les 12 positions sont exactes, le témoin se lève et la réussite est célébrée.

Changer de groupe ou de série efface les réponses. Le bouton **Recommencer** efface les réponses sans changer l'activité. Seule la langue est conservée entre deux visites.

## Développement

```sh
npm install
npm run dev
npm test
npm run build
npm run test:e2e
```

`npm run test:e2e` teste l'artefact de production avec Playwright sur des formats ordinateur et téléphone, y compris un rechargement hors ligne.

## Installation hors ligne

Après une première ouverture en ligne, le navigateur peut installer Lexidata Player sur l'écran d'accueil. L'application, ses polices et son algorithme sont ensuite disponibles sans connexion.

## Algorithme et licence

Le moteur dans `src/lexidata.ts` est extrait sans modification fonctionnelle du moteur validé de Lexidatelier. Il calcule les 12 positions pour les 3 600 couples groupe-série.

Le projet est distribué sous la licence AGPL-3.0 du dépôt parent. La police Fredoka est fournie sous SIL Open Font License.