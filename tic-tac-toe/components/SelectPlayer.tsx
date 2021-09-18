import React, { FunctionComponent } from "react";
import style from "../styles/SelectPlayer.module.css";
interface Props {
  setPlayer: (xo: boolean) => void;
}
const SelectPlayer: FunctionComponent<Props> = ({ setPlayer }) => {
  return (
    <div className={style.container}>
      <h1>Select Player</h1>
      <div className={style.buttonsDiv}>
        <button className={style.Button} onClick={() => setPlayer(true)}>
          X
        </button>
        <button className={style.Button} onClick={() => setPlayer(false)}>
          O
        </button>
      </div>
    </div>
  );
};

export default SelectPlayer;
