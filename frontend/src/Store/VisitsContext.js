import axios from "axios";
import { createContext, useContext, useState } from "react";
import UserContext from "./CurrentUserContext";

const VisitsContext = createContext({
  last_2weeks_visits_of_allusers: [],
  last_weeks_visits_of_current_user: [],
  storeVisits: () => {},
});

export function VisitsContextProvider(props) {
  const BaseURL = "http://localhost:3000/"; // api url
  const [allUsersVisits, setAllUsersVisits] = useState();
  const [currentUserVisists, setCurrentUSerVisits] = useState();
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

  const context = {
    last_2weeks_visits_of_allusers: allUsersVisits,
    last_weeks_visits_of_current_user: currentUserVisists,
    storeVisits: storeVisitsHandler,
  };

  return (
    <VisitsContext.Provider value={context}>
      {props.children}
    </VisitsContext.Provider>
  );
}

export default VisitsContext;
