import React, { FunctionComponent, useState, useEffect } from "react";
import Board from "./Board";
import axios from "axios";
import CalculateWinner from "../helper/CalculateWinner";
import SelectPlayer from "./SelectPlayer";
import style from "../styles/Game.module.css";
import minimax from "../helper/minimax";
import Winner from "./Winner";

const URL = "http://localhost:5000/random";
type SquareType = "X" | "O" | null;
const Game: FunctionComponent = () => {
  const [nextPlayer, setNextPlayer] = useState<boolean>(true);
  const [selectPlayer, setSelectPlayer] = useState<boolean | null>(null);
  const [history, setHistory] = useState<SquareType[]>(Array(9).fill(null));
  const [winner, setWinner] = useState<SquareType>(null);
  //* When history change
  useEffect(() => {
    setWinner(CalculateWinner(history));
  }, [history]);
  //* When refreshing
  useEffect(() => {
    const getHistory = async () => {
      const res = await axios.get(URL);
      setHistory(res.data);
    };
    getHistory();
  }, []);
  //* AI player move
  const computerTurn = (squares: SquareType[]): SquareType[] => {
    let bestScore = -Infinity;
    let move = -1;
    for (let i = 0; i < squares.length; i++) {
      if (!squares[i]) {
        squares[i] = nextPlayer ? "X" : "O";
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

    squares[i] = nextPlayer ? "X" : "O";
    squares = computerTurn(squares);
    setHistory(squares);
    await axios.post(URL, {
      history: squares,
    });
  };
  //* On clicking play again
  const newGame = async () => {
    const clearHistory = history.slice();
    clearHistory.fill(null);
    setHistory(clearHistory);
    setWinner(null);
    setSelectPlayer(null);
    await axios.post(URL, {
      history: clearHistory,
    });
  };
  //* Choose player X or O
  const setPlayer = (xo: boolean) => {
    setSelectPlayer(xo);
    setNextPlayer(xo);
  };
  return (
    <div className={style.container}>
      {selectPlayer === null && !history.find((el) => el === null) ? (
        <SelectPlayer setPlayer={(xo) => setPlayer(xo)} />
      ) : winner !== null || history.find((el) => el === null) === undefined ? (
        <Winner winner={winner} onClose={newGame} />
      ) : (
        <Board onClick={(i: number) => handleClick(i)} squares={history} />
      )}
    </div>
  );
};

export default Game;
