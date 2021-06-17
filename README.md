# Interface visu tsi

## Contexte
L'urbanisation entraîne une densification de l'espace urbain qui, à terme, peut générer une augmentation des températures dans les zones les plus denses. Ce phénomène nommé îlot de chaleur peut être néfaste pour les personnes vivant dans ces zones. Les danger proviennent soit directement de la chaleur créée, soit indirectement d'une mauvaise dissipation des polluants par exemple. Différents facteurs sont responsables de la création d'îlots de chaleur comme la morphologie des bâtiments ou l'occupation des sols.


Un prototype d'environnement de visualisation 3D  axé sur la visualisation spatiale et temporelle de données météorologiques et urbaines est donc en développement au LASTIG sous forme d'application web.

L'objectif principal de cette interface est de permettre la co-visualisation de données urbaines (le bâti) avec des données météorologiques 3D (température de l'air) et de permettre une exploitation visuelle simultanée de ces deux composantes.


## Présentation du projet

L'objectif principal de notre projet a donc été de permettre la visualisation de la composante temporelle des données méteotologiques au sein de l'interface.

### Les fonctionnalités de l'application

- Sélection de plusieurs fichiers NetCDF simultané.

- Sélection de l'emprise et filtrage des données selon l'emprise.

- Permettre de sélectionner les données à représenter dans la scène 3D, selon un instant temporel modifiable dynamiquement.

- Affichage de deux graphiques de visualisation temporelle en 2D et en 3D.

- Affichage de différents instants par une animation.

- Modification de l'affichage des routes, par interpolation.




Les rendus nécessaires se trouvent dans le dossier [doc](doc/).
Vous pouvez par ailleurs, lire le  [rapport du projet](doc/Rapport_projet_long_Lastig.pdf)

## Installation et Utilisation

Pour installer et utiliser cette application, vous trouverez tout dans la  [documentation utilisateur](doc/Doc_utilisateur.md).

Vous trouverez une explication des fichiers modifiés au cours du projet dans la [documentation développeur](doc/DocDev.md). La documentation développeur a été automatiquement générée par JSDoc et se trouve sur 
[index.html](doc/DocDev/index.html).

## Crédits

**Développeur du prototype de départ & Commenditaire du projet**: Jacques Gautier, IGN / LASTIG / GEOVIS

**Développeur de ce projet** :
Cédric Périon,
Thibault Petiet,
Félix Quinton,
Laura Wenclik
