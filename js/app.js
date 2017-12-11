/*global CSVToArray, GeoJSON */
var csvTextArea;
var convertButton = document.getElementById('convert');
var resultTextArea = document.getElementById('geojson');
var beauty = document.getElementById('beauty');

// csvTextArea.addEventListener('click', function() {
//   if (this.value === 'Put CSV here.') {
//     this.value = '';
//   }
// });

convertButton.addEventListener('click', function() {
  if (document.getElementById("csvfiledata").value != "" && document.getElementById("csvdata").value != "") {
    csvTextArea = document.getElementById('csvdata');
  } else if (document.getElementById("csvfiledata").value != "" && document.getElementById("csvdata").value == "") {
    csvTextArea = document.getElementById('csvfiledata');
  } else if (document.getElementById("csvfiledata").value == "" && document.getElementById("csvdata").value != "") {
    csvTextArea = document.getElementById('csvdata');
  } else {
    csvTextArea = "";
  }
  var csvObject = CSVToArray(csvTextArea.value.trim());
  var latName = getColName(csvObject, ['lat', 'Lat', 'LAT', 'latitude', 'Latitude', 'LATITUDE', '緯度']);
  var lonName = getColName(csvObject, ['lng', 'Lng', 'LNG', 'lon', 'Lon', 'LON', 'longitude', 'Longitude', 'LONGITUDE', '経度']);

  GeoJSON.parse(latLonColumnsToNumbers(massageData(csvObject), latName, lonName), {
    Point: [latName, lonName]
  }, function(geojson) {
    var result = JSON.stringify(geojson, null, beauty.checked ? 2 : undefined);

    resultTextArea.value = result;
  });
});

function massageData(data) {
  if (!data || !data.length) return null;
  var firstRow = data[0];
  var map = data.map(function(item) {
    var returnItem = {},
      i = 0;
    firstRow.forEach(function(columnName) {
      returnItem[columnName] = item[i++];
    });
    return returnItem;
  });
  //get rid of header
  map.shift();
  return map;
}

function latLonColumnsToNumbers(data, latName, lonName) {
  return data.map(function(item) {
    if (item.hasOwnProperty(latName)) {
      item[latName] = parseFloat(item[latName]);
    }
    if (item.hasOwnProperty(lonName)) {
      item[lonName] = parseFloat(item[lonName]);
    }
    return item;
  });
}

function getColName(data, possibleColumnNames) {
  if (!data || !data.length) return null;
  for (var i = 0; i < data[0].length; i++) {
    if (possibleColumnNames.indexOf(data[0][i]) !== -1) {
      return data[0][i];
    }
  }
  return null;
}