import MyMap from "../Components/UI/MyMap";
import MapSearchBar from "../Components/UI/MapSearchBar";
import { Marker, Popup } from "react-leaflet";
import axios from "axios";

import { useState, useContext } from "react";

// todo find a way to pass user from login to userhomepage
import UserContext from "../Store/CurrentUserContext";
import PositionContext from "../Store/CurrentPositionContext";

import green_icon from "../Icons/green-icon";
import red_icon from "../Icons/red-icon";
import orange_icon from "../Icons/orange-icon";
import CalculateDistance from "../CalculateDistance";

function UserHomePage() {
  const BaseURL = "http://localhost:3000/"; // api url
  const [returnedPOIs, setReturnedPOIs] = useState({});
  const [isloading, setIsloading] = useState(false);
  const currentUserContext = useContext(UserContext);
  const currentPositioncontext = useContext(PositionContext);
  console.log(currentPositioncontext);

  // searched in the db and returns POIs
  function POISearchHandler(enteredPOI) {
    // enteredPOI has the value of the text input field
    // TODO: search in DB
    setIsloading(true);
    axios
      .get(BaseURL + "POI") // add the contents of the search
      .then((response) => {
        setReturnedPOIs(response.data.POIs);
        setIsloading(false);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }

  // make a post request to 3000/visit
  function addVisitHandler() {}

  var myMarkers = null;
  if (returnedPOIs.length > 0) {
    const today = new Date();
    const current_day = today.getDay() === 0 ? 7 : today.getDay();
    const current_hour = today.getHours();
    const icon_colors = [];
    const percentages = [];
    const closer_than_20 = [];

    for (const poi in returnedPOIs) {
      var percentage =
        (returnedPOIs[poi].populartimes[current_day - 1].data[current_hour] +
          returnedPOIs[poi].populartimes[current_day - 1].data[
            current_hour + 1
          ]) /
        2; // ίσως χρειαστεί να αλλάξουν τα current_hour -> να γίνουν +1
      percentages.push(percentage);

      // icon_colors has the icon for every POI returned
      if (percentage < 33) {
        icon_colors.push(green_icon);
      } else if (percentage >= 33 && percentage < 66) {
        icon_colors.push(orange_icon);
      } else {
        icon_colors.push(red_icon);
      }

      var distance = CalculateDistance(
        returnedPOIs[poi].coordinates[0].lat,
        returnedPOIs[poi].coordinates[0].lng,
        38.2376827,
        21.7259359
        // latitude,
        // longitude
      );

      // closer_than_20 has true for every poi (of those returned from the search) that is whithin 20 meters of the user
      if (distance <= 20) closer_than_20.push(true);
      else closer_than_20.push(false);
    }

    var i = 0;
    // TODO: να βάλω τις επισκέψεις που δηλώνουν οι άλλοι χρήστες
    // και να φτιάξω την αναζήτηση στη βάση
    // myMarkers = markers on the positions of every POI returned from the search
    myMarkers = returnedPOIs.map((poi) => {
      return (
        <Marker
          key={poi.name}
          position={poi.coordinates[0]}
          icon={icon_colors[i]}
        >
          <Popup>
            <p className="text-center">
              {poi.name} <br /> Estimated traffic for the next 2 hours:{" "}
              {percentages[i]}% <br />
              {closer_than_20[i]
                ? "Did you visit this POI?"
                : "This POI is too far"}
              <br />
              {closer_than_20[i++] ? (
                <button
                  onClick={addVisitHandler}
                  className="btn btn-primary btn-sm"
                >
                  yes
                </button>
              ) : // TODO: να φτιάξω το addvisithandler
              null}
            </p>
          </Popup>
        </Marker>
      );
    });
  }

  if (isloading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }
  // todo: δεν δουλεύει σε mobile, να βρω καλύτερο τρόπο να το εμφανίζει
  const pos = [
    currentPositioncontext.latitude,
    currentPositioncontext.longitude,
  ];
  console.log(pos);

  return (
    <div>
      <MyMap searchedPOIs={myMarkers} currentpos={pos} />
      <h2 className="text-center">
        Enter the type of POI you wish to see on the map
        {" " +
          currentUserContext.username +
          " " +
          currentPositioncontext.latitude}
      </h2>
      <MapSearchBar onEnteredSearch={POISearchHandler} />
    </div>
  );
}

export default UserHomePage;
