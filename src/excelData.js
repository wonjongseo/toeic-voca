import express from "express";
import xlsx from "xlsx";

export const books = xlsx.readFile(__dirname + "/../public/toeic_voca.xlsx");
export const japanBooks = xlsx.readFile(__dirname + "/../public/n1.xlsx");
export const japan2316Books = xlsx.readFile(
  __dirname + "/../public/jlpt2316book.xlsx"
);

var id = 1;

export const execlToJsonGrammar = () => {
  console.log("gramar et");

  const sheet = japanBooks.Sheets["문법"];
  const datas = xlsx.utils.sheet_to_json(sheet);

  const resultData = [];

  for (let i = 0; i < datas.length; i++) {
    console.log(datas[i]["grammar"]);

    const examples = [];
    const grammar = datas[i]["grammar"];
    for (let j = 1; j < 12; j++) {
      if (datas[i]["exampleJapan" + j] != undefined) {
        var answer = "";
        if (datas[i]["exampleQuiz" + j] != undefined) {
          answer = datas[i]["exampleQuiz" + j];
        } else {
          answer = grammar;
        }
        const exmaple = {
          word: datas[i]["exampleJapan" + j],
          mean: datas[i]["exampleKorean" + j],
          answer: answer,
        };
        examples.push(exmaple);
      }
    }
    const newGrammarData = {
      id: i,
      grammar: grammar,
      means: datas[i]["means"],
      description: datas[i]["description"],
      connectionWays: datas[i]["connectionWays"],
      examples: examples,
    };
    console.log(newGrammarData);
    resultData.push(newGrammarData);
  }
  console.log(resultData);
  return resultData;
};

export const execlToJsonJLPT = (headTitle) => {
  console.log(headTitle);

  const sheet = japanBooks.Sheets[headTitle];
  const datas = xlsx.utils.sheet_to_json(sheet);

  const json = [];
  for (let i = 0; i < datas.length; i++) {
    const noDayVoca = {
      id: id,
      word: datas[i]["단어"],
      yomikata: datas[i]["히라가나"],
      mean: datas[i]["뜻"],
      headTitle: headTitle,
    };
    id++;
    json.push(noDayVoca);
  }

  console.log(json);

  return json;
};

export const execlToJson2316JlptVoca = (headTitle) => {
  const headTitlesheet = japan2316Books.Sheets[headTitle];
  const headTitleDatas = xlsx.utils.sheet_to_json(headTitlesheet);

  const headTitleRelatedsheet = japan2316Books.Sheets[headTitle + "-연관"];
  const headTitleRelatedDatas = xlsx.utils.sheet_to_json(headTitleRelatedsheet);

  const headTitleWords = [];
  const headTitleId = [];

  const headTitleRelatedId = [];
  const headTitleRelatedWords = [];

  for (let i = 0; i < headTitleRelatedDatas.length; i++) {
    headTitleRelatedId.push(headTitleRelatedDatas[i]["japanese_id"]);

    const yomikata = headTitleRelatedDatas[i]["yomikata"];
    const word = headTitleRelatedDatas[i]["word"];
    const mean = headTitleRelatedDatas[i]["mean"];
    if (yomikata == undefined && word == undefined && mean == undefined) {
      continue;
    }

    const relatedWord = {
      yomikata,
      word,
      mean,
    };

    headTitleRelatedWords.push(relatedWord);
  }

  console.log(headTitleRelatedId.length);

  for (let i = 0; i < headTitleDatas.length; i++) {
    const id = headTitleDatas[i]["id"];

    const japan = headTitleDatas[i]["japan"];
    const korea = headTitleDatas[i]["korea"];
    const undoc = headTitleDatas[i]["undoc"];
    const hundoc = headTitleDatas[i]["hundoc"];
    const jlpt_level = headTitleDatas[i]["jlpt_level"];
    if (
      japan == undefined &&
      korea == undefined &&
      undoc == undefined &&
      hundoc == undefined &&
      jlpt_level == undefined
    ) {
      continue;
    }

    headTitleId.push(id);

    const voca = {
      japan,
      korea,
      undoc,
      hundoc,
      headTitle,
      jlpt_level,
    };

    headTitleWords.push(voca);
  }
  console.log(headTitleId.length);

  for (let i = 0; i < headTitleId.length; i++) {
    const relatedVoca = [];
    for (let j = 0; j < headTitleRelatedId.length; j++) {
      if (headTitleId[i] == headTitleRelatedId[j]) {
        relatedVoca.push(headTitleRelatedWords[j]);
      }

      if (headTitleId[i] < headTitleRelatedId[j]) {
        break;
      }
    }
    headTitleWords[i] = { ...headTitleWords[i], relatedVoca };
  }

  console.log(headTitleWords);

  return headTitleWords;
};

export const execlToJsonToeic = (req, res) => {
  const sheet = books.Sheets["Sheet1"];
  const datas = xlsx.utils.sheet_to_json(sheet);
  //

  const json = {};
  for (let i = 0; i < datas.length; i++) {
    let day = datas[i]["Day"];

    const a = day.substring(3);
    console.log(a);

    const noDayVoca = {
      voca: datas[i]["단어"],
      mean: datas[i]["뜻"],
    };

    if (json[a] == undefined) {
      json[a] = [];
    }
    json[a].push(noDayVoca);
  }

  console.log(json);

  return json;
};
