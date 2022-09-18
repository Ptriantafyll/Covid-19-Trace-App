import {
  MapContainer,
  TileLayer,
  Marker,
  Popup /*Circle*/,
} from "react-leaflet";
import "leaflet/dist/leaflet.css"; // needed for map
import "./MyMap.css"; // just defines the height of a leaflet container
import L from "leaflet";
import MapSearchBar from "./MapSearchBar";

// code for default marker icon to work
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

function MyMap(props) {
  return (
    <MapContainer center={props.currentpos} zoom={13} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={props.currentpos}>
        <Popup>You are here</Popup>
      </Marker>
      {props.searchedPOIs}
      <MapSearchBar onEnteredSearch={props.onEnteredSearch} />

      {/* <Circle center={props.currentpos} radius={5000} /> */}
    </MapContainer>
  );
}

export default MyMap;
