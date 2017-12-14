$('#download').bind('click', function() {
  var btn = document.getElementById('download');
  var now = new Date();
  var y = now.getFullYear();
  var m = now.getMonth()+1;
  var d = now.getDate();
  var today = y + "" + m + "" + d;

  // テキストエリアから入力内容を取得する
  var content = document.getElementById('geojson').value;

  // テキストファイルをBlob形式に変換する
  let blob = new Blob([content]);

  // Blobデータに対するURLを発行する
  let blobURL = window.URL.createObjectURL(blob);

  // URLをaタグに設定する
  let a = document.createElement('a');
  a.href = blobURL;

  // download属性でダウンロード時のファイル名を指定
  a.download = today + '.geojson';

  // Firefoxの場合は、実際にDOMに追加しておく必要がある
  document.body.appendChild(a);

  // CLickしてダウンロード
  a.click();

  // 終わったら不要なので要素を削除
  a.parentNode.removeChild(a);
});