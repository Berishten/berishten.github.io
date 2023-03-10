export default class Map {
  mapMarkers = [];

  constructor() {
    mapboxgl.accessToken =
      "pk.eyJ1IjoiYmVyaXNodGVuIiwiYSI6ImNrbzlqNzUyODAzbDIzNG83aHJyZzF5aWQifQ.uDa2TMtXhIayPnfY5_8u-g";
    this.map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/berishten/ckwofjrlh0g9t15o95287iogr",
      center: [-118.274861, 36.598999],
      doubleClickZoom: false,
      attributionControl: false,
      zoom: 13,
      minZoom: 15,
      maxZoom: 16,
      //   bearing: -30,
      // dragPan: false,
      // dragRotate: false,
      //   pitch: 45,
      // minPitch: 45,
      //   maxPitch: 45,
    });

    // this.map.on("load", (e) => {
    //   this.geoFindMe();
    // });
    this.getUserLocation();

    // Initialize events
    // this.InitOnClickCreateMarker();
  }

  InitOnClickCreateMarker() {
    this.map.on("click", (e) => {
      this.createMarker(e.lngLat);
    });
  }

  createMarker(location, element, data) {
    let marker = new mapboxgl.Marker(element);
    marker.setLngLat(location);
    let popup = new mapboxgl.Popup({
      closeButton: false,
      offset: { bottom: [0, -30] },
    });

    const name = data.name.charAt(0).toUpperCase() + data.name.slice(1);

    popup.setHTML(`<h1>${name}</h1>`);
    marker.setPopup(popup);
    marker.addTo(this.map);

    this.mapMarkers.push(marker);
  }

  getUserLocation() {
    let success = (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      this.lastUserPosition = [longitude, latitude];

      this.map.jumpTo({
        center: [longitude, latitude],
      });
    };

    function error() {
      console.log("Ocurrio un error");
    }

    navigator.geolocation.getCurrentPosition(success, error);
  }
}
