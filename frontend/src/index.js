import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { UserContextProvider } from "./Store/CurrentUserContext";
import { PositionContextProvider } from "./Store/CurrentPositionContext";
import { VisitModalContextProvider } from "./Store/VisitModalContext";
import { VisitsContextProvider } from "./Store/VisitsContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <PositionContextProvider>
    <UserContextProvider>
      <VisitModalContextProvider>
        <VisitsContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </VisitsContextProvider>
      </VisitModalContextProvider>
    </UserContextProvider>
  </PositionContextProvider>
);
