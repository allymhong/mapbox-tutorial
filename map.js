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
      zoom: 12,
      bearing: 0,
      pitch: 0,
    },
    controller: true,
  });
  