import React from "react";
import { useMovesStore } from "../context";

export const Square = ({ index }: { index: number }) => {
  const { addMove, getPlayer, winner } = useMovesStore();
  const player = getPlayer(index);

  return (
    <button
      className="square"
      style={{ height: 48, width: 48, fontSize: 24 }}
      onClick={() => addMove(index)}
      disabled={!!player || !!winner}
    >
      {player ?? "-"}
    </button>
  );
};
