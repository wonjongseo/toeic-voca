import express from "express";
import xlsx from "xlsx";
import japanRouter from "./routes/japanRouter";
import kangiRouter from "./routes/kangiRouter";
import paginate from "express-paginate";
import morgan from "morgan";
import {test} from "./controller/kangiController";

const app = express();

app.use(paginate.middleware(10, 50));
app.use(morgan("dev"));

app.get("/", test);
app.use("/japans", japanRouter);
app.use("/kangis", kangiRouter);

export default app;
