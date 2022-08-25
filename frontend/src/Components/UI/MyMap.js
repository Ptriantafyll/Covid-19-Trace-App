import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./MyMap.css";
import L from "leaflet";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";

// code for marker icon to work
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

function MyMap(props) {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  // code that gets my current position
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const newpos = position;
      setLatitude(newpos.coords.latitude);
      setLongitude(newpos.coords.longitude);
    });
  }, []);

  const pos = [latitude, longitude];
  return latitude === 0 ? null : (
    <div className="w-50 mx-auto pt-5">
      {/*this h1 will be deleted later*/}
      <h1>
        {latitude} {longitude}
      </h1>
      <MapContainer center={pos} zoom={15} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={pos}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

//[38.2453608, 21.7367885]

export default MyMap;
