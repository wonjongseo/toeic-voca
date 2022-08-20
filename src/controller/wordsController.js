import Word from "../models/Word";
import { books, postWords, wordCntObj } from "../excelData";
import { postRelatedWords } from "./relatedWordsController";

export const getWordsByFirstword = async (req, res, next) => {
  const { firstWord } = req.query;

  const words = await Word.find({ firstWord });

  return res.json(words);
};

export const getWordsByLevel = async (req, res, next) => {
  const { n } = req.query;
  console.log(n);
  const words = await Word.find({ level: n });
  return res.json(words);
};

export const postExcel = async (req, res, next) => {
  const { firstWord } = req.query;

  await postWords(firstWord);
  await postRelatedWords(firstWord);

  return res.json("Success");
};

export const getFirstameCnt = async (req, res, next) => {
  const { firstWord } = req.query;
  const words = await Word.find({ firstWord });

  return res.json(words.length);
};
