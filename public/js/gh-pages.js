function getManifest() {
  var queryString = location.search;
  let params = new URLSearchParams(queryString);
  let iiifManifest = params.get('manifest');
  return iiifManifest;
}
