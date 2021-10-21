import React, { FunctionComponent } from "react";
import style from "../styles/Board.module.css";
type SquareType = "X" | "O" | null;
interface Props {
  onClick: () => void;
  value: SquareType;
}
const Square: FunctionComponent<Props> = ({ onClick, value }) => {
  const fill = value ? `square ${value}` : `square`;
  return (
    <div className={style.buttonDiv}>
      <button className={fill} onClick={onClick}>
        {value}
      </button>
      <style jsx>{`
        .square {
          background: #192428;
          border: none;
          border-radius: 5px;
          font-size: 10vw;
          font-weight: 800;
          cursor: pointer;
          outline: none;
          display: flex;
          align-items: center;
          justify-content: space-around;
        }
        .X {
          color: #39ace7;
        }
        .O {
          color: #39ace7;
        }
      `}</style>
    </div>
  );
};

export default Square;
