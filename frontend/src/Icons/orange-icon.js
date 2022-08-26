import L from "leaflet";

const orange_icon = L.icon({
  iconUrl: require("./orange-marker-icon.png"),
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  shadowUrl: require("./marker-shadow.png"),
  shadowSize: [41, 41],
  popupAnchor: [0, -35],
  // shadowAnchor: [22, 94],
});

export default orange_icon;
