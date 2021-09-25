"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const SelectPlayer_module_css_1 = __importDefault(require("../styles/SelectPlayer.module.css"));
const SelectPlayer = ({ setPlayer }) => {
    return (<div className={SelectPlayer_module_css_1.default.container}>
      <h1>Select Player</h1>
      <div className={SelectPlayer_module_css_1.default.buttonsDiv}>
        <button className={SelectPlayer_module_css_1.default.Button} onClick={() => setPlayer(true)}>
          X
        </button>
        <button className={SelectPlayer_module_css_1.default.Button} onClick={() => setPlayer(false)}>
          O
        </button>
      </div>
    </div>);
};
exports.default = SelectPlayer;
