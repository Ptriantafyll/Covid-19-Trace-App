import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { UserContextProvider } from "./Store/CurrentUserContext";
import { PositionContextProvider } from "./Store/CurrentPositionContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <PositionContextProvider>
    <UserContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UserContextProvider>
  </PositionContextProvider>
);
