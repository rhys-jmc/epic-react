import React from "react";
import { useMovesStore } from "../context";

export const Square = ({ index }: { index: number }) => {
  const { addMove, getPlayer, winner } = useMovesStore();
  const player = getPlayer(index);

  return (
    <button
      className="w-12 h-12 text-lg"
      onClick={() => addMove(index)}
      disabled={!!player || !!winner}
    >
      {player ?? "-"}
    </button>
  );
};
