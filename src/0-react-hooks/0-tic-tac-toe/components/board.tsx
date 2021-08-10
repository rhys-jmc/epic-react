import React from "react";
import { Square } from "./square";

export const Board = (): JSX.Element => {
  return (
    <div className="grid grid-cols-3">
      {Array.from({ length: 9 }).map((_, index) => (
        <Square key={index} {...{ index }} />
      ))}
    </div>
  );
};
