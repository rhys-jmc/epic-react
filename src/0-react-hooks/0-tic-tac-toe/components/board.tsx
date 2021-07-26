import React from "react";
import { Square } from "./square";

export const Board = () => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", width: 48 * 3 }}>
      {Array.from(Array(9)).map((_, index) => (
        <Square key={index} {...{ index }} />
      ))}
    </div>
  );
};
