$('#gist').bind('click', function() {
  gistsave(this,this.document,'gist');
  // console.log(gistUrl);
});

$('#io').bind('click', function() {
  gistsave(this,this.document,'io');
});

function gistsave(win, doc, btnid) {
  console.log("push");
  // Find form elements.
  var forms = document.querySelectorAll('form[method="post"]');
  console.log(forms);
  // Prevent submit, do an xhr instead.
  forms.forEach(function(form) {
    form.addEventListener('submit', function (e) {
      // Create the object structure gist.github.com expects:
      // https://developer.github.com/v3/gists/#create-a-gist
      var data = {
        "description": "anonymous gists from csv2geojson(https://kobakazu10.github.io/csv2geojson/index.html)",
        "public": false,
        "files": {}
      };
      var fileName = 'gist.geojson';
      data.files[fileName] = {
        "content": document.querySelector('#geojson').value
      }
      e.preventDefault();
      var xhr = new XMLHttpRequest();
      var method = form.getAttribute('method');
      var url = form.getAttribute('action');
      xhr.open(method, url, true);
      // Change the content-type from the default of application/x-www-form-urlencoded
      // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest#Using_nothing_but_XMLHttpRequest
      xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
      xhr.onload = function(e) {
        var gistUrl = JSON.parse(e.target.response).html_url;
        var geojsoniourl = 'http://geojson.io/#id=gist:' + gistUrl.replace('https://gist.github.com', 'anonymous');
        if (btnid === 'gist') {
          document.location = gistUrl;
        } else {
          document.location = geojsoniourl;
        }
      };
      xhr.send(JSON.stringify(data));
    }, false);
  });
}