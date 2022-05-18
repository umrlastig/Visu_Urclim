import {
  handleCreationPoints,
  handleCreationPlane,
  handleCreationVerticalPlane,
  chooseCreationPoints
} from "./showPointsPlanes.js";
import {
  chargerParams,
  setCurrent,
  selectfootprint
} from "./load_data_functions.js";
import {
	display_footprint,
	carte,
	marker_front1,
	marker_front2,

} from "./footprint.js";
import { general_config, scene,camera } from "./initialisation.js";
import {
  add_hide_buildings,
  add_remove_filtering,
  create_2D_plane_series,
  create_2D_vertical_plane_series,
  create_temp_histogram
} from "./creative_functions.js";

import { init_netcdf } from "./netcdf_functions.js";
import * as THREE from './three.module.js';
import { updateCurrentSelected3DMulti } from "./time_visualisation.js";
import { updateCurrentSelected3D } from "./time_visualisation2.js";


export function initialise() {
  let hide_menu = document.getElementById("hide_menu");
  let open_menu = document.getElementById("open_menu");

  hide_menu.addEventListener("click", hideMenu);
  function hideMenu() {
    document.getElementById("menu_container").style.width = "0";
    hide_menu.style.display = "none";

    setTimeout(() => {
      open_menu.style.display = "initial";
    }, 1000);
  }

  open_menu.addEventListener("click", openMenu);
  function openMenu() {
    document.getElementById("menu_container").style.width = "40%";
    open_menu.style.display = "none";
    hide_menu.style.display = "initial";
  }

  document
    .getElementById("data_control_label")
    .addEventListener("click", showData);

  document
    .getElementById("choose_data_label")
    .addEventListener("click", showChoice);

  document
    .getElementById("graphic_control_label")
    .addEventListener("click", showGraphic);

  document
    .getElementById("footprint_control_label")
    .addEventListener("click", showFootprint);

  document
    .getElementById("animation_control_label")
    .addEventListener("click", showAnimation);

  document
    .getElementById("filter_control_label")
    .addEventListener("click", showFilter);

  document
    .getElementById("choose_params_label")
    .addEventListener("click", showParams);

  document
    .getElementById("SBL_values")
    .addEventListener("click", openSblValues);

  document
    .getElementById("Meso_values")
    .addEventListener("click", OpenMesoValues);

    document
    .getElementById("temporal_animation")
    .addEventListener("change", activateTemporalAnimation);


  $("#buildings_presence_input").on("click", add_hide_buildings);
  $("#buildings_print_presence_input").on("click", add_hide_buildings);

  $(".filter_ckbx_class").on("click", add_remove_filtering);

  // LOAD NETCDF
  const route = "convert-url";
  const baseurl = "http://localhost:3000/";
  const url = baseurl + route;
  const form = document.getElementById("form_load_data");
  let netcdfUrl; // util
  let cleanUrl = baseurl + "clean"
  function cleanServer() {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", cleanUrl)
    xhr.send("po")
  }
  form.addEventListener("click", (e) => {
    $('#data_loaded').html("Chargement en cours");

    //disable button for 1 sec to prevent double click
    document.getElementById("load_button").disabled = true;
    setTimeout(() => {
      document.getElementById("load_button").disabled = false;
    }, 1000);

    // disable default action
    e.preventDefault();

    // collect files
    const files = document.getElementById("load_data").files;
    const n = files.length;
    general_config.netcdf_list = [];
    for (let i = 0; i < n; i++) {
      const formData = new FormData();
      formData.append("file", files[i]);

      // post form data
      const xhr = new XMLHttpRequest();
      let promise = new Promise((resolve, reject) => {
              // log response
      xhr.onload = async () => {
        netcdfUrl = baseurl + xhr.response;
        let result = await init_netcdf(netcdfUrl);
        general_config.netcdf_list.push(result);
        resolve();
      };
      })

      general_config.loaded.push(promise)


      // create and send the reqeust
      xhr.open("POST", url);
      xhr.send(formData);
    }
    Promise.all(general_config.loaded).then(()=>{
      let data_to_load_list = general_config.netcdf_list[0];
      showFootprint();
      display_footprint(carte,
        data_to_load_list.globalData.latitude_min,
        data_to_load_list.globalData.latitude_max,
        data_to_load_list.globalData.longitude_min,
        data_to_load_list.globalData.longitude_max,
        data_to_load_list.listePoints);
      $('#data_loaded').html("Chargement réussi");
      $('#data_block').hide();
      cleanServer() // on nettoie les fichier du serveur
      //attend 1.5 seconde avant de fermer l'onglet
      setTimeout(closeChoiceContainer, 800);
      //ajout de l'event pour récuperer les coords de la nouvelles emprise
      let btn = document.getElementById("footprint_select");
      btn.addEventListener("click", () => selectfootprint(marker_front1, marker_front2,data_to_load_list));
    }).then( () => {
      sortDate(general_config.netcdf_list,document.getElementById("date_control_input"));
    });
  });
}

export function showData() {

  let dataContainer = document.getElementById("data_control_container");
  if (!dataContainer.style.height || dataContainer.style.height == "0em") {
    dataContainer.style.height = "12em";
  } else {
    dataContainer.style.height = "0em";
  }
}

export function showChoice() {
  let choiceContainer = document.getElementById("choose_data_container");
  choiceContainer.style.height == "18em"
    ? (choiceContainer.style.height = "0em")
    : (choiceContainer.style.height = "18em");
}

function showGraphic() {
  let graphicContainer = document.getElementById("graphic_control_container");
  graphicContainer.style.height == "37em"
    ? (graphicContainer.style.height = "0em")
    : (graphicContainer.style.height = "37em");
}

export function showFootprint() {
  let footprintContainer = document.getElementById("footprint_control_container");
  footprintContainer.style.height == "28em"
    ? (footprintContainer.style.height = "0em")
    : (footprintContainer.style.height = "28em");
}

export function closeChoiceContainer() {
  let choiceContainer = document.getElementById("choose_data_container");
  choiceContainer.style.height = "0em";
}

function showAnimation() {
  let animationContainer = document.getElementById(
    "animation_control_container"
  );
  animationContainer.style.height == "8em"
    ? (animationContainer.style.height = "0em")
    : (animationContainer.style.height = "8em");
}

function showFilter() {
  let filterContainer = document.getElementById("filter_control_container");
  filterContainer.style.height == "30em"
    ? (filterContainer.style.height = "0em")
    : (filterContainer.style.height = "30em");
}

function showParams() {
  let paramsContainer = document.getElementById("choose_params_container");
  paramsContainer.style.height == "10em"
    ? (paramsContainer.style.height = "0em")
    : (paramsContainer.style.height = "10em");
}

function openSblValues() {
  let valuesSelectionSbl = document.getElementById("values_selection_sbl");
  valuesSelectionSbl.style.display = "block";
  let valuesSelectionMeso = document.getElementById("values_selection_meso");
  valuesSelectionMeso.style.display = "none";
  document.getElementById("data_control_container").style.height = "18em";
}

function OpenMesoValues() {
  let valuesSelectionSbl = document.getElementById("values_selection_sbl");
  valuesSelectionSbl.style.display = "none";
  let valuesSelectionMeso = document.getElementById("values_selection_meso");
  valuesSelectionMeso.style.display = "block";
  document.getElementById("data_control_container").style.height = "30em";
}
const selectElement = document.getElementById("date_control_input");

selectElement.addEventListener("change", (event) => {
  changeNetcdf(event.target.value);
});


/**
 * Cette fonction permet de remplir et trier la liste des dates affichée dans le panneau Data du menu.
 * @param {*} netcdfList
 * @param {*} dateSelect
 */
function sortDate(netcdfList,dateSelect){
  var dateArray = new Array();
    for (let i=0;i<netcdfList.length;i++) {
        dateArray[i] = new Date(netcdfList[i].globalData.date).getTime();
    }
    dateArray.sort();
    dateSelect.options.length = 0;

    for (let i=0;i<dateArray.length;i++) {
      dateSelect.options[i] = new Option(new Date(dateArray[i]));
    }
}


/**
 * This function update the data displayed on the main pannel of the app when the user change the date in the data pannel.
 * @param {*} date
 */
export function changeNetcdf(date) {
  for (let i = 0; i < general_config.netcdf_list.length; i++) {
    if (general_config.netcdf_list[i].globalData.date == date) {
      setCurrent(i);
      break;
    }
  }

  //horizontal plane checkboxes
  let checks = document.querySelectorAll("div.input_data_container_1 > input");
  for (let i = 0; i < checks.length; i++) {
    let check = checks[i];
    if (check.checked) {
      scene.remove(general_config.grid_plane);
      general_config.grid_plane = new THREE.Object3D();
      create_2D_plane_series(
        general_config.data_points_O_2,
        general_config.data_points_U_2,
        general_config.data_points_V_2,
        general_config.grid_plane,
        general_config.id_sbl_array_real_plane,
        general_config.id_meso_array_real_plane,
        general_config.temp_array,
        general_config.THAT,
        general_config.THAT_W,
        general_config.HCanopy,
        general_config.HCanopy_w
      );
      create_temp_histogram();
      break;
    }
  }

  //cloud point checkboxes
  let checks2 = document.querySelectorAll("div.input_data_container_2 > input");
  for (var i = 0; i < checks2.length; i++) {
    var check = checks2[i];
    if (!check.disabled) {
      if (check.checked) {

        scene.remove(general_config.grid);
        general_config.grid = new THREE.Object3D();
        chooseCreationPoints();
        break;
      }
      check.checked = false;
    }
  }

  //vertical checkboxes
  let checks3 = document.querySelectorAll("div.input_data_container_3 > input");
  for (let i = 0; i < checks3.length; i++) {
    let check = checks3[i];
    if (check.checked) {
      scene.remove(general_config.grid);
      general_config.grid_plane = new THREE.Object3D();
      create_2D_vertical_plane_series(
        general_config.data_road,
        general_config.grid_vertical2D,
        general_config.id_sbl_array_vertical_plane,
        general_config.id_meso_array_vertical_plane,
        general_config.temp_array,
        general_config.THAT,
        general_config.THAT_W,
        general_config.HCanopy,
        general_config.HCanopy_w
      );
      create_temp_histogram();
      break;
    }
  }
}

/**
 * Cette fonction permet de switcher automatiquement de fichier en
 * prenant celui à la date suivante toutes les 3 secondes
 */
function activateTemporalAnimation(){
  let temporal_animation = document.getElementById('temporal_animation');
  let dateControl = document.getElementById('date_control_input');
  let timeStep = document.getElementById('temporal_animation_time_step').value * 1000;
  if(timeStep < 1000){
    timeStep = 1000;
  }
    setTimeout(()=>{
      if(temporal_animation.checked){
        let index = dateControl.selectedIndex + 1;
        if(index >= dateControl.length){
          index = 0;
        }
        dateControl.options[index].selected = true;
        changeNetcdf(dateControl.value);
        updateCurrentSelected3D()
        updateCurrentSelected3DMulti()
        activateTemporalAnimation();
      }
    },timeStep);
}

/**
 * prevent radio button swap when using keyboard
 */
export function preventRadioSwap(){
  $('input[type="radio"]').keydown(function(e)
  {
      var arrowKeys = [37, 38, 39, 40];
      if (arrowKeys.indexOf(e.which) !== -1)
      {
          $(this).blur();
          return false;
      }
  });
}


/**
 * create event listener on the radios button concerning the type of plane
 */
export function changePlaneType(){
  document.getElementById('discrete_planes').addEventListener('change', () => {
    scene.remove(general_config.grid);
  general_config.grid_plane = new THREE.Object3D();
  create_2D_vertical_plane_series(
    general_config.data_road,
    general_config.grid_vertical2D,
    general_config.id_sbl_array_vertical_plane,
    general_config.id_meso_array_vertical_plane,
    general_config.temp_array,
    general_config.THAT,
    general_config.THAT_W,
    general_config.HCanopy,
    general_config.HCanopy_w
  );
});

document.getElementById('interpolated_planes_3').addEventListener('change', () => {
    scene.remove(general_config.grid);
  general_config.grid_plane = new THREE.Object3D();
  create_2D_vertical_plane_series(
    general_config.data_road,
    general_config.grid_vertical2D,
    general_config.id_sbl_array_vertical_plane,
    general_config.id_meso_array_vertical_plane,
    general_config.temp_array,
    general_config.THAT,
    general_config.THAT_W,
    general_config.HCanopy,
    general_config.HCanopy_w
  );
});

document.getElementById('interpolated_planes_2').addEventListener('change', () => {
    scene.remove(general_config.grid);
  general_config.grid_plane = new THREE.Object3D();
  create_2D_vertical_plane_series(
    general_config.data_road,
    general_config.grid_vertical2D,
    general_config.id_sbl_array_vertical_plane,
    general_config.id_meso_array_vertical_plane,
    general_config.temp_array,
    general_config.THAT,
    general_config.THAT_W,
    general_config.HCanopy,
    general_config.HCanopy_w
  );
});
}

export function sblValues() {
  let valuesSelectionSbl = document.getElementById("values_selection_sbl");
  for (let i = 1; i < 7; ++i) {
    let value = document.createElement("div");
    value.innerHTML = "TEB " + i + " : ";
    value.id = "SBL" + i;
    value.className = "ckbx_list";
    let inputContainer2D = document.createElement("div");
    inputContainer2D.innerHTML = "Plans";
    inputContainer2D.className = "input_data_container_1";
    let ckbx = document.createElement("input");
    ckbx.type = "checkbox";
    ckbx.className = "data_ckbx_real_plane ckbx_sbl_planes ckbx_sbl";
    ckbx.id = "SBL_" + i;

    ckbx.addEventListener("change", () => handleCreationPlane(ckbx.id));

    let inputContainer3D = document.createElement("div");
    inputContainer3D.innerHTML = "Nuage de points";
    inputContainer3D.className = "input_data_container_2";
    let ckbx2 = document.createElement("input");
    ckbx2.type = "checkbox";
    ckbx2.className = "nuage_points ckbx_sbl_points ckbx_sbl";
    ckbx2.id = "SBL_" + i;

    ckbx2.addEventListener("change", () => handleCreationPoints(ckbx2.id));

    let inputContainer2Dvert = document.createElement("div");
    inputContainer2Dvert.innerHTML = "Plans verticaux";
    inputContainer2Dvert.className = "input_data_container_3";
    let ckbx3 = document.createElement("input");
    ckbx3.type = "checkbox";
    ckbx3.className = "2D_vertical_planes ckbx_sbl_2D_vertical_planes ckbx_sbl";
    ckbx3.id = "SBL_" + i;

    ckbx3.addEventListener("change", () =>
      handleCreationVerticalPlane(ckbx3.id)
    );

    inputContainer2D.append(ckbx);
    inputContainer3D.append(ckbx2);
    inputContainer2Dvert.append(ckbx3);
    value.append(inputContainer2D, inputContainer3D, inputContainer2Dvert);

    valuesSelectionSbl.append(value);
  }
}

export function mesoValues() {
  let valuesSelectionMeso = document.getElementById("values_selection_meso");

  for (let i = 2; i < 33; ++i) {
    let value = document.createElement("div");
    value.innerHTML = "Meso " + i + " : ";
    if (i < 10) {
      value.style.paddingLeft = "8px";
    }
    value.id = "Meso" + i;
    value.className = "ckbx_list";
    let inputContainer2D = document.createElement("div");
    inputContainer2D.innerHTML = "Plans";
    inputContainer2D.className = "input_data_container_1";
    let ckbx = document.createElement("input");
    ckbx.type = "checkbox";
    ckbx.className = "data_ckbx_real_plane ckbx_meso_planes ckbx_meso";
    ckbx.id = "Meso_" + i;

    ckbx.addEventListener("click", () => handleCreationPlane(ckbx.id));

    let inputContainer3D = document.createElement("div");
    inputContainer3D.innerHTML = "Nuage de points";
    inputContainer3D.className = "input_data_container_2";
    let ckbx2 = document.createElement("input");
    ckbx2.type = "checkbox";
    ckbx2.className = "nuage_points ckbx_meso_points ckbx_meso";
    ckbx2.id = "Meso_" + i;
    ckbx2.addEventListener("click", () => handleCreationPoints(ckbx2.id));

    let inputContainer2Dvert = document.createElement("div");
    inputContainer2Dvert.innerHTML = "Plans verticaux";
    inputContainer2Dvert.className = "input_data_container_3";
    let ckbx3 = document.createElement("input");
    ckbx3.type = "checkbox";
    ckbx3.className =
      "2D_vertical_planes ckbx_meso_2D_vertical_planes ckbx_meso";
    ckbx3.id = "Meso_" + i;

    ckbx3.addEventListener("click", () =>
      handleCreationVerticalPlane(ckbx3.id)
    );

    inputContainer2D.append(ckbx);
    inputContainer3D.append(ckbx2);
    inputContainer2Dvert.append(ckbx3);
    value.append(inputContainer2D, inputContainer3D, inputContainer2Dvert);

    valuesSelectionMeso.append(value);
  }
}

//test sauvegarde fichiers
$("#button_file").on("click", sauvegarder);
function sauvegarder() {
  general_config.camera_x = camera.position.x;
  general_config.camera_y = camera.position.y;
  general_config.camera_z = camera.position.z;
  let config_to_save = nouvelObjet();
  let intitule = $("#button_file_text").val();
  let a = document.createElement("a");
  a.href = URL.createObjectURL(
    new Blob([JSON.stringify(config_to_save)], {
      type: "text/plain",
    })
  );
  a.setAttribute("download", `config_urclim_${intitule}.txt`);
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

$("#button_load_file").on("change", chargerParams);

function nouvelObjet() {
  let newObj = {};
  newObj.camera_x = general_config.camera_x;
  newObj.camera_y = general_config.camera_y;
  newObj.camera_z = general_config.camera_z;
  newObj.data_ni = general_config.data_ni;
  newObj.data_nj = general_config.data_nj;
  newObj.h_factor = general_config.h_factor;
  newObj.temp_array = general_config.temp_array;
  newObj.id_meso_array = general_config.id_meso_array;
  newObj.id_sbl_array = general_config.id_sbl_array;
  newObj.id_meso_array_real_plane = general_config.id_meso_array_real_plane;
  newObj.id_sbl_array_real_plane = general_config.id_sbl_array_real_plane;
  (newObj.type_points = general_config.type_points),
    (newObj.domain_min = general_config.domain_min),
    (newObj.domain_max = general_config.domain_max),
    (newObj.id_meso_array_roads = general_config.id_meso_array_roads);
  newObj.id_sbl_array_roads = general_config.id_sbl_array_roads;
  newObj.regular_size = general_config.regular_size;
  newObj.particle_density = general_config.particle_density;
  newObj.relative_density_factor = general_config.relative_density_factor;
  newObj.relative_size_factor = general_config.relative_size_factor;
  newObj.transparency_factor = general_config.transparency_factor;
  newObj.h_min = general_config.h_min;
  newObj.h_max = general_config.h_max;
  newObj.z_min = general_config.z_min;
  newObj.z_max = general_config.z_max;
  newObj.x_min = general_config.x_min;
  newObj.x_max = general_config.x_max;
  newObj.y_min = general_config.y_min;
  newObj.y_max = general_config.y_max;
  newObj.is_animated = general_config.is_animated;
  newObj.animation_parameter = general_config.animation_parameter;
  newObj.animation_speed_factor = general_config.animation_speed_factor;
  newObj.number_of_points_real_plane =
    general_config.number_of_points_real_plane;
  newObj.temp_min_factor = general_config.temp_min_factor;
  newObj.temp_max_factor = general_config.temp_max_factor;
  newObj.z_min_factor = general_config.z_min_factor;
  newObj.z_max_factor = general_config.z_max_factor;
  newObj.h_min_factor = general_config.h_min_factor;
  newObj.h_max_factor = general_config.h_max_factor;
  newObj.x_min_factor = general_config.x_min_factor;
  newObj.x_max_factor = general_config.x_max_factor;
  newObj.y_min_factor = general_config.y_min_factor;
  newObj.y_max_factor = general_config.y_max_factor;
  newObj.cst_X = general_config.cst_X;
  newObj.cst_Y = general_config.cst_Y;
  newObj.cst_Z = general_config.cst_Z;
  newObj.active_HCL_id = general_config.active_HCL_id;
  newObj.active_color_class = general_config.active_color_class;
  newObj.temp_values = general_config.temp_values;
  newObj.nb_array = general_config.nb_array;
  newObj.grid_vertical2D = general_config.grid_vertical2D;
  newObj.data_road = general_config.data_road;
  newObj.id_sbl_array_vertical_plane =
    general_config.id_sbl_array_vertical_plane;
  newObj.id_meso_array_vertical_plane =
    general_config.id_meso_array_vertical_plane;
  return newObj;
}
