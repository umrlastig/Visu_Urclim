import * as THREE from "./three.module.js";
import { OrbitControls } from "./OrbitControls.js";
import { calculate_avg_temperature, calculate_point_temperature } from "./creative_functions.js";

import { changeNetcdf } from "./menu.js";

//const canvas = document.getElementById("diagram3DCanvas"); //canvas de la visu

const selectElement = document.getElementById("date_control_input");


var canvas;
var scenes = [], camera, renderer, emptyScene, controls;
var numScenes;
var rect;

var scene = new THREE.Scene();

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();


function init(numScenes) {
  canvas = document.getElementById("diagram3DCanvasMulti"); //canvas de la visu
  var graph3D_multi = document.getElementById("graph3D_multi");

  var context = canvas.getContext("webgl2", { alpha: false, antialias: true });
  var WIDTH = window.innerWidth * 0.55;
  var HEIGHT = window.innerHeight * 0.4;
  canvas.width = WIDTH;
  if (numScenes == 1) {
    canvas.height = HEIGHT;
  } else if (numScenes == 2 || numScenes == 4){
    canvas.height = HEIGHT / 2 * numScenes;
  } else {
    canvas.height = HEIGHT / 3 * numScenes;
  }
  //graph3D_multi.style.height = HEIGHT +"px";



  var rect = canvas.getBoundingClientRect(); // Rectangle de la visu





  camera = new THREE.PerspectiveCamera(30, WIDTH / HEIGHT, 0.1, 1000);
  camera.layers.enableAll();
  camera.position.set(-4.4, 7.1, 17.9);



  var content = document.getElementById("content");
  content.style.width = WIDTH + 'px';
  grille(numScenes);

  var emptyScene = new THREE.Scene();

  for ( var ii =  0; ii < numScenes; ++ii ) {

    var scene = new THREE.Scene();

    var element = document.createElement( "div" );
    element.className = "scene";
    if (numScenes <= 3 ) {
      element.style.height = HEIGHT +'px';
    } else if (numScenes <= 6) {
      element.style.height = (HEIGHT / 2) +'px';
    } else {
      element.style.height = (HEIGHT / 3) +'px';
    }

    scene.element = element;

    content.appendChild(element);


    controls = new OrbitControls(camera, scene.element);
    controls.update();
    controls.enableDamping = true;
    controls.dampingFactor = 0.5
    controls.keys= {}
    scene.controls = controls;
    console.log(scene);


    const lightColor = 0xffffff;
    const color = new THREE.Color( 0x000000 );
    const intensity = 0.6;
    const light = new THREE.DirectionalLight(lightColor, intensity);
    light.position.set(100, 60, -100);
    scene.add(light);
    const lightb = new THREE.DirectionalLight(lightColor, intensity);
    lightb.position.set(-100, 60, 100);
    scene.add(lightb);

    const lightc = new THREE.DirectionalLight(lightColor, intensity);
    lightc.position.set(-100, 60, -100);
    scene.add(lightc);
    const lightd = new THREE.DirectionalLight(lightColor, intensity);
    lightd.position.set(100, 60, 100);
    scene.add(lightd);
    scene.background = color;


    scenes.push( scene );
    console.log(scenes)
  }

  var template = document.getElementById("template").text;
  var legende = document.createElement( "div" );
  legende.innerHTML = template;
  content.appendChild(legende);

  renderer = new THREE.WebGLRenderer({ canvas: canvas, context: context });

}



var visu;


function onMouseMove(evt) {
  rect = canvas.getBoundingClientRect();
  // calculate mouse position in normalized device coordinates
  mouse.x = ((evt.clientX - rect.left) / (rect.right - rect.left)) * 2 - 1;
  mouse.y = (-(evt.clientY - rect.top) / (rect.bottom - rect.top)) * 2 + 1;
}

/**
 *
 * @param {Number} min
 * @param {Number} max
 * @returns Random number between min and max
 */
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

/**
 *
 * @param {xzGrid} grid
 * @returns random points on grid
 */
export function randomCloudOnGrid(grid) {
  let out = [];
  for (let i = 0; i < 10; i++) {
    grid.centers.forEach((center) => {
      out.push({
        x: center.x,
        y: center.y,
        z: getRandomArbitrary(0, 100),
        t: i,
      });
    });
  }
  return out;
}

/**
 *
 * @param {Array} a
 * @returns index of the lowest value
 */
export function smallest(a) {
  let lowest = 0;
  for (let i = 1; i < a.length; i++) {
    if (a[i] < a[lowest]) lowest = i;
  }
  return lowest;
}

/**
 *
 * @param {Array} list
 * @returns minimum of list
 */
export function getMin(list) {
  let min = list[0];
  list.forEach((e) => {
    if (parseInt(e) < min) {
      min = e;
    }
  });
  return min;
}

export function getMax(list) {
  let max = list[0];
  list.forEach((e) => {
    if (parseInt(e) > max) {
      max = e;
    }
  });
  return max;
}

export class xzGrid {
  constructor(xmin, xmax, xstep, zmin, zmax, zstep) {
    this.centers = []; // holds the xz coordinates of the grid nodes
    this.n = Math.floor((xmax - xmin) / xstep);
    this.m = Math.floor((zmax - zmin) / zstep);
    for (let i = 0; i < this.n; i++) {
      for (let j = 0; j < this.m; j++) {
        this.centers.push({ x: xmin + i * xstep, z: zmin + j * zstep });
      }
    }
  }

  at(i, j) {
    return this.centers[i * n + j];
  }
}

class Visualisation {
  constructor() {
    if (new.target === Visualisation) {
      throw new TypeError("Cannot construct Visualisation instances directly.");
    }
    this.data = []; // collection of {x, y, z, t} objects
    this.group = new THREE.Group();
    this.meshes = [];
    this.loaded = false; // hack
  }
  /**
   *
   * @param {THREE.Vector3} center
   */
  centerOn(center = new THREE.Vector3(0, 0, 0)) {
    let avg_x = _.meanBy(this.meshes, (mesh) => mesh.position.x);
    let avg_y = _.meanBy(this.meshes, (mesh) => mesh.position.y);
    let avg_z = _.meanBy(this.meshes, (mesh) => mesh.position.z);
    let avg_pos = new THREE.Vector3(avg_x, avg_y, avg_z);
    this.meshes.forEach((mesh) => {
      mesh.position.sub(avg_pos).add(center);
    });
  }

  /**
   *
   * @param {THREE.Scene} scene
   */
  show(scene) {
    scene.add(...this.groups);
  }

  /**
   *
   * @param {THREE.Scene} scene
   */
  hide(scene) {
    scene.remove(...this.groups);
  }
}

export class BarVisualisation extends Visualisation {
  /**
   *
   * @param {*} data
   * @param {*} xAttribute
   * @param {*} yAttribute
   * @param {*} zAttribute
   *
   * Builds a bar visualisation of the data array
   */
  constructor(data, xAttribute, yAttribute, zAttribute, grid, config) {
    super();
    this.data = data;
    this.colors = {};
    this.edges = [];
    this.xAttribute = xAttribute;
    this.yAttribute = yAttribute;
    this.zAttribute = zAttribute;
    this.grid = grid;
    this.groups = [];
    this.axisData = [];
    this.data.forEach((datael, index) => {
      let obj = {
        x: datael[xAttribute],
        y: datael[yAttribute],
        z: datael[zAttribute],
      };
      if (config.extraAttributes) {
        for (let attribute of config.extraAttributes) {
          obj[attribute] = datael[attribute];
        }
      }
      this.axisData.push(obj);
    });
    this.ymin = getMin(this.axisData.map((el) => el.y));
    this.ymax = getMax(this.axisData.map((el) => el.y));
    let yscale;
    if (config.yscale) {
      yscale = config.yscale;
    } else {
      yscale = 1 / (this.ymax - this.ymin);
    }
    let yoffset;
    if (config.yoffset) {
      yoffset = -this.ymin * yscale + 0.0001;
    } else {
      yoffset = 0;
    }

    this.axisData.forEach((e) => {
      let geom = new THREE.BoxGeometry(
        this.step,
        e.y * yscale + yoffset,
        this.step
      );
      let material;
      this.highLightOffset = new THREE.Color(1, 1, 1).sub(new THREE.Color(attributeColor(1))).multiplyScalar(0.5);
      let color;
      if (config.material) {
        material = config.material;
      } else {
        color = attributeColor((e.y - this.ymin) / (this.ymax - this.ymin));
        material = new THREE.MeshStandardMaterial({
          color,
          transparent: true,
          opacity: 1,
        });
      }

      let shape = new THREE.Mesh(geom, material);
      shape.data = e;
      shape.originalColor = color;
      shape.resetColor = function () {
        this.material.color = new THREE.Color(this.originalColor);
      };
      let edges = new THREE.EdgesGeometry(geom);
      const line = new THREE.LineSegments(
        edges,
        new THREE.LineBasicMaterial({
            color: 0xffffff,
            linewidth: 3
        })
      );

      shape.position.set(e.x, (e.y * yscale + yoffset) / 2, e.z);
      shape.line = line;
      shape.showLine = function () {
        shape.add(this.line);
      };
      shape.removeLine = function () {
        shape.remove(...shape.children);
      };
      this.meshes.push(shape);
      this.loaded = true;
    });
  }
  /**
   * Group meshes by axis
   * @param {String} axis set the axis
   */
  setgroupAxis(axis) {
    let groupLists = _.groupBy(this.meshes, (mesh) => {
      return mesh.position[axis];
    });
    for (let groupList in groupLists) {
      let group = new THREE.Group();
      for (let mesh of groupLists[groupList]) {
        group.add(mesh);
      }
      this.groups.push(group);
    }
    this.group = new THREE.Group();
    this.group.add(...this.groups);
  }

  highlightGroup(group) {
    this.resetColors();
    for (let mesh of group.children) {
      if (mesh.material.color) mesh.material.color.add(this.highLightOffset);
    }
  }

  selectGroup(group) {
    this.unselectAllGroups();
    for (let mesh of group.children) {
      mesh.showLine();
    }
  }

  unselectAllGroups() {
    for (let group of this.groups) {
      for (let mesh of group.children) {
        mesh.removeLine();
      }
    }
  }

  resetColors() {
    for (let group of this.groups) {
      for (let mesh of group.children) {
        mesh.resetColor();
      }
    }
  }
}


/**
 *
 * @param {Number} t between 0 and 1
 * @returns interpolated color
 */
function interpBuRed(t) {
  let red = new THREE.Color(1, 0, 0)
  let blue = new THREE.Color(0,0,1)
  return blue.lerp(red, t)
}

/**
 * This function attribute the good color to each block depending on it temperature
 * @param {*} temp
 * @returns
 */
 function attributeColor(temp) {
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

  let id = temp*10

  let under = Math.floor(temp / 0.1);
  let over = Math.ceil(temp / 0.1);

  if (over == 10) {
      over = 9
  }
  if (id == 10) {
      return color_array[9]
  }



  let color = (new THREE.Color(color_array[under])).lerp(new THREE.Color(color_array[over]), id-under)
  return color.getHex()
}



function grille(numScenes) {
  if (numScenes == 1) {
  }
  else if (numScenes == 2 || numScenes == 4) {
    content.style.display = "grid"
    content.style.gridTemplateColumns = "repeat(2, 1fr)"
  }
  else if ((numScenes % 4) == 0 ) {
    content.style.display = "grid"
    content.style.gridTemplateColumns = "repeat(4, 1fr)"
  }
  else{
    content.style.display = "grid"
    content.style.gridTemplateColumns = "repeat(3, 1fr)"
  }
}


/**
 * Shows time visualisation
 * @param {Array} netcdf_list
 */
export function showTimeVisMulti(netcdf_list) {

  let point_list = calculate_point_temperature();
  console.log(point_list)
  numScenes = 0;
  //console.log(point_list);
  point_list.forEach(() => {
    numScenes += 1;
  });

  //console.log(numScenes);
  init(numScenes);

  window.addEventListener("mousemove", onMouseMove, false);
  window.addEventListener("scroll", () => {
    rect = canvas.getBoundingClientRect();
  });
  canvas.addEventListener("click", selectGroupOnClick);


  let compteur = 0
  scenes.forEach( function( scene ) {
    let data = [];


    point_list[compteur].forEach((el, t) => {
      data.push(
        { level: 1, date_index: t, avg_temp: el.teb_1, date: el.date },
        { level: 2, date_index: t, avg_temp: el.teb_2, date: el.date },
        { level: 3, date_index: t, avg_temp: el.teb_3, date: el.date },
        { level: 4, date_index: t, avg_temp: el.teb_4, date: el.date },
        { level: 5, date_index: t, avg_temp: el.teb_5, date: el.date },
        { level: 6, date_index: t, avg_temp: el.teb_6, date: el.date }
      );
    });
    //console.log(data);
    let grid = new xzGrid(1, 7, 1, 1, netcdf_list.length, 1);
    visu = new BarVisualisation(data, "level", "avg_temp", "date_index", grid, {
      zoffset: -3,
      extraAttributes: ["date"],
    });
    visu.centerOn();
    visu.setgroupAxis("z");
  //visu.highlightGroup(visu.groups[0], scene)
  //visu.selectGroup(visu.groups[1])

    visu.show(scene);

    const axesHelper = new THREE.AxesHelper(9);
    axesHelper.material.linewidth = 3
    scene.add(axesHelper);

    updateCurrentSelected3DMulti();

    compteur += 1
  })
  animate();
}

let dateViewer = document.getElementById("dateViewer");
async function onHoverPick() {

      // update the picking ray with the camera and mouse position
  raycaster.setFromCamera(mouse, camera);

  // calculate objects intersecting the picking ray
  const intersects = raycaster
    .intersectObjects(scene.children, true)
    .filter((intersect) => intersect.object.type === "Mesh");

  if (intersects.length) {
    let object = intersects[0].object;
    visu.highlightGroup(object.parent);
    dateViewer.innerText = object.data.date;
  } else {
    dateViewer.innerText = "";
    visu.resetColors();
  }
}


/*function updateSize(numScenes) {

  var WIDTH = window.innerWidth * 0.55;
  var HEIGHT = window.innerHeight * 0.4 * numScenes;

  if ( canvas.width !== width || canvas.height != height ) {

    renderer.setSize ( width, height, false );

  }

}*/


function render() {

  //updateSize(numScenes);

  //canvas.style.transform = `translateY(${window.scrollY}px`;

  renderer.setClearColor( 0xFFFFFF );
  renderer.clear( true );
  renderer.setClearColor( 0xE0E0E0 );

  renderer.setScissorTest( true );
  scenes.forEach( function( scene ) {
    scene.controls.update();



    // get the element that is a place holder for where we want to
    // draw the scene
    var element = scene.element;

    // get its position relative to the page's viewport
    rect = element.getBoundingClientRect();
    var left = element.offsetLeft;
    var top = element.offsetTop;


    // check if it's offscreen. If so skip it
    /*if ( rect.bottom < 0 || rect.top  > renderer.domElement.clientHeight ||
       rect.right  < 0 || rect.left > renderer.domElement.clientWidth ) {
      return;  // it's off screen
    }*/

    // set the viewport
    var width  = rect.right - rect.left;
    var height = rect.bottom - rect.top;
    if (numScenes < 2 ) {
      var bottom = top + height;
    } else if (numScenes <= 6) {
      var bottom = top + 2 * height;
    } else{
      var bottom = top + 6 * height;
    }

    //console.log(left, top, height, width);

    renderer.setViewport( left, bottom, width, height );
    renderer.setScissor( left, bottom, width, height );

    //const camera = scene.camera

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.render( scene, camera );


  } );
  renderer.setScissorTest( false );

}

function animate() {
  (async () => {onHoverPick()})()


  requestAnimationFrame(animate);
  render()
}

/**
 * Selects group when click
 */
function selectGroupOnClick() {
  raycaster.setFromCamera(mouse, camera);
  // calculate objects intersecting the picking ray
  const intersects = raycaster
    .intersectObjects(scene.children, true)
    .filter((intersect) => intersect.object.type === "Mesh");

  if (intersects.length) {
    let object = intersects[0].object;
    if (object.type === "LineSegments") {
      object = intersects[1].object;
      disableTemporalAnimation();
    }
    visu.selectGroup(object.parent);
    changeNetcdf(object.data.date);
    document.getElementById("date_control_input").options[
      object.data.z
    ].selected = true;
  }
}

/*window.addEventListener("mousemove", onMouseMove, false);
window.addEventListener("scroll", () => {
  rect = canvas.getBoundingClientRect();
});
canvas.addEventListener("click", selectGroupOnClick);*/


/**
 * Update selected group in visualisation
 */
export function updateCurrentSelected3DMulti() {
  let date = selectElement.options[selectElement.selectedIndex].value;
  let currentGroup = visu.groups.filter(
    (group) => group.children[0].data.date == date
  )[0];
  visu.selectGroup(currentGroup);
}

selectElement.addEventListener("change", updateCurrentSelected3DMulti);
