import { async } from "regenerator-runtime";
import { books, workbook } from "../excelData";
import RelatedWord from "../models/RelatedWord";

export const postRelatedWords = async (firstWord) => {
  await RelatedWord.deleteMany({ firstWord });
  let endIndex = 3;
  let book;

  switch (firstWord) {
    case "ga":
      book = books.Sheets["Sheet1"];
      endIndex = 1626;
      break;
    case "na":
      book = books.Sheets["Sheet2"];
      endIndex = 144;
      break;
    case "da":
      book = books.Sheets["Sheet3"];
      endIndex = 488;
      break;
    case "ra":
      book = books.Sheets["Sheet4"];
      endIndex = 547;
      break;
    default:
      return;
  }

  for (let i = 2; i <= endIndex; i++) {
    await RelatedWord.create({
      yomikata: book["H" + i].w,
      kangi: book["I" + i].w,
      mean: book["J" + i].w,
      id: book["K" + i].w,
      firstWord,
    });
  }
};

export const getReleatedWordsById = async (req, res, next) => {
  const { id } = req.query;

  console.log(id);
  const related = await RelatedWord.find({ id });

  return res.json(related);
};

export const getRelatedWordById = async (req, res, next) => {
  const { id } = req.params;

  const relateds = await RelatedWord.find({ id });

  return res.json(relateds);
};
