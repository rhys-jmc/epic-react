import type { Move, Player, State } from "./types";

export const getActiveMoves = (state: State): readonly Move[] =>
  state.moves.slice(0, state.activeIndex + 1);

export const getActivePlayer = (state: State): Player =>
  getActiveMoves(state).slice(-1)[0]?.player === "X" ? "O" : "X";
