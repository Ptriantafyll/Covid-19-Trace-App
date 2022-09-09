import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { UserContextProvider } from "./Store/UserContext";
import { PositionContextProvider } from "./Store/CurrentPositionContext";
import { VisitModalContextProvider } from "./Store/VisitModalContext";
import { VisitsContextProvider } from "./Store/VisitsContext";
// import { CovidTestsContextProvider } from "./Store/CovidTestsContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <PositionContextProvider>
    <UserContextProvider>
      <VisitModalContextProvider>
        <VisitsContextProvider>
          {/* <CovidTestsContextProvider> */}
          <BrowserRouter>
            <App />
          </BrowserRouter>
          {/* </CovidTestsContextProvider> */}
        </VisitsContextProvider>
      </VisitModalContextProvider>
    </UserContextProvider>
  </PositionContextProvider>
);
