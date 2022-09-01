import { createContext, useState, useEffect } from "react";

const PositionContext = createContext({
  latitude: null,
  longitude: null,
});

export function PositionContextProvider(props) {
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);

  // get my current position and store it in state
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newpos = position;
        setLat(newpos.coords.latitude);
        setLng(newpos.coords.longitude);
      },
      (error) => {
        console.log(error);
      },
      {
        enableHighAccuracy: true,
      }
    );
  }, []);

  const context = {
    latitude: lat,
    longitude: lng,
  };

  return (
    <PositionContext.Provider value={context}>
      {props.children}
    </PositionContext.Provider>
  );
}

export default PositionContext;
