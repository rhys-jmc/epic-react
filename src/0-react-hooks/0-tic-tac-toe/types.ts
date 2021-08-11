import type { PLAYERS } from "./constants";

export type Player = typeof PLAYERS[number];
export type Move = { readonly index: number; readonly player: Player };
export type AddMoveAction = {
  readonly type: "ADD_MOVE";
  readonly payload: number;
};
export type ResetMovesAction = { readonly type: "RESET_MOVES" };
export type SetActiveMoveAction = {
  readonly type: "SET_ACTIVE_MOVE";
  readonly payload: number;
};
export type Action = AddMoveAction | ResetMovesAction | SetActiveMoveAction;
export type State = {
  readonly activeIndex: number;
  readonly moves: readonly Move[];
};
