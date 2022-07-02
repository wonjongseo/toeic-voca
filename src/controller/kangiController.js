import Kangi from "../models/Kangi";
import xlsx from "xlsx";

let workbook = xlsx.readFile(__dirname + "/../../public/일본어책.xlsx");

export const getKangiAll = async (req, res, next) => {
    const {step} = req.query;

    let kangifilteredLevel;
    if (step == null) {
        kangifilteredLevel = await Kangi.find({});
    } else if (step <= 5) {
        kangifilteredLevel = await Kangi.find({}, null, {
            skip: (step - 1) * 10,
            limit: 10,
        });
    } else if (step <= 10) {
        kangifilteredLevel = await Kangi.find({}, null, {
            skip: (step - 5 - 1) * 20,
            limit: 20,
        });
    } else if (step <= 15) {
        kangifilteredLevel = await Kangi.find({}, null, {
            skip: (step - 10 - 1) * 30,
            limit: 30,
        });
    } else if (step <= 20) {
        kangifilteredLevel = await Kangi.find({}, null, {
            skip: (step - 15 - 1) * 40,
            limit: 40,
        });
    } else {
        return res.status(400).json("Plz Check level");
    }

    console.log(kangifilteredLevel.length);

    return res.json(kangifilteredLevel);
};

// JLPT
export const getKangisByLevel = async (req, res, next) => {
    const {n} = req.query;

    const {step} = req.query;

    let kangifilteredLevel;
    if (step == null) {
        kangifilteredLevel = await Kangi.find({level: n});
    } else if (step <= 5) {
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
    await Kangi.deleteMany({});
    let worksheet = workbook.Sheets["Sheet2"];

    for (let i = 2; i <= 400; i++) {
        let tmpLevel = Math.floor(Math.random() * 5) + 1;
        await Kangi.create({
            id: worksheet["A" + i].w,
            kangi: worksheet["B" + i].w,
            mean: worksheet["C" + i].w,
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
