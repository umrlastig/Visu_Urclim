import {
  general_config,
  renderer,
  scene,
  camera,
  controls,
  mesh,
} from "./initialisation.js";
import * as THREE from "./three.module.js";

const light_direction = [];
var light_ambient = 0;

export function activate_animation() {
  var material;

  var texture = new THREE.DataTexture3D(
    general_config.data_volume_3D.data_temp,
    general_config.data_volume_3D.x_length,
    general_config.data_volume_3D.y_length,
    general_config.data_volume_3D.z_length
  );
  texture.format = THREE.RedFormat;
  texture.type = THREE.FloatType;
  texture.unpackAlignment = 1;

  var texture_limit_teb = new THREE.DataTexture3D(
    general_config.data_volume_3D.limit_teb,
    general_config.data_volume_3D.x_length,
    general_config.data_volume_3D.y_length,
    7.0
  );
  texture_limit_teb.format = THREE.RedFormat;
  texture_limit_teb.type = THREE.FloatType;
  texture_limit_teb.unpackAlignment = 1;

  var texture_limit_meso = new THREE.DataTexture3D(
    general_config.data_volume_3D.limit_meso,
    general_config.data_volume_3D.x_length,
    general_config.data_volume_3D.y_length,
    33.0
  );
  texture_limit_meso.format = THREE.RedFormat;
  texture_limit_meso.type = THREE.FloatType;
  texture_limit_meso.unpackAlignment = 1;

  var texture_zs = new THREE.DataTexture(
    general_config.data_volume_3D.data_zs,
    general_config.data_volume_3D.x_length,
    general_config.data_volume_3D.y_length
  );
  texture_zs.format = THREE.RedFormat;
  texture_zs.type = THREE.FloatType;
  texture_zs.unpackAlignment = 1;
  
  var texture_x_center_teb = new THREE.DataTexture3D(
    general_config.data_volume_3D.data_x_center_teb,
    general_config.data_volume_3D.x_length,
    general_config.data_volume_3D.y_length,
    6.0
  );
  texture_x_center_teb.format = THREE.RedFormat;
  texture_x_center_teb.type = THREE.FloatType;
  texture_x_center_teb.unpackAlignment = 1;
  
  var texture_y_center_teb = new THREE.DataTexture3D(
    general_config.data_volume_3D.data_y_center_teb,
    general_config.data_volume_3D.x_length,
    general_config.data_volume_3D.y_length,
    6.0
  );
  texture_y_center_teb.format = THREE.RedFormat;
  texture_y_center_teb.type = THREE.FloatType;
  texture_y_center_teb.unpackAlignment = 1;
  
  var texture_z_center_teb = new THREE.DataTexture3D(
    general_config.data_volume_3D.data_z_center_teb,
    general_config.data_volume_3D.x_length,
    general_config.data_volume_3D.y_length,
    6.0
  );
  texture_z_center_teb.format = THREE.RedFormat;
  texture_z_center_teb.type = THREE.FloatType;
  texture_z_center_teb.unpackAlignment = 1;

  // Colormap textures
  var cmtextures = {
    blue_red_4: new THREE.TextureLoader().load("color/blue_red_4.png", render),
    rainbow: new THREE.TextureLoader().load("color/rainbow.png", render),
    orange_red: new THREE.TextureLoader().load("color/orange_red.png", render),
    red_1: new THREE.TextureLoader().load("color/red_1.png", render),
  };

  var pointTexture = new THREE.TextureLoader().load(
    "./images/disc.png",
    render
  );

  var limit_meso_array = [
    1.0,
    2.0,
    4.0,
    6.0,
    9.0,
    13.0,
    47.0,
    60.0,
    132.0,
    218.4,
    322.1,
    446.5,
    595.8,
    775.0,
    989.9,
    1247.9,
    1557.5,
    1929.0,
    2374.8,
    2909.8,
    3551.8,
    4251.8,
    4951.8,
    5651.8,
    6351.8,
    7051.8,
    7751.8,
    8451.8,
    9151.8,
    9851.8,
    10551.8,
    11251.8,
    11951.8,
    12651.8,
    13351.8,
    14051.8,
    14751.8,
    15451.8,
  ];

  let uniforms = {
    u_data: { value: texture },
    zs_data: { value: texture_zs },
    u_cmdata: { value: cmtextures.blue_red_4 },
    meso_limit: { value: texture_limit_meso },
    teb_limit: { value: texture_limit_teb },
	x_center_teb: { value: texture_x_center_teb },
	y_center_teb: { value: texture_y_center_teb },
	z_center_teb: { value: texture_z_center_teb },
    u_clim: {
      value: [general_config.temp_array[0], general_config.temp_array[1]],
    },
    pointTexture: { value: pointTexture },
    u_size: {
      value: [
        general_config.data_volume_3D.x_length,
        general_config.data_volume_3D.y_length,
        general_config.data_volume_3D.z_length,
      ],
    },
    x_min: { type: "f", value: general_config.x_min },
    x_max: { type: "f", value: general_config.x_max },
    y_min: { type: "f", value: general_config.y_min },
    y_max: { type: "f", value: general_config.y_max },
    zs: { type: "f", value: 46.81231 },
    //zs: {type: "f", value: 35.0},
    //mesolimit: {value: limit_meso_array},
    cst_X: { value: general_config.cst_X },
    cst_Y: { value: general_config.cst_Y },
    cst_Z: { value: general_config.cst_Z },
    regularSize: { value: general_config.regular_size },
    relativeSizeFactor: { value: general_config.relative_size_factor },
    u_time: { type: "f", value: 0 },
    x_factor_min: { type: "f", value: general_config.x_min_factor },
    x_factor_max: { type: "f", value: general_config.x_max_factor },
    y_factor_min: { type: "f", value: general_config.y_min_factor },
    y_factor_max: { type: "f", value: general_config.y_max_factor },
    z_factor_min: { type: "f", value: general_config.z_min_factor },
    z_factor_max: { type: "f", value: general_config.z_max_factor },
    h_factor_min: { type: "f", value: general_config.h_min_factor },
    h_factor_max: { type: "f", value: general_config.h_max_factor },
    temp_factor_min: { type: "f", value: general_config.temp_min_factor },
    temp_factor_max: { type: "f", value: general_config.temp_max_factor },
    active_color_control: { value: general_config.active_color_control },
    temp_filter: { value: general_config.temp_filter },
    z_filter: { value: general_config.z_filter },
    h_filter: { value: general_config.h_filter },
    x_filter: { value: general_config.x_filter },
    y_filter: { value: general_config.y_filter },
  };

  if (general_config.is_animated == false) {
    material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: document.getElementById("vertexshader_fix_3D_points")
        .textContent,
      fragmentShader: document.getElementById("fragmentshader_3D_points")
        .textContent,
      transparent: true,
    });
  } else if (general_config.is_animated == true) {
    if (general_config.animation_parameter == "temp") {
      material = new THREE.ShaderMaterial({
        uniforms,
        vertexShader: document.getElementById("vertexshader_fix_3D_anim_temp")
          .textContent,
        fragmentShader: document.getElementById("fragmentshader_3D_points")
          .textContent,
        transparent: true,
      });
    } else if (general_config.animation_parameter == "Z") {
      material = new THREE.ShaderMaterial({
        uniforms,
        vertexShader: document.getElementById("vertexshader_fix_3D_anim_z")
          .textContent,
        fragmentShader: document.getElementById("fragmentshader_3D_points")
          .textContent,
        transparent: true,
      });
    } else if (general_config.animation_parameter == "X") {
      material = new THREE.ShaderMaterial({
        uniforms,
        vertexShader: document.getElementById("vertexshader_fix_3D_anim_x")
          .textContent,
        fragmentShader: document.getElementById("fragmentshader_3D_points")
          .textContent,
        transparent: true,
      });
    } else if (general_config.animation_parameter == "Y") {
      material = new THREE.ShaderMaterial({
        uniforms,
        vertexShader: document.getElementById("vertexshader_fix_3D_anim_y")
          .textContent,
        fragmentShader: document.getElementById("fragmentshader_3D_points")
          .textContent,
        transparent: true,
      });
    }
  }

  return material;
}
export function activate_animation_second_part(material) {
  if (general_config.grid != null) {
    general_config.grid.children[0].material = material;
  }
  if (general_config.grid_plane != null) {
    general_config.grid_plane.children[0].material = material;
  }
  recreate_scene();
}

export function recreate_scene() {
  let datackbx = document.querySelectorAll(".type_de_points");
  if (general_config.grid_plane == null) {
  } else {
    scene.remove(general_config.grid_plane);
  }
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

  if (general_config.grid_vertical2D == null) {
  } else {
    scene.remove(general_config.grid_vertical2D);
  }
  general_config.grid_vertical2D = new THREE.Object3D();

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

  datackbx.forEach((box) => {
    if (box.checked == true) {
      if (box.id === "data_ckbx") {
        if (general_config.grid == null) {
        } else {
          scene.remove(general_config.grid);
        }
        general_config.grid = new THREE.Object3D();
        create_random_points_cloud(
          general_config.data_points_O_2,
          general_config.data_points_U_2,
          general_config.data_points_V_2,
          general_config.grid,
          general_config.id_sbl_array,
          general_config.id_meso_array,
          general_config.temp_array,
          general_config.THAT,
          general_config.THAT_W,
          general_config.HCanopy,
          general_config.HCanopy_w
        );
      } else if (box.id === "data_ckbx_real_plane_points") {
        if (general_config.grid == null) {
        } else {
          scene.remove(general_config.grid);
        }
        general_config.grid = new THREE.Object3D();
        create_2D_points_cloud(
          general_config.data_points_O_2,
          general_config.data_points_U_2,
          general_config.data_points_V_2,
          general_config.grid,
          general_config.id_sbl_array,
          general_config.id_meso_array,
          general_config.temp_array,
          general_config.THAT,
          general_config.THAT_W,
          general_config.HCanopy,
          general_config.HCanopy_w,
          general_config.number_of_points_real_plane
        );
      } else {
        if (general_config.grid == null) {
        } else {
          scene.remove(general_config.grid);
        }
        general_config.grid = new THREE.Object3D();
        create_regular_points_cloud(
          general_config.data_points_O_2,
          general_config.data_points_U_2,
          general_config.data_points_V_2,
          general_config.grid,
          general_config.id_sbl_array,
          general_config.id_meso_array,
          general_config.temp_array,
          general_config.THAT,
          general_config.THAT_W,
          general_config.HCanopy,
          general_config.HCanopy_w
        );
      }
    }
  });
}

export function create_2D_vertical_plane_series(
  road_summit_data,
  grid,
  id_sbl_array,
  id_meso_array,
  temp_array,
  THAT_W,
  HCanopy,
  HCanopy_w
) {
  /*
		creation des plans verticaux
	*/
  var sbl_meso_level = [];
  if (id_sbl_array.indexOf(1) != -1) {
    sbl_meso_level.push(true);
  } else {
    sbl_meso_level.push(false);
  }
  if (id_sbl_array.indexOf(2) != -1) {
    sbl_meso_level.push(true);
  } else {
    sbl_meso_level.push(false);
  }
  if (id_sbl_array.indexOf(3) != -1) {
    sbl_meso_level.push(true);
  } else {
    sbl_meso_level.push(false);
  }
  if (id_sbl_array.indexOf(4) != -1) {
    sbl_meso_level.push(true);
  } else {
    sbl_meso_level.push(false);
  }
  if (id_sbl_array.indexOf(5) != -1) {
    sbl_meso_level.push(true);
  } else {
    sbl_meso_level.push(false);
  }
  if (id_sbl_array.indexOf(6) != -1) {
    sbl_meso_level.push(true);
  } else {
    sbl_meso_level.push(false);
  }

  if (id_meso_array.indexOf(2) != -1) {
    sbl_meso_level.push(true);
  } else {
    sbl_meso_level.push(false);
  }
  if (id_meso_array.indexOf(3) != -1) {
    sbl_meso_level.push(true);
  } else {
    sbl_meso_level.push(false);
  }
  if (id_meso_array.indexOf(4) != -1) {
    sbl_meso_level.push(true);
  } else {
    sbl_meso_level.push(false);
  }
  if (id_meso_array.indexOf(5) != -1) {
    sbl_meso_level.push(true);
  } else {
    sbl_meso_level.push(false);
  }
  if (id_meso_array.indexOf(6) != -1) {
    sbl_meso_level.push(true);
  } else {
    sbl_meso_level.push(false);
  }
  if (id_meso_array.indexOf(7) != -1) {
    sbl_meso_level.push(true);
  } else {
    sbl_meso_level.push(false);
  }
  if (id_meso_array.indexOf(8) != -1) {
    sbl_meso_level.push(true);
  } else {
    sbl_meso_level.push(false);
  }
  if (id_meso_array.indexOf(9) != -1) {
    sbl_meso_level.push(true);
  } else {
    sbl_meso_level.push(false);
  }
  if (id_meso_array.indexOf(10) != -1) {
    sbl_meso_level.push(true);
  } else {
    sbl_meso_level.push(false);
  }
  if (id_meso_array.indexOf(11) != -1) {
    sbl_meso_level.push(true);
  } else {
    sbl_meso_level.push(false);
  }
  if (id_meso_array.indexOf(12) != -1) {
    sbl_meso_level.push(true);
  } else {
    sbl_meso_level.push(false);
  }
  if (id_meso_array.indexOf(13) != -1) {
    sbl_meso_level.push(true);
  } else {
    sbl_meso_level.push(false);
  }
  if (id_meso_array.indexOf(14) != -1) {
    sbl_meso_level.push(true);
  } else {
    sbl_meso_level.push(false);
  }
  if (id_meso_array.indexOf(15) != -1) {
    sbl_meso_level.push(true);
  } else {
    sbl_meso_level.push(false);
  }
  if (id_meso_array.indexOf(16) != -1) {
    sbl_meso_level.push(true);
  } else {
    sbl_meso_level.push(false);
  }
  if (id_meso_array.indexOf(17) != -1) {
    sbl_meso_level.push(true);
  } else {
    sbl_meso_level.push(false);
  }
  if (id_meso_array.indexOf(18) != -1) {
    sbl_meso_level.push(true);
  } else {
    sbl_meso_level.push(false);
  }
  if (id_meso_array.indexOf(19) != -1) {
    sbl_meso_level.push(true);
  } else {
    sbl_meso_level.push(false);
  }
  if (id_meso_array.indexOf(20) != -1) {
    sbl_meso_level.push(true);
  } else {
    sbl_meso_level.push(false);
  }
  if (id_meso_array.indexOf(21) != -1) {
    sbl_meso_level.push(true);
  } else {
    sbl_meso_level.push(false);
  }
  if (id_meso_array.indexOf(22) != -1) {
    sbl_meso_level.push(true);
  } else {
    sbl_meso_level.push(false);
  }
  if (id_meso_array.indexOf(23) != -1) {
    sbl_meso_level.push(true);
  } else {
    sbl_meso_level.push(false);
  }
  if (id_meso_array.indexOf(24) != -1) {
    sbl_meso_level.push(true);
  } else {
    sbl_meso_level.push(false);
  }
  if (id_meso_array.indexOf(25) != -1) {
    sbl_meso_level.push(true);
  } else {
    sbl_meso_level.push(false);
  }
  if (id_meso_array.indexOf(26) != -1) {
    sbl_meso_level.push(true);
  } else {
    sbl_meso_level.push(false);
  }
  if (id_meso_array.indexOf(27) != -1) {
    sbl_meso_level.push(true);
  } else {
    sbl_meso_level.push(false);
  }
  if (id_meso_array.indexOf(28) != -1) {
    sbl_meso_level.push(true);
  } else {
    sbl_meso_level.push(false);
  }
  if (id_meso_array.indexOf(29) != -1) {
    sbl_meso_level.push(true);
  } else {
    sbl_meso_level.push(false);
  }
  if (id_meso_array.indexOf(30) != -1) {
    sbl_meso_level.push(true);
  } else {
    sbl_meso_level.push(false);
  }
  if (id_meso_array.indexOf(31) != -1) {
    sbl_meso_level.push(true);
  } else {
    sbl_meso_level.push(false);
  }
  if (id_meso_array.indexOf(32) != -1) {
    sbl_meso_level.push(true);
  } else {
    sbl_meso_level.push(false);
  }



  if (id_sbl_array.length > 0) {
    var features_points_array = [];
    var features_normal_array = [];

    //probleme ici

    var h_min = general_config.data_volume_3D.z_min_teb;
    var h_max = general_config.data_volume_3D.z_max_teb;


    for (var a = 0; a < road_summit_data.features.length - 1; a++) {
      var feature_1 = road_summit_data.features[a];
      var feature_2 = road_summit_data.features[a + 1];

      if (feature_2.properties.id_road != feature_1.properties.id_road) {
        continue;
      } else {
        features_points_array.push(
          (feature_1.geometry.coordinates[0] - general_config.Coord_X_paris) *
            general_config.cst_X
        );
        features_points_array.push(h_max * general_config.cst_Z);
        features_points_array.push(
          -(feature_1.geometry.coordinates[1] - general_config.Coord_Y_paris) *
            general_config.cst_Y
        );
        features_points_array.push(
          (feature_1.geometry.coordinates[0] - general_config.Coord_X_paris) *
            general_config.cst_X
        );
        features_points_array.push(h_min * general_config.cst_Z);
        features_points_array.push(
          -(feature_1.geometry.coordinates[1] - general_config.Coord_Y_paris) *
            general_config.cst_Y
        );
        features_points_array.push(
          (feature_2.geometry.coordinates[0] - general_config.Coord_X_paris) *
            general_config.cst_X
        );
        features_points_array.push(h_max * general_config.cst_Z);
        features_points_array.push(
          -(feature_2.geometry.coordinates[1] - general_config.Coord_Y_paris) *
            general_config.cst_Y
        );

        features_points_array.push(
          (feature_1.geometry.coordinates[0] - general_config.Coord_X_paris) *
            general_config.cst_X
        );
        features_points_array.push(h_min * general_config.cst_Z);
        features_points_array.push(
          -(feature_1.geometry.coordinates[1] - general_config.Coord_Y_paris) *
            general_config.cst_Y
        );
        features_points_array.push(
          (feature_2.geometry.coordinates[0] - general_config.Coord_X_paris) *
            general_config.cst_X
        );
        features_points_array.push(h_min * general_config.cst_Z);
        features_points_array.push(
          -(feature_2.geometry.coordinates[1] - general_config.Coord_Y_paris) *
            general_config.cst_Y
        );
        features_points_array.push(
          (feature_2.geometry.coordinates[0] - general_config.Coord_X_paris) *
            general_config.cst_X
        );
        features_points_array.push(h_max * general_config.cst_Z);
        features_points_array.push(
          -(feature_2.geometry.coordinates[1] - general_config.Coord_Y_paris) *
            general_config.cst_Y
        );

        var N_X =
          -(h_min * general_config.cst_Z - h_max * general_config.cst_Z) *
          ((feature_2.geometry.coordinates[1] - general_config.Coord_Y_paris) *
            general_config.cst_Y -
            (feature_1.geometry.coordinates[1] - general_config.Coord_Y_paris) *
              general_config.cst_Y);
        var N_Y =
          (h_min * general_config.cst_Z - h_max * general_config.cst_Z) *
          ((feature_2.geometry.coordinates[0] - general_config.Coord_X_paris) *
            general_config.cst_X -
            (feature_1.geometry.coordinates[0] - general_config.Coord_X_paris) *
              general_config.cst_X);

        var normal_vector = new THREE.Vector2(N_X, N_Y);
        normal_vector.normalize();

        features_normal_array.push(normal_vector.x);
        features_normal_array.push(0);
        features_normal_array.push(normal_vector.y);
        features_normal_array.push(normal_vector.x);
        features_normal_array.push(0);
        features_normal_array.push(normal_vector.y);
        features_normal_array.push(normal_vector.x);
        features_normal_array.push(0);
        features_normal_array.push(normal_vector.y);
        features_normal_array.push(normal_vector.x);
        features_normal_array.push(0);
        features_normal_array.push(normal_vector.y);
        features_normal_array.push(normal_vector.x);
        features_normal_array.push(0);
        features_normal_array.push(normal_vector.y);
        features_normal_array.push(normal_vector.x);
        features_normal_array.push(0);
        features_normal_array.push(normal_vector.y);
      }
    }

    var feature_coord_array_32 = new Float32Array(features_points_array);
    var feature_normal_32 = new Float32Array(features_normal_array);

    var feature_bufferGeometry = new THREE.BufferGeometry();

    feature_bufferGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(feature_coord_array_32, 3)
    );
    feature_bufferGeometry.setAttribute(
      "customNormal",
      new THREE.BufferAttribute(feature_normal_32, 3)
    );

    var texture = new THREE.DataTexture3D(
      general_config.data_volume_3D.data_temp,
      general_config.data_volume_3D.x_length,
      general_config.data_volume_3D.y_length,
      general_config.data_volume_3D.z_length
    );
    texture.format = THREE.RedFormat;
    texture.type = THREE.FloatType;
    texture.unpackAlignment = 1;

    var texture_zs = new THREE.DataTexture(
      general_config.data_volume_3D.data_zs,
      general_config.data_volume_3D.x_length,
      general_config.data_volume_3D.y_length
    );
    texture_zs.format = THREE.RedFormat;
    texture_zs.type = THREE.FloatType;
    texture_zs.unpackAlignment = 1;

    var texture_limit_teb = new THREE.DataTexture3D(
      general_config.data_volume_3D.limit_teb,
      general_config.data_volume_3D.x_length,
      general_config.data_volume_3D.y_length,
      7.0
    );
    texture_limit_teb.format = THREE.RedFormat;
    texture_limit_teb.type = THREE.FloatType;
    texture_limit_teb.unpackAlignment = 1;

    var texture_limit_meso = new THREE.DataTexture3D(
      general_config.data_volume_3D.limit_meso,
      general_config.data_volume_3D.x_length,
      general_config.data_volume_3D.y_length,
      33.0
    );
    texture_limit_meso.format = THREE.RedFormat;
    texture_limit_meso.type = THREE.FloatType;
    texture_limit_meso.unpackAlignment = 1;

    // Colormap textures
    var cmtextures = {
      blue_red_4: new THREE.TextureLoader().load(
        "color/blue_red_4.png",
        render
      ),
      rainbow: new THREE.TextureLoader().load("color/rainbow.png", render),
      orange_red: new THREE.TextureLoader().load(
        "color/orange_red.png",
        render
      ),
    };

    var limit_meso_array = [
      1.0,
      2.0,
      4.0,
      6.0,
      9.0,
      13.0,
      47.0,
      60.0,
      132.0,
      218.4,
      322.1,
      446.5,
      595.8,
      775.0,
      989.9,
      1247.9,
      1557.5,
      1929.0,
      2374.8,
      2909.8,
      3551.8,
      4251.8,
      4951.8,
      5651.8,
      6351.8,
      7051.8,
      7751.8,
      8451.8,
      9151.8,
      9851.8,
      10551.8,
      11251.8,
      11951.8,
      12651.8,
      13351.8,
      14051.8,
      14751.8,
      15451.8,
    ];

    //On regarde quel type de plan veux l'utilisateur
		const rbs = document.querySelectorAll('input[name="planes"]');
    let planeType;
    for (const rb of rbs) {
        if (rb.checked) {
            if(rb.value == "discrete"){
              planeType = 0;
            }else if(rb.value == "interp_3"){
              planeType = 1;
            }else if(rb.value == "interp_2"){
              planeType = 2;
            }
            break;
        }
    }
    var road_material = new THREE.ShaderMaterial({
      side: THREE.DoubleSide,
      transparent: true,
      uniforms: {
        light_direction: { value: light_direction },
        light_ambient: { value: light_ambient },
        u_data: { value: texture },
        zs_data: { value: texture_zs },
        meso_limit: { value: texture_limit_meso },
        teb_limit: { value: texture_limit_teb },
        u_cmdata: { value: cmtextures.blue_red_4 },
        u_clim: {
          value: [general_config.temp_array[0], general_config.temp_array[1]],
        },
        u_size: {
          value: [
            general_config.data_volume_3D.x_length,
            general_config.data_volume_3D.y_length,
            general_config.data_volume_3D.z_length,
          ],
        },
        x_min: { type: "f", value: general_config.data_volume_3D.x_min },
        x_max: { type: "f", value: general_config.data_volume_3D.x_max },
        y_min: { type: "f", value: general_config.data_volume_3D.y_min },
        y_max: { type: "f", value: general_config.data_volume_3D.y_max },
        zs: { type: "f", value: 46.81231 },
        type_model: { type: "f", value: 0.0 },
        sbl_meso_level: { value: sbl_meso_level },
        cst_X: { value: general_config.cst_X },
        cst_Y: { value: general_config.cst_Y },
        cst_Z: { value: general_config.cst_Z },
        active_color_control: { value: general_config.active_color_control },
        plane_type_control: {value: planeType},
        transparency: {
          type: "f",
          value: general_config.vertical_plane_transparency,
        },
        temp_filter: { value: general_config.temp_filter },
        z_filter: { value: general_config.z_filter },
        h_filter: { value: general_config.h_filter },
        x_filter: { value: general_config.x_filter },
        y_filter: { value: general_config.y_filter },
      },
      vertexShader: document.getElementById("vertexshader_3D_plane")
        .textContent,
      fragmentShader: document.getElementById("fragmentshader_3D_plane")
        .textContent,
    });

    var feature_mesh = new THREE.Mesh(feature_bufferGeometry, road_material);

    grid.add(feature_mesh);
    scene.add(grid);
  }

  if (id_meso_array.length > 0) {
    var features_points_array = [];
    var features_normal_array = [];

    var h_min = general_config.data_volume_3D.z_min_meso;
    var h_max = general_config.data_volume_3D.z_max_meso;

    for (var a = 0; a < road_summit_data.features.length - 1; a++) {
      var feature_1 = road_summit_data.features[a];
      var feature_2 = road_summit_data.features[a + 1];

      if (feature_2.properties.id_road != feature_1.properties.id_road) {
        continue;
      } else {
        features_points_array.push(
          (feature_1.geometry.coordinates[0] - general_config.Coord_X_paris) *
            general_config.cst_X
        );
        features_points_array.push(h_max * general_config.cst_Z);
        features_points_array.push(
          -(feature_1.geometry.coordinates[1] - general_config.Coord_Y_paris) *
            general_config.cst_Y
        );
        features_points_array.push(
          (feature_1.geometry.coordinates[0] - general_config.Coord_X_paris) *
            general_config.cst_X
        );
        features_points_array.push(h_min * general_config.cst_Z);
        features_points_array.push(
          -(feature_1.geometry.coordinates[1] - general_config.Coord_Y_paris) *
            general_config.cst_Y
        );
        features_points_array.push(
          (feature_2.geometry.coordinates[0] - general_config.Coord_X_paris) *
            general_config.cst_X
        );
        features_points_array.push(h_max * general_config.cst_Z);
        features_points_array.push(
          -(feature_2.geometry.coordinates[1] - general_config.Coord_Y_paris) *
            general_config.cst_Y
        );

        features_points_array.push(
          (feature_1.geometry.coordinates[0] - general_config.Coord_X_paris) *
            general_config.cst_X
        );
        features_points_array.push(h_min * general_config.cst_Z);
        features_points_array.push(
          -(feature_1.geometry.coordinates[1] - general_config.Coord_Y_paris) *
            general_config.cst_Y
        );
        features_points_array.push(
          (feature_2.geometry.coordinates[0] - general_config.Coord_X_paris) *
            general_config.cst_X
        );
        features_points_array.push(h_min * general_config.cst_Z);
        features_points_array.push(
          -(feature_2.geometry.coordinates[1] - general_config.Coord_Y_paris) *
            general_config.cst_Y
        );
        features_points_array.push(
          (feature_2.geometry.coordinates[0] - general_config.Coord_X_paris) *
            general_config.cst_X
        );
        features_points_array.push(h_max * general_config.cst_Z);
        features_points_array.push(
          -(feature_2.geometry.coordinates[1] - general_config.Coord_Y_paris) *
            general_config.cst_Y
        );

        var N_X =
          -(h_min * general_config.cst_Z - h_max * general_config.cst_Z) *
          ((feature_2.geometry.coordinates[1] - general_config.Coord_Y_paris) *
            general_config.cst_Y -
            (feature_1.geometry.coordinates[1] - general_config.Coord_Y_paris) *
              general_config.cst_Y);
        var N_Y =
          (h_min * general_config.cst_Z - h_max * general_config.cst_Z) *
          ((feature_2.geometry.coordinates[0] - general_config.Coord_X_paris) *
            general_config.cst_X -
            (feature_1.geometry.coordinates[0] - general_config.Coord_X_paris) *
              general_config.cst_X);

        var normal_vector = new THREE.Vector2(N_X, N_Y);
        normal_vector.normalize();

        features_normal_array.push(normal_vector.x);
        features_normal_array.push(0);
        features_normal_array.push(normal_vector.y);
        features_normal_array.push(normal_vector.x);
        features_normal_array.push(0);
        features_normal_array.push(normal_vector.y);
        features_normal_array.push(normal_vector.x);
        features_normal_array.push(0);
        features_normal_array.push(normal_vector.y);
        features_normal_array.push(normal_vector.x);
        features_normal_array.push(0);
        features_normal_array.push(normal_vector.y);
        features_normal_array.push(normal_vector.x);
        features_normal_array.push(0);
        features_normal_array.push(normal_vector.y);
        features_normal_array.push(normal_vector.x);
        features_normal_array.push(0);
        features_normal_array.push(normal_vector.y);
      }
    }

    var feature_coord_array_32 = new Float32Array(features_points_array);
    var feature_normal_32 = new Float32Array(features_normal_array);

    var feature_bufferGeometry = new THREE.BufferGeometry();

    feature_bufferGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(feature_coord_array_32, 3)
    );
    feature_bufferGeometry.setAttribute(
      "customNormal",
      new THREE.BufferAttribute(feature_normal_32, 3)
    );

    var texture = new THREE.DataTexture3D(
      general_config.data_volume_3D.data_temp,
      general_config.data_volume_3D.x_length,
      general_config.data_volume_3D.y_length,
      general_config.data_volume_3D.z_length
    );
    texture.format = THREE.RedFormat;
    texture.type = THREE.FloatType;
    texture.unpackAlignment = 1;

    var texture_zs = new THREE.DataTexture(
      general_config.data_volume_3D.data_zs,
      general_config.data_volume_3D.x_length,
      general_config.data_volume_3D.y_length
    );
    texture_zs.format = THREE.RedFormat;
    texture_zs.type = THREE.FloatType;
    texture_zs.unpackAlignment = 1;

    var texture_limit_teb = new THREE.DataTexture3D(
      general_config.data_volume_3D.limit_teb,
      general_config.data_volume_3D.x_length,
      general_config.data_volume_3D.y_length,
      7.0
    );
    texture_limit_teb.format = THREE.RedFormat;
    texture_limit_teb.type = THREE.FloatType;
    texture_limit_teb.unpackAlignment = 1;

    var texture_limit_meso = new THREE.DataTexture3D(
      general_config.data_volume_3D.limit_meso,
      general_config.data_volume_3D.x_length,
      general_config.data_volume_3D.y_length,
      33.0
    );
    texture_limit_meso.format = THREE.RedFormat;
    texture_limit_meso.type = THREE.FloatType;
    texture_limit_meso.unpackAlignment = 1;

    // Colormap textures
    var cmtextures = {
      blue_red_4: new THREE.TextureLoader().load(
        "color/blue_red_4.png",
        render
      ),
      rainbow: new THREE.TextureLoader().load("color/rainbow.png", render),
      orange_red: new THREE.TextureLoader().load(
        "color/orange_red.png",
        render
      ),
    };

    var limit_meso_array = [
      1.0,
      2.0,
      4.0,
      6.0,
      9.0,
      13.0,
      47.0,
      60.0,
      132.0,
      218.4,
      322.1,
      446.5,
      595.8,
      775.0,
      989.9,
      1247.9,
      1557.5,
      1929.0,
      2374.8,
      2909.8,
      3551.8,
      4251.8,
      4951.8,
      5651.8,
      6351.8,
      7051.8,
      7751.8,
      8451.8,
      9151.8,
      9851.8,
      10551.8,
      11251.8,
      11951.8,
      12651.8,
      13351.8,
      14051.8,
      14751.8,
      15451.8,
    ];

      //On regarde quel type de plan veux l'utilisateur
		const rbs = document.querySelectorAll('input[name="planes"]');
    let planeType;
    for (const rb of rbs) {
        if (rb.checked) {
            if(rb.value == "discrete"){
              planeType = 0;
            }else if(rb.value == "interp_3"){
              planeType = 1;
            }else if(rb.value == "interp_2"){
              planeType = 2;
            }
            break;
        }
    }

    var road_material = new THREE.ShaderMaterial({
      side: THREE.DoubleSide,
      transparent: true,
      uniforms: {
        light_direction: { value: light_direction },
        light_ambient: { value: light_ambient },
        meso_limit: { value: texture_limit_meso },
        teb_limit: { value: texture_limit_teb },
        u_data: { value: texture },
        zs_data: { value: texture_zs },
        u_cmdata: { value: cmtextures.blue_red_4 },
        u_clim: {
          value: [general_config.temp_array[0], general_config.temp_array[1]],
        },
        u_size: {
          value: [
            general_config.data_volume_3D.x_length,
            general_config.data_volume_3D.y_length,
            general_config.data_volume_3D.z_length,
          ],
        },
        x_min: { type: "f", value: general_config.data_volume_3D.x_min },
        x_max: { type: "f", value: general_config.data_volume_3D.x_max },
        y_min: { type: "f", value: general_config.data_volume_3D.y_min },
        y_max: { type: "f", value: general_config.data_volume_3D.y_max },
        zs: { type: "f", value: 46.81231 },
        type_model: { type: "f", value: 1.0 },
        sbl_meso_level: { value: sbl_meso_level },
        cst_X: { value: general_config.cst_X },
        cst_Y: { value: general_config.cst_Y },
        cst_Z: { value: general_config.cst_Z },
        active_color_control: { value: general_config.active_color_control },
        plane_type_control: {value: planeType},
        transparency: {
          type: "f",
          value: general_config.vertical_plane_transparency,
        },
        temp_filter: { value: general_config.temp_filter },
        z_filter: { value: general_config.z_filter },
        h_filter: { value: general_config.h_filter },
        x_filter: { value: general_config.x_filter },
        y_filter: { value: general_config.y_filter },
      },
      vertexShader: document.getElementById("vertexshader_3D_plane")
        .textContent,
      fragmentShader: document.getElementById("fragmentshader_3D_plane")
        .textContent,
    });

    var feature_mesh = new THREE.Mesh(feature_bufferGeometry, road_material);

    grid.add(feature_mesh);
    scene.add(grid);
  }

  create_temp_histogram();
}

export function create_random_points_cloud(
  MesoNH_O_array,
  MesoNH_U_array,
  MesoNH_V_array,
  grid,
  id_sbl_array,
  id_meso_array,
  temperature_scale,
  THAT,
  THAT_W,
  HCanopy,
  HCanopy_w
) {
  /*
		creation des nuages de points 3D
	*/

  let tab_temp = [];
  //let tab_temp2 = general_config.temp_values;

  general_config.temp_values = [];
  var ni = general_config.data_ni,
    nj = general_config.data_nj;

  var coord_array = [];
  var colors = [];
  var sizes = [];
  var transparency_factor_array = [];
  var custompercentagearray = [];
  var z_position_array = [];
  var x_position_array = [];
  var y_position_array = [];

  var h_position_array = [];

  var voxel_level_array = [];

  general_config.z_min = null;
  general_config.z_max = null;
  general_config.x_min = null;
  general_config.x_max = null;
  general_config.y_min = null;
  general_config.y_max = null;

  general_config.h_min = null;
  general_config.h_max = null;

  for (var m = 0; m < id_sbl_array.length; m++) {
    for (var j = 0; j < nj; j++) {
      for (var i = 0; i < ni; i++) {
        var index_1 = j * ni + i;

        var id = id_sbl_array[m];
        var temp = parseFloat(MesoNH_O_array[index_1]["teb_" + id]);

        var index_sup_1 = j * ni + i + (id - 1) * ni * nj;
        var index_sup_2 = j * ni + i + id * ni * nj;
        var h =
          general_config.data_volume_3D["limit_teb"][index_sup_1] -
          MesoNH_O_array[index_1].zs +
          (general_config.data_volume_3D["limit_teb"][index_sup_2] -
            general_config.data_volume_3D["limit_teb"][index_sup_1]) /
            2;
        var h_w =
          general_config.data_volume_3D["limit_teb"][index_sup_1] -
          MesoNH_O_array[index_1].zs;

        // pour 'effectifs egaux', tableau temporaire
        tab_temp.push(temp);

        var x_o = MesoNH_O_array[index_1].x - general_config.Coord_X_paris;
        var y_o = MesoNH_O_array[index_1].y - general_config.Coord_Y_paris;
        var z_o = MesoNH_O_array[index_1].zs + h;

        var l_x = (MesoNH_O_array[index_1].x - MesoNH_U_array[index_1].x) * 2;
        var l_y = (MesoNH_O_array[index_1].y - MesoNH_V_array[index_1].y) * 2;
        var l_z = (h - h_w) * 2;

        if (general_config.h_min != null && general_config.h_max != null) {
          if (h_w < general_config.h_min) {
            general_config.h_min = h_w;
          }
          if (h_w + l_z > general_config.h_max) {
            general_config.h_max = h_w + l_z;
          }
        } else {
          general_config.h_min = h_w;
          general_config.h_max = h_w + l_z;
        }

        if (general_config.z_min != null && general_config.z_max != null) {
          if (z_o - l_z / 2 < general_config.z_min) {
            general_config.z_min = z_o - l_z / 2;
          }
          if (z_o + l_z / 2 > general_config.z_max) {
            general_config.z_max = z_o + l_z / 2;
          }
        } else {
          general_config.z_min = z_o - l_z / 2;
          general_config.z_max = z_o + l_z / 2;
        }

        if (general_config.x_min != null && general_config.x_max != null) {
          if (x_o - l_x / 2 < general_config.x_min) {
            general_config.x_min = x_o - l_x / 2;
          }
          if (x_o + l_x / 2 > general_config.x_max) {
            general_config.x_max = x_o + l_x / 2;
          }
        } else {
          general_config.x_min = x_o - l_x / 2;
          general_config.x_max = x_o + l_x / 2;
        }

        if (general_config.y_min != null && general_config.y_max != null) {
          if (y_o - l_y / 2 < general_config.y_min) {
            general_config.y_min = y_o - l_y / 2;
          }
          if (y_o + l_y / 2 > general_config.y_max) {
            general_config.y_max = y_o + l_y / 2;
          }
        } else {
          general_config.y_min = y_o - l_y / 2;
          general_config.y_max = y_o + l_y / 2;
        }
      }
    }
  }

  for (var m = 0; m < id_meso_array.length; m++) {
    for (var j = 0; j < nj; j++) {
      for (var i = 0; i < ni; i++) {
        var index_1 = j * ni + i;

        var id = id_meso_array[m];
        var temp = parseFloat(MesoNH_O_array[index_1]["tht_" + id]);

        var index_sup_1 = j * ni + i + (id - 1) * ni * nj;
        var index_sup_2 = j * ni + i + id * ni * nj;
        var h =
          general_config.data_volume_3D["limit_meso"][index_sup_1] +
          (general_config.data_volume_3D["limit_meso"][index_sup_2] -
            general_config.data_volume_3D["limit_meso"][index_sup_1]) /
            2 -
          MesoNH_O_array[index_1].zs;
        var h_w =
          general_config.data_volume_3D["limit_meso"][index_sup_1] -
          MesoNH_O_array[index_1].zs;

        // pour 'effectifs egaux', tableau temporaire
        tab_temp.push(temp);

        var x_o = MesoNH_O_array[index_1].x - general_config.Coord_X_paris;
        var y_o = MesoNH_O_array[index_1].y - general_config.Coord_Y_paris;
        var z_o = MesoNH_O_array[index_1].zs + h;

        var l_x = (MesoNH_O_array[index_1].x - MesoNH_U_array[index_1].x) * 2;
        var l_y = (MesoNH_O_array[index_1].y - MesoNH_V_array[index_1].y) * 2;
        var l_z = (h - h_w) * 2;

        if (general_config.h_min != null && general_config.h_max != null) {
          if (h_w < general_config.h_min) {
            general_config.h_min = h_w;
          }
          if (h_w + l_z > general_config.h_max) {
            general_config.h_max = h_w + l_z;
          }
        } else {
          general_config.h_min = h_w;
          general_config.h_max = h_w + l_z;
        }

        if (general_config.z_min != null && general_config.z_max != null) {
          if (z_o - l_z / 2 < general_config.z_min) {
            general_config.z_min = z_o - l_z / 2;
          }
          if (z_o + l_z / 2 > general_config.z_max) {
            general_config.z_max = z_o + l_z / 2;
          }
        } else {
          general_config.z_min = z_o - l_z / 2;
          general_config.z_max = z_o + l_z / 2;
        }

        if (general_config.x_min != null && general_config.x_max != null) {
          if (x_o - l_x / 2 < general_config.x_min) {
            general_config.x_min = x_o - l_x / 2;
          }
          if (x_o + l_x / 2 > general_config.x_max) {
            general_config.x_max = x_o + l_x / 2;
          }
        } else {
          general_config.x_min = x_o - l_x / 2;
          general_config.x_max = x_o + l_x / 2;
        }

        if (general_config.y_min != null && general_config.y_max != null) {
          if (y_o - l_y / 2 < general_config.y_min) {
            general_config.y_min = y_o - l_y / 2;
          }
          if (y_o + l_y / 2 > general_config.y_max) {
            general_config.y_max = y_o + l_y / 2;
          }
        } else {
          general_config.y_min = y_o - l_y / 2;
          general_config.y_max = y_o + l_y / 2;
        }
      }
    }
  }
  /*
    $.each(tab_temp2, function(i, el){
        if($.inArray(el, tab_temp) === -1) tab_temp.push(parseFloat(el));
    });*/
  tab_temp.sort((a, b) => a - b);

  for (var m = 0; m < id_sbl_array.length; m++) {
    for (var j = 0; j < nj; j++) {
      for (var i = 0; i < ni; i++) {
        var index_1 = j * ni + i;
        var id = id_sbl_array[m];
        var temp = parseFloat(MesoNH_O_array[index_1]["teb_" + id]);

        var index_sup_1 = j * ni + i + (id - 1) * ni * nj;
        var index_sup_2 = j * ni + i + id * ni * nj;
        var h =
          general_config.data_volume_3D["limit_teb"][index_sup_1] -
          MesoNH_O_array[index_1].zs +
          (general_config.data_volume_3D["limit_teb"][index_sup_2] -
            general_config.data_volume_3D["limit_teb"][index_sup_1]) /
            2;
        var h_w =
          general_config.data_volume_3D["limit_teb"][index_sup_1] -
          MesoNH_O_array[index_1].zs;

        var x_o = MesoNH_O_array[index_1].x - general_config.Coord_X_paris;
        var y_o = MesoNH_O_array[index_1].y - general_config.Coord_Y_paris;
        var z_o = MesoNH_O_array[index_1].zs + h;

        var l_x = (MesoNH_O_array[index_1].x - MesoNH_U_array[index_1].x) * 2;
        var l_y = (MesoNH_O_array[index_1].y - MesoNH_V_array[index_1].y) * 2;
        var l_z = (h - h_w) * 2;

        var tmin = temperature_scale[0];
        var tmax = temperature_scale[1];
        var percentage_color;
        if (general_config.active_color_control == 0) {
          percentage_color = 0.5;
        } else if (general_config.active_color_control == 1) {
          percentage_color = (temp - tmin) / (tmax - tmin);
        } else if (general_config.active_color_control == 2) {
          percentage_color = (temp - 297.92) / (300.8 - 297.92);
        }
        if (percentage_color < 0) {
          percentage_color = 0;
        } else if (percentage_color > 1) {
          percentage_color = 1;
        }

        general_config.temp_values.push(temp);

        var cell_volume = l_x * l_y * l_z;

        var relative_density;

        if (general_config.relative_density_factor < 1) {
          var add_factor = 1 - general_config.relative_density_factor;
          if (percentage_color < 0.5) {
            relative_density =
              general_config.particle_density +
              general_config.particle_density *
                add_factor *
                (0.5 - percentage_color) *
                2;
          } else if (percentage_color == 0.5) {
            relative_density = general_config.particle_density;
          } else if (percentage_color > 0.5) {
            relative_density =
              general_config.particle_density -
              general_config.particle_density *
                add_factor *
                (percentage_color - 0.5) *
                2;
          }
        } else if (general_config.relative_density_factor == 1) {
          relative_density = general_config.particle_density;
        } else if (general_config.relative_density_factor > 1) {
          var add_factor = general_config.relative_density_factor - 1;
          if (percentage_color < 0.5) {
            relative_density =
              general_config.particle_density -
              general_config.particle_density *
                add_factor *
                (0.5 - percentage_color) *
                2;
          } else if (percentage_color == 0.5) {
            relative_density = general_config.particle_density;
          } else if (percentage_color > 0.5) {
            relative_density =
              general_config.particle_density +
              general_config.particle_density *
                add_factor *
                (percentage_color - 0.5) *
                2;
          }
        }

        var particle_length_XY = parseInt(relative_density * l_x * l_y);
        if (particle_length_XY < 1) {
          particle_length_XY = 1;
        }

        var particle_length_X = parseInt(Math.sqrt(particle_length_XY));

        var offset_x = l_x / (particle_length_X + 1);

        var number_particule_x = particle_length_X;
        var number_particule_y = particle_length_X;
        var number_particule_z =
          parseInt(
            (l_z * general_config.cst_Z) / (offset_x * general_config.cst_X)
          ) - 1;

        if (number_particule_x < 1) {
          number_particule_x = 1;
        }
        if (number_particule_y < 1) {
          number_particule_y = 1;
        }
        if (number_particule_z < 1) {
          number_particule_z = 1;
        }

        var new_density =
          (number_particule_x * number_particule_y * number_particule_z) /
          cell_volume;

        var particle_length = parseInt(new_density * cell_volume);

        //var particle_length = parseInt(relative_density*cell_volume);

        var size;
        var basic_size = 10000;

        if (general_config.relative_size_factor < 1) {
          var add_factor = 1 - general_config.relative_size_factor;
          if (percentage_color < 0.5) {
            size = parseInt(
              basic_size +
                basic_size * add_factor * (0.5 - percentage_color) * 2
            );
          } else if (percentage_color == 0.5) {
            size = basic_size;
          } else if (percentage_color > 0.5) {
            size = parseInt(
              basic_size -
                basic_size * add_factor * (percentage_color - 0.5) * 2
            );
          }
        } else if (general_config.relative_size_factor == 1) {
          size = basic_size;
        } else if (general_config.relative_size_factor > 1) {
          var add_factor = general_config.relative_size_factor - 1;
          if (percentage_color < 0.5) {
            size = parseInt(
              basic_size -
                basic_size * add_factor * (0.5 - percentage_color) * 2
            );
          } else if (percentage_color == 0.5) {
            size = basic_size;
          } else if (percentage_color > 0.5) {
            size = parseInt(
              basic_size +
                basic_size * add_factor * (percentage_color - 0.5) * 2
            );
          }
        }

        for (var p = 0; p < particle_length; p++) {
          var pX = (Math.random() - 0.5) * 2 * (l_x / 2) + x_o,
            pY = (Math.random() - 0.5) * 2 * (l_y / 2) + y_o,
            pZ = (Math.random() - 0.5) * 2 * (l_z / 2) + z_o;
          coord_array.push(pX * general_config.cst_X);
          coord_array.push(pZ * general_config.cst_Z);
          coord_array.push(-pY * general_config.cst_Y);

          sizes.push(size);
          transparency_factor_array.push(general_config.points_transparency);
          custompercentagearray.push(percentage_color * 2 * Math.PI);
          z_position_array.push(
            (pZ - general_config.z_min) /
              (general_config.z_max - general_config.z_min)
          );
          x_position_array.push(
            (pX - general_config.x_min) /
              (general_config.x_max - general_config.x_min)
          );
          y_position_array.push(
            (pY - general_config.y_min) /
              (general_config.y_max - general_config.y_min)
          );
          h_position_array.push(
            (pZ - MesoNH_O_array[index_1].zs - general_config.h_min) /
              (general_config.h_max - general_config.h_min)
          );
          voxel_level_array.push(id);
        }
      }
    }
  }

  for (var m = 0; m < id_meso_array.length; m++) {
    for (var j = 0; j < nj; j++) {
      for (var i = 0; i < ni; i++) {
        var index_1 = j * ni + i;

        var id = id_meso_array[m];
        var temp = parseFloat(MesoNH_O_array[index_1]["tht_" + id]);

        var index_sup_1 = j * ni + i + (id - 1) * ni * nj;
        var index_sup_2 = j * ni + i + (id - 0) * ni * nj;
        var h =
          general_config.data_volume_3D["limit_meso"][index_sup_1] +
          (general_config.data_volume_3D["limit_meso"][index_sup_2] -
            general_config.data_volume_3D["limit_meso"][index_sup_1]) /
            2 -
          MesoNH_O_array[index_1].zs;
        var h_w =
          general_config.data_volume_3D["limit_meso"][index_sup_1] -
          MesoNH_O_array[index_1].zs;

        var x_o = MesoNH_O_array[index_1].x - general_config.Coord_X_paris;
        var y_o = MesoNH_O_array[index_1].y - general_config.Coord_Y_paris;
        var z_o = MesoNH_O_array[index_1].zs + h;

        var l_x = (MesoNH_O_array[index_1].x - MesoNH_U_array[index_1].x) * 2;
        var l_y = (MesoNH_O_array[index_1].y - MesoNH_V_array[index_1].y) * 2;
        var l_z = (h - h_w) * 2;

        var tmin = temperature_scale[0];
        var tmax = temperature_scale[1];
        var percentage_color;
        if (general_config.active_color_control == 0) {
          percentage_color = 0.5;
        } else if (general_config.active_color_control == 1) {
          percentage_color = (temp - tmin) / (tmax - tmin);
        } else if (general_config.active_color_control == 2) {
          percentage_color = (temp - 297.92) / (300.8 - 297.92);
        }
        if (percentage_color < 0) {
          percentage_color = 0;
        } else if (percentage_color > 1) {
          percentage_color = 1;
        }

        general_config.temp_values.push(temp);

        var cell_volume = l_x * l_y * l_z;

        var relative_density;

        if (general_config.relative_density_factor < 1) {
          var add_factor = 1 - general_config.relative_density_factor;
          if (percentage_color < 0.5) {
            relative_density =
              general_config.particle_density +
              general_config.particle_density *
                add_factor *
                (0.5 - percentage_color) *
                2;
          } else if (percentage_color == 0.5) {
            relative_density = general_config.particle_density;
          } else if (percentage_color > 0.5) {
            relative_density =
              general_config.particle_density -
              general_config.particle_density *
                add_factor *
                (percentage_color - 0.5) *
                2;
          }
        } else if (general_config.relative_density_factor == 1) {
          relative_density = general_config.particle_density;
        } else if (general_config.relative_density_factor > 1) {
          var add_factor = general_config.relative_density_factor - 1;
          if (percentage_color < 0.5) {
            relative_density =
              general_config.particle_density -
              general_config.particle_density *
                add_factor *
                (0.5 - percentage_color) *
                2;
          } else if (percentage_color == 0.5) {
            relative_density = general_config.particle_density;
          } else if (percentage_color > 0.5) {
            relative_density =
              general_config.particle_density +
              general_config.particle_density *
                add_factor *
                (percentage_color - 0.5) *
                2;
          }
        }

        var particle_length_XY = parseInt(relative_density * l_x * l_y);
        if (particle_length_XY < 1) {
          particle_length_XY = 1;
        }

        var particle_length_X = parseInt(Math.sqrt(particle_length_XY));

        var offset_x = l_x / (particle_length_X + 1);

        var number_particule_x = particle_length_X;
        var number_particule_y = particle_length_X;
        var number_particule_z =
          parseInt(
            (l_z * general_config.cst_Z) / (offset_x * general_config.cst_X)
          ) - 1;

        if (number_particule_x < 1) {
          number_particule_x = 1;
        }
        if (number_particule_y < 1) {
          number_particule_y = 1;
        }
        if (number_particule_z < 1) {
          number_particule_z = 1;
        }

        var new_density =
          (number_particule_x * number_particule_y * number_particule_z) /
          cell_volume;

        var particle_length = parseInt(new_density * cell_volume);

        //var particle_length = parseInt(relative_density*cell_volume);

        var size;
        var basic_size = 10000;

        if (general_config.relative_size_factor < 1) {
          var add_factor = 1 - general_config.relative_size_factor;
          if (percentage_color < 0.5) {
            size = parseInt(
              basic_size +
                basic_size * add_factor * (0.5 - percentage_color) * 2
            );
          } else if (percentage_color == 0.5) {
            size = basic_size;
          } else if (percentage_color > 0.5) {
            size = parseInt(
              basic_size -
                basic_size * add_factor * (percentage_color - 0.5) * 2
            );
          }
        } else if (general_config.relative_size_factor == 1) {
          size = basic_size;
        } else if (general_config.relative_size_factor > 1) {
          var add_factor = general_config.relative_size_factor - 1;
          if (percentage_color < 0.5) {
            size = parseInt(
              basic_size -
                basic_size * add_factor * (0.5 - percentage_color) * 2
            );
          } else if (percentage_color == 0.5) {
            size = basic_size;
          } else if (percentage_color > 0.5) {
            size = parseInt(
              basic_size +
                basic_size * add_factor * (percentage_color - 0.5) * 2
            );
          }
        }

        for (var p = 0; p < particle_length; p++) {
          var pX = (Math.random() - 0.5) * 2 * (l_x / 2) + x_o,
            pY = (Math.random() - 0.5) * 2 * (l_y / 2) + y_o,
            pZ = (Math.random() - 0.5) * 2 * (l_z / 2) + z_o;
          coord_array.push(pX * general_config.cst_X);
          coord_array.push(pZ * general_config.cst_Z);
          coord_array.push(-pY * general_config.cst_Y);

          sizes.push(size);
          transparency_factor_array.push(general_config.points_transparency);
          custompercentagearray.push(percentage_color * 2 * Math.PI);
          z_position_array.push(
            (pZ - general_config.z_min) /
              (general_config.z_max - general_config.z_min)
          );
          x_position_array.push(
            (pX - general_config.x_min) /
              (general_config.x_max - general_config.x_min)
          );
          y_position_array.push(
            (pY - general_config.y_min) /
              (general_config.y_max - general_config.y_min)
          );
          h_position_array.push(
            (pZ - MesoNH_O_array[index_1].zs - general_config.h_min) /
              (general_config.h_max - general_config.h_min)
          );
          voxel_level_array.push(parseInt(id) + 5);
        }
      }
    }
  }

  var coord_array_32 = new Float32Array(coord_array);
  var colors_32 = new Float32Array(colors);
  var sizes_32 = new Float32Array(sizes);
  var transparency_factor_32 = new Float32Array(transparency_factor_array);
  var custompercentage_32 = new Float32Array(custompercentagearray);
  var z_position_array_32 = new Float32Array(z_position_array);
  var x_position_array_32 = new Float32Array(x_position_array);
  var y_position_array_32 = new Float32Array(y_position_array);
  var h_position_array_32 = new Float32Array(h_position_array);

  var voxel_level_array_32 = new Float32Array(voxel_level_array);

  var bufferGeometry = new THREE.BufferGeometry();

  bufferGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(coord_array_32, 3)
  );

  bufferGeometry.setAttribute(
    "customsize",
    new THREE.BufferAttribute(sizes_32, 1)
  );
  bufferGeometry.setAttribute(
    "customtransparency",
    new THREE.BufferAttribute(transparency_factor_32, 1)
  );
  bufferGeometry.setAttribute(
    "custompercentage",
    new THREE.BufferAttribute(custompercentage_32, 1)
  );
  bufferGeometry.setAttribute(
    "z_position",
    new THREE.BufferAttribute(z_position_array_32, 1)
  );
  bufferGeometry.setAttribute(
    "x_position",
    new THREE.BufferAttribute(x_position_array_32, 1)
  );
  bufferGeometry.setAttribute(
    "y_position",
    new THREE.BufferAttribute(y_position_array_32, 1)
  );
  bufferGeometry.setAttribute(
    "h_position",
    new THREE.BufferAttribute(h_position_array_32, 1)
  );
  bufferGeometry.setAttribute(
    "voxel_level",
    new THREE.BufferAttribute(voxel_level_array_32, 1)
  );

  let material = activate_animation();

  var point = new THREE.Points(bufferGeometry, material);
  //create_temp_histogram();	 <==== je déplace ailleurs

  grid.add(point);
  scene.add(grid);
}

export function create_2D_plane_series(
  MesoNH_O_array,
  MesoNH_U_array,
  MesoNH_V_array,
  grid,
  id_sbl_array,
  id_meso_array,
  temperature_scale,
  THAT,
  THAT_W,
  HCanopy,
  HCanopy_w
) {
  /*
		creation des plans horizontaux
	*/

  general_config.temp_values = [];
  var ni = general_config.data_ni,
    nj = general_config.data_nj;
  let tab_temp = [];
  var coord_array = [];
  var colors = [];
  var sizes = [];
  var transparency_factor_array = [];
  var custompercentagearray = [];
  var z_position_array = [];
  var x_position_array = [];
  var y_position_array = [];

  var h_position_array = [];

  var voxel_level_array = [];

  general_config.z_min = null;
  general_config.z_max = null;
  general_config.x_min = null;
  general_config.x_max = null;
  general_config.y_min = null;
  general_config.y_max = null;

  general_config.h_min = null;
  general_config.h_max = null;

  for (var m = 0; m < id_sbl_array.length; m++) {
    for (var j = 0; j < nj; j++) {
      for (var i = 0; i < ni; i++) {
        var index_1 = j * ni + i;

        var id = id_sbl_array[m];
        var temp = parseFloat(MesoNH_O_array[index_1]["teb_" + id]);

        var index_sup_1 = j * ni + i + (id - 1) * ni * nj;
        var index_sup_2 = j * ni + i + id * ni * nj;
        var h =
          general_config.data_volume_3D["limit_teb"][index_sup_1] -
          MesoNH_O_array[index_1].zs +
          (general_config.data_volume_3D["limit_teb"][index_sup_2] -
            general_config.data_volume_3D["limit_teb"][index_sup_1]) /
            2;
        var h_w =
          general_config.data_volume_3D["limit_teb"][index_sup_1] -
          MesoNH_O_array[index_1].zs;

        tab_temp.push(temp);

        var x_o = MesoNH_O_array[index_1].x - general_config.Coord_X_paris;
        var y_o = MesoNH_O_array[index_1].y - general_config.Coord_Y_paris;
        var z_o = MesoNH_O_array[index_1].zs + h;

        var l_x = (MesoNH_O_array[index_1].x - MesoNH_U_array[index_1].x) * 2;
        var l_y = (MesoNH_O_array[index_1].y - MesoNH_V_array[index_1].y) * 2;
        var l_z = (h - h_w) * 2;

        if (general_config.h_min != null && general_config.h_max != null) {
          if (h_w < general_config.h_min) {
            general_config.h_min = h_w;
          }
          if (h_w + l_z > general_config.h_max) {
            general_config.h_max = h_w + l_z;
          }
        } else {
          general_config.h_min = h_w;
          general_config.h_max = h_w + l_z;
        }

        if (general_config.z_min != null && general_config.z_max != null) {
          if (z_o - l_z / 2 < general_config.z_min) {
            general_config.z_min = z_o - l_z / 2;
          }
          if (z_o + l_z / 2 > general_config.z_max) {
            general_config.z_max = z_o + l_z / 2;
          }
        } else {
          general_config.z_min = z_o - l_z / 2;
          general_config.z_max = z_o + l_z / 2;
        }

        if (general_config.x_min != null && general_config.x_max != null) {
          if (x_o - l_x / 2 < general_config.x_min) {
            general_config.x_min = x_o - l_x / 2;
          }
          if (x_o + l_x / 2 > general_config.x_max) {
            general_config.x_max = x_o + l_x / 2;
          }
        } else {
          general_config.x_min = x_o - l_x / 2;
          general_config.x_max = x_o + l_x / 2;
        }

        if (general_config.y_min != null && general_config.y_max != null) {
          if (y_o - l_y / 2 < general_config.y_min) {
            general_config.y_min = y_o - l_y / 2;
          }
          if (y_o + l_y / 2 > general_config.y_max) {
            general_config.y_max = y_o + l_y / 2;
          }
        } else {
          general_config.y_min = y_o - l_y / 2;
          general_config.y_max = y_o + l_y / 2;
        }
      }
    }
  }

  for (var m = 0; m < id_meso_array.length; m++) {
    for (var j = 0; j < nj; j++) {
      for (var i = 0; i < ni; i++) {
        var index_1 = j * ni + i;

        var id = id_meso_array[m];
        var temp = parseFloat(MesoNH_O_array[index_1]["tht_" + id]);

        var index_sup_1 = j * ni + i + (id - 1) * ni * nj;
        var index_sup_2 = j * ni + i + (id - 0) * ni * nj;
        var h =
          general_config.data_volume_3D["limit_meso"][index_sup_1] +
          (general_config.data_volume_3D["limit_meso"][index_sup_2] -
            general_config.data_volume_3D["limit_meso"][index_sup_1]) /
            2 -
          MesoNH_O_array[index_1].zs;
        var h_w =
          general_config.data_volume_3D["limit_meso"][index_sup_1] -
          MesoNH_O_array[index_1].zs;

        tab_temp.push(temp);
        var x_o = MesoNH_O_array[index_1].x - general_config.Coord_X_paris;
        var y_o = MesoNH_O_array[index_1].y - general_config.Coord_Y_paris;
        var z_o = MesoNH_O_array[index_1].zs + h;

        var l_x = (MesoNH_O_array[index_1].x - MesoNH_U_array[index_1].x) * 2;
        var l_y = (MesoNH_O_array[index_1].y - MesoNH_V_array[index_1].y) * 2;
        var l_z = (h - h_w) * 2;

        if (general_config.h_min != null && general_config.h_max != null) {
          if (h_w < general_config.h_min) {
            general_config.h_min = h_w;
          }
          if (h_w + l_z > general_config.h_max) {
            general_config.h_max = h_w + l_z;
          }
        } else {
          general_config.h_min = h_w;
          general_config.h_max = h_w + l_z;
        }

        if (general_config.z_min != null && general_config.z_max != null) {
          if (z_o - l_z / 2 < general_config.z_min) {
            general_config.z_min = z_o - l_z / 2;
          }
          if (z_o + l_z / 2 > general_config.z_max) {
            general_config.z_max = z_o + l_z / 2;
          }
        } else {
          general_config.z_min = z_o - l_z / 2;
          general_config.z_max = z_o + l_z / 2;
        }

        if (general_config.x_min != null && general_config.x_max != null) {
          if (x_o - l_x / 2 < general_config.x_min) {
            general_config.x_min = x_o - l_x / 2;
          }
          if (x_o + l_x / 2 > general_config.x_max) {
            general_config.x_max = x_o + l_x / 2;
          }
        } else {
          general_config.x_min = x_o - l_x / 2;
          general_config.x_max = x_o + l_x / 2;
        }

        if (general_config.y_min != null && general_config.y_max != null) {
          if (y_o - l_y / 2 < general_config.y_min) {
            general_config.y_min = y_o - l_y / 2;
          }
          if (y_o + l_y / 2 > general_config.y_max) {
            general_config.y_max = y_o + l_y / 2;
          }
        } else {
          general_config.y_min = y_o - l_y / 2;
          general_config.y_max = y_o + l_y / 2;
        }
      }
    }
  }

  tab_temp.sort((a, b) => a - b);

  for (var m = 0; m < id_sbl_array.length; m++) {
    for (var j = 0; j < nj; j++) {
      for (var i = 0; i < ni; i++) {
        var index_1 = j * ni + i;

        var id = id_sbl_array[m];
        var temp = MesoNH_O_array[index_1]["teb_" + id];

        var index_sup_1 = j * ni + i + (id - 1) * ni * nj;
        var index_sup_2 = j * ni + i + id * ni * nj;
        var h =
          general_config.data_volume_3D["limit_teb"][index_sup_1] -
          MesoNH_O_array[index_1].zs +
          (general_config.data_volume_3D["limit_teb"][index_sup_2] -
            general_config.data_volume_3D["limit_teb"][index_sup_1]) /
            2;
        var h_w =
          general_config.data_volume_3D["limit_teb"][index_sup_1] -
          MesoNH_O_array[index_1].zs;

        var tmin = temperature_scale[0];
        var tmax = temperature_scale[1];
        if (temp >= tmin && temp <= tmax) {
          var x_u = MesoNH_U_array[index_1].x - general_config.Coord_X_paris;
          var y_u = MesoNH_U_array[index_1].y - general_config.Coord_Y_paris;
          var z_u = MesoNH_U_array[index_1].zs + h;

          var x_v = MesoNH_V_array[index_1].x - general_config.Coord_X_paris;
          var y_v = MesoNH_V_array[index_1].y - general_config.Coord_Y_paris;
          var z_v = MesoNH_V_array[index_1].zs + h;

          var z_o = MesoNH_O_array[index_1].zs + h;

          var l_x = (MesoNH_O_array[index_1].x - MesoNH_U_array[index_1].x) * 2;
          var l_y = (MesoNH_O_array[index_1].y - MesoNH_V_array[index_1].y) * 2;

          var x_1 = x_u;
          var x_2 = x_u + l_x;
          var y_1 = -y_v;
          var y_2 = -(y_v + l_y);

          var x_1 = x_u + 10;
          var x_2 = x_u + l_x - 10;
          var y_1 = -(y_v + 10);
          var y_2 = -(y_v + l_y - 10);

          //up
          coord_array.push(x_1 * general_config.cst_X);
          coord_array.push(z_o * general_config.cst_Z);
          coord_array.push(y_2 * general_config.cst_Y);
          coord_array.push(x_1 * general_config.cst_X);
          coord_array.push(z_o * general_config.cst_Z);
          coord_array.push(y_1 * general_config.cst_Y);
          coord_array.push(x_2 * general_config.cst_X);
          coord_array.push(z_o * general_config.cst_Z);
          coord_array.push(y_1 * general_config.cst_Y);

          voxel_level_array.push(id);
          voxel_level_array.push(id);
          voxel_level_array.push(id);

          coord_array.push(x_1 * general_config.cst_X);
          coord_array.push(z_o * general_config.cst_Z);
          coord_array.push(y_2 * general_config.cst_Y);
          coord_array.push(x_2 * general_config.cst_X);
          coord_array.push(z_o * general_config.cst_Z);
          coord_array.push(y_1 * general_config.cst_Y);
          coord_array.push(x_2 * general_config.cst_X);
          coord_array.push(z_o * general_config.cst_Z);
          coord_array.push(y_2 * general_config.cst_Y);

          voxel_level_array.push(id);
          voxel_level_array.push(id);
          voxel_level_array.push(id);

          //down
          coord_array.push(x_1 * general_config.cst_X);
          coord_array.push(z_o * general_config.cst_Z);
          coord_array.push(y_2 * general_config.cst_Y);
          coord_array.push(x_2 * general_config.cst_X);
          coord_array.push(z_o * general_config.cst_Z);
          coord_array.push(y_1 * general_config.cst_Y);
          coord_array.push(x_1 * general_config.cst_X);
          coord_array.push(z_o * general_config.cst_Z);
          coord_array.push(y_1 * general_config.cst_Y);

          voxel_level_array.push(id);
          voxel_level_array.push(id);
          voxel_level_array.push(id);

          coord_array.push(x_1 * general_config.cst_X);
          coord_array.push(z_o * general_config.cst_Z);
          coord_array.push(y_2 * general_config.cst_Y);
          coord_array.push(x_2 * general_config.cst_X);
          coord_array.push(z_o * general_config.cst_Z);
          coord_array.push(y_2 * general_config.cst_Y);
          coord_array.push(x_2 * general_config.cst_X);
          coord_array.push(z_o * general_config.cst_Z);
          coord_array.push(y_1 * general_config.cst_Y);

          voxel_level_array.push(id);
          voxel_level_array.push(id);
          voxel_level_array.push(id);

          var percentage_color;
          if (general_config.active_color_control == 0) {
            percentage_color = 0.5;
          } else if (general_config.active_color_control == 1) {
            percentage_color = (temp - tmin) / (tmax - tmin);
          } else if (general_config.active_color_control == 2) {
            percentage_color = (temp - 297.92) / (300.8 - 297.92);
          }
          if (percentage_color < 0) {
            percentage_color = 0;
          } else if (percentage_color > 1) {
            percentage_color = 1;
          }

          general_config.temp_values.push(temp);

          var transparency = general_config.transparency_factor;
        } else {
          general_config.temp_values.push(temp);
        }
      }
    }
  }

  for (var m = 0; m < id_meso_array.length; m++) {
    for (var j = 0; j < nj; j++) {
      for (var i = 0; i < ni; i++) {
        var index_1 = j * ni + i;

        var id = id_meso_array[m];
        var temp = parseFloat(MesoNH_O_array[index_1]["tht_" + id]);

        var index_sup_1 = j * ni + i + (id - 1) * ni * nj;
        var index_sup_2 = j * ni + i + (id - 0) * ni * nj;
        var h =
          general_config.data_volume_3D["limit_meso"][index_sup_1] +
          (general_config.data_volume_3D["limit_meso"][index_sup_2] -
            general_config.data_volume_3D["limit_meso"][index_sup_1]) /
            2 -
          MesoNH_O_array[index_1].zs;
        var h_w =
          general_config.data_volume_3D["limit_meso"][index_sup_1] -
          MesoNH_O_array[index_1].zs;

        var tmin = temperature_scale[0];
        var tmax = temperature_scale[1];
        //TODO supprimer ça pour les fonctions de filtre
        if (temp >= tmin && temp <= tmax) {
          var x_u = MesoNH_U_array[index_1].x - general_config.Coord_X_paris;
          var y_u = MesoNH_U_array[index_1].y - general_config.Coord_Y_paris;
          var z_u = MesoNH_U_array[index_1].zs + h;

          var x_v = MesoNH_V_array[index_1].x - general_config.Coord_X_paris;
          var y_v = MesoNH_V_array[index_1].y - general_config.Coord_Y_paris;
          var z_v = MesoNH_V_array[index_1].zs + h;

          var z_o = MesoNH_O_array[index_1].zs + h;

          var l_x = (MesoNH_O_array[index_1].x - MesoNH_U_array[index_1].x) * 2;
          var l_y = (MesoNH_O_array[index_1].y - MesoNH_V_array[index_1].y) * 2;

          var x_1 = x_u;
          var x_2 = x_u + l_x;
          var y_1 = -y_v;
          var y_2 = -(y_v + l_y);

          //up
          coord_array.push(x_1 * general_config.cst_X);
          coord_array.push(z_o * general_config.cst_Z);
          coord_array.push(y_2 * general_config.cst_Y);
          coord_array.push(x_1 * general_config.cst_X);
          coord_array.push(z_o * general_config.cst_Z);
          coord_array.push(y_1 * general_config.cst_Y);
          coord_array.push(x_2 * general_config.cst_X);
          coord_array.push(z_o * general_config.cst_Z);
          coord_array.push(y_1 * general_config.cst_Y);

          voxel_level_array.push(parseInt(id) + 5);
          voxel_level_array.push(parseInt(id) + 5);
          voxel_level_array.push(parseInt(id) + 5);

          coord_array.push(x_1 * general_config.cst_X);
          coord_array.push(z_o * general_config.cst_Z);
          coord_array.push(y_2 * general_config.cst_Y);
          coord_array.push(x_2 * general_config.cst_X);
          coord_array.push(z_o * general_config.cst_Z);
          coord_array.push(y_1 * general_config.cst_Y);
          coord_array.push(x_2 * general_config.cst_X);
          coord_array.push(z_o * general_config.cst_Z);
          coord_array.push(y_2 * general_config.cst_Y);

          voxel_level_array.push(parseInt(id) + 5);
          voxel_level_array.push(parseInt(id) + 5);
          voxel_level_array.push(parseInt(id) + 5);

          //down
          coord_array.push(x_1 * general_config.cst_X);
          coord_array.push(z_o * general_config.cst_Z);
          coord_array.push(y_2 * general_config.cst_Y);
          coord_array.push(x_2 * general_config.cst_X);
          coord_array.push(z_o * general_config.cst_Z);
          coord_array.push(y_1 * general_config.cst_Y);
          coord_array.push(x_1 * general_config.cst_X);
          coord_array.push(z_o * general_config.cst_Z);
          coord_array.push(y_1 * general_config.cst_Y);

          voxel_level_array.push(parseInt(id) + 5);
          voxel_level_array.push(parseInt(id) + 5);
          voxel_level_array.push(parseInt(id) + 5);

          coord_array.push(x_1 * general_config.cst_X);
          coord_array.push(z_o * general_config.cst_Z);
          coord_array.push(y_2 * general_config.cst_Y);
          coord_array.push(x_2 * general_config.cst_X);
          coord_array.push(z_o * general_config.cst_Z);
          coord_array.push(y_2 * general_config.cst_Y);
          coord_array.push(x_2 * general_config.cst_X);
          coord_array.push(z_o * general_config.cst_Z);
          coord_array.push(y_1 * general_config.cst_Y);

          voxel_level_array.push(parseInt(id) + 5);
          voxel_level_array.push(parseInt(id) + 5);
          voxel_level_array.push(parseInt(id) + 5);

          var percentage_color;
          if (general_config.active_color_control == 0) {
            percentage_color = 0.5;
          } else if (general_config.active_color_control == 1) {
            percentage_color = (temp - tmin) / (tmax - tmin);
          } else if (general_config.active_color_control == 2) {
            percentage_color = (temp - 297.92) / (300.8 - 297.92);
          }
          if (percentage_color < 0) {
            percentage_color = 0;
          } else if (percentage_color > 1) {
            percentage_color = 1;
          }

          general_config.temp_values.push(temp);

          var transparency = general_config.transparency_factor;
        } else {
          general_config.temp_values.push(temp);
        }
      }
    }
  }

  var coord_array_32 = new Float32Array(coord_array);
  var colors_32 = new Float32Array(colors);
  var voxel_level_array_32 = new Float32Array(voxel_level_array);

  var bufferGeometry = new THREE.BufferGeometry();

  bufferGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(coord_array_32, 3)
  );

  bufferGeometry.setAttribute(
    "voxel_level",
    new THREE.BufferAttribute(voxel_level_array_32, 1)
  );

  var texture = new THREE.DataTexture3D(
    general_config.data_volume_3D.data_temp,
    general_config.data_volume_3D.x_length,
    general_config.data_volume_3D.y_length,
    general_config.data_volume_3D.z_length
  );
  texture.format = THREE.RedFormat;
  texture.type = THREE.FloatType;
  texture.unpackAlignment = 1;

  var texture_limit_meso = new THREE.DataTexture3D(
    general_config.data_volume_3D.limit_meso,
    general_config.data_volume_3D.x_length,
    general_config.data_volume_3D.y_length,
    33.0
  );
  texture_limit_meso.format = THREE.RedFormat;
  texture_limit_meso.type = THREE.FloatType;
  texture_limit_meso.unpackAlignment = 1;

  var texture_limit_teb = new THREE.DataTexture3D(
    general_config.data_volume_3D.limit_teb,
    general_config.data_volume_3D.x_length,
    general_config.data_volume_3D.y_length,
    7.0
  );
  texture_limit_teb.format = THREE.RedFormat;
  texture_limit_teb.type = THREE.FloatType;
  texture_limit_teb.unpackAlignment = 1;

  var texture_zs = new THREE.DataTexture(
    general_config.data_volume_3D.data_zs,
    general_config.data_volume_3D.x_length,
    general_config.data_volume_3D.y_length
  );
  texture_zs.format = THREE.RedFormat;
  texture_zs.type = THREE.FloatType;
  texture_zs.unpackAlignment = 1;

  // Colormap textures
  var cmtextures = {
    blue_red_4: new THREE.TextureLoader().load("color/blue_red_4.png", render),
    rainbow: new THREE.TextureLoader().load("color/rainbow.png", render),
    orange_red: new THREE.TextureLoader().load("color/orange_red.png", render),
    red_1: new THREE.TextureLoader().load("color/red_1.png", render),
  };

  var limit_meso_array = [
    1.0,
    2.0,
    4.0,
    6.0,
    9.0,
    13.0,
    47.0,
    60.0,
    132.0,
    218.4,
    322.1,
    446.5,
    595.8,
    775.0,
    989.9,
    1247.9,
    1557.5,
    1929.0,
    2374.8,
    2909.8,
    3551.8,
    4251.8,
    4951.8,
    5651.8,
    6351.8,
    7051.8,
    7751.8,
    8451.8,
    9151.8,
    9851.8,
    10551.8,
    11251.8,
    11951.8,
    12651.8,
    13351.8,
    14051.8,
    14751.8,
    15451.8,
  ];

  var material = new THREE.ShaderMaterial({
    side: THREE.DoubleSide,
    transparent: true,
    uniforms: {
      light_direction: { value: light_direction },
      light_ambient: { value: light_ambient },
      u_data: { value: texture },
      zs_data: { value: texture_zs },
      meso_limit: { value: texture_limit_meso },
      teb_limit: { value: texture_limit_teb },
      transparency_factor: { value: general_config.transparency_factor },
      u_time: { type: "f", value: 0 },
      u_cmdata: { value: cmtextures.blue_red_4 },
      u_clim: { value: [temperature_scale[0], temperature_scale[1]] },
      u_size: {
        value: [
          general_config.data_volume_3D.x_length,
          general_config.data_volume_3D.y_length,
          general_config.data_volume_3D.z_length,
        ],
      },
      x_min: { type: "f", value: general_config.x_min },
      x_max: { type: "f", value: general_config.x_max },
      y_min: { type: "f", value: general_config.y_min },
      y_max: { type: "f", value: general_config.y_max },
      zs: { type: "f", value: 46.81231 },
      //zs: {type: "f", value: 35.0},
      mesolimit: { value: limit_meso_array },
      cst_X: { value: general_config.cst_X },
      cst_Y: { value: general_config.cst_Y },
      cst_Z: { value: general_config.cst_Z },
      active_color_control: { value: general_config.active_color_control },
      temp_filter: { value: general_config.temp_filter },
      z_filter: { value: general_config.z_filter },
      h_filter: { value: general_config.h_filter },
      x_filter: { value: general_config.x_filter },
      y_filter: { value: general_config.y_filter },
    },
    vertexShader: document.getElementById("vertexshader_2D_plane").textContent,
    fragmentShader: document.getElementById("fragmentshader_2D_plane")
      .textContent,
  });

  var mesh = new THREE.Mesh(bufferGeometry, material);

  grid.add(mesh);
  scene.add(grid);
}

export function create_2D_points_cloud(
  MesoNH_O_array,
  MesoNH_U_array,
  MesoNH_V_array,
  grid,
  id_sbl_array,
  id_meso_array,
  temperature_scale,
  THAT,
  THAT_W,
  HCanopy,
  HCanopy_w,
  number_points
) {
  /*
		creation des nuages de points 2D
	*/

  general_config.temp_values = [];
  var ni = general_config.data_ni,
    nj = general_config.data_nj;
  let tab_temp = [];
  var coord_array = [];
  var colors = [];
  var sizes = [];
  var transparency_factor_array = [];
  var custompercentagearray = [];
  var z_position_array = [];
  var x_position_array = [];
  var y_position_array = [];

  var h_position_array = [];

  var voxel_level_array = [];

  general_config.z_min = null;
  general_config.z_max = null;
  general_config.x_min = null;
  general_config.x_max = null;
  general_config.y_min = null;
  general_config.y_max = null;

  general_config.h_min = null;
  general_config.h_max = null;
  for (var m = 0; m < id_sbl_array.length; m++) {
    for (var j = 0; j < nj; j++) {
      for (var i = 0; i < ni; i++) {
        var index_1 = j * ni + i;

        var id = id_sbl_array[m];
        var temp = parseFloat(MesoNH_O_array[index_1]["teb_" + id]);

        var index_sup_1 = j * ni + i + (id - 1) * ni * nj;
        var index_sup_2 = j * ni + i + id * ni * nj;
        var h =
          general_config.data_volume_3D["limit_teb"][index_sup_1] -
          MesoNH_O_array[index_1].zs +
          (general_config.data_volume_3D["limit_teb"][index_sup_2] -
            general_config.data_volume_3D["limit_teb"][index_sup_1]) /
            2;
        var h_w =
          general_config.data_volume_3D["limit_teb"][index_sup_1] -
          MesoNH_O_array[index_1].zs;

        tab_temp.push(temp);
        var x_o = MesoNH_O_array[index_1].x - general_config.Coord_X_paris;
        var y_o = MesoNH_O_array[index_1].y - general_config.Coord_Y_paris;
        var z_o = MesoNH_O_array[index_1].zs + h;

        var l_x = (MesoNH_O_array[index_1].x - MesoNH_U_array[index_1].x) * 2;
        var l_y = (MesoNH_O_array[index_1].y - MesoNH_V_array[index_1].y) * 2;
        var l_z = (h - h_w) * 2;

        if (general_config.h_min != null && general_config.h_max != null) {
          if (h_w < general_config.h_min) {
            general_config.h_min = h_w;
          }
          if (h_w + l_z > general_config.h_max) {
            general_config.h_max = h_w + l_z;
          }
        } else {
          general_config.h_min = h_w;
          general_config.h_max = h_w + l_z;
        }

        if (general_config.z_min != null && general_config.z_max != null) {
          if (z_o - l_z / 2 < general_config.z_min) {
            general_config.z_min = z_o - l_z / 2;
          }
          if (z_o + l_z / 2 > general_config.z_max) {
            general_config.z_max = z_o + l_z / 2;
          }
        } else {
          general_config.z_min = z_o - l_z / 2;
          general_config.z_max = z_o + l_z / 2;
        }

        if (general_config.x_min != null && general_config.x_max != null) {
          if (x_o - l_x / 2 < general_config.x_min) {
            general_config.x_min = x_o - l_x / 2;
          }
          if (x_o + l_x / 2 > general_config.x_max) {
            general_config.x_max = x_o + l_x / 2;
          }
        } else {
          general_config.x_min = x_o - l_x / 2;
          general_config.x_max = x_o + l_x / 2;
        }

        if (general_config.y_min != null && general_config.y_max != null) {
          if (y_o - l_y / 2 < general_config.y_min) {
            general_config.y_min = y_o - l_y / 2;
          }
          if (y_o + l_y / 2 > general_config.y_max) {
            general_config.y_max = y_o + l_y / 2;
          }
        } else {
          general_config.y_min = y_o - l_y / 2;
          general_config.y_max = y_o + l_y / 2;
        }
      }
    }
  }

  for (var m = 0; m < id_meso_array.length; m++) {
    for (var j = 0; j < nj; j++) {
      for (var i = 0; i < ni; i++) {
        var index_1 = j * ni + i;

        var id = id_meso_array[m];
        var temp = parseFloat(MesoNH_O_array[index_1]["tht_" + id]);

        var index_sup_1 = j * ni + i + (id - 1) * ni * nj;
        var index_sup_2 = j * ni + i + (id - 0) * ni * nj;
        var h =
          general_config.data_volume_3D["limit_meso"][index_sup_1] +
          (general_config.data_volume_3D["limit_meso"][index_sup_2] -
            general_config.data_volume_3D["limit_meso"][index_sup_1]) /
            2 -
          MesoNH_O_array[index_1].zs;
        var h_w =
          general_config.data_volume_3D["limit_meso"][index_sup_1] -
          MesoNH_O_array[index_1].zs;

        tab_temp.push(temp);

        var x_o = MesoNH_O_array[index_1].x - general_config.Coord_X_paris;
        var y_o = MesoNH_O_array[index_1].y - general_config.Coord_Y_paris;
        var z_o = MesoNH_O_array[index_1].zs + h;

        var l_x = (MesoNH_O_array[index_1].x - MesoNH_U_array[index_1].x) * 2;
        var l_y = (MesoNH_O_array[index_1].y - MesoNH_V_array[index_1].y) * 2;
        var l_z = (h - h_w) * 2;

        if (general_config.h_min != null && general_config.h_max != null) {
          if (h_w < general_config.h_min) {
            general_config.h_min = h_w;
          }
          if (h_w + l_z > general_config.h_max) {
            general_config.h_max = h_w + l_z;
          }
        } else {
          general_config.h_min = h_w;
          general_config.h_max = h_w + l_z;
        }

        if (general_config.z_min != null && general_config.z_max != null) {
          if (z_o - l_z / 2 < general_config.z_min) {
            general_config.z_min = z_o - l_z / 2;
          }
          if (z_o + l_z / 2 > general_config.z_max) {
            general_config.z_max = z_o + l_z / 2;
          }
        } else {
          general_config.z_min = z_o - l_z / 2;
          general_config.z_max = z_o + l_z / 2;
        }

        if (general_config.x_min != null && general_config.x_max != null) {
          if (x_o - l_x / 2 < general_config.x_min) {
            general_config.x_min = x_o - l_x / 2;
          }
          if (x_o + l_x / 2 > general_config.x_max) {
            general_config.x_max = x_o + l_x / 2;
          }
        } else {
          general_config.x_min = x_o - l_x / 2;
          general_config.x_max = x_o + l_x / 2;
        }

        if (general_config.y_min != null && general_config.y_max != null) {
          if (y_o - l_y / 2 < general_config.y_min) {
            general_config.y_min = y_o - l_y / 2;
          }
          if (y_o + l_y / 2 > general_config.y_max) {
            general_config.y_max = y_o + l_y / 2;
          }
        } else {
          general_config.y_min = y_o - l_y / 2;
          general_config.y_max = y_o + l_y / 2;
        }
      }
    }
  }

  tab_temp.sort((a, b) => a - b);

  for (var m = 0; m < id_sbl_array.length; m++) {
    for (var j = 0; j < nj; j++) {
      for (var i = 0; i < ni; i++) {
        var index_1 = j * ni + i;
        var id = id_sbl_array[m];
        var temp = parseFloat(MesoNH_O_array[index_1]["teb_" + id]);

        var index_sup_1 = j * ni + i + (id - 1) * ni * nj;
        var index_sup_2 = j * ni + i + id * ni * nj;
        var h =
          general_config.data_volume_3D["limit_teb"][index_sup_1] -
          MesoNH_O_array[index_1].zs +
          (general_config.data_volume_3D["limit_teb"][index_sup_2] -
            general_config.data_volume_3D["limit_teb"][index_sup_1]) /
            2;
        var h_w =
          general_config.data_volume_3D["limit_teb"][index_sup_1] -
          MesoNH_O_array[index_1].zs;

        var x_u = MesoNH_U_array[index_1].x - general_config.Coord_X_paris;
        var y_u = MesoNH_U_array[index_1].y - general_config.Coord_Y_paris;
        var z_u = MesoNH_U_array[index_1].zs + h;

        var x_v = MesoNH_V_array[index_1].x - general_config.Coord_X_paris;
        var y_v = MesoNH_V_array[index_1].y - general_config.Coord_Y_paris;
        var z_v = MesoNH_V_array[index_1].zs + h;

        var z_o = MesoNH_O_array[index_1].zs + h;

        var l_x = (MesoNH_O_array[index_1].x - MesoNH_U_array[index_1].x) * 2;
        var l_y = (MesoNH_O_array[index_1].y - MesoNH_V_array[index_1].y) * 2;
        var l_z = (h - h_w) * 2;

        var tmin = temperature_scale[0];
        var tmax = temperature_scale[1];
        var percentage_color;
        if (general_config.active_color_control == 0) {
          percentage_color = 0.5;
        } else if (general_config.active_color_control == 1) {
          percentage_color = (temp - tmin) / (tmax - tmin);
        } else if (general_config.active_color_control == 2) {
          percentage_color = (temp - 297.92) / (300.8 - 297.92);
        }
        if (percentage_color < 0) {
          percentage_color = 0;
        } else if (percentage_color > 1) {
          percentage_color = 1;
        }

        general_config.temp_values.push(temp);

        var size;
        var basic_size = 10000;

        if (general_config.relative_size_factor < 1) {
          var add_factor = 1 - general_config.relative_size_factor;
          if (percentage_color < 0.5) {
            size = parseInt(
              basic_size +
                basic_size * add_factor * (0.5 - percentage_color) * 2
            );
          } else if (percentage_color == 0.5) {
            size = basic_size;
          } else if (percentage_color > 0.5) {
            size = parseInt(
              basic_size -
                basic_size * add_factor * (percentage_color - 0.5) * 2
            );
          }
        } else if (general_config.relative_size_factor == 1) {
          size = basic_size;
        } else if (general_config.relative_size_factor > 1) {
          var add_factor = general_config.relative_size_factor - 1;
          if (percentage_color < 0.5) {
            size = parseInt(
              basic_size -
                basic_size * add_factor * (0.5 - percentage_color) * 2
            );
          } else if (percentage_color == 0.5) {
            size = basic_size;
          } else if (percentage_color > 0.5) {
            size = parseInt(
              basic_size +
                basic_size * add_factor * (percentage_color - 0.5) * 2
            );
          }
        }

        var number_points_offset_x = l_x / number_points;
        var number_points_offset_y = l_y / number_points;

        for (var a = 0; a < number_points; a++) {
          for (var b = 0; b < number_points; b++) {
            var pX = x_u + a * number_points_offset_x;
            var pY = y_v + b * number_points_offset_y;
            var pZ = z_o;
            coord_array.push(pX * general_config.cst_X);
            coord_array.push(pZ * general_config.cst_Z);
            coord_array.push(-pY * general_config.cst_Y);

            sizes.push(size);
            transparency_factor_array.push(general_config.points_transparency);
            custompercentagearray.push(percentage_color * 2 * Math.PI);
            z_position_array.push(
              (pZ - general_config.z_min) /
                (general_config.z_max - general_config.z_min)
            );
            x_position_array.push(
              (pX - general_config.x_min) /
                (general_config.x_max - general_config.x_min)
            );
            y_position_array.push(
              (pY - general_config.y_min) /
                (general_config.y_max - general_config.y_min)
            );
            h_position_array.push(
              (pZ - MesoNH_O_array[index_1].zs - general_config.h_min) /
                (general_config.h_max - general_config.h_min)
            );
            voxel_level_array.push(id);
          }
        }
      }
    }
  }

  for (var m = 0; m < id_meso_array.length; m++) {
    for (var j = 0; j < nj; j++) {
      for (var i = 0; i < ni; i++) {
        var index_1 = j * ni + i;

        var id = id_meso_array[m];
        var temp = parseFloat(MesoNH_O_array[index_1]["tht_" + id]);

        var index_sup_1 = j * ni + i + (id - 1) * ni * nj;
        var index_sup_2 = j * ni + i + (id - 0) * ni * nj;
        var h =
          general_config.data_volume_3D["limit_meso"][index_sup_1] +
          (general_config.data_volume_3D["limit_meso"][index_sup_2] -
            general_config.data_volume_3D["limit_meso"][index_sup_1]) /
            2 -
          MesoNH_O_array[index_1].zs;
        var h_w =
          general_config.data_volume_3D["limit_meso"][index_sup_1] -
          MesoNH_O_array[index_1].zs;

        var x_u = MesoNH_U_array[index_1].x - general_config.Coord_X_paris;
        var y_u = MesoNH_U_array[index_1].y - general_config.Coord_Y_paris;
        var z_u = MesoNH_U_array[index_1].zs + h;

        var x_v = MesoNH_V_array[index_1].x - general_config.Coord_X_paris;
        var y_v = MesoNH_V_array[index_1].y - general_config.Coord_Y_paris;
        var z_v = MesoNH_V_array[index_1].zs + h;

        var z_o = MesoNH_O_array[index_1].zs + h;

        var l_x = (MesoNH_O_array[index_1].x - MesoNH_U_array[index_1].x) * 2;
        var l_y = (MesoNH_O_array[index_1].y - MesoNH_V_array[index_1].y) * 2;
        var l_z = (h - h_w) * 2;

        var tmin = temperature_scale[0];
        var tmax = temperature_scale[1];
        var percentage_color;
        if (general_config.active_color_control == 0) {
          percentage_color = 0.5;
        } else if (general_config.active_color_control == 1) {
          percentage_color = (temp - tmin) / (tmax - tmin);
        } else if (general_config.active_color_control == 2) {
          percentage_color = (temp - 297.92) / (300.8 - 297.92);
        }
        if (percentage_color < 0) {
          percentage_color = 0;
        } else if (percentage_color > 1) {
          percentage_color = 1;
        }

        general_config.temp_values.push(temp);

        var size;
        var basic_size = 10000;

        if (general_config.relative_size_factor < 1) {
          var add_factor = 1 - general_config.relative_size_factor;
          if (percentage_color < 0.5) {
            size = parseInt(
              basic_size +
                basic_size * add_factor * (0.5 - percentage_color) * 2
            );
          } else if (percentage_color == 0.5) {
            size = basic_size;
          } else if (percentage_color > 0.5) {
            size = parseInt(
              basic_size -
                basic_size * add_factor * (percentage_color - 0.5) * 2
            );
          }
        } else if (general_config.relative_size_factor == 1) {
          size = basic_size;
        } else if (general_config.relative_size_factor > 1) {
          var add_factor = general_config.relative_size_factor - 1;
          if (percentage_color < 0.5) {
            size = parseInt(
              basic_size -
                basic_size * add_factor * (0.5 - percentage_color) * 2
            );
          } else if (percentage_color == 0.5) {
            size = basic_size;
          } else if (percentage_color > 0.5) {
            size = parseInt(
              basic_size +
                basic_size * add_factor * (percentage_color - 0.5) * 2
            );
          }
        }

        var number_points_offset_x = l_x / number_points;
        var number_points_offset_y = l_y / number_points;

        for (var a = 0; a < number_points; a++) {
          for (var b = 0; b < number_points; b++) {
            var pX = x_u + a * number_points_offset_x;
            var pY = y_v + b * number_points_offset_y;
            var pZ = z_o;
            coord_array.push(pX * general_config.cst_X);
            coord_array.push(pZ * general_config.cst_Z);
            coord_array.push(-pY * general_config.cst_Y);

            sizes.push(size);
            transparency_factor_array.push(general_config.points_transparency);
            custompercentagearray.push(percentage_color * 2 * Math.PI);
            z_position_array.push(
              (pZ - general_config.z_min) /
                (general_config.z_max - general_config.z_min)
            );
            x_position_array.push(
              (pX - general_config.x_min) /
                (general_config.x_max - general_config.x_min)
            );
            y_position_array.push(
              (pY - general_config.y_min) /
                (general_config.y_max - general_config.y_min)
            );
            h_position_array.push(
              (pZ - MesoNH_O_array[index_1].zs - general_config.h_min) /
                (general_config.h_max - general_config.h_min)
            );
            voxel_level_array.push(parseInt(id) + 5);
          }
        }
      }
    }
  }

  var coord_array_32 = new Float32Array(coord_array);
  var colors_32 = new Float32Array(colors);
  var sizes_32 = new Float32Array(sizes);
  var transparency_factor_32 = new Float32Array(transparency_factor_array);
  var custompercentage_32 = new Float32Array(custompercentagearray);
  var z_position_array_32 = new Float32Array(z_position_array);
  var x_position_array_32 = new Float32Array(x_position_array);
  var y_position_array_32 = new Float32Array(y_position_array);
  var h_position_array_32 = new Float32Array(h_position_array);

  var voxel_level_array_32 = new Float32Array(voxel_level_array);

  var bufferGeometry = new THREE.BufferGeometry();

  bufferGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(coord_array_32, 3)
  );

  bufferGeometry.setAttribute(
    "customsize",
    new THREE.BufferAttribute(sizes_32, 1)
  );
  bufferGeometry.setAttribute(
    "customtransparency",
    new THREE.BufferAttribute(transparency_factor_32, 1)
  );
  bufferGeometry.setAttribute(
    "custompercentage",
    new THREE.BufferAttribute(custompercentage_32, 1)
  );
  bufferGeometry.setAttribute(
    "z_position",
    new THREE.BufferAttribute(z_position_array_32, 1)
  );
  bufferGeometry.setAttribute(
    "x_position",
    new THREE.BufferAttribute(x_position_array_32, 1)
  );
  bufferGeometry.setAttribute(
    "y_position",
    new THREE.BufferAttribute(y_position_array_32, 1)
  );
  bufferGeometry.setAttribute(
    "h_position",
    new THREE.BufferAttribute(h_position_array_32, 1)
  );
  bufferGeometry.setAttribute(
    "voxel_level",
    new THREE.BufferAttribute(voxel_level_array_32, 1)
  );

  let material = activate_animation();

  var point = new THREE.Points(bufferGeometry, material);

  //create_temp_histogram();	 <==== je déplace ds showPointsPlanes

  grid.add(point);
  scene.add(grid);
}

export function create_regular_points_cloud(
  MesoNH_O_array,
  MesoNH_U_array,
  MesoNH_V_array,
  grid,
  id_sbl_array,
  id_meso_array,
  temperature_scale,
  THAT,
  THAT_W,
  HCanopy,
  HCanopy_w
) {
  /*
		creation des nuages de points 3D réguliers
	*/

  general_config.temp_values = [];
  var ni = general_config.data_ni,
    nj = general_config.data_nj;
  let tab_temp = [];
  var coord_array = [];
  var colors = [];
  var sizes = [];
  var transparency_factor_array = [];
  var custompercentagearray = [];
  var z_position_array = [];
  var x_position_array = [];
  var y_position_array = [];

  var h_position_array = [];

  var voxel_level_array = [];

  general_config.z_min = null;
  general_config.z_max = null;
  general_config.x_min = null;
  general_config.x_max = null;
  general_config.y_min = null;
  general_config.y_max = null;

  general_config.h_min = null;
  general_config.h_max = null;

  for (var m = 0; m < id_sbl_array.length; m++) {
    for (var j = 0; j < nj; j++) {
      for (var i = 0; i < ni; i++) {
        var index_1 = j * ni + i;

        var id = id_sbl_array[m];
        var temp = parseFloat(MesoNH_O_array[index_1]["teb_" + id]);

        var index_sup_1 = j * ni + i + (id - 1) * ni * nj;
        var index_sup_2 = j * ni + i + id * ni * nj;
        var h =
          general_config.data_volume_3D["limit_teb"][index_sup_1] -
          MesoNH_O_array[index_1].zs +
          (general_config.data_volume_3D["limit_teb"][index_sup_2] -
            general_config.data_volume_3D["limit_teb"][index_sup_1]) /
            2;
        var h_w =
          general_config.data_volume_3D["limit_teb"][index_sup_1] -
          MesoNH_O_array[index_1].zs;

        tab_temp.push(temp);
        var x_o = MesoNH_O_array[index_1].x - general_config.Coord_X_paris;
        var y_o = MesoNH_O_array[index_1].y - general_config.Coord_Y_paris;
        var z_o = MesoNH_O_array[index_1].zs + h;

        var l_x = (MesoNH_O_array[index_1].x - MesoNH_U_array[index_1].x) * 2;
        var l_y = (MesoNH_O_array[index_1].y - MesoNH_V_array[index_1].y) * 2;
        var l_z = (h - h_w) * 2;

        if (general_config.h_min != null && general_config.h_max != null) {
          if (h_w < general_config.h_min) {
            general_config.h_min = h_w;
          }
          if (h_w + l_z > general_config.h_max) {
            general_config.h_max = h_w + l_z;
          }
        } else {
          general_config.h_min = h_w;
          general_config.h_max = h_w + l_z;
        }

        if (general_config.z_min != null && general_config.z_max != null) {
          if (z_o - l_z / 2 < general_config.z_min) {
            general_config.z_min = z_o - l_z / 2;
          }
          if (z_o + l_z / 2 > general_config.z_max) {
            general_config.z_max = z_o + l_z / 2;
          }
        } else {
          general_config.z_min = z_o - l_z / 2;
          general_config.z_max = z_o + l_z / 2;
        }

        if (general_config.x_min != null && general_config.x_max != null) {
          if (x_o - l_x / 2 < general_config.x_min) {
            general_config.x_min = x_o - l_x / 2;
          }
          if (x_o + l_x / 2 > general_config.x_max) {
            general_config.x_max = x_o + l_x / 2;
          }
        } else {
          general_config.x_min = x_o - l_x / 2;
          general_config.x_max = x_o + l_x / 2;
        }

        if (general_config.y_min != null && general_config.y_max != null) {
          if (y_o - l_y / 2 < general_config.y_min) {
            general_config.y_min = y_o - l_y / 2;
          }
          if (y_o + l_y / 2 > general_config.y_max) {
            general_config.y_max = y_o + l_y / 2;
          }
        } else {
          general_config.y_min = y_o - l_y / 2;
          general_config.y_max = y_o + l_y / 2;
        }
      }
    }
  }

  for (var m = 0; m < id_meso_array.length; m++) {
    for (var j = 0; j < nj; j++) {
      for (var i = 0; i < ni; i++) {
        var index_1 = j * ni + i;
        var id = id_meso_array[m];
        var temp = parseFloat(MesoNH_O_array[index_1]["tht_" + id]);

        var index_sup_1 = j * ni + i + (id - 1) * ni * nj;
        var index_sup_2 = j * ni + i + (id - 0) * ni * nj;
        var h =
          general_config.data_volume_3D["limit_meso"][index_sup_1] +
          (general_config.data_volume_3D["limit_meso"][index_sup_2] -
            general_config.data_volume_3D["limit_meso"][index_sup_1]) /
            2 -
          MesoNH_O_array[index_1].zs;
        var h_w =
          general_config.data_volume_3D["limit_meso"][index_sup_1] -
          MesoNH_O_array[index_1].zs;

        tab_temp.push(temp);

        var x_o = MesoNH_O_array[index_1].x - general_config.Coord_X_paris;
        var y_o = MesoNH_O_array[index_1].y - general_config.Coord_Y_paris;
        var z_o = MesoNH_O_array[index_1].zs + h;

        var l_x = (MesoNH_O_array[index_1].x - MesoNH_U_array[index_1].x) * 2;
        var l_y = (MesoNH_O_array[index_1].y - MesoNH_V_array[index_1].y) * 2;
        var l_z = (h - h_w) * 2;

        if (general_config.h_min != null && general_config.h_max != null) {
          if (h_w < general_config.h_min) {
            general_config.h_min = h_w;
          }
          if (h_w + l_z > general_config.h_max) {
            general_config.h_max = h_w + l_z;
          }
        } else {
          general_config.h_min = h_w;
          general_config.h_max = h_w + l_z;
        }

        if (general_config.z_min != null && general_config.z_max != null) {
          if (z_o - l_z / 2 < general_config.z_min) {
            general_config.z_min = z_o - l_z / 2;
          }
          if (z_o + l_z / 2 > general_config.z_max) {
            general_config.z_max = z_o + l_z / 2;
          }
        } else {
          general_config.z_min = z_o - l_z / 2;
          general_config.z_max = z_o + l_z / 2;
        }

        if (general_config.x_min != null && general_config.x_max != null) {
          if (x_o - l_x / 2 < general_config.x_min) {
            general_config.x_min = x_o - l_x / 2;
          }
          if (x_o + l_x / 2 > general_config.x_max) {
            general_config.x_max = x_o + l_x / 2;
          }
        } else {
          general_config.x_min = x_o - l_x / 2;
          general_config.x_max = x_o + l_x / 2;
        }

        if (general_config.y_min != null && general_config.y_max != null) {
          if (y_o - l_y / 2 < general_config.y_min) {
            general_config.y_min = y_o - l_y / 2;
          }
          if (y_o + l_y / 2 > general_config.y_max) {
            general_config.y_max = y_o + l_y / 2;
          }
        } else {
          general_config.y_min = y_o - l_y / 2;
          general_config.y_max = y_o + l_y / 2;
        }
      }
    }
  }

  tab_temp.sort((a, b) => a - b);

  for (var m = 0; m < id_sbl_array.length; m++) {
    for (var j = 0; j < nj; j++) {
      for (var i = 0; i < ni; i++) {
        var index_1 = j * ni + i;

        var id = id_sbl_array[m];
        var temp = parseFloat(MesoNH_O_array[index_1]["teb_" + id]);

        var index_sup_1 = j * ni + i + (id - 1) * ni * nj;
        var index_sup_2 = j * ni + i + id * ni * nj;
        var h =
          general_config.data_volume_3D["limit_teb"][index_sup_1] -
          MesoNH_O_array[index_1].zs +
          (general_config.data_volume_3D["limit_teb"][index_sup_2] -
            general_config.data_volume_3D["limit_teb"][index_sup_1]) /
            2;
        var h_w =
          general_config.data_volume_3D["limit_teb"][index_sup_1] -
          MesoNH_O_array[index_1].zs;

        var x_o = MesoNH_O_array[index_1].x - general_config.Coord_X_paris;
        var y_o = MesoNH_O_array[index_1].y - general_config.Coord_Y_paris;
        var z_o = MesoNH_O_array[index_1].zs + h;

        var l_x = (MesoNH_O_array[index_1].x - MesoNH_U_array[index_1].x) * 2;
        var l_y = (MesoNH_O_array[index_1].y - MesoNH_V_array[index_1].y) * 2;
        var l_z = (h - h_w) * 2;

        var tmin = temperature_scale[0];
        var tmax = temperature_scale[1];

        var percentage_color;
        if (general_config.active_color_control == 0) {
          percentage_color = 0.5;
        } else if (general_config.active_color_control == 1) {
          percentage_color = (temp - tmin) / (tmax - tmin);
        } else if (general_config.active_color_control == 2) {
          percentage_color = (temp - 297.92) / (300.8 - 297.92);
        }
        if (percentage_color < 0) {
          percentage_color = 0;
        } else if (percentage_color > 1) {
          percentage_color = 1;
        }

        general_config.temp_values.push(temp);

        var cell_volume = l_x * l_y * l_z;

        var relative_density;

        if (general_config.relative_density_factor < 1) {
          var add_factor = 1 - general_config.relative_density_factor;
          if (percentage_color < 0.5) {
            relative_density =
              general_config.particle_density +
              general_config.particle_density *
                add_factor *
                (0.5 - percentage_color) *
                2;
          } else if (percentage_color == 0.5) {
            relative_density = general_config.particle_density;
          } else if (percentage_color > 0.5) {
            relative_density =
              general_config.particle_density -
              general_config.particle_density *
                add_factor *
                (percentage_color - 0.5) *
                2;
          }
        } else if (general_config.relative_density_factor == 1) {
          relative_density = general_config.particle_density;
        } else if (general_config.relative_density_factor > 1) {
          var add_factor = general_config.relative_density_factor - 1;
          if (percentage_color < 0.5) {
            relative_density =
              general_config.particle_density -
              general_config.particle_density *
                add_factor *
                (0.5 - percentage_color) *
                2;
          } else if (percentage_color == 0.5) {
            relative_density = general_config.particle_density;
          } else if (percentage_color > 0.5) {
            relative_density =
              general_config.particle_density +
              general_config.particle_density *
                add_factor *
                (percentage_color - 0.5) *
                2;
          }
        }

        var size;
        var basic_size = 10000;

        if (general_config.relative_size_factor < 1) {
          var add_factor = 1 - general_config.relative_size_factor;
          if (percentage_color < 0.5) {
            size = parseInt(
              basic_size +
                basic_size * add_factor * (0.5 - percentage_color) * 2
            );
          } else if (percentage_color == 0.5) {
            size = basic_size;
          } else if (percentage_color > 0.5) {
            size = parseInt(
              basic_size -
                basic_size * add_factor * (percentage_color - 0.5) * 2
            );
          }
        } else if (general_config.relative_size_factor == 1) {
          size = basic_size;
        } else if (general_config.relative_size_factor > 1) {
          var add_factor = general_config.relative_size_factor - 1;
          if (percentage_color < 0.5) {
            size = parseInt(
              basic_size -
                basic_size * add_factor * (0.5 - percentage_color) * 2
            );
          } else if (percentage_color == 0.5) {
            size = basic_size;
          } else if (percentage_color > 0.5) {
            size = parseInt(
              basic_size +
                basic_size * add_factor * (percentage_color - 0.5) * 2
            );
          }
        }

        var particle_length_XY = parseInt(relative_density * l_x * l_y);
        if (particle_length_XY < 1) {
          particle_length_XY = 1;
        }

        var particle_length_X = parseInt(Math.sqrt(particle_length_XY));

        var offset_x = l_x / (particle_length_X + 1);

        var number_particule_x = particle_length_X;
        var number_particule_y = particle_length_X;
        var number_particule_z =
          parseInt(
            (l_z * general_config.cst_Z) / (offset_x * general_config.cst_X)
          ) - 1;

        if (number_particule_x < 1) {
          number_particule_x = 1;
        }
        if (number_particule_y < 1) {
          number_particule_y = 1;
        }
        if (number_particule_z < 1) {
          number_particule_z = 1;
        }

        var offset_z = l_z / (number_particule_z + 1);
        var counter = 0;
        for (var a = 0; a < number_particule_x; a++) {
          for (var b = 0; b < number_particule_y; b++) {
            for (var c = 0; c < number_particule_z; c++) {
              var pX;
              var pY;
              var pZ;
              if (number_particule_x == 1) {
                pX = x_o - l_x / 2 + (a + 1) * offset_x;
              } else {
                if (a == 0) {
                  pX = x_o - l_x / 2 + 0.5 * offset_x;
                } else if (c == number_particule_x - 1) {
                  pX = x_o - l_x / 2 + (number_particule_x + 0.5) * offset_x;
                } else {
                  pX = x_o - l_x / 2 + (a + 1) * offset_x;
                }
              }

              if (number_particule_y == 1) {
                pY = y_o - l_y / 2 + (b + 1) * offset_x;
              } else {
                if (b == 0) {
                  pY = y_o - l_y / 2 + 0.5 * offset_x;
                } else if (c == number_particule_y - 1) {
                  pY = y_o - l_y / 2 + (number_particule_y + 0.5) * offset_x;
                } else {
                  pY = y_o - l_y / 2 + (b + 1) * offset_x;
                }
              }

              if (number_particule_z == 1) {
                pZ = z_o - l_z / 2 + (c + 1) * offset_z;
              } else {
                if (c == 0) {
                  pZ = z_o - l_z / 2 + 0.5 * offset_z;
                } else if (c == number_particule_z - 1) {
                  pZ = z_o - l_z / 2 + (number_particule_z + 0.5) * offset_z;
                } else {
                  pZ = z_o - l_z / 2 + (c + 1) * offset_z;
                }
              }

              coord_array.push(pX * general_config.cst_X);
              coord_array.push(pZ * general_config.cst_Z);
              coord_array.push(-pY * general_config.cst_Y);

              sizes.push(size);
              transparency_factor_array.push(
                general_config.points_transparency
              );
              custompercentagearray.push(percentage_color * 2 * Math.PI);
              z_position_array.push(
                (pZ - general_config.z_min) /
                  (general_config.z_max - general_config.z_min)
              );
              x_position_array.push(
                (pX - general_config.x_min) /
                  (general_config.x_max - general_config.x_min)
              );
              y_position_array.push(
                (pY - general_config.y_min) /
                  (general_config.y_max - general_config.y_min)
              );
              h_position_array.push(
                (pZ - MesoNH_O_array[index_1].zs - general_config.h_min) /
                  (general_config.h_max - general_config.h_min)
              );
              voxel_level_array.push(id);
            }
          }
        }
      }
    }
  }
  for (var m = 0; m < id_meso_array.length; m++) {
    for (var j = 0; j < nj; j++) {
      for (var i = 0; i < ni; i++) {
        var index_1 = j * ni + i;

        var id = id_meso_array[m];
        var temp = parseFloat(MesoNH_O_array[index_1]["tht_" + id]);

        var index_sup_1 = j * ni + i + (id - 1) * ni * nj;
        var index_sup_2 = j * ni + i + (id - 0) * ni * nj;
        var h =
          general_config.data_volume_3D["limit_meso"][index_sup_1] +
          (general_config.data_volume_3D["limit_meso"][index_sup_2] -
            general_config.data_volume_3D["limit_meso"][index_sup_1]) /
            2 -
          MesoNH_O_array[index_1].zs;
        var h_w =
          general_config.data_volume_3D["limit_meso"][index_sup_1] -
          MesoNH_O_array[index_1].zs;

        var x_o = MesoNH_O_array[index_1].x - general_config.Coord_X_paris;
        var y_o = MesoNH_O_array[index_1].y - general_config.Coord_Y_paris;
        var z_o = MesoNH_O_array[index_1].zs + h;

        var l_x = (MesoNH_O_array[index_1].x - MesoNH_U_array[index_1].x) * 2;
        var l_y = (MesoNH_O_array[index_1].y - MesoNH_V_array[index_1].y) * 2;
        var l_z = (h - h_w) * 2;

        var tmin = temperature_scale[0];
        var tmax = temperature_scale[1];
        var percentage_color;
        if (general_config.active_color_control == 0) {
          percentage_color = 0.5;
        } else if (general_config.active_color_control == 1) {
          percentage_color = (temp - tmin) / (tmax - tmin);
        } else if (general_config.active_color_control == 2) {
          percentage_color = (temp - 297.92) / (300.8 - 297.92);
        }
        if (percentage_color < 0) {
          percentage_color = 0;
        } else if (percentage_color > 1) {
          percentage_color = 1;
        }

        general_config.temp_values.push(temp);

        var cell_volume = l_x * l_y * l_z;

        var relative_density;

        if (general_config.relative_density_factor < 1) {
          var add_factor = 1 - general_config.relative_density_factor;
          if (percentage_color < 0.5) {
            relative_density =
              general_config.particle_density +
              general_config.particle_density *
                add_factor *
                (0.5 - percentage_color) *
                2;
          } else if (percentage_color == 0.5) {
            relative_density = general_config.particle_density;
          } else if (percentage_color > 0.5) {
            relative_density =
              general_config.particle_density -
              general_config.particle_density *
                add_factor *
                (percentage_color - 0.5) *
                2;
          }
        } else if (general_config.relative_density_factor == 1) {
          relative_density = general_config.particle_density;
        } else if (general_config.relative_density_factor > 1) {
          var add_factor = general_config.relative_density_factor - 1;
          if (percentage_color < 0.5) {
            relative_density =
              general_config.particle_density -
              general_config.particle_density *
                add_factor *
                (0.5 - percentage_color) *
                2;
          } else if (percentage_color == 0.5) {
            relative_density = general_config.particle_density;
          } else if (percentage_color > 0.5) {
            relative_density =
              general_config.particle_density +
              general_config.particle_density *
                add_factor *
                (percentage_color - 0.5) *
                2;
          }
        }

        var size;
        var basic_size = 10000;

        if (general_config.relative_size_factor < 1) {
          var add_factor = 1 - general_config.relative_size_factor;
          if (percentage_color < 0.5) {
            size = parseInt(
              basic_size +
                basic_size * add_factor * (0.5 - percentage_color) * 2
            );
          } else if (percentage_color == 0.5) {
            size = basic_size;
          } else if (percentage_color > 0.5) {
            size = parseInt(
              basic_size -
                basic_size * add_factor * (percentage_color - 0.5) * 2
            );
          }
        } else if (general_config.relative_size_factor == 1) {
          size = basic_size;
        } else if (general_config.relative_size_factor > 1) {
          var add_factor = general_config.relative_size_factor - 1;
          if (percentage_color < 0.5) {
            size = parseInt(
              basic_size -
                basic_size * add_factor * (0.5 - percentage_color) * 2
            );
          } else if (percentage_color == 0.5) {
            size = basic_size;
          } else if (percentage_color > 0.5) {
            size = parseInt(
              basic_size +
                basic_size * add_factor * (percentage_color - 0.5) * 2
            );
          }
        }

        var particle_length_XY = parseInt(relative_density * l_x * l_y);
        if (particle_length_XY < 1) {
          particle_length_XY = 1;
        }

        var particle_length_X = parseInt(Math.sqrt(particle_length_XY));

        var offset_x = l_x / (particle_length_X + 1);

        var number_particule_x = particle_length_X;
        var number_particule_y = particle_length_X;
        var number_particule_z =
          parseInt(
            (l_z * general_config.cst_Z) / (offset_x * general_config.cst_X)
          ) - 1;

        if (number_particule_x < 1) {
          number_particule_x = 1;
        }
        if (number_particule_y < 1) {
          number_particule_y = 1;
        }
        if (number_particule_z < 1) {
          number_particule_z = 1;
        }

        var offset_z = l_z / (number_particule_z + 1);
        var counter = 0;
        for (var a = 0; a < number_particule_x; a++) {
          for (var b = 0; b < number_particule_y; b++) {
            for (var c = 0; c < number_particule_z; c++) {
              var pX;
              var pY;
              var pZ;
              if (number_particule_x == 1) {
                pX = x_o - l_x / 2 + (a + 1) * offset_x;
              } else {
                if (a == 0) {
                  pX = x_o - l_x / 2 + 0.5 * offset_x;
                } else if (c == number_particule_x - 1) {
                  pX = x_o - l_x / 2 + (number_particule_x + 0.5) * offset_x;
                } else {
                  pX = x_o - l_x / 2 + (a + 1) * offset_x;
                }
              }

              if (number_particule_y == 1) {
                pY = y_o - l_y / 2 + (b + 1) * offset_x;
              } else {
                if (b == 0) {
                  pY = y_o - l_y / 2 + 0.5 * offset_x;
                } else if (c == number_particule_y - 1) {
                  pY = y_o - l_y / 2 + (number_particule_y + 0.5) * offset_x;
                } else {
                  pY = y_o - l_y / 2 + (b + 1) * offset_x;
                }
              }

              if (number_particule_z == 1) {
                pZ = z_o - l_z / 2 + (c + 1) * offset_z;
              } else {
                if (c == 0) {
                  pZ = z_o - l_z / 2 + 0.5 * offset_z;
                } else if (c == number_particule_z - 1) {
                  pZ = z_o - l_z / 2 + (number_particule_z + 0.5) * offset_z;
                } else {
                  pZ = z_o - l_z / 2 + (c + 1) * offset_z;
                }
              }
              coord_array.push(pX * general_config.cst_X);
              coord_array.push(pZ * general_config.cst_Z);
              coord_array.push(-pY * general_config.cst_Y);

              sizes.push(size);
              transparency_factor_array.push(
                general_config.points_transparency
              );
              custompercentagearray.push(percentage_color * 2 * Math.PI);
              z_position_array.push(
                (pZ - general_config.z_min) /
                  (general_config.z_max - general_config.z_min)
              );
              x_position_array.push(
                (pX - general_config.x_min) /
                  (general_config.x_max - general_config.x_min)
              );
              y_position_array.push(
                (pY - general_config.y_min) /
                  (general_config.y_max - general_config.y_min)
              );
              h_position_array.push(
                (pZ - MesoNH_O_array[index_1].zs - general_config.h_min) /
                  (general_config.h_max - general_config.h_min)
              );
              voxel_level_array.push(parseInt(id) + 5);
            }
          }
        }
      }
    }
  }

  var coord_array_32 = new Float32Array(coord_array);
  var colors_32 = new Float32Array(colors);
  var sizes_32 = new Float32Array(sizes);
  var transparency_factor_32 = new Float32Array(transparency_factor_array);
  var custompercentage_32 = new Float32Array(custompercentagearray);
  var z_position_array_32 = new Float32Array(z_position_array);
  var x_position_array_32 = new Float32Array(x_position_array);
  var y_position_array_32 = new Float32Array(y_position_array);
  var h_position_array_32 = new Float32Array(h_position_array);
  var voxel_level_array_32 = new Float32Array(voxel_level_array);

  var bufferGeometry = new THREE.BufferGeometry();

  bufferGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(coord_array_32, 3)
  );

  bufferGeometry.setAttribute(
    "customsize",
    new THREE.BufferAttribute(sizes_32, 1)
  );
  bufferGeometry.setAttribute(
    "customtransparency",
    new THREE.BufferAttribute(transparency_factor_32, 1)
  );
  bufferGeometry.setAttribute(
    "custompercentage",
    new THREE.BufferAttribute(custompercentage_32, 1)
  );
  bufferGeometry.setAttribute(
    "z_position",
    new THREE.BufferAttribute(z_position_array_32, 1)
  );
  bufferGeometry.setAttribute(
    "x_position",
    new THREE.BufferAttribute(x_position_array_32, 1)
  );
  bufferGeometry.setAttribute(
    "y_position",
    new THREE.BufferAttribute(y_position_array_32, 1)
  );
  bufferGeometry.setAttribute(
    "h_position",
    new THREE.BufferAttribute(h_position_array_32, 1)
  );
  bufferGeometry.setAttribute(
    "voxel_level",
    new THREE.BufferAttribute(voxel_level_array_32, 1)
  );

  let material = activate_animation();

  var point = new THREE.Points(bufferGeometry, material);

  grid.add(point);
  scene.add(grid);
}

export function render() {
  requestAnimationFrame(render);
  if (general_config.grid != null && general_config.is_animated == true) {
    general_config.grid.children[0].material.uniforms.u_time.value +=
      general_config.animation_speed_factor;
  }
  controls.update();

  renderer.render(scene, camera);
}

export function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

export function approximateColor1ToColor2ByPercent(color1, color2, percent) {
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

export function generateHex(r, g, b) {
  r = r.toString(16);
  g = g.toString(16);
  b = b.toString(16);

  while (r.length < 2) {
    r = "0" + r;
  }
  while (g.length < 2) {
    g = "0" + g;
  }
  while (b.length < 2) {
    b = "0" + b;
  }

  return "#" + r + g + b;
}

export function mix(start, end, percent) {
  return start + percent * (end - start);
}

export function create_squeletton(
  MesoNH_O_array,
  MesoNH_U_array,
  MesoNH_V_array,
  grid,
  id_sbl_array,
  id_meso_array,
  temperature_scale,
  THAT,
  THAT_W,
  HCanopy,
  HCanopy_w
) {
  general_config.temp_values = [];
  var ni = general_config.data_ni,
    nj = general_config.data_nj;
  let tab_temp = [];
  var coord_array = [];
  var colors = [];
  var sizes = [];
  var transparency_factor_array = [];
  var custompercentagearray = [];
  var z_position_array = [];
  var x_position_array = [];
  var y_position_array = [];

  var h_position_array = [];

  var voxel_level_array = [];

  general_config.z_min = null;
  general_config.z_max = null;
  general_config.x_min = null;
  general_config.x_max = null;
  general_config.y_min = null;
  general_config.y_max = null;

  general_config.h_min = null;
  general_config.h_max = null;

  for (var m = 0; m < id_sbl_array.length; m++) {
    for (var j = 0; j < nj; j++) {
      for (var i = 0; i < ni; i++) {
        var index_1 = j * ni + i;

        var id = id_sbl_array[m];
        var temp = parseFloat(MesoNH_O_array[index_1]["teb_" + id]);

        var index_sup_1 = j * ni + i + (id - 1) * ni * nj;
        var index_sup_2 = j * ni + i + id * ni * nj;
        var h =
          general_config.data_volume_3D["limit_teb"][index_sup_1] -
          MesoNH_O_array[index_1].zs +
          (general_config.data_volume_3D["limit_teb"][index_sup_2] -
            general_config.data_volume_3D["limit_teb"][index_sup_1]) /
            2;
        var h_w =
          general_config.data_volume_3D["limit_teb"][index_sup_1] -
          MesoNH_O_array[index_1].zs;

        tab_temp.push(temp);

        var x_o = MesoNH_O_array[index_1].x - general_config.Coord_X_paris;
        var y_o = MesoNH_O_array[index_1].y - general_config.Coord_Y_paris;
        var z_o = MesoNH_O_array[index_1].zs + h;

        var l_x = (MesoNH_O_array[index_1].x - MesoNH_U_array[index_1].x) * 2;
        var l_y = (MesoNH_O_array[index_1].y - MesoNH_V_array[index_1].y) * 2;
        var l_z = (h - h_w) * 2;

        if (general_config.h_min != null && general_config.h_max != null) {
          if (h_w < general_config.h_min) {
            general_config.h_min = h_w;
          }
          if (h_w + l_z > general_config.h_max) {
            general_config.h_max = h_w + l_z;
          }
        } else {
          general_config.h_min = h_w;
          general_config.h_max = h_w + l_z;
        }

        if (general_config.z_min != null && general_config.z_max != null) {
          if (z_o - l_z / 2 < general_config.z_min) {
            general_config.z_min = z_o - l_z / 2;
          }
          if (z_o + l_z / 2 > general_config.z_max) {
            general_config.z_max = z_o + l_z / 2;
          }
        } else {
          general_config.z_min = z_o - l_z / 2;
          general_config.z_max = z_o + l_z / 2;
        }

        if (general_config.x_min != null && general_config.x_max != null) {
          if (x_o - l_x / 2 < general_config.x_min) {
            general_config.x_min = x_o - l_x / 2;
          }
          if (x_o + l_x / 2 > general_config.x_max) {
            general_config.x_max = x_o + l_x / 2;
          }
        } else {
          general_config.x_min = x_o - l_x / 2;
          general_config.x_max = x_o + l_x / 2;
        }

        if (general_config.y_min != null && general_config.y_max != null) {
          if (y_o - l_y / 2 < general_config.y_min) {
            general_config.y_min = y_o - l_y / 2;
          }
          if (y_o + l_y / 2 > general_config.y_max) {
            general_config.y_max = y_o + l_y / 2;
          }
        } else {
          general_config.y_min = y_o - l_y / 2;
          general_config.y_max = y_o + l_y / 2;
        }
      }
    }
  }

  for (var m = 0; m < id_meso_array.length; m++) {
    for (var j = 0; j < nj; j++) {
      for (var i = 0; i < ni; i++) {
        var index_1 = j * ni + i;

        var id = id_meso_array[m];
        var temp = parseFloat(MesoNH_O_array[index_1]["tht_" + id]);

        var index_sup_1 = j * ni + i + (id - 1) * ni * nj;
        var index_sup_2 = j * ni + i + (id - 0) * ni * nj;
        var h =
          general_config.data_volume_3D["limit_meso"][index_sup_1] +
          (general_config.data_volume_3D["limit_meso"][index_sup_2] -
            general_config.data_volume_3D["limit_meso"][index_sup_1]) /
            2 -
          MesoNH_O_array[index_1].zs;
        var h_w =
          general_config.data_volume_3D["limit_meso"][index_sup_1] -
          MesoNH_O_array[index_1].zs;

        tab_temp.push(temp);
        var x_o = MesoNH_O_array[index_1].x - general_config.Coord_X_paris;
        var y_o = MesoNH_O_array[index_1].y - general_config.Coord_Y_paris;
        var z_o = MesoNH_O_array[index_1].zs + h;

        var l_x = (MesoNH_O_array[index_1].x - MesoNH_U_array[index_1].x) * 2;
        var l_y = (MesoNH_O_array[index_1].y - MesoNH_V_array[index_1].y) * 2;
        var l_z = (h - h_w) * 2;

        if (general_config.h_min != null && general_config.h_max != null) {
          if (h_w < general_config.h_min) {
            general_config.h_min = h_w;
          }
          if (h_w + l_z > general_config.h_max) {
            general_config.h_max = h_w + l_z;
          }
        } else {
          general_config.h_min = h_w;
          general_config.h_max = h_w + l_z;
        }

        if (general_config.z_min != null && general_config.z_max != null) {
          if (z_o - l_z / 2 < general_config.z_min) {
            general_config.z_min = z_o - l_z / 2;
          }
          if (z_o + l_z / 2 > general_config.z_max) {
            general_config.z_max = z_o + l_z / 2;
          }
        } else {
          general_config.z_min = z_o - l_z / 2;
          general_config.z_max = z_o + l_z / 2;
        }

        if (general_config.x_min != null && general_config.x_max != null) {
          if (x_o - l_x / 2 < general_config.x_min) {
            general_config.x_min = x_o - l_x / 2;
          }
          if (x_o + l_x / 2 > general_config.x_max) {
            general_config.x_max = x_o + l_x / 2;
          }
        } else {
          general_config.x_min = x_o - l_x / 2;
          general_config.x_max = x_o + l_x / 2;
        }

        if (general_config.y_min != null && general_config.y_max != null) {
          if (y_o - l_y / 2 < general_config.y_min) {
            general_config.y_min = y_o - l_y / 2;
          }
          if (y_o + l_y / 2 > general_config.y_max) {
            general_config.y_max = y_o + l_y / 2;
          }
        } else {
          general_config.y_min = y_o - l_y / 2;
          general_config.y_max = y_o + l_y / 2;
        }
      }
    }
  }

  tab_temp.sort((a, b) => a - b);

  for (var m = 0; m < id_sbl_array.length; m++) {
    for (var j = 0; j < nj; j++) {
      for (var i = 0; i < ni; i++) {
        var index_1 = j * ni + i;

        var id = id_sbl_array[m];
        var temp = MesoNH_O_array[index_1]["teb_" + id];

        var index_sup_1 = j * ni + i + (id - 1) * ni * nj;
        var index_sup_2 = j * ni + i + id * ni * nj;
        var h =
          general_config.data_volume_3D["limit_teb"][index_sup_1] -
          MesoNH_O_array[index_1].zs +
          (general_config.data_volume_3D["limit_teb"][index_sup_2] -
            general_config.data_volume_3D["limit_teb"][index_sup_1]) /
            2;
        var h_w =
          general_config.data_volume_3D["limit_teb"][index_sup_1] -
          MesoNH_O_array[index_1].zs;

        var tmin = temperature_scale[0];
        var tmax = temperature_scale[1];

        var x_u = MesoNH_U_array[index_1].x - general_config.Coord_X_paris;
        var y_u = MesoNH_U_array[index_1].y - general_config.Coord_Y_paris;
        var z_u = MesoNH_U_array[index_1].zs + h;

        var x_v = MesoNH_V_array[index_1].x - general_config.Coord_X_paris;
        var y_v = MesoNH_V_array[index_1].y - general_config.Coord_Y_paris;
        var z_v = MesoNH_V_array[index_1].zs + h;

        var z_o = MesoNH_O_array[index_1].zs + h;

        var l_x = (MesoNH_O_array[index_1].x - MesoNH_U_array[index_1].x) * 2;
        var l_y = (MesoNH_O_array[index_1].y - MesoNH_V_array[index_1].y) * 2;

        var l_z = (h - h_w) * 2;

        var x_1 = x_u;
        var y_1 = y_v;
        var z_1 = z_o + l_z / 2;

        var x_2 = x_u + l_x;
        var y_2 = y_v;
        var z_2 = z_o + l_z / 2;

        var x_3 = x_u + l_x;
        var y_3 = y_v + l_y;
        var z_3 = z_o + l_z / 2;

        var x_4 = x_u;
        var y_4 = y_v + l_y;
        var z_4 = z_o + l_z / 2;

        var x_5 = x_u;
        var y_5 = y_v;
        var z_5 = z_o - l_z / 2;

        var x_6 = x_u + l_x;
        var y_6 = y_v;
        var z_6 = z_o - l_z / 2;

        var x_7 = x_u + l_x;
        var y_7 = y_v + l_y;
        var z_7 = z_o - l_z / 2;

        var x_8 = x_u;
        var y_8 = y_v + l_y;
        var z_8 = z_o - l_z / 2;

        //up
        coord_array.push(x_1 * general_config.cst_X);
        coord_array.push(z_1 * general_config.cst_Z);
        coord_array.push(-y_1 * general_config.cst_Y);
        coord_array.push(x_2 * general_config.cst_X);
        coord_array.push(z_2 * general_config.cst_Z);
        coord_array.push(-y_2 * general_config.cst_Y);

        coord_array.push(x_2 * general_config.cst_X);
        coord_array.push(z_2 * general_config.cst_Z);
        coord_array.push(-y_2 * general_config.cst_Y);
        coord_array.push(x_3 * general_config.cst_X);
        coord_array.push(z_3 * general_config.cst_Z);
        coord_array.push(-y_3 * general_config.cst_Y);

        coord_array.push(x_3 * general_config.cst_X);
        coord_array.push(z_3 * general_config.cst_Z);
        coord_array.push(-y_3 * general_config.cst_Y);
        coord_array.push(x_4 * general_config.cst_X);
        coord_array.push(z_4 * general_config.cst_Z);
        coord_array.push(-y_4 * general_config.cst_Y);

        coord_array.push(x_4 * general_config.cst_X);
        coord_array.push(z_4 * general_config.cst_Z);
        coord_array.push(-y_4 * general_config.cst_Y);
        coord_array.push(x_1 * general_config.cst_X);
        coord_array.push(z_1 * general_config.cst_Z);
        coord_array.push(-y_1 * general_config.cst_Y);

        //down
        coord_array.push(x_5 * general_config.cst_X);
        coord_array.push(z_5 * general_config.cst_Z);
        coord_array.push(-y_5 * general_config.cst_Y);
        coord_array.push(x_6 * general_config.cst_X);
        coord_array.push(z_6 * general_config.cst_Z);
        coord_array.push(-y_6 * general_config.cst_Y);

        coord_array.push(x_6 * general_config.cst_X);
        coord_array.push(z_6 * general_config.cst_Z);
        coord_array.push(-y_6 * general_config.cst_Y);
        coord_array.push(x_7 * general_config.cst_X);
        coord_array.push(z_7 * general_config.cst_Z);
        coord_array.push(-y_7 * general_config.cst_Y);

        coord_array.push(x_7 * general_config.cst_X);
        coord_array.push(z_7 * general_config.cst_Z);
        coord_array.push(-y_7 * general_config.cst_Y);
        coord_array.push(x_8 * general_config.cst_X);
        coord_array.push(z_8 * general_config.cst_Z);
        coord_array.push(-y_8 * general_config.cst_Y);

        coord_array.push(x_8 * general_config.cst_X);
        coord_array.push(z_8 * general_config.cst_Z);
        coord_array.push(-y_8 * general_config.cst_Y);
        coord_array.push(x_5 * general_config.cst_X);
        coord_array.push(z_5 * general_config.cst_Z);
        coord_array.push(-y_5 * general_config.cst_Y);

        //side
        coord_array.push(x_1 * general_config.cst_X);
        coord_array.push(z_1 * general_config.cst_Z);
        coord_array.push(-y_1 * general_config.cst_Y);
        coord_array.push(x_5 * general_config.cst_X);
        coord_array.push(z_5 * general_config.cst_Z);
        coord_array.push(-y_5 * general_config.cst_Y);

        coord_array.push(x_2 * general_config.cst_X);
        coord_array.push(z_2 * general_config.cst_Z);
        coord_array.push(-y_2 * general_config.cst_Y);
        coord_array.push(x_6 * general_config.cst_X);
        coord_array.push(z_6 * general_config.cst_Z);
        coord_array.push(-y_6 * general_config.cst_Y);

        coord_array.push(x_3 * general_config.cst_X);
        coord_array.push(z_3 * general_config.cst_Z);
        coord_array.push(-y_3 * general_config.cst_Y);
        coord_array.push(x_7 * general_config.cst_X);
        coord_array.push(z_7 * general_config.cst_Z);
        coord_array.push(-y_7 * general_config.cst_Y);

        coord_array.push(x_4 * general_config.cst_X);
        coord_array.push(z_4 * general_config.cst_Z);
        coord_array.push(-y_4 * general_config.cst_Y);
        coord_array.push(x_8 * general_config.cst_X);
        coord_array.push(z_8 * general_config.cst_Z);
        coord_array.push(-y_8 * general_config.cst_Y);
      }
    }
  }

  for (var m = 0; m < id_meso_array.length; m++) {
    for (var j = 0; j < nj; j++) {
      for (var i = 0; i < ni; i++) {
        var index_1 = j * ni + i;

        var id = id_meso_array[m];
        var temp = parseFloat(MesoNH_O_array[index_1]["tht_" + id]);

        var index_sup_1 = j * ni + i + (id - 1) * ni * nj;
        var index_sup_2 = j * ni + i + (id - 0) * ni * nj;
        var h =
          general_config.data_volume_3D["limit_meso"][index_sup_1] +
          (general_config.data_volume_3D["limit_meso"][index_sup_2] -
            general_config.data_volume_3D["limit_meso"][index_sup_1]) /
            2 -
          MesoNH_O_array[index_1].zs;
        var h_w =
          general_config.data_volume_3D["limit_meso"][index_sup_1] -
          MesoNH_O_array[index_1].zs;

        var tmin = temperature_scale[0];
        var tmax = temperature_scale[1];
        var x_u = MesoNH_U_array[index_1].x - general_config.Coord_X_paris;
        var y_u = MesoNH_U_array[index_1].y - general_config.Coord_Y_paris;
        var z_u = MesoNH_U_array[index_1].zs + h;

        var x_v = MesoNH_V_array[index_1].x - general_config.Coord_X_paris;
        var y_v = MesoNH_V_array[index_1].y - general_config.Coord_Y_paris;
        var z_v = MesoNH_V_array[index_1].zs + h;

        var z_o = MesoNH_O_array[index_1].zs + h;

        var l_x = (MesoNH_O_array[index_1].x - MesoNH_U_array[index_1].x) * 2;
        var l_y = (MesoNH_O_array[index_1].y - MesoNH_V_array[index_1].y) * 2;

        var l_z = (h - h_w) * 2;

        var x_1 = x_u;
        var y_1 = y_v;
        var z_1 = z_o + l_z / 2;

        var x_2 = x_u + l_x;
        var y_2 = y_v;
        var z_2 = z_o + l_z / 2;

        var x_3 = x_u + l_x;
        var y_3 = y_v + l_y;
        var z_3 = z_o + l_z / 2;

        var x_4 = x_u;
        var y_4 = y_v + l_y;
        var z_4 = z_o + l_z / 2;

        var x_5 = x_u;
        var y_5 = y_v;
        var z_5 = z_o - l_z / 2;

        var x_6 = x_u + l_x;
        var y_6 = y_v;
        var z_6 = z_o - l_z / 2;

        var x_7 = x_u + l_x;
        var y_7 = y_v + l_y;
        var z_7 = z_o - l_z / 2;

        var x_8 = x_u;
        var y_8 = y_v + l_y;
        var z_8 = z_o - l_z / 2;

        //up
        coord_array.push(x_1 * general_config.cst_X);
        coord_array.push(z_1 * general_config.cst_Z);
        coord_array.push(-y_1 * general_config.cst_Y);
        coord_array.push(x_2 * general_config.cst_X);
        coord_array.push(z_2 * general_config.cst_Z);
        coord_array.push(-y_2 * general_config.cst_Y);

        coord_array.push(x_2 * general_config.cst_X);
        coord_array.push(z_2 * general_config.cst_Z);
        coord_array.push(-y_2 * general_config.cst_Y);
        coord_array.push(x_3 * general_config.cst_X);
        coord_array.push(z_3 * general_config.cst_Z);
        coord_array.push(-y_3 * general_config.cst_Y);

        coord_array.push(x_3 * general_config.cst_X);
        coord_array.push(z_3 * general_config.cst_Z);
        coord_array.push(-y_3 * general_config.cst_Y);
        coord_array.push(x_4 * general_config.cst_X);
        coord_array.push(z_4 * general_config.cst_Z);
        coord_array.push(-y_4 * general_config.cst_Y);

        coord_array.push(x_4 * general_config.cst_X);
        coord_array.push(z_4 * general_config.cst_Z);
        coord_array.push(-y_4 * general_config.cst_Y);
        coord_array.push(x_1 * general_config.cst_X);
        coord_array.push(z_1 * general_config.cst_Z);
        coord_array.push(-y_1 * general_config.cst_Y);

        //down
        coord_array.push(x_5 * general_config.cst_X);
        coord_array.push(z_5 * general_config.cst_Z);
        coord_array.push(-y_5 * general_config.cst_Y);
        coord_array.push(x_6 * general_config.cst_X);
        coord_array.push(z_6 * general_config.cst_Z);
        coord_array.push(-y_6 * general_config.cst_Y);

        coord_array.push(x_6 * general_config.cst_X);
        coord_array.push(z_6 * general_config.cst_Z);
        coord_array.push(-y_6 * general_config.cst_Y);
        coord_array.push(x_7 * general_config.cst_X);
        coord_array.push(z_7 * general_config.cst_Z);
        coord_array.push(-y_7 * general_config.cst_Y);

        coord_array.push(x_7 * general_config.cst_X);
        coord_array.push(z_7 * general_config.cst_Z);
        coord_array.push(-y_7 * general_config.cst_Y);
        coord_array.push(x_8 * general_config.cst_X);
        coord_array.push(z_8 * general_config.cst_Z);
        coord_array.push(-y_8 * general_config.cst_Y);

        coord_array.push(x_8 * general_config.cst_X);
        coord_array.push(z_8 * general_config.cst_Z);
        coord_array.push(-y_8 * general_config.cst_Y);
        coord_array.push(x_5 * general_config.cst_X);
        coord_array.push(z_5 * general_config.cst_Z);
        coord_array.push(-y_5 * general_config.cst_Y);

        //side
        coord_array.push(x_1 * general_config.cst_X);
        coord_array.push(z_1 * general_config.cst_Z);
        coord_array.push(-y_1 * general_config.cst_Y);
        coord_array.push(x_5 * general_config.cst_X);
        coord_array.push(z_5 * general_config.cst_Z);
        coord_array.push(-y_5 * general_config.cst_Y);

        coord_array.push(x_2 * general_config.cst_X);
        coord_array.push(z_2 * general_config.cst_Z);
        coord_array.push(-y_2 * general_config.cst_Y);
        coord_array.push(x_6 * general_config.cst_X);
        coord_array.push(z_6 * general_config.cst_Z);
        coord_array.push(-y_6 * general_config.cst_Y);

        coord_array.push(x_3 * general_config.cst_X);
        coord_array.push(z_3 * general_config.cst_Z);
        coord_array.push(-y_3 * general_config.cst_Y);
        coord_array.push(x_7 * general_config.cst_X);
        coord_array.push(z_7 * general_config.cst_Z);
        coord_array.push(-y_7 * general_config.cst_Y);

        coord_array.push(x_4 * general_config.cst_X);
        coord_array.push(z_4 * general_config.cst_Z);
        coord_array.push(-y_4 * general_config.cst_Y);
        coord_array.push(x_8 * general_config.cst_X);
        coord_array.push(z_8 * general_config.cst_Z);
        coord_array.push(-y_8 * general_config.cst_Y);
      }
    }
  }

  var coord_array_32 = new Float32Array(coord_array);

  var bufferGeometry = new THREE.BufferGeometry();

  bufferGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(coord_array_32, 3)
  );

  var material = new THREE.LineBasicMaterial({
    color: "#ffffff",
    linewidth: 4,
    linecap: "round", //ignored by WebGLRenderer
    linejoin: "round", //ignored by WebGLRenderer
  });

  var mesh = new THREE.LineSegments(bufferGeometry, material);

  grid.add(mesh);
  scene.add(grid);
}

export function create_buildings(data, scene, nature_type) {
  if (general_config.grid_building == null) {
  } else {
    scene.remove(general_config.grid_building);
  }
  general_config.grid_building = new THREE.Object3D();

  if (general_config.grid_building_print == null) {
  } else {
    scene.remove(general_config.grid_building_print);
  }
  general_config.grid_building_print = new THREE.Object3D();

  var buildings_features_points_array = [];
  var buildings_features_color_array = [];
  var buildings_features_normal_array = [];

  var buildings_features_surface = [];

  var ground_features_points_array = [];
  var ground_features_color_array = [];
  var ground_features_normal_array = [];

  var z_offset = 0;

  var z_offset_array = [];

  for (var a = 0; a < data.features.length; a++) {
    var feature = data.features[a];

    var x =
      feature.geometry.coordinates[0][0][0][0] - general_config.Coord_X_paris;
    var y =
      feature.geometry.coordinates[0][0][0][1] - general_config.Coord_Y_paris;

    var voxel_position_x = parseInt(
      ((x - general_config.data_volume_3D.x_min) /
        (general_config.data_volume_3D.x_max -
          general_config.data_volume_3D.x_min)) *
        general_config.data_ni
    );
    var voxel_position_y = parseInt(
      general_config.data_nj -
        ((y - general_config.data_volume_3D.y_min) /
          (general_config.data_volume_3D.y_max -
            general_config.data_volume_3D.y_min)) *
          general_config.data_nj
    );

    if (
      voxel_position_x >= 0 &&
      voxel_position_x < general_config.data_ni &&
      voxel_position_y >= 0 &&
      voxel_position_y < general_config.data_nj
    ) {
      var zs_teb =
        general_config.data_volume_3D.data_zs_teb[
          voxel_position_y * general_config.data_ni + voxel_position_x
        ];
      z_offset = zs_teb - feature.properties.altitude_s;
    }

    z_offset_array.push(z_offset);

    var feature_altitude_s = feature.properties.altitude_s + z_offset;
    var feature_altitude_t = feature.properties.altitude_t + z_offset;

    var polygon_coordinate = [];

    var building_color;
    switch (nature_type) {
      case "lcz_1":
        building_color = return_building_color(
          feature.properties.lcz1,
          "lcz_1"
        );
        break;
      case "lcz_2":
        building_color = return_building_color(
          feature.properties.lcz2,
          "lcz_2"
        );
        break;
      case "typo_maj":
        building_color = return_building_color(
          feature.properties.typo_maj,
          "typo_maj"
        );
        break;
      case "typo_second":
        building_color = return_building_color(
          feature.properties.typo_second,
          "typo_second"
        );
        break;
      case "build_dens":
        building_color = return_building_color(
          feature.properties.build_dens,
          "build_dens"
        );
        break;
      case "hydro_dens":
        building_color = return_building_color(
          feature.properties.hydro_dens,
          "hydro_dens"
        );
        break;
      case "veget_dens":
        building_color = return_building_color(
          feature.properties.veget_dens,
          "veget_dens"
        );
        break;
      case "road_dens":
        building_color = return_building_color(
          feature.properties.road_dens,
          "road_dens"
        );
        break;
      case "ba":
        building_color = return_building_color(feature.properties.ba, "ba");
        break;
      case "bgh":
        building_color = return_building_color(feature.properties.bgh, "bgh");
        break;
      case "icif":
        building_color = return_building_color(feature.properties.icif, "icif");
        break;
      case "icio":
        building_color = return_building_color(feature.properties.icio, "icio");
        break;
      case "id":
        building_color = return_building_color(feature.properties.id, "id");
        break;
      case "local":
        building_color = return_building_color(
          feature.properties.local,
          "local"
        );
        break;
      case "pcif":
        building_color = return_building_color(feature.properties.pcif, "pcif");
        break;
      case "pcio":
        building_color = return_building_color(feature.properties.pcio, "pcio");
        break;
      case "pd":
        building_color = return_building_color(feature.properties.pd, "pd");
        break;
      case "psc":
        building_color = return_building_color(feature.properties.psc, "psc");
        break;
      case "autre":
        building_color = return_building_color(null, "autre");
        break;
    }

    for (var j = 0; j < feature.geometry.coordinates[0][0].length; j++) {
      var index_1 = j;
      var index_2;
      if (j == feature.geometry.coordinates[0][0].length - 1) {
        index_2 = 0;
      } else {
        index_2 = j + 1;
      }

      polygon_coordinate.push(
        (feature.geometry.coordinates[0][0][index_1][0] -
          general_config.Coord_X_paris) *
          general_config.cst_X
      );
      polygon_coordinate.push(
        (feature.geometry.coordinates[0][0][index_1][1] -
          general_config.Coord_Y_paris) *
          general_config.cst_Y
      );

      buildings_features_points_array.push(
        (feature.geometry.coordinates[0][0][index_1][0] -
          general_config.Coord_X_paris) *
          general_config.cst_X
      );
      buildings_features_points_array.push(
        feature_altitude_s * general_config.cst_Z
      );
      buildings_features_points_array.push(
        -(
          feature.geometry.coordinates[0][0][index_1][1] -
          general_config.Coord_Y_paris
        ) * general_config.cst_Y
      );
      buildings_features_points_array.push(
        (feature.geometry.coordinates[0][0][index_1][0] -
          general_config.Coord_X_paris) *
          general_config.cst_X
      );
      buildings_features_points_array.push(
        feature_altitude_t * general_config.cst_Z
      );
      buildings_features_points_array.push(
        -(
          feature.geometry.coordinates[0][0][index_1][1] -
          general_config.Coord_Y_paris
        ) * general_config.cst_Y
      );
      buildings_features_points_array.push(
        (feature.geometry.coordinates[0][0][index_2][0] -
          general_config.Coord_X_paris) *
          general_config.cst_X
      );
      buildings_features_points_array.push(
        feature_altitude_s * general_config.cst_Z
      );
      buildings_features_points_array.push(
        -(
          feature.geometry.coordinates[0][0][index_2][1] -
          general_config.Coord_Y_paris
        ) * general_config.cst_Y
      );

      buildings_features_surface.push(feature_altitude_s);

      buildings_features_points_array.push(
        (feature.geometry.coordinates[0][0][index_1][0] -
          general_config.Coord_X_paris) *
          general_config.cst_X
      );
      buildings_features_points_array.push(
        feature_altitude_t * general_config.cst_Z
      );
      buildings_features_points_array.push(
        -(
          feature.geometry.coordinates[0][0][index_1][1] -
          general_config.Coord_Y_paris
        ) * general_config.cst_Y
      );
      buildings_features_points_array.push(
        (feature.geometry.coordinates[0][0][index_2][0] -
          general_config.Coord_X_paris) *
          general_config.cst_X
      );
      buildings_features_points_array.push(
        feature_altitude_t * general_config.cst_Z
      );
      buildings_features_points_array.push(
        -(
          feature.geometry.coordinates[0][0][index_2][1] -
          general_config.Coord_Y_paris
        ) * general_config.cst_Y
      );
      buildings_features_points_array.push(
        (feature.geometry.coordinates[0][0][index_2][0] -
          general_config.Coord_X_paris) *
          general_config.cst_X
      );
      buildings_features_points_array.push(
        feature_altitude_s * general_config.cst_Z
      );
      buildings_features_points_array.push(
        -(
          feature.geometry.coordinates[0][0][index_2][1] -
          general_config.Coord_Y_paris
        ) * general_config.cst_Y
      );

      buildings_features_surface.push(feature_altitude_s);

      var N_X =
        -(
          feature_altitude_t * general_config.cst_Z -
          feature_altitude_s * general_config.cst_Z
        ) *
        ((feature.geometry.coordinates[0][0][index_2][1] -
          general_config.Coord_Y_paris) *
          general_config.cst_Y -
          (feature.geometry.coordinates[0][0][index_1][1] -
            general_config.Coord_Y_paris) *
            general_config.cst_Y);
      var N_Y =
        (feature_altitude_t * general_config.cst_Z -
          feature_altitude_s * general_config.cst_Z) *
        ((feature.geometry.coordinates[0][0][index_2][0] -
          general_config.Coord_X_paris) *
          general_config.cst_X -
          (feature.geometry.coordinates[0][0][index_1][0] -
            general_config.Coord_X_paris) *
            general_config.cst_X);

      var normal_vector = new THREE.Vector2(N_X, N_Y);
      normal_vector.normalize();

      buildings_features_normal_array.push(normal_vector.x);
      buildings_features_normal_array.push(0);
      buildings_features_normal_array.push(normal_vector.y);
      buildings_features_normal_array.push(normal_vector.x);
      buildings_features_normal_array.push(0);
      buildings_features_normal_array.push(normal_vector.y);
      buildings_features_normal_array.push(normal_vector.x);
      buildings_features_normal_array.push(0);
      buildings_features_normal_array.push(normal_vector.y);
      buildings_features_normal_array.push(normal_vector.x);
      buildings_features_normal_array.push(0);
      buildings_features_normal_array.push(normal_vector.y);
      buildings_features_normal_array.push(normal_vector.x);
      buildings_features_normal_array.push(0);
      buildings_features_normal_array.push(normal_vector.y);
      buildings_features_normal_array.push(normal_vector.x);
      buildings_features_normal_array.push(0);
      buildings_features_normal_array.push(normal_vector.y);

      buildings_features_color_array.push(building_color.r);
      buildings_features_color_array.push(building_color.g);
      buildings_features_color_array.push(building_color.b);
      buildings_features_color_array.push(building_color.r);
      buildings_features_color_array.push(building_color.g);
      buildings_features_color_array.push(building_color.b);
      buildings_features_color_array.push(building_color.r);
      buildings_features_color_array.push(building_color.g);
      buildings_features_color_array.push(building_color.b);
      buildings_features_color_array.push(building_color.r);
      buildings_features_color_array.push(building_color.g);
      buildings_features_color_array.push(building_color.b);
      buildings_features_color_array.push(building_color.r);
      buildings_features_color_array.push(building_color.g);
      buildings_features_color_array.push(building_color.b);
      buildings_features_color_array.push(building_color.r);
      buildings_features_color_array.push(building_color.g);
      buildings_features_color_array.push(building_color.b);
    }

    var polygon_triangulate = earcut(polygon_coordinate, null, 2);
    for (var t = 0; t < polygon_triangulate.length; t++) {
      buildings_features_points_array.push(
        polygon_coordinate[polygon_triangulate[t] * 2]
      );
      buildings_features_points_array.push(
        feature_altitude_t * general_config.cst_Z
      );
      buildings_features_points_array.push(
        -polygon_coordinate[polygon_triangulate[t] * 2 + 1]
      );

      buildings_features_surface.push(feature_altitude_s);

      buildings_features_color_array.push(building_color.r);
      buildings_features_color_array.push(building_color.g);
      buildings_features_color_array.push(building_color.b);
      buildings_features_normal_array.push(0);
      buildings_features_normal_array.push(1);
      buildings_features_normal_array.push(0);
    }
    for (var t = 0; t < polygon_triangulate.length; t++) {
      ground_features_points_array.push(
        polygon_coordinate[polygon_triangulate[t] * 2]
      );
      ground_features_points_array.push(
        feature_altitude_s * general_config.cst_Z
      );
      ground_features_points_array.push(
        -polygon_coordinate[polygon_triangulate[t] * 2 + 1]
      );

      buildings_features_surface.push(feature_altitude_s);

      ground_features_color_array.push(building_color.r);
      ground_features_color_array.push(building_color.g);
      ground_features_color_array.push(building_color.b);
      ground_features_normal_array.push(0);
      ground_features_normal_array.push(1);
      ground_features_normal_array.push(0);
    }
  }
  var buildings_feature_coord_array_32 = new Float32Array(
    buildings_features_points_array
  );
  var buildings_feature_colors_32 = new Float32Array(
    buildings_features_color_array
  );
  var buildings_feature_normal_32 = new Float32Array(
    buildings_features_normal_array
  );

  var ground_feature_coord_array_32 = new Float32Array(
    ground_features_points_array
  );
  var ground_feature_colors_32 = new Float32Array(ground_features_color_array);
  var ground_feature_normal_32 = new Float32Array(ground_features_normal_array);

  var texture_zs = new THREE.DataTexture(
    general_config.data_volume_3D.data_zs,
    general_config.data_volume_3D.x_length,
    general_config.data_volume_3D.y_length
  );
  texture_zs.format = THREE.RedFormat;
  texture_zs.type = THREE.FloatType;
  texture_zs.unpackAlignment = 1;

  var buildings_feature_material = new THREE.ShaderMaterial({
    side: THREE.DoubleSide,
    uniforms: {
      light_direction: { value: light_direction },
      light_ambient: { value: light_ambient },
      transparency: { value: general_config.buildings_transparency },
    },
    vertexShader: document.getElementById("vertexshader_buildings").textContent,
    fragmentShader: document.getElementById("fragmentshader_buildings")
      .textContent,
    transparent: true,
  });
  var buildings_feature_bufferGeometry = new THREE.BufferGeometry();

  var ground_feature_material = new THREE.ShaderMaterial({
    side: THREE.DoubleSide,
    uniforms: {
      light_direction: { value: light_direction },
      light_ambient: { value: light_ambient },
    },
    vertexShader: document.getElementById("vertexshader_buildings").textContent,
    fragmentShader: document.getElementById("fragmentshader_buildings")
      .textContent,
    transparent: false,
  });

  var buildings_feature_bufferGeometry = new THREE.BufferGeometry();

  buildings_feature_bufferGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(buildings_feature_coord_array_32, 3)
  );
  buildings_feature_bufferGeometry.setAttribute(
    "customNormal",
    new THREE.BufferAttribute(buildings_feature_normal_32, 3)
  );
  buildings_feature_bufferGeometry.setAttribute(
    "color",
    new THREE.BufferAttribute(buildings_feature_colors_32, 3)
  );
  var buildings_feature_mesh = new THREE.Mesh(
    buildings_feature_bufferGeometry,
    buildings_feature_material
  );

  var ground_feature_bufferGeometry = new THREE.BufferGeometry();

  ground_feature_bufferGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(ground_feature_coord_array_32, 3)
  );
  ground_feature_bufferGeometry.setAttribute(
    "customNormal",
    new THREE.BufferAttribute(ground_feature_normal_32, 3)
  );
  ground_feature_bufferGeometry.setAttribute(
    "color",
    new THREE.BufferAttribute(ground_feature_colors_32, 3)
  );
  var ground_feature_mesh = new THREE.Mesh(
    ground_feature_bufferGeometry,
    ground_feature_material
  );

  general_config.grid_building_print.add(ground_feature_mesh);
  general_config.grid_building.add(buildings_feature_mesh);

  if ($("#buildings_presence_input").is(":checked") == true) {
    scene.add(general_config.grid_building_print);
    scene.add(general_config.grid_building);
  }
}

export function change_buildings_transparency(transparency) {
  general_config.grid_building.children[0].material.uniforms.transparency = {
    type: "f",
    value: transparency,
  };
}

export function return_building_color(type, nature_type) {
  var color_hex = "#7f7f7f";
  var color = { r: null, g: null, b: null };
  if (nature_type == "lcz_1" || nature_type == "lcz_2") {
    if (type == 1) {
      color_hex = "#8b0101";
    } else if (type == 2) {
      color_hex = "#cc0200";
    } else if (type == 3) {
      color_hex = "#fc0001";
    } else if (type == 4) {
      color_hex = "#be4c03";
    } else if (type == 5) {
      color_hex = "#ff6602";
    } else if (type == 6) {
      color_hex = "#ff9856";
    } else if (type == 7) {
      color_hex = "#fbed08";
    } else if (type == 8) {
      color_hex = "#bcbcba";
    } else if (type == 9) {
      color_hex = "#ffcca7";
    } else if (type == 10) {
      color_hex = "#57555a";
    } else if (type == 101) {
      color_hex = "#006700";
    } else if (type == 102) {
      color_hex = "#05aa05";
    } else if (type == 103) {
      color_hex = "#648423";
    } else if (type == 104) {
      color_hex = "#bbdb7a";
    } else if (type == 105) {
      color_hex = "#010101";
    } else if (type == 106) {
      color_hex = "#fdf6ae";
    } else if (type == 107) {
      color_hex = "#6d67fd";
    } else {
      color_hex = "#7f7f7f";
    }
  } else if (nature_type == "typo_maj") {
    switch (type) {
      case "ba":
        color_hex = "#8f8f8f";
        break;
      case "bgh":
        color_hex = "#000d00";
        break;
      case "icif":
        color_hex = "#d52623";
        break;
      case "icio":
        color_hex = "#f07923";
        break;
      case "id":
        color_hex = "#eccb27";
        break;
      case "local":
        color_hex = "#d728ac";
        break;
      case "pcif":
        color_hex = "#2b6724";
        break;
      case "pcio":
        color_hex = "#36884a";
        break;
      case "pd":
        color_hex = "#22be2f";
        break;
      case "psc":
        color_hex = "#05ff58";
        break;
      default:
        color_hex = "#7f7f7f";
    }
  } else if (nature_type == "typo_second") {
    switch (type) {
      case "ba":
        color_hex = "#8f8f8f";
        break;
      case "bgh":
        color_hex = "#000d00";
        break;
      case "icif":
        color_hex = "#d52623";
        break;
      case "icio":
        color_hex = "#f07923";
        break;
      case "id":
        color_hex = "#eccb27";
        break;
      case "local":
        color_hex = "#d728ac";
        break;
      case "pcif":
        color_hex = "#2b6724";
        break;
      case "na":
        color_hex = "#36884a";
        break;
      case "pd":
        color_hex = "#22be2f";
        break;
      case "psc":
        color_hex = "#05ff58";
        break;
      default:
        color_hex = "#7f7f7f";
    }
  } else if (nature_type == "build_dens") {
    var color_1 = "#F6CAE5";
    var color_2 = "#94002F";
    if (type != null && type != undefined) {
      color_hex = approximateColor1ToColor2ByPercent(color_1, color_2, type);
    } else {
      color_hex = "#7f7f7f";
    }
  } else if (nature_type == "hydro_dens") {
    var color_1 = "#7198EC";
    var color_2 = "#04065A";
    if (type != null && type != undefined) {
      color_hex = approximateColor1ToColor2ByPercent(color_1, color_2, type);
    } else {
      color_hex = "#7f7f7f";
    }
  } else if (nature_type == "veget_dens") {
    var color_1 = "#FFF4B9";
    var color_2 = "#005F13";
    if (type != null && type != undefined) {
      color_hex = approximateColor1ToColor2ByPercent(color_1, color_2, type);
    } else {
      color_hex = "#7f7f7f";
    }
  } else if (nature_type == "road_dens") {
    var color_1 = "#EEEEEE";
    var color_2 = "#676767";
    if (type != null && type != undefined) {
      color_hex = approximateColor1ToColor2ByPercent(color_1, color_2, type);
    } else {
      color_hex = "#7f7f7f";
    }
  } else if (nature_type == "ba") {
    var color_1 = "#EEEEEE";
    var color_2 = "#676767";
    if (type != null && type != undefined) {
      color_hex = approximateColor1ToColor2ByPercent(
        color_1,
        color_2,
        type / 100
      );
    } else {
      color_hex = "#7f7f7f";
    }
  } else if (nature_type == "bgh") {
    var color_1 = "#EEEEEE";
    var color_2 = "#676767";
    if (type != null && type != undefined) {
      color_hex = approximateColor1ToColor2ByPercent(
        color_1,
        color_2,
        type / 100
      );
    } else {
      color_hex = "#7f7f7f";
    }
  } else if (nature_type == "icif") {
    var color_1 = "#EEEEEE";
    var color_2 = "#676767";
    if (type != null && type != undefined) {
      color_hex = approximateColor1ToColor2ByPercent(
        color_1,
        color_2,
        type / 100
      );
    } else {
      color_hex = "#7f7f7f";
    }
  } else if (nature_type == "icio") {
    var color_1 = "#EEEEEE";
    var color_2 = "#676767";
    if (type != null && type != undefined) {
      color_hex = approximateColor1ToColor2ByPercent(
        color_1,
        color_2,
        type / 100
      );
    } else {
      color_hex = "#7f7f7f";
    }
  } else if (nature_type == "id") {
    var color_1 = "#EEEEEE";
    var color_2 = "#676767";
    if (type != null && type != undefined) {
      color_hex = approximateColor1ToColor2ByPercent(
        color_1,
        color_2,
        type / 100
      );
    } else {
      color_hex = "#7f7f7f";
    }
  } else if (nature_type == "local") {
    var color_1 = "#EEEEEE";
    var color_2 = "#676767";
    if (type != null && type != undefined) {
      color_hex = approximateColor1ToColor2ByPercent(
        color_1,
        color_2,
        type / 100
      );
    } else {
      color_hex = "#7f7f7f";
    }
  } else if (nature_type == "pcif") {
    var color_1 = "#EEEEEE";
    var color_2 = "#676767";
    if (type != null && type != undefined) {
      color_hex = approximateColor1ToColor2ByPercent(
        color_1,
        color_2,
        type / 100
      );
    } else {
      color_hex = "#7f7f7f";
    }
  } else if (nature_type == "pcio") {
    var color_1 = "#EEEEEE";
    var color_2 = "#676767";
    if (type != null && type != undefined) {
      color_hex = approximateColor1ToColor2ByPercent(
        color_1,
        color_2,
        type / 100
      );
    } else {
      color_hex = "#7f7f7f";
    }
  } else if (nature_type == "pd") {
    var color_1 = "#EEEEEE";
    var color_2 = "#676767";
    if (type != null && type != undefined) {
      color_hex = approximateColor1ToColor2ByPercent(
        color_1,
        color_2,
        type / 100
      );
    } else {
      color_hex = "#7f7f7f";
    }
  } else if (nature_type == "psc") {
    var color_1 = "#EEEEEE";
    var color_2 = "#676767";
    if (type != null && type != undefined) {
      color_hex = approximateColor1ToColor2ByPercent(
        color_1,
        color_2,
        type / 100
      );
    } else {
      color_hex = "#7f7f7f";
    }
  }

  var color_rgb = hexToRgb(color_hex);

  color.r = color_rgb.r / 255;
  color.g = color_rgb.g / 255;
  color.b = color_rgb.b / 255;

  return color;
}

export function getHCLcolor(tableau, temp, percentage, HCLscale) {
  let color, i;
  let tab_temp = tableau.slice();
  let array = [];
  let nb_arr = general_config.nb_array;

  if (general_config.active_color_class == "ecarts_egaux") {
    let temp_min = general_config.temp_array[0];
    let temp_max = general_config.temp_array[1];
    let ecart = (temp_max - temp_min) / nb_arr;
    for (i = 0; i < nb_arr; ++i) {
      //creation de n sous tableaux vides
      array.push([]);
    }
    tab_temp.forEach((temperature) => {
      for (i = 0; i < array.length; ++i) {
        if (
          temperature >= temp_min + ecart * i &&
          temperature <= temp_min + ecart * (i + 1)
        ) {
          array[i].push(temperature);
        }
      }
    });
    /*
         on peut 'return array' ici pour avoir le tableau composé des sous tableaux
        */
  } else if (general_config.active_color_class == "effectifs_egaux") {
    let nbeMaxDeVals = Math.ceil(tab_temp.length / nb_arr);
    for (i = 0; i < nb_arr; ++i) {
      if (tab_temp.length / (nb_arr - i) < nbeMaxDeVals && nbeMaxDeVals > 1) {
        array.push(tab_temp.splice(0, nbeMaxDeVals - 1));
      } else {
        array.push(tab_temp.splice(0, nbeMaxDeVals));
      }
    }
    /*
        on peut 'return array' ici pour avoir le tableau composé des sous tableaux

        */
  }
  //A adapter quand on changera les couleurs par un .png
  for (i = 0; i < nb_arr; ++i) {
    if (temp >= array[i][0] && temp <= array[i][array[i].length - 1]) {
      color = HCLscale[i];
      return color;
    }
  }
  //Ci dessous sert à renvoyer une couleur (pour ne pas que ca bugge) même si les points/plans ne seront pas représentés
  if (percentage === 1) {
    return HCLscale[nb_arr - 1];
  }
  if (percentage === 0) {
    return HCLscale[0];
  }
}

export function create_temp_histogram() {
  var selected_level = [];
  var sbl_ckbx = $(".ckbx_sbl");
  var meso_ckbx = $(".ckbx_meso");
  for (var s = 0; s < sbl_ckbx.length; s++) {
    if (sbl_ckbx[s].checked) {
      if (selected_level.indexOf(sbl_ckbx[s].id) < 0) {
        selected_level.push(sbl_ckbx[s].id);
      }
    }
  }
  for (var m = 0; m < meso_ckbx.length; m++) {
    if (meso_ckbx[m].checked) {
      if (selected_level.indexOf(meso_ckbx[m].id) < 0) {
        selected_level.push(meso_ckbx[m].id);
      }
    }
  }

  var temp_deg = [];
  for (var sl = 0; sl < selected_level.length; sl++) {
    var temp_to_add;
    for (var g = 0; g < general_config.data_volume_3D.temp_by_id.length; g++) {
      if (
        general_config.data_volume_3D.temp_by_id[g].id == selected_level[sl]
      ) {
        temp_to_add = general_config.data_volume_3D.temp_by_id[g].temp;
        break;
      }
    }
    for (var g = 0; g < temp_to_add.length; g++) {
      temp_deg.push(parseFloat(temp_to_add[g]) - 273.15);
    }
  }

  var margin = { top: 10, right: 40, bottom: 30, left: 30 },
    width = 400 - margin.left - margin.right,
    /* ne souhait pas mettre width ds gnl config, si on le change ici, il faut le changer dans la fonction 'chargerParams'
    où la largeur est renseignée en dur (pour le moment 330)*/
    height = 200 - margin.top - margin.bottom;
  //Pour ne pas avoir plusieurs histo a la suite, on efface et on recommence ac d'autres données

  $("#temp_histogram_content").html("");
  // append the svg object to the body of the page
  var svg = d3
    .select("#temp_histogram_content")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    //"The SVG <g> element is used to group SVG shapes together. "
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // temp minimum et maximum initiales dans l'histogramme, mais temp array est init entre 20° et 30°

  // X axis: scale and draw:
  var x = d3
    .scaleLinear()
    .domain([general_config.domain_min, general_config.domain_max])
    .range([0, width]);
  svg
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  var ticks_number = 50;
  var x_offset =
    (general_config.domain_max - general_config.domain_min) / ticks_number;
  var ticks_values = [];
  for (var i = 0; i < ticks_number; i++) {
    ticks_values.push(general_config.domain_min + x_offset * i);
  }
  ticks_values.push(general_config.domain_max);

  // set the parameters for the histogram
  var histogram = d3
    .histogram()
    .value(function (d) {
      return d;
    }) // I need to give the vector of value (price est lié aux données test)
    // pour nous ca sera les temperatures
    .domain(x.domain()) // then the domain of the graphic
    .thresholds(ticks_values);
  //.thresholds(x.ticks(general_config.domain_max-general_config.domain_min)); // then the numbers of bins
  // And apply this function to data to get the bins
  var bins = histogram(temp_deg);
  general_config.bins = bins;

  // Y axis: scale and draw:
  var y = d3.scaleLinear().range([height, 0]);
  y.domain([
    0,
    2 +
      d3.max(bins, function (d) {
        return d.length;
      }),
  ]); // d3.hist has to be called before the Y axis obviously

  let yAxis = d3.axisLeft(y).tickValues([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  svg.append("g").call(yAxis);

  create_legend(
    general_config.temp_array,
    general_config.domain_min,
    general_config.domain_max,
    width,
    height
  );

  // append the bar rectangles to the svg element
  //svg.selectAll("rect")
  //    .data(bins)
  //    .enter()
  //    .append("rect")
  //        .attr("x", 1)
  //        .attr("transform", function(d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; })
  //        .attr("width", function(d) { return x(d.x1) - x(d.x0) -1 ; })
  //        .attr("height", function(d) { return height - y(d.length); })
  //        .attr("class", "rect_temps")
  //        .attr("opacity", 0.7)
  //        .style("fill", "#69b3a2")

  create_histograme_rect();

  //line de temp min
  svg
    .append("rect")
    .attr(
      "x",
      ((general_config.temp_array[0] - 273.15 - general_config.domain_min) /
        (general_config.domain_max - general_config.domain_min)) *
        width
    )
    .attr("y", 0)
    .attr("height", height)
    .attr("width", 2)
    .attr("fill", "blue")
    .attr("class", "draggables")
    .attr("id", "rect_temp_min")
    .call(d3.drag().on("start", dragstarted));

  function dragstarted() {
    let line = d3.select(this).classed("dragging", true);
    d3.event.on("drag", dragged).on("end", dragended);

    function dragged() {
      line.raise().attr("x", d3.event.x).attr("y", 0);

      let ecart =
        borne_temp_max.x.baseVal.value - borne_temp_min.x.baseVal.value - 2;
      ecart <= width / (general_config.domain_max - general_config.domain_min)
        ? (borne_temp_min.x.baseVal.value =
            borne_temp_max.x.baseVal.value -
            width / (general_config.domain_max - general_config.domain_min))
        : null;
      // vérifier qu'il ne sorte pas de width n'est pas utile puisque temp max le bloquera
      borne_temp_min.x.baseVal.value >= width
        ? (borne_temp_min.x.baseVal.value = width)
        : null;
      borne_temp_min.x.baseVal.value <= 0
        ? (borne_temp_min.x.baseVal.value = 0)
        : null;

      let temperatureMini =
        (borne_temp_min.x.baseVal.value / width) *
          (general_config.domain_max - general_config.domain_min) +
        general_config.domain_min;

      $("#temp_min_input").val("" + temperatureMini.toFixed(2));
      general_config.temp_array = [
        parseFloat($("#temp_min_input").val()) + 273.15,
        parseFloat($("#temp_max_input").val()) + 273.15,
      ];

      create_legend(
        general_config.temp_array,
        general_config.domain_min,
        general_config.domain_max,
        width,
        height
      );
      create_histograme_rect();
    }

    function dragended() {
      line.classed("dragging", false);

      recreate_scene();
    }
  }

  //line de temp max
  svg
    .append("rect")
    .attr(
      "x",
      ((general_config.temp_array[1] - 273.15 - general_config.domain_min) /
        (general_config.domain_max - general_config.domain_min)) *
        width
    )
    .attr("y", 0)
    .attr("height", height)
    .attr("width", 2)
    .attr("fill", "red")
    .attr("id", "rect_temp_max")
    .attr("class", "draggables")
    .call(d3.drag().on("start", dragstarted2));

  function dragstarted2() {
    let line = d3.select(this).classed("dragging", true);
    d3.event.on("drag", dragged2).on("end", dragended2);

    function dragged2() {
      line.raise().attr("x", d3.event.x).attr("y", 0);
      let ecart =
        borne_temp_max.x.baseVal.value - borne_temp_min.x.baseVal.value - 2;
      ecart <= width / (general_config.domain_max - general_config.domain_min)
        ? (borne_temp_max.x.baseVal.value =
            borne_temp_min.x.baseVal.value +
            width / (general_config.domain_max - general_config.domain_min))
        : null;
      borne_temp_max.x.baseVal.value >= width
        ? (borne_temp_max.x.baseVal.value = width)
        : null;
      // vérifier qu'il ne sorte pas côté 0 n'est pas utile puisque temp min le bloquera
      borne_temp_max.x.baseVal.value <= 0
        ? (borne_temp_max.x.baseVal.value = 0)
        : null;

      let temperatureMaxi =
        (borne_temp_max.x.baseVal.value / width) *
          (general_config.domain_max - general_config.domain_min) +
        general_config.domain_min;
      $("#temp_max_input").val("" + temperatureMaxi.toFixed(2));
      general_config.temp_array = [
        parseFloat($("#temp_min_input").val()) + 273.15,
        parseFloat($("#temp_max_input").val()) + 273.15,
      ];

      create_legend(
        general_config.temp_array,
        general_config.domain_min,
        general_config.domain_max,
        width,
        height
      );
      create_histograme_rect();
    }

    function dragended2(d) {
      line.classed("dragging", false);

      recreate_scene();
    }
  }

  function create_legend(
    temp_array,
    domain_min,
    domain_max,
    diag_width,
    diag_height
  ) {
    d3.selectAll(".color_scale_rectangle").remove();

    if (general_config.active_color_control == 1) {
      var color_array = [
        "#39519E",
        "#3C60A4",
        "#5C8DC0",
        "#8FC1DC",
        "#ACD7E7",
        "#DFE5CD",
        "#FCC97D",
        "#FCAC64",
        "#F5844D",
        "#CD322C",
      ];

      var scale_width =
        ((temp_array[1] - 273.15 - domain_min) / (domain_max - domain_min)) *
          diag_width -
        ((temp_array[0] - 273.15 - domain_min) / (domain_max - domain_min)) *
          diag_width;

      for (var m = 0; m < color_array.length; m++) {
        if (general_config.temp_filter == true) {
          svg
            .append("rect")
            .attr(
              "x",
              ((temp_array[0] - 273.15 - domain_min) /
                (domain_max - domain_min)) *
                diag_width +
                m * (scale_width / color_array.length)
            )
            .attr("y", 0)
            .attr("height", diag_height)
            .attr("width", scale_width / color_array.length)
            .attr("fill", color_array[m])
            .attr("class", "color_scale_rectangle")
            .attr("z-index", -5);
        } else {
          if (m == 0) {
            svg
              .append("rect")
              .attr("x", 0)
              .attr("y", 0)
              .attr("height", diag_height)
              .attr(
                "width",
                ((temp_array[0] - 273.15 - domain_min) /
                  (domain_max - domain_min)) *
                  diag_width +
                  m * (scale_width / color_array.length) +
                  scale_width / color_array.length
              )
              .attr("fill", color_array[m])
              .attr("class", "color_scale_rectangle")
              .attr("z-index", -5);
          } else if (m == color_array.length - 1) {
            svg
              .append("rect")
              .attr(
                "x",
                ((temp_array[0] - 273.15 - domain_min) /
                  (domain_max - domain_min)) *
                  diag_width +
                  m * (scale_width / color_array.length)
              )
              .attr("y", 0)
              .attr("height", diag_height)
              .attr(
                "width",
                domain_max * width -
                  (((temp_array[0] - 273.15 - domain_min) /
                    (domain_max - domain_min)) *
                    diag_width +
                    m * (scale_width / color_array.length))
              )
              .attr("fill", color_array[m])
              .attr("class", "color_scale_rectangle")
              .attr("z-index", -5);
          } else {
            svg
              .append("rect")
              .attr(
                "x",
                ((temp_array[0] - 273.15 - domain_min) /
                  (domain_max - domain_min)) *
                  diag_width +
                  m * (scale_width / color_array.length)
              )
              .attr("y", 0)
              .attr("height", diag_height)
              .attr("width", scale_width / color_array.length)
              .attr("fill", color_array[m])
              .attr("class", "color_scale_rectangle")
              .attr("z-index", -5);
          }
        }
      }
    } else if (general_config.active_color_control == 2) {
      var color_array = [
        "#003476",
        "#5780CC",
        "#B8C5EC",
        "#EEB8B9",
        "#C46363",
        "#651819",
      ];
      var temp_values_array = [
        297.92,
        298.4,
        298.98,
        299.36,
        299.64,
        300.02,
        300.8,
      ];

      for (var m = 0; m < color_array.length; m++) {
        var scale_width =
          ((temp_values_array[m + 1] - 273.15 - domain_min) /
            (domain_max - domain_min)) *
            diag_width -
          ((temp_values_array[m] - 273.15 - domain_min) /
            (domain_max - domain_min)) *
            diag_width;
        svg
          .append("rect")
          .attr(
            "x",
            ((temp_values_array[m] - 273.15 - domain_min) /
              (domain_max - domain_min)) *
              diag_width
          )
          .attr("y", 0)
          .attr("height", diag_height)
          .attr("width", scale_width)
          .attr("fill", color_array[m])
          .attr("class", "color_scale_rectangle")
          .attr("z-index", -5);
      }
    }
  }

  function create_histograme_rect() {
    d3.selectAll(".hist_rect").remove();
    for (var m = 0; m < general_config.bins.length; m++) {
      if (
        general_config.bins[m].length > 0 &&
        general_config.bins[m] != undefined
      ) {
        var hist_width =
          ((general_config.bins[m].x1 - general_config.domain_min) /
            (general_config.domain_max - general_config.domain_min)) *
            width -
          ((general_config.bins[m].x0 - general_config.domain_min) /
            (general_config.domain_max - general_config.domain_min)) *
            width;
        svg
          .append("rect")
          .attr(
            "x",
            ((general_config.bins[m].x0 - general_config.domain_min) /
              (general_config.domain_max - general_config.domain_min)) *
              width
          )
          .attr("y", 0)
          .attr("height", function (d) {
            return height - y(general_config.bins[m].length);
          })
          //.attr("height", height)
          .attr("width", hist_width)
          .attr("transform", function (d) {
            return (
              "translate(" + 0 + "," + y(general_config.bins[m].length) + ")"
            );
          })
          .attr("fill", "#ddffc5")
          .attr("class", "hist_rect")
          .attr("z-index", -5);
      }
    }
  }

  let borne_temp_min = document.querySelector("#rect_temp_min");
  let borne_temp_max = document.querySelector("#rect_temp_max");
  let minDomainMax =
    (borne_temp_max.x.baseVal.value / width) *
      (general_config.domain_max - general_config.domain_min) +
    general_config.domain_min;
  let maxDomainMin =
    (borne_temp_min.x.baseVal.value / width) *
      (general_config.domain_max - general_config.domain_min) +
    general_config.domain_min;
  let div_inputs_flex = `<div id='domain_inputs_flex'> </div>`;
  let div_inputs_min = `<div id="div_inputs_min"></div>`;
  let div_inputs_max = `<div id="div_inputs_max"></div>`;
  let inputMin = `<input type='number' id='domain_min_input' max='${
    parseInt(maxDomainMin) - 1
  }' step='1' value ='${general_config.domain_min}'/>`;
  let inputMax = `<input type='number' id='domain_max_input' min='${
    parseInt(minDomainMax) + 1
  }' step='1' value ='${general_config.domain_max}'/>`;
  $("#temp_histogram_content").append(div_inputs_flex);
  $("#domain_inputs_flex").append(div_inputs_min);
  $("#domain_inputs_flex").append(div_inputs_max);
  $("#div_inputs_min").append(inputMin);
  $("#div_inputs_max").append(inputMax);
  $("#domain_min_input").on("change", changeDomainMin);
  function changeDomainMin() {
    general_config.domain_min = parseInt($("#domain_min_input").val());
    create_temp_histogram();
  }
  $("#domain_max_input").on("change", changeDomainMax);
  function changeDomainMax() {
    general_config.domain_max = parseInt($("#domain_max_input").val());
    create_temp_histogram();
  }
}

export function getRoadColor(type) {
  var color = { r: 100, g: 100, b: 100 };
  var color_hex;
  switch (type) {
    case "highway":
      color_hex = "#a71d1d";
      break;
    case "primary":
      color_hex = "#a71d1d";
      break;
    case "secondary":
      color_hex = "#f4ad05";
      break;
    case "residential":
      color_hex = "#f4ad05";
      break;
    case "tertiary":
      color_hex = "#06e270";
      break;
    case "unclassified":
      color_hex = "#06e270";
      break;
    default:
      color_hex = "#06e270";
  }

  var color_rgb = hexToRgb(color_hex);
  color.r = color_rgb.r / 255;
  color.g = color_rgb.g / 255;
  color.b = color_rgb.b / 255;

  return color;
}

export function create_data_texture(
  Meso_NH,
  MesoNH_U,
  MesoNH_V,
  x_length,
  y_length,
  z_length,
  temp_min,
  temp_max
) {
  /*
		fonction affectant les valeurs correspondantes aux différents éléments de general_config.data_volume_3D, à partir des données extraites des CSV
		Meso_NH est la variables stockant les informations du fichier CSV relatif au point O
		Meso_NH est la variables stockant les informations du fichier CSV relatif au point U
		Meso_NH est la variables stockant les informations du fichier CSV relatif au point V
		x_length, y_length, z_length sont les dimensions de la grille de température 3D
		
		les variables stockées dans general_config.data_volume_3D seront passés en paramètres des shaders 
		"x_length": dimension de la grille de température 3D en X
        "y_length": dimension de la grille de température 3D en Y
        "z_length": dimension de la grille de température 3D en Z
        "data": liste de l'ensemble des temperatures normalisées, permettant de créer une datatexture 3D grâce aux dimensions x_length, y_length et z_length.
        "data_temp": liste de l'ensemble des temperatures, permettant de créer une datatexture 3D grâce aux dimensions x_length, y_length et z_length.
        "data_zs": liste de l'ensemble des altitudes du sol dans le modèle meso-nh (données provenant des netcdf), permettant de créer une datatexture 2D grâce aux dimensions x_length, y_length
        "limit_teb": liste des hauteurs des limites de chaque niveau TEB, permettant de créer une datatexture 3D grâce aux dimensions x_length, y_length et le nombre de niveau TEB.
		"limit_meso": liste des hauteurs des limites de chaque niveau Meso-NH, permettant de créer une datatexture 3D grâce aux dimensions x_length, y_length et le nombre de niveau TEB.
		"temp_min": temperature min dans la grille
        "temp_max": temperature min dans la grille
		"x_min": x min dans la grille
		"x_max": x min dans la grille
		"y_min": y min dans la grille
		"y_max": y max dans la grille
		"z_min_teb": z min pour le modèle TEB
		"z_max_teb": z max pour le modèle Meso-nH
		"z_min_meso": z min pour le modèle TEB
		"z_max_meso": z max pour le modèle Meso-nH
		"data_zs_teb": liste de l'ensemble des altitudes du sol dans le modèle teb (données calculées à partir des données des netcdf en utilisant la formule de galchen), permettant de créer une datatexture 2D grâce aux dimensions x_length, y_length
		"temp_by_id": utilisé pour la création de l'histogramme de temperatures
		
		"data_x_center_teb": ensemble des coordonnées x des centres de cellules TEB
		"data_y_center_teb": ensemble des coordonnées y des centres de cellules TEB
		"data_z_center_teb": ensemble des coordonnées z des centres de cellules TEB
		
		
	*/
  var volume = {
    x_length: x_length,
    y_length: y_length,
    z_length: z_length,
    data: null,
    data_temp: null,
    data_zs: null,
    limit_teb: null,
    limit_meso: null,
    temp_min: parseFloat(temp_min),
    temp_max: parseFloat(temp_max),
    x_min: null,
    x_max: null,
    y_min: null,
    y_max: null,
    z_min_teb: null,
    z_max_teb: null,
    z_min_meso: null,
    z_max_meso: null,
    data_zs_teb: null,
    temp_by_id: null,
	data_x_center_teb: null,
	data_y_center_teb: null,
	data_z_center_teb: null
  };

  var data_array = [],
    data_array_temp = [],
    data_zs = [],
    data_limit_teb = [],
    date_limit_meso = [];

  var data_tebzh_1 = [],
    data_tebzh_2 = [],
    data_tebzh_3 = [],
    data_tebzh_4 = [],
    data_tebzh_5 = [],
    data_tebzh_6 = [],
    data_tebzh_7 = [];

  var z_min_teb = null;
  var z_max_teb = null;
  var z_min_meso = null;
  var z_max_meso = null;

  var data_tebz_6 = [];
  var data_mesoz_2 = [];
  var data_mesoz_3 = [];

  var data_zs_teb = [];

  for (var t = 0; t < Meso_NH.length; t++) {
    data_zs.push(Meso_NH[t].zs);
    var zh = 0;
    data_tebzh_1.push(zh);
    data_tebzh_2.push(
      parseFloat(Meso_NH[t].tebz_1) + (parseFloat(Meso_NH[t].tebz_1) - zh)
    );
    zh = parseFloat(Meso_NH[t].tebz_1) + (parseFloat(Meso_NH[t].tebz_1) - zh);
    data_tebzh_3.push(
      parseFloat(Meso_NH[t].tebz_2) + (parseFloat(Meso_NH[t].tebz_2) - zh)
    );
    zh = parseFloat(Meso_NH[t].tebz_2) + (parseFloat(Meso_NH[t].tebz_2) - zh);
    data_tebzh_4.push(
      parseFloat(Meso_NH[t].tebz_3) + (parseFloat(Meso_NH[t].tebz_3) - zh)
    );
    zh = parseFloat(Meso_NH[t].tebz_3) + (parseFloat(Meso_NH[t].tebz_3) - zh);
    data_tebzh_5.push(
      parseFloat(Meso_NH[t].tebz_4) + (parseFloat(Meso_NH[t].tebz_4) - zh)
    );
    zh = parseFloat(Meso_NH[t].tebz_4) + (parseFloat(Meso_NH[t].tebz_4) - zh);
    data_tebzh_6.push(
      parseFloat(Meso_NH[t].tebz_5) + (parseFloat(Meso_NH[t].tebz_5) - zh)
    );
    zh = parseFloat(Meso_NH[t].tebz_5) + (parseFloat(Meso_NH[t].tebz_5) - zh);
    data_tebzh_7.push(
      parseFloat(Meso_NH[t].tebz_6) + (parseFloat(Meso_NH[t].tebz_6) - zh)
    );
    zh = parseFloat(Meso_NH[t].tebz_6) + (parseFloat(Meso_NH[t].tebz_6) - zh);

    data_tebz_6.push(parseFloat(Meso_NH[t].tebz_6));
    data_mesoz_2.push(
      general_config.THAT_W[1] *
        ((general_config.THAT_W[general_config.THAT_W.length - 1] -
          parseFloat(Meso_NH[t].zs)) /
          general_config.THAT_W[general_config.THAT_W.length - 1]) +
        parseFloat(Meso_NH[t].zs)
    );
    data_mesoz_3.push(
      general_config.THAT_W[2] *
        ((general_config.THAT_W[general_config.THAT_W.length - 1] -
          parseFloat(Meso_NH[t].zs)) /
          general_config.THAT_W[general_config.THAT_W.length - 1]) +
        parseFloat(Meso_NH[t].zs)
    );

    data_zs_teb.push(
      data_mesoz_2[t] + (data_mesoz_3[t] - data_mesoz_2[t]) / 2 - data_tebz_6[t]
    );
  }

  z_min_teb = 0;
  z_max_teb = 0;
  z_min_meso = 0;
  z_max_meso = 0;

  for (var t = 0; t < Meso_NH.length; t++) {
    data_limit_teb.push(data_zs_teb[t] + data_tebzh_1[t]);
    if (data_zs_teb[t] + data_tebzh_1[t] < z_min_teb) {
      z_min_teb = data_zs_teb[t] + data_tebzh_1[t];
    }
  }
  for (var t = 0; t < Meso_NH.length; t++) {
    data_limit_teb.push(data_zs_teb[t] + data_tebzh_2[t]);
  }
  for (var t = 0; t < Meso_NH.length; t++) {
    data_limit_teb.push(data_zs_teb[t] + data_tebzh_3[t]);
  }
  for (var t = 0; t < Meso_NH.length; t++) {
    data_limit_teb.push(data_zs_teb[t] + data_tebzh_4[t]);
  }
  for (var t = 0; t < Meso_NH.length; t++) {
    data_limit_teb.push(data_zs_teb[t] + data_tebzh_5[t]);
  }
  for (var t = 0; t < Meso_NH.length; t++) {
    data_limit_teb.push(data_zs_teb[t] + data_tebzh_6[t]);
  }
  for (var t = 0; t < Meso_NH.length; t++) {
    data_limit_teb.push(data_zs_teb[t] + data_tebzh_7[t]);
    if (data_zs_teb[t] + data_tebzh_7[t] > z_max_teb) {
      z_max_teb = data_zs_teb[t] + data_tebzh_7[t];
    }
  }

  var temp_teb_1 = [];
  var temp_teb_2 = [];
  var temp_teb_3 = [];
  var temp_teb_4 = [];
  var temp_teb_5 = [];
  var temp_teb_6 = [];

  for (var t = 0; t < Meso_NH.length; t++) {
    if (Meso_NH[t].teb_1 != 999) {
      temp_teb_1.push(parseFloat(Meso_NH[t].teb_1));
      temp_teb_2.push(parseFloat(Meso_NH[t].teb_2));
      temp_teb_3.push(parseFloat(Meso_NH[t].teb_3));
      temp_teb_4.push(parseFloat(Meso_NH[t].teb_4));
      temp_teb_5.push(parseFloat(Meso_NH[t].teb_5));
      temp_teb_6.push(parseFloat(Meso_NH[t].teb_6));
    }
  }

  var temp_by_id = [];

  for (var id = 1; id <= 6; id++) {
    var new_temp_by_id = { id: "SBL_" + id, temp: [] };
    for (var t = 0; t < Meso_NH.length; t++) {
      data_array_temp.push(Meso_NH[t]["teb_" + id]);
      new_temp_by_id.temp.push(Meso_NH[t]["teb_" + id]);
    }
    temp_by_id.push(new_temp_by_id);
  }

  for (var t = 0; t < Meso_NH.length; t++) {
    date_limit_meso.push(
      general_config.THAT_W[0] *
        ((general_config.THAT_W[general_config.THAT_W.length - 1] -
          parseFloat(Meso_NH[t].zs)) /
          general_config.THAT_W[general_config.THAT_W.length - 1]) +
        parseFloat(Meso_NH[t].zs)
    );
    if (
      general_config.THAT_W[0] *
        ((general_config.THAT_W[general_config.THAT_W.length - 1] -
          parseFloat(Meso_NH[t].zs)) /
          general_config.THAT_W[general_config.THAT_W.length - 1]) +
        parseFloat(Meso_NH[t].zs) <
      z_min_meso
    ) {
      z_min_meso =
        general_config.THAT_W[0] *
          ((general_config.THAT_W[general_config.THAT_W.length - 1] -
            parseFloat(Meso_NH[t].zs)) /
            general_config.THAT_W[general_config.THAT_W.length - 1]) +
        parseFloat(Meso_NH[t].zs);
    }
  }
	
  for (var id = 2; id <= 32; id++) {
    var new_temp_by_id = { id: "Meso_" + id, temp: [] };
    for (var t = 0; t < Meso_NH.length; t++) {
      data_array_temp.push(Meso_NH[t]["tht_" + id]);

      new_temp_by_id.temp.push(Meso_NH[t]["tht_" + id]);

      date_limit_meso.push(
        general_config.THAT_W[id - 1] *
          ((general_config.THAT_W[general_config.THAT_W.length - 1] -
            parseFloat(Meso_NH[t].zs)) /
            general_config.THAT_W[general_config.THAT_W.length - 1]) +
          parseFloat(Meso_NH[t].zs)
      );
    }
    temp_by_id.push(new_temp_by_id);
  }

  for (var t = 0; t < Meso_NH.length; t++) {
    date_limit_meso.push(
      general_config.THAT_W[31] *
        ((general_config.THAT_W[general_config.THAT_W.length - 1] -
          parseFloat(Meso_NH[t].zs)) /
          general_config.THAT_W[general_config.THAT_W.length - 1]) +
        parseFloat(Meso_NH[t].zs) +
        (general_config.THAT[general_config.THAT.length - 1] -
          general_config.THAT_W[general_config.THAT_W.length - 1]) *
          2
    );
    if (
      general_config.THAT_W[31] *
        ((general_config.THAT_W[general_config.THAT_W.length - 1] -
          parseFloat(Meso_NH[t].zs)) /
          general_config.THAT_W[general_config.THAT_W.length - 1]) +
        parseFloat(Meso_NH[t].zs) +
        (general_config.THAT[general_config.THAT.length - 1] -
          general_config.THAT_W[general_config.THAT_W.length - 1]) *
          2 >
      z_max_meso
    ) {
      z_max_meso =
        general_config.THAT_W[31] *
          ((general_config.THAT_W[general_config.THAT_W.length - 1] -
            parseFloat(Meso_NH[t].zs)) /
            general_config.THAT_W[general_config.THAT_W.length - 1]) +
        parseFloat(Meso_NH[t].zs) +
        (general_config.THAT[general_config.THAT.length - 1] -
          general_config.THAT_W[general_config.THAT_W.length - 1]) *
          2;
    }
  }

  for (var t = 0; t < data_array_temp.length; t++) {
    data_array.push((data_array_temp[t] - temp_min) / (temp_max - temp_min));
  }

  var x_min = null;
  var x_max = null;
  var y_min = null;
  var y_max = null;

  for (var t = 0; t < Meso_NH.length; t++) {
    var x_o = Meso_NH[t].x - general_config.Coord_X_paris;
    var y_o = Meso_NH[t].y - general_config.Coord_Y_paris;
    var l_x = (Meso_NH[t].x - MesoNH_U[t].x) * 2;
    var l_y = (Meso_NH[t].y - MesoNH_V[t].y) * 2;
    if (x_min != null && x_max != null) {
      if (x_o - l_x / 2 < x_min) {
        x_min = x_o - l_x / 2;
      }
      if (x_o + l_x / 2 > x_max) {
        x_max = x_o + l_x / 2;
      }
    } else {
      x_min = x_o - l_x / 2;
      x_max = x_o + l_x / 2;
    }

    if (y_min != null && y_max != null) {
      if (y_o - l_y / 2 < y_min) {
        y_min = y_o - l_y / 2;
      }
      if (y_o + l_y / 2 > y_max) {
        y_max = y_o + l_y / 2;
      }
    } else {
      y_min = y_o - l_y / 2;
      y_max = y_o + l_y / 2;
    }
  }
  
  var data_x_center_teb_tab= []
  for(var n =0; n<6; n++){
	  for (var t = 0; t < Meso_NH.length; t++) {
		  data_x_center_teb_tab.push(Meso_NH[t].x)
	  }
  }
  
  var data_y_center_teb_tab= []
  for(var n =0; n<6; n++){
	  for (var t = 0; t < Meso_NH.length; t++) {
		  data_y_center_teb_tab.push(Meso_NH[t].y)
	  }
  }
  
  var data_z_center_teb_tab= []
  for (var t = 0; t < Meso_NH.length; t++) {
	  data_z_center_teb_tab.push(data_zs_teb[t] + Meso_NH[t].tebz_1)
  }
  for (var t = 0; t < Meso_NH.length; t++) {
	  data_z_center_teb_tab.push(data_zs_teb[t] + Meso_NH[t].tebz_2)
  }
  for (var t = 0; t < Meso_NH.length; t++) {
	  data_z_center_teb_tab.push(data_zs_teb[t] + Meso_NH[t].tebz_3)
  }
  for (var t = 0; t < Meso_NH.length; t++) {
	  data_z_center_teb_tab.push(data_zs_teb[t] + Meso_NH[t].tebz_4)
  }
  for (var t = 0; t < Meso_NH.length; t++) {
	  data_z_center_teb_tab.push(data_zs_teb[t] + Meso_NH[t].tebz_5)
  }
  for (var t = 0; t < Meso_NH.length; t++) {
	  data_z_center_teb_tab.push(data_zs_teb[t] + Meso_NH[t].tebz_6)
  }
  

  var data_array_32 = new Float32Array(data_array);
  var data_array_temp_32 = new Float32Array(data_array_temp);
  var data_zs_32 = new Float32Array(data_zs);
  var data_limit_teb_32 = new Float32Array(data_limit_teb);
  var data_limit_meso_32 = new Float32Array(date_limit_meso);
  
  var data_x_center_teb_32 = new Float32Array(data_x_center_teb_tab);
  var data_y_center_teb_32 = new Float32Array(data_y_center_teb_tab);
  var data_z_center_teb_32 = new Float32Array(data_z_center_teb_tab);

  volume.data = data_array_32;
  volume.data_temp = data_array_temp_32;
  volume.data_zs = data_zs_32;
  volume.limit_meso = data_limit_meso_32;
  volume.limit_teb = data_limit_teb_32;
  volume.x_min = x_min;
  volume.x_max = x_max;
  volume.y_min = y_min;
  volume.y_max = y_max;
  volume.data_zs_teb = data_zs_teb;
  volume.z_min_teb = z_min_teb;
  volume.z_max_teb = z_max_teb;
  volume.z_min_meso = z_min_meso;
  volume.z_max_meso = z_max_meso;
  volume.temp_by_id = temp_by_id;
  volume.data_x_center_teb = data_x_center_teb_32;
  volume.data_y_center_teb = data_y_center_teb_32;
  volume.data_z_center_teb = data_z_center_teb_32;
	console.log(volume)
  return volume;
}

export function set_lights() {
  light_ambient = 0.6;
  var light_contrast = 0.1;
  var x = light_contrast * Math.sqrt(3);
  light_direction[0] = new THREE.Vector3(x, x, x);
  light_direction[1] = new THREE.Vector3(-x, x, -x);
}

export function add_hide_buildings() {
  if ($("#buildings_presence_input").is(":checked") == true) {
    scene.add(general_config.grid_building);
  } else {
    if (general_config.grid_building != null) {
      scene.remove(general_config.grid_building);
    }
  }

  if ($("#buildings_print_presence_input").is(":checked") == true) {
    scene.add(general_config.grid_building_print);
  } else {
    if (general_config.grid_building_print != null) {
      scene.remove(general_config.grid_building_print);
    }
  }
}

export function add_remove_filtering() {
  if ($("#temp_filter_ckbx").is(":checked") == true) {
    general_config.temp_filter = true;
  } else {
    general_config.temp_filter = false;
  }

  if ($("#z_filter_ckbx").is(":checked") == true) {
    general_config.z_filter = true;
  } else {
    general_config.z_filter = false;
  }

  if ($("#h_filter_ckbx").is(":checked") == true) {
    general_config.h_filter = true;
  } else {
    general_config.h_filter = false;
  }

  if ($("#x_filter_ckbx").is(":checked") == true) {
    general_config.x_filter = true;
  } else {
    general_config.x_filter = false;
  }

  if ($("#y_filter_ckbx").is(":checked") == true) {
    general_config.y_filter = true;
  } else {
    general_config.y_filter = false;
  }

  recreate_scene();
}

/**
 * Cette fonction permet de calculer les temperatures moyennes en degré celsius de chaque niveau teb et de tous
 * les niveaux teb dans chaque fichier.
 * @return {list} avg_list
 */
export function calculate_avg_temperature() {
  let avg_list = [];
  general_config.netcdf_list.forEach((file) => {
    let formatted_date = file.globalData.date.getDate() + "-" + (file.globalData.date.getMonth() + 1) + "-" +  file.globalData.date.getFullYear()+ " " + file.globalData.date.getHours() + ":" + file.globalData.date.getMinutes() + ":" + file.globalData.date.getSeconds() 
    let v = {
      date1:  new Date(file.globalData.date).getTime(),
      date : file.globalData.date,
      dateString: formatted_date,
      teb_1: 0,
      teb_2: 0,
      teb_3: 0,
      teb_4: 0,
      teb_5: 0,
      teb_6: 0,
      globalAvg: 0
    };
    let compteur = [0,0,0,0,0,0];
    file.listePoints.forEach((point) => {
      if (point.teb_1 != 999) {
        v.teb_1 += point.teb_1;
        compteur[0] += 1;
      }
      if (point.teb_2 != 999) {
        v.teb_2 += point.teb_2;
        compteur[1] += 1;
      }

      if (point.teb_3 != 999) {
        v.teb_3 += point.teb_3;
        compteur[2] += 1;
      }

      if (point.teb_4 != 999) {
        v.teb_4 += point.teb_4;
        compteur[3] += 1;
      }

      if (point.teb_5 != 999) {
        v.teb_5 += point.teb_5;
        compteur[4] += 1;
      }

      if (point.teb_6 != 999) {
        v.teb_6 += point.teb_6;
        compteur[5] += 1;
      }
    });
    v.teb_1 = v.teb_1 / compteur[0] - 273,15;
    v.teb_2 = v.teb_2 / compteur[1]-273,15;
    v.teb_3 = v.teb_3 / compteur[2]-273,15;
    v.teb_4 = v.teb_4 / compteur[3]-273,15;
    v.teb_5 = v.teb_5 / compteur[4]-273,15;
    v.teb_6 = v.teb_6 / compteur[5]-273,15;
    v.globalAvg = (v.teb_1 + v.teb_2 + v.teb_3 + v.teb_4 + v.teb_5 + v.teb_6) / 6;
    avg_list.push(v);
  });
  avg_list.sort((v1, v2) => {
    return v1.date - v2.date
  })
  return avg_list;
}
