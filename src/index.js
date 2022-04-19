import React from "react";
import ReactDOM from "react-dom";
import TripettoBuilder from "./TripettoBuilder";

const RetoolConnectedComponent = Retool.connectReactComponent(TripettoBuilder);
document.body.setAttribute("style", "margin: 0;");
ReactDOM.render(
  <RetoolConnectedComponent />,
  document.body.appendChild(document.createElement("div"))
);
