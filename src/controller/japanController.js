import xlsx from "xlsx";
import Japan from "../models/Japan";
import Kangi from "../models/Kangi";

let workbook = xlsx.readFile(__dirname + "/../../public/일본어책.xlsx");

export const uploadJapans = async (req, res, next) => {
    await Japan.deleteMany({});
    let worksheet = workbook.Sheets["Sheet1"];

    for (let i = 1; i <= 1569; i++) {
        const kangi = await Kangi.findOne({id: worksheet["D" + i].w});

        if (kangi != null) {
            await Japan.create({
                yomikata: worksheet["A" + i].w,
                kangi: worksheet["B" + i].w,
                mean: worksheet["C" + i].w,
                id: worksheet["D" + i].w,
                level: kangi.level,
            });
        } else {
            await Japan.create({
                yomikata: worksheet["A" + i].w,
                kangi: worksheet["B" + i].w,
                mean: worksheet["C" + i].w,
                id: worksheet["D" + i].w,
            });
        }
    }

    const janaps = await Japan.find({});
    return res.json(janaps);
};

export const getJapansByJlptLevel = async (req, res, next) => {
    const {n, step} = req.query;

    console.log(n, step);

    const jlptedJapan = await Japan.find({level: n}, null, {
        skip: (step - 1) * 10,
        limit: 10,
    });

    return res.json(jlptedJapan);
};

export const getJapansByKangiId = async (req, res, next) => {
    const {id} = req.params;

    console.log(id);
    const japans = await Japan.find({
        id,
    });
    console.log(japans);
    return res.json(japans);
};

export const deleteJapans = async (req, res, next) => {
    await Japan.deleteMany({});

    return res.send("Successfully deleted!");
};
