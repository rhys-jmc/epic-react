import { PLAYERS } from "./constants";

export type Player = typeof PLAYERS[number];
export type Move = { index: number; player: Player };
export type AddMoveAction = { type: "ADD_MOVE"; payload: number };
export type ResetMovesAction = { type: "RESET_MOVES" };
export type SetActiveMoveAction = { type: "SET_ACTIVE_MOVE"; payload: number };
export type Action = AddMoveAction | ResetMovesAction | SetActiveMoveAction;
export type State = { activeIndex: number; moves: Move[] };
