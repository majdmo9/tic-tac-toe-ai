import React, { FunctionComponent } from "react";
import style from "../styles/Winner.module.css";

type SquareType = "X" | "O" | null;
interface Props {
  winner: SquareType;
  onClose: () => void;
}
const Winner: FunctionComponent<Props> = ({ winner, onClose }) => {
  return (
    <div className={style.container}>
      {winner === null ? (
        <h1>TIE</h1>
      ) : (
        <h2>
          The winner is {"->"}
          {winner}
        </h2>
      )}
      <button className={style.newGame} onClick={onClose}>
        Play Again
      </button>
    </div>
  );
};

export default Winner;
