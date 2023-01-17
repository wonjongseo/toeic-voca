import express from "express";
import kangiRouter from "./routes/wordsRouter";
import morgan from "morgan";

const app = express();

app.use(morgan("dev"));

app.use("/", kangiRouter);

export default app;
