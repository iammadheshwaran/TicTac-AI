import React from "react";
import Square from "./Square";

const GameBoard = ({ board, handleClick }) => {
  
    

  return (
    <div className="grid  grid-cols-3 gap-2 w-[300px] mt-5 mb-5">
      {board.map((val, i) => (
        <Square key={i} value={val}
        onClick={() => handleClick(i)}/>
      ))}
    </div>
  );
};

export default GameBoard;
