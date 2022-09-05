import MyMap from "../Components/UI/MyMap";
import { Marker, Popup } from "react-leaflet";
import { Button } from "react-bootstrap";
import axios from "axios";

import { useState, useContext } from "react";

import UserContext from "../Store/CurrentUserContext";
import PositionContext from "../Store/CurrentPositionContext";
import ModalContext from "../Store/VisitModalContext";

import green_icon from "../Icons/green-icon";
import red_icon from "../Icons/red-icon";
import orange_icon from "../Icons/orange-icon";

import VisitModal from "../Components/UI/VisitModal";
import CalculateDistance from "../CalculateDistance";

function UserHomePage() {
  const BaseURL = "http://localhost:3000/"; // api url
  const [returnedPOIs, setReturnedPOIs] = useState({});
  const [isloading, setIsloading] = useState(false);
  const [average_for_every_poi, setaverage_for_every_poi] = useState([]);
  const currentUserContext = useContext(UserContext);
  const currentPositioncontext = useContext(PositionContext);
  const modal_context = useContext(ModalContext);
  const today = new Date();

  // searched in the db and returns POIs of a specific type
  function POISearchHandler(enteredPOIType) {
    // todo: να ψάξω όλα τα types και να το φτιάξω σαν combo box?
    setIsloading(true);
    axios
      .get(BaseURL + "POI/" + enteredPOIType)
      .then((response) => {
        setReturnedPOIs(response.data.POIs);
        getEstimates(response.data.POIs);
        setIsloading(false);
      })
      .catch((error) => {
        console.log(error.response.data.message); // message sent from backend
        setIsloading(false);
      });
  }

  function getEstimates(POIS) {
    const pois_avg = [];
    var totalpeople = 0;
    var totalvisits = 0;
    var average = 0;
    if (POIS.length > 0) {
      // ίσως να μεταφερθεί στην από κάτω ιφ
      axios
        .get(BaseURL + "visit/2hours/" + today.getHours())
        .then((response) => {
          // console.log(response.data.visits_of_the_next_2_hours);
          if (response.data.visits_of_the_next_2_hours.length > 0) {
            // store average for every poi
            for (const poi in POIS) {
              totalpeople = 0;
              totalvisits = 0;
              for (const visit in response.data.visits_of_the_next_2_hours) {
                if (
                  POIS[poi].name ===
                  response.data.visits_of_the_next_2_hours[visit].POI
                ) {
                  if (
                    response.data.visits_of_the_next_2_hours[visit]
                      .peopleEstimate
                  ) {
                    totalpeople +=
                      response.data.visits_of_the_next_2_hours[visit]
                        .peopleEstimate;

                    totalvisits++;
                  }
                }
              }
              average = totalvisits === 0 ? 0 : totalpeople / totalvisits;
              pois_avg.push(average);
            }

            // console.log("average for every poi: " + pois_avg);
            // console.log(POIS);
          } else {
            // there are no visits for the next 2 hours
            for (let i = 0; i < POIS.length; i++) {
              pois_avg.push(0);
            }
          }
          setaverage_for_every_poi(pois_avg);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  // maybe make this a function
  var myMarkers = null;
  if (returnedPOIs.length > 0) {
    // console.log("here " + getEstimates(returnedPOIs));
    // console.log("avg: " + average_for_every_poi);
    // console.log(returnedPOIs);
    const current_day = today.getDay() === 0 ? 7 : today.getDay();
    const current_hour = today.getHours();
    const icon_colors = [];
    const percentages = [];
    const closer_than_20 = [];
    const average_messages = [];

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

    for (const j in average_for_every_poi) {
      if (average_for_every_poi[j] === 0) {
        average_messages.push(
          "There is no user data for the people for the next 2 hours"
        );
      } else {
        average_messages.push(
          "Average people in this poi for the next 2 hours: " +
            average_for_every_poi[j] +
            " (user data)"
        );
      }
    }
    // console.log(average_messages);
    // console.log(average_for_every_poi);
    var i = 0;
    // TODO: να βάλω τις επισκέψεις που δηλώνουν οι άλλοι χρήστες
    // εμφανίζεται ο μέσος αριθμός των επισκεπτών με βάση τις καταχωρήσεις άλλων χρηστών, αν υπάρχουν ως και 2 ώρες πριν την τρέχουσα χρονική στιγμή

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
                ? "Click the button if you would like to add a visit to " +
                  poi.name +
                  " "
                : "This POI is too far"}
              {/* να αλλάξω το πώς εμφανίζεται */}
              {closer_than_20[i] ? (
                <Button
                  variant="primary"
                  className="btn-sm"
                  onClick={() => {
                    modal_context.openModal(poi.name);
                  }}
                >
                  Add Visit
                </Button>
              ) : null}
              <br />
              {average_messages[i++]}
            </p>
          </Popup>
        </Marker>
      );
    });
  }

  if (isloading) {
    return (
      <div className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
        <div className="spinner-border text-dark" />
      </div>
    );
  }
  // todo: δεν δουλεύει σε mobile, να βρω καλύτερο τρόπο να το εμφανίζει
  const pos = [
    currentPositioncontext.latitude,
    currentPositioncontext.longitude,
  ];

  return (
    <div>
      <MyMap
        searchedPOIs={myMarkers}
        currentpos={pos}
        onEnteredSearch={POISearchHandler}
      />
      <h2 className="text-center">
        User is
        {" " +
          currentUserContext.username +
          " latitude is " +
          currentPositioncontext.latitude}
      </h2>

      <VisitModal />
    </div>
  );
}

export default UserHomePage;
