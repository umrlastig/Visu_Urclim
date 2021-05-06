import {general_config, camera} from './initialisation.js'
import {create_temp_histogram, recreate_scene} from './creative_functions.js'
import * as THREE from './three.module.js';


export function chosenColor(color) {
	let color_list = document.querySelector('.color_control_input_list');
	$("#active_HCL").html(color.innerHTML);
	general_config.active_HCL_id=color.id.split("_")[1];
	color_list.style.display ="none";
	numberInArray()
	recreate_scene()
	
}
export  function numberInArray() {
    $('#nb_array').remove();
	$('#color_class_control').append("<select id='nb_array'></select>")
	for (let i = 1; i < general_config.HCL_color_scales[general_config.active_HCL_id].scale.length; ++i) {
		$('#nb_array').append(`<option value ="${i+1}"> Nombre de couleurs : ${i+1} </option>`)
	}
	$("#nb_array").val(general_config.HCL_color_scales[general_config.active_HCL_id].scale.length)
	general_config.nb_array = parseInt($("#nb_array").val());
	$("#nb_array").on('change', function() {
        general_config.nb_array = parseInt($("#nb_array").val());
        recreate_scene();
    })
}

function hexToRgb(hex) {
	  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	  return result ? {
		r: parseInt(result[1], 16),
		g: parseInt(result[2], 16),
		b: parseInt(result[3], 16)
	  } : null;
	}
	
	function approximateColor1ToColor2ByPercent(color1, color2, percent) {
	
	  var red1 = parseInt(color1[1] + color1[2], 16);
	  var green1 = parseInt(color1[3] + color1[4], 16);
	  var blue1 = parseInt(color1[5] + color1[6], 16);

	  var red2 = parseInt(color2[1] + color2[2], 16);
	  var green2 = parseInt(color2[3] + color2[4], 16);
	  var blue2 = parseInt(color2[5] + color2[6], 16);

	  var red = Math.round(mix(red1, red2, percent));
	  var green = Math.round(mix(green1, green2, percent));
	  var blue = Math.round(mix(blue1, blue2, percent));

	  return generateHex(red, green, blue);
	}

	function generateHex(r, g, b) {
	  r = r.toString(16);
	  g = g.toString(16);
	  b = b.toString(16);

	  while (r.length < 2) { r = "0" + r; }
	  while (g.length < 2) { g = "0" + g; }
	  while (b.length < 2) { b = "0" + b; }

	  return "#" + r + g + b;
	}

	function mix(start, end, percent) {
		return start + ((percent) * (end - start));
	}
	
	
	function return_building_color(type,nature_type){
		var color_hex = '#7f7f7f';
		var color = {'r':null,'g':null,'b':null};
		if(nature_type == "typo_maj"){
			switch(type){
				case 'ba':
					color_hex = '#8f8f8f';
					break;
				case 'bgh':
					color_hex = '#000d00';
					break;
				case 'icif':
					color_hex = '#d52623';
					break;
				case 'icio':
					color_hex = '#f07923';
					break;
				case 'id':
					color_hex = '#eccb27';
					break;
				case 'local':
					color_hex = '#d728ac';
					break;
				case 'pcif':
					color_hex = '#2b6724';
					break;
				case 'pcio':
					color_hex = '#36884a';
					break;
				case 'pd':
					color_hex = '#22be2f';
					break;
				case 'psc':
					color_hex = '#05ff58';
					break;
				default:
					color_hex = '#7f7f7f';
			}
		} else if(nature_type == "typo_second"){
			switch(type){
				case 'ba':
					color_hex = '#8f8f8f';
					break;
				case 'bgh':
					color_hex = '#000d00';
					break;
				case 'icif':
					color_hex = '#d52623';
					break;
				case 'icio':
					color_hex = '#f07923';
					break;
				case 'id':
					color_hex = '#eccb27';
					break;
				case 'local':
					color_hex = '#d728ac';
					break;
				case 'pcif':
					color_hex = '#2b6724';
					break;
				case 'na':
					color_hex = '#36884a';
					break;
				case 'pd':
					color_hex = '#22be2f';
					break;
				case 'psc':
					color_hex = '#05ff58';
					break;
				default:
					color_hex = '#7f7f7f';
			}		
		} else if (nature_type == 'build_dens'){
			var color_1 = '#F6CAE5';
			var color_2 = '#94002F';
			if(type != null && type != undefined){
				color_hex = approximateColor1ToColor2ByPercent(color_1, color_2, type);
			} else {
				color_hex = '#7f7f7f';
			}	
		} else if (nature_type == 'hydro_dens'){
			var color_1 = '#7198EC';
			var color_2 = '#04065A';
			if(type != null && type != undefined){
				color_hex = approximateColor1ToColor2ByPercent(color_1, color_2, type);
			} else {
				color_hex = '#7f7f7f';
			}	
		} else if (nature_type == 'veget_dens'){
			var color_1 = '#FFF4B9';
			var color_2 = '#005F13';
			if(type != null && type != undefined){
				color_hex = approximateColor1ToColor2ByPercent(color_1, color_2, type);
			} else {
				color_hex = '#7f7f7f';
			}	
		} else if (nature_type == 'road_dens'){
			var color_1 = '#EEEEEE';
			var color_2 = '#676767';
			if(type != null && type != undefined){
				color_hex = approximateColor1ToColor2ByPercent(color_1, color_2, type);
			} else {
				color_hex = '#7f7f7f';
			}	
		} else if (nature_type == 'ba'){
			var color_1 = '#EEEEEE';
			var color_2 = '#676767';
			if(type != null && type != undefined){
				color_hex = approximateColor1ToColor2ByPercent(color_1, color_2, type/100);
			} else {
				color_hex = '#7f7f7f';
			}	
		} else if (nature_type == 'bgh'){
			var color_1 = '#EEEEEE';
			var color_2 = '#676767';
			if(type != null && type != undefined){
				color_hex = approximateColor1ToColor2ByPercent(color_1, color_2, type/100);
			} else {
				color_hex = '#7f7f7f';
			}	
		} else if (nature_type == 'icif'){
			var color_1 = '#EEEEEE';
			var color_2 = '#676767';
			if(type != null && type != undefined){
				color_hex = approximateColor1ToColor2ByPercent(color_1, color_2, type/100);
			} else {
				color_hex = '#7f7f7f';
			}	
		} else if (nature_type == 'icio'){
			var color_1 = '#EEEEEE';
			var color_2 = '#676767';
			if(type != null && type != undefined){
				color_hex = approximateColor1ToColor2ByPercent(color_1, color_2, type/100);
			} else {
				color_hex = '#7f7f7f';
			}	
		} else if (nature_type == 'id'){
			var color_1 = '#EEEEEE';
			var color_2 = '#676767';
			if(type != null && type != undefined){
				color_hex = approximateColor1ToColor2ByPercent(color_1, color_2, type/100);
			} else {
				color_hex = '#7f7f7f';
			}	
		} else if (nature_type == 'local'){
			var color_1 = '#EEEEEE';
			var color_2 = '#676767';
			if(type != null && type != undefined){
				color_hex = approximateColor1ToColor2ByPercent(color_1, color_2, type/100);
			} else {
				color_hex = '#7f7f7f';
			}	
		} else if (nature_type == 'pcif'){
			var color_1 = '#EEEEEE';
			var color_2 = '#676767';
			if(type != null && type != undefined){
				color_hex = approximateColor1ToColor2ByPercent(color_1, color_2, type/100);
			} else {
				color_hex = '#7f7f7f';
			}	
		} else if (nature_type == 'pcio'){
			var color_1 = '#EEEEEE';
			var color_2 = '#676767';
			if(type != null && type != undefined){
				color_hex = approximateColor1ToColor2ByPercent(color_1, color_2, type/100);
			} else {
				color_hex = '#7f7f7f';
			}	
		} else if (nature_type == 'pd'){
			var color_1 = '#EEEEEE';
			var color_2 = '#676767';
			if(type != null && type != undefined){
				color_hex = approximateColor1ToColor2ByPercent(color_1, color_2, type/100);
			} else {
				color_hex = '#7f7f7f';
			}	
		} else if (nature_type == 'psc'){
			var color_1 = '#EEEEEE';
			var color_2 = '#676767';
			if(type != null && type != undefined){
				color_hex = approximateColor1ToColor2ByPercent(color_1, color_2, type/100);
			} else {
				color_hex = '#7f7f7f';
			}	
		}
				
		
		var color_rgb = hexToRgb(color_hex);
					
		color.r = color_rgb.r/255;
		color.g = color_rgb.g/255;
		color.b = color_rgb.b/255;
		
		return color;
	}
	
	function getHCLcolor(percentage,HCLscale){
		if(general_config.active_color_class == "ecarts_egaux"){
			var percentage_slice = 1/HCLscale.length;
			if(Math.trunc(percentage/percentage_slice) < HCLscale.length){
				color = HCLscale[Math.trunc(percentage/percentage_slice)];
				}
			return color;
		}
	}
	
	function getRoadColor(type){
		var color = {"r":100, "g":100, "b":100};
		var color_hex;
		switch(type){
				case 'highway':
					color_hex = '#a71d1d';
					break;
				case 'primary':
					color_hex = '#a71d1d';
					break;
				case 'secondary':
					color_hex = '#f4ad05';
					break;
				case 'residential':
					color_hex = '#f4ad05';
					break;
				case 'tertiary':
					color_hex = '#06e270';
					break;
				case 'unclassified':
					color_hex = '#06e270';
					break;
				default:
					color_hex = '#06e270';
			}
			
		var color_rgb = hexToRgb(color_hex);
		color.r = color_rgb.r/255;
		color.g = color_rgb.g/255;
		color.b = color_rgb.b/255;
		
		return color;
	}