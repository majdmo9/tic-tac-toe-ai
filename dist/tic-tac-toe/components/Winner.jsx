"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Winner_module_css_1 = __importDefault(require("../styles/Winner.module.css"));
const Winner = ({ winner, onClose }) => {
    return (<div className={Winner_module_css_1.default.container}>
      {winner === null ? (<h1>TIE</h1>) : (<h2>
          The winner is {"->"}
          {winner}
        </h2>)}
      <button className={Winner_module_css_1.default.newGame} onClick={onClose}>
        Play Again
      </button>
    </div>);
};
exports.default = Winner;
