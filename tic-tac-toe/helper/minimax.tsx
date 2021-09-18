import calculateWinner from "./CalculateWinner";
type SquareType = "X" | "O" | null;
const scores = {
  X: 10,
  O: -10,
  tie: 0,
};

const minimax = (
  squares: SquareType[],
  depth: number,
  isMaximizing: boolean,
  nextPlayer: boolean
): number => {
  let result = calculateWinner(squares);
  if (result) return scores[result];
  if (!squares.find((el) => el === null)) return scores["tie"];
  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < squares.length; i++) {
      if (!squares[i]) {
        squares[i] = !nextPlayer ? "X" : "O";
        let score = minimax(squares, depth + 1, false, nextPlayer);
        squares[i] = null;
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < squares.length; i++) {
      if (!squares[i]) {
        squares[i] = nextPlayer ? "X" : "O";
        let score = minimax(squares, depth + 1, true, nextPlayer);
        squares[i] = null;
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
};
export default minimax;
