import * as THREE from './three.module.js';
import {sblValues, mesoValues,preventRadioSwap,changePlaneType} from './menu.js'
import {OrbitControls} from './OrbitControls.js';
import { create_random_points_cloud, create_temp_histogram, create_2D_points_cloud,
create_regular_points_cloud, create_data_texture, recreate_scene, activate_animation, activate_animation_second_part} from './creative_functions.js'
import {chosenColor, numberInArray} from './color_function.js'
import {change} from './dynamique_div.js'
export var renderer, scene, camera, controls, mesh;


export var general_config = {
    "data_points_O_2":null,
    "data_points_U_2":null,
    "data_points_V_2":null,
    loaded: [],
    netcdf_list: [],
    "camera_x": 200,
    "camera_y": 600,
    "camera_z": 200,
    "data_ni":null,
    "data_nj":null,
    "grid":null,
    "grid_plane":null,
    "grid_road":null,
    "h_factor":null,
    "temp_array":null,
    "id_meso_array":[],
    "id_sbl_array":[],
    "id_meso_array_real_plane":[],
    "id_sbl_array_real_plane":[],
	"id_sbl_array_vertical_plane":[],
	"id_meso_array_vertical_plane":[],
    "type_points":1,
    "domain_min":24,
    "domain_max": 29,
    "id_meso_array_roads":[],
    "id_sbl_array_roads":[],
    "regular_size":1,
    "particle_density":0.0004,
    "relative_density_factor":1,
    "relative_size_factor":1,
    "transparency_factor":1,
    "h_min":null,
    "h_max":null,
    "z_min":null,
    "z_max":null,
    "x_min":null,
    "x_max":null,
    "number_of_points_real_plane":10,
    "temp_min_factor":0,
    "temp_max_factor":1,
    "z_min_factor":0,
    "z_max_factor":1,
    "h_min_factor":0,
    "h_max_factor":1,
    "x_min_factor":0,
    "x_max_factor":1,
    "y_min_factor":0,
    "y_max_factor":1,
    "cst_X":1,
    "cst_Y":1,
    "cst_Z":3,
    "cst_Z_original":3,
    "Coord_Y_paris":6861944.0,
    "Coord_X_paris":651948.0,
    "THAT":[-30.0,30.0,96.0,175.2,270.2,384.3,521.1,685.4,882.4,1118.9,1402.7,1743.3,2151.9,2642.3,3230.8,3901.8,4601.8,5301.8,6001.8,6701.8,7401.8,8101.8,8801.8,9501.8,10201.8,10901.8,11601.8,12301.8,13001.8,13701.8,14401.8,15101.8],
    "THAT_W":[-60.0,0.0,60.0,132.0,218.4,322.1,446.5,595.8,775.0,989.9,1247.9,1557.5,1929.0,2374.8,2909.8,3551.8,4251.8,4951.8,5651.8,6351.8,7051.8,7751.8,8451.8,9151.8,9851.8,10551.8,11251.8,11951.8,12651.8,13351.8,14051.8,14751.8],
    //"HCanopy":[0.5,2,4, 6.5, 10, 29]
    //"HCanopy_w":[0,1,3,5,8,12],
	"HCanopy":[1.5,3,5, 7.5, 11, 30],
    "HCanopy_w":[1,2,4,6,9,13],
    "HCL_color_scales": [
        {'name':'blue_red_4','scale':['#FADDC3','#F9C29C','#F6A173','#F17B51','#EA4C3B']},
        {'name':'sequential_red_2_sotr','scale':['#FDF5EB','#FFD3A7','#FE945C','#DD3B24','#88002D']},
        {'name':'sequential_blue_sotr','scale':['#4A6FE3','#9DA8E2','#E2E2E2','#E495A5','#D33F6A']},
        {'name':'HCL_white_purple_1_sotr','scale':['#ECE6C9','#CBE4BB','#A8D8B3','#84CCAD','#5FC1A8','#5AC1A9','#14BAAC','#00B5CB','#1895C8','#647DBD','#8567AC','#9652A0','#A9328E']},
        {'name':'HCL_white_purple_2_sotr','scale':['#E9E2C5','#ECE5CA','#D9D5BA','#CDC8AF','#CECAB0','#6FC5AF','#59C1A9','#40BBA0','#43A2CE','#2C95BF','#1887B1','#BE569E','#B14899','#AB3493']},
        {'name':'black_white','scale':["#1B1B1B","#585858","#969696","#D0D0D0","#F9F9F9"]},
        {'name':'white_black','scale':["#F9F9F9","#D0D0D0","#969696","#585858","#1B1B1B"]},
        {'name':'white_blue','scale':["#E2E2E2","#CBCDD9","#A1A6C8","#6A76B2","#023FA5"]},
        {'name':'blue_white','scale':["#023FA5","#6A76B2","#A1A6C8","#CBCDD9","#E2E2E2"]},
        {'name':'white_red','scale':["#F1F1F1","#E2CBCB","#CA9496","#A9565A","#7F000D"]},
        {'name':'red_white','scale':["#7F000D","#A9565A","#CA9496","#E2CBCB","#F1F1F1"]},
        {'name':'blue_white_red','scale':["#023FA5","#A1A6C8","#E2E2E2","#CA9CA4","#8E063B"]},
        {'name':'blue_white_red_2','scale':["#4A6FE3","#9DA8E2","#E2E2E2","#E495A5","#D33F6A"]},
        {'name':'blue_yellow','scale':["#4F53B7","#AAABD5","#F1F1F1","#B5AF80","#6B6100"]},
        {'name':'blue_yellow_2','scale':["#9FA2FF","#D7D9FF","#F1F1F1","#EAE191","#BAAE00"]}
    ],
    "data_volume_3D":null,
    "active_HCL_id":null,
    "active_color_class":null,
    "temp_values = []":null,
    "nb_array":null,
    "data_url":null,
    "url_data_road":null,
    "url_data_bat":null,
    "data_build":null,
	"grid_vertical2D":null,
	"data_road":null,
	"grid_building":null,
	"grid_building_print":null,
	"buildings_transparency":1,
	"vertical_plane_transparency":1,
	"points_transparency":1,
	"active_color_control":1,
	"temp_filter":false,
	"z_filter":false,
	"h_filter":false,
	"x_filter":false,
	"y_filter":false,
	"bins":null,
    is_animated:false
}	

export function init(){
   
    sblValues();
    mesoValues();
    change(screen.height* 0.7);
	//gestion des choix de couleurs  
    var HCL_html = "<div id='active_HCL'></div>";
    let colorListAbsolute = "<div class='color_control_input_list'>"
    for(var i=0; i<general_config.HCL_color_scales.length; i++){
        let color_icons="";
        for(let j = 0; j < general_config.HCL_color_scales[i].scale.length; ++j) {
            color_icons += `<div style="background-color:${general_config.HCL_color_scales[i].scale[j]}"></div>`;
        }
        
        colorListAbsolute = `${colorListAbsolute}<div class='color infobulle' id='HCL_${i}' aria-label="${general_config.HCL_color_scales[i].name}">
         ${color_icons}</div>`;
       
    }
    $("#color_control_input").html(`${HCL_html}`);
    $("#color_list_absolute").html(`${colorListAbsolute} </div>`)
    let color_list = document.querySelector('.color_control_input_list');
    /* == bloque tout
    $('#graphic_control_container').click(hideColors);
    function hideColors() {
        color_list.style.display ="none";
    }
    */
    function colorList() {
        (color_list.style.display == "none") ? color_list.style.display="flex" : color_list.style.display ="none";
    }
    
    let colors = document.querySelectorAll('.color');
    colors.forEach(color => {
        color.addEventListener('click', () => chosenColor(color))
    })

    

    $("#active_HCL").on('click', colorList);
    $("#active_HCL").html(colors[0].innerHTML)

    general_config.active_HCL_id = 0;
    general_config.active_color_class = $("#color_class_control_input").val();
    $("#color_class_control_input").on('change', function() {
        general_config.active_color_class = $("#color_class_control_input").val();
        recreate_scene();
    })
    // fin couleur
	
	$("#color_data_control_input").on('change', function() {
		if($("#color_data_control_input").val() == "temp"){
			 general_config.active_color_control = 1;
			$("#color_temp_control").show();
		} else if($("#color_data_control_input").val() == "level") {
			general_config.active_color_control = 0;
			$("#color_temp_control").hide();
		} else {
			general_config.active_color_control = 2;
			general_config.temp_array = [297.92,300.8];
			$("#temp_min_input").val(297.92 - 273.15);
			$("#temp_max_input").val(300.8 - 273.15);
		}
        recreate_scene();
    })
    preventRadioSwap();
    changePlaneType();
   

    //faire apparaitre le tableau pour choisir son type de points dans 'graphic'
    function differentPoints() {
        let typeDePoints = [ "3D points", "Regular 2D points","Regular 3D points" ];
        let classPoints = [ "data_ckbx", "data_ckbx_real_plane_points", "data_ckbx_regular_points"];
        let containerNuages = document.getElementById('container_nuage_points')
        containerNuages.style.fontWeight ="bold"
        let value = document.createElement('div');
        value.className="ckbx_list"
        value.style.fontWeight="normal"

        for (let i =0; i < 3; ++i){
            
            let inputContainer = document.createElement('div');
            inputContainer.innerHTML = typeDePoints[i];
            inputContainer.className="input_container"
            let ckbx = document.createElement('input');
            ckbx.type='checkbox'
            i === 0 ? ckbx.checked = true: ckbx.checked=false;
            ckbx.className="type_de_points";
            ckbx.id=classPoints[i];
            ckbx.addEventListener('click',() => ckbxOneChoice(ckbx.id))
            inputContainer.append(ckbx)
            value.append(inputContainer)
        }
        containerNuages.append(value)

        function ckbxOneChoice(box_id) {
            let datackbx = document.querySelectorAll('.type_de_points')
            datackbx.forEach(box => {
                box.checked = false;
            })
            document.getElementById(box_id).checked = true;
            
            if (box_id === "data_ckbx") {
                general_config.type_points = 1;
                if(general_config.grid == null){
                } else {
                    scene.remove(general_config.grid);
                }
                general_config.grid = new THREE.Object3D();
                create_random_points_cloud(general_config.data_points_O_2,general_config.data_points_U_2,general_config.data_points_V_2,general_config.grid,general_config.id_sbl_array,general_config.id_meso_array,general_config.temp_array,general_config.THAT,general_config.THAT_W,general_config.HCanopy,general_config.HCanopy_w);
            } else if (box_id === "data_ckbx_real_plane_points") {
                general_config.type_points = 2;
                if(general_config.grid == null){
                } else {
                    scene.remove(general_config.grid);
                }
                general_config.grid = new THREE.Object3D();
                create_2D_points_cloud(general_config.data_points_O_2,general_config.data_points_U_2,general_config.data_points_V_2,general_config.grid,general_config.id_sbl_array,general_config.id_meso_array,general_config.temp_array,general_config.THAT,general_config.THAT_W,general_config.HCanopy,general_config.HCanopy_w,general_config.number_of_points_real_plane);

            } else {
                general_config.type_points = 3;
                if(general_config.grid == null){
                } else {
                    scene.remove(general_config.grid);
                }
                general_config.grid = new THREE.Object3D();
                create_regular_points_cloud(general_config.data_points_O_2,general_config.data_points_U_2,general_config.data_points_V_2,general_config.grid,general_config.id_sbl_array,general_config.id_meso_array,general_config.temp_array,general_config.THAT,general_config.THAT_W,general_config.HCanopy,general_config.HCanopy_w);
            
            }
        }
    }
    
    differentPoints();
    // mettre les valeurs de diff temps à 17 et 30
    $('#temp_min_input').val("20")
    $('#temp_max_input').val("30")

    $('#size_text_input').val(general_config.regular_size)
    $("#density_text_input").val(general_config.particle_density)

    // pour le choix du nombre de tableaux dans l'utilisation des couleurs (dans color_functions.js)
    numberInArray();
 

    var canvas = document.createElement( 'canvas' );
    var context = canvas.getContext( 'webgl2', { alpha: false, antialias: true } );
        renderer = new THREE.WebGLRenderer( { canvas: canvas, context: context } );
    
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.getElementById('container').appendChild(renderer.domElement);
    
    scene = new THREE.Scene();
    
	scene.background = new THREE.Color('black');
	
    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 100000 );
    controls = new OrbitControls( camera, renderer.domElement );
    controls.enableDamping = true;
    controls.dampingFactor = 0.5
	
	general_config.camera_x=-1080.7584542198244;
	general_config.camera_y=464.3664608024479;
	general_config.camera_z=1413.5652039419404;
	
    camera.position.set( general_config.camera_x, general_config.camera_y, general_config.camera_z );
    controls.update();
	
	camera.far = 9000;

    var axesHelper = new THREE.AxesHelper( 100 );
    scene.add( axesHelper );
    
    general_config.h_factor = 1;
    general_config.temp_array = [297.92,300.8];
	$("#temp_min_input").val(297.92 - 273.15);
			$("#temp_max_input").val(300.8 - 273.15);

    $("#temp_min_input").on( "keyup", function(e) {
        if (e.keyCode == 13) {
            if ((parseFloat($("#temp_min_input").val())) >= parseFloat($("#temp_max_input").val()) ) {
                $("#temp_min_input").val(parseFloat($("#temp_max_input").val())-1)
            }
            general_config.temp_array = [parseFloat($("#temp_min_input").val())+273.15,parseFloat($("#temp_max_input").val())+273.15];
            recreate_scene();
            if (general_config.domain_min > parseFloat($("#temp_min_input").val())) {
                general_config.domain_min = (parseFloat($("#temp_min_input").val())) -1;
            }
            let borne_temp_min = document.querySelector('#rect_temp_min');
            borne_temp_min.x.baseVal.value = ((parseFloat($("#temp_min_input").val()))-general_config.domain_min) / (general_config.domain_max - general_config.domain_min) * 330;
            create_temp_histogram();
        }
    });

    $("#temp_max_input").on( "keyup", function(e) {
        if (e.keyCode == 13) {
            if ((parseFloat($("#temp_min_input").val())) >= parseFloat($("#temp_max_input").val()) ) {
                $("#temp_max_input").val(parseFloat($("#temp_min_input").val())+1)
            }
            general_config.temp_array = [parseFloat($("#temp_min_input").val())+273.15,parseFloat($("#temp_max_input").val())+273.15];
            recreate_scene()
            if (general_config.domain_max < parseFloat($("#temp_max_input").val())) {
                general_config.domain_max = parseFloat($("#temp_max_input").val()) +1;
            }
            let borne_temp_max = document.querySelector('#rect_temp_max');
            //pour le moment width = 330, d'où *330
            borne_temp_max.x.baseVal.value = ((parseFloat($("#temp_max_input").val()))-general_config.domain_min) / (general_config.domain_max - general_config.domain_min) * 330;
            create_temp_histogram();
        }
    });
    
    $("#size_text_input").on( "keyup", function(e) {
        if (e.keyCode == 13) {
            $( "#size_slider" ).slider('value', this.value*150);
            general_config.regular_size = this.value;
            recreate_scene();
        }
    });
        
    $("#density_text_input").on( "keyup", function(e) {
        if (e.keyCode == 13) {
            $( "#density_slider" ).slider('value',this.value*10000);
            general_config.particle_density = this.value;
           recreate_scene()
        }
    });
    

   $("#animation_ckbx").on( "click", function() {
    if($("#animation_ckbx")[0].checked == true){
        general_config.is_animated = true;
    } else {
        general_config.is_animated = false;
    }
    let material = activate_animation();
    activate_animation_second_part(material)
    });
    $("#animation_type_temp").on( "click", function() {
        $('#animation_type_x').prop("checked", false);
        $('#animation_type_y').prop("checked", false);
        $('#animation_type_z').prop("checked", false);
        general_config.animation_parameter = 'temp';
        let material = activate_animation();
        activate_animation_second_part(material)
    });
    $("#animation_type_x").on( "click", function() {
        $('#animation_type_temp').prop("checked", false);
        $('#animation_type_y').prop("checked", false);
        $('#animation_type_z').prop("checked", false);
        general_config.animation_parameter = 'X';
        let material = activate_animation();
        activate_animation_second_part(material)
    });
    $("#animation_type_y").on( "click", function() {
        $('#animation_type_x').prop("checked", false);
        $('#animation_type_temp').prop("checked", false);
        $('#animation_type_z').prop("checked", false);
        general_config.animation_parameter = 'Y';
        let material = activate_animation();
        activate_animation_second_part(material)
    });
    $("#animation_type_z").on( "click", function() {
        $('#animation_type_x').prop("checked", false);
        $('#animation_type_y').prop("checked", false);
        $('#animation_type_temp').prop("checked", false);
        general_config.animation_parameter = 'Z';
        let material = activate_animation();
        activate_animation_second_part(material)
            
    });

    

  
        

    
    
}

