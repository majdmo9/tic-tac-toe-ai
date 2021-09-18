import express, {
    Application,
    Request,
    Response,
    NextFunction,
    ErrorRequestHandler,
  } from "express";
  const redis = require("redis");
  const PORT = process.env.PORT || 5000;
  const cors = require("cors");
  
  const client = redis.createClient();
  const app: Application = express();
  
  app.use(express.json());
  app.use(cors());
  
  app.use(function (req: Request, res: Response, next: NextFunction) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Methods", "DELETE, PUT, GET, POST");
    next();
  });
  type SquareType = "X" | "O" | null;
  //? Getting the state from cache when refreshing the page
  app.get("/:id", (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    client.get(id, (err: ErrorRequestHandler, data: SquareType[]) => {
      if (err) throw err;
      else {
        res.send(data);
      }
    });
  });
  //? save the state in redis cache memory on every single move 
  app.post("/:id", (req: Request, res: Response, next: NextFunction) => {
    const { history } = req.body;
    const { id } = req.params;
    console.log(req.body);
    client.set(id, JSON.stringify(history));
    res.send("success");
    next();
  });
  
  app.listen(PORT, () => {
    console.log(`App listening on port: ${PORT}`);
  });
  