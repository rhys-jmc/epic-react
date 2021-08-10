import React from "react";
import { useMovesStore } from "../context";
import { Board } from "./board";

export const Game = (): JSX.Element => {
  const { reset, history, turn, winner } = useMovesStore();

  return (
    <div className="flex flex-col items-center">
      <p>
        {winner
          ? `Player ${winner} has won!`
          : turn
          ? `Player ${turn}, it's your turn!`
          : `It's a draw!`}
      </p>
      <Board />
      <div>
        {history.map((m, index) => (
          <button
            key={index}
            disabled={m.isActive}
            onClick={() => m.setActive()}
          >
            {index}
          </button>
        ))}
      </div>
      <div>
        <button disabled={!reset} onClick={() => reset && reset()}>
          {"Restart!"}
        </button>
      </div>
    </div>
  );
};
