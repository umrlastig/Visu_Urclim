import { general_config, scene, camera } from "./initialisation.js";
import {
	create_data_texture,
	recreate_scene,
	create_temp_histogram,
	set_lights
} from "./creative_functions.js";
import { numberInArray } from "./color_function.js";
import {showData, showFootprint } from "./menu.js";
import {
	chargeBatiEtRoute,
	filtreDonneeOUV,
	calcTempMinMax,
	findNiNj,
	newFootprint
} from "./filter-footprint.js";

import {closeChoiceContainer} from "./menu.js"
import {
	display_footprint,
	carte,


} from "./footprint.js";
import {draw_graph2D} from "./2D_graph.js"
import { showTimeVisMulti } from "./time_visualisation.js";
import { showTimeVis } from "./time_visualisation2.js";


export function chargerParams(event) {
	/*
		  chargement d'un set de paramètres depuis le sous-menu configuration
		  Certains paramètres ne sont peut être pas à jour.
	  */
	scene.remove(general_config.grid);
	scene.remove(general_config.grid_plane);
	let file = event.target.files[0];

	let reader = new FileReader();

	reader.readAsText(file);
	reader.onload = function (e) {
		let results = JSON.parse(e.target.result);

		general_config.camera_x = results.camera_x;
		general_config.camera_y = results.camera_y;
		general_config.camera_z = results.camera_z;
		general_config.data_ni = results.data_ni;
		general_config.data_nj = results.data_nj;
		general_config.h_factor = results.h_factor;
		general_config.temp_array = results.temp_array;
		general_config.id_meso_array = results.id_meso_array;
		general_config.id_sbl_array = results.id_sbl_array;
		general_config.id_meso_array_real_plane = results.id_meso_array_real_plane;
		general_config.id_sbl_array_real_plane = results.id_sbl_array_real_plane;
		(general_config.type_points = results.type_points),
			(general_config.domain_min = results.domain_min),
			(general_config.domain_max = results.domain_max),
			(general_config.id_meso_array_roads = results.id_meso_array_roads);
		general_config.id_sbl_array_roads = results.id_sbl_array_roads;
		general_config.regular_size = results.regular_size;
		general_config.particle_density = results.particle_density;
		general_config.relative_density_factor = results.relative_density_factor;
		general_config.relative_size_factor = results.relative_size_factor;
		general_config.transparency_factor = results.transparency_factor;
		general_config.h_min = results.h_min;
		general_config.h_max = results.h_max;
		general_config.z_min = results.z_min;
		general_config.z_max = results.z_max;
		general_config.x_min = results.x_min;
		general_config.x_max = results.x_max;
		general_config.y_min = results.y_min;
		general_config.y_max = results.y_max;
		general_config.is_animated = results.is_animated;
		general_config.animation_parameter = results.animation_parameter;
		general_config.animation_speed_factor = results.animation_speed_factor;
		general_config.number_of_points_real_plane =
			results.number_of_points_real_plane;
		general_config.temp_min_factor = results.temp_min_factor;
		general_config.temp_max_factor = results.temp_max_factor;
		general_config.z_min_factor = results.z_min_factor;
		general_config.z_max_factor = results.z_max_factor;
		general_config.h_min_factor = results.h_min_factor;
		general_config.h_max_factor = results.h_max_factor;
		general_config.x_min_factor = results.x_min_factor;
		general_config.x_max_factor = results.x_max_factor;
		general_config.y_min_factor = results.y_min_factor;
		general_config.y_max_factor = results.y_max_factor;
		general_config.cst_X = results.cst_X;
		general_config.cst_Y = results.cst_Y;
		general_config.cst_Z = results.cst_Z;
		general_config.active_HCL_id = results.active_HCL_id;
		general_config.active_color_class = results.active_color_class;
		general_config.temp_values = results.temp_values;
		general_config.nb_array = results.nb_array;
		general_config.grid_vertical2D = results.grid_vertical2D;
		general_config.data_road = results.data_road;
		general_config.id_sbl_array_vertical_plane =
			results.id_sbl_array_vertical_plane;
		general_config.id_meso_array_vertical_plane =
			results.id_meso_array_vertical_plane;

		//Position et angle de la camera
		camera.position.set(
			general_config.camera_x,
			general_config.camera_y,
			general_config.camera_z
		);
		// pour les points : cocher cxbx
		let meso_ckbx_pts = document.querySelectorAll(".ckbx_meso_points");
		let sbl_ckbx_pts = document.querySelectorAll(".ckbx_sbl_points");
		general_config.id_meso_array.forEach((value) => {
			meso_ckbx_pts[value - 2].checked = true;
		});

		general_config.id_sbl_array.forEach((value) => {
			sbl_ckbx_pts[value - 1].checked = true;
		});
		// pour les plans 2D  : cocher ckbx
		let meso_ckbx_planes = document.querySelectorAll(".ckbx_meso_planes");
		let sbl_ckbx_planes = document.querySelectorAll(".ckbx_sbl_planes");
		general_config.id_meso_array_real_plane.forEach((value) => {
			meso_ckbx_planes[value - 2].checked = true;
		});
		general_config.id_sbl_array_real_plane.forEach((value) => {
			sbl_ckbx_planes[value - 1].checked = true;
		});
		//h factor
		let h_factor_calc =
			general_config.h_factor < 1
				? general_config.h_factor * 10
				: general_config.h_factor + 9;
		$("#h_slider").slider("value", h_factor_calc);
		$("#h_control_label").html("h_factor : " + general_config.h_factor);
		//formes des points
		let datackbx = document.querySelectorAll(".type_de_points");
		if (general_config.type_points === 1) {
			datackbx[0].checked = true;
			datackbx[1].checked = false;
			datackbx[2].checked = false;
		} else if (general_config.type_points === 2) {
			datackbx[0].checked = false;
			datackbx[1].checked = true;
			datackbx[2].checked = false;
		} else {
			datackbx[0].checked = false;
			datackbx[1].checked = false;
			datackbx[2].checked = true;
		}
		// active hcl
		$("#active_HCL").html($(`#HCL_${general_config.active_HCL_id}`).html());
		// size
		$("#size_text_input").val(general_config.regular_size.toFixed(2));
		$("#size_slider").slider("value", general_config.regular_size * 150);
		// relative size factor
		if (general_config.relative_size_factor == 1) {
			$("#relative_size_factor_control_label").html(
				"relative_size_factor : " + 0
			);
		} else if (general_config.relative_size_factor < 1) {
			var label_value =
				parseInt((1 - general_config.relative_size_factor) * 100) / 100;
			$("#relative_size_factor_control_label").html(
				"relative_size_factor : " + label_value + " less values"
			);
		} else if (general_config.relative_size_factor > 1) {
			var label_value =
				parseInt((general_config.relative_size_factor - 1) * 100) / 100;
			$("#relative_size_factor_control_label").html(
				"relative_size_factor : " + label_value + " high values"
			);
		}
		$("#relative_size_factor_size_slider").slider(
			"value",
			general_config.relative_size_factor * 100
		);
		// general density
		$("#density_text_input").val(general_config.particle_density);
		$("#density_slider").slider(
			"value",
			general_config.particle_density * 10000
		);
		//relative density
		if (general_config.relative_density_factor == 1) {
			$("#relative_density_factor_control_label").html(
				"relative_density_factor : " + 0
			);
		} else if (general_config.relative_density_factor < 1) {
			var label_value =
				parseInt((1 - general_config.relative_density_factor) * 100) / 100;
			$("#relative_density_factor_control_label").html(
				"relative_density_factor : " + label_value + " less values"
			);
		} else if (general_config.relative_density_factor > 1) {
			var label_value =
				parseInt((general_config.relative_density_factor - 1) * 100) / 100;
			$("#relative_density_factor_control_label").html(
				"relative_density_factor : " + label_value + " high values"
			);
		}
		$("#relative_density_factor_slider").slider(
			"value",
			general_config.relative_density_factor * 100
		);
		//transparency factor
		$("#transparency_control_label").html(
			"transparency_factor: " + general_config.transparency_factor
		);
		$("#transparency_slider").slider(
			"value",
			general_config.transparency_factor * 100
		);
		//number of points real plane
		$("#number_of_points_real_plane_label").html(
			"number_of_points_real_plane : " +
			general_config.number_of_points_real_plane
		);
		$("#number_of_points_real_plane_slider").slider(
			"value",
			general_config.number_of_points_real_plane
		);
		//filters = temperature
		let value_0 = (general_config.temp_min_factor / Math.PI / 2) * 100;
		let value_1 = (general_config.temp_max_factor / Math.PI / 2) * 100;
		$("#temp-slider-range").slider("values", 0, value_0);
		$("#temp-slider-range").slider("values", 1, value_1);
		let tempMin = general_config.temp_array[0] - 273.15;
		let tempMax = general_config.temp_array[1] - 273.15;
		let tempMinCalc = tempMin + (tempMax - tempMin) * (value_0 / 100);
		let tempMaxCalc = tempMin + (tempMax - tempMin) * (value_1 / 100);
		$("#temperatures-label").val(
			tempMinCalc.toFixed(2) + "°C - " + tempMaxCalc.toFixed(2) + "°C"
		);
		// filter : Z control
		$("#z-slider-range").slider("values", 0, general_config.z_min_factor * 100);
		$("#z-slider-range").slider("values", 1, general_config.z_max_factor * 100);
		$("#z-slider-label").val(
			parseInt(general_config.z_min_factor * 100) +
			" - " +
			parseInt(general_config.z_max_factor * 100)
		);
		// filter : H control
		$("#h-slider-range").slider("values", 0, general_config.h_min_factor * 100);
		$("#h-slider-range").slider("values", 1, general_config.h_max_factor * 100);
		$("#h-slider-label").val(
			parseInt(general_config.h_min_factor * 100) +
			" - " +
			parseInt(general_config.h_max_factor * 100)
		);
		// filter : X control
		$("#x-slider-range").slider("values", 0, general_config.x_min_factor * 100);
		$("#x-slider-range").slider("values", 1, general_config.x_max_factor * 100);
		$("#x-slider-label").val(
			parseInt(general_config.x_min_factor * 100) +
			" - " +
			parseInt(general_config.x_max_factor * 100)
		);
		// filter : Y control
		$("#y-slider-range").slider("values", 0, general_config.y_min_factor * 100);
		$("#y-slider-range").slider("values", 1, general_config.y_max_factor * 100);
		$("#y-slider-label").val(
			parseInt(general_config.y_min_factor * 100) +
			" - " +
			parseInt(general_config.y_max_factor * 100)
		);

		// Animation
		if (general_config.is_animated == true) {
			$("#animation_ckbx")[0].checked = true;
		} else {
			$("#animation_ckbx")[0].checked = false;
		}
		if (general_config.animation_parameter == "X") {
			$("#animation_type_x").prop("checked", true);
			$("#animation_type_y").prop("checked", false);
			$("#animation_type_z").prop("checked", false);
			$("#animation_type_temp").prop("checked", false);
		} else if (general_config.animation_parameter == "Y") {
			$("#animation_type_x").prop("checked", false);
			$("#animation_type_y").prop("checked", true);
			$("#animation_type_z").prop("checked", false);
			$("#animation_type_temp").prop("checked", false);
		} else if (general_config.animation_parameter == "Z") {
			$("#animation_type_x").prop("checked", false);
			$("#animation_type_y").prop("checked", false);
			$("#animation_type_z").prop("checked", true);
			$("#animation_type_temp").prop("checked", false);
		} else if (general_config.animation_parameter == "temp") {
			$("#animation_type_x").prop("checked", false);
			$("#animation_type_y").prop("checked", false);
			$("#animation_type_z").prop("checked", false);
			$("#animation_type_temp").prop("checked", true);
		}
		//animation speed factor
		$("#animation_speed_slider").slider(
			"value",
			general_config.animation_speed_factor * 10000 + 100
		);
		$("#animation_speed_control_label").html(
			"animation_speed_factor: " + general_config.animation_speed_factor
		);
		//active color class (ecarts ou effectifs) <============= a tester
		$("#color_class_control_input").val(general_config.active_color_class);
		//pour le nombre de tableaux choisis
		numberInArray();
		$("#nb_array").val(general_config.nb_array);

		recreate_scene();

		//histogram
		create_temp_histogram();
		let borne_temp_min = document.querySelector("#rect_temp_min");
		let borne_temp_max = document.querySelector("#rect_temp_max");
		let temperatureMini =
			(borne_temp_min.x.baseVal.value / 330) *
			(general_config.domain_max - general_config.domain_min) +
			general_config.domain_min;
		$("#temp_min_input").val("" + temperatureMini.toFixed(2));
		let temperatureMaxi =
			(borne_temp_max.x.baseVal.value / 330) *
			(general_config.domain_max - general_config.domain_min) +
			general_config.domain_min;
		$("#temp_max_input").val("" + temperatureMaxi.toFixed(2));
	};
}

/**
 * Cette fonction permet de modifié le fichier à visualiser en modifiant l'objet general_config
 * @param {*} i
 */
export const setCurrent = (i) => {
	const data_to_load_list = general_config.netcdf_list[i];
	general_config.data_points_O_2 = data_to_load_list.listePoints;
	general_config.data_points_U_2 = data_to_load_list.listePointsU;
	general_config.data_points_V_2 = data_to_load_list.listePointsV;
	general_config.data_ni = data_to_load_list.globalData.ni;
	general_config.data_nj = data_to_load_list.globalData.nj;

	general_config.data_volume_3D = create_data_texture(
		general_config.data_points_O_2,
		general_config.data_points_U_2,
		general_config.data_points_V_2,
		general_config.data_ni,
		general_config.data_nj,
		31 + 6,
		general_config.temp_min,
		general_config.temp_max
	);
	set_lights();



}

/**
 * permet de recuperer les coordonnees de l'emprise selectionnée par l'utilisateur.
 * @param {*} marker_front1
 * @param {*} marker_front2
 * @param {*} data_to_load_list
 */
export function selectfootprint(marker_front1, marker_front2,data_to_load_list) {

	let coord1 = marker_front1.getLatLng();
	let coord2 = marker_front2.getLatLng();

	// vérification que le curseur 1 ne sorte pas de l'emprise max
	if (coord1["lat"] < data_to_load_list.globalData.latitude_min) {
		coord1["lat"] = data_to_load_list.globalData.latitude_min;
	} else if (coord1["lat"] > data_to_load_list.globalData.latitude_max) {
		coord1["lat"] = data_to_load_list.globalData.latitude_max;
	}
	if (coord1["lng"] < data_to_load_list.globalData.longitude_min) {
		coord1["lng"] = data_to_load_list.globalData.longitude_min;
	} else if (coord1["lng"] > data_to_load_list.globalData.longitude_max) {
		coord1["lng"] = data_to_load_list.globalData.longitude_max;
	}
	// vérification que le curseur 2 ne sorte pas de l'emprise max
	if (coord2["lat"] < data_to_load_list.globalData.latitude_min) {
		coord2["lat"] = data_to_load_list.globalData.latitude_min;
	} else if (coord1["lat"] > data_to_load_list.globalData.latitude_max) {
		coord2["lat"] = data_to_load_list.globalData.latitude_max;
	}
	if (coord2["lng"] < data_to_load_list.globalData.longitude_min) {
		coord2["lng"] = data_to_load_list.globalData.longitude_min;
	} else if (coord2["lng"] > data_to_load_list.globalData.longitude_max) {
		coord2["lng"] = data_to_load_list.globalData.longitude_max;
	}

	if (coord1["lat"] <= coord2["lat"]) {
		general_config.lat_min = coord1["lat"];
		general_config.lat_max = coord2["lat"];
	} else {
		general_config.lat_min = coord2["lat"];
		general_config.lat_max = coord1["lat"];
	}
	if (coord1["lng"] <= coord2["lng"]) {
		general_config.lng_min = coord1["lng"];
		general_config.lng_max = coord2["lng"];
	} else {
		general_config.lng_min = coord2["lng"];
		general_config.lng_max = coord1["lng"];
	}

	showFootprint();
	showData();

	//Cette fonction doit etre lancer lorsque tout les fichiers sont charger et que l'on a cliqué sur select footprint
	// Il faut donc changer le temps, ou trouver une meilleure méthode plus performante
	loadAll();

	//on redessine l'emprise pour enlever les points hors de l'emprise selectionné
	display_footprint(carte,
        general_config.lat_min,
        general_config.lat_max,
        general_config.lng_min,
        general_config.lng_max,
        general_config.netcdf_list[0].listePoints);

}
/**
 * Après selection de l'emprise, cette méthode charge tout : bati, OUV, et reprojette
 */
function loadAll() {


	var EPSG2154 = "+proj=lcc +lat_1=49 +lat_2=44 +lat_0=46.5 +lon_0=3 +x_0=700000 +y_0=6600000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs";
	reprojetteCoordMinMax(EPSG2154);

	general_config.temp_min = 999;
	general_config.temp_max = 0;

	general_config.netcdf_list.forEach(data_list => {
		findNiNj(data_list);
		filtreDonneeOUV(data_list);
		reprojette(EPSG2154);
		calcTempMinMax(data_list);
	});

	general_config.temp_array = [general_config.temp_min,general_config.temp_max];
	general_config.domain_max = Math.floor(general_config.temp_max + 1 - 273.15);
	general_config.domain_min = Math.floor(general_config.temp_min - 273.15);

	newFootprint(general_config.netcdf_list[0]);
	chargeBatiEtRoute();
	setCurrent(0);
	draw_graph2D();
    showTimeVis(general_config.netcdf_list);
		showTimeVisMulti(general_config.netcdf_list);
}
/**
 * Cette fonction permet de calculer les valeurs X/Y min/max après calcul d'emprise
 * @param {*} projection
 */
export function reprojetteCoordMinMax(projection) {

	var res1 = proj4(projection, [
		general_config.lng_min,
		general_config.lat_min,
	]);
	var res2 = proj4(projection, [
		general_config.lng_max,
		general_config.lat_max,
	]);
	general_config.x_min = res1[0];
	general_config.x_max = res2[0];
	general_config.y_min = res1[1];
	general_config.y_max = res2[1];
}

/**
 * Cette fonction permet de calculer les valeurs X/Y après calcul d'emprise
 * @param {*} data
 * @param {*} projection
 */
function reprojetteCoordOUV(data, projection) {

	data.forEach((point) => {
		try {
			var res = proj4(projection, [point.longitude, point.latitude]);
			point.x = res[0];
			point.y = res[1];
		} catch (error) {
			console.log(error);
		}
	});
}
/**
 * lance reprojetteCoordMinMax et reprojetteCoordOUV pour tout les fichiers
 * @param {*} projection
 */
function reprojette(projection) {

	general_config.netcdf_list.forEach(data_list => {
		reprojetteCoordOUV(data_list.listePoints, projection);
		reprojetteCoordOUV(data_list.listePointsU, projection);
		reprojetteCoordOUV(data_list.listePointsV, projection);
	});
}
