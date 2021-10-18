import React, {
  FunctionComponent,
  useState,
  useEffect,
  useContext,
} from "react";
import Board from "./Board";
import axios from "axios";
import CalculateWinner from "../helper/CalculateWinner";
import SelectPlayer from "./SelectPlayer";
import style from "../styles/Game.module.css";
import minimax from "../helper/minimax";
import AuthContext from "../helper/authContext";
import Winner from "./Winner";
import { v4 as uuidv4 } from "uuid";

type SquareType = "X" | "O" | null;
const Game: FunctionComponent = () => {
  const [nextPlayer, setNextPlayer] = useState<boolean>(true);
  const [selectPlayer, setSelectPlayer] = useState<boolean | null>(null);
  const [history, setHistory] = useState<SquareType[]>(Array(9).fill(null));
  const [winner, setWinner] = useState<SquareType>(null);
  const val = useContext(AuthContext);
  const [uuid, setUuid] = useState<string | null>("");

  const URL: string = "https://tic-tac-toe-ai1.herokuapp.com/";

  //* When history change
  useEffect(() => {
    setWinner(CalculateWinner(history));
  }, [history]);

  const getHistory = async () => {
    //! Generate id
    const id: string | null = localStorage.getItem("uuid");
    if (id) {
      setUuid(id);
      console.log(URL + id);
      const res = await axios.get(URL + id);
      res.data ? setHistory(res.data) : setHistory(history);
      console.log(history);
    } else {
      localStorage.setItem("uuid", uuidv4());
      setUuid(localStorage.getItem("uuid"));
    }
  };

  //* When refreshing
  useEffect(() => {
    getHistory();
  }, []);
  //* AI player move
  const computerTurn = (squares: SquareType[]): SquareType[] => {
    let move = -1;
    let bestScore = -Infinity;
    for (let i = 0; i < squares.length; i++) {
      if (!squares[i]) {
        squares[i] = !nextPlayer ? "X" : "O";
        let score = minimax(squares, 0, false, nextPlayer);
        squares[i] = null;
        if (score > bestScore) {
          bestScore = score;
          move = i;
        }
      }
    }

    if (move !== -1) {
      squares[move] = !nextPlayer ? "X" : "O";
    }
    return squares;
  };
  const handleClick = async (i: number) => {
    let squares = history.slice();
    if (CalculateWinner(squares)) {
      return;
    }
    console.log(uuid);
    squares[i] = nextPlayer ? "X" : "O";
    squares = computerTurn(squares);
    setHistory(squares);
    await axios.post(URL + uuid, {
      history: squares,
      id: uuid,
    });
  };
  //* On clicking play again
  const newGame = async () => {
    let clearHistory = history.slice();
    clearHistory = [null, null, null, null, null, null, null, null, null];
    setHistory(clearHistory);
    setWinner(null);
    setSelectPlayer(null);
    console.log(clearHistory);

    await axios.post(URL + uuid, {
      history: clearHistory,
      id: uuid,
    });
  };
  //* Choose player X or O
  const setPlayer = (xo: boolean) => {
    setSelectPlayer(xo);
    setNextPlayer(xo);
  };

  return (
    <div className={style.container}>
      {winner !== null || history?.find((el) => el === null) === undefined ? (
        <Winner winner={winner} onClose={newGame} />
      ) : history?.every((el) => el === null) && selectPlayer === null ? (
        <SelectPlayer setPlayer={(xo) => setPlayer(xo)} />
      ) : (
        <Board onClick={(i: number) => handleClick(i)} squares={history} />
      )}
    </div>
  );
};

export default Game;
