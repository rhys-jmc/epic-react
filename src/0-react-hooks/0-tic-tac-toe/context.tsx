import type { ReactNode } from "react";
import React from "react";
import { STRAKS, PLAYERS } from "./constants";
import { getActiveMoves, getActivePlayer } from "./helpers";
import type { State, Action, Move, Player } from "./types";

const initialState: State = { activeIndex: -1, moves: [] };

const MovesState = React.createContext<
  readonly [State, React.Dispatch<Action>] | undefined
>(undefined);

const movesReducer = (state = initialState, action: Action): State => {
  const activeMoves = getActiveMoves(state);
  const player = getActivePlayer(state);

  switch (action.type) {
    case "ADD_MOVE": {
      const moves: readonly Move[] = [
        ...activeMoves,
        { player, index: action.payload },
      ];

      return { activeIndex: moves.length - 1, moves };
    }
    case "RESET_MOVES":
      return initialState;
    case "SET_ACTIVE_MOVE":
      return { ...state, activeIndex: action.payload };
  }
};

export const MovesProvider = ({
  children,
}: {
  readonly children?: ReactNode;
}): JSX.Element => {
  return (
    <MovesState.Provider value={React.useReducer(movesReducer, initialState)}>
      {children}
    </MovesState.Provider>
  );
};

type MovesStore = {
  readonly addMove: (index: number) => unknown;
  readonly getPlayer: (index: number) => Player | undefined;
  readonly reset: (() => unknown) | undefined;
  readonly history: readonly {
    readonly isActive: boolean;
    readonly setActive: () => unknown;
  }[];
  readonly turn: Player | undefined;
  readonly winner: Player | undefined;
};

export const useMovesStore = (): MovesStore => {
  const context = React.useContext(MovesState);

  if (!context) throw new Error("useMovesStore not in MovesProvider");

  const [state, dispatch] = context;

  const activeMoves = getActiveMoves(state);

  const history = Array.from({ length: state.moves.length + 1 }).map(
    (_, index) => ({
      isActive: state.activeIndex === index - 1,
      setActive: () => {
        dispatch({ type: "SET_ACTIVE_MOVE", payload: index - 1 });
      },
    })
  );

  const addMove = (index: number): void => {
    dispatch({ type: "ADD_MOVE", payload: index });
  };

  const getPlayer = (index: number): Player | undefined =>
    activeMoves.find((m: Move) => m.index === index)?.player;

  const reset =
    state.moves.length > 0
      ? () => {
          dispatch({ type: "RESET_MOVES" });
        }
      : undefined;

  const getMoves = (player: Player): readonly Move[] =>
    activeMoves.filter((m: Move) => m.player === player);

  const hasWon = (player: Player): boolean =>
    STRAKS.some((s) =>
      s.every((index) =>
        getMoves(player)
          .map((m) => m.index)
          .includes(index)
      )
    );

  const winner = PLAYERS.find(hasWon);
  const turn = activeMoves.length === 9 ? undefined : getActivePlayer(state);

  return { addMove, getPlayer, reset, history, turn, winner };
};
