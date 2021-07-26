import { State } from "./types";

export const getActiveMoves = (state: State) =>
  state.moves.slice(0, state.activeIndex + 1);

export const getActivePlayer = (state: State) =>
  getActiveMoves(state).slice(-1)[0]?.player === "X" ? "O" : "X";
