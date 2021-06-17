/**
 * Cette fonction permet de lancer toutes les fonctions ci dessous
 * @param {*} netcdfUrl 
 * @returns  un tableau conenant listePoints, listePointsU, listePointsV, ninj
 */
export async function init_netcdf(netcdfUrl) {
  const isBigEndian = (() => {
    const array = new Uint8Array(4);
    const view = new Uint32Array(array.buffer);
    return !((view[0] = 1) & array[0]);
  })();

  let type = [
    "THT",
    "TEB_CAN_T01",
    "TEB_CAN_T02",
    "TEB_CAN_T03",
    "TEB_CAN_T04",
    "TEB_CAN_T05",
    "TEB_CAN_T06",
    "ZHAT",
    "TEB_CAN_Z01",
    "TEB_CAN_Z02",
    "TEB_CAN_Z03",
    "TEB_CAN_Z04",
    "TEB_CAN_Z05",
    "TEB_CAN_Z06",
    "ZS",
    "longitude",
    "latitude",
    "longitude_u",
    "latitude_u",
    "longitude_v",
    "latitude_v",
    "DTCUR"
  ];

  let promises = [];
  let netcdf = await fetch(netcdfUrl);
  let readNetcdfResult = await readNetcdf(netcdf);
  type.forEach((p) => {
    promises.push(fetchVolume(readNetcdfResult, p));
  });
  return Promise.all(promises).then((values) => {
    let res = loadNetcdfData(values);
    return res;
  });
}



/**
 * Cette fonction permet d'ouvrir et de lire un fichier netcdf
 * @param {*} response 
 * @returns un buffer netcdf
 */
export function readNetcdf(response) {
  var reader = response.body.getReader();
  var bytesReceived = 0;
  var buffer = null;
  return reader.read().then(function process(result) {
    // append new bytes to the buffer
    if (!result.done) {
      var received = bytesReceived + result.value.length;
    }
    if (!buffer) {
      buffer = result.value;
    } else {
      var old = buffer.subarray(0, bytesReceived);
      buffer = new Uint8Array(received);
      buffer.set(old, 0, bytesReceived);
      buffer.set(result.value, bytesReceived);
    }
    bytesReceived = received;

    // try reading the header
    try {
      const netcdf = new netcdfjs(buffer);
      netcdf.url = response.url;
      netcdf.reader = reader;
      netcdf.bytesTotal = response.headers.get("Content-Length");
      netcdf.acceptRanges = response.headers.get("Accept-Ranges") === "bytes";
      netcdf.bytesReceived = bytesReceived;
      return netcdf;
    } catch (e) {
      // end is reached with no decodable header
      if (result.done) {
        console.log("eof, no valid netcdf header!");
        return;
      }
      // keep reading
      return reader.read().then(process);
    }
  });
}

/**
 * Cette fonction permet de recuperer les données propre au type étudié en les stockant dans un objet volume
 * @param {*} netcdf 
 * @param {*} variableName 
 * @param {*} forceRangeRequest 
 * @returns lance la onction decodeVolume
 */
export async function fetchVolume(
  netcdf,
  variableName,
  forceRangeRequest = false
) {
  const rangeRequest = forceRangeRequest || netcdf.acceptRanges;
  var variable = netcdf.variables.find((val) => val.name === variableName);

  if (variableName == "THT") {
    var volume = {
      variable: variableName,
      xLength: netcdf.dimensions[variable.dimensions[1]].size,
      yLength: netcdf.dimensions[variable.dimensions[2]].size,
      zLength: netcdf.dimensions[variable.dimensions[3]].size,
    };
  } else if (variableName == "ZHAT" ) {
    var volume = {
      variable: variableName,
      xLength: 1,
      yLength: netcdf.dimensions[variable.dimensions[0]].size,
      zLength: 1,
    };
  }else if(variableName == "DTCUR"){
    
    var volume = {
      variable: variableName,
      variableType: variable.attributes[2].value.substring(14,24), 
      xLength: 1,
      yLength: 1,
      zLength: 1,
    };
  } else {
    var volume = {
      variable: variableName,
      xLength: 1,
      yLength: netcdf.dimensions[variable.dimensions[0]].size,
      zLength: netcdf.dimensions[variable.dimensions[1]].size,
    };
  }

  volume.size = volume.xLength * volume.yLength * volume.zLength;
  const last = variable.offset + variable.size - 1;

  // // Data is missing and ranges are not accepted
  if (!rangeRequest && last >= netcdf.bytesReceived) {
    // TODO, use reader if present
    if (netcdf.reader) {
      // TODO, use reader if present
    }

    // TODO, stop if enough bytes are read
    return fetch(netcdf.url)
      .then((response) => response.arrayBuffer())
      .then((buffer) => decodeVolume(buffer, volume, variable.offset));
  }

  if (netcdf.reader) {
    netcdf.reader.cancel();
    netcdf.reader = undefined;
  }

  if (last < netcdf.bytesReceived)
    return decodeVolume(netcdf.buffer.buffer, volume, variable.offset);

  // Data is missing, get it using a range request
  const headers = new Headers({
    Range: `bytes=${variable.offset}-${last}`,
  });
  return fetch(netcdf.url, { headers })
    .then((response) => response.arrayBuffer())
    .then((buffer) => decodeVolume(buffer, volume));
}


/**
 * Cette fonction permet de donner du sens aux valeurs conenues dans un volume
 * @param {*} buffer 
 * @param {*} volume 
 * @param {*} offset 
 * @returns un array contenant la valeur de chaque point pour le type étudié.
 */
async function decodeVolume(buffer, volume, offset = 0) {
  volume.data = new Float32Array(volume.size);
  var view = new DataView(buffer);
  for (var i = 0; i < volume.size; i++)
    volume.data[i] = view.getFloat64(offset + i * 8, false);
  volume.min = Math.min.apply(
    null,
    volume.data.filter((x) => x > 1)
  );
  volume.max = Math.max.apply(null, volume.data);
  return volume;
}


/**
 * Cette fonction permet de choisir comment stocké les volumes
 * @param {*} values 
 * @returns un tableau conenant listePoints, listePointsU, listePointsV, ninj
 */
 function loadNetcdfData(values) {
    let listePoints = [];
    let listePointsU = [];
    let listePointsV = [];
    var i_point = 0;
    var j_point = 1;
    var ni_tot = values[1].zLength;
    var nj_tot = values[1].yLength;
    for (let i = 0; i < values[1].data.length; i++) {
      let point = {};
      let pointU = {};
      let pointV = {};

      for (let j = 0; j < 32; j++) {
        point["tht_" + (j + 1)] = values[0].data[i + j];
      }

      i_point = i_point + 1;
      if (i_point>ni_tot){
        i_point = 1;
        j_point = j_point + 1;
      }
      point["i_point"] = i_point;
      point["j_point"] = j_point;
      point["teb_1"] = values[1].data[i];
      point["teb_2"] = values[2].data[i];
      point["teb_3"] = values[3].data[i];
      point["teb_4"] = values[4].data[i];
      point["teb_5"] = values[5].data[i];
      point["teb_6"] = values[6].data[i];
      point["ZHAT"] = values[7].data[i];

      if(values[8].data[i] != 999){
        point["tebz_1"] = values[8].data[i];
      }else{
        point["tebz_1"] = 0.5;
      }

      if(values[9].data[i] != 999){
        point["tebz_2"] = values[9].data[i];
      }else{
        point["tebz_2"] = 2;
      }

      if(values[10].data[i] != 999){
        point["tebz_3"] = values[10].data[i];
      }else{
        point["tebz_3"] = 4;
      }

      if(values[11].data[i] != 999){
        point["tebz_4"] = values[11].data[i];
      }else{
        point["tebz_4"] = 6.5;
      }

      if(values[12].data[i] != 999){
        point["tebz_5"] = values[12].data[i];
      }else{
        point["tebz_5"] = 10;
      }

      if(values[13].data[i] != 999){
        point["tebz_6"] = values[13].data[i];
      }else{
        point["tebz_6"] = 37;
      }


      point["zs"] = values[14].data[i];
      point["longitude"] = values[15].data[i];
      point["latitude"] = values[16].data[i];
  
      listePoints.push(point);
  
      pointU["longitude"] = values[17].data[i];
      pointU["latitude"] = values[18].data[i];
  
      listePointsU.push(pointU);
  
      pointV["longitude"] = values[19].data[i];
      pointV["latitude"] = values[20].data[i];
  
      listePointsV.push(pointV);
    }

    let day = new Date(values[21].variableType).getTime();
    let hour = new Date(values[21].min*1000).getTime();
    let iso_date = new Date(day + hour);

    let globalData = {
      ni: values[1].zLength,
      nj: values[1].yLength,
      longitude_min: values[15].min,
      longitude_max: values[15].max,
      latitude_min: values[16].min,
      latitude_max: values[16].max,
      date: iso_date
    };
    
    return {listePoints, listePointsU, listePointsV, globalData};
  }
  