import express from "express";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import router from "./src/routes/idea";
const app = express();
app.use(bodyParser.json());
app.use(morgan("dev"));

app.use(
  cors({
    origin: [
      "http://localhost:5411",
      "http://localhost:5412",
      "http://localhost:5413",
      "http://localhost:5414",
      "http://localhost:4000",
      "http://localhost:4001",
      "http://localhost:8080",
    ],
  })
);

app.use("/idea", router);
export default app;
