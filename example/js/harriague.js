var streetView;
var panoramas;
function createPanos() {
    panoramas = {};
    panoramas["entrada"] = {
        pano: 'entrada',
        description: "Entrada a la oficina",
        links: [{
            description : "Entrada a la oficina",
            pano : "oficina",
            heading : 10,
            pitch : 0
        },
        {
            description : "Pasillo",
            pano : "pasillo",
            heading : 220,
            pitch: 50
        }]
    };
    panoramas["oficina"] = {
        pano: 'oficina',
        description: "Oficina de harriague",
        links: [{
            description : "Entrada",
            pano : "entrada",
            heading : 125,
            pitch : 0
        }]
    };
    panoramas["pasillo"] = {
        pano: 'pasillo',
        description: "Pasillo de la entrada",
        links: [{
            description : "Entrada",
            pano : "entrada",
            heading : 180,
            pitch: 0
        }]
    };
}

function initialize() {
  createPanos();
  // Set StreetView provider.
  var streetViewOptions = {
    zoom: 1,
    panoProvider:  getCustomPanorama,
    pano: "entrada", //THe initial panorama
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
    copyright: 'Imagery (c) DinoClud',
    tiles: {
        tileSize: new google.maps.Size(1024, 512),
        worldSize: new google.maps.Size(1024, 512),
        centerHeading: 0,
        getTileUrl: getCustomPanoramaTileUrl
     }
  };
  streetViewPanoramaData["location"] = panoramas[panoID]
  return streetViewPanoramaData;
}

function createCustomLink() {
  var links = streetView.getLinks();
  var panoID = streetView.getPano();
  for (var link in panoramas[panoID].links) {
    links.push(panoramas[panoID].links[link]);
  }
}