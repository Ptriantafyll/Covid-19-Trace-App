import MyMap from "../Components/UI/MyMap";
import MapSearchBar from "../Components/UI/MapSearchBar";
import { Marker, Popup } from "react-leaflet";
import { Button } from "react-bootstrap";
import axios from "axios";

import { useState, useContext } from "react";

import UserContext from "../Store/CurrentUserContext";
import PositionContext from "../Store/CurrentPositionContext";
import ModalContext from "../Store/ModalContext";

import green_icon from "../Icons/green-icon";
import red_icon from "../Icons/red-icon";
import orange_icon from "../Icons/orange-icon";

import VisitModal from "../Components/UI/VisitModal";
import CalculateDistance from "../CalculateDistance";

function UserHomePage() {
  const BaseURL = "http://localhost:3000/"; // api url
  const [returnedPOIs, setReturnedPOIs] = useState({});
  const [isloading, setIsloading] = useState(false);
  const currentUserContext = useContext(UserContext);
  const currentPositioncontext = useContext(PositionContext);
  const modal_context = useContext(ModalContext);
  const today = new Date();

  console.log("people " + modal_context.people);
  // console.log(currentPositioncontext);

  // searched in the db and returns POIs
  function POISearchHandler() {
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
  // function addVisitHandler(poi_name) {
  //TODO: να βάζει ο χρήστης το peopleEstimate και να βάλω μία if(υπάρχει το peopleEstimate)
  //TODO: συναίνεση από χρήστη
  // console.log("in handler: " + poi_name);
  // setIsloading(true);
  // axios
  //   .post(BaseURL + "visit", {
  //     user: currentUserContext.username,
  //     POI: poi_name,
  //     time: today.getTime(),
  //     peopleEstimate: 50,
  //   })
  //   .then((response) => {
  //     console.log(response);
  //     setIsloading(false);
  //   })
  //   .catch((error) => {
  //     console.log(error.response);
  //   });
  //   console.log("here");
  // }

  var myMarkers = null;
  if (returnedPOIs.length > 0) {
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
                ? "Did you visit " + poi.name + " ?"
                : "This POI is too far"}
              <br />
              {closer_than_20[i++] ? (
                <Button
                  variant="primary"
                  className="btn-sm"
                  onClick={() => {
                    modal_context.openModal(poi.name);
                  }}
                >
                  Yes
                </Button>
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
      <VisitModal />
    </div>
  );
}

export default UserHomePage;
