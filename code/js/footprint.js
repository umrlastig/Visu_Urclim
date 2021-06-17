// Création de la carte leaflet pour le choix de l'emprise
export var carte = L.map('footprint_map').setView([48.8534, 2.3488], 12);
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(carte);

//style marqueur
var icon_marqueur = L.icon({
    iconUrl: './images/emprise.jpg',
    iconSize: [10, 10],

})
// création des layers hors de la fonction pour pouvoir les manipuler plus facilement 
export var marker_front1 = L.marker([0,0], {draggable:'true', 'opacity': 0, icon: icon_marqueur}).addTo(carte);
export var marker_front2 = L.marker([0,0], {draggable:'true' , 'opacity': 0, icon: icon_marqueur}).addTo(carte);
export var polygone = L.rectangle([[0,0],[0,0],[0,0],[0,0]], {'opacity' :0}).addTo(carte);
export var groupLayer = L.layerGroup();

/**
 * Cette fonction permet de créer un polygone dynamique ainsi que de d'afficher les points des fichiers
 * @param {*} carte 
 * @param {*} lat_min 
 * @param {*} lat_max 
 * @param {*} lng_min 
 * @param {*} lng_max 
 * @param {*} listepoint 
 */
export function display_footprint(carte,lat_min,lat_max,lng_min,lng_max,listepoint){

    let lat_moy = (lat_min+lat_max)/2;
    let lng_moy = (lng_min+lng_max)/2;
    carte.setView(new L.LatLng(lat_moy, lng_moy));
    var bounds = [[lat_min, lng_min], [lat_max, lng_max]];
    marker_front1.setLatLng([lat_min, lng_min]);
    marker_front1.setOpacity(1);
    marker_front2.setLatLng([lat_max, lng_max]);
    marker_front2.setOpacity(1);


    polygone.setBounds(bounds);
    polygone.setStyle({
    'color': '#FF7F00',
    'fill': true,
    'fillColor': '#FFFF00',
    'fillOpacity': 0.2,
    'opacity' : 1
   });
    marker_front1.on('drag',() => deplacementCurseur(lat_min,lat_max,lng_min,lng_max));
    marker_front2.on('drag',() => deplacementCurseur(lat_min,lat_max,lng_min,lng_max));    

    

    //netoyage des point précédents
    groupLayer.eachLayer(function (layer) {
        groupLayer.removeLayer(layer);
    });
    groupLayer.addTo(carte);
    //apparition des points
    listepoint.forEach(point => {
        groupLayer.addLayer(L.circleMarker([point.latitude, point.longitude], {color: 'blue', radius: 5}));
        groupLayer.addTo(carte);
    });

    /**
     * Cette méthode permet de gérer le deplacement d'un des curseurs, en modifiant les lat et long min et max et en changeant la couleur des points
     * @param {*} lat_min 
     * @param {*} lat_max 
     * @param {*} lng_min 
     * @param {*} lng_max 
     */
    function deplacementCurseur(lat_min,lat_max,lng_min,lng_max) {
        let coord1 = marker_front1.getLatLng();
        let coord2 = marker_front2.getLatLng();
        // vérification que le curseur 1 ne sorte pas de l'emprise max
        if (coord1['lat']<lat_min){
            coord1['lat']=lat_min;
        }else if(coord1['lat']>lat_max){
            coord1['lat']=lat_max;
        }
        if (coord1['lng']<lng_min){
            coord1['lng']=lng_min;
        }else if(coord1['lng']>lng_max){
            coord1['lng']=lng_max;
        }
        // vérification que le curseur 2 ne sorte pas de l'emprise max
        if (coord2['lat']<lat_min){
            coord2['lat']=lat_min;
        }else if(coord2['lat']>lat_max){
            coord2['lat']=lat_max;
        }
        if (coord2['lng']<lng_min){
            coord2['lng']=lng_min;
        }else if(coord2['lng']>lng_max){
            coord2['lng']=lng_max;
        }

        let new_bounds = L.latLngBounds(coord1, coord2);
        polygone.setBounds(new_bounds);

        // changement de couleur 
        groupLayer.eachLayer(function (layer) {
            let coordPoint = layer.getLatLng();
            if(new_bounds.contains(coordPoint)){
                layer.setStyle({color: 'blue', radius: 5});
            }else{
                layer.setStyle({color: 'red', radius: 5});
            }
        });        
    };      
    
};

