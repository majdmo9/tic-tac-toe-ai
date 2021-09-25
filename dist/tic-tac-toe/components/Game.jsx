"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const Board_1 = __importDefault(require("./Board"));
const axios_1 = __importDefault(require("axios"));
const CalculateWinner_1 = __importDefault(require("../helper/CalculateWinner"));
const SelectPlayer_1 = __importDefault(require("./SelectPlayer"));
const Game_module_css_1 = __importDefault(require("../styles/Game.module.css"));
const minimax_1 = __importDefault(require("../helper/minimax"));
const Winner_1 = __importDefault(require("./Winner"));
const URL = "http://localhost:5000/random";
const Game = () => {
    const [nextPlayer, setNextPlayer] = (0, react_1.useState)(true);
    const [selectPlayer, setSelectPlayer] = (0, react_1.useState)(null);
    const [history, setHistory] = (0, react_1.useState)(Array(9).fill(null));
    const [winner, setWinner] = (0, react_1.useState)(null);
    //* When history change
    (0, react_1.useEffect)(() => {
        setWinner((0, CalculateWinner_1.default)(history));
    }, [history]);
    //* When refreshing
    (0, react_1.useEffect)(() => {
        const getHistory = () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield axios_1.default.get(URL);
            setHistory(res.data);
        });
        getHistory();
    }, []);
    //* AI player move
    const computerTurn = (squares) => {
        let move = -1;
        let bestScore = -Infinity;
        for (let i = 0; i < squares.length; i++) {
            if (!squares[i]) {
                squares[i] = !nextPlayer ? "X" : "O";
                let score = (0, minimax_1.default)(squares, 0, false, nextPlayer);
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
    const handleClick = (i) => __awaiter(void 0, void 0, void 0, function* () {
        let squares = history.slice();
        if ((0, CalculateWinner_1.default)(squares)) {
            return;
        }
        squares[i] = nextPlayer ? "X" : "O";
        squares = computerTurn(squares);
        setHistory(squares);
        yield axios_1.default.post(URL, {
            history: squares,
        });
    });
    //* On clicking play again
    const newGame = () => __awaiter(void 0, void 0, void 0, function* () {
        const clearHistory = history.slice();
        clearHistory.fill(null);
        setHistory(clearHistory);
        setWinner(null);
        setSelectPlayer(null);
        yield axios_1.default.post(URL, {
            history: clearHistory,
        });
    });
    //* Choose player X or O
    const setPlayer = (xo) => {
        setSelectPlayer(xo);
        setNextPlayer(xo);
    };
    return (<div className={Game_module_css_1.default.container}>
      {winner !== null || history.find((el) => el === null) === undefined ? (<Winner_1.default winner={winner} onClose={newGame}/>) : history.every((el) => el === null) && selectPlayer === null ? (<SelectPlayer_1.default setPlayer={(xo) => setPlayer(xo)}/>) : (<Board_1.default onClick={(i) => handleClick(i)} squares={history}/>)}
    </div>);
};
exports.default = Game;
