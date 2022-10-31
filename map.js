const pop_density = "./Vital_Population_PD.geojson"
function map_range(value, low1, high1, low2, high2) {
  return low2 + ((high2 - low2) * (value - low1)) / (high1 - low1);
}


function flyToClick(coords) {
  deckgl.setProps({
    initialViewState: {
      longitude: coords[0],
      latitude: coords[1],
      zoom: 15,
      transitionDuration: 500,
      transitionInterpolator: new deck.FlyToInterpolator(),
    },
  });
}
 
const panel = document.getElementById("panel");
const panelChild = document.querySelector("#panel :nth-child(2)");



const deckgl = new deck.DeckGL({
    container: "map",
    // Set your Mapbox access token here
    mapboxApiAccessToken:
  "pk.eyJ1IjoiYWxseW1pbmp1IiwiYSI6ImNsOXd0eGZ1cDA0NTIzcW41cnU0YzV2ZGoifQ.JwTImbn-rdOcGDY-c7MPZw",
    // Set your Mapbox style here
    mapStyle: "mapbox://styles/allyminju/cl9wu7nse007714n79ngmy9d7",
    initialViewState: {
      latitude: 39.9526,
      longitude: -75.1652,
      zoom: 13,
      minZoom: 12.5,
      bearing: 0,
      pitch: 0,
    },
    controller: true,
  
layers: [
  new deck.GeoJsonLayer({
    id: "pop_density",
    data: pop_density,
    // Styles
    // filled: true,
    stroke: false,

    // Function for fill color
    getFillColor: (d) => {
      const abs = Math.abs(d.properties.COUNT_ALL_RACES_ETHNICITIES);
      const color = map_range(abs, 0, 3.5, 0, 255); //lazy remap values to 0-255

    //logic:
    //If COUNT_ALL_RACES_ETHNICITIES isn’t null:
		  //if less than 0, return something in a blue-hue, otherwise red hue
	  //if COUNT_ALL_RACES_ETHNICITIES is null, return color with 0 alpha (transparent)
        return d.properties.COUNT_ALL_RACES_ETHNICITIES
          ? d.properties.COUNT_ALL_RACES_ETHNICITIES < 100000000
            ? [60, 60, color, 0]
            : [color, 60, 72, color + 66]
          : [0, 0, 0, 0];
      },

      getStrokeColor: [0, 0, 0, 255],
      LineWidthUnits: "meters",
      getLineWidth: 35,
      // Interactive props
      pickable: true,
      autoHighlight: true,
      highlightColor: [255, 255, 255, 200],
    }),
  ],

  onClick: (info) => {
    // flyToClick(info.coordinate);

    panelChild.innerHTML = `<strong>District #${
      info.object.properties.OBJECTID
    }</strong>
  <br></br>
  Population: ${(info.object.properties.COUNT_ALL_RACES_ETHNICITIES/1e3).toFixed(1) + "k" || "N/A"} <br></br>

  Asian: ${info.object.properties.PERCENT_ASIAN_NH.toFixed(2 || "N/A")}%
  <br></br>
  Black: ${info.object.properties.PERCENT_BLACK_NH.toFixed(2 || "N/A")}%
  <br></br>
  Hispanic: ${info.object.properties.PERCENT_HISPANIC.toFixed(2 || "N/A")}%
  <br></br>
  White: ${info.object.properties.PERCENT_WHITE_NH.toFixed(2 || "N/A")}%

  <br></br>
 `;
    panel.style.opacity = 0.2;
  },

  
  getTooltip: ({ object }) => {
    return (
      object &&
      `District ${object.properties.OBJECTID}
      Population: ${
        object.properties.COUNT_ALL_RACES_ETHNICITIES
          ? (object.properties.COUNT_ALL_RACES_ETHNICITIES/1e3).toFixed(1) + "k"
          : "No Data"
      } People
      `
    );
  }, 
});
