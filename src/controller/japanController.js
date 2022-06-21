import xlsx from "xlsx";
import Japan from "../models/Japan";

let workbook = xlsx.readFile(__dirname + "/../../public/일본어책.xlsx");

export const uploadJapans = async (req, res, next) => {
    let worksheet = workbook.Sheets["Sheet2"];

    for (let i = 731; i <= 809; i++) {
        await Japan.create({
            kangi: worksheet["A" + i].w,
            yomikata: worksheet["B" + i].w,
            mean: worksheet["C" + i].w,
            id: worksheet["D" + i].w,
        });
    }

    const janaps = await Japan.find({});
    return res.json(janaps);
};

export const getJapansByKangiId = async (req, res, next) => {
    const {id} = req.params;

    console.log(page);
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
