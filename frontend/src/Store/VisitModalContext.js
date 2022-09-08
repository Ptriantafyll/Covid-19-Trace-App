import { createContext, useState } from "react";
import axios from "axios";

const VisitModalContext = createContext({
  open: false,
  people: 0,
  openModal: (name_of_poi) => {},
  closeModal: () => {},
  enterVisit: (estimate, currentUserContext, covid_tests) => {},
});

export function VisitModalContextProvider(props) {
  const BaseURL = "http://localhost:8000/"; // api url
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

  function enterVisitHandler(estimate, current_user, covid_tests) {
    setPeopleEstimate(estimate);
    var isPositive = false;

    for (const test in covid_tests) {
      const diff = Math.abs(
        today.getTime() - new Date(covid_tests[test].date).getTime()
      );

      if (covid_tests[test].result && diff < 604800000) {
        console.log("im here");
        isPositive = true;
      }
    }
    // console.log(current_user);
    // console.log(currentPoi);
    // console.log(today.getTime());
    // console.log(estimate);
    // console.log(isCovidCase);

    axios
      .post(BaseURL + "visit", {
        user: current_user,
        POI: currentPoi,
        time: today.getTime(),
        peopleEstimate: estimate,
        covid_case: isPositive,
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
