"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const redis = require("redis");
const PORT = process.env.PORT || 5000;
const REDIS_PORT = process.env.REDIS_URL || 6379;
const cors = require("cors");
const client = redis.createClient(REDIS_PORT);
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(cors());
//? Getting the state from cache when refreshing the page
app.get("/:id", (req, res, next) => {
    let { id } = req.params;
    id = id.replace("favicon.ico", "");
    console.log(id);
    client.get(id, (err, data) => {
        if (err)
            throw err;
        else {
            res.send(data);
        }
    });
});
//? save the state in redis cache memory on every single move
app.post("/", (req, res, next) => {
    const { history, id } = req.body;
    console.log(req.body);
    client.set(id, JSON.stringify(history));
    res.send("success");
    next();
});
app.listen(PORT, () => {
    console.log(`App listening on port: ${PORT}`);
});
