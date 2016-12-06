var streetView;

function initialize() {

  // Set StreetView provider.
  var streetViewOptions = {
    zoom: 1,
    panoProvider:  getCustomPanorama,
    pano: "entrada",
    visible: true,
    pov : {
      heading : 55,
      pitch : 0,
      zoom : 1
    }
  };
  
  // Create a StreetView object.
  var streetViewDiv = document.getElementById('streetview_canvas2');
  streetViewDiv.style.fontSize = "15px";
  streetView = new google.maps.StreetViewPanorama(streetViewDiv, streetViewOptions);

  // Add links when it happens "links_change" event.
  google.maps.event.addListener(streetView, "links_changed", createCustomLink);

}

function getCustomPanoramaTileUrl(panoID, zoom, tileX, tileY) {
  // Return a pano image given the panoID.
  // return "img/restaurant/ardenwood_tiles/" + panoID + '/'  + tileX + '-' +tileY + '_s1.jpg';
  return "http://tours-360.s3-us-west-2.amazonaws.com/harriague/" + panoID + ".jpg" ;
}

function getCustomPanorama(panoID) {
  var streetViewPanoramaData = {
    links: [],
    copyright: 'Imagery (c) Masashi Katsumata',
    tiles: {
        tileSize: new google.maps.Size(1024, 512),
        worldSize: new google.maps.Size(1024, 512),
        centerHeading: 0,
        getTileUrl: getCustomPanoramaTileUrl
     }
  };
  switch(panoID) {
    case "entrada":
      streetViewPanoramaData["location"] = {
        pano: 'entrada',
        description: "Entrada a la oficina"
      };
      break;
    case "oficina":
      streetViewPanoramaData["location"] = {
        pano: 'oficina',
        description: "Oficina de harriague"
      };
      break;
    case "pasillo":
      streetViewPanoramaData["location"] = {
        pano: 'pasillo',
        description: "Pasillo de la entrada"
      };
      break;
  }
  return streetViewPanoramaData;
}

function createCustomLink() {
  var links = streetView.getLinks();
  var panoID = streetView.getPano();
  
  switch(panoID) {

    case "entrada":
      links.push({
        description : "Entrada a la oficina",
        pano : "oficina",
        heading : 10
      });
      break;

    case "oficina":
      links.push({
        description : "Entrada",
        pano : "entrada",
        heading : 125
      });
      break;
      
  }
  
}
google.maps.event.addDomListener(window, 'load', initialize);