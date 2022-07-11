import Kangi from "../models/Kangi";
import xlsx from "xlsx";
import {async} from "regenerator-runtime";

let workbook = xlsx.readFile(__dirname + "/../../public/일본어책.xlsx");

export const getKangiAll = async (req, res, next) => {
    const kangis = await Kangi.find({});

    return res.json(kangis);
};

export const getKangiByStep = async (req, res, next) => {
    const {step} = req.query;

    const kangifilteredLevel = await Kangi.find({}, null, {
        skip: step * 15,
        limit: 15,
    });

    console.log(kangifilteredLevel.length);

    return res.json(kangifilteredLevel);
};

export const getKangiAllByLevel = async (req, res, next) => {
    const {n} = req.query;

    const kangiAllfilteredLevel = await Kangi.find({level: n});

    console.log(kangiAllfilteredLevel.length);

    return res.json(kangiAllfilteredLevel);
};

// JLPT
export const getKangisByLevel = async (req, res, next) => {
    const {n} = req.query;

    const {step} = req.query;

    const kangifilteredLevel = await Kangi.find({level: n}, null, {
        skip: (step - 1) * 15,
        limit: 15,
    });

    console.log(kangifilteredLevel.length);

    return res.json(kangifilteredLevel);
};

export const uploadKangi = async (req, res, next) => {
    await Kangi.deleteMany({});
    let worksheet = workbook.Sheets["Sheet2"];
    //_x0008_
    for (let i = 2; i <= 400; i++) {
        let tmpLevel = Math.floor(Math.random() * 5) + 1;
        const tmp = worksheet["C" + i].w;
        const isDummy = tmp.includes("_x");
        console.log("isDummy :" + isDummy);

        await Kangi.create({
            id: worksheet["A" + i].w,
            kangi: worksheet["B" + i].w,

            mean: isDummy
                ? worksheet["C" + i].w.substring(7)
                : worksheet["C" + i].w,
            undoc: worksheet["D" + i].w,
            hundoc: worksheet["E" + i].w,
            // level: worksheet["F" + i].w,
            level: tmpLevel,
        });
    }

    const kangis = await Kangi.find({});

    return res.json(kangis);
};
export const deleteKangis = async (req, res, next) => {
    await Kangi.deleteMany({});
    return res.send("Successfully");
};
