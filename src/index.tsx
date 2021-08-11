import React from "react";
import { render } from "react-dom";

import { TicTacToe } from "./0-react-hooks/0-tic-tac-toe";
import { GreatQuestion } from "./gq";
import "./styles.css";

render(
  <React.StrictMode>
    <TicTacToe />
    <GreatQuestion />
  </React.StrictMode>,
  document.querySelector("#app")
);
