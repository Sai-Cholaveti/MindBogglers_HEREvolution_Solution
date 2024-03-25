// Initiate and authenticate your connection to the HERE platform:
const platform = new H.service.Platform({
    'apikey': 'your API key'
});

// Obtain the default map types from the platform object:
const defaultLayers = platform.createDefaultLayers();

// Instantiate (and display) a map:
const map = new H.Map(
    document.getElementById("map"),
    // Center the map on Dublin, Republic of Ireland, with the zoom level of 10:
    defaultLayers.vector.normal.map, {
        zoom: 11,
        center: {
            lat: 53.349805,
            lng: -6.260310
        }
    });

// MapEvents enables the event system.
// The behavior variable implements default interactions for pan/zoom (also on mobile touch environments).
const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

// Enable dynamic resizing of the map, based on the current size of the enclosing cntainer
window.addEventListener('resize', () => map.getViewPort().resize());
