var streetView;

function initialize() {

  // Set StreetView provider.
  var streetViewOptions = {
    zoom: 1,
    panoProvider:  getCustomPanorama,
    pano: "the_bar",
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
  // return "ardenwood_tiles/" + panoID + '/'  + tileX + '-' +tileY + '_s1.jpg';
  return "img/restaurant/" + panoID + ".jpg" ;
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
    case "the_bar":
      streetViewPanoramaData["location"] = {
        pano: 'the_bar',
        description: "The bar"
      };
      break;
    case "dinning_room":
      streetViewPanoramaData["location"] = {
        pano: 'dinning_room',
        description: "Dinning Room"
      };
      break;
  }
  return streetViewPanoramaData;
}

function createCustomLink() {
  var links = streetView.getLinks();
  var panoID = streetView.getPano();
  
  switch(panoID) {

    case "the_bar":
      links.push({
        description : "The bar",
        pano : "dinning_room",
        heading : 125
      });
      break;

    case "dinning_room":
      links.push({
        description : "Dinning Room",
        pano : "the_bar",
        heading : 125
      });
      break;
      
  }
  
}
google.maps.event.addDomListener(window, 'load', initialize);