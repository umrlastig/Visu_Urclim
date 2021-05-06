import * as THREE from './three.module.js';
import {general_config, scene } from './initialisation.js'
import {create_temp_histogram, create_random_points_cloud, create_2D_plane_series, create_2D_points_cloud, create_regular_points_cloud, create_squeletton, create_2D_vertical_plane_series } from './creative_functions.js'
//fonctions appelées par les checkboxes

// création des plans 2D
export function handleCreationPlane (id) {
    if(id.split("_")[0] === "SBL") {
        
        if (general_config.id_sbl_array_real_plane.includes(parseInt(id.split("_")[1]))) {
            general_config.id_sbl_array_real_plane = removeValue(general_config.id_sbl_array_real_plane, parseInt(id.split("_")[1]) )
        } else
            general_config.id_sbl_array_real_plane.push(parseInt(id.split("_")[1]));
    }
    else {
        if (general_config.id_meso_array_real_plane.includes(parseInt(id.split("_")[1]))) {
            general_config.id_meso_array_real_plane = removeValue(general_config.id_meso_array_real_plane, parseInt(id.split("_")[1]) )
        } else
            general_config.id_meso_array_real_plane.push(parseInt(id.split("_")[1]));
    }
    if(general_config.grid_plane == null){
    } else {
        scene.remove(general_config.grid_plane);
    }
    general_config.grid_plane = new THREE.Object3D();
	//create_squeletton(general_config.data_points_O_2,general_config.data_points_U_2,general_config.data_points_V_2,general_config.grid_plane,general_config.id_sbl_array_real_plane,general_config.id_meso_array_real_plane,general_config.temp_array,general_config.THAT,general_config.THAT_W,general_config.HCanopy,general_config.HCanopy_w); 	
	create_2D_plane_series(general_config.data_points_O_2,general_config.data_points_U_2,general_config.data_points_V_2,general_config.grid_plane,general_config.id_sbl_array_real_plane,general_config.id_meso_array_real_plane,general_config.temp_array,general_config.THAT,general_config.THAT_W,general_config.HCanopy,general_config.HCanopy_w);
    create_temp_histogram();
}

export function handleCreationPoints(donneesSblOuMeso) {
    let ckboxes = document.querySelectorAll('.type_de_points');
    let typePts;
    ckboxes.forEach(box => {
        if (box.checked == true) {
            typePts= box.id;
        }
    })
    if (typePts === "data_ckbx") {
        handleCreationRandomPoints(donneesSblOuMeso);
    } else if(typePts === "data_ckbx_real_plane_points") {
        handleCreation2DPoints(donneesSblOuMeso)
    }  else {
        handleCreation3DPoints(donneesSblOuMeso)
    }
}

// création des random cloud points
function handleCreationRandomPoints(id) {

    if(id.split("_")[0] === "SBL") {
        if (general_config.id_sbl_array.includes(parseInt(id.split("_")[1]))) {
            general_config.id_sbl_array= removeValue(general_config.id_sbl_array, parseInt(id.split("_")[1]) )
        } else
            general_config.id_sbl_array.push(parseInt(id.split("_")[1]));
    }
    else {
        if (general_config.id_meso_array.includes(parseInt(id.split("_")[1]))) {
            general_config.id_meso_array= removeValue(general_config.id_meso_array, parseInt(id.split("_")[1]) )
        } else
            general_config.id_meso_array.push(parseInt(id.split("_")[1]));
    }
    if(general_config.grid == null){
    } else {
        scene.remove(general_config.grid);
    }
    general_config.grid = new THREE.Object3D();
    create_random_points_cloud(general_config.data_points_O_2,general_config.data_points_U_2,general_config.data_points_V_2,general_config.grid,general_config.id_sbl_array,general_config.id_meso_array,general_config.temp_array,general_config.THAT,general_config.THAT_W,general_config.HCanopy,general_config.HCanopy_w);
    create_temp_histogram();
}

// création des 2D regular points
function handleCreation2DPoints(id) {

    if(id.split("_")[0] === "SBL") {
        if (general_config.id_sbl_array.includes(parseInt(id.split("_")[1]))) {
            general_config.id_sbl_array = removeValue(general_config.id_sbl_array, parseInt(id.split("_")[1]) )
            
        } else
            general_config.id_sbl_array.push(parseInt(id.split("_")[1]));
    }
    else {
        if (general_config.id_meso_array.includes(parseInt(id.split("_")[1]))) {
            general_config.id_meso_array= removeValue(general_config.id_meso_array, parseInt(id.split("_")[1]) )
        } else
            general_config.id_meso_array.push(parseInt(id.split("_")[1]));
    }

    if(general_config.grid == null){
    } else {
        scene.remove(general_config.grid);
    }
    general_config.grid = new THREE.Object3D();
    create_2D_points_cloud(general_config.data_points_O_2,general_config.data_points_U_2,general_config.data_points_V_2,general_config.grid,general_config.id_sbl_array,general_config.id_meso_array,general_config.temp_array,general_config.THAT,general_config.THAT_W,general_config.HCanopy,general_config.HCanopy_w,general_config.number_of_points_real_plane);
    create_temp_histogram();
}

// création des 3D regular points
function handleCreation3DPoints(id) {

    if(id.split("_")[0] === "SBL") {
        if (general_config.id_sbl_array.includes(parseInt(id.split("_")[1]))) {
            general_config.id_sbl_array=removeValue(general_config.id_sbl_array, parseInt(id.split("_")[1]) )
        } else
            general_config.id_sbl_array.push(parseInt(id.split("_")[1]));
    }
    else {
        if (general_config.id_meso_array.includes(parseInt(id.split("_")[1]))) {
            general_config.id_meso_array=removeValue(general_config.id_meso_array, parseInt(id.split("_")[1]) )
        } else
            general_config.id_meso_array.push(parseInt(id.split("_")[1]));
    }
    if(general_config.grid == null){
    } else {
        scene.remove(general_config.grid);
    }
    general_config.grid = new THREE.Object3D();
    create_regular_points_cloud(general_config.data_points_O_2,general_config.data_points_U_2,general_config.data_points_V_2,general_config.grid,general_config.id_sbl_array,general_config.id_meso_array,general_config.temp_array,general_config.THAT,general_config.THAT_W,general_config.HCanopy,general_config.HCanopy_w);
    create_temp_histogram();
}

// création des 2D vertical planes
export function handleCreationVerticalPlane(id) {
    if(id.split("_")[0] === "SBL") {
        
        if (general_config.id_sbl_array_vertical_plane.includes(parseInt(id.split("_")[1]))) {
            general_config.id_sbl_array_vertical_plane = removeValue(general_config.id_sbl_array_vertical_plane, parseInt(id.split("_")[1]) )
        } else
            general_config.id_sbl_array_vertical_plane.push(parseInt(id.split("_")[1]));
    }
    else {
        if (general_config.id_meso_array_vertical_plane.includes(parseInt(id.split("_")[1]))) {
            general_config.id_meso_array_vertical_plane = removeValue(general_config.id_meso_array_vertical_plane, parseInt(id.split("_")[1]) )
        } else
            general_config.id_meso_array_vertical_plane.push(parseInt(id.split("_")[1]));
    }
    if(general_config.grid_vertical2D == null){
    } else {
        scene.remove(general_config.grid_vertical2D);
    }
    general_config.grid_vertical2D = new THREE.Object3D();
		
	create_2D_vertical_plane_series(general_config.data_road, general_config.grid_vertical2D, general_config.id_sbl_array_vertical_plane,general_config.id_meso_array_vertical_plane,general_config.temp_array,general_config.THAT,general_config.THAT_W,general_config.HCanopy,general_config.HCanopy_w);
    //create_temp_histogram();
}

function removeValue(array, value) {
    return array.filter(function(ele){ return ele != value; });
}