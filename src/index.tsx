import React from "react";
import { render } from "react-dom";

import { TicTacToe } from "./0-react-hooks/0-tic-tac-toe";
import { GreatQuestion } from "./gq";
import "./styles.css";

const App = () => <TicTacToe />;

render(
  <React.StrictMode>
    <App />
    <GreatQuestion />
  </React.StrictMode>,
  document.querySelector("#app")
);
