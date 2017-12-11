$('#copy').bind('click', function() {
  var geojsoncopy = document.getElementById("geojson");
  geojsoncopy.select();
  document.execCommand("copy");
  alert('コピーしました');
});