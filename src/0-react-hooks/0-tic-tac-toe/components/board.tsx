import React from "react";
import { Square } from "./square";

export const Board = () => {
  return (
    <div className="grid grid-cols-3">
      {Array.from(Array(9)).map((_, index) => (
        <Square key={index} {...{ index }} />
      ))}
    </div>
  );
};
