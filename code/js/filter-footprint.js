import { create_buildings } from "./creative_functions.js";
import { general_config, scene } from "./initialisation.js";
import {reprojetteCoordMinMax} from './load_data_functions.js';

/**
 * Cette fonction permet de charger le bati et la route pour un jeu de donnée et une emprise précise
 */
export function chargeBatiEtRoute() {
  
	//Si aucun jeu de donnée n'est selectionné, on prend celle de paris_centre
	var dataset = "paris_centre";
	var road_path = "";
	var build_path = "";
	
	if ($("#data_road").val() != "" ){
		road_path = "geojson/" + $("#data_road").val().split("fakepath\\")[1];
	}
	else{
		road_path = "geojson/roads_" + dataset + ".geojson";
	}

	if ($("#data_build").val() != ""){
		build_path = "geojson/" + $("#data_build").val().split("fakepath\\")[1];
	}
	else{
		build_path = "geojson/buildings_" + dataset + ".geojson";
	}

	fetch(road_path).then(r => r.json()).then(function (data) {
		general_config.data_road = data;
		filtreRoute();
	});

	fetch(build_path).then(r => r.json()).then(function (data) {
		general_config.data_build = data;
		filtreBati();
		setTimeout(function (d) {
			create_buildings(general_config.data_build, scene, $("#type_bati").val());
		}, 1000);
	});

	$("#type_bati").on("change", function () {
		create_buildings(general_config.data_build, scene, $("#type_bati").val());
	});
}
/**
 * Cette fonction filtre le bati pour ne garder que la zone voulue
 */
export function filtreBati() {

	var features = general_config.data_build.features;
	var res = [];
	features.forEach(bati => {
		var sommeX = 0;
		var sommeY = 0;
		var n = 0;
		bati.geometry.coordinates.forEach(tab => {
			tab.forEach(points => {
				points.forEach(point => {
					sommeX += point[0];
					sommeY += point[1];
					n += 1;
				});
			});
		});
		var centreX = sommeX / n;
		var centreY = sommeY / n;
		if (centreX > general_config.x_min && centreX < general_config.x_max && centreY > general_config.y_min && centreY < general_config.y_max) {
			res.push(bati);
		}
	});
	general_config.data_build.features = res;
}

/**
 * Cette fonction filtre les routes pour ne garder que la zone voulue
 */
function filtreRoute() {

	var features = general_config.data_road.features;
	var res = [];
	features.forEach(route => {


		/*
		// Ce code ne fonctionne que si on a angle et distance
		var alpha = route.properties.angle;
		var dist = route.properties.distance / 2;
		var centreX = route.geometry.coordinates[0] + Math.cos(alpha)*dist;
		var centreY = route.geometry.coordinates[1] + Math.sin(alpha)*dist;*/
		
		var centreX = route.geometry.coordinates[0];
		var centreY = route.geometry.coordinates[1];
		
		if (centreX>general_config.x_min && centreX<general_config.x_max && centreY>general_config.y_min && centreX<general_config.y_max){
			res.push(route);
		}
	});
	general_config.data_road.features = res;
}

/**
 * Cette fonction filtre les points O et u,v pour ne garder que la zone voulue
	Il ne garde que les points dans les colonnes et les lignes du quadrillage
	Pour prévenir le probleme : un point d'une ligne ne fait pas partis de l'emprise mais toute les autres en fond partis
 * @param {*} data_list 
 */
export function filtreDonneeOUV(data_list){

    var featuresO = data_list.listePoints;
    var featuresU = data_list.listePointsU;
    var featuresV = data_list.listePointsV;
    var resO = [];
    var resU = [];
    var resV = [];
    for (let i = 0; i < featuresO.length; i++) {
        const point = featuresO[i];
        if (point.i_point >= data_list.globalData.ni_min && point.i_point <= data_list.globalData.ni_max && point.j_point >= data_list.globalData.nj_min && point.j_point <= data_list.globalData.nj_max){
            resO.push(point);
            resU.push(featuresU[i]);
            resV.push(featuresV[i]);
        }
    }
    data_list.listePoints = resO;
    data_list.listePointsU = resU;
    data_list.listePointsV = resV;
}

/**
 * Cette fonction recalcule les températures minimales et maximales
 * @param {*} data_list 
 */
export function calcTempMinMax(data_list){
	let temp_max = 0;
	let temp_min = 999;

	//On cherche les temp_min et max du fichier
	data_list.listePoints.forEach((point) => {
		for (let key in point) {
			if (
				(key.startsWith("tht") ||
					(key.startsWith("teb") && !key.startsWith("tebz"))) &&
				point[key] != 999
			) {
				if (point[key] > temp_max) {
					temp_max = point[key];
				}
				if (point[key] < temp_min) {
					temp_min = point[key];
				}
			}
		}
	});

	//On recalcul general_config.temp_min et general_config.temp_max
	if (temp_min < general_config.temp_min){
		general_config.temp_min = temp_min;
	}
	if (temp_max > general_config.temp_max){
		general_config.temp_max = temp_max;
	}

}

/**
 * Recalcule nombre ligne et colonne
 * @param {*} data_list 
 */
export function findNiNj(data_list){

	let ni_min;
	let nj_min;
	if(data_list.globalData.ni_max){
		ni_min = data_list.globalData.ni_max;
		nj_min = data_list.globalData.nj_max;
	}else{
		ni_min = data_list.globalData.ni;
		nj_min = data_list.globalData.nj;
	}
	
	var ni_max = 0;
	
	var nj_max = 0;
	for (let index = 0; index < data_list.listePoints.length; index++) {
		const point_actuel = data_list.listePoints[index];
		if (point_actuel.latitude >= general_config.lat_min && point_actuel.latitude <= general_config.lat_max && point_actuel.longitude >= general_config.lng_min && point_actuel.longitude <= general_config.lng_max){
			if (point_actuel.i_point < ni_min){
				ni_min=point_actuel.i_point;
			}
			if (point_actuel.i_point > ni_max){
				ni_max=point_actuel.i_point;
			}
			
			if (point_actuel.j_point < nj_min){
				nj_min=point_actuel.j_point;
			}
			if (point_actuel.j_point > nj_max){
				nj_max=point_actuel.j_point;
			}
		}
	}
	data_list.globalData.ni = ni_max - ni_min + 1;
	data_list.globalData.nj = nj_max - nj_min + 1;
	data_list.globalData.ni_min = ni_min;
	data_list.globalData.ni_max = ni_max;
	data_list.globalData.nj_min = nj_min;
	data_list.globalData.nj_max = nj_max;
}

/**
 * Cette fonction permet de recalculer l'emprise des bati pour qu'elle s'adapte aux plaques
 * @param {*} data_list 
 */
export function newFootprint(data_list){

	let ni = data_list.globalData.ni;
	let nj = data_list.globalData.nj;
	let pointS0 = data_list.listePoints[0];
	let pointNE = data_list.listePoints[ni*nj-1];
	if (ni == 1 || nj ==1){
		var deltaLong = 0.004266142845153809;
		var deltaLat = 0.0028076171875;
	}else{
		var deltaLong = Math.abs(data_list.listePoints[0].longitude - data_list.listePoints[1].longitude)/2;
		var deltaLat = Math.abs(data_list.listePoints[0].latitude - data_list.listePoints[ni].latitude)/2;

	}
	
	
	general_config.lat_min = pointS0.latitude-deltaLat;
	general_config.lat_max = pointNE.latitude+deltaLat;
	general_config.lng_min = pointS0.longitude-deltaLong;
	general_config.lng_max = pointNE.longitude+deltaLong;
	var EPSG2154 =
		"+proj=lcc +lat_1=49 +lat_2=44 +lat_0=46.5 +lon_0=3 +x_0=700000 +y_0=6600000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs";
	reprojetteCoordMinMax(EPSG2154);

	general_config.Coord_X_paris = (general_config.x_min+general_config.x_max)/2;
	general_config.Coord_Y_paris = (general_config.y_min+general_config.y_max)/2;
};
