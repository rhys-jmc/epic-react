import "./style.css";
import React from "react";
import { Game } from "./components/game";
import { MovesProvider } from "./context";

export const TicTacToe = () => (
  <MovesProvider>
    <Game />
  </MovesProvider>
);
