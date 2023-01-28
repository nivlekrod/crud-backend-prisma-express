import express from "express";
import cors from "cors";
import { router } from "./routes";

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log("Acessou o middleware");
  res.header("Acess-Control-Allow", "*");
  next();
});

app.use(cors());

app.use(router);

app.listen(8080, () => console.log("Server listening on port 8080"));
