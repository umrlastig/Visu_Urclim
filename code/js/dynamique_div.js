var cont = document.getElementById('container');
var graph = document.getElementById('graph_container');
var curseur = document.getElementById('curseur');
var tailleGraph;
var heightScreen = screen.height;
var posY;
var bool = false;
var btn_2D = document.getElementById('btn_2D');
var btn_3D = document.getElementById('btn_3D');
var btn_3D_multi = document.getElementById('btn_3D_multi');

curseur.addEventListener('mousedown', e => {
    posY = e.clientY;
    bool = true;
});

window.addEventListener('mousemove', e => {
    if (bool === true) {
        change(posY)
        posY = e.clientY;
    }
});

window.addEventListener('mouseup', e => {
    if (bool === true) {
        change(posY);
        posY = 0;
        bool = false;
    }
});

/**
 * Cette fonction permet de modifier les tailles des deux fenetres de visualisation
 * @param {*} posY
 */
export function change(posY) {
    //cont.style.height = posY + "px";
    tailleGraph = heightScreen - 10 - posY;
    graph.style.height = tailleGraph + "px";
  }


btn_2D.addEventListener('click', e=>{
    showGraph(e, 'graph2D');
})

btn_3D.addEventListener('click', e=>{
    showGraph(e, 'graph3D');
})

btn_3D_multi.addEventListener('click', e=>{
    showGraph(e, 'graph3D_multi');
})

/**
 * Cette fonction permet de switcher de tableau entre le mode 2D et 3D
 * @param {*} evt
 * @param {*} graph
 */
function showGraph(evt, graph) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(graph).style.display = "block";
    evt.currentTarget.className += " active";
}
