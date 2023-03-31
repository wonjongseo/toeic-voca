import {
  execlToJson2316JlptVoca,
  execlToJsonGrammar,
  execlToJsonToeic,
  execlToJsonJLPT,
} from "../excelData";

export const postToeicVoca = async (req, res) => {
  const vocas = execlToJsonToeic();

  return res.json(vocas);
};

export const postAllJlptVoca = async (req, res) => {
  const hiragas = ["あ", "か", "さ", "た", "な", "は", "ま", "や", "ら"];

  //   "い형용사",
  //   "な형용사",
  //   "부사",
  const result = [];
  for (let i = 0; i < hiragas.length; i++) {
    result.push(execlToJsonJLPT(hiragas[i]));
  }

  return res.json(result);
};

export const post2316JlptVoca = async (req, res) => {
  const { headTitle } = req.query;
  console.log(headTitle);
  const vocas = execlToJson2316JlptVoca(headTitle);

  return res.json(vocas);
};

export const postJlptVoca = async (req, res) => {
  const { headTitle } = req.query;

  const vocas = execlToJsonJLPT(headTitle);

  return res.json(vocas);
};

export const postJlptGrammar = async (req, res) => {
  const result = execlToJsonGrammar();

  return res.json(result);
};
