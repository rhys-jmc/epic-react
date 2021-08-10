import React from "react";
import { STRAKS, PLAYERS } from "./constants";
import { getActiveMoves, getActivePlayer } from "./helpers";
import type { State, Action, Move, Player } from "./types";

const initialState: State = { activeIndex: -1, moves: [] };

const MovesState = React.createContext<
  [State, React.Dispatch<Action>] | undefined
>(undefined);

const movesReducer = (state = initialState, action: Action): State => {
  const activeMoves = getActiveMoves(state);
  const player = getActivePlayer(state);

  switch (action.type) {
    case "ADD_MOVE": {
      const moves: Move[] = [...activeMoves, { player, index: action.payload }];

      return { activeIndex: moves.length - 1, moves };
    }
    case "RESET_MOVES":
      return initialState;
    case "SET_ACTIVE_MOVE":
      return { ...state, activeIndex: action.payload };
  }
};

export const MovesProvider: React.FC = ({ children }) => {
  return (
    <MovesState.Provider value={React.useReducer(movesReducer, initialState)}>
      {children}
    </MovesState.Provider>
  );
};

type MovesStore = {
  addMove: (index: number) => void;
  getPlayer: (index: number) => Player | undefined;
  reset: undefined | (() => void);
  history: { isActive: boolean; setActive: () => void }[];
  turn: Player | undefined;
  winner: Player | undefined;
};

export const useMovesStore = (): MovesStore => {
  const context = React.useContext(MovesState);

  if (!context) throw new Error("useMovesStore not in MovesProvider");

  const [state, dispatch] = context;

  const activeMoves = getActiveMoves(state);

  const history = Array.from(Array(state.moves.length + 1)).map((_, i) => ({
    isActive: state.activeIndex === i - 1,
    setActive: () => {
      dispatch({ type: "SET_ACTIVE_MOVE", payload: i - 1 });
    },
  }));

  const addMove = (index: number) => {
    dispatch({ type: "ADD_MOVE", payload: index });
  };

  const getPlayer = (index: number): Player | undefined =>
    activeMoves.find((m: Move) => m.index === index)?.player;

  const reset = state.moves.length
    ? () => {
        dispatch({ type: "RESET_MOVES" });
      }
    : undefined;

  const getMoves = (player: Player): Move[] =>
    activeMoves.filter((m: Move) => m.player === player);

  const hasWon = (player: Player): boolean =>
    !!STRAKS.find((s) =>
      s.every((index) =>
        getMoves(player)
          .map((m) => m.index)
          .includes(index)
      )
    );

  const winner = PLAYERS.filter(hasWon)[0];
  const turn = activeMoves.length === 9 ? undefined : getActivePlayer(state);

  return { addMove, getPlayer, reset, history, turn, winner };
};
