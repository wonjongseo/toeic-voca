import express from "express";
import xlsx from "xlsx";
import japanRouter from "./routes/japanRouter";
import kangiRouter from "./routes/kangiRouter";
import paginate from "express-paginate";
import morgan from "morgan";

const app = express();

app.use(paginate.middleware(10, 50));
app.use(morgan("dev"));
let workbook = xlsx.readFile(__dirname + "/../public/일본어책.xlsx");
app.get("/", (req, res, next) => {
    for (let i = 0; i < 5; i++) {
        console.log(a);
    }
    res.end();
});
app.use("/japans", japanRouter);
app.use("/kangis", kangiRouter);

export default app;
