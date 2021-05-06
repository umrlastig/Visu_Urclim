import { general_config, scene, camera } from './initialisation.js';
import { create_data_texture, recreate_scene, create_temp_histogram,create_buildings,set_lights } from './creative_functions.js'
import { numberInArray } from './color_function.js';


export function chargerParams(event) {
	scene.remove(general_config.grid);
	scene.remove(general_config.grid_plane);
	let file = event.target.files[0]

	let reader = new FileReader();


	reader.readAsText(file)
	reader.onload = function(e) {
		let results = JSON.parse(e.target.result)

		general_config.camera_x = results.camera_x;
		general_config.camera_y = results.camera_y;
		general_config.camera_z = results.camera_z;
		general_config.data_ni=results.data_ni;
		general_config.data_nj=results.data_nj;
		general_config.h_factor=results.h_factor;
		general_config.temp_array= results.temp_array;
		general_config.id_meso_array= results.id_meso_array;
		general_config.id_sbl_array= results.id_sbl_array;
		general_config.id_meso_array_real_plane=results.id_meso_array_real_plane;
		general_config.id_sbl_array_real_plane=results.id_sbl_array_real_plane;
		general_config.type_points= results.type_points,
		general_config.domain_min= results.domain_min,
		general_config.domain_max= results.domain_max,
		general_config.id_meso_array_roads=results.id_meso_array_roads;
		general_config.id_sbl_array_roads= results.id_sbl_array_roads;
		general_config.regular_size= results.regular_size;
		general_config.particle_density= results.particle_density;
		general_config.relative_density_factor= results.relative_density_factor;
		general_config.relative_size_factor= results.relative_size_factor;
		general_config.transparency_factor= results.transparency_factor;
		general_config.h_min= results.h_min;
		general_config.h_max= results.h_max;
		general_config.z_min= results.z_min;
		general_config.z_max= results.z_max;
		general_config.x_min= results.x_min;
		general_config.x_max= results.x_max;
		general_config.y_min= results.y_min;
		general_config.y_max= results.y_max;
		general_config.is_animated= results.is_animated;
		general_config.animation_parameter=results.animation_parameter;
		general_config.animation_speed_factor= results.animation_speed_factor;
		general_config.number_of_points_real_plane= results.number_of_points_real_plane;
		general_config.temp_min_factor= results.temp_min_factor;
		general_config.temp_max_factor= results.temp_max_factor;
		general_config.z_min_factor= results.z_min_factor;
		general_config.z_max_factor= results.z_max_factor;
		general_config.h_min_factor= results.h_min_factor;
		general_config.h_max_factor= results.h_max_factor;
		general_config.x_min_factor= results.x_min_factor;
		general_config.x_max_factor= results.x_max_factor;
		general_config.y_min_factor= results.y_min_factor;
		general_config.y_max_factor= results.y_max_factor;
		general_config.cst_X= results.cst_X;
		general_config.cst_Y= results.cst_Y;
		general_config.cst_Z= results.cst_Z;
		general_config.active_HCL_id= results.active_HCL_id;
		general_config.active_color_class= results.active_color_class;
		general_config.temp_values = results.temp_values;
		general_config.nb_array = results.nb_array;
		general_config.grid_vertical2D = results.grid_vertical2D;
		general_config.data_road = results.data_road;
		general_config.id_sbl_array_vertical_plane = results.id_sbl_array_vertical_plane;
		general_config.id_meso_array_vertical_plane = results.id_meso_array_vertical_plane;


		//Position et angle de la camera
		camera.position.set( general_config.camera_x, general_config.camera_y, general_config.camera_z );
		// pour les points : cocher cxbx
		let meso_ckbx_pts = document.querySelectorAll('.ckbx_meso_points');
		let sbl_ckbx_pts = document.querySelectorAll('.ckbx_sbl_points');
		general_config.id_meso_array.forEach(value => {
			meso_ckbx_pts[value-2].checked = true;
		})

		general_config.id_sbl_array.forEach(value => {
			sbl_ckbx_pts[value-1].checked = true;
		})
		// pour les plans 2D  : cocher ckbx
		let meso_ckbx_planes = document.querySelectorAll('.ckbx_meso_planes');
		let sbl_ckbx_planes = document.querySelectorAll('.ckbx_sbl_planes');
		general_config.id_meso_array_real_plane.forEach(value => {
			meso_ckbx_planes[value-2].checked = true;
		})
		general_config.id_sbl_array_real_plane.forEach(value => {
			sbl_ckbx_planes[value-1].checked = true;
		})
		//h factor
		let h_factor_calc = general_config.h_factor < 1 ? general_config.h_factor *10 : general_config.h_factor +9;
		$( "#h_slider" ).slider('value', h_factor_calc)
		$("#h_control_label").html("h_factor : " + general_config.h_factor);
		//formes des points
		let datackbx = document.querySelectorAll('.type_de_points')
		if (general_config.type_points === 1){
			datackbx[0].checked = true;
			datackbx[1].checked = false;
			datackbx[2].checked = false;
		} else if (general_config.type_points === 2 ) {
			datackbx[0].checked = false;
			datackbx[1].checked = true;
			datackbx[2].checked = false;
		}else {
			datackbx[0].checked = false;
			datackbx[1].checked = false;
			datackbx[2].checked = true;
		}
		// active hcl
		$("#active_HCL").html($(`#HCL_${general_config.active_HCL_id}`).html());
		// size
		$("#size_text_input").val(general_config.regular_size.toFixed(2));
		$( "#size_slider" ).slider('value', general_config.regular_size*150);
		// relative size factor
		if(general_config.relative_size_factor == 1){
			$("#relative_size_factor_control_label").html("relative_size_factor : " + 0);
		} else if(general_config.relative_size_factor < 1){
			var label_value = parseInt((1-general_config.relative_size_factor)*100)/100;
			$("#relative_size_factor_control_label").html("relative_size_factor : " + label_value + " less values");
		} else if(general_config.relative_size_factor > 1){
			var label_value = parseInt((general_config.relative_size_factor-1)*100)/100;
			$("#relative_size_factor_control_label").html("relative_size_factor : " + label_value + " high values");
		}
		$( "#relative_size_factor_size_slider" ).slider('value', general_config.relative_size_factor*100);
		// general density
		$("#density_text_input").val(general_config.particle_density);
		$( "#density_slider" ).slider('value', general_config.particle_density*10000);
		//relative density
		if(general_config.relative_density_factor == 1){
			$("#relative_density_factor_control_label").html("relative_density_factor : " + 0);
		} else if(general_config.relative_density_factor < 1){
			var label_value = parseInt((1-general_config.relative_density_factor)*100)/100;
			$("#relative_density_factor_control_label").html("relative_density_factor : " + label_value + " less values");
		} else if(general_config.relative_density_factor > 1){
			var label_value = parseInt((general_config.relative_density_factor-1)*100)/100;
			$("#relative_density_factor_control_label").html("relative_density_factor : " + label_value + " high values");
		}
		$( "#relative_density_factor_slider" ).slider('value', general_config.relative_density_factor*100);
		//transparency factor
		$("#transparency_control_label").html("transparency_factor: " + general_config.transparency_factor);
		$( "#transparency_slider" ).slider('value', general_config.transparency_factor*100);
		//number of points real plane
		$("#number_of_points_real_plane_label").html("number_of_points_real_plane : " + general_config.number_of_points_real_plane);
		$( "#number_of_points_real_plane_slider" ).slider('value', general_config.number_of_points_real_plane);
		//filters = temperature
		let value_0 = general_config.temp_min_factor/Math.PI/2*100;
		let value_1 = general_config.temp_max_factor/Math.PI/2*100;
		$( "#temp-slider-range" ).slider('values', 0, value_0)
		$( "#temp-slider-range" ).slider('values', 1, value_1)
		let tempMin = general_config.temp_array[0]-273.15 ;
		let tempMax = general_config.temp_array[1]-273.15;
		let tempMinCalc = tempMin + ((tempMax - tempMin)*(value_0/100));
		let tempMaxCalc = tempMin + ((tempMax - tempMin)*(value_1/100));
		$( "#temperatures-label" ).val( tempMinCalc.toFixed(2) + "°C - " + tempMaxCalc.toFixed(2) + "°C" );
		// filter : Z control
		$( "#z-slider-range" ).slider( "values", 0, general_config.z_min_factor*100 );
		$( "#z-slider-range" ).slider( "values", 1, general_config.z_max_factor*100 );
		$( "#z-slider-label" ).val( parseInt(general_config.z_min_factor*100)  + " - " + parseInt(general_config.z_max_factor*100) );
		// filter : H control
		$( "#h-slider-range" ).slider( "values", 0, general_config.h_min_factor*100 );
		$( "#h-slider-range" ).slider( "values", 1, general_config.h_max_factor*100 );
		$( "#h-slider-label" ).val( parseInt(general_config.h_min_factor*100)  + " - " + parseInt(general_config.h_max_factor*100) );
		// filter : X control
		$( "#x-slider-range" ).slider( "values", 0, general_config.x_min_factor*100 );
		$( "#x-slider-range" ).slider( "values", 1, general_config.x_max_factor*100 );
		$( "#x-slider-label" ).val( parseInt(general_config.x_min_factor*100)  + " - " + parseInt(general_config.x_max_factor*100) );
		// filter : Y control
		$( "#y-slider-range" ).slider( "values", 0, general_config.y_min_factor*100 );
		$( "#y-slider-range" ).slider( "values", 1, general_config.y_max_factor*100 );
		$( "#y-slider-label" ).val( parseInt(general_config.y_min_factor*100)  + " - " + parseInt(general_config.y_max_factor*100) );

		// Animation
		if (general_config.is_animated == true) {
			$("#animation_ckbx")[0].checked = true;
		} else {
			$("#animation_ckbx")[0].checked = false;
		}
		if (general_config.animation_parameter == 'X') {
			$('#animation_type_x').prop("checked", true);
			$('#animation_type_y').prop("checked", false);
			$('#animation_type_z').prop("checked", false);
			$('#animation_type_temp').prop("checked", false);
		} else if (general_config.animation_parameter == 'Y') {
			$('#animation_type_x').prop("checked", false);
			$('#animation_type_y').prop("checked", true);
			$('#animation_type_z').prop("checked", false);
			$('#animation_type_temp').prop("checked", false);
		} else if(general_config.animation_parameter == 'Z') {
			$('#animation_type_x').prop("checked", false);
			$('#animation_type_y').prop("checked", false);
			$('#animation_type_z').prop("checked", true);
			$('#animation_type_temp').prop("checked", false);
		} else if(general_config.animation_parameter == 'temp') {
			$('#animation_type_x').prop("checked", false);
			$('#animation_type_y').prop("checked", false);
			$('#animation_type_z').prop("checked", false);
			$('#animation_type_temp').prop("checked", true);
		}
		//animation speed factor
		$( "#animation_speed_slider" ).slider('value', (general_config.animation_speed_factor*10000+100))
		$("#animation_speed_control_label").html("animation_speed_factor: " + general_config.animation_speed_factor);
		//active color class (ecarts ou effectifs) <============= a tester
		$("#color_class_control_input").val(general_config.active_color_class);
		//pour le nombre de tableaux choisis
		numberInArray();
		$('#nb_array').val(general_config.nb_array)

		recreate_scene();

		//histogram
		create_temp_histogram()
		let borne_temp_min = document.querySelector('#rect_temp_min');
		let borne_temp_max = document.querySelector('#rect_temp_max');
		let temperatureMini = (borne_temp_min.x.baseVal.value/330)*(general_config.domain_max-general_config.domain_min)+general_config.domain_min;
		$('#temp_min_input').val(""+temperatureMini.toFixed(2));
		let temperatureMaxi = (borne_temp_max.x.baseVal.value/330)*(general_config.domain_max-general_config.domain_min)+general_config.domain_min;
		$('#temp_max_input').val(""+temperatureMaxi.toFixed(2));

	} ;

}


export function loadChosenDataSet() {
	general_config.data_points_O_2 = [];
	general_config.data_points_U_2 = [];
	general_config.data_points_V_2 = [];

	var dataset = $('#load_dataset').val();

	load_Data("O", "CSV/lambert_O_" + dataset + ".csv", [{'level':2, 'data':general_config.data_points_O_2}],	"#ff5733");
	load_Data("U", "CSV/lambert_U_" + dataset + ".csv", [{'level':2, 'data':general_config.data_points_U_2}],	"#ff5733");
	load_Data("V", "CSV/lambert_V_" + dataset + ".csv", [{'level':2, 'data':general_config.data_points_V_2}],	"#ff5733");

	setTimeout(function(d){
		general_config.data_volume_3D = create_data_texture(general_config.data_points_O_2,general_config.data_points_U_2,general_config.data_points_V_2, general_config.data_ni, general_config.data_nj, 31 + 6,general_config.temp_min,general_config.temp_max);
		set_lights();
	}, 1000);
	
	
	dataset = dataset.split("_simu")[0];
	if($( "#load_dataset option:selected" ).text() == "Centre medium" || $( "#load_dataset option:selected" ).text() == "Centre small" || $( "#load_dataset option:selected" ).text() == "Centre" || $( "#load_dataset option:selected" ).text() == "Beaubourg"){
		
		fetch("geojson/roads_" + dataset + ".geojson").then(r => r.json()).then(function( data ) {
			general_config.data_road = data;
		});
	
		fetch("geojson/buildings_" + dataset + ".geojson").then(r => r.json()).then(function( data ) {
			general_config.data_build = data;
			setTimeout(function(d){
				create_buildings(general_config.data_build,scene,$("#type_bati").val());
			}, 1000);
		});
		
	}
	

	if ($( "#load_dataset option:selected" ).text() == "Beaubourg" || $( "#load_dataset option:selected" ).text() == "Beaubourg Simu"){
		general_config.data_ni = 1;
		general_config.data_nj = 1;
	} else if ($( "#load_dataset option:selected" ).text() == "Centre"){
		general_config.data_ni = 9;
		general_config.data_nj = 6;
	} else if ($( "#load_dataset option:selected" ).text() == "Centre small"){
		general_config.data_ni = 2;
		general_config.data_nj = 2;
	} else if ($( "#load_dataset option:selected" ).text() == "Centre medium"){
		general_config.data_ni = 3;
		general_config.data_nj = 3;
	} else if ($( "#load_dataset option:selected" ).text() == "V3"){
		general_config.data_ni = 24;
		general_config.data_nj = 20;
	}
	$( "#type_bati" ).on( "change", function() {
		create_buildings(general_config.data_build,scene,$("#type_bati").val());
	});


	$('#data_loaded').html("Chargement réussi");
	$('#data_block').hide();
	//attend 1.5 seconde avant de fermer l'onglet
	setTimeout(closeChoiceContainer, 800);
}

export function loadChosenData() {
	general_config.data_points_O_2 = [];
	general_config.data_points_U_2 = [];
	general_config.data_points_V_2 = [];

	let dataO = $('#data_o').val().split('fakepath\\')[1];
	let dataU = $('#data_u').val().split('fakepath\\')[1];
	let dataV = $('#data_v').val().split('fakepath\\')[1];
	let data_road = $('#data_road').val().split('fakepath\\')[1];
	let data_build = $('#data_build').val().split('fakepath\\')[1];
	

	console.log(dataO)
	console.log(dataU)
	console.log(dataV)
	console.log(data_road)
	console.log(data_build)

	//dataO = "lambert_O_paris_centre.csv";
	//	dataU = "lambert_U_paris_centre.csv";
	//	dataV = "lambert_V_paris_centre.csv";
	//	data_road = "paris_centre_roads_vertex.geojson";
	//	data_build = "paris_centre_2_with_mapuce_V2.geojson";


	// a adapter quand on aura les fichiers meso NH
	//if (dataO.split("O")[1] !== dataU.split("U")[1] || dataO.split("O")[1] !== dataV.split("V")[1] ||
	//dataV.split("V")[1] !== dataU.split("U")[1]) {
	//	$('#data_loaded').html(`Problème dans les données choisies : <div> Data O : ${dataO}, </div> <div> Data U : ${dataU}, </div>
	//	<div> Data V : ${dataV} </div>`);
	//}
	//else {

		load_Data("O",
		"./CSV/"+ dataO,
		[{'level':2, 'data':general_config.data_points_O_2}],
		"#ff5733");
		load_Data("U",
		"./CSV/"+ dataU,
		[{'level':2, 'data':general_config.data_points_U_2}],
		"#ff5733");
		load_Data("V",
		"./CSV/"+ dataV,
		[{'level':2, 'data':general_config.data_points_V_2}],
		"#ff5733");

		$.getJSON( "./geojson/"+ data_road, function( data ) {
			general_config.data_road = data;
		});
		
		setTimeout(function(d){
			general_config.data_volume_3D = create_data_texture(general_config.data_points_O_2,general_config.data_points_U_2,general_config.data_points_V_2, general_config.data_ni, general_config.data_nj, 31 + 6,general_config.temp_min,general_config.temp_max);
			set_lights();
		}, 1000);
		
		setTimeout(function(d){
			$.getJSON( "./geojson/"+ data_build, function( data ) {
				general_config.data_build = data;
				create_buildings(general_config.data_build,scene,$("#type_bati").val());
			});
		}, 1000);

		if (dataO.split("paris_beaubourg").length >1){
			general_config.data_ni = 1;
		general_config.data_nj = 1;
		} else if (dataO.split("paris_centre").length >1){
			general_config.data_ni = 9;
		general_config.data_nj = 6;
		}  else if (dataO.split("centre_small").length >1){
			general_config.data_ni = 2;
		general_config.data_nj = 2;
		} else if(dataO.split("V2").length >1){
			general_config.data_ni = 26;
		general_config.data_nj = 22;
		} else if(dataO.split("V3").length >1){
			general_config.data_ni = 24;
		general_config.data_nj = 20;
		}
		


		$( "#type_bati" ).on( "change", function() {
			create_buildings(general_config.data_build,scene,$("#type_bati").val());
		});


		$('#data_loaded').html("Chargement réussi");
		$('#data_block').hide()
		//attend 1.5 seconde avant de fermer l'onglet
		setTimeout(closeChoiceContainer, 800);

	//}

}

function closeChoiceContainer() {
	let choiceContainer = document.getElementById("choose_data_container");
	choiceContainer.style.height = "0em";
}

function load_Data(type_point, data_url, data_Meso_NH_to_load_list){

	var data = d3.csv(data_url, function (d) {
		
		var temp_max = 0;
		var temp_min = 0;
		d.forEach(function (d,i) {
			for(var o = 0; o< data_Meso_NH_to_load_list.length; o++){

				var data_x,
				data_y;
				var zs_var;

				if(isNaN(d.X)) {
					data_x = 0;
				} else {
					data_x =  parseFloat(d.X);
				}
				if(isNaN(d.Y)) {
					data_y = 0;
				} else {
					data_y =  parseFloat(d.Y);
				}
				if(isNaN(d.ZS)) {
					zs_var = -999;
				} else {
					zs_var =  parseFloat(d.ZS);
				}

				var tht_2_var = null,
				tht_3_var = null,
				tht_4_var = null,
				tht_5_var = null,
				tht_6_var = null,
				tht_7_var = null,
				tht_8_var = null,
				tht_9_var = null,
				tht_10_var = null,
				tht_11_var = null,
				tht_12_var = null,
				tht_13_var = null,
				tht_14_var = null,
				tht_15_var = null,
				tht_16_var = null,
				tht_17_var = null,
				tht_18_var = null,
				tht_19_var = null,
				tht_20_var = null,
				tht_21_var = null,
				tht_22_var = null,
				tht_23_var = null,
				tht_24_var = null,
				tht_25_var = null,
				tht_26_var = null,
				tht_27_var = null,
				tht_28_var = null,
				tht_29_var = null,
				tht_30_var = null,
				tht_31_var = null,
				tht_32_var = null;

				var TEB_1_var = null,
				TEB_2_var = null,
				TEB_3_var = null,
				TEB_4_var = null,
				TEB_5_var = null,
				TEB_6_var = null;
				
				var TEBZ_1_var = null,
				TEBZ_2_var = null,
				TEBZ_3_var = null,
				TEBZ_4_var = null,
				TEBZ_5_var = null,
				TEBZ_6_var = null;
				
				if(type_point == "O"){
					tht_2_var = d.THT_2;
					tht_3_var = d.THT_3;
					tht_4_var = d.THT_4;
					tht_5_var = d.THT_5;
					tht_6_var = d.THT_6;
					tht_7_var = d.THT_7;
					tht_8_var = d.THT_8;
					tht_9_var = d.THT_9;
					tht_10_var = d.THT_10;
					tht_11_var = d.THT_11;
					tht_12_var = d.THT_12;
					tht_13_var = d.THT_13;
					tht_14_var = d.THT_14;
					tht_15_var = d.THT_15;
					tht_16_var = d.THT_16;
					tht_17_var = d.THT_17;
					tht_18_var = d.THT_18;
					tht_19_var = d.THT_19;
					tht_20_var = d.THT_20;
					tht_21_var = d.THT_21;
					tht_22_var = d.THT_22;
					tht_23_var = d.THT_23;
					tht_24_var = d.THT_24;
					tht_25_var = d.THT_25;
					tht_26_var = d.THT_26;
					tht_27_var = d.THT_27;
					tht_28_var = d.THT_28;
					tht_29_var = d.THT_29;
					tht_30_var = d.THT_30;
					tht_31_var = d.THT_31;
					tht_32_var = d.THT_32;
					TEB_1_var = d.TEB_1;
					TEB_2_var = d.TEB_2;
					TEB_3_var = d.TEB_3;
					TEB_4_var = d.TEB_4;
					TEB_5_var = d.TEB_5;
					TEB_6_var = d.TEB_6;
					TEBZ_1_var = d.TEBZ_1;
					TEBZ_2_var = d.TEBZ_2;
					TEBZ_3_var = d.TEBZ_3;
					TEBZ_4_var = d.TEBZ_4;
					TEBZ_5_var = d.TEBZ_5;
					TEBZ_6_var = d.TEBZ_6;
					
					temp_min = TEB_6_var;
					temp_max = TEB_6_var;

					if(tht_2_var < temp_min){temp_min = tht_2_var;};if(tht_3_var < temp_min){temp_min = tht_3_var;};if(tht_4_var < temp_min){temp_min = tht_4_var;};if(tht_5_var < temp_min){temp_min = tht_5_var;};if(tht_6_var < temp_min){temp_min = tht_6_var;};if(tht_7_var < temp_min){temp_min = tht_7_var;};if(tht_8_var < temp_min){temp_min = tht_8_var;};if(tht_9_var < temp_min){temp_min = tht_9_var;};if(tht_10_var < temp_min){temp_min = tht_10_var;};if(tht_11_var < temp_min){temp_min = tht_11_var;};if(tht_12_var < temp_min){temp_min = tht_12_var;};if(tht_13_var < temp_min){temp_min = tht_13_var;};if(tht_14_var < temp_min){temp_min = tht_14_var;};if(tht_15_var < temp_min){temp_min = tht_15_var;};if(tht_16_var < temp_min){temp_min = tht_16_var;};if(tht_17_var < temp_min){temp_min = tht_17_var;};if(tht_18_var < temp_min){temp_min = tht_18_var;};if(tht_19_var < temp_min){temp_min = tht_19_var;};if(tht_20_var < temp_min){temp_min = tht_20_var;};if(tht_21_var < temp_min){temp_min = tht_21_var;};if(tht_22_var < temp_min){temp_min = tht_22_var;};if(tht_23_var < temp_min){temp_min = tht_23_var;};if(tht_24_var < temp_min){temp_min = tht_24_var;};if(tht_25_var < temp_min){temp_min = tht_25_var;};if(tht_26_var < temp_min){temp_min = tht_26_var;};if(tht_27_var < temp_min){temp_min = tht_27_var;};if(tht_28_var < temp_min){temp_min = tht_28_var;};if(tht_29_var < temp_min){temp_min = tht_29_var;};if(tht_30_var < temp_min){temp_min = tht_30_var;};if(tht_31_var < temp_min){temp_min = tht_31_var;};if(tht_32_var < temp_min){temp_min = tht_32_var;};if(TEB_1_var < temp_min){temp_min = TEB_1_var;};if(TEB_2_var < temp_min){temp_min = TEB_2_var;};if(TEB_3_var < temp_min){temp_min = TEB_3_var;};if(TEB_4_var < temp_min){temp_min = TEB_4_var;};if(TEB_5_var < temp_min){temp_min = TEB_5_var;};if(TEB_6_var < temp_min){temp_min = TEB_6_var;};

					if(tht_2_var > temp_max){temp_max = tht_2_var;};if(tht_3_var > temp_max){temp_max = tht_3_var;};if(tht_4_var > temp_max){temp_max = tht_4_var;};if(tht_5_var > temp_max){temp_max = tht_5_var;};if(tht_6_var > temp_max){temp_max = tht_6_var;};if(tht_7_var > temp_max){temp_max = tht_7_var;};if(tht_8_var > temp_max){temp_max = tht_8_var;};if(tht_9_var > temp_max){temp_max = tht_9_var;};if(tht_10_var > temp_max){temp_max = tht_10_var;};if(tht_11_var > temp_max){temp_max = tht_11_var;};if(tht_12_var > temp_max){temp_max = tht_12_var;};if(tht_13_var > temp_max){temp_max = tht_13_var;};if(tht_14_var > temp_max){temp_max = tht_14_var;};if(tht_15_var > temp_max){temp_max = tht_15_var;};if(tht_16_var > temp_max){temp_max = tht_16_var;};if(tht_17_var > temp_max){temp_max = tht_17_var;};if(tht_18_var > temp_max){temp_max = tht_18_var;};if(tht_19_var > temp_max){temp_max = tht_19_var;};if(tht_20_var > temp_max){temp_max = tht_20_var;};if(tht_21_var > temp_max){temp_max = tht_21_var;};if(tht_22_var > temp_max){temp_max = tht_22_var;};if(tht_23_var > temp_max){temp_max = tht_23_var;};if(tht_24_var > temp_max){temp_max = tht_24_var;};if(tht_25_var > temp_max){temp_max = tht_25_var;};if(tht_26_var > temp_max){temp_max = tht_26_var;};if(tht_27_var > temp_max){temp_max = tht_27_var;};if(tht_28_var > temp_max){temp_max = tht_28_var;};if(tht_29_var > temp_max){temp_max = tht_29_var;};if(tht_30_var > temp_max){temp_max = tht_30_var;};if(tht_31_var > temp_max){temp_max = tht_31_var;};if(tht_32_var > temp_max){temp_max = tht_32_var;};if(TEB_1_var > temp_max){temp_max = TEB_1_var;};if(TEB_2_var > temp_max){temp_max = TEB_2_var;};if(TEB_3_var > temp_max){temp_max = TEB_3_var;};if(TEB_4_var > temp_max){temp_max = TEB_4_var;};if(TEB_5_var > temp_max){temp_max = TEB_5_var;};if(TEB_6_var > temp_max){temp_max = TEB_6_var;};
				}

				data_Meso_NH_to_load_list[o].data.push({
					x: data_x,
					y: data_y,
					tht_2: tht_2_var,
					tht_3: tht_2_var,
					tht_4: tht_3_var,
					tht_5: tht_4_var,
					tht_6: tht_5_var,
					tht_7: tht_6_var,
					tht_8: tht_7_var,
					tht_9: tht_8_var,
					tht_10: tht_10_var,
					tht_11: tht_11_var,
					tht_12: tht_12_var,
					tht_13: tht_13_var,
					tht_14: tht_14_var,
					tht_15: tht_15_var,
					tht_16: tht_16_var,
					tht_17: tht_17_var,
					tht_18: tht_18_var,
					tht_19: tht_19_var,
					tht_20: tht_20_var,
					tht_21: tht_21_var,
					tht_22: tht_22_var,
					tht_23: tht_23_var,
					tht_24: tht_24_var,
					tht_25: tht_25_var,
					tht_26: tht_26_var,
					tht_27: tht_27_var,
					tht_28: tht_28_var,
					tht_29: tht_29_var,
					tht_30: tht_30_var,
					tht_31: tht_31_var,
					tht_32: tht_32_var,
					teb_1: TEB_1_var,
					teb_2: TEB_2_var,
					teb_3: TEB_3_var,
					teb_4: TEB_4_var,
					teb_5: TEB_5_var,
					teb_6: TEB_6_var,
					tebz_1: TEBZ_1_var,
					tebz_2: TEBZ_2_var,
					tebz_3: TEBZ_3_var,
					tebz_4: TEBZ_4_var,
					tebz_5: TEBZ_5_var,
					tebz_6: TEBZ_6_var,
					zs: zs_var
				})
			}


		})
		if(type_point == "O"){
			general_config.temp_min=temp_min;
			general_config.temp_max=temp_max;
		}

		return data_Meso_NH_to_load_list
	});
}
