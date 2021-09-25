"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CalculateWinner_1 = __importDefault(require("./CalculateWinner"));
const minimax = (squares, depth, isMaximizing, nextPlayer) => {
    const scores = {
        X: nextPlayer ? -1 : 1,
        O: nextPlayer ? 1 : -1,
        tie: 0,
    };
    let result = (0, CalculateWinner_1.default)(squares);
    if (result)
        return scores[result];
    if (squares.every((el) => el !== null))
        return scores["tie"];
    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < squares.length; i++) {
            if (squares[i] === null) {
                squares[i] = !nextPlayer ? "X" : "O";
                let score = minimax(squares, depth + 1, false, nextPlayer);
                squares[i] = null;
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    }
    else {
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
exports.default = minimax;
