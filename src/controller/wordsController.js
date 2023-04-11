import {
  execlToJson2316JlptVoca,
  execlToJsonGrammar,
  execlToJsonToeic,
  execlToJsonJLPT,
  execlTo2345JsonJLPT,
} from "../excelData";

export const postToeicVoca = async (req, res) => {
  const vocas = execlToJsonToeic();

  return res.json(vocas);
};

export const postAllJlptVoca = async (req, res) => {
  const hiragas = [
    "あ단",
    "か단",
    "さ단",
    "た단",
    "な단",
    "は단",
    "ま단",
    "や단",
    "ら단",
    "형용사",
    "부사",
  ];

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
export const postAll2316JlptVoca = async (req, res) => {
  console.log("postAll2316JlptVoca");
  const hanguls = [
    "가",
    "나",
    "다",
    "라",
    "마",
    "바",
    "사",
    "아",
    "자",
    "차",
    "카",
    "타",
    "파",
    "하",
  ];
  const result = [];

  for (let i = 0; i < hanguls.length; i++) {
    result.push(execlToJson2316JlptVoca(hanguls[i]));
  }

  return res.json(result);
};

export const postJlptVoca = async (req, res) => {
  const { headTitle } = req.query;

  const vocas = execlToJsonJLPT(headTitle);

  return res.json(vocas);
};

export const postJlptN2345Voca = async (req, res) => {
  const { level } = req.query;

  const vocas = execlTo2345JsonJLPT(level);

  return res.json(vocas);
};

export const postJlptGrammar = async (req, res) => {
  const result = execlToJsonGrammar();

  return res.json(result);
};
