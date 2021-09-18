import React, { FunctionComponent } from "react";
import style from "../styles/Board.module.css";
import Square from "./Square";
type SquareType = "X" | "O" | null;
interface Props {
  onClick: (i: number) => void;
  squares: SquareType[];
}
const Board: FunctionComponent<Props> = ({ onClick, squares }) => {
  return (
    <div className={style.board}>
      {squares.map((square, i) => (
        <Square key={i} value={square} onClick={() => onClick(i)} />
      ))}
    </div>
  );
};

export default Board;
