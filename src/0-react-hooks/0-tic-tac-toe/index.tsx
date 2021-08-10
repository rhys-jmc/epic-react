import React from "react";
import { Game } from "./components/game";
import { MovesProvider } from "./context";

export const TicTacToe = (): JSX.Element => (
  <MovesProvider>
    <Game />
  </MovesProvider>
);
