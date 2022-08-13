import express from "express";
import japanRouter from "./routes/relatedWordsRouter";
import kangiRouter from "./routes/wordsRouter";
import morgan from "morgan";

const app = express();

// app.use(paginate.middleware(10, 50));
app.use(morgan("dev"));

app.use("/related", japanRouter);
app.use("/words", kangiRouter);

export default app;
