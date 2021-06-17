# Documentation Développeur

Ce document présente les différents fichiers et les fonctions modifiées au cours du projet long des TSI 2020 - 2021.

La documentation développeur a été automatiquement générée par [JSDoc](https://jsdoc.app/) et se trouve sur [index.html](./DocDev/index.html).

Pour mettre à jour la doc :
```shell
# Installation de la librairie jsdoc
$ sudo apt-get install jsdoc-toolkit

# Generation de la jsdoc
$ jsdoc -d=doc/DocDev -r code/js/
```


## Liste des fichiers modifiés

+ index.html


+ creative_functions.js :
    - calculate_avg_temperature()


+ initialisation.js :
     - modification de general_config
     - modification de la fonction init()

+ load_data_functions.js :
     - setCurrent()
     - selectfootprint()
     - loadAll()
     - reprojetteCoordMinMax()
     - reprojetteCoordOUV()
     - reprojette()

+ menu.js :
     - sortDate()
     - changeNetcdf()
     - activateTemporalAnimation()
     - preventRadioSwap()
     - modification de la fonction initialise()

+ main_2.css


## Liste des fichiers créés


+ 2D_graph.js

+ dynamique_div.js

+ filter-footprint.js

+ footprint.js

+ time_visualisation.js

+ netdcf-normaliser-server/
