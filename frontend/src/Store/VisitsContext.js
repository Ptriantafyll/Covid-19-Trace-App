import axios from "axios";
import { createContext, useContext, useState } from "react";
import UserContext from "./UserContext";

const VisitsContext = createContext({
  all_visits: [],
  all_visits_of_current_user: [],
  last_2weeks_visits_of_allusers: [],
  last_weeks_visits_of_current_user: [],
  storeVisits: () => {},
  storeUserVisits: () => {},
  storeAllVisits: () => {},
});

export function VisitsContextProvider(props) {
  const BaseURL = "http://localhost:8000/"; // api url
  const [allVisits, setAllVisits] = useState();
  const [allUsersVisits, setAllUsersVisits] = useState();
  const [currentUserVisists, setCurrentUSerVisits] = useState();
  const [userAllVisits, setUserAllVisits] = useState();
  const user_context = useContext(UserContext);

  function storeVisitsHandler() {
    axios
      .get(BaseURL + "visit/lastweek/allusers")
      .then((response) => {
        setAllUsersVisits(response.data.lastweeks_visits);
      })
      .catch((error) => {
        console.log(error); // message sent from backend
      });

    axios
      .get(BaseURL + "visit/lastweek/" + user_context.username)
      .then((response) => {
        setCurrentUSerVisits(response.data.lastweeks_visits);
      })
      .catch((error) => {
        console.log(error); // message sent from backend
      });
  }

  function storeUserVisitsHandler() {
    axios
      .get(BaseURL + "visit/username/" + user_context.username)
      .then((response) => {
        console.log("here");
        setUserAllVisits(response.data.visits_of_user);
      })
      .catch((error) => {
        console.log(error); // message sent from backend
      });
  }

  function storeAllVisitsHandler() {
    axios
      .get(BaseURL + "visit")
      .then((response) => {
        setAllVisits(response.data);
      })
      .catch((error) => {
        console.log(error); // message sent from backend
      });
  }

  const context = {
    all_visits: allVisits,
    all_visits_of_current_user: userAllVisits,
    last_2weeks_visits_of_allusers: allUsersVisits,
    last_weeks_visits_of_current_user: currentUserVisists,
    storeVisits: storeVisitsHandler,
    storeUserVisits: storeUserVisitsHandler,
    storeAllVisits: storeAllVisitsHandler,
  };

  return (
    <VisitsContext.Provider value={context}>
      {props.children}
    </VisitsContext.Provider>
  );
}

export default VisitsContext;
