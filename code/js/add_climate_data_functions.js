function create_random_points_cloud(MesoNH_O_array,MesoNH_U_array,MesoNH_V_array,grid,id_sbl_array,id_meso_array,temperature_scale,THAT,THAT_W,HCanopy,HCanopy_w){
		
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
		
		general_config.z_min = null;
		general_config.z_max = null;
		general_config.x_min = null;
		general_config.x_max = null;
		general_config.y_min = null;
		general_config.y_max = null;
		
		general_config.h_min = null;
		general_config.h_max = null;
		
		for(var m=0; m<general_config.id_sbl_array.length; m++){
			for(var j=0; j<nj; j++){
				for(var i=0; i<ni; i++){
					var index_1 = j*ni + i;
					var h;
					var h_w;
					switch(general_config.id_sbl_array[m]){
						case 1:
							h = general_config.HCanopy[0];
							h_w = general_config.HCanopy_w[0];
							break;
						case 2:
							h = general_config.HCanopy[1];
							h_w = general_config.HCanopy_w[1];
							break;
						case 3:
							h = general_config.HCanopy[2];
							h_w = general_config.HCanopy_w[2];
							break;
						case 4:
							h = general_config.HCanopy[3];
							h_w = general_config.HCanopy_w[3];
							break;
						case 5:
							h = general_config.HCanopy[4];
							h_w = general_config.HCanopy_w[4];
							break;
						case 6:
							h = general_config.HCanopy[5];
							h_w = general_config.HCanopy_w[5];
							break;
						default:
							return;
					}
					
					
					var x_o = MesoNH_O_array[index_1].x - general_config.Coord_X_paris;
					var y_o = MesoNH_O_array[index_1].y - general_config.Coord_Y_paris;					
					var z_o = MesoNH_O_array[index_1].zs + h;
									
					var l_x = (MesoNH_O_array[index_1].x - MesoNH_U_array[index_1].x)*2;
					var l_y = (MesoNH_O_array[index_1].y - MesoNH_V_array[index_1].y)*2;
					var l_z = (h - h_w)*2;
					
					if(general_config.h_min != null && general_config.h_max != null){
						if(h_w < general_config.h_min){
							general_config.h_min = h_w;
						}
						if((h_w + l_z) > general_config.h_max){
							general_config.h_max = (h_w + l_z);
						}
					} else {
						general_config.h_min = h_w;
						general_config.h_max = (h_w + l_z);
					}
					
					if(general_config.z_min != null && general_config.z_max != null){
						if((z_o - l_z/2) < general_config.z_min){
							general_config.z_min = z_o - l_z/2;
						}
						if((z_o + l_z/2) > general_config.z_max){
							general_config.z_max = z_o + l_z/2;
						}
					} else {
						general_config.z_min = z_o - l_z/2;
						general_config.z_max = z_o + l_z/2;
					}
					
					if(general_config.x_min != null && general_config.x_max != null){
						if((x_o - l_x/2) < general_config.x_min){
							general_config.x_min = x_o - l_x/2;
						}
						if((x_o + l_x/2) > general_config.x_max){
							general_config.x_max = x_o + l_x/2;
						}
					} else {
						general_config.x_min = x_o - l_x/2;
						general_config.x_max = x_o + l_x/2;
					}
					
					if(general_config.y_min != null && general_config.y_max != null){
						if((y_o - l_y/2) < general_config.y_min){
							general_config.y_min = y_o - l_y/2;
						}
						if((y_o + l_y/2) > general_config.y_max){
							general_config.y_max = y_o + l_y/2;
						}
					} else {
						general_config.y_min = y_o - l_y/2;
						general_config.y_max = y_o + l_y/2;
					}
					
				}
			}
		}	
		

		for(var m=0; m<general_config.id_meso_array.length; m++){
			for(var j=0; j<nj; j++){
				for(var i=0; i<ni; i++){
					var index_1 = j*ni + i;
					
					var h;
					var h_w;
					switch(general_config.id_meso_array[m]){
						case 2:
							h = general_config.THAT[1];
							h_w = general_config.THAT_W[1];
							break;
						case 3:
							h = general_config.THAT[2];
							h_w = general_config.THAT_W[2];
							break;
						case 4:
							h = general_config.THAT[3];
							h_w = general_config.THAT_W[3];
							break;
						case 5:
							h = general_config.THAT[4];
							h_w = general_config.THAT_W[4];
							break;
						case 6:
							h = general_config.THAT[5];
							h_w = general_config.THAT_W[5];
							break;
						case 7:
							h = general_config.THAT[6];
							h_w = general_config.THAT_W[6];
							break;
						case 8:
							h = general_config.THAT[7];
							h_w = general_config.THAT_W[7];
							break;
						case 9:
							h = general_config.THAT[8];
							h_w = general_config.THAT_W[8];
							break;
						case 10:
							h = general_config.THAT[9];
							h_w = general_config.THAT_W[9];
							break;
						case 11:
							h = general_config.THAT[10];
							h_w = general_config.THAT_W[10];
							break;
						case 12:
							h = general_config.THAT[11];
							h_w = general_config.THAT_W[11];
							break;
						case 13:
							h = general_config.THAT[12];
							h_w = general_config.THAT_W[12];
							break;
						case 14:
							h = general_config.THAT[13];
							h_w = general_config.THAT_W[13];
							break;
						case 15:
							h = general_config.THAT[14];
							h_w = general_config.THAT_W[14];
							break;
						case 16:
							h = general_config.THAT[15];
							h_w = general_config.THAT_W[15];
							break;
						case 17:
							h = general_config.THAT[16];
							h_w = general_config.THAT_W[16];
							break;
						case 18:
							h = general_config.THAT[17];
							h_w = general_config.THAT_W[17];
							break;
						case 19:
							h = general_config.THAT[18];
							h_w = general_config.THAT_W[18];
							break;
						case 20:
							h = general_config.THAT[19];
							h_w = general_config.THAT_W[19];
							break;
						case 21:
							h = general_config.THAT[20];
							h_w = general_config.THAT_W[20];
							break;
						case 22:
							h = general_config.THAT[21];
							h_w = general_config.THAT_W[21];
							break;
						case 23:
							h = general_config.THAT[22];
							h_w = general_config.THAT_W[22];
							break;
						case 24:
							h = general_config.THAT[23];
							h_w = general_config.THAT_W[23];
							break;
						case 25:
							h = general_config.THAT[24];
							h_w = general_config.THAT_W[24];
							break;
						case 26:
							h = general_config.THAT[25];
							h_w = general_config.THAT_W[25];
							break;
						case 27:
							h = general_config.THAT[26];
							h_w = general_config.THAT_W[26];
							break;
						case 28:
							h = general_config.THAT[27];
							h_w = general_config.THAT_W[27];
							break;
						case 29:
							h = general_config.THAT[28];
							h_w = general_config.THAT_W[28];
							break;
						case 30:
							h = general_config.THAT[29];
							h_w = general_config.THAT_W[29];
							break;
						case 31:
							h = general_config.THAT[30];
							h_w = general_config.THAT_W[30];
							break;
						case 32:
							h = general_config.THAT[31];
							h_w = general_config.THAT_W[31];
							break;
						default:
							return;
					}
													
					var x_o = MesoNH_O_array[index_1].x - general_config.Coord_X_paris;
					var y_o = MesoNH_O_array[index_1].y - general_config.Coord_Y_paris;					
					var z_o = MesoNH_O_array[index_1].zs + h;
					
					var l_x = (MesoNH_O_array[index_1].x - MesoNH_U_array[index_1].x)*2;
					var l_y = (MesoNH_O_array[index_1].y - MesoNH_V_array[index_1].y)*2;
					var l_z = (h-h_w)*2;
									
					if(general_config.h_min != null && general_config.h_max != null){
						if(h_w < general_config.h_min){
							general_config.h_min = h_w;
						}
						if((h_w + l_z) > general_config.h_max){
							general_config.h_max = (h_w + l_z);
						}
					} else {
						general_config.h_min = h_w;
						general_config.h_max = (h_w + l_z);
					}
						
					if(general_config.z_min != null && general_config.z_max != null){
						if((z_o - l_z/2) < general_config.z_min){
							general_config.z_min = z_o - l_z/2;
						}
						if((z_o + l_z/2) > general_config.z_max){
							general_config.z_max = z_o + l_z/2;
						}
					} else {
						general_config.z_min = z_o - l_z/2;
						general_config.z_max = z_o + l_z/2;
					}
					
					if(general_config.x_min != null && general_config.x_max != null){
						if((x_o - l_x/2) < general_config.x_min){
							general_config.x_min = x_o - l_x/2;
						}
						if((x_o + l_x/2) > general_config.x_max){
							general_config.x_max = x_o + l_x/2;
						}
					} else {
						general_config.x_min = x_o - l_x/2;
						general_config.x_max = x_o + l_x/2;
					}
					
					if(general_config.y_min != null && general_config.y_max != null){
						if((y_o - l_y/2) < general_config.y_min){
							general_config.y_min = y_o - l_y/2;
						}
						if((y_o + l_y/2) > general_config.y_max){
							general_config.y_max = y_o + l_y/2;
						}
					} else {
						general_config.y_min = y_o - l_y/2;
						general_config.y_max = y_o + l_y/2;
					}
				
					
				}
			}
		}	
		
		for(var m=0; m<general_config.id_sbl_array.length; m++){
			for(var j=0; j<nj; j++){
				for(var i=0; i<ni; i++){
					var index_1 = j*ni + i;
					var temp;
					var h;
					var h_w;
					switch(general_config.id_sbl_array[m]){
						case 1:
							temp = MesoNH_O_array[index_1].teb_1;
							h = general_config.HCanopy[0];
							h_w = general_config.HCanopy_w[0];
							break;
						case 2:
							temp = MesoNH_O_array[index_1].teb_2;
							h = general_config.HCanopy[1];
							h_w = general_config.HCanopy_w[1];
							break;
						case 3:
							temp = MesoNH_O_array[index_1].teb_3;
							h = general_config.HCanopy[2];
							h_w = general_config.HCanopy_w[2];
							break;
						case 4:
							temp = MesoNH_O_array[index_1].teb_4;
							h = general_config.HCanopy[3];
							h_w = general_config.HCanopy_w[3];
							break;
						case 5:
							temp = MesoNH_O_array[index_1].teb_5;
							h = general_config.HCanopy[4];
							h_w = general_config.HCanopy_w[4];
							break;
						case 6:
							temp = MesoNH_O_array[index_1].teb_6;
							h = general_config.HCanopy[5];
							h_w = general_config.HCanopy_w[5];
							break;
						default:
							return;
					}
					
					
					var x_o = MesoNH_O_array[index_1].x - general_config.Coord_X_paris;
					var y_o = MesoNH_O_array[index_1].y - general_config.Coord_Y_paris;					
					var z_o = MesoNH_O_array[index_1].zs + h;
									
					var l_x = (MesoNH_O_array[index_1].x - MesoNH_U_array[index_1].x)*2;
					var l_y = (MesoNH_O_array[index_1].y - MesoNH_V_array[index_1].y)*2;
					var l_z = (h - h_w)*2;
					
													
					var tmin = temperature_scale[0];
					var tmax = temperature_scale[1];
					var percentage_color = (temp - tmin)/(tmax - tmin);
					if(percentage_color<0){
						percentage_color = 0;
					} else if(percentage_color >1){
						percentage_color = 1;
					}
					
					
					general_config.temp_values.push(parseFloat(temp));
					var color_hex = getHCLcolor(percentage_color,general_config.HCL_color_scales[general_config.active_HCL_id].scale);
												
					var color_rgb = hexToRgb(color_hex)
					
					var color_r = color_rgb.r/255;
					var color_g = color_rgb.g/255;
					var color_b = color_rgb.b/255;
						
					var cell_volume = l_x*l_y*l_z;
					
					var relative_density;
					
					if(general_config.relative_density_factor < 1){
						var add_factor = 1-general_config.relative_density_factor;
						if(percentage_color < 0.5){
							relative_density = general_config.particle_density + general_config.particle_density*add_factor*(0.5-percentage_color)*2;
						} else if(percentage_color == 0.5){
							relative_density = general_config.particle_density;
						} else if(percentage_color > 0.5){
							relative_density = general_config.particle_density - general_config.particle_density*add_factor*(percentage_color-0.5)*2;
						}
					} else if(general_config.relative_density_factor == 1){
						relative_density = general_config.particle_density;
					} else if(general_config.relative_density_factor >1){
						var add_factor = general_config.relative_density_factor-1;
						if(percentage_color < 0.5){
							relative_density = general_config.particle_density - general_config.particle_density*add_factor*(0.5-percentage_color)*2;
						} else if(percentage_color == 0.5){
							relative_density = general_config.particle_density;
						} else if(percentage_color > 0.5){
							relative_density = general_config.particle_density + general_config.particle_density*add_factor*(percentage_color-0.5)*2;
						}
					}
					
					var particle_length = parseInt(relative_density*cell_volume);
					
					var size;
					var basic_size = 10000;
					
					if(general_config.relative_size_factor < 1){
						var add_factor = 1-general_config.relative_size_factor;
						if(percentage_color < 0.5){
							size = parseInt(basic_size + basic_size*add_factor*(0.5-percentage_color)*2);
						} else if(percentage_color == 0.5){
							size = basic_size;
						} else if(percentage_color > 0.5){
							size = parseInt(basic_size - basic_size*add_factor*(percentage_color-0.5)*2);
						}
					} else if(general_config.relative_size_factor == 1){
						size = basic_size;
					} else if(general_config.relative_size_factor >1){
						var add_factor = general_config.relative_size_factor-1;
						if(percentage_color < 0.5){
							size = parseInt(basic_size - basic_size*add_factor*(0.5-percentage_color)*2);
						} else if(percentage_color == 0.5){
							size = basic_size;
						} else if(percentage_color > 0.5){
							size = parseInt(basic_size + basic_size*add_factor*(percentage_color-0.5)*2);
						}
					}
											
					for(var p =0; p< particle_length; p++){
						var pX = (Math.random()-0.5)*2 * (l_x/2) + x_o,
						 pY = (Math.random()-0.5)*2 * (l_y/2) + y_o,
						 pZ = (Math.random()-0.5)*2 * (l_z/2) + z_o;
						coord_array.push(pX*general_config.cst_X);
						coord_array.push(pZ*general_config.cst_Z);
						coord_array.push(-pY*general_config.cst_Y);
						colors.push(color_r);colors.push(color_g);colors.push(color_b);
						sizes.push(size);
						transparency_factor_array.push(general_config.transparency_factor);
						custompercentagearray.push(percentage_color*2*Math.PI);
						z_position_array.push((pZ - general_config.z_min)/(general_config.z_max - general_config.z_min));
						x_position_array.push((pX - general_config.x_min)/(general_config.x_max - general_config.x_min));
						y_position_array.push((pY - general_config.y_min)/(general_config.y_max - general_config.y_min));
						h_position_array.push(((pZ-MesoNH_O_array[index_1].zs)-general_config.h_min)/(general_config.h_max - general_config.h_min));
					}
				}
			}
		}	
		

		for(var m=0; m<general_config.id_meso_array.length; m++){
			for(var j=0; j<nj; j++){
				for(var i=0; i<ni; i++){
					var index_1 = j*ni + i;
					
					var temp;
					var h;
					var h_w;
					switch(general_config.id_meso_array[m]){
						case 2:
							temp = MesoNH_O_array[index_1].tht_2;
							h = general_config.THAT[1];
							h_w = general_config.THAT_W[1];
							break;
						case 3:
							temp = MesoNH_O_array[index_1].tht_3;
							h = general_config.THAT[2];
							h_w = general_config.THAT_W[2];
							break;
						case 4:
							temp = MesoNH_O_array[index_1].tht_4;
							h = general_config.THAT[3];
							h_w = general_config.THAT_W[3];
							break;
						case 5:
							temp = MesoNH_O_array[index_1].tht_5;
							h = general_config.THAT[4];
							h_w = general_config.THAT_W[4];
							break;
						case 6:
							temp = MesoNH_O_array[index_1].tht_6;
							h = general_config.THAT[5];
							h_w = general_config.THAT_W[5];
							break;
						case 7:
							temp = MesoNH_O_array[index_1].tht_7;
							h = general_config.THAT[6];
							h_w = general_config.THAT_W[6];
							break;
						case 8:
							temp = MesoNH_O_array[index_1].tht_8;
							h = general_config.THAT[7];
							h_w = general_config.THAT_W[7];
							break;
						case 9:
							temp = MesoNH_O_array[index_1].tht_9;
							h = general_config.THAT[8];
							h_w = general_config.THAT_W[8];
							break;
						case 10:
							temp = MesoNH_O_array[index_1].tht_10;
							h = general_config.THAT[9];
							h_w = general_config.THAT_W[9];
							break;
						case 11:
							temp = MesoNH_O_array[index_1].tht_11;
							h = general_config.THAT[10];
							h_w = general_config.THAT_W[10];
							break;
						case 12:
							temp = MesoNH_O_array[index_1].tht_12;
							h = general_config.THAT[11];
							h_w = general_config.THAT_W[11];
							break;
						case 13:
							temp = MesoNH_O_array[index_1].tht_13;
							h = general_config.THAT[12];
							h_w = general_config.THAT_W[12];
							break;
						case 14:
							temp = MesoNH_O_array[index_1].tht_14;
							h = general_config.THAT[13];
							h_w = general_config.THAT_W[13];
							break;
						case 15:
							temp = MesoNH_O_array[index_1].tht_15;
							h = general_config.THAT[14];
							h_w = general_config.THAT_W[14];
							break;
						case 16:
							temp = MesoNH_O_array[index_1].tht_16;
							h = general_config.THAT[15];
							h_w = general_config.THAT_W[15];
							break;
						case 17:
							temp = MesoNH_O_array[index_1].tht_17;
							h = general_config.THAT[16];
							h_w = general_config.THAT_W[16];
							break;
						case 18:
							temp = MesoNH_O_array[index_1].tht_18;
							h = general_config.THAT[17];
							h_w = general_config.THAT_W[17];
							break;
						case 19:
							temp = MesoNH_O_array[index_1].tht_19;
							h = general_config.THAT[18];
							h_w = general_config.THAT_W[18];
							break;
						case 20:
							temp = MesoNH_O_array[index_1].tht_20;
							h = general_config.THAT[19];
							h_w = general_config.THAT_W[19];
							break;
						case 21:
							temp = MesoNH_O_array[index_1].tht_21;
							h = general_config.THAT[20];
							h_w = general_config.THAT_W[20];
							break;
						case 22:
							temp = MesoNH_O_array[index_1].tht_22;
							h = general_config.THAT[21];
							h_w = general_config.THAT_W[21];
							break;
						case 23:
							temp = MesoNH_O_array[index_1].tht_23;
							h = general_config.THAT[22];
							h_w = general_config.THAT_W[22];
							break;
						case 24:
							temp = MesoNH_O_array[index_1].tht_24;
							h = general_config.THAT[23];
							h_w = general_config.THAT_W[23];
							break;
						case 25:
							temp = MesoNH_O_array[index_1].tht_25;
							h = general_config.THAT[24];
							h_w = general_config.THAT_W[24];
							break;
						case 26:
							temp = MesoNH_O_array[index_1].tht_26;
							h = general_config.THAT[25];
							h_w = general_config.THAT_W[25];
							break;
						case 27:
							temp = MesoNH_O_array[index_1].tht_27;
							h = general_config.THAT[26];
							h_w = general_config.THAT_W[26];
							break;
						case 28:
							temp = MesoNH_O_array[index_1].tht_28;
							h = general_config.THAT[27];
							h_w = general_config.THAT_W[27];
							break;
						case 29:
							temp = MesoNH_O_array[index_1].tht_29;
							h = general_config.THAT[28];
							h_w = general_config.THAT_W[28];
							break;
						case 30:
							temp = MesoNH_O_array[index_1].tht_30;
							h = general_config.THAT[29];
							h_w = general_config.THAT_W[29];
							break;
						case 31:
							temp = MesoNH_O_array[index_1].tht_31;
							h = general_config.THAT[30];
							h_w = general_config.THAT_W[30];
							break;
						case 32:
							temp = MesoNH_O_array[index_1].tht_32;
							h = general_config.THAT[31];
							h_w = general_config.THAT_W[31];
							break;
						default:
							return;
					}
													
					var x_o = MesoNH_O_array[index_1].x - general_config.Coord_X_paris;
					var y_o = MesoNH_O_array[index_1].y - general_config.Coord_Y_paris;					
					var z_o = MesoNH_O_array[index_1].zs + h;
					
					var l_x = (MesoNH_O_array[index_1].x - MesoNH_U_array[index_1].x)*2;
					var l_y = (MesoNH_O_array[index_1].y - MesoNH_V_array[index_1].y)*2;
					var l_z = (h-h_w)*2;
									
									
					var tmin = temperature_scale[0];
					var tmax = temperature_scale[1];
					var percentage_color = (temp - tmin)/(tmax - tmin);
					if(percentage_color<0){
						percentage_color = 0;
					} else if(percentage_color >1){
						percentage_color = 1;
					}
										
					general_config.temp_values.push(parseFloat(temp));
					var color_hex = getHCLcolor(percentage_color,general_config.HCL_color_scales[general_config.active_HCL_id].scale);
												
					var color_rgb = hexToRgb(color_hex)
					
					var color_r = color_rgb.r/255;
					var color_g = color_rgb.g/255;
					var color_b = color_rgb.b/255;
						
					var cell_volume = l_x*l_y*l_z;
					
					var relative_density;
					
					if(general_config.relative_density_factor < 1){
						var add_factor = 1-general_config.relative_density_factor;
						if(percentage_color < 0.5){
							relative_density = general_config.particle_density + general_config.particle_density*add_factor*(0.5-percentage_color)*2;
						} else if(percentage_color == 0.5){
							relative_density = general_config.particle_density;
						} else if(percentage_color > 0.5){
							relative_density = general_config.particle_density - general_config.particle_density*add_factor*(percentage_color-0.5)*2;
						}
					} else if(general_config.relative_density_factor == 1){
						relative_density = general_config.particle_density;
					} else if(general_config.relative_density_factor >1){
						var add_factor = general_config.relative_density_factor-1;
						if(percentage_color < 0.5){
							relative_density = general_config.particle_density - general_config.particle_density*add_factor*(0.5-percentage_color)*2;
						} else if(percentage_color == 0.5){
							relative_density = general_config.particle_density;
						} else if(percentage_color > 0.5){
							relative_density = general_config.particle_density + general_config.particle_density*add_factor*(percentage_color-0.5)*2;
						}
					}
					
					
					var particle_length = parseInt(relative_density*cell_volume);
					
					var size;
					var basic_size = 10000;
					
					if(general_config.relative_size_factor < 1){
						var add_factor = 1-general_config.relative_size_factor;
						if(percentage_color < 0.5){
							size = parseInt(basic_size + basic_size*add_factor*(0.5-percentage_color)*2);
						} else if(percentage_color == 0.5){
							size = basic_size;
						} else if(percentage_color > 0.5){
							size = parseInt(basic_size - basic_size*add_factor*(percentage_color-0.5)*2);
						}
					} else if(general_config.relative_size_factor == 1){
						size = basic_size;
					} else if(general_config.relative_size_factor >1){
						var add_factor = general_config.relative_size_factor-1;
						if(percentage_color < 0.5){
							size = parseInt(basic_size - basic_size*add_factor*(0.5-percentage_color)*2);
						} else if(percentage_color == 0.5){
							size = basic_size;
						} else if(percentage_color > 0.5){
							size = parseInt(basic_size + basic_size*add_factor*(percentage_color-0.5)*2);
						}
					}
						
					for(var p =0; p< particle_length; p++){
						var pX = (Math.random()-0.5)*2 * (l_x/2) + x_o,
						  pY = (Math.random()-0.5)*2 * (l_y/2) + y_o,
						  pZ = (Math.random()-0.5)*2 * (l_z/2) + z_o;
						coord_array.push(pX*general_config.cst_X);
						coord_array.push(pZ*general_config.cst_Z);
						coord_array.push(-pY*general_config.cst_Y);
						colors.push(color_r);colors.push(color_g);colors.push(color_b);
						sizes.push(size);
						transparency_factor_array.push(general_config.transparency_factor);
						custompercentagearray.push(percentage_color*2*Math.PI);
						z_position_array.push((pZ - general_config.z_min)/(general_config.z_max - general_config.z_min));
						x_position_array.push((pX - general_config.x_min)/(general_config.x_max - general_config.x_min));
						y_position_array.push((pY - general_config.y_min)/(general_config.y_max - general_config.y_min));
						h_position_array.push(((pZ-MesoNH_O_array[index_1].zs)-general_config.h_min)/(general_config.h_max - general_config.h_min));
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
		
		var material;
		var bufferGeometry = new THREE.BufferGeometry();
		
		bufferGeometry.setAttribute( 'position', new THREE.BufferAttribute( coord_array_32, 3 ) );
		bufferGeometry.setAttribute( 'customColor', new THREE.BufferAttribute( colors_32, 3 ) );
		bufferGeometry.setAttribute( 'customsize', new THREE.BufferAttribute(sizes_32,1));
		bufferGeometry.setAttribute( 'customtransparency', new THREE.BufferAttribute(transparency_factor_32,1));
		bufferGeometry.setAttribute( 'custompercentage', new THREE.BufferAttribute(custompercentage_32,1));
		bufferGeometry.setAttribute( 'z_position', new THREE.BufferAttribute(z_position_array_32,1));
		bufferGeometry.setAttribute( 'x_position', new THREE.BufferAttribute(x_position_array_32,1));
		bufferGeometry.setAttribute( 'y_position', new THREE.BufferAttribute(y_position_array_32,1));
		bufferGeometry.setAttribute( 'h_position', new THREE.BufferAttribute(h_position_array_32,1));
			
		if(general_config.is_animated == false){
			material = new THREE.ShaderMaterial( {
				uniforms: {
					color: { value: new THREE.Color( 0xffffff ) },
					pointTexture: { value: new THREE.TextureLoader().load( "disc.png" ) },
					regularSize: { value: general_config.regular_size },
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
							temp_factor_max: { type: "f", value: general_config.temp_max_factor }
				},
				vertexShader: document.getElementById( 'vertexshader_fix' ).textContent,
				fragmentShader: document.getElementById( 'fragmentshader' ).textContent,
				transparent: true
			} );
		} else if (general_config.is_animated == true){
			if(general_config.animation_parameter == 'temp'){
				material = new THREE.ShaderMaterial( {
					uniforms: {
						color: { value: new THREE.Color( 0xffffff ) },
						pointTexture: { value: new THREE.TextureLoader().load( "disc.png" ) },
						regularSize: { value: general_config.regular_size },
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
							temp_factor_max: { type: "f", value: general_config.temp_max_factor }
					},
					vertexShader: document.getElementById( 'vertexshader_anim_temp' ).textContent,
					fragmentShader: document.getElementById( 'fragmentshader' ).textContent,
					transparent: true
				} );
				
			} else if(general_config.animation_parameter == 'Z'){
				material = new THREE.ShaderMaterial( {
					uniforms: {
						color: { value: new THREE.Color( 0xffffff ) },
						pointTexture: { value: new THREE.TextureLoader().load( "disc.png" ) },
						regularSize: { value: general_config.regular_size },
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
							temp_factor_max: { type: "f", value: general_config.temp_max_factor }
					},
					vertexShader: document.getElementById( 'vertexshader_anim_z' ).textContent,
					fragmentShader: document.getElementById( 'fragmentshader' ).textContent,
					transparent: true
				} );
				
			} else if(general_config.animation_parameter == 'X'){
				material = new THREE.ShaderMaterial( {
					uniforms: {
						color: { value: new THREE.Color( 0xffffff ) },
						pointTexture: { value: new THREE.TextureLoader().load( "disc.png" ) },
						regularSize: { value: general_config.regular_size },
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
							temp_factor_max: { type: "f", value: general_config.temp_max_factor }
					},
					vertexShader: document.getElementById( 'vertexshader_anim_x' ).textContent,
					fragmentShader: document.getElementById( 'fragmentshader' ).textContent,
					transparent: true
				} );
				
			} else if(general_config.animation_parameter == 'Y'){
				material = new THREE.ShaderMaterial( {
					uniforms: {
						color: { value: new THREE.Color( 0xffffff ) },
						pointTexture: { value: new THREE.TextureLoader().load( "disc.png" ) },
						regularSize: { value: general_config.regular_size },
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
							temp_factor_max: { type: "f", value: general_config.temp_max_factor }
					},
					vertexShader: document.getElementById( 'vertexshader_anim_y' ).textContent,
					fragmentShader: document.getElementById( 'fragmentshader' ).textContent,
					transparent: true
				} );
				
			}
		}
		
	
		var point = new THREE.Points( bufferGeometry, material);
				
		create_temp_histogram();		
				
		general_config.grid.add(point);
		scene.add(general_config.grid);
	}
	
	function create_2D_plane_series(MesoNH_O_array,MesoNH_U_array,MesoNH_V_array,grid,id_sbl_array,id_meso_array,temperature_scale,THAT,THAT_W,HCanopy,HCanopy_w){
	
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
		
		general_config.z_min = null;
		general_config.z_max = null;
		general_config.x_min = null;
		general_config.x_max = null;
		general_config.y_min = null;
		general_config.y_max = null;
		
		general_config.h_min = null;
		general_config.h_max = null;
		
		for(var m=0; m<general_config.id_sbl_array.length; m++){
			for(var j=0; j<nj; j++){
				for(var i=0; i<ni; i++){
					var index_1 = j*ni + i;
					var h;
					var h_w;
					switch(general_config.id_sbl_array[m]){
						case 1:
							h = general_config.HCanopy[0];
							h_w = general_config.HCanopy_w[0];
							break;
						case 2:
							h = general_config.HCanopy[1];
							h_w = general_config.HCanopy_w[1];
							break;
						case 3:
							h = general_config.HCanopy[2];
							h_w = general_config.HCanopy_w[2];
							break;
						case 4:
							h = general_config.HCanopy[3];
							h_w = general_config.HCanopy_w[3];
							break;
						case 5:
							h = general_config.HCanopy[4];
							h_w = general_config.HCanopy_w[4];
							break;
						case 6:
							h = general_config.HCanopy[5];
							h_w = general_config.HCanopy_w[5];
							break;
						default:
							return;
					}
					
					
					var x_o = MesoNH_O_array[index_1].x - general_config.Coord_X_paris;
					var y_o = MesoNH_O_array[index_1].y - general_config.Coord_Y_paris;					
					var z_o = MesoNH_O_array[index_1].zs + h;
									
					var l_x = (MesoNH_O_array[index_1].x - MesoNH_U_array[index_1].x)*2;
					var l_y = (MesoNH_O_array[index_1].y - MesoNH_V_array[index_1].y)*2;
					var l_z = (h - h_w)*2;
					
					if(general_config.h_min != null && general_config.h_max != null){
						if(h_w < general_config.h_min){
							general_config.h_min = h_w;
						}
						if((h_w + l_z) > general_config.h_max){
							general_config.h_max = (h_w + l_z);
						}
					} else {
						general_config.h_min = h_w;
						general_config.h_max = (h_w + l_z);
					}
					
					if(general_config.z_min != null && general_config.z_max != null){
						if((z_o - l_z/2) < general_config.z_min){
							general_config.z_min = z_o - l_z/2;
						}
						if((z_o + l_z/2) > general_config.z_max){
							general_config.z_max = z_o + l_z/2;
						}
					} else {
						general_config.z_min = z_o - l_z/2;
						general_config.z_max = z_o + l_z/2;
					}
					
					if(general_config.x_min != null && general_config.x_max != null){
						if((x_o - l_x/2) < general_config.x_min){
							general_config.x_min = x_o - l_x/2;
						}
						if((x_o + l_x/2) > general_config.x_max){
							general_config.x_max = x_o + l_x/2;
						}
					} else {
						general_config.x_min = x_o - l_x/2;
						general_config.x_max = x_o + l_x/2;
					}
					
					if(general_config.y_min != null && general_config.y_max != null){
						if((y_o - l_y/2) < general_config.y_min){
							general_config.y_min = y_o - l_y/2;
						}
						if((y_o + l_y/2) > general_config.y_max){
							general_config.y_max = y_o + l_y/2;
						}
					} else {
						general_config.y_min = y_o - l_y/2;
						general_config.y_max = y_o + l_y/2;
					}
					
				}
			}
		}	
		

		for(var m=0; m<general_config.id_meso_array.length; m++){
			for(var j=0; j<nj; j++){
				for(var i=0; i<ni; i++){
					var index_1 = j*ni + i;
					
					var h;
					var h_w;
					switch(general_config.id_meso_array[m]){
						case 2:
							h = general_config.THAT[1];
							h_w = general_config.THAT_W[1];
							break;
						case 3:
							h = general_config.THAT[2];
							h_w = general_config.THAT_W[2];
							break;
						case 4:
							h = general_config.THAT[3];
							h_w = general_config.THAT_W[3];
							break;
						case 5:
							h = general_config.THAT[4];
							h_w = general_config.THAT_W[4];
							break;
						case 6:
							h = general_config.THAT[5];
							h_w = general_config.THAT_W[5];
							break;
						case 7:
							h = general_config.THAT[6];
							h_w = general_config.THAT_W[6];
							break;
						case 8:
							h = general_config.THAT[7];
							h_w = general_config.THAT_W[7];
							break;
						case 9:
							h = general_config.THAT[8];
							h_w = general_config.THAT_W[8];
							break;
						case 10:
							h = general_config.THAT[9];
							h_w = general_config.THAT_W[9];
							break;
						case 11:
							h = general_config.THAT[10];
							h_w = general_config.THAT_W[10];
							break;
						case 12:
							h = general_config.THAT[11];
							h_w = general_config.THAT_W[11];
							break;
						case 13:
							h = general_config.THAT[12];
							h_w = general_config.THAT_W[12];
							break;
						case 14:
							h = general_config.THAT[13];
							h_w = general_config.THAT_W[13];
							break;
						case 15:
							h = general_config.THAT[14];
							h_w = general_config.THAT_W[14];
							break;
						case 16:
							h = general_config.THAT[15];
							h_w = general_config.THAT_W[15];
							break;
						case 17:
							h = general_config.THAT[16];
							h_w = general_config.THAT_W[16];
							break;
						case 18:
							h = general_config.THAT[17];
							h_w = general_config.THAT_W[17];
							break;
						case 19:
							h = general_config.THAT[18];
							h_w = general_config.THAT_W[18];
							break;
						case 20:
							h = general_config.THAT[19];
							h_w = general_config.THAT_W[19];
							break;
						case 21:
							h = general_config.THAT[20];
							h_w = general_config.THAT_W[20];
							break;
						case 22:
							h = general_config.THAT[21];
							h_w = general_config.THAT_W[21];
							break;
						case 23:
							h = general_config.THAT[22];
							h_w = general_config.THAT_W[22];
							break;
						case 24:
							h = general_config.THAT[23];
							h_w = general_config.THAT_W[23];
							break;
						case 25:
							h = general_config.THAT[24];
							h_w = general_config.THAT_W[24];
							break;
						case 26:
							h = general_config.THAT[25];
							h_w = general_config.THAT_W[25];
							break;
						case 27:
							h = general_config.THAT[26];
							h_w = general_config.THAT_W[26];
							break;
						case 28:
							h = general_config.THAT[27];
							h_w = general_config.THAT_W[27];
							break;
						case 29:
							h = general_config.THAT[28];
							h_w = general_config.THAT_W[28];
							break;
						case 30:
							h = general_config.THAT[29];
							h_w = general_config.THAT_W[29];
							break;
						case 31:
							h = general_config.THAT[30];
							h_w = general_config.THAT_W[30];
							break;
						case 32:
							h = general_config.THAT[31];
							h_w = general_config.THAT_W[31];
							break;
						default:
							return;
					}
													
					var x_o = MesoNH_O_array[index_1].x - general_config.Coord_X_paris;
					var y_o = MesoNH_O_array[index_1].y - general_config.Coord_Y_paris;					
					var z_o = MesoNH_O_array[index_1].zs + h;
					
					var l_x = (MesoNH_O_array[index_1].x - MesoNH_U_array[index_1].x)*2;
					var l_y = (MesoNH_O_array[index_1].y - MesoNH_V_array[index_1].y)*2;
					var l_z = (h-h_w)*2;
									
					if(general_config.h_min != null && general_config.h_max != null){
						if(h_w < general_config.h_min){
							general_config.h_min = h_w;
						}
						if((h_w + l_z) > general_config.h_max){
							general_config.h_max = (h_w + l_z);
						}
					} else {
						general_config.h_min = h_w;
						general_config.h_max = (h_w + l_z);
					}
						
					if(general_config.z_min != null && general_config.z_max != null){
						if((z_o - l_z/2) < general_config.z_min){
							general_config.z_min = z_o - l_z/2;
						}
						if((z_o + l_z/2) > general_config.z_max){
							general_config.z_max = z_o + l_z/2;
						}
					} else {
						general_config.z_min = z_o - l_z/2;
						general_config.z_max = z_o + l_z/2;
					}
					
					if(general_config.x_min != null && general_config.x_max != null){
						if((x_o - l_x/2) < general_config.x_min){
							general_config.x_min = x_o - l_x/2;
						}
						if((x_o + l_x/2) > general_config.x_max){
							general_config.x_max = x_o + l_x/2;
						}
					} else {
						general_config.x_min = x_o - l_x/2;
						general_config.x_max = x_o + l_x/2;
					}
					
					if(general_config.y_min != null && general_config.y_max != null){
						if((y_o - l_y/2) < general_config.y_min){
							general_config.y_min = y_o - l_y/2;
						}
						if((y_o + l_y/2) > general_config.y_max){
							general_config.y_max = y_o + l_y/2;
						}
					} else {
						general_config.y_min = y_o - l_y/2;
						general_config.y_max = y_o + l_y/2;
					}
				
					
				}
			}
		}	
		
		for(var m=0; m<general_config.id_sbl_array.length; m++){
			for(var j=0; j<nj; j++){
				for(var i=0; i<ni; i++){
					var index_1 = j*ni + i;
					var temp;
					var h;
					var h_w;
					switch(general_config.id_sbl_array[m]){
						case 1:
							temp = MesoNH_O_array[index_1].teb_1;
							h = general_config.HCanopy[0];
							h_w = general_config.HCanopy_w[0];
							break;
						case 2:
							temp = MesoNH_O_array[index_1].teb_2;
							h = general_config.HCanopy[1];
							h_w = general_config.HCanopy_w[1];
							break;
						case 3:
							temp = MesoNH_O_array[index_1].teb_3;
							h = general_config.HCanopy[2];
							h_w = general_config.HCanopy_w[2];
							break;
						case 4:
							temp = MesoNH_O_array[index_1].teb_4;
							h = general_config.HCanopy[3];
							h_w = general_config.HCanopy_w[3];
							break;
						case 5:
							temp = MesoNH_O_array[index_1].teb_5;
							h = general_config.HCanopy[4];
							h_w = general_config.HCanopy_w[4];
							break;
						case 6:
							temp = MesoNH_O_array[index_1].teb_6;
							h = general_config.HCanopy[5];
							h_w = general_config.HCanopy_w[5];
							break;
						default:
							return;
					}
					
					var x_u = MesoNH_U_array[index_1].x - general_config.Coord_X_paris;
					var y_u = MesoNH_U_array[index_1].y - general_config.Coord_Y_paris;
					var z_u = MesoNH_U_array[index_1].zs + h;
					
					var x_v = MesoNH_V_array[index_1].x - general_config.Coord_X_paris;
					var y_v = MesoNH_V_array[index_1].y - general_config.Coord_Y_paris;
					var z_v = MesoNH_V_array[index_1].zs + h;
					
					var z_o = MesoNH_O_array[index_1].zs + h;
					
					var l_x = (MesoNH_O_array[index_1].x - MesoNH_U_array[index_1].x)*2
					var l_y = (MesoNH_O_array[index_1].y - MesoNH_V_array[index_1].y)*2
					
					//up				
					coord_array.push(x_u*general_config.cst_X); 
					coord_array.push(z_o*general_config.cst_Z);
					coord_array.push(-(y_v + l_y)*general_config.cst_Y);
					coord_array.push(x_u*general_config.cst_X);
					coord_array.push(z_o*general_config.cst_Z); 
					coord_array.push(-y_v*general_config.cst_Y);
					coord_array.push((x_u + l_x)*general_config.cst_X); 
					coord_array.push(z_o*general_config.cst_Z);
					coord_array.push(-y_v*general_config.cst_Y);
					
					coord_array.push(x_u*general_config.cst_X); 
					coord_array.push(z_o*general_config.cst_Z);
					coord_array.push(-(y_v + l_y)*general_config.cst_Y);
					coord_array.push((x_u + l_x)*general_config.cst_X); 
					coord_array.push(z_o*general_config.cst_Z);
					coord_array.push(-y_v*general_config.cst_Y);
					coord_array.push((x_u + l_x)*general_config.cst_X); 
					coord_array.push(z_o*general_config.cst_Z);
					coord_array.push(-(y_v + l_y)*general_config.cst_Y);
					
					//down
					coord_array.push(x_u*general_config.cst_X); 
					coord_array.push(z_o*general_config.cst_Z);
					coord_array.push(-(y_v + l_y)*general_config.cst_Y);
					coord_array.push((x_u + l_x)*general_config.cst_X); 
					coord_array.push(z_o*general_config.cst_Z);
					coord_array.push(-y_v*general_config.cst_Y);
					coord_array.push(x_u*general_config.cst_X); 
					coord_array.push(z_o*general_config.cst_Z);
					coord_array.push(-y_v*general_config.cst_Y);
					
					coord_array.push(x_u*general_config.cst_X); 
					coord_array.push(z_o*general_config.cst_Z);
					coord_array.push(-(y_v + l_y)*general_config.cst_Y);
					coord_array.push((x_u + l_x)*general_config.cst_X); 
					coord_array.push(z_o*general_config.cst_Z);
					coord_array.push(-(y_v + l_y)*general_config.cst_Y);
					coord_array.push((x_u + l_x)*general_config.cst_X); 
					coord_array.push(z_o*general_config.cst_Z);
					coord_array.push(-y_v*general_config.cst_Y);
					
					
					var tmin = temperature_scale[0];
					var tmax = temperature_scale[1];
					var percentage_color = (temp - tmin)/(tmax - tmin);
					if(percentage_color<0){
						percentage_color = 0;
					} else if(percentage_color >1){
						percentage_color = 1;
					}
					
					general_config.temp_values.push(parseFloat(temp));
					var color_hex = getHCLcolor(percentage_color,general_config.HCL_color_scales[general_config.active_HCL_id].scale);
												
					var color_rgb = hexToRgb(color_hex)
					
					var color_r = color_rgb.r/255;
					var color_g = color_rgb.g/255;
					var color_b = color_rgb.b/255;
					var transparency = general_config.transparency_factor;
								
					colors.push(color_r);colors.push(color_g);colors.push(color_b);
					colors.push(color_r);colors.push(color_g);colors.push(color_b);
					colors.push(color_r);colors.push(color_g);colors.push(color_b);
					colors.push(color_r);colors.push(color_g);colors.push(color_b);
					colors.push(color_r);colors.push(color_g);colors.push(color_b);
					colors.push(color_r);colors.push(color_g);colors.push(color_b);
					                                                               
					colors.push(color_r);colors.push(color_g);colors.push(color_b);
					colors.push(color_r);colors.push(color_g);colors.push(color_b);
					colors.push(color_r);colors.push(color_g);colors.push(color_b);
					colors.push(color_r);colors.push(color_g);colors.push(color_b);
					colors.push(color_r);colors.push(color_g);colors.push(color_b);
					colors.push(color_r);colors.push(color_g);colors.push(color_b);
					
				}
			}
		}	

		for(var m=0; m<general_config.id_meso_array.length; m++){
			for(var j=0; j<nj; j++){
				for(var i=0; i<ni; i++){
					var index_1 = j*ni + i;
					
					var temp;
					var h;
					var h_w;
					switch(general_config.id_meso_array[m]){
						case 2:
							temp = MesoNH_O_array[index_1].tht_2;
							h = general_config.THAT[1];
							h_w = general_config.THAT_W[1];
							break;
						case 3:
							temp = MesoNH_O_array[index_1].tht_3;
							h = general_config.THAT[2];
							h_w = general_config.THAT_W[2];
							break;
						case 4:
							temp = MesoNH_O_array[index_1].tht_4;
							h = general_config.THAT[3];
							h_w = general_config.THAT_W[3];
							break;
						case 5:
							temp = MesoNH_O_array[index_1].tht_5;
							h = general_config.THAT[4];
							h_w = general_config.THAT_W[4];
							break;
						case 6:
							temp = MesoNH_O_array[index_1].tht_6;
							h = general_config.THAT[5];
							h_w = general_config.THAT_W[5];
							break;
						case 7:
							temp = MesoNH_O_array[index_1].tht_7;
							h = general_config.THAT[6];
							h_w = general_config.THAT_W[6];
							break;
						case 8:
							temp = MesoNH_O_array[index_1].tht_8;
							h = general_config.THAT[7];
							h_w = general_config.THAT_W[7];
							break;
						case 9:
							temp = MesoNH_O_array[index_1].tht_9;
							h = general_config.THAT[8];
							h_w = general_config.THAT_W[8];
							break;
						case 10:
							temp = MesoNH_O_array[index_1].tht_10;
							h = general_config.THAT[9];
							h_w = general_config.THAT_W[9];
							break;
						case 11:
							temp = MesoNH_O_array[index_1].tht_11;
							h = general_config.THAT[10];
							h_w = general_config.THAT_W[10];
							break;
						case 12:
							temp = MesoNH_O_array[index_1].tht_12;
							h = general_config.THAT[11];
							h_w = general_config.THAT_W[11];
							break;
						case 13:
							temp = MesoNH_O_array[index_1].tht_13;
							h = general_config.THAT[12];
							h_w = general_config.THAT_W[12];
							break;
						case 14:
							temp = MesoNH_O_array[index_1].tht_14;
							h = general_config.THAT[13];
							h_w = general_config.THAT_W[13];
							break;
						case 15:
							temp = MesoNH_O_array[index_1].tht_15;
							h = general_config.THAT[14];
							h_w = general_config.THAT_W[14];
							break;
						case 16:
							temp = MesoNH_O_array[index_1].tht_16;
							h = general_config.THAT[15];
							h_w = general_config.THAT_W[15];
							break;
						case 17:
							temp = MesoNH_O_array[index_1].tht_17;
							h = general_config.THAT[16];
							h_w = general_config.THAT_W[16];
							break;
						case 18:
							temp = MesoNH_O_array[index_1].tht_18;
							h = general_config.THAT[17];
							h_w = general_config.THAT_W[17];
							break;
						case 19:
							temp = MesoNH_O_array[index_1].tht_19;
							h = general_config.THAT[18];
							h_w = general_config.THAT_W[18];
							break;
						case 20:
							temp = MesoNH_O_array[index_1].tht_20;
							h = general_config.THAT[19];
							h_w = general_config.THAT_W[19];
							break;
						case 21:
							temp = MesoNH_O_array[index_1].tht_21;
							h = general_config.THAT[20];
							h_w = general_config.THAT_W[20];
							break;
						case 22:
							temp = MesoNH_O_array[index_1].tht_22;
							h = general_config.THAT[21];
							h_w = general_config.THAT_W[21];
							break;
						case 23:
							temp = MesoNH_O_array[index_1].tht_23;
							h = general_config.THAT[22];
							h_w = general_config.THAT_W[22];
							break;
						case 24:
							temp = MesoNH_O_array[index_1].tht_24;
							h = general_config.THAT[23];
							h_w = general_config.THAT_W[23];
							break;
						case 25:
							temp = MesoNH_O_array[index_1].tht_25;
							h = general_config.THAT[24];
							h_w = general_config.THAT_W[24];
							break;
						case 26:
							temp = MesoNH_O_array[index_1].tht_26;
							h = general_config.THAT[25];
							h_w = general_config.THAT_W[25];
							break;
						case 27:
							temp = MesoNH_O_array[index_1].tht_27;
							h = general_config.THAT[26];
							h_w = general_config.THAT_W[26];
							break;
						case 28:
							temp = MesoNH_O_array[index_1].tht_28;
							h = general_config.THAT[27];
							h_w = general_config.THAT_W[27];
							break;
						case 29:
							temp = MesoNH_O_array[index_1].tht_29;
							h = general_config.THAT[28];
							h_w = general_config.THAT_W[28];
							break;
						case 30:
							temp = MesoNH_O_array[index_1].tht_30;
							h = general_config.THAT[29];
							h_w = general_config.THAT_W[29];
							break;
						case 31:
							temp = MesoNH_O_array[index_1].tht_31;
							h = general_config.THAT[30];
							h_w = general_config.THAT_W[30];
							break;
						case 32:
							temp = MesoNH_O_array[index_1].tht_32;
							h = general_config.THAT[31];
							h_w = general_config.THAT_W[31];
							break;
						default:
							return;
					}
													
					var x_u = MesoNH_U_array[index_1].x - general_config.Coord_X_paris;
					var y_u = MesoNH_U_array[index_1].y - general_config.Coord_Y_paris;
					var z_u = MesoNH_U_array[index_1].zs + h;
					
					var x_v = MesoNH_V_array[index_1].x - general_config.Coord_X_paris;
					var y_v = MesoNH_V_array[index_1].y - general_config.Coord_Y_paris;
					var z_v = MesoNH_V_array[index_1].zs + h;
					
					var z_o = MesoNH_O_array[index_1].zs + h;
					
					var l_x = (MesoNH_O_array[index_1].x - MesoNH_U_array[index_1].x)*2
					var l_y = (MesoNH_O_array[index_1].y - MesoNH_V_array[index_1].y)*2
					
					//up				
					coord_array.push(x_u*general_config.cst_X); 
					coord_array.push(z_o*general_config.cst_Z);
					coord_array.push(-(y_v + l_y)*general_config.cst_Y);
					coord_array.push(x_u*general_config.cst_X); 
					coord_array.push(z_o*general_config.cst_Z);
					coord_array.push(-y_v*general_config.cst_Y);
					coord_array.push((x_u + l_x)*general_config.cst_X); 
					coord_array.push(z_o*general_config.cst_Z);
					coord_array.push(-y_v*general_config.cst_Y);
					
					coord_array.push(x_u*general_config.cst_X); 
					coord_array.push(z_o*general_config.cst_Z);
					coord_array.push(-(y_v + l_y)*general_config.cst_Y);
					coord_array.push((x_u + l_x)*general_config.cst_X); 
					coord_array.push(z_o*general_config.cst_Z);
					coord_array.push(-y_v*general_config.cst_Y);
					coord_array.push((x_u + l_x)*general_config.cst_X); 
					coord_array.push(z_o*general_config.cst_Z);
					coord_array.push(-(y_v + l_y)*general_config.cst_Y);
					
					//down
					coord_array.push(x_u*general_config.cst_X); 
					coord_array.push(z_o*general_config.cst_Z);
					coord_array.push(-(y_v + l_y)*general_config.cst_Y);
					coord_array.push((x_u + l_x)*general_config.cst_X); 
					coord_array.push(z_o*general_config.cst_Z);
					coord_array.push(-y_v*general_config.cst_Y);
					coord_array.push(x_u*general_config.cst_X); 
					coord_array.push(z_o*general_config.cst_Z);
					coord_array.push(-y_v*general_config.cst_Y);
					
					coord_array.push(x_u*general_config.cst_X); 
					coord_array.push(z_o*general_config.cst_Z);
					coord_array.push(-(y_v + l_y)*general_config.cst_Y);
					coord_array.push((x_u + l_x)*general_config.cst_X); 
					coord_array.push(z_o*general_config.cst_Z);
					coord_array.push(-(y_v + l_y)*general_config.cst_Y);
					coord_array.push((x_u + l_x)*general_config.cst_X); 
					coord_array.push(z_o*general_config.cst_Z);
					coord_array.push(-y_v*general_config.cst_Y);
					
					
					var tmin = temperature_scale[0];
					var tmax = temperature_scale[1];
					var percentage_color = (temp - tmin)/(tmax - tmin);
					if(percentage_color<0){
						percentage_color = 0;
					} else if(percentage_color >1){
						percentage_color = 1;
					}
					
					general_config.temp_values.push(parseFloat(temp));
					var color_hex = getHCLcolor(percentage_color,general_config.HCL_color_scales[general_config.active_HCL_id].scale);
												
					var color_rgb = hexToRgb(color_hex)
					
					var color_r = color_rgb.r/255;
					var color_g = color_rgb.g/255;
					var color_b = color_rgb.b/255;
					var transparency = general_config.transparency_factor;
								
					colors.push(color_r);colors.push(color_g);colors.push(color_b);
					colors.push(color_r);colors.push(color_g);colors.push(color_b);
					colors.push(color_r);colors.push(color_g);colors.push(color_b);
					colors.push(color_r);colors.push(color_g);colors.push(color_b);
					colors.push(color_r);colors.push(color_g);colors.push(color_b);
					colors.push(color_r);colors.push(color_g);colors.push(color_b);
					                                                              
					colors.push(color_r);colors.push(color_g);colors.push(color_b);
					colors.push(color_r);colors.push(color_g);colors.push(color_b);
					colors.push(color_r);colors.push(color_g);colors.push(color_b);
					colors.push(color_r);colors.push(color_g);colors.push(color_b);
					colors.push(color_r);colors.push(color_g);colors.push(color_b);
					colors.push(color_r);colors.push(color_g);colors.push(color_b);
					
					
					
				}
			}
		}			
		
				
		var coord_array_32 = new Float32Array(coord_array);
		var colors_32 = new Float32Array(colors);  
		
		    
		var material = new THREE.MeshBasicMaterial({  opacity:general_config.transparency_factor, transparent: true,vertexColors: THREE.VertexColors  });
		var bufferGeometry = new THREE.BufferGeometry();
        
		bufferGeometry.setAttribute( 'position', new THREE.BufferAttribute( coord_array_32, 3 ) );
		bufferGeometry.setAttribute( 'color', new THREE.BufferAttribute( colors_32, 3 ) );
		var mesh = new THREE.Mesh( bufferGeometry, material);
				
		create_temp_histogram();
				
		general_config.grid.add(mesh);
		scene.add(general_config.grid);
	}
	
	function create_2D_points_cloud(MesoNH_O_array,MesoNH_U_array,MesoNH_V_array,grid,id_sbl_array,id_meso_array,temperature_scale,THAT,THAT_W,HCanopy,HCanopy_w,number_points){
		
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
		
		general_config.z_min = null;
		general_config.z_max = null;
		general_config.x_min = null;
		general_config.x_max = null;
		general_config.y_min = null;
		general_config.y_max = null;
		
		general_config.h_min = null;
		general_config.h_max = null;
		for(var m=0; m<general_config.id_sbl_array.length; m++){
			for(var j=0; j<nj; j++){
				for(var i=0; i<ni; i++){
					var index_1 = j*ni + i;
					var h;
					var h_w;
					switch(general_config.id_sbl_array[m]){
						case 1:
							h = general_config.HCanopy[0];
							h_w = general_config.HCanopy_w[0];
							break;
						case 2:
							h = general_config.HCanopy[1];
							h_w = general_config.HCanopy_w[1];
							break;
						case 3:
							h = general_config.HCanopy[2];
							h_w = general_config.HCanopy_w[2];
							break;
						case 4:
							h = general_config.HCanopy[3];
							h_w = general_config.HCanopy_w[3];
							break;
						case 5:
							h = general_config.HCanopy[4];
							h_w = general_config.HCanopy_w[4];
							break;
						case 6:
							h = general_config.HCanopy[5];
							h_w = general_config.HCanopy_w[5];
							break;
						default:
							return;
					}
					
					
					var x_o = MesoNH_O_array[index_1].x - general_config.Coord_X_paris;
					var y_o = MesoNH_O_array[index_1].y - general_config.Coord_Y_paris;					
					var z_o = MesoNH_O_array[index_1].zs + h;
									
					var l_x = (MesoNH_O_array[index_1].x - MesoNH_U_array[index_1].x)*2;
					var l_y = (MesoNH_O_array[index_1].y - MesoNH_V_array[index_1].y)*2;
					var l_z = (h - h_w)*2;
					
					if(general_config.h_min != null && general_config.h_max != null){
						if(h_w < general_config.h_min){
							general_config.h_min = h_w;
						}
						if((h_w + l_z) > general_config.h_max){
							general_config.h_max = (h_w + l_z);
						}
					} else {
						general_config.h_min = h_w;
						general_config.h_max = (h_w + l_z);
					}
					
					if(general_config.z_min != null && general_config.z_max != null){
						if((z_o - l_z/2) < general_config.z_min){
							general_config.z_min = z_o - l_z/2;
						}
						if((z_o + l_z/2) > general_config.z_max){
							general_config.z_max = z_o + l_z/2;
						}
					} else {
						general_config.z_min = z_o - l_z/2;
						general_config.z_max = z_o + l_z/2;
					}
					
					if(general_config.x_min != null && general_config.x_max != null){
						if((x_o - l_x/2) < general_config.x_min){
							general_config.x_min = x_o - l_x/2;
						}
						if((x_o + l_x/2) > general_config.x_max){
							general_config.x_max = x_o + l_x/2;
						}
					} else {
						general_config.x_min = x_o - l_x/2;
						general_config.x_max = x_o + l_x/2;
					}
					
					if(general_config.y_min != null && general_config.y_max != null){
						if((y_o - l_y/2) < general_config.y_min){
							general_config.y_min = y_o - l_y/2;
						}
						if((y_o + l_y/2) > general_config.y_max){
							general_config.y_max = y_o + l_y/2;
						}
					} else {
						general_config.y_min = y_o - l_y/2;
						general_config.y_max = y_o + l_y/2;
					}
					
				}
			}
		}	
		

		for(var m=0; m<general_config.id_meso_array.length; m++){
			for(var j=0; j<nj; j++){
				for(var i=0; i<ni; i++){
					var index_1 = j*ni + i;
					
					var h;
					var h_w;
					switch(general_config.id_meso_array[m]){
						case 2:
							h = general_config.THAT[1];
							h_w = general_config.THAT_W[1];
							break;
						case 3:
							h = general_config.THAT[2];
							h_w = general_config.THAT_W[2];
							break;
						case 4:
							h = general_config.THAT[3];
							h_w = general_config.THAT_W[3];
							break;
						case 5:
							h = general_config.THAT[4];
							h_w = general_config.THAT_W[4];
							break;
						case 6:
							h = general_config.THAT[5];
							h_w = general_config.THAT_W[5];
							break;
						case 7:
							h = general_config.THAT[6];
							h_w = general_config.THAT_W[6];
							break;
						case 8:
							h = general_config.THAT[7];
							h_w = general_config.THAT_W[7];
							break;
						case 9:
							h = general_config.THAT[8];
							h_w = general_config.THAT_W[8];
							break;
						case 10:
							h = general_config.THAT[9];
							h_w = general_config.THAT_W[9];
							break;
						case 11:
							h = general_config.THAT[10];
							h_w = general_config.THAT_W[10];
							break;
						case 12:
							h = general_config.THAT[11];
							h_w = general_config.THAT_W[11];
							break;
						case 13:
							h = general_config.THAT[12];
							h_w = general_config.THAT_W[12];
							break;
						case 14:
							h = general_config.THAT[13];
							h_w = general_config.THAT_W[13];
							break;
						case 15:
							h = general_config.THAT[14];
							h_w = general_config.THAT_W[14];
							break;
						case 16:
							h = general_config.THAT[15];
							h_w = general_config.THAT_W[15];
							break;
						case 17:
							h = general_config.THAT[16];
							h_w = general_config.THAT_W[16];
							break;
						case 18:
							h = general_config.THAT[17];
							h_w = general_config.THAT_W[17];
							break;
						case 19:
							h = general_config.THAT[18];
							h_w = general_config.THAT_W[18];
							break;
						case 20:
							h = general_config.THAT[19];
							h_w = general_config.THAT_W[19];
							break;
						case 21:
							h = general_config.THAT[20];
							h_w = general_config.THAT_W[20];
							break;
						case 22:
							h = general_config.THAT[21];
							h_w = general_config.THAT_W[21];
							break;
						case 23:
							h = general_config.THAT[22];
							h_w = general_config.THAT_W[22];
							break;
						case 24:
							h = general_config.THAT[23];
							h_w = general_config.THAT_W[23];
							break;
						case 25:
							h = general_config.THAT[24];
							h_w = general_config.THAT_W[24];
							break;
						case 26:
							h = general_config.THAT[25];
							h_w = general_config.THAT_W[25];
							break;
						case 27:
							h = general_config.THAT[26];
							h_w = general_config.THAT_W[26];
							break;
						case 28:
							h = general_config.THAT[27];
							h_w = general_config.THAT_W[27];
							break;
						case 29:
							h = general_config.THAT[28];
							h_w = general_config.THAT_W[28];
							break;
						case 30:
							h = general_config.THAT[29];
							h_w = general_config.THAT_W[29];
							break;
						case 31:
							h = general_config.THAT[30];
							h_w = general_config.THAT_W[30];
							break;
						case 32:
							h = general_config.THAT[31];
							h_w = general_config.THAT_W[31];
							break;
						default:
							return;
					}
													
					var x_o = MesoNH_O_array[index_1].x - general_config.Coord_X_paris;
					var y_o = MesoNH_O_array[index_1].y - general_config.Coord_Y_paris;					
					var z_o = MesoNH_O_array[index_1].zs + h;
					
					var l_x = (MesoNH_O_array[index_1].x - MesoNH_U_array[index_1].x)*2;
					var l_y = (MesoNH_O_array[index_1].y - MesoNH_V_array[index_1].y)*2;
					var l_z = (h-h_w)*2;
									
					if(general_config.h_min != null && general_config.h_max != null){
						if(h_w < general_config.h_min){
							general_config.h_min = h_w;
						}
						if((h_w + l_z) > general_config.h_max){
							general_config.h_max = (h_w + l_z);
						}
					} else {
						general_config.h_min = h_w;
						general_config.h_max = (h_w + l_z);
					}
						
					if(general_config.z_min != null && general_config.z_max != null){
						if((z_o - l_z/2) < general_config.z_min){
							general_config.z_min = z_o - l_z/2;
						}
						if((z_o + l_z/2) > general_config.z_max){
							general_config.z_max = z_o + l_z/2;
						}
					} else {
						general_config.z_min = z_o - l_z/2;
						general_config.z_max = z_o + l_z/2;
					}
					
					if(general_config.x_min != null && general_config.x_max != null){
						if((x_o - l_x/2) < general_config.x_min){
							general_config.x_min = x_o - l_x/2;
						}
						if((x_o + l_x/2) > general_config.x_max){
							general_config.x_max = x_o + l_x/2;
						}
					} else {
						general_config.x_min = x_o - l_x/2;
						general_config.x_max = x_o + l_x/2;
					}
					
					if(general_config.y_min != null && general_config.y_max != null){
						if((y_o - l_y/2) < general_config.y_min){
							general_config.y_min = y_o - l_y/2;
						}
						if((y_o + l_y/2) > general_config.y_max){
							general_config.y_max = y_o + l_y/2;
						}
					} else {
						general_config.y_min = y_o - l_y/2;
						general_config.y_max = y_o + l_y/2;
					}
				
					
				}
			}
		}	
		
		for(var m=0; m<general_config.id_sbl_array.length; m++){
			for(var j=0; j<nj; j++){
				for(var i=0; i<ni; i++){
					var index_1 = j*ni + i;
					var temp;
					var h;
					var h_w;
					switch(general_config.id_sbl_array[m]){
						case 1:
							temp = MesoNH_O_array[index_1].teb_1;
							h = general_config.HCanopy[0];
							h_w = general_config.HCanopy_w[0];
							break;
						case 2:
							temp = MesoNH_O_array[index_1].teb_2;
							h = general_config.HCanopy[1];
							h_w = general_config.HCanopy_w[1];
							break;
						case 3:
							temp = MesoNH_O_array[index_1].teb_3;
							h = general_config.HCanopy[2];
							h_w = general_config.HCanopy_w[2];
							break;
						case 4:
							temp = MesoNH_O_array[index_1].teb_4;
							h = general_config.HCanopy[3];
							h_w = general_config.HCanopy_w[3];
							break;
						case 5:
							temp = MesoNH_O_array[index_1].teb_5;
							h = general_config.HCanopy[4];
							h_w = general_config.HCanopy_w[4];
							break;
						case 6:
							temp = MesoNH_O_array[index_1].teb_6;
							h = general_config.HCanopy[5];
							h_w = general_config.HCanopy_w[5];
							break;
						default:
							return;
					}
					
					var x_u = MesoNH_U_array[index_1].x - general_config.Coord_X_paris;
					var y_u = MesoNH_U_array[index_1].y - general_config.Coord_Y_paris;
					var z_u = MesoNH_U_array[index_1].zs + h;
					
					var x_v = MesoNH_V_array[index_1].x - general_config.Coord_X_paris;
					var y_v = MesoNH_V_array[index_1].y - general_config.Coord_Y_paris;
					var z_v = MesoNH_V_array[index_1].zs + h;
					
					var z_o = MesoNH_O_array[index_1].zs + h;
					
					var l_x = (MesoNH_O_array[index_1].x - MesoNH_U_array[index_1].x)*2;
					var l_y = (MesoNH_O_array[index_1].y - MesoNH_V_array[index_1].y)*2;
					var l_z = (h-h_w)*2;
					
					var tmin = temperature_scale[0];
					var tmax = temperature_scale[1];
					var percentage_color = (temp - tmin)/(tmax - tmin);
					if(percentage_color<0){
						percentage_color = 0;
					} else if(percentage_color >1){
						percentage_color = 1;
					}
					
					general_config.temp_values.push(parseFloat(temp));
					var color_hex = getHCLcolor(percentage_color,general_config.HCL_color_scales[general_config.active_HCL_id].scale);
												
					var color_rgb = hexToRgb(color_hex)
					
					var color_r = color_rgb.r/255;
					var color_g = color_rgb.g/255;
					var color_b = color_rgb.b/255;
					
										
					var size;
					var basic_size = 10000;
					
					if(general_config.relative_size_factor < 1){
						var add_factor = 1-general_config.relative_size_factor;
						if(percentage_color < 0.5){
							size = parseInt(basic_size + basic_size*add_factor*(0.5-percentage_color)*2);
						} else if(percentage_color == 0.5){
							size = basic_size;
						} else if(percentage_color > 0.5){
							size = parseInt(basic_size - basic_size*add_factor*(percentage_color-0.5)*2);
						}
					} else if(general_config.relative_size_factor == 1){
						size = basic_size;
					} else if(general_config.relative_size_factor >1){
						var add_factor = general_config.relative_size_factor-1;
						if(percentage_color < 0.5){
							size = parseInt(basic_size - basic_size*add_factor*(0.5-percentage_color)*2);
						} else if(percentage_color == 0.5){
							size = basic_size;
						} else if(percentage_color > 0.5){
							size = parseInt(basic_size + basic_size*add_factor*(percentage_color-0.5)*2);
						}
					}
								
					var number_points_offset_x = l_x/number_points;
					var number_points_offset_y = l_y/number_points;
					
					for(var a=0; a<number_points; a++){
						for(var b=0; b<number_points; b++){
							var pX = (x_u + a*number_points_offset_x);
							var pY = (y_v + b*number_points_offset_y);
							var pZ = z_o;
							coord_array.push(pX*general_config.cst_X); 
							coord_array.push(pZ*general_config.cst_Z);
							coord_array.push(-pY*general_config.cst_Y);
							colors.push(color_r);colors.push(color_g);colors.push(color_b);
							sizes.push(size);
							transparency_factor_array.push(general_config.transparency_factor);
							custompercentagearray.push(percentage_color*2*Math.PI);
							z_position_array.push((pZ - general_config.z_min)/(general_config.z_max - general_config.z_min));
							x_position_array.push((pX - general_config.x_min)/(general_config.x_max - general_config.x_min));
							y_position_array.push((pY - general_config.y_min)/(general_config.y_max - general_config.y_min));
							h_position_array.push(((pZ-MesoNH_O_array[index_1].zs)-general_config.h_min)/(general_config.h_max - general_config.h_min));
						}
					}
						
				}
			}
		}	

		for(var m=0; m<general_config.id_meso_array.length; m++){
			for(var j=0; j<nj; j++){
				for(var i=0; i<ni; i++){
					var index_1 = j*ni + i;
					
					var temp;
					var h;
					var h_w;
					switch(general_config.id_meso_array[m]){
						case 2:
							temp = MesoNH_O_array[index_1].tht_2;
							h = general_config.THAT[1];
							h_w = general_config.THAT_W[1];
							break;
						case 3:
							temp = MesoNH_O_array[index_1].tht_3;
							h = general_config.THAT[2];
							h_w = general_config.THAT_W[2];
							break;
						case 4:
							temp = MesoNH_O_array[index_1].tht_4;
							h = general_config.THAT[3];
							h_w = general_config.THAT_W[3];
							break;
						case 5:
							temp = MesoNH_O_array[index_1].tht_5;
							h = general_config.THAT[4];
							h_w = general_config.THAT_W[4];
							break;
						case 6:
							temp = MesoNH_O_array[index_1].tht_6;
							h = general_config.THAT[5];
							h_w = general_config.THAT_W[5];
							break;
						case 7:
							temp = MesoNH_O_array[index_1].tht_7;
							h = general_config.THAT[6];
							h_w = general_config.THAT_W[6];
							break;
						case 8:
							temp = MesoNH_O_array[index_1].tht_8;
							h = general_config.THAT[7];
							h_w = general_config.THAT_W[7];
							break;
						case 9:
							temp = MesoNH_O_array[index_1].tht_9;
							h = general_config.THAT[8];
							h_w = general_config.THAT_W[8];
							break;
						case 10:
							temp = MesoNH_O_array[index_1].tht_10;
							h = general_config.THAT[9];
							h_w = general_config.THAT_W[9];
							break;
						case 11:
							temp = MesoNH_O_array[index_1].tht_11;
							h = general_config.THAT[10];
							h_w = general_config.THAT_W[10];
							break;
						case 12:
							temp = MesoNH_O_array[index_1].tht_12;
							h = general_config.THAT[11];
							h_w = general_config.THAT_W[11];
							break;
						case 13:
							temp = MesoNH_O_array[index_1].tht_13;
							h = general_config.THAT[12];
							h_w = general_config.THAT_W[12];
							break;
						case 14:
							temp = MesoNH_O_array[index_1].tht_14;
							h = general_config.THAT[13];
							h_w = general_config.THAT_W[13];
							break;
						case 15:
							temp = MesoNH_O_array[index_1].tht_15;
							h = general_config.THAT[14];
							h_w = general_config.THAT_W[14];
							break;
						case 16:
							temp = MesoNH_O_array[index_1].tht_16;
							h = general_config.THAT[15];
							h_w = general_config.THAT_W[15];
							break;
						case 17:
							temp = MesoNH_O_array[index_1].tht_17;
							h = general_config.THAT[16];
							h_w = general_config.THAT_W[16];
							break;
						case 18:
							temp = MesoNH_O_array[index_1].tht_18;
							h = general_config.THAT[17];
							h_w = general_config.THAT_W[17];
							break;
						case 19:
							temp = MesoNH_O_array[index_1].tht_19;
							h = general_config.THAT[18];
							h_w = general_config.THAT_W[18];
							break;
						case 20:
							temp = MesoNH_O_array[index_1].tht_20;
							h = general_config.THAT[19];
							h_w = general_config.THAT_W[19];
							break;
						case 21:
							temp = MesoNH_O_array[index_1].tht_21;
							h = general_config.THAT[20];
							h_w = general_config.THAT_W[20];
							break;
						case 22:
							temp = MesoNH_O_array[index_1].tht_22;
							h = general_config.THAT[21];
							h_w = general_config.THAT_W[21];
							break;
						case 23:
							temp = MesoNH_O_array[index_1].tht_23;
							h = general_config.THAT[22];
							h_w = general_config.THAT_W[22];
							break;
						case 24:
							temp = MesoNH_O_array[index_1].tht_24;
							h = general_config.THAT[23];
							h_w = general_config.THAT_W[23];
							break;
						case 25:
							temp = MesoNH_O_array[index_1].tht_25;
							h = general_config.THAT[24];
							h_w = general_config.THAT_W[24];
							break;
						case 26:
							temp = MesoNH_O_array[index_1].tht_26;
							h = general_config.THAT[25];
							h_w = general_config.THAT_W[25];
							break;
						case 27:
							temp = MesoNH_O_array[index_1].tht_27;
							h = general_config.THAT[26];
							h_w = general_config.THAT_W[26];
							break;
						case 28:
							temp = MesoNH_O_array[index_1].tht_28;
							h = general_config.THAT[27];
							h_w = general_config.THAT_W[27];
							break;
						case 29:
							temp = MesoNH_O_array[index_1].tht_29;
							h = general_config.THAT[28];
							h_w = general_config.THAT_W[28];
							break;
						case 30:
							temp = MesoNH_O_array[index_1].tht_30;
							h = general_config.THAT[29];
							h_w = general_config.THAT_W[29];
							break;
						case 31:
							temp = MesoNH_O_array[index_1].tht_31;
							h = general_config.THAT[30];
							h_w = general_config.THAT_W[30];
							break;
						case 32:
							temp = MesoNH_O_array[index_1].tht_32;
							h = general_config.THAT[31];
							h_w = general_config.THAT_W[31];
							break;
						default:
							return;
					}
													
					var x_u = MesoNH_U_array[index_1].x - general_config.Coord_X_paris;
					var y_u = MesoNH_U_array[index_1].y - general_config.Coord_Y_paris;
					var z_u = MesoNH_U_array[index_1].zs + h;
					
					var x_v = MesoNH_V_array[index_1].x - general_config.Coord_X_paris;
					var y_v = MesoNH_V_array[index_1].y - general_config.Coord_Y_paris;
					var z_v = MesoNH_V_array[index_1].zs + h;
					
					var z_o = MesoNH_O_array[index_1].zs + h;
					
					var l_x = (MesoNH_O_array[index_1].x - MesoNH_U_array[index_1].x)*2;
					var l_y = (MesoNH_O_array[index_1].y - MesoNH_V_array[index_1].y)*2;
					var l_z = (h-h_w)*2;
							
					
					var tmin = temperature_scale[0];
					var tmax = temperature_scale[1];
					var percentage_color = (temp - tmin)/(tmax - tmin);
					if(percentage_color<0){
						percentage_color = 0;
					} else if(percentage_color >1){
						percentage_color = 1;
					}
					
					general_config.temp_values.push(parseFloat(temp));
					var color_hex = getHCLcolor(percentage_color,general_config.HCL_color_scales[general_config.active_HCL_id].scale);
												
					var color_rgb = hexToRgb(color_hex)
					
					var color_r = color_rgb.r/255;
					var color_g = color_rgb.g/255;
					var color_b = color_rgb.b/255;
					
										
					var size;
					var basic_size = 10000;
					
					if(general_config.relative_size_factor < 1){
						var add_factor = 1-general_config.relative_size_factor;
						if(percentage_color < 0.5){
							size = parseInt(basic_size + basic_size*add_factor*(0.5-percentage_color)*2);
						} else if(percentage_color == 0.5){
							size = basic_size;
						} else if(percentage_color > 0.5){
							size = parseInt(basic_size - basic_size*add_factor*(percentage_color-0.5)*2);
						}
					} else if(general_config.relative_size_factor == 1){
						size = basic_size;
					} else if(general_config.relative_size_factor >1){
						var add_factor = general_config.relative_size_factor-1;
						if(percentage_color < 0.5){
							size = parseInt(basic_size - basic_size*add_factor*(0.5-percentage_color)*2);
						} else if(percentage_color == 0.5){
							size = basic_size;
						} else if(percentage_color > 0.5){
							size = parseInt(basic_size + basic_size*add_factor*(percentage_color-0.5)*2);
						}
					}
								
					var number_points_offset_x = l_x/number_points;
					var number_points_offset_y = l_y/number_points;
					
					for(var a=0; a<number_points; a++){
						for(var b=0; b<number_points; b++){
							var pX = (x_u + a*number_points_offset_x);
							var pY = (y_v + b*number_points_offset_y);
							var pZ = z_o;
							coord_array.push(pX*general_config.cst_X); 
							coord_array.push(pZ*general_config.cst_Z);
							coord_array.push(-pY*general_config.cst_Y);
							colors.push(color_r);colors.push(color_g);colors.push(color_b);
							sizes.push(size);
							transparency_factor_array.push(general_config.transparency_factor);
							custompercentagearray.push(percentage_color*2*Math.PI);
							z_position_array.push((pZ - general_config.z_min)/(general_config.z_max - general_config.z_min));
							x_position_array.push((pX - general_config.x_min)/(general_config.x_max - general_config.x_min));
							y_position_array.push((pY - general_config.y_min)/(general_config.y_max - general_config.y_min));
							h_position_array.push(((pZ-MesoNH_O_array[index_1].zs)-general_config.h_min)/(general_config.h_max - general_config.h_min));
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
					
		var material;
		var bufferGeometry = new THREE.BufferGeometry();
		
		bufferGeometry.setAttribute( 'position', new THREE.BufferAttribute( coord_array_32, 3 ) );
		bufferGeometry.setAttribute( 'customColor', new THREE.BufferAttribute( colors_32, 3 ) );
		bufferGeometry.setAttribute( 'customsize', new THREE.BufferAttribute(sizes_32,1));
		bufferGeometry.setAttribute( 'customtransparency', new THREE.BufferAttribute(transparency_factor_32,1));
		bufferGeometry.setAttribute( 'custompercentage', new THREE.BufferAttribute(custompercentage_32,1));
		bufferGeometry.setAttribute( 'z_position', new THREE.BufferAttribute(z_position_array_32,1));
		bufferGeometry.setAttribute( 'x_position', new THREE.BufferAttribute(x_position_array_32,1));
		bufferGeometry.setAttribute( 'y_position', new THREE.BufferAttribute(y_position_array_32,1));
		bufferGeometry.setAttribute( 'h_position', new THREE.BufferAttribute(h_position_array_32,1));
        
		if(general_config.is_animated == false){
			material = new THREE.ShaderMaterial( {
				uniforms: {
					color: { value: new THREE.Color( 0xffffff ) },
					pointTexture: { value: new THREE.TextureLoader().load( "disc.png" ) },
					regularSize: { value: general_config.regular_size },
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
							temp_factor_max: { type: "f", value: general_config.temp_max_factor }
				},
				vertexShader: document.getElementById( 'vertexshader_fix' ).textContent,
				fragmentShader: document.getElementById( 'fragmentshader' ).textContent,
				transparent: true
			} );
		} else if (general_config.is_animated == true){
			if(general_config.animation_parameter == 'temp'){
				material = new THREE.ShaderMaterial( {
					uniforms: {
						color: { value: new THREE.Color( 0xffffff ) },
						pointTexture: { value: new THREE.TextureLoader().load( "disc.png" ) },
						regularSize: { value: general_config.regular_size },
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
							temp_factor_max: { type: "f", value: general_config.temp_max_factor }
					},
					vertexShader: document.getElementById( 'vertexshader_anim_temp' ).textContent,
					fragmentShader: document.getElementById( 'fragmentshader' ).textContent,
					transparent: true
				} );
				
			} else if(general_config.animation_parameter == 'Z'){
				material = new THREE.ShaderMaterial( {
					uniforms: {
						color: { value: new THREE.Color( 0xffffff ) },
						pointTexture: { value: new THREE.TextureLoader().load( "disc.png" ) },
						regularSize: { value: general_config.regular_size },
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
							temp_factor_max: { type: "f", value: general_config.temp_max_factor }
					},
					vertexShader: document.getElementById( 'vertexshader_anim_z' ).textContent,
					fragmentShader: document.getElementById( 'fragmentshader' ).textContent,
					transparent: true
				} );
				
			} else if(general_config.animation_parameter == 'X'){
				material = new THREE.ShaderMaterial( {
					uniforms: {
						color: { value: new THREE.Color( 0xffffff ) },
						pointTexture: { value: new THREE.TextureLoader().load( "disc.png" ) },
						regularSize: { value: general_config.regular_size },
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
							temp_factor_max: { type: "f", value: general_config.temp_max_factor }
					},
					vertexShader: document.getElementById( 'vertexshader_anim_x' ).textContent,
					fragmentShader: document.getElementById( 'fragmentshader' ).textContent,
					transparent: true
				} );
				
			} else if(general_config.animation_parameter == 'Y'){
				material = new THREE.ShaderMaterial( {
					uniforms: {
						color: { value: new THREE.Color( 0xffffff ) },
						pointTexture: { value: new THREE.TextureLoader().load( "disc.png" ) },
						regularSize: { value: general_config.regular_size },
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
							temp_factor_max: { type: "f", value: general_config.temp_max_factor }
					},
					vertexShader: document.getElementById( 'vertexshader_anim_y' ).textContent,
					fragmentShader: document.getElementById( 'fragmentshader' ).textContent,
					transparent: true
				} );
				
			}
		}
		
	
		var point = new THREE.Points( bufferGeometry, material);
			
		create_temp_histogram();
			
		general_config.grid.add(point);
		scene.add(general_config.grid);
	}
	
	function create_regular_points_cloud(MesoNH_O_array,MesoNH_U_array,MesoNH_V_array,grid,id_sbl_array,id_meso_array,temperature_scale,THAT,THAT_W,HCanopy,HCanopy_w){
	
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
		
		general_config.z_min = null;
		general_config.z_max = null;
		general_config.x_min = null;
		general_config.x_max = null;
		general_config.y_min = null;
		general_config.y_max = null;
		
		general_config.h_min = null;
		general_config.h_max = null;
		
		for(var m=0; m<general_config.id_sbl_array.length; m++){
			for(var j=0; j<nj; j++){
				for(var i=0; i<ni; i++){
					var index_1 = j*ni + i;
					var h;
					var h_w;
					switch(general_config.id_sbl_array[m]){
						case 1:
							h = general_config.HCanopy[0];
							h_w = general_config.HCanopy_w[0];
							break;
						case 2:
							h = general_config.HCanopy[1];
							h_w = general_config.HCanopy_w[1];
							break;
						case 3:
							h = general_config.HCanopy[2];
							h_w = general_config.HCanopy_w[2];
							break;
						case 4:
							h = general_config.HCanopy[3];
							h_w = general_config.HCanopy_w[3];
							break;
						case 5:
							h = general_config.HCanopy[4];
							h_w = general_config.HCanopy_w[4];
							break;
						case 6:
							h = general_config.HCanopy[5];
							h_w = general_config.HCanopy_w[5];
							break;
						default:
							return;
					}
					
					
					var x_o = MesoNH_O_array[index_1].x - general_config.Coord_X_paris;
					var y_o = MesoNH_O_array[index_1].y - general_config.Coord_Y_paris;					
					var z_o = MesoNH_O_array[index_1].zs + h;
									
					var l_x = (MesoNH_O_array[index_1].x - MesoNH_U_array[index_1].x)*2;
					var l_y = (MesoNH_O_array[index_1].y - MesoNH_V_array[index_1].y)*2;
					var l_z = (h - h_w)*2;
					
					if(general_config.h_min != null && general_config.h_max != null){
						if(h_w < general_config.h_min){
							general_config.h_min = h_w;
						}
						if((h_w + l_z) > general_config.h_max){
							general_config.h_max = (h_w + l_z);
						}
					} else {
						general_config.h_min = h_w;
						general_config.h_max = (h_w + l_z);
					}
					
					if(general_config.z_min != null && general_config.z_max != null){
						if((z_o - l_z/2) < general_config.z_min){
							general_config.z_min = z_o - l_z/2;
						}
						if((z_o + l_z/2) > general_config.z_max){
							general_config.z_max = z_o + l_z/2;
						}
					} else {
						general_config.z_min = z_o - l_z/2;
						general_config.z_max = z_o + l_z/2;
					}
					
					if(general_config.x_min != null && general_config.x_max != null){
						if((x_o - l_x/2) < general_config.x_min){
							general_config.x_min = x_o - l_x/2;
						}
						if((x_o + l_x/2) > general_config.x_max){
							general_config.x_max = x_o + l_x/2;
						}
					} else {
						general_config.x_min = x_o - l_x/2;
						general_config.x_max = x_o + l_x/2;
					}
					
					if(general_config.y_min != null && general_config.y_max != null){
						if((y_o - l_y/2) < general_config.y_min){
							general_config.y_min = y_o - l_y/2;
						}
						if((y_o + l_y/2) > general_config.y_max){
							general_config.y_max = y_o + l_y/2;
						}
					} else {
						general_config.y_min = y_o - l_y/2;
						general_config.y_max = y_o + l_y/2;
					}
					
				}
			}
		}	
		

		for(var m=0; m<general_config.id_meso_array.length; m++){
			for(var j=0; j<nj; j++){
				for(var i=0; i<ni; i++){
					var index_1 = j*ni + i;
					
					var h;
					var h_w;
					switch(general_config.id_meso_array[m]){
						case 2:
							h = general_config.THAT[1];
							h_w = general_config.THAT_W[1];
							break;
						case 3:
							h = general_config.THAT[2];
							h_w = general_config.THAT_W[2];
							break;
						case 4:
							h = general_config.THAT[3];
							h_w = general_config.THAT_W[3];
							break;
						case 5:
							h = general_config.THAT[4];
							h_w = general_config.THAT_W[4];
							break;
						case 6:
							h = general_config.THAT[5];
							h_w = general_config.THAT_W[5];
							break;
						case 7:
							h = general_config.THAT[6];
							h_w = general_config.THAT_W[6];
							break;
						case 8:
							h = general_config.THAT[7];
							h_w = general_config.THAT_W[7];
							break;
						case 9:
							h = general_config.THAT[8];
							h_w = general_config.THAT_W[8];
							break;
						case 10:
							h = general_config.THAT[9];
							h_w = general_config.THAT_W[9];
							break;
						case 11:
							h = general_config.THAT[10];
							h_w = general_config.THAT_W[10];
							break;
						case 12:
							h = general_config.THAT[11];
							h_w = general_config.THAT_W[11];
							break;
						case 13:
							h = general_config.THAT[12];
							h_w = general_config.THAT_W[12];
							break;
						case 14:
							h = general_config.THAT[13];
							h_w = general_config.THAT_W[13];
							break;
						case 15:
							h = general_config.THAT[14];
							h_w = general_config.THAT_W[14];
							break;
						case 16:
							h = general_config.THAT[15];
							h_w = general_config.THAT_W[15];
							break;
						case 17:
							h = general_config.THAT[16];
							h_w = general_config.THAT_W[16];
							break;
						case 18:
							h = general_config.THAT[17];
							h_w = general_config.THAT_W[17];
							break;
						case 19:
							h = general_config.THAT[18];
							h_w = general_config.THAT_W[18];
							break;
						case 20:
							h = general_config.THAT[19];
							h_w = general_config.THAT_W[19];
							break;
						case 21:
							h = general_config.THAT[20];
							h_w = general_config.THAT_W[20];
							break;
						case 22:
							h = general_config.THAT[21];
							h_w = general_config.THAT_W[21];
							break;
						case 23:
							h = general_config.THAT[22];
							h_w = general_config.THAT_W[22];
							break;
						case 24:
							h = general_config.THAT[23];
							h_w = general_config.THAT_W[23];
							break;
						case 25:
							h = general_config.THAT[24];
							h_w = general_config.THAT_W[24];
							break;
						case 26:
							h = general_config.THAT[25];
							h_w = general_config.THAT_W[25];
							break;
						case 27:
							h = general_config.THAT[26];
							h_w = general_config.THAT_W[26];
							break;
						case 28:
							h = general_config.THAT[27];
							h_w = general_config.THAT_W[27];
							break;
						case 29:
							h = general_config.THAT[28];
							h_w = general_config.THAT_W[28];
							break;
						case 30:
							h = general_config.THAT[29];
							h_w = general_config.THAT_W[29];
							break;
						case 31:
							h = general_config.THAT[30];
							h_w = general_config.THAT_W[30];
							break;
						case 32:
							h = general_config.THAT[31];
							h_w = general_config.THAT_W[31];
							break;
						default:
							return;
					}
													
					var x_o = MesoNH_O_array[index_1].x - general_config.Coord_X_paris;
					var y_o = MesoNH_O_array[index_1].y - general_config.Coord_Y_paris;					
					var z_o = MesoNH_O_array[index_1].zs + h;
					
					var l_x = (MesoNH_O_array[index_1].x - MesoNH_U_array[index_1].x)*2;
					var l_y = (MesoNH_O_array[index_1].y - MesoNH_V_array[index_1].y)*2;
					var l_z = (h-h_w)*2;
									
					if(general_config.h_min != null && general_config.h_max != null){
						if(h_w < general_config.h_min){
							general_config.h_min = h_w;
						}
						if((h_w + l_z) > general_config.h_max){
							general_config.h_max = (h_w + l_z);
						}
					} else {
						general_config.h_min = h_w;
						general_config.h_max = (h_w + l_z);
					}
						
					if(general_config.z_min != null && general_config.z_max != null){
						if((z_o - l_z/2) < general_config.z_min){
							general_config.z_min = z_o - l_z/2;
						}
						if((z_o + l_z/2) > general_config.z_max){
							general_config.z_max = z_o + l_z/2;
						}
					} else {
						general_config.z_min = z_o - l_z/2;
						general_config.z_max = z_o + l_z/2;
					}
					
					if(general_config.x_min != null && general_config.x_max != null){
						if((x_o - l_x/2) < general_config.x_min){
							general_config.x_min = x_o - l_x/2;
						}
						if((x_o + l_x/2) > general_config.x_max){
							general_config.x_max = x_o + l_x/2;
						}
					} else {
						general_config.x_min = x_o - l_x/2;
						general_config.x_max = x_o + l_x/2;
					}
					
					if(general_config.y_min != null && general_config.y_max != null){
						if((y_o - l_y/2) < general_config.y_min){
							general_config.y_min = y_o - l_y/2;
						}
						if((y_o + l_y/2) > general_config.y_max){
							general_config.y_max = y_o + l_y/2;
						}
					} else {
						general_config.y_min = y_o - l_y/2;
						general_config.y_max = y_o + l_y/2;
					}
				
					
				}
			}
		}	
		
		
		for(var m=0; m<general_config.id_sbl_array.length; m++){
			for(var j=0; j<nj; j++){
				for(var i=0; i<ni; i++){
					var index_1 = j*ni + i;
					var temp;
					var h;
					var h_w;
					switch(general_config.id_sbl_array[m]){
						case 1:
							temp = MesoNH_O_array[index_1].teb_1;
							h = general_config.HCanopy[0];
							h_w = general_config.HCanopy_w[0];
							break;
						case 2:
							temp = MesoNH_O_array[index_1].teb_2;
							h = general_config.HCanopy[1];
							h_w = general_config.HCanopy_w[1];
							break;
						case 3:
							temp = MesoNH_O_array[index_1].teb_3;
							h = general_config.HCanopy[2];
							h_w = general_config.HCanopy_w[2];
							break;
						case 4:
							temp = MesoNH_O_array[index_1].teb_4;
							h = general_config.HCanopy[3];
							h_w = general_config.HCanopy_w[3];
							break;
						case 5:
							temp = MesoNH_O_array[index_1].teb_5;
							h = general_config.HCanopy[4];
							h_w = general_config.HCanopy_w[4];
							break;
						case 6:
							temp = MesoNH_O_array[index_1].teb_6;
							h = general_config.HCanopy[5];
							h_w = general_config.HCanopy_w[5];
							break;
						default:
							return;
					}
					
					
					var x_o = MesoNH_O_array[index_1].x - general_config.Coord_X_paris;
					var y_o = MesoNH_O_array[index_1].y - general_config.Coord_Y_paris;					
					var z_o = MesoNH_O_array[index_1].zs + h;
									
					var l_x = (MesoNH_O_array[index_1].x - MesoNH_U_array[index_1].x)*2;
					var l_y = (MesoNH_O_array[index_1].y - MesoNH_V_array[index_1].y)*2;
					var l_z = (h - h_w)*2;
					
								
					var tmin = temperature_scale[0];
					var tmax = temperature_scale[1];
					var percentage_color = (temp - tmin)/(tmax - tmin);
					if(percentage_color<0){
						percentage_color = 0;
					} else if(percentage_color >1){
						percentage_color = 1;
					}
					
					general_config.temp_values.push(parseFloat(temp));
					var color_hex = getHCLcolor(percentage_color,general_config.HCL_color_scales[general_config.active_HCL_id].scale);
												
					var color_rgb = hexToRgb(color_hex)
					
					var color_r = color_rgb.r/255;
					var color_g = color_rgb.g/255;
					var color_b = color_rgb.b/255;
						
					var cell_volume = l_x*l_y*l_z;
					
					var relative_density;
					
					if(general_config.relative_density_factor < 1){
						var add_factor = 1-general_config.relative_density_factor;
						if(percentage_color < 0.5){
							relative_density = general_config.particle_density + general_config.particle_density*add_factor*(0.5-percentage_color)*2;
						} else if(percentage_color == 0.5){
							relative_density = general_config.particle_density;
						} else if(percentage_color > 0.5){
							relative_density = general_config.particle_density - general_config.particle_density*add_factor*(percentage_color-0.5)*2;
						}
					} else if(general_config.relative_density_factor == 1){
						relative_density = general_config.particle_density;
					} else if(general_config.relative_density_factor >1){
						var add_factor = general_config.relative_density_factor-1;
						if(percentage_color < 0.5){
							relative_density = general_config.particle_density - general_config.particle_density*add_factor*(0.5-percentage_color)*2;
						} else if(percentage_color == 0.5){
							relative_density = general_config.particle_density;
						} else if(percentage_color > 0.5){
							relative_density = general_config.particle_density + general_config.particle_density*add_factor*(percentage_color-0.5)*2;
						}
					}
										
					var size;
					var basic_size = 10000;
					
					if(general_config.relative_size_factor < 1){
						var add_factor = 1-general_config.relative_size_factor;
						if(percentage_color < 0.5){
							size = parseInt(basic_size + basic_size*add_factor*(0.5-percentage_color)*2);
						} else if(percentage_color == 0.5){
							size = basic_size;
						} else if(percentage_color > 0.5){
							size = parseInt(basic_size - basic_size*add_factor*(percentage_color-0.5)*2);
						}
					} else if(general_config.relative_size_factor == 1){
						size = basic_size;
					} else if(general_config.relative_size_factor >1){
						var add_factor = general_config.relative_size_factor-1;
						if(percentage_color < 0.5){
							size = parseInt(basic_size - basic_size*add_factor*(0.5-percentage_color)*2);
						} else if(percentage_color == 0.5){
							size = basic_size;
						} else if(percentage_color > 0.5){
							size = parseInt(basic_size + basic_size*add_factor*(percentage_color-0.5)*2);
						}
					}
						
					var particle_length_XY = parseInt(relative_density*l_x*l_y);
					
					var offset_xy = l_x/Math.sqrt(particle_length_XY);
					
					var number_particule_x = parseInt(Math.sqrt(particle_length_XY));
					var number_particule_y = parseInt(Math.sqrt(particle_length_XY));
					var number_particule_z = parseInt((l_z*general_config.cst_Z)/(offset_xy*general_config.cst_X));
					
					
					
					if(number_particule_x <1){
					number_particule_x=1;
					}
					if(number_particule_y <1){
					number_particule_y=1;
					}
					if(number_particule_z <1){
					number_particule_z=1;
					}
					var offset_z = l_z/number_particule_z;
					var counter =0;									
					for(var a=0; a<number_particule_x; a++){
						for(var b=0; b<number_particule_y; b++){
							for(var c=0; c<number_particule_z; c++){
								var pX = (x_o - l_x/2 + a*offset_xy);
								var pY = (y_o - l_y/2 + b*offset_xy);
								var pZ = (z_o - l_z/2 + c*offset_z);
								coord_array.push(pX*general_config.cst_X);
								coord_array.push(pZ*general_config.cst_Z);
								coord_array.push(-pY*general_config.cst_Y);
								colors.push(color_r);colors.push(color_g);colors.push(color_b);
								sizes.push(size);
								transparency_factor_array.push(general_config.transparency_factor);
								custompercentagearray.push(percentage_color*2*Math.PI);
								z_position_array.push((pZ - general_config.z_min)/(general_config.z_max - general_config.z_min));
								x_position_array.push((pX - general_config.x_min)/(general_config.x_max - general_config.x_min));
								y_position_array.push((pY - general_config.y_min)/(general_config.y_max - general_config.y_min));
								h_position_array.push(((pZ-MesoNH_O_array[index_1].zs)-general_config.h_min)/(general_config.h_max - general_config.h_min));
							}
						}
					}
												
				}
			}
		}	
		for(var m=0; m<general_config.id_meso_array.length; m++){
			for(var j=0; j<nj; j++){
				for(var i=0; i<ni; i++){
					var index_1 = j*ni + i;
					
					var temp;
					var h;
					var h_w;
					switch(general_config.id_meso_array[m]){
						case 2:
							temp = MesoNH_O_array[index_1].tht_2;
							h = general_config.THAT[1];
							h_w = general_config.THAT_W[1];
							break;
						case 3:
							temp = MesoNH_O_array[index_1].tht_3;
							h = general_config.THAT[2];
							h_w = general_config.THAT_W[2];
							break;
						case 4:
							temp = MesoNH_O_array[index_1].tht_4;
							h = general_config.THAT[3];
							h_w = general_config.THAT_W[3];
							break;
						case 5:
							temp = MesoNH_O_array[index_1].tht_5;
							h = general_config.THAT[4];
							h_w = general_config.THAT_W[4];
							break;
						case 6:
							temp = MesoNH_O_array[index_1].tht_6;
							h = general_config.THAT[5];
							h_w = general_config.THAT_W[5];
							break;
						case 7:
							temp = MesoNH_O_array[index_1].tht_7;
							h = general_config.THAT[6];
							h_w = general_config.THAT_W[6];
							break;
						case 8:
							temp = MesoNH_O_array[index_1].tht_8;
							h = general_config.THAT[7];
							h_w = general_config.THAT_W[7];
							break;
						case 9:
							temp = MesoNH_O_array[index_1].tht_9;
							h = general_config.THAT[8];
							h_w = general_config.THAT_W[8];
							break;
						case 10:
							temp = MesoNH_O_array[index_1].tht_10;
							h = general_config.THAT[9];
							h_w = general_config.THAT_W[9];
							break;
						case 11:
							temp = MesoNH_O_array[index_1].tht_11;
							h = general_config.THAT[10];
							h_w = general_config.THAT_W[10];
							break;
						case 12:
							temp = MesoNH_O_array[index_1].tht_12;
							h = general_config.THAT[11];
							h_w = general_config.THAT_W[11];
							break;
						case 13:
							temp = MesoNH_O_array[index_1].tht_13;
							h = general_config.THAT[12];
							h_w = general_config.THAT_W[12];
							break;
						case 14:
							temp = MesoNH_O_array[index_1].tht_14;
							h = general_config.THAT[13];
							h_w = general_config.THAT_W[13];
							break;
						case 15:
							temp = MesoNH_O_array[index_1].tht_15;
							h = general_config.THAT[14];
							h_w = general_config.THAT_W[14];
							break;
						case 16:
							temp = MesoNH_O_array[index_1].tht_16;
							h = general_config.THAT[15];
							h_w = general_config.THAT_W[15];
							break;
						case 17:
							temp = MesoNH_O_array[index_1].tht_17;
							h = general_config.THAT[16];
							h_w = general_config.THAT_W[16];
							break;
						case 18:
							temp = MesoNH_O_array[index_1].tht_18;
							h = general_config.THAT[17];
							h_w = general_config.THAT_W[17];
							break;
						case 19:
							temp = MesoNH_O_array[index_1].tht_19;
							h = general_config.THAT[18];
							h_w = general_config.THAT_W[18];
							break;
						case 20:
							temp = MesoNH_O_array[index_1].tht_20;
							h = general_config.THAT[19];
							h_w = general_config.THAT_W[19];
							break;
						case 21:
							temp = MesoNH_O_array[index_1].tht_21;
							h = general_config.THAT[20];
							h_w = general_config.THAT_W[20];
							break;
						case 22:
							temp = MesoNH_O_array[index_1].tht_22;
							h = general_config.THAT[21];
							h_w = general_config.THAT_W[21];
							break;
						case 23:
							temp = MesoNH_O_array[index_1].tht_23;
							h = general_config.THAT[22];
							h_w = general_config.THAT_W[22];
							break;
						case 24:
							temp = MesoNH_O_array[index_1].tht_24;
							h = general_config.THAT[23];
							h_w = general_config.THAT_W[23];
							break;
						case 25:
							temp = MesoNH_O_array[index_1].tht_25;
							h = general_config.THAT[24];
							h_w = general_config.THAT_W[24];
							break;
						case 26:
							temp = MesoNH_O_array[index_1].tht_26;
							h = general_config.THAT[25];
							h_w = general_config.THAT_W[25];
							break;
						case 27:
							temp = MesoNH_O_array[index_1].tht_27;
							h = general_config.THAT[26];
							h_w = general_config.THAT_W[26];
							break;
						case 28:
							temp = MesoNH_O_array[index_1].tht_28;
							h = general_config.THAT[27];
							h_w = general_config.THAT_W[27];
							break;
						case 29:
							temp = MesoNH_O_array[index_1].tht_29;
							h = general_config.THAT[28];
							h_w = general_config.THAT_W[28];
							break;
						case 30:
							temp = MesoNH_O_array[index_1].tht_30;
							h = general_config.THAT[29];
							h_w = general_config.THAT_W[29];
							break;
						case 31:
							temp = MesoNH_O_array[index_1].tht_31;
							h = general_config.THAT[30];
							h_w = general_config.THAT_W[30];
							break;
						case 32:
							temp = MesoNH_O_array[index_1].tht_32;
							h = general_config.THAT[31];
							h_w = general_config.THAT_W[31];
							break;
						default:
							return;
					}
													
					var x_o = MesoNH_O_array[index_1].x - general_config.Coord_X_paris;
					var y_o = MesoNH_O_array[index_1].y - general_config.Coord_Y_paris;					
					var z_o = MesoNH_O_array[index_1].zs + h;
					
					var l_x = (MesoNH_O_array[index_1].x - MesoNH_U_array[index_1].x)*2;
					var l_y = (MesoNH_O_array[index_1].y - MesoNH_V_array[index_1].y)*2;
					var l_z = (h-h_w)*2;
									
									
					var tmin = temperature_scale[0];
					var tmax = temperature_scale[1];
					var percentage_color = (temp - tmin)/(tmax - tmin);
					if(percentage_color<0){
						percentage_color = 0;
					} else if(percentage_color >1){
						percentage_color = 1;
					}
					
					general_config.temp_values.push(parseFloat(temp));
					var color_hex = getHCLcolor(percentage_color,general_config.HCL_color_scales[general_config.active_HCL_id].scale);
												
					var color_rgb = hexToRgb(color_hex)
					
					var color_r = color_rgb.r/255;
					var color_g = color_rgb.g/255;
					var color_b = color_rgb.b/255;
						
					var cell_volume = l_x*l_y*l_z;
					
					var relative_density;
					
					if(general_config.relative_density_factor < 1){
						var add_factor = 1-general_config.relative_density_factor;
						if(percentage_color < 0.5){
							relative_density = general_config.particle_density + general_config.particle_density*add_factor*(0.5-percentage_color)*2;
						} else if(percentage_color == 0.5){
							relative_density = general_config.particle_density;
						} else if(percentage_color > 0.5){
							relative_density = general_config.particle_density - general_config.particle_density*add_factor*(percentage_color-0.5)*2;
						}
					} else if(general_config.relative_density_factor == 1){
						relative_density = general_config.particle_density;
					} else if(general_config.relative_density_factor >1){
						var add_factor = general_config.relative_density_factor-1;
						if(percentage_color < 0.5){
							relative_density = general_config.particle_density - general_config.particle_density*add_factor*(0.5-percentage_color)*2;
						} else if(percentage_color == 0.5){
							relative_density = general_config.particle_density;
						} else if(percentage_color > 0.5){
							relative_density = general_config.particle_density + general_config.particle_density*add_factor*(percentage_color-0.5)*2;
						}
					}
					
					
					
					var size;
					var basic_size = 10000;
					
					if(general_config.relative_size_factor < 1){
						var add_factor = 1-general_config.relative_size_factor;
						if(percentage_color < 0.5){
							size = parseInt(basic_size + basic_size*add_factor*(0.5-percentage_color)*2);
						} else if(percentage_color == 0.5){
							size = basic_size;
						} else if(percentage_color > 0.5){
							size = parseInt(basic_size - basic_size*add_factor*(percentage_color-0.5)*2);
						}
					} else if(general_config.relative_size_factor == 1){
						size = basic_size;
					} else if(general_config.relative_size_factor >1){
						var add_factor = general_config.relative_size_factor-1;
						if(percentage_color < 0.5){
							size = parseInt(basic_size - basic_size*add_factor*(0.5-percentage_color)*2);
						} else if(percentage_color == 0.5){
							size = basic_size;
						} else if(percentage_color > 0.5){
							size = parseInt(basic_size + basic_size*add_factor*(percentage_color-0.5)*2);
						}
					}
						
					var particle_length_XY = parseInt(relative_density*l_x*l_y);
					
					var offset_xy = l_x/Math.sqrt(particle_length_XY);
					
					var number_particule_x = parseInt(Math.sqrt(particle_length_XY));
					var number_particule_y = parseInt(Math.sqrt(particle_length_XY));
					var number_particule_z = parseInt((l_z*general_config.cst_Z)/(offset_xy*general_config.cst_X));
					
					
					
					if(number_particule_x <1){
					number_particule_x=1;
					}
					if(number_particule_y <1){
					number_particule_y=1;
					}
					if(number_particule_z <1){
					number_particule_z=1;
					}
					var offset_z = l_z/number_particule_z;
									
					for(var a=0; a<number_particule_x; a++){
						for(var b=0; b<number_particule_y; b++){
							for(var c=0; c<number_particule_z; c++){
								var pX = (x_o - l_x/2 + a*offset_xy);
								var pY = (y_o - l_y/2 + b*offset_xy);
								var pZ = (z_o - l_z/2 + c*offset_z);
								coord_array.push(pX*general_config.cst_X);
								coord_array.push(pZ*general_config.cst_Z);
								coord_array.push(-pY*general_config.cst_Y);
								colors.push(color_r);colors.push(color_g);colors.push(color_b);
								sizes.push(size);
								transparency_factor_array.push(general_config.transparency_factor);
								custompercentagearray.push(percentage_color*2*Math.PI);
								z_position_array.push((pZ - general_config.z_min)/(general_config.z_max - general_config.z_min));
								x_position_array.push((pX - general_config.x_min)/(general_config.x_max - general_config.x_min));
								y_position_array.push((pY - general_config.y_min)/(general_config.y_max - general_config.y_min));
								h_position_array.push(((pZ-MesoNH_O_array[index_1].zs)-general_config.h_min)/(general_config.h_max - general_config.h_min));
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
				
		var material;
		var bufferGeometry = new THREE.BufferGeometry();
		
		bufferGeometry.setAttribute( 'position', new THREE.BufferAttribute( coord_array_32, 3 ) );
		bufferGeometry.setAttribute( 'customColor', new THREE.BufferAttribute( colors_32, 3 ) );
		bufferGeometry.setAttribute( 'customsize', new THREE.BufferAttribute(sizes_32,1));
		bufferGeometry.setAttribute( 'customtransparency', new THREE.BufferAttribute(transparency_factor_32,1));
		bufferGeometry.setAttribute( 'custompercentage', new THREE.BufferAttribute(custompercentage_32,1));
		bufferGeometry.setAttribute( 'z_position', new THREE.BufferAttribute(z_position_array_32,1));
		bufferGeometry.setAttribute( 'x_position', new THREE.BufferAttribute(x_position_array_32,1));
		bufferGeometry.setAttribute( 'y_position', new THREE.BufferAttribute(y_position_array_32,1));
		bufferGeometry.setAttribute( 'h_position', new THREE.BufferAttribute(h_position_array_32,1));
			
		if(general_config.is_animated == false){
			material = new THREE.ShaderMaterial( {
				uniforms: {
					color: { value: new THREE.Color( 0xffffff ) },
					pointTexture: { value: new THREE.TextureLoader().load( "disc.png" ) },
					regularSize: { value: general_config.regular_size },
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
							temp_factor_max: { type: "f", value: general_config.temp_max_factor }
				},
				vertexShader: document.getElementById( 'vertexshader_fix' ).textContent,
				fragmentShader: document.getElementById( 'fragmentshader' ).textContent,
				transparent: true
			} );
		} else if (general_config.is_animated == true){
			if(general_config.animation_parameter == 'temp'){
				material = new THREE.ShaderMaterial( {
					uniforms: {
						color: { value: new THREE.Color( 0xffffff ) },
						pointTexture: { value: new THREE.TextureLoader().load( "disc.png" ) },
						regularSize: { value: general_config.regular_size },
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
							temp_factor_max: { type: "f", value: general_config.temp_max_factor }
					},
					vertexShader: document.getElementById( 'vertexshader_anim_temp' ).textContent,
					fragmentShader: document.getElementById( 'fragmentshader' ).textContent,
					transparent: true
				} );
				
			} else if(general_config.animation_parameter == 'Z'){
				material = new THREE.ShaderMaterial( {
					uniforms: {
						color: { value: new THREE.Color( 0xffffff ) },
						pointTexture: { value: new THREE.TextureLoader().load( "disc.png" ) },
						regularSize: { value: general_config.regular_size },
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
							temp_factor_max: { type: "f", value: general_config.temp_max_factor }
					},
					vertexShader: document.getElementById( 'vertexshader_anim_z' ).textContent,
					fragmentShader: document.getElementById( 'fragmentshader' ).textContent,
					transparent: true
				} );
				
			} else if(general_config.animation_parameter == 'X'){
				material = new THREE.ShaderMaterial( {
					uniforms: {
						color: { value: new THREE.Color( 0xffffff ) },
						pointTexture: { value: new THREE.TextureLoader().load( "disc.png" ) },
						regularSize: { value: general_config.regular_size },
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
							temp_factor_max: { type: "f", value: general_config.temp_max_factor }
					},
					vertexShader: document.getElementById( 'vertexshader_anim_x' ).textContent,
					fragmentShader: document.getElementById( 'fragmentshader' ).textContent,
					transparent: true
				} );
				
			} else if(general_config.animation_parameter == 'Y'){
				material = new THREE.ShaderMaterial( {
					uniforms: {
						color: { value: new THREE.Color( 0xffffff ) },
						pointTexture: { value: new THREE.TextureLoader().load( "disc.png" ) },
						regularSize: { value: general_config.regular_size },
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
							temp_factor_max: { type: "f", value: general_config.temp_max_factor }
					},
					vertexShader: document.getElementById( 'vertexshader_anim_y' ).textContent,
					fragmentShader: document.getElementById( 'fragmentshader' ).textContent,
					transparent: true
				} );
				
			}
		}
			
		var point = new THREE.Points( bufferGeometry, material);
				
		create_temp_histogram();
				
		general_config.grid.add(point);
		scene.add(general_config.grid);
	}
	
	function create_temp_histogram(){
		var temp_deg=[];
		for(var j = 0; j<general_config.temp_values.length; j++){
			temp_deg.push(general_config.temp_values[j] - 273.15);
		}
	}