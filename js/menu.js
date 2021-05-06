import { handleCreationPoints, handleCreationPlane,handleCreationVerticalPlane} from './showPointsPlanes.js'
import { loadChosenData, loadChosenDataSet, chargerParams} from './load_data_functions.js';
import {general_config, camera} from './initialisation.js'
import {add_hide_buildings,add_remove_filtering} from './creative_functions.js'


export function initialise() {
    let hide_menu = document.getElementById("hide_menu");
    let open_menu = document.getElementById("open_menu")

    hide_menu.addEventListener('click', hideMenu)
    function hideMenu() {
        document.getElementById("menu_container").style.width = "0";
        hide_menu.style.display = "none";

        setTimeout(() => {open_menu.style.display= "initial"}, 1000)
    }


    open_menu.addEventListener('click', openMenu)
    function openMenu(){
        document.getElementById("menu_container").style.width = "40%";
        open_menu.style.display = "none";
        hide_menu.style.display= "initial";
    }

    document.getElementById("data_control_label").addEventListener('click', showData)
    function showData() {
        let dataContainer = document.getElementById("data_control_container");
        if (dataContainer.style.height == "0em") {
            dataContainer.style.height = "5em";
            document.getElementById('values_selection_sbl').style.display == "block" ?
            dataContainer.style.height = "12em" : null;
            document.getElementById('values_selection_meso').style.display == "block" ?
            dataContainer.style.height = "30em" : null;
        } else {
            dataContainer.style.height="0em"
        }
    }
    document.getElementById("choose_data_label").addEventListener('click', showChoice)
    function showChoice() {
        let choiceContainer = document.getElementById("choose_data_container");
        (choiceContainer.style.height == "0em") ?
        choiceContainer.style.height = "18em" : choiceContainer.style.height="0em";
    }

    document.getElementById("graphic_control_label").addEventListener('click', showGraphic)
    function showGraphic() {
        let graphicContainer = document.getElementById("graphic_control_container");
        (graphicContainer.style.height=="0em") ?
        graphicContainer.style.height="37em": graphicContainer.style.height="0em";

    }

    document.getElementById("animation_control_label").addEventListener('click', showAnimation)
    function showAnimation() {
        let animationContainer = document.getElementById("animation_control_container");
        (animationContainer.style.height == "0em") ?
         animationContainer.style.height = "8em": animationContainer.style.height="0em";
    }

    document.getElementById("filter_control_label").addEventListener('click', showFilter)
    function showFilter() {
        let filterContainer = document.getElementById("filter_control_container");
        (filterContainer.style.height == "0em") ?
        filterContainer.style.height = "30em" : filterContainer.style.height="0em";

    }

    document.getElementById("choose_params_label").addEventListener('click', showParams)
    function showParams() {
        let paramsContainer = document.getElementById("choose_params_container");
        (paramsContainer.style.height == "0em") ?
        paramsContainer.style.height = "10em" : paramsContainer.style.height="0em";
    }

    document.getElementById('SBL_values').addEventListener('click', openSblValues)
    function openSblValues() {
        let valuesSelectionSbl = document.getElementById('values_selection_sbl');
        valuesSelectionSbl.style.display="block";
        let valuesSelectionMeso = document.getElementById('values_selection_meso');
        valuesSelectionMeso.style.display="none";
        document.getElementById("data_control_container").style.height = "12em";
    }


    document.getElementById('Meso_values').addEventListener('click', OpenMesoValues)

    function OpenMesoValues() {
        let valuesSelectionSbl = document.getElementById('values_selection_sbl');
        valuesSelectionSbl.style.display="none";
        let valuesSelectionMeso = document.getElementById('values_selection_meso');
        valuesSelectionMeso.style.display="block";
        document.getElementById("data_control_container").style.height = "30em";
    }

	
	$("#buildings_presence_input").on('click', add_hide_buildings);
	$("#buildings_print_presence_input").on('click', add_hide_buildings);
	
	
	$(".filter_ckbx_class").on('click', add_remove_filtering);

    //event sur le bouton avec les choix de données
    $('#load_data').on('click', loadChosenData);
    $('#load_dataset').on('change', loadChosenDataSet);
}

export function sblValues() {

    let valuesSelectionSbl = document.getElementById('values_selection_sbl');
    for(let i = 1; i < 7; ++i) {
        let value = document.createElement('div');
        value.innerHTML = 'TEB '+i+ ' : ';
        value.id='SBL'+i;
        value.className="ckbx_list"
        let inputContainer2D = document.createElement('div');
        inputContainer2D.innerHTML = "Plans";
        inputContainer2D.className="input_data_container_1"
        let ckbx = document.createElement('input');
        ckbx.type='checkbox'
        ckbx.className="data_ckbx_real_plane ckbx_sbl_planes ckbx_sbl";
        ckbx.id="SBL_"+i;

        ckbx.addEventListener('click', () => handleCreationPlane(ckbx.id))

        let inputContainer3D= document.createElement('div');
        inputContainer3D.innerHTML = "Nuage de points"
        inputContainer3D.className="input_data_container_2"
        let ckbx2 = document.createElement('input');
        ckbx2.type='checkbox'
        ckbx2.className="nuage_points ckbx_sbl_points ckbx_sbl";
        ckbx2.id="SBL_"+i;

		ckbx2.addEventListener('click', () => handleCreationPoints(ckbx2.id))

		let inputContainer2Dvert= document.createElement('div');
        inputContainer2Dvert.innerHTML = "Plans verticaux"
        inputContainer2Dvert.className="input_data_container_2"
        let ckbx3 = document.createElement('input');
        ckbx3.type='checkbox'
        ckbx3.className="2D_vertical_planes ckbx_sbl_2D_vertical_planes ckbx_sbl";
        ckbx3.id="SBL_"+i;

		ckbx3.addEventListener('click', () => handleCreationVerticalPlane(ckbx3.id));

        inputContainer2D.append(ckbx);
        inputContainer3D.append(ckbx2);
		inputContainer2Dvert.append(ckbx3);
        value.append(inputContainer2D, inputContainer3D,inputContainer2Dvert);

        valuesSelectionSbl.append(value);


    }

}

export function mesoValues() {

    let valuesSelectionMeso = document.getElementById('values_selection_meso');

    for(let i = 2; i < 33; ++i) {
        let value = document.createElement('div');
        value.innerHTML = 'Meso '+i+ ' : ';
        if(i<10) {
            value.style.paddingLeft='8px'
        }
        value.id='Meso'+i;
        value.className="ckbx_list"
        let inputContainer2D = document.createElement('div');
        inputContainer2D.innerHTML = "Plans";
        inputContainer2D.className="input_data_container_1"
        let ckbx = document.createElement('input');
        ckbx.type='checkbox'
        ckbx.className="data_ckbx_real_plane ckbx_meso_planes ckbx_meso";
        ckbx.id="Meso_"+i;

        ckbx.addEventListener('click', () => handleCreationPlane(ckbx.id))

        let inputContainer3D= document.createElement('div');
        inputContainer3D.innerHTML = "Nuage de points"
        inputContainer3D.className="input_data_container_2"
        let ckbx2 = document.createElement('input');
        ckbx2.type='checkbox'
        ckbx2.className="nuage_points ckbx_meso_points ckbx_meso";
        ckbx2.id="Meso_"+i;
        ckbx2.addEventListener('click', () => handleCreationPoints(ckbx2.id))

		let inputContainer2Dvert= document.createElement('div');
        inputContainer2Dvert.innerHTML = "Plans verticaux"
        inputContainer2Dvert.className="input_data_container_2"
        let ckbx3 = document.createElement('input');
        ckbx3.type='checkbox'
        ckbx3.className="2D_vertical_planes ckbx_meso_2D_vertical_planes ckbx_meso";
        ckbx3.id="Meso_"+i;

		ckbx3.addEventListener('click', () => handleCreationVerticalPlane(ckbx3.id));

        inputContainer2D.append(ckbx);
        inputContainer3D.append(ckbx2);
		inputContainer2Dvert.append(ckbx3);
        value.append(inputContainer2D, inputContainer3D,inputContainer2Dvert);

        valuesSelectionMeso.append(value);
    }

}

//teste sauvegarde fichiers
$('#button_file').on("click", sauvegarder)
function sauvegarder() {

    general_config.camera_x = camera.position.x;
    general_config.camera_y = camera.position.y;
    general_config.camera_z = camera.position.z;
    let config_to_save = nouvelObjet();
    let intitule=  $('#button_file_text').val()
    let a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([JSON.stringify(config_to_save)], {
        type: "text/plain"
    }));
    a.setAttribute("download", `config_urclim_${intitule}.txt`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

}

$('#button_load_file').on("change", chargerParams)

function nouvelObjet() {
    let newObj={}
    newObj.camera_x = general_config.camera_x;
    newObj.camera_y = general_config.camera_y;
    newObj.camera_z = general_config.camera_z;
    newObj.data_ni=general_config.data_ni;
    newObj.data_nj=general_config.data_nj;
    newObj.h_factor=general_config.h_factor;
    newObj.temp_array= general_config.temp_array;
    newObj.id_meso_array= general_config.id_meso_array;
    newObj.id_sbl_array= general_config.id_sbl_array;
    newObj.id_meso_array_real_plane=general_config.id_meso_array_real_plane;
    newObj.id_sbl_array_real_plane=general_config.id_sbl_array_real_plane;
    newObj.type_points= general_config.type_points,
    newObj.domain_min= general_config.domain_min,
    newObj.domain_max= general_config.domain_max,
    newObj.id_meso_array_roads=general_config.id_meso_array_roads;
    newObj.id_sbl_array_roads= general_config.id_sbl_array_roads;
    newObj.regular_size= general_config.regular_size;
    newObj.particle_density= general_config.particle_density;
    newObj.relative_density_factor= general_config.relative_density_factor;
    newObj.relative_size_factor= general_config.relative_size_factor;
    newObj.transparency_factor= general_config.transparency_factor;
    newObj.h_min= general_config.h_min;
    newObj.h_max= general_config.h_max;
    newObj.z_min= general_config.z_min;
    newObj.z_max= general_config.z_max;
    newObj.x_min= general_config.x_min;
    newObj.x_max= general_config.x_max;
    newObj.y_min= general_config.y_min;
    newObj.y_max= general_config.y_max;
    newObj.is_animated= general_config.is_animated;
    newObj.animation_parameter=general_config.animation_parameter;
    newObj.animation_speed_factor= general_config.animation_speed_factor;
    newObj.number_of_points_real_plane= general_config.number_of_points_real_plane;
    newObj.temp_min_factor= general_config.temp_min_factor;
    newObj.temp_max_factor= general_config.temp_max_factor;
    newObj.z_min_factor= general_config.z_min_factor;
    newObj.z_max_factor= general_config.z_max_factor;
    newObj.h_min_factor= general_config.h_min_factor;
    newObj.h_max_factor= general_config.h_max_factor;
    newObj.x_min_factor= general_config.x_min_factor;
    newObj.x_max_factor= general_config.x_max_factor;
    newObj.y_min_factor= general_config.y_min_factor;
    newObj.y_max_factor= general_config.y_max_factor;
    newObj.cst_X= general_config.cst_X;
    newObj.cst_Y= general_config.cst_Y;
    newObj.cst_Z= general_config.cst_Z;
    newObj.active_HCL_id= general_config.active_HCL_id;
    newObj.active_color_class= general_config.active_color_class;
    newObj.temp_values = general_config.temp_values;
    newObj.nb_array = general_config.nb_array;
	newObj.grid_vertical2D = general_config.grid_vertical2D;
    newObj.data_road = general_config.data_road;
	newObj.id_sbl_array_vertical_plane = general_config.id_sbl_array_vertical_plane;
    newObj.id_meso_array_vertical_plane = general_config.id_meso_array_vertical_plane;
    return newObj;
}
