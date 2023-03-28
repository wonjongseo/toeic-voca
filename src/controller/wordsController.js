import {
  execlToJson2316JlptVoca,
  execlToJsonGrammar,
  execlToJsonJlptVoca,
  execlToJsonToeciVoca,
} from "../excelData";

export const postJlptVoca = async (req, res) => {
  const vocas = execlToJsonJlptVoca();

  return res.json(vocas);
};

export const post2316JlptVoca = async (req, res) => {
  const { headTitle } = req.query;
  console.log(headTitle);
  const vocas = execlToJson2316JlptVoca(headTitle);

  return res.json(vocas);
};

export const postToeicVoca = async (req, res) => {
  const { headTitle } = req.query;

  const vocas = execlToJsonToeciVoca(headTitle);

  return res.json(vocas);
};

export const postJlptGrammar = async (req, res) => {
  const result = execlToJsonGrammar();

  return res.json(result);
};
