# Documentation Utilisateur

<p>Ce document est un document utilisateur pour le projet long des TSI 2020 - 2021. </p>

# Guide d'installation

<h2> La librairie NetCDF</h2>

+ Ouvrir un terminal
+ Lancer la commande suivante : 

```shell
 $ sudo apt install netcdf-bin
```

<h2> Installation d'un serveur</h2>

Il est nécessaire de posséder un serveur web tel que Apache2. 

<h2> Emplacement du projet </h2>

Il faut mettre le dossier du projet dans le repertoire du serveur.

<h2> Installation de npm</h2>

+ Ouvrir un terminal dans le dossier : interface_visu_tsi
+ Lancer dans le terminal :

```shell
$ cd interface_visu_tsi/netcdf-normaliser-server

$ npm install

```

# Guide de démarrage rapide

Afin de lancer le serveur node :

+ Ouvrir un terminal dans le dossier : interface_visu_tsi
+ Lancer les commandes suivantes :
```shell
$ cd interface_visu_tsi/netcdf-normaliser-server

$ node index.js 
```

+ Lancer le serveur apache
+ Ouvrir dans un navigateur : http://localhost/interface_visu_tsi/code/



# Les fonctionnalités 

### Sélection de plusieurs fichiers NetCDF simultané

<p> Lors de la sélection du fichier NetCDF, il est possible de sélectionner plusieurs fichiers à des dates différentes. Les fichiers vont pour la suite être chargés dans l'application</p>

### Sélection du choix de fichier des bâtiments et des routes

<p> Il est possible de choisir le fichier des bâtiments et des routes. L'utilisateur peut ainsi charger les fichiers sur les zones qui nous intéressent. </p>

### Sélection de l'emprise et filtrage des données selon l'emprise

<p>Les données des fichiers NetCDF peuvent avoir une emprise importante. L'utilisateur peut choisir alors de sélectionner seulement la zone qui l'intéresse à l'aide d'une carte et de curseurs. Les données chargées vont ainsi se limiter à l'emprise sélectionnée par l'utilisateur. </p>

### Affichage d'un graphique de visualisation temporelle en 2D

<p> L'utilisateur peut avoir accès à un graphique 2D représentant les températures moyennes de chaque niveau TEB et la moyenne de tous les niveaux TEB pour chacun des fichiers chargés. Cette visulisation permet de trouver les dates le plus intéréssantes pour le visualisation spatiale 3D.</p>

### Affichage d'un graphique de visualisation temporelle en 3D

<p>L'utilisateur peut aussi avoir accès à un graphique 3D représentant selon trois axes:</p>

* la coordonnée x du pied de la barre représente le x ième niveau TEB,
* la coordonnée y du pied de la barre représente la y ième date des données en entré,
* la hauteur de la barre au dessus de son pied représente la température moyenne d’un niveau TEB donné à une date donnée.

 <p>La couleur de la barre représente également la température comme dans la représentation
spatiale des données.</p>

### Gestion des clics sur les graphes 2D et 3D

<p> Les graphiques 2D et 3D sont des graphiques dynamiques. En effet, il est possible de sélectionner une date directement à partir du graphique en cliquant sur la donnée qui nous intéresse. Le fichier affiché dans la visualisation spatiale 3D va changer pour être celui que l'utilisateur a sélectionné.  </p>

### Modification de l'affichage des routes, par interpolation

<p> La température d'une route est à la base la même que celle du bloc dans lequel elle se
situe. Cependant, celle-ci n'est pas constante. Pour se rapprocher d'un affichage plus réaliste, la température est calculée pour chaque point de la route par rapport aux blocs adjacents.  </p>

### Affichage de différents instants par une animation

<p> Lorsque l'utilisateur charge plusieurs fichiers NetCDF, il peut choisir de changer de fichier NetCDF affiché à l’écran selon un intervalle de temps régulier. </p>

# Manuel d'utilisation

<p> La démonstration de l'application s'effectue à l'aide de plusieurs vidéos.</p>

### Chargement des fichiers
<a href="https://youtu.be/gPRiKQ6i7og">Vidéo de chargement des fichiers </a>

<p> La première vidéo explique pas à pas le chargement des données. Elle montre le chargement de plusieurs fichiers ainsi que la sélection d'emprise. La sélection des routes et de bâtiments est optionnelle, il est possible de sélectionner des fichiers différents.</p>
<p> De plus, cette vidéo explique comment afficher les données météorologiques ainsi que changer de date.</p>
<p> Et enfin, comment d'activer une visulisation temporelle qui change de date selon un intervalle de temps. </p>


### Visualisation temporelle

<a href="https://youtu.be/7WTjFy6m7EQ"> Vidéo de visualisation temporelle </a>
<p> Cette vidéo montre les différentes visulisations temporelles. Il est aussi montré comment intéragir avec les différents graphiques et comment changer de date.</p>

### Interpolation des routes

<a href="https://youtu.be/uElZz0rsRms"> Vidéo d'interpolation des routes </a>
<p> Cette vidéo montre comment activer l'interpolation de la température des routes.</p>





