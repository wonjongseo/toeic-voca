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
    for (let j = 1; j < 6; j++) {
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

export const execlToJsonToeciVoca = (headTitle) => {
  console.log(headTitle);

  const sheet = japanBooks.Sheets[headTitle];
  const datas = xlsx.utils.sheet_to_json(sheet);

  var fullHeadTitle = headTitle + "단";
  const json = [];
  for (let i = 0; i < datas.length; i++) {
    const noDayVoca = {
      id: id,
      word: datas[i]["단어"],
      yomikata: datas[i]["히라가나"],
      mean: datas[i]["뜻"],
      headTitle: fullHeadTitle,
    };
    id++;
    json.push(noDayVoca);
  }

  console.log(json);

  return json;
};

export const execlToJson2316JlptVoca = (headTitle) => {
  const sheet = japan2316Books.Sheets[headTitle];
  const datas = xlsx.utils.sheet_to_json(sheet);
  //

  const json = [];
  for (let i = 0; i < datas.length; i++) {
    const voca = {
      id: datas[i]["id"],
      Japan: datas[i]["Japan"],
      korea: datas[i]["korea"],
      undoc: datas[i]["undoc"],
      hundoc: datas[i]["hundoc"],
    };

    json.push(voca);
  }

  console.log(json);

  return json;
};

export const execlToJsonJlptVoca = (req, res) => {
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
