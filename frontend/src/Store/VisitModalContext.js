import { createContext, useState } from "react";
import axios from "axios";

const VisitModalContext = createContext({
  open: false,
  people: 0,
  openModal: (name_of_poi) => {},
  closeModal: () => {},
  enterVisit: (estimate, currentUserContext) => {},
});

export function VisitModalContextProvider(props) {
  const BaseURL = "http://localhost:3000/"; // api url
  const [modalIsOpen, setModalIsOpen] = useState();
  const [peopleEstimate, setPeopleEstimate] = useState();
  const [currentPoi, setCurrentPoi] = useState();
  const today = new Date();

  function openModalHandler(poi) {
    setCurrentPoi(poi);
    setModalIsOpen(true);
  }

  function closeModalHandler() {
    setModalIsOpen(false);
  }

  function enterVisitHandler(estimate, current_user) {
    setPeopleEstimate(estimate);

    console.log(current_user);
    console.log(currentPoi);
    console.log(today.getTime());
    console.log(estimate);
    axios
      .post(BaseURL + "visit", {
        user: current_user,
        POI: currentPoi,
        time: today.getTime(),
        peopleEstimate: estimate,
      })
      .then((response) => {
        console.log(response);
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
