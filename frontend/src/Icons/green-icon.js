import L from "leaflet";

const green_icon = L.icon({
  iconUrl: require("./green-marker-icon.png"),
  iconSize: [25, 41],
  iconAnchor: [0, 0],
  shadowUrl: require("./marker-shadow.png"),
  shadowSize: [41, 41],
  // shadowAnchor: [22, 94],
});

export default green_icon;
