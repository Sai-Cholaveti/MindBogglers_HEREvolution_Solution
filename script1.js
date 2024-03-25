// Get instance of the Indoor Maps service
// The second parameter 'opt_version' signifies the venues version. 
//    2 = latest venue service, 1 = legacy service
const venuesService = platform.getVenuesService({ 
    apikey: 'ASVv8c6-SBDzGquMbbmD_cD6Be6pmbWNRIuFU2CXGEo',
    hrn: 'Platform hrn for indoor maps catalog'
  }, 2);
// Get a list of indoor maps
venuesService.getMapInfoList().then((res) => {
    console.log("Indoor Maps: ", res)
  }).catch((e) => {
    console.error("Error when fetching map list", e)
  })
// Indoor Maps provider interacts with a tile layer to visualize and control the Indoor Map
const venuesProvider = new H.venues.Provider();

// Indoor Maps service provides a loadVenue method
venuesService.loadVenue(VENUE_ID).then((venue) => {
  // add Indoor Map to the venues provider
  venuesProvider.addVenue(venue);
  venuesProvider.setActiveVenue(venue);

 // create a tile layer for the Indoor Maps provider
  map.addLayer(new H.map.layer.TileLayer(venuesProvider));

  // center the map on the Indoor Map
  map.setCenter(venue.getCenter());
  map.setZoom(15);
});
// Get active Indoor Map
const venue = venuesProvider.getActiveVenue();

// get current level index
venue.getActiveLevelIndex();

// and change level
venue.setActiveLevelIndex(1);
// This is an option to override label preference. 
// If both space name and address are available for a given space, they will take priority over the rest of labels, in the given order.
const labelTextPreferenceOverride = [
    H.venues.Service2.LABEL_TEXT_PREFERENCE_OVERRIDE.SPACE_NAME,
    H.venues.Service2.LABEL_TEXT_PREFERENCE_OVERRIDE.INTERNAL_ADDRESS
  ]
  
  // Indoor Maps service provides a loadVenue method
  venuesService.loadVenue(VENUE_ID, { labelTextPreferenceOverride }).then((venue) => {
    // add Indoor Map to the venues provider
    venuesProvider.addVenue(venue);
    venuesProvider.setActiveVenue(venue);
  
   // create a tile layer for the Indoor Maps provider
    map.addLayer(new H.map.layer.TileLayer(venuesProvider));
  });
      



// Create the level control
const levelControl = new H.venues.ui.LevelControl(venue);
ui.addControl('level-control', levelControl);

// Create the drawing control:
const drawingControl = new H.venues.ui.DrawingControl(venue);
ui.addControl('drawing-control', drawingControl);
// Create the default UI:

// Create the default UI:
const ui = H.ui.UI.createDefault(map, defaultLayers, `en-US`);
// Ensure that you access the control after you initialized the UI

const control = ui.getControl('controlName'); // Replace 'controlName' with the name of the control you want to manage, for example, 'mapsettings.'
const mapSettingsControl = ui.getControl('mapsettings');
mapSettingsControl.setAlignment('top-left');
//Enabling zoom control

const zoomControl = ui.getControl('zoom');
zoomControl.setVisibility(false);
//Disable zoom control

zoomControl.setDisabled(true);

// Create a map layer for the overview control
const overviewLayers = platform.createDefaultLayers();
// Instatiate the overview map by using the H.ui.Overview constructor
const overviewMap = new H.ui.Overview(overviewLayers.raster.satellite.map, {
    //Set the control position and the map size and zoom parameters with respect to the map's viewport
    alignment: H.ui.LayoutAlignment.LEFT_BOTTOM,
    zoomDelta: 6,
    scaleX: 5,
    scaleY: 6
});
// Add the control to the map
ui.addControl('overview', overviewMap);
// Create the coordinates for the Spire of Dublin
const spireCoordinates = {
    lat: 53.349805,
    lng: -6.260310
};


// Add the info bubble to the UI
ui.addBubble(infoBubble);
const zoomRectangle = new H.ui.ZoomRectangle({
    // Position the control on the map's viewport
    alignment: H.ui.LayoutAlignment.RIGHT_BOTTOM
});
ui.addControl('rectangle', zoomRectangle);

// Create a template for marker icons by using custom SVG style
function createMarkerIcon(color) {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="32" viewBox="0 0 24 32">
      <path d="M12 0C6.48 0 2 4.48 2 10c0 5.057 3.333 14.5 10 22 6.667-7.5 10-16.943 10-22 0-5.52-4.48-10-10-10zm0 14c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z" 
      fill="${color}" stroke="#FFFFFF"/>
    </svg>`;
  }
  
  // Define the colors for the icons
  const startColor = "#00008B";
  const stopoverColor = "#8AC9C9";
  const splitColor = "#A2EDE7";
  const endColor = "#990000";
  
  // Create the icons with respective colors
  const startIcon = new H.map.Icon(createMarkerIcon(startColor));
  const stopoverIcon = new H.map.Icon(createMarkerIcon(stopoverColor));
  const endIcon = new H.map.Icon(createMarkerIcon(endColor));
  const splitIcon = new H.map.Icon(createMarkerIcon(splitColor));
  
  // Create the DistanceMeasurement control
  const distanceMeasurementTool = new H.ui.DistanceMeasurement({
    startIcon: startIcon,
    stopoverIcon: stopoverIcon,
    endIcon: endIcon,
    splitIcon: splitIcon,
    lineStyle: {
      strokeColor: "rgba(95, 229, 218, 0.5)",
      lineWidth: 6
    },
    alignment: H.ui.LayoutAlignment.RIGHT_BOTTOM
  });
  
  // Add the DistanceMeasurement control to the UI
  ui.addControl("distancemeasurement", distanceMeasurementTool);
  ui.setUnitSystem(H.ui.UnitSystem.IMPERIAL);
