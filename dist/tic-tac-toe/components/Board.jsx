"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Board_module_css_1 = __importDefault(require("../styles/Board.module.css"));
const Square_1 = __importDefault(require("./Square"));
const Board = ({ onClick, squares }) => {
    return (<div className={Board_module_css_1.default.board}>
      {squares.map((square, i) => (<Square_1.default key={i} value={square} onClick={() => onClick(i)}/>))}
    </div>);
};
exports.default = Board;
