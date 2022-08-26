import MyMap from "../Components/UI/MyMap";
import MapSearchBar from "../Components/UI/MapSearchBar";
import axios from "axios";
import { useState } from "react";
import { Marker, Popup } from "react-leaflet";
import green_icon from "../Icons/green-icon";
import red_icon from "../Icons/red-icon";
import orange_icon from "../Icons/orange-icon";

function UserHomePage() {
  const BaseURL = "http://localhost:3000/"; // api url
  const [returnedPOIs, setReturnedPOIs] = useState({});
  const [isloading, setIsloading] = useState(false);

  function POISearchHandler(enteredPOI) {
    // enteredPOI has the value of the text input field
    setIsloading(true);
    axios
      .get(BaseURL + "POI") // add the contents of the search
      .then((response) => {
        // TODO: find a way to create a marker and add it to MyMap
        // also keep the coordinates and other stuff
        setReturnedPOIs(response.data.POIs);
        setIsloading(false);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }

  if (isloading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }

  var myMarkers = null;
  if (returnedPOIs.length > 0) {
    const today = new Date();
    const current_day = today.getDay();
    const current_hour = today.getHours();
    const icon_colors = [];
    const percentages = [];

    for (const poi in returnedPOIs) {
      var percentage =
        (returnedPOIs[poi].populartimes[current_day - 1].data[current_hour] +
          returnedPOIs[poi].populartimes[current_day - 1].data[
            current_hour + 1
          ]) /
        2;
      percentages.push(percentage);

      if (percentage < 33) {
        icon_colors.push(green_icon);
      } else if (percentage >= 33 && percentage < 66) {
        icon_colors.push(orange_icon);
      } else {
        icon_colors.push(red_icon);
      }
    }

    var i = 0;
    // TODO: να βάλω τις επισκέψεις που δηλώνουν οι άλλοι χρήστες
    // και να φτιάξω την αναζήτηση στη βάση
    myMarkers = returnedPOIs.map((poi) => {
      return (
        <Marker
          key={poi.name}
          position={poi.coordinates[0]}
          icon={icon_colors[i]}
        >
          <Popup>
            <p className="text-center">
              {poi.name} <br /> Estimated traffic for the next 2 hours:
              {percentages[i++]}%
            </p>
          </Popup>
        </Marker>
      );
    });
  }

  return (
    <div>
      <MyMap searchedPOIs={myMarkers} />
      <h2 className="text-center">
        Enter the type of POI you wish to see on the map
      </h2>
      <MapSearchBar onEnteredSearch={POISearchHandler} />
    </div>
  );
}

export default UserHomePage;
