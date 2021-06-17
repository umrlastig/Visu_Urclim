import {general_config} from './initialisation.js'
import { recreate_scene,change_buildings_transparency } from './creative_functions.js';


// filter = TEMPERATURE SLIDER
$( function() {
  let tempMin = general_config.temp_array[0]-273.15;
  let tempMax = general_config.temp_array[1]-273.15;
  $( "#temp-slider-range" ).slider({
    range: true,
    min: 0,
    max: 100,
    values: [ 0, 100 ],
    slide: function( event, ui ) {
      tempMin = general_config.temp_array[0]-273.15
      tempMax = general_config.temp_array[1]-273.15
      let tempMinCalc = tempMin + ((tempMax - tempMin)*(ui.values[ 0 ]/100))
      let tempMaxCalc = tempMin + ((tempMax - tempMin)*(ui.values[ 1 ]/100))
      $( "#temperatures-label" ).val( tempMinCalc.toFixed(2) + "°C - " + tempMaxCalc.toFixed(2) + "°C" );    
      general_config.temp_min_factor = (ui.values[ 0 ]/100);  
      general_config.temp_max_factor = (ui.values[ 1 ]/100);
      
    },
    stop: function (e, ui) {
      recreate_scene()
    }
  });

  $( "#temperatures-label" ).val(`${tempMin.toFixed(2)}°C - ${tempMax.toFixed(2)}°C`)
    
});

// filter = Z SLIDER
$( function() {
    $( "#z-slider-range" ).slider({
      range: true,
      min: 0,
      max: 100,
      values: [ 0, 100 ],
      slide: function( event, ui ) {
        $( "#z-slider-label" ).val( ui.values[ 0 ] + " - " + ui.values[ 1 ] );
        general_config.z_min_factor = ui.values[ 0 ]/100;
        general_config.z_max_factor = ui.values[ 1 ]/100;

      },
      stop: function (e, ui) {
        recreate_scene()
      }
    });
    $( "#z-slider-label" ).val( $( "#z-slider-range" ).slider( "values", 0 ) +
    " - " + $( "#z-slider-range" ).slider( "values", 1 ));
    
});

// filter = H SLIDER
$( function() {
    $( "#h-slider-range" ).slider({
      range: true,
      min: 0,
      max: 100,
      values: [ 0, 100 ],
      slide: function( event, ui ) {
        $( "#h-slider-label" ).val( ui.values[ 0 ] + " - " + ui.values[ 1 ] );

        general_config.h_min_factor = ui.values[ 0 ]/100;
        general_config.h_max_factor = ui.values[ 1 ]/100;
      },
      stop: function (e, ui) {
        recreate_scene()
      }
    });
    $( "#h-slider-label" ).val( $( "#h-slider-range" ).slider( "values", 0 ) +
    " - " + $( "#h-slider-range" ).slider( "values", 1 ));
    
});

//filter = X SLIDER
$( function() {
    $( "#x-slider-range" ).slider({
      range: true,
      min: 0,
      max: 100,
      values: [ 0, 100 ],
      slide: function( event, ui ) {
        $( "#x-slider-label" ).val( ui.values[ 0 ] + " - " + ui.values[ 1 ] );
        general_config.x_min_factor = ui.values[ 0 ]/100;
        general_config.x_max_factor = ui.values[ 1 ]/100;
      },
      stop: function (e, ui) {
        recreate_scene()
      }
    });
    $( "#x-slider-label" ).val( $( "#x-slider-range" ).slider( "values", 0 ) +
    " - " + $( "#x-slider-range" ).slider( "values", 1 ));
    
});

// filter = Y SLIDER
$( function() {
    $( "#y-slider-range" ).slider({
      range: true,
      min: 0,
      max: 100,
      values: [ 0, 100 ],
      slide: function( event, ui ) {
        $( "#y-slider-label" ).val( ui.values[ 0 ] + " - " + ui.values[ 1 ] );
        general_config.y_min_factor = ui.values[ 0 ]/100;
        general_config.y_max_factor = ui.values[ 1 ]/100;
      },
      stop: function (e, ui) {
        recreate_scene()
      }
    });
    $( "#y-slider-label" ).val( $( "#y-slider-range" ).slider( "values", 0 ) +
    " - " + $( "#y-slider-range" ).slider( "values", 1 ));
    
});

// graphic = h factor
$( function() {
  $( "#h_slider" ).slider({
    
    min: 1,
    max: 29,
    value: 10,
    slide: function (event, ui) {
      if(ui.value > 10){
        general_config.h_factor = ui.value - 9;
      } else {
        general_config.h_factor = ui.value/10;
      }
      general_config.cst_Z = general_config.cst_Z_original*general_config.h_factor;
      $("#h_control_label").html("h_factor : " + general_config.h_factor);
    },
    stop: function (e, ui) {
      recreate_scene()
    }
  });
} );

// graphic = size of points
$( function() {
  $( "#size_slider" ).slider({
    
    min: 1,
    max: 200,
    value: general_config.regular_size*150,
    slide: function (event, ui) {
      $("#size_text_input").val((ui.value/150).toFixed(2));
    },
    stop: function (e, ui) {
      general_config.regular_size = ui.value/150;
      //remet ici pour qu'un simple clic sur slider handle change quand même le texte, vu que ça change la taille des points 
      // si on tape une valeur supérieur à 1.33 avant
      $("#size_text_input").val((ui.value/150).toFixed(2));
      recreate_scene()
    }
  });
} );

// graphic : relative size factor
$( function() {
  $( "#relative_size_factor_size_slider" ).slider({
    
    min: 1,
    max: 200,
    value: general_config.relative_size_factor*100,
    slide: function (event, ui) {
      general_config.relative_size_factor = ui.value/100;
      if(general_config.relative_size_factor == 1){
        $("#relative_size_factor_control_label").html("relative_size_factor : " + 0);
      } else if(general_config.relative_size_factor < 1){
        var label_value = parseInt((1-general_config.relative_size_factor)*100)/100;
        $("#relative_size_factor_control_label").html("relative_size_factor : " + label_value + " less values");
      } else if(general_config.relative_size_factor > 1){
        var label_value = parseInt((general_config.relative_size_factor-1)*100)/100;
        $("#relative_size_factor_control_label").html("relative_size_factor : " + label_value + " high values");
      }
    },
    stop: function (e, ui) {
      
      recreate_scene()
    }
  });
} );


// graphic = general density slider
$( function() {
  $( "#density_slider" ).slider({
    
    min: 1,
    max: 200,
    value: general_config.particle_density * 10000,
    slide: function (event, ui) {
      general_config.particle_density = parseInt(ui.value)/10000;
      $("#density_text_input").val(general_config.particle_density)
    },
    stop: function (e, ui) {

      recreate_scene()
    }
  });
} );

// graphic = relative density factor slider
$( function() {
  $( "#relative_density_factor_slider" ).slider({
    
    min: 0,
    max: 200,
    value: general_config.relative_density_factor*100,
    slide: function (event, ui) {
      general_config.relative_density_factor = ui.value/100;
      if(general_config.relative_density_factor == 1){
        $("#relative_density_factor_control_label").html("relative_density_factor : " + 0);
      } else if(general_config.relative_density_factor < 1){
        var label_value = parseInt((1-general_config.relative_density_factor)*100)/100;
        $("#relative_density_factor_control_label").html("relative_density_factor : " + label_value + " less values");
      } else if(general_config.relative_density_factor > 1){
        var label_value = parseInt((general_config.relative_density_factor-1)*100)/100;
        $("#relative_density_factor_control_label").html("relative_density_factor : " + label_value + " high values");
      }
    },
    stop: function (e, ui) {

      recreate_scene()
    }
  });
} );

// graphic = transparency slider
$( function() {
  $( "#transparency_slider" ).slider({
    
    min: 0,
    max: 100,
    value: general_config.transparency_factor * 100,
    slide: function (event, ui) {
      general_config.transparency_factor = ui.value/100;
      $("#transparency_control_label").html("transparency_factor: " + general_config.transparency_factor);
    },
    stop: function (e, ui) {

      recreate_scene()
    }
  });
} );

$( function() {
  $( "#points_transparency_slider" ).slider({
    
    min: 0,
    max: 100,
    value: general_config.points_transparency * 100,
    slide: function (event, ui) {
      general_config.points_transparency = ui.value/100;
      $("#points_transparency_control_label").html("points_transparency_factor: " + general_config.points_transparency);
    },
    stop: function (e, ui) {

      recreate_scene()
    }
  });
} );

// graphic = number of points real plane slider
$( function() {
  $( "#number_of_points_real_plane_slider" ).slider({
    
    min: 1,
    max: 200,
    value: general_config.number_of_points_real_plane ,
    slide: function (event, ui) {
      general_config.number_of_points_real_plane = ui.value;
      $("#number_of_points_real_plane_label").html("number_of_points_real_plane : " + general_config.number_of_points_real_plane);
     
    },
    stop: function (e, ui) {

      recreate_scene()
    }
  });
} );

// animation = animation speed slider
$( function() {
  $( "#animation_speed_slider" ).slider({
    
    min: 0,
    max: 200,
    value: general_config.animation_speed_factor*10000+100 ,
    slide: function (event, ui) {
      general_config.animation_speed_factor = (ui.value - 100)/10000;
      $("#animation_speed_control_label").html("animation_speed_factor: " + general_config.animation_speed_factor);
    },
    stop: function (e, ui) {

      recreate_scene()
    }
  });
} );

// buildings_transparency = buildings_transparency slider
$( function() {
  $( "#buildings_transparency_slider" ).slider({
    
    min: 0,
    max: 100,
    value: general_config.buildings_transparency*100 ,
    slide: function (event, ui) {
      general_config.buildings_transparency = ui.value/100;
      $("#buildings_transparency_label").html("buildings_transparency: " + general_config.buildings_transparency);
    },
    stop: function (e, ui) {
      change_buildings_transparency(general_config.buildings_transparency);
    }
  });
} );

$( function() {
  $( "#vertical_plane_transparency_slider" ).slider({
    
    min: 0,
    max: 100,
    value: general_config.vertical_plane_transparency*100 ,
    slide: function (event, ui) {
      general_config.vertical_plane_transparency = ui.value/100;
      $("#vertical_plane_transparency_label").html("vertical_plane_transparency: " + general_config.vertical_plane_transparency);
    },
    stop: function (e, ui) {
      recreate_scene();
    }
  });
} );
