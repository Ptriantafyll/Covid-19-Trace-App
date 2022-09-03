import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css"; // needed for map
import "./MyMap.css"; // just defines the height of a leaflet container
import L from "leaflet";
import "bootstrap/dist/css/bootstrap.min.css";
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
    <div className="w-50 mx-auto pt-5 pb-5">
      <MapContainer center={props.currentpos} zoom={13} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={props.currentpos}>
          <Popup>You are here</Popup>
        </Marker>
        {/*the result of the search for POIs in the database*/}
        {props.searchedPOIs}
        <MapSearchBar onEnteredSearch={props.onEnteredSearch} />
      </MapContainer>
    </div>
  );
}

export default MyMap;
