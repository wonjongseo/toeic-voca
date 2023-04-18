import {
  execlToJson2316JlptVoca,
  execlToJsonGrammar,
  execlToJsonToeic,
  execlToJsonJLPT,
  execlTo2345JsonJLPT,
  execlToJsonGrammarN2N3,
} from "../excelData";

export const postToeicVoca = async (req, res) => {
  const vocas = execlToJsonToeic();

  return res.json(vocas);
};
function arrayShuffle(array) {
  for (let i = array.length - 1; 0 < i; i--) {
    let r = Math.floor(Math.random() * (i + 1));

    let tmp = array[i];
    array[i] = array[r];
    array[r] = tmp;
  }
  return array;
}

export const postN1AllJlptVoca = async (req, res) => {
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
    result.push(...execlToJsonJLPT(hiragas[i]));
  }
  arrayShuffle(result);
  const resultList = [];

  const stepCont = Math.floor(result.length / 210);
  const restStep = Math.floor(result.length % 210);
  var tmp = 0;
  for (; tmp < stepCont; tmp++) {
    resultList.push(result.slice(tmp * 210, tmp * 210 + 210));
  }
  if (restStep != 0) {
    console.log("tmp", tmp);

    console.log(
      "json.slice(tmp * 210 + 210, json.length)",
      result.slice(stepCont * 210 + 210)
    );

    resultList.push(result.slice((stepCont - 1) * 210 + 210));
  }

  console.log("stepCont", stepCont);
  console.log("restStep", restStep);
  // 210
  // 14   1470
  // console.log(json);
  for (var tt = 0; tt < resultList.length; tt++) {
    for (var bb = 0; bb < resultList[tt].length; bb++) {
      resultList[tt][bb] = {
        ...resultList[tt][bb],
        headTitle: "쳅터" + (tt + 1),
      };
    }
  }
  return res.json(resultList);
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

export const postN1JlptVoca = async (req, res) => {
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

export const postJlptGrammarN2N3 = async (req, res) => {
  const result = execlToJsonGrammarN2N3();

  return res.json(result);
};
