import { createContext, useContext, useState } from "react";
import axios from "axios";
import UserContext from "./UserContext";
import VisitsContext from "./VisitsContext";

const VisitModalContext = createContext({
  open: false,
  people: 0,
  openModal: (name_of_poi, id_of_poi) => {},
  closeModal: () => {},
  enterVisit: (estimate, currentUserContext, covid_tests) => {},
});

export function VisitModalContextProvider(props) {
  const BaseURL = "http://localhost:8000/"; // api url
  const [modalIsOpen, setModalIsOpen] = useState();
  const [peopleEstimate, setPeopleEstimate] = useState();
  const [currentPoi, setCurrentPoi] = useState();
  const [currentPoi_id, setCurrentPoi_id] = useState();
  const today = new Date();
  const user_context = useContext(UserContext);
  const visits_context = useContext(VisitsContext);

  function openModalHandler(poiname, poi_id) {
    setCurrentPoi(poiname);
    setCurrentPoi_id(poi_id);
    setModalIsOpen(true);
  }

  function closeModalHandler() {
    setModalIsOpen(false);
  }

  function enterVisitHandler(estimate, current_user, covid_tests) {
    setPeopleEstimate(estimate);

    axios
      .post(BaseURL + "visit/" + user_context.id, {
        user: current_user,
        POI: currentPoi,
        poi_id: currentPoi_id,
        time: today.getTime(),
        peopleEstimate: estimate,
      })
      .then((response) => {
        visits_context.storeUserVisits();
      })
      .catch((error) => {
        console.log(error.response);
      });

    setModalIsOpen(false);
  }

  const context = {
    open: modalIsOpen,
    people: peopleEstimate,
    openModal: openModalHandler,
    closeModal: closeModalHandler,
    enterVisit: enterVisitHandler,
  };

  return (
    <VisitModalContext.Provider value={context}>
      {props.children}
    </VisitModalContext.Provider>
  );
}

export default VisitModalContext;
