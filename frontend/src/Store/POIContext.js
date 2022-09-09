import axios from "axios";
import { createContext, useState } from "react";

const POIContext = createContext({
  poidata: {},
  storePOIs: () => {},
});

export function POIContextProvider(props) {
  const BaseURL = "http://localhost:8000/"; // api url
  const [mydata, setMydata] = useState();

  function storePOIsHandler() {
    var temp = {};
    axios
      .get(BaseURL + "POI")
      .then((response) => {
        for (const poi of response.data.POIs) {
          temp[poi.name] = poi.types;
        }
        setMydata(temp);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const context = {
    poidata: mydata,
    storePOIs: storePOIsHandler,
  };

  return (
    <POIContext.Provider value={context}>{props.children}</POIContext.Provider>
  );
}

export default POIContext;
