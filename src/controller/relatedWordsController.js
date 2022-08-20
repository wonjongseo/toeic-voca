import { books, wordCntObj, workbook } from "../excelData";
import RelatedWord from "../models/RelatedWord";

export const getReleatedWordsById = async (req, res, next) => {
  const { id } = req.query;

  const related = await RelatedWord.find({ id });

  return res.json(related);
};

export const getRelatedWordById = async (req, res, next) => {
  const { id } = req.params;

  const relateds = await RelatedWord.find({ id });

  return res.json(relateds);
};
