import { calculate_avg_temperature } from "./creative_functions.js";
import { changeNetcdf} from "./menu.js";
import { updateCurrentSelected3D } from "./time_visualisation2.js";
import { updateCurrentSelected3DMulti } from "./time_visualisation.js";
/**
 *  Cette fonction permet de dessiner le graph 2D avec les valeurs calculer grace à la fonction calculate_avg_temperature
 *  elle permet aussi les différents intéractions
 */
export function draw_graph2D(){


    var avg = calculate_avg_temperature();
    var lab = [];
    var values = [];
    var teb1 = [];
    var teb2 = [];
    var teb3 = [];
    var teb4 = [];
    var teb5 = [];
    var teb6 = [];
    var teb1 = [];
    var date = [];
    avg.forEach((file) => {
        lab.push(file.dateString);
        values.push(file.globalAvg);
        teb1.push(file.teb_1);
        teb2.push(file.teb_2);
        teb3.push(file.teb_3);
        teb4.push(file.teb_4);
        teb5.push(file.teb_5);
        teb6.push(file.teb_6);
        date.push(file.date);
    });
    //création du graphique
    var ctx = document.getElementById('graphique2D').getContext('2d');
    var chart = new Chart(ctx, {
        // type de graphique
        type: 'line',

        // ajout des données
        data: {
            labels: lab,
            datasets: [{
                label: 'temperature ',
                backgroundColor: 'rgba(0, 0, 0, 0)',
                borderColor: 'rgb(255, 0, 0)',
                data: values,
                fill: false,
                lineTension: 0
            },{
                 label: 'TEB 1 ',
                 backgroundColor: 'rgba(0, 0, 0, 0)',
                 borderColor: 'rgb(56, 87, 42)',
                 data: teb1,
                 fill: false,
                 lineTension: 0
             },
             {
                label: 'TEB 2 ',
                backgroundColor: 'rgba(0, 0, 0, 0)',
                borderColor: 'rgb(110, 18, 104)',
                data: teb2,
                fill: false,
                lineTension: 0
            },
            {
                label: 'TEB 3 ',
                backgroundColor: 'rgba(0, 0, 0, 0)',
                borderColor: 'rgb(106, 140, 184)',
                data: teb3,
                fill: false,
                lineTension: 0
            },
            {
                label: 'TEB 4 ',
                backgroundColor: 'rgba(0, 0, 0, 0)',
                borderColor: 'rgb(184, 149, 106)',
                data: teb4,
                fill: false,
                lineTension: 0
            },
            {
                label: 'TEB 5 ',
                backgroundColor: 'rgba(0, 0, 0, 0)',
                borderColor: 'rgb(24, 27, 173)',
                data: teb5,
                fill: false,
                lineTension: 0
            },{
                label: 'TEB 6 ',
                backgroundColor: 'rgba(0, 0, 0, 0)',
                borderColor: 'rgb(130, 107, 55)',
                data: teb6,
                fill: false,
                lineTension: 0
            }]
        },

        options: {
            title: {
                display: true,
                text: 'diagramme 2D',
                position :'bottom',
            },
            scales: {
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Celsius'
                    },

                }]
            },


        }
    });
    //
    document.getElementById("graphique2D").onclick = function(evt) {
        var activePoint = chart.getElementAtEvent(event);
        // make sure click was on an actual point
        if (activePoint.length > 0) {
          var clickedElementindex = activePoint[0]._index; // recupere l'index du label
         changeNetcdf(date[clickedElementindex]); // on change les données affichées
         document.getElementById('date_control_input').options[clickedElementindex].selected = true;// on change la valeur afficher dans le menu
         updateCurrentSelected3D() // On met à jour la visu temp 3D
         updateCurrentSelected3DMulti()
        }
      };
}
