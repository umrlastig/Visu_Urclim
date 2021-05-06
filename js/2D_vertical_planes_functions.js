function import_road_geojson(geojson_file,grid,scene) {

	var features_points_array = [];
	var features_color_array = [];
	var features_normal_array = [];
	
	var roads_height = 25;
	
	var texture = new THREE.DataTexture3D( general_config.data_volume_3D.data_temp, general_config.data_volume_3D.x_length, general_config.data_volume_3D.y_length, general_config.data_volume_3D.z_length );
	texture.format = THREE.RedFormat;
	texture.type = THREE.FloatType;
	texture.unpackAlignment = 1;

	var texture_zs = new THREE.DataTexture( general_config.data_volume_3D.data_zs, general_config.data_volume_3D.x_length, general_config.data_volume_3D.y_length);
	texture_zs.format = THREE.RedFormat;
	texture_zs.type = THREE.FloatType;
	texture_zs.unpackAlignment = 1;
	
	// Colormap textures
	cmtextures = {
		blue_red_2: new THREE.TextureLoader().load( 'color/blue_red_2.png', render )
	};
	
	
	var clim_1 = (general_config.temp_array[0] - general_config.data_volume_3D.temp_min)/(general_config.data_volume_3D.temp_max - general_config.data_volume_3D.temp_min);
	var clim_2 = (general_config.temp_array[1] - general_config.data_volume_3D.temp_min)/(general_config.data_volume_3D.temp_max - general_config.data_volume_3D.temp_min);
	if(clim_1 < 0){
		clim_1 = 0;
	}
	if(clim_1 > 1){
		clim_1 = 1;
	}
	if(clim_2 < 0){
		clim_2 = 0;
	}
	if(clim_2 > 1){
		clim_2 = 1;
	}

	
	var limit_meso_array = [1.0,2.0,4.0,6.0,9.0,13.0,47.0,60.0,132.0,218.4,322.1,446.5,595.8,775.0,989.9,1247.9,1557.5,1929.0,2374.8,2909.8,3551.8,4251.8,4951.8,5651.8,6351.8,7051.8,7751.8,8451.8,9151.8,9851.8,10551.8,11251.8,11951.8,12651.8,13351.8,14051.8,14751.8,15451.8];	
		
	var road_material = new THREE.ShaderMaterial( {
						side: THREE.DoubleSide,
						uniforms: {
							u_data: { value: texture },
							zs_data: { value: texture_zs},
							u_cmdata: { value: cmtextures.blue_red_2 },
							u_clim: { value: [general_config.temp_array[0],general_config.temp_array[1]] },
							u_size: { value: [general_config.data_volume_3D.x_length, general_config.data_volume_3D.y_length, general_config.data_volume_3D.z_length] },
							x_min:{type: "f", value: 154.3850000000093},
							x_max:{type: "f", value: 779.4010000000708},
							y_min:{type: "f", value: 604.3519999999553},
							y_max:{type: "f", value: 1227.0260000005364},
							zs: {type: "f", value: 46.81231},
							mesolimit: {value: limit_meso_array},
							cst_X: {value: general_config.cst_X},
							cst_Y: {value: general_config.cst_Y},
							cst_Z: {value: general_config.cst_Z},
						},
						vertexShader: document.getElementById( 'vertexshader_3D_plane' ).textContent,
						fragmentShader: document.getElementById( 'fragmentshader_3D_plane' ).textContent
					} );

		
	  for(var a =0; a< geojson_file.features.length - 1; a++){
			var feature_1 = geojson_file.features[a];
			var feature_2 = geojson_file.features[a+1];
			
			if(feature_2.properties.id_road != feature_1.properties.id_road){
				continue;
			} else {
						
			var building_color = getRoadColor(feature_1.properties.type); 
						
			features_points_array.push((feature_1.geometry.coordinates[0]-general_config.Coord_X_paris)*general_config.cst_X);features_points_array.push(feature_1.properties.MNT*general_config.cst_Z);features_points_array.push(-(feature_1.geometry.coordinates[1]-general_config.Coord_Y_paris)*general_config.cst_Y);
			features_points_array.push((feature_1.geometry.coordinates[0]-general_config.Coord_X_paris)*general_config.cst_X);features_points_array.push((feature_1.properties.MNT + roads_height)*general_config.cst_Z);features_points_array.push(-(feature_1.geometry.coordinates[1]-general_config.Coord_Y_paris)*general_config.cst_Y);
			features_points_array.push((feature_2.geometry.coordinates[0]-general_config.Coord_X_paris)*general_config.cst_X);features_points_array.push(feature_2.properties.MNT*general_config.cst_Z);features_points_array.push(-(feature_2.geometry.coordinates[1]-general_config.Coord_Y_paris)*general_config.cst_Y);
			
			features_points_array.push((feature_1.geometry.coordinates[0]-general_config.Coord_X_paris)*general_config.cst_X);features_points_array.push((feature_1.properties.MNT + roads_height)*general_config.cst_Z);features_points_array.push(-(feature_1.geometry.coordinates[1]-general_config.Coord_Y_paris)*general_config.cst_Y);
			features_points_array.push((feature_2.geometry.coordinates[0]-general_config.Coord_X_paris)*general_config.cst_X);features_points_array.push((feature_2.properties.MNT + roads_height)*general_config.cst_Z);features_points_array.push(-(feature_2.geometry.coordinates[1]-general_config.Coord_Y_paris)*general_config.cst_Y);
			features_points_array.push((feature_2.geometry.coordinates[0]-general_config.Coord_X_paris)*general_config.cst_X);features_points_array.push(feature_2.properties.MNT*general_config.cst_Z);features_points_array.push(-(feature_2.geometry.coordinates[1]-general_config.Coord_Y_paris)*general_config.cst_Y);
			
			var N_X = - ((feature_2.properties.MNT + roads_height)*general_config.cst_Z-feature_1.properties.MNT*general_config.cst_Z)*((feature_2.geometry.coordinates[1]-general_config.Coord_Y_paris)*general_config.cst_Y-(feature_1.geometry.coordinates[1]-general_config.Coord_Y_paris)*general_config.cst_Y);
			var N_Y = ((feature_2.properties.MNT + roads_height)*general_config.cst_Z-feature_1.properties.MNT*general_config.cst_Z)*((feature_2.geometry.coordinates[0]-general_config.Coord_X_paris)*general_config.cst_X-(feature_1.geometry.coordinates[0]-general_config.Coord_X_paris)*general_config.cst_X);
			
			var normal_vector = new THREE.Vector2( N_X, N_Y );
			normal_vector.normalize();
			
			features_normal_array.push(normal_vector.x);features_normal_array.push(0);features_normal_array.push(normal_vector.y);
			features_normal_array.push(normal_vector.x);features_normal_array.push(0);features_normal_array.push(normal_vector.y);
			features_normal_array.push(normal_vector.x);features_normal_array.push(0);features_normal_array.push(normal_vector.y);
			features_normal_array.push(normal_vector.x);features_normal_array.push(0);features_normal_array.push(normal_vector.y);
			features_normal_array.push(normal_vector.x);features_normal_array.push(0);features_normal_array.push(normal_vector.y);
			features_normal_array.push(normal_vector.x);features_normal_array.push(0);features_normal_array.push(normal_vector.y);
											
			features_color_array.push(building_color.r);features_color_array.push(building_color.g);features_color_array.push(building_color.b);
			features_color_array.push(building_color.r);features_color_array.push(building_color.g);features_color_array.push(building_color.b);
			features_color_array.push(building_color.r);features_color_array.push(building_color.g);features_color_array.push(building_color.b);
			features_color_array.push(building_color.r);features_color_array.push(building_color.g);features_color_array.push(building_color.b);
			features_color_array.push(building_color.r);features_color_array.push(building_color.g);features_color_array.push(building_color.b);
			features_color_array.push(building_color.r);features_color_array.push(building_color.g);features_color_array.push(building_color.b);
			}
						
			
	  }
	  
	  var feature_coord_array_32 = new Float32Array(features_points_array);
		var feature_colors_32 = new Float32Array(features_color_array);
		var feature_normal_32 = new Float32Array(features_normal_array);		
		    
		var feature_material = new THREE.MeshPhongMaterial( { vertexColors: THREE.VertexColors, emissive: 0x072534, side: THREE.DoubleSide, flatShading: true } );
		var feature_bufferGeometry = new THREE.BufferGeometry();
        
		feature_bufferGeometry.setAttribute( 'position', new THREE.BufferAttribute( feature_coord_array_32, 3 ) );
		feature_bufferGeometry.setAttribute( 'normal', new THREE.BufferAttribute( feature_normal_32, 3 ) );
		feature_bufferGeometry.setAttribute( 'color', new THREE.BufferAttribute( feature_colors_32, 3 ) );
		var feature_mesh = new THREE.Mesh( feature_bufferGeometry, road_material);
			
		general_config.grid.add(feature_mesh);
		scene.add(general_config.grid);
		

	}
	
	
	
	function create_data_texture(Meso_NH, x_length, y_length, z_length, temp_min, temp_max){
		var volume = {
			"x_length": x_length,
			"y_length": y_length,
			"z_length": z_length,
			"data": null,
			"data_temp": null,
			"data_zs": null,
			"temp_min":parseFloat(temp_min),
			"temp_max":parseFloat(temp_max)
			};
			
		var data_array = [];
		var data_array_temp = [];
		var data_zs = [];
		
		for (var t=0; t< Meso_NH.length; t++){
			data_zs.push(Meso_NH[t].zs);
		}
		
		for (var t=0; t< Meso_NH.length; t++){
			var ratio_temp = (Meso_NH[t].teb_1- temp_min)/(temp_max-temp_min);
			data_array.push(ratio_temp);
			data_array_temp.push(Meso_NH[t].teb_1);
		}
		for (var t=0; t< Meso_NH.length; t++){
			var ratio_temp = (Meso_NH[t].teb_2- temp_min)/(temp_max-temp_min);
			data_array.push(ratio_temp);
			data_array_temp.push(Meso_NH[t].teb_2);
		}
		for (var t=0; t< Meso_NH.length; t++){
			var ratio_temp = (Meso_NH[t].teb_3- temp_min)/(temp_max-temp_min);
			data_array.push(ratio_temp);
			data_array_temp.push(Meso_NH[t].teb_3);
		}
		for (var t=0; t< Meso_NH.length; t++){
			var ratio_temp = (Meso_NH[t].teb_4- temp_min)/(temp_max-temp_min);
			data_array.push(ratio_temp);
			data_array_temp.push(Meso_NH[t].teb_4);
		}
		for (var t=0; t< Meso_NH.length; t++){
			var ratio_temp = (Meso_NH[t].teb_5- temp_min)/(temp_max-temp_min);
			data_array.push(ratio_temp);
			data_array_temp.push(Meso_NH[t].teb_5);
		}
		for (var t=0; t< Meso_NH.length; t++){
			var ratio_temp = (Meso_NH[t].teb_6- temp_min)/(temp_max-temp_min);
			data_array.push(ratio_temp);
			data_array_temp.push(Meso_NH[t].teb_6);
		}
		for (var t=0; t< Meso_NH.length; t++){
			var ratio_temp = (Meso_NH[t].tht_2- temp_min)/(temp_max-temp_min);
			data_array.push(ratio_temp);
			data_array_temp.push(Meso_NH[t].tht_2);
		}
		for (var t=0; t< Meso_NH.length; t++){
			var ratio_temp = (Meso_NH[t].tht_3- temp_min)/(temp_max-temp_min);
			data_array.push(ratio_temp);
			data_array_temp.push(Meso_NH[t].tht_3);
		}
		for (var t=0; t< Meso_NH.length; t++){
			var ratio_temp = (Meso_NH[t].tht_4- temp_min)/(temp_max-temp_min);
			data_array.push(ratio_temp);
			data_array_temp.push(Meso_NH[t].tht_4);
		}
		for (var t=0; t< Meso_NH.length; t++){
			var ratio_temp = (Meso_NH[t].tht_5- temp_min)/(temp_max-temp_min);
			data_array.push(ratio_temp);
			data_array_temp.push(Meso_NH[t].tht_5);
		}
		for (var t=0; t< Meso_NH.length; t++){
			var ratio_temp = (Meso_NH[t].tht_6- temp_min)/(temp_max-temp_min);
			data_array.push(ratio_temp);
			data_array_temp.push(Meso_NH[t].tht_6);
		}
		for (var t=0; t< Meso_NH.length; t++){
			var ratio_temp = (Meso_NH[t].tht_7- temp_min)/(temp_max-temp_min);
			data_array.push(ratio_temp);
			data_array_temp.push(Meso_NH[t].tht_7);
		}
		for (var t=0; t< Meso_NH.length; t++){
			var ratio_temp = (Meso_NH[t].tht_8- temp_min)/(temp_max-temp_min);
			data_array.push(ratio_temp);
			data_array_temp.push(Meso_NH[t].tht_8);
		}
		for (var t=0; t< Meso_NH.length; t++){
			var ratio_temp = (Meso_NH[t].tht_9- temp_min)/(temp_max-temp_min);
			data_array.push(ratio_temp);
			data_array_temp.push(Meso_NH[t].tht_9);
		}
		for (var t=0; t< Meso_NH.length; t++){
			var ratio_temp = (Meso_NH[t].tht_10- temp_min)/(temp_max-temp_min);
			data_array.push(ratio_temp);
			data_array_temp.push(Meso_NH[t].tht_10);
		}
		for (var t=0; t< Meso_NH.length; t++){
			var ratio_temp = (Meso_NH[t].tht_11- temp_min)/(temp_max-temp_min);
			data_array.push(ratio_temp);
			data_array_temp.push(Meso_NH[t].tht_11);
		}
		for (var t=0; t< Meso_NH.length; t++){
			var ratio_temp = (Meso_NH[t].tht_12- temp_min)/(temp_max-temp_min);
			data_array.push(ratio_temp);
			data_array_temp.push(Meso_NH[t].tht_12);
		}
		for (var t=0; t< Meso_NH.length; t++){
			var ratio_temp = (Meso_NH[t].tht_13- temp_min)/(temp_max-temp_min);
			data_array.push(ratio_temp);
			data_array_temp.push(Meso_NH[t].tht_13);
		}
		for (var t=0; t< Meso_NH.length; t++){
			var ratio_temp = (Meso_NH[t].tht_14- temp_min)/(temp_max-temp_min);
			data_array.push(ratio_temp);
			data_array_temp.push(Meso_NH[t].tht_14);
		}
		for (var t=0; t< Meso_NH.length; t++){
			var ratio_temp = (Meso_NH[t].tht_15- temp_min)/(temp_max-temp_min);
			data_array.push(ratio_temp);
			data_array_temp.push(Meso_NH[t].tht_15);
		}
		for (var t=0; t< Meso_NH.length; t++){
			var ratio_temp = (Meso_NH[t].tht_16- temp_min)/(temp_max-temp_min);
			data_array.push(ratio_temp);
			data_array_temp.push(Meso_NH[t].tht_16);
		}
		for (var t=0; t< Meso_NH.length; t++){
			var ratio_temp = (Meso_NH[t].tht_17- temp_min)/(temp_max-temp_min);
			data_array.push(ratio_temp);
			data_array_temp.push(Meso_NH[t].tht_17);
		}
		for (var t=0; t< Meso_NH.length; t++){
			var ratio_temp = (Meso_NH[t].tht_18- temp_min)/(temp_max-temp_min);
			data_array.push(ratio_temp);
			data_array_temp.push(Meso_NH[t].tht_18);
		}
		for (var t=0; t< Meso_NH.length; t++){
			var ratio_temp = (Meso_NH[t].tht_19- temp_min)/(temp_max-temp_min);
			data_array.push(ratio_temp);
			data_array_temp.push(Meso_NH[t].tht_19);
		}
		for (var t=0; t< Meso_NH.length; t++){
			var ratio_temp = (Meso_NH[t].tht_20- temp_min)/(temp_max-temp_min);
			data_array.push(ratio_temp);
			data_array_temp.push(Meso_NH[t].tht_20);
		}
		for (var t=0; t< Meso_NH.length; t++){
			var ratio_temp = (Meso_NH[t].tht_21- temp_min)/(temp_max-temp_min);
			data_array.push(ratio_temp);
			data_array_temp.push(Meso_NH[t].tht_21);
		}
		for (var t=0; t< Meso_NH.length; t++){
			var ratio_temp = (Meso_NH[t].tht_22- temp_min)/(temp_max-temp_min);
			data_array.push(ratio_temp);
			data_array_temp.push(Meso_NH[t].tht_22);
		}
		for (var t=0; t< Meso_NH.length; t++){
			var ratio_temp = (Meso_NH[t].tht_23- temp_min)/(temp_max-temp_min);
			data_array.push(ratio_temp);
			data_array_temp.push(Meso_NH[t].tht_23);
		}
		for (var t=0; t< Meso_NH.length; t++){
			var ratio_temp = (Meso_NH[t].tht_24- temp_min)/(temp_max-temp_min);
			data_array.push(ratio_temp);
			data_array_temp.push(Meso_NH[t].tht_24);
		}
		for (var t=0; t< Meso_NH.length; t++){
			var ratio_temp = (Meso_NH[t].tht_25- temp_min)/(temp_max-temp_min);
			data_array.push(ratio_temp);
			data_array_temp.push(Meso_NH[t].tht_25);
		}
		for (var t=0; t< Meso_NH.length; t++){
			var ratio_temp = (Meso_NH[t].tht_26- temp_min)/(temp_max-temp_min);
			data_array.push(ratio_temp);
			data_array_temp.push(Meso_NH[t].tht_26);
		}
		for (var t=0; t< Meso_NH.length; t++){
			var ratio_temp = (Meso_NH[t].tht_27- temp_min)/(temp_max-temp_min);
			data_array.push(ratio_temp);
			data_array_temp.push(Meso_NH[t].tht_27);
		}
		for (var t=0; t< Meso_NH.length; t++){
			var ratio_temp = (Meso_NH[t].tht_28- temp_min)/(temp_max-temp_min);
			data_array.push(ratio_temp);
			data_array_temp.push(Meso_NH[t].tht_28);
		}
		for (var t=0; t< Meso_NH.length; t++){
			var ratio_temp = (Meso_NH[t].tht_29- temp_min)/(temp_max-temp_min);
			data_array.push(ratio_temp);
			data_array_temp.push(Meso_NH[t].tht_29);
		}
		for (var t=0; t< Meso_NH.length; t++){
			var ratio_temp = (Meso_NH[t].tht_30- temp_min)/(temp_max-temp_min);
			data_array.push(ratio_temp);
			data_array_temp.push(Meso_NH[t].tht_30);
		}
		for (var t=0; t< Meso_NH.length; t++){
			var ratio_temp = (Meso_NH[t].tht_31- temp_min)/(temp_max-temp_min);
			data_array.push(ratio_temp);
			data_array_temp.push(Meso_NH[t].tht_31);
		}
		for (var t=0; t< Meso_NH.length; t++){
			var ratio_temp = (Meso_NH[t].tht_32- temp_min)/(temp_max-temp_min);
			data_array.push(ratio_temp);
			data_array_temp.push(Meso_NH[t].tht_32);
		}
		
		var data_array_32 = new Float32Array(data_array);
		var data_array_temp_32 = new Float32Array(data_array_temp);	
		var data_zs_32 = new Float32Array(data_zs);			
		
		
		volume.data = data_array_32;
		volume.data_temp = data_array_temp_32;
		volume.data_zs = data_zs_32;
		return volume;
		
	}