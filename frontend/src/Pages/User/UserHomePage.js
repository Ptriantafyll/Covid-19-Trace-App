import MyMap from "../../Components/UI/MyMap";
import { Marker, Popup } from "react-leaflet";
import { Alert, Container } from "react-bootstrap";
import axios from "axios";
import { useState, useContext } from "react";
import PositionContext from "../../Store/CurrentPositionContext";
import ModalContext from "../../Store/VisitModalContext";
import green_icon from "../../Icons/green-icon";
import red_icon from "../../Icons/red-icon";
import orange_icon from "../../Icons/orange-icon";
import VisitModal from "../../Components/UI/VisitModal";
import CalculateDistance from "../../Components/CalculateDistance";

function UserHomePage() {
  const BaseURL = "http://localhost:8000/"; // api url
  const [returnedPOIs, setReturnedPOIs] = useState({});
  const [isloading, setIsloading] = useState(false);
  const [average_for_every_poi, setaverage_for_every_poi] = useState([]);
  const [failureAlertShow, setFailureAlertShow] = useState(false);
  const [successAlertShow, setSuccessAlertShow] = useState(false);
  const [type, setType] = useState();
  const currentPositioncontext = useContext(PositionContext);
  const modal_context = useContext(ModalContext);
  const today = new Date();

  // searches in the db and returns POIs of a specific type
  function POISearchHandler(enteredPOIType) {
    setIsloading(true);
    axios
      .get(BaseURL + "POI/" + enteredPOIType)
      .then((response) => {
        setReturnedPOIs(response.data.POIs);
        getEstimates(response.data.POIs);
        setType(enteredPOIType);
        setFailureAlertShow(false);
        setSuccessAlertShow(true);
        setIsloading(false);
      })
      .catch((error) => {
        console.log(error.response.data.message); // message sent from backend
        if (
          error.response.data.message === "The type you entered does not exist"
        ) {
          setFailureAlertShow(true);
          setSuccessAlertShow(false);
        }
        setIsloading(false);
      });
  }

  function getEstimates(POIS) {
    // gets user Estimates of people in every POI (for the popups)
    const pois_avg = [];
    var totalpeople = 0;
    var totalvisits = 0;
    var average = 0;
    if (POIS.length > 0) {
      axios
        .get(BaseURL + "visit/2hours/" + today.getHours())
        .then((response) => {
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
        // coordinates close to Flocafe and Libido
        // 38.2376827,
        // 21.7259359

        currentPositioncontext.latitude,
        currentPositioncontext.longitude
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

    var i = 0;
    // myMarkers = markers on the positions of every POI returned from the search
    myMarkers = returnedPOIs.map((poi) => {
      return (
        <Marker
          key={poi.id}
          position={poi.coordinates[0]}
          icon={icon_colors[i]}
        >
          <Popup>
            <p className="text-center">
              {poi.name} , {poi.address} <br /> Estimated traffic for the next 2
              hours: {percentages[i]}% <br />
              {closer_than_20[i] ? "Press " : null}
              {closer_than_20[i] ? (
                <a
                  href="##"
                  onClick={() => {
                    modal_context.openModal(poi.name, poi.id);
                  }}
                >
                  here
                </a>
              ) : null}
              {closer_than_20[i] ? " to add visit to " + poi.name : null}
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

  const pos = [
    currentPositioncontext.latitude,
    currentPositioncontext.longitude,
  ];

  return (
    <div>
      <h1 className="text-center mt-3">
        Search for a type of place you wish to see on the map.
      </h1>

      <Container className="w-75 mx-auto">
        {failureAlertShow && (
          <Alert
            show={failureAlertShow}
            variant="danger"
            className="mt-3 mx-3"
            onClose={() => setFailureAlertShow(false)}
            dismissible
          >
            <Alert.Heading className="text-center">
              The type you entered does not exist.
            </Alert.Heading>
          </Alert>
        )}
        {successAlertShow && (
          <Alert
            show={successAlertShow}
            variant="success"
            className="mt-3 mx-3"
            onClose={() => setSuccessAlertShow(false)}
            dismissible
          >
            <Alert.Heading className="text-center">
              {type === ""
                ? "Sowing all Points of Interest"
                : "Showing Poinst of Interest of type " + type}
            </Alert.Heading>
          </Alert>
        )}
        <MyMap
          searchedPOIs={myMarkers}
          currentpos={pos}
          onEnteredSearch={POISearchHandler}
        />
      </Container>
      <VisitModal />
    </div>
  );
}

export default UserHomePage;
