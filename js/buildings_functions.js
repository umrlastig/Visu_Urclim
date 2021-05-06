function import_geojson(geojson_file,grid,scene,nature_type) {
	var features_points_array = [];
	var features_color_array = [];
	var features_normal_array = [];
	  for(var a =0; a< geojson_file.features.length; a++){
			var feature = geojson_file.features[a];
			
			var polygon_coordinate = [];
			
			
			var building_color;
			switch(nature_type){
				case 'typo_maj':
					building_color = return_building_color(feature.properties.typo_maj,'typo_maj');
					break;
				case 'typo_second':
					building_color = return_building_color(feature.properties.typo_second,'typo_second');
					break;
				case 'build_dens':
					building_color = return_building_color(feature.properties.build_dens,'build_dens');
					break;
				case 'hydro_dens':
					building_color = return_building_color(feature.properties.hydro_dens,'hydro_dens');
					break;
				case 'veget_dens':
					building_color = return_building_color(feature.properties.veget_dens,'veget_dens');
					break;
				case 'road_dens':
					building_color = return_building_color(feature.properties.road_dens,'road_dens');
					break;
				case 'ba':
					building_color = return_building_color(feature.properties.ba,'ba');
					break;
				case 'bgh':
					building_color = return_building_color(feature.properties.bgh,'bgh');
					break;
				case 'icif':
					building_color = return_building_color(feature.properties.icif,'icif');
					break;
				case 'icio':
					building_color = return_building_color(feature.properties.icio,'icio');
					break;
				case 'id':
					building_color = return_building_color(feature.properties.id,'id');
					break;
				case 'local':
					building_color = return_building_color(feature.properties.local,'local');
					break;
				case 'pcif':
					building_color = return_building_color(feature.properties.pcif,'pcif');
					break;
				case 'pcio':
					building_color = return_building_color(feature.properties.pcio,'pcio');
					break;
				case 'pd':
					building_color = return_building_color(feature.properties.pd,'pd');
					break;
				case 'psc':
					building_color = return_building_color(feature.properties.psc,'psc');
					break;
				case 'autre':
					building_color = return_building_color(null,'autre');
					break;
			}
			
			
			for(var j =0; j< feature.geometry.coordinates[0][0].length; j++){
				var index_1 = j;
				var index_2;
				if(j == feature.geometry.coordinates[0][0].length - 1){
					index_2 = 0;
				} else {
					index_2 = j+1;
				}
				
				polygon_coordinate.push((feature.geometry.coordinates[0][0][index_1][0]-general_config.Coord_X_paris)*general_config.cst_X);
				polygon_coordinate.push((feature.geometry.coordinates[0][0][index_1][1]-general_config.Coord_Y_paris)*general_config.cst_Y);
				
				features_points_array.push((feature.geometry.coordinates[0][0][index_1][0]-general_config.Coord_X_paris)*general_config.cst_X);features_points_array.push(feature.properties.altitude_s*general_config.cst_Z);features_points_array.push(-(feature.geometry.coordinates[0][0][index_1][1]-general_config.Coord_Y_paris)*general_config.cst_Y);
				features_points_array.push((feature.geometry.coordinates[0][0][index_1][0]-general_config.Coord_X_paris)*general_config.cst_X);features_points_array.push(feature.properties.altitude_t*general_config.cst_Z);features_points_array.push(-(feature.geometry.coordinates[0][0][index_1][1]-general_config.Coord_Y_paris)*general_config.cst_Y);
				features_points_array.push((feature.geometry.coordinates[0][0][index_2][0]-general_config.Coord_X_paris)*general_config.cst_X);features_points_array.push(feature.properties.altitude_s*general_config.cst_Z);features_points_array.push(-(feature.geometry.coordinates[0][0][index_2][1]-general_config.Coord_Y_paris)*general_config.cst_Y);
				
				features_points_array.push((feature.geometry.coordinates[0][0][index_1][0]-general_config.Coord_X_paris)*general_config.cst_X);features_points_array.push(feature.properties.altitude_t*general_config.cst_Z);features_points_array.push(-(feature.geometry.coordinates[0][0][index_1][1]-general_config.Coord_Y_paris)*general_config.cst_Y);
				features_points_array.push((feature.geometry.coordinates[0][0][index_2][0]-general_config.Coord_X_paris)*general_config.cst_X);features_points_array.push(feature.properties.altitude_t*general_config.cst_Z);features_points_array.push(-(feature.geometry.coordinates[0][0][index_2][1]-general_config.Coord_Y_paris)*general_config.cst_Y);
				features_points_array.push((feature.geometry.coordinates[0][0][index_2][0]-general_config.Coord_X_paris)*general_config.cst_X);features_points_array.push(feature.properties.altitude_s*general_config.cst_Z);features_points_array.push(-(feature.geometry.coordinates[0][0][index_2][1]-general_config.Coord_Y_paris)*general_config.cst_Y);
				
				var N_X = - (feature.properties.altitude_t*general_config.cst_Z-feature.properties.altitude_s*general_config.cst_Z)*((feature.geometry.coordinates[0][0][index_2][1]-general_config.Coord_Y_paris)*general_config.cst_Y-(feature.geometry.coordinates[0][0][index_1][1]-general_config.Coord_Y_paris)*general_config.cst_Y);
				var N_Y = (feature.properties.altitude_t*general_config.cst_Z-feature.properties.altitude_s*general_config.cst_Z)*((feature.geometry.coordinates[0][0][index_2][0]-general_config.Coord_X_paris)*general_config.cst_X-(feature.geometry.coordinates[0][0][index_1][0]-general_config.Coord_X_paris)*general_config.cst_X);
				
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
			
			var polygon_triangulate = earcut(polygon_coordinate,null,2);
			for(var t=0; t<polygon_triangulate.length; t++){
				features_points_array.push(polygon_coordinate[polygon_triangulate[t]*2]);
				features_points_array.push(feature.properties.altitude_t*general_config.cst_Z);
				features_points_array.push(-polygon_coordinate[polygon_triangulate[t]*2 + 1]);
				
				features_color_array.push(building_color.r);features_color_array.push(building_color.g);features_color_array.push(building_color.b);
				features_normal_array.push(0);features_normal_array.push(1);features_normal_array.push(0);
			}
			for(var t=0; t<polygon_triangulate.length; t++){
				features_points_array.push(polygon_coordinate[polygon_triangulate[t]*2]);
				features_points_array.push(feature.properties.altitude_s*general_config.cst_Z);
				features_points_array.push(-polygon_coordinate[polygon_triangulate[t]*2 + 1]);
				
				features_color_array.push(building_color.r);features_color_array.push(building_color.g);features_color_array.push(building_color.b);
				features_normal_array.push(0);features_normal_array.push(1);features_normal_array.push(0);
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
		var feature_mesh = new THREE.Mesh( feature_bufferGeometry, feature_material);
		
		
			
		general_config.grid.add(feature_mesh);
		scene.add(general_config.grid);
		

	}