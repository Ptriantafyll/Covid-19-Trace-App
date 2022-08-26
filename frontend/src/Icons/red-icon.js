import L from "leaflet";

const red_icon = L.icon({
  iconUrl: require("./red-marker-icon.png"),
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  shadowUrl: require("./marker-shadow.png"),
  shadowSize: [41, 41],
  popupAnchor: [0, -35],
});

export default red_icon;
