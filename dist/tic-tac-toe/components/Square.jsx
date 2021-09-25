"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Board_module_css_1 = __importDefault(require("../styles/Board.module.css"));
const Square = ({ onClick, value }) => {
    const fill = value ? `square ${value}` : `square`;
    return (<div className={Board_module_css_1.default.buttonDiv}>
      <button className={fill} onClick={onClick}>
        {value}
      </button>
      <Board_module_css_1.default jsx>{`
        .square {
          background: #192428;
          border: none;
          border-radius: 5px;
          font-size: 5rem;
          font-weight: 800;
          cursor: pointer;
          outline: none;
        }
        .X {
          color: #39ace7;
        }
        .O {
          color: #39ace7;
        }
      `}</Board_module_css_1.default>
    </div>);
};
exports.default = Square;
