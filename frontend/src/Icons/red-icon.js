import L from "leaflet";

const red_icon = L.icon({
  iconUrl: require("./red-marker-icon.png"),
  iconSize: [25, 41],
  iconAnchor: [0, 0],
  shadowUrl: require("./marker-shadow.png"),
  shadowSize: [41, 41],
});

export default red_icon;
