import express from "express";
import xlsx from "xlsx";

const app = express();

console.log(__dirname);
let workbook = xlsx.readFile(__dirname + "/../public/일본어책.xlsx");

app.get("/", (req, res, next) => {
    let worksheet = workbook.Sheets["Sheet1"];

    let datas = [];
    for (let i = 2; i <= 4; i++) {
        let obj = {
            japan: worksheet["A" + i].w,
            korea: worksheet["B" + i].w,
            undoc: worksheet["C" + i].w,
            hundoc: worksheet["D" + i].w,
        };

        datas.push(obj);
    }

    console.log(datas);

    return res.json(datas);
});

export default app;
