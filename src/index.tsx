import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import { render } from "react-dom";
import { TicTacToe } from "./0-react-hooks/0-tic-tac-toe";

const App = () => <TicTacToe />;

render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.querySelector("#app")
);
