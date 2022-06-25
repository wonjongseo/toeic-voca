import Kangi from "../models/Kangi";
import xlsx from "xlsx";

let workbook = xlsx.readFile(__dirname + "/../../public/일본어책.xlsx");

export const getKangiAll = async (req, res, next) => {
    const {step} = req.query;
    let kangis;
    if (step == null) {
        kangis = await Kangi.find();
    } else {
        if (step >= 1 && step <= 5) {
            kangis = await Kangi.find(null, null, {
                skip: (step - 1) * 10,
                limit: 10,
            });
        } else if (step >= 6 && step <= 10) {
            kangis = await Kangi.find(null, null, {
                skip: (step - 1 - 5) * 20,
                limit: 20,
            });
        }
    }

    return res.json(kangis);
};

// JLPT
export const getKangisByLevel = async (req, res, next) => {
    const {n} = req.query;

    const {step} = req.query;

    let kangifilteredLevel;

    if (step <= 5) {
        kangifilteredLevel = await Kangi.find({level: n}, null, {
            skip: (step - 1) * 10,
            limit: 10,
        });
    } else if (step <= 10) {
        kangifilteredLevel = await Kangi.find({level: n}, null, {
            skip: (step - 5 - 1) * 20,
            limit: 20,
        });
    } else if (step <= 15) {
        kangifilteredLevel = await Kangi.find({level: n}, null, {
            skip: (step - 10 - 1) * 30,
            limit: 30,
        });
    } else if (step <= 20) {
        kangifilteredLevel = await Kangi.find({level: n}, null, {
            skip: (step - 15 - 1) * 40,
            limit: 40,
        });
    } else {
        return res.status(400).json("Plz Check level");
    }

    console.log(kangifilteredLevel.length);

    return res.json(kangifilteredLevel);
};

export const uploadKangi = async (req, res, next) => {
    let worksheet = workbook.Sheets["Sheet1"];

    for (let i = 180; i <= 208; i++) {
        await Kangi.create({
            id: worksheet["A" + i].w,
            kangi: worksheet["B" + i].w,
            mean: worksheet["C" + i].w,
            undoc: worksheet["D" + i].w,
            hundoc: worksheet["E" + i].w,
            level: worksheet["F" + i].w,
        });
    }

    const kangis = await Kangi.find({});

    return res.json(kangis);
};
export const deleteKangis = async (req, res, next) => {
    await Kangi.deleteMany({});
    return res.send("Successfully");
};
