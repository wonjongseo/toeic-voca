import express from "express";
import xlsx from "xlsx";

export const books = xlsx.readFile(__dirname + "/../public/toeic_voca.xlsx");
export const japanN1Books = xlsx.readFile(__dirname + "/../public/n1.xlsx");
export const japanN1GrammarBooks = xlsx.readFile(
  __dirname + "/../public/n-1문법.xlsx"
);
export const japanN2N3Books = xlsx.readFile(
  __dirname + "/../public/문법통합본.xlsx"
);
export const japanN2345Books = xlsx.readFile(
  __dirname + "/../public/n2345.xlsx"
);
export const japan2316Books = xlsx.readFile(
  __dirname + "/../public/jlpt2316book.xlsx"
);

var id = 1;

export const execlToJsonGrammar = () => {
  console.log("gramar et");

  const grammarSheet = japanN1GrammarBooks.Sheets["문법"];
  const grammaDatas = xlsx.utils.sheet_to_json(grammarSheet);

  const resultData = [];
  let i = 0;
  for (; i < grammaDatas.length; i++) {
    const examples = [];
    const grammar = grammaDatas[i]["grammar"];
    for (let j = 1; j < 14; j++) {
      if (grammaDatas[i]["exampleJapan" + j] != undefined) {
        var answer = "";
        if (grammaDatas[i]["exampleQuiz" + j] != undefined) {
          answer = grammaDatas[i]["exampleQuiz" + j];
        } else {
          answer = grammar;
        }
        const exmaple = {
          word: grammaDatas[i]["exampleJapan" + j],
          mean: grammaDatas[i]["exampleKorean" + j],
          answer: answer,
        };
        examples.push(exmaple);
      }
    }
    const newGrammarData = {
      id: i,
      grammar: grammar,
      means: grammaDatas[i]["means"],
      description: grammaDatas[i]["description"],
      connectionWays: grammaDatas[i]["connectionWays"],
      examples: examples,
    };
    resultData.push(newGrammarData);
  }

  // 문법2 , 문법2-예제

  const grammar2Sheet = japanN1GrammarBooks.Sheets["문법2"];
  const grammar2ExamSheet = japanN1GrammarBooks.Sheets["문법2-예시"];

  const grammar2Datas = xlsx.utils.sheet_to_json(grammar2Sheet);
  const grammar2ExamDatas = xlsx.utils.sheet_to_json(grammar2ExamSheet);

  const grammar2List = [];

  for (let j = 0; j < grammar2Datas.length; j++) {
    const tempGrammar2 = {
      id: grammar2ExamDatas[j]["id"],
      grammar: grammar2Datas[j]["grammar"],
      means: grammar2Datas[j]["means"],
      description: grammar2Datas[j]["description"],
      connectionWays: grammar2Datas[j]["connectionWays"],
      examples: [],
    };
    i++;
    grammar2List.push(tempGrammar2);
  }

  for (let j = 0; j < grammar2ExamDatas.length; j++) {
    const id = grammar2ExamDatas[j]["id"];
    const grammar = grammar2List[id - 1].grammar;
    let exampleQuiz;

    if (grammar2ExamDatas[j]["exampleQuiz"] != undefined) {
      exampleQuiz = grammar2ExamDatas[j]["exampleQuiz"];
    } else {
      exampleQuiz = grammar;
    }
    const tempGrammar2Exam = {
      answer: exampleQuiz,
      word: grammar2ExamDatas[j]["exampleJapan"],
      mean: grammar2ExamDatas[j]["exampleKorean"],
    };
    console.log(tempGrammar2Exam);
    grammar2List[id - 1].examples.push(tempGrammar2Exam);
  }

  console.log(grammar2List);

  resultData.push(...grammar2List);

  return resultData;
};

export const execlToJsonGrammarN2N3 = () => {
  console.log("execlToJsonGrammarN2N3 et");

  // 문법2 , 문법2-예제
  const grammarN3Sheet = japanN2N3Books.Sheets["n3문법"];
  const grammarN3ExamSheet = japanN2N3Books.Sheets["n3문법-예제"];

  const grammarN3Datas = xlsx.utils.sheet_to_json(grammarN3Sheet);
  const grammarN3ExamDatas = xlsx.utils.sheet_to_json(grammarN3ExamSheet);

  const grammarN3List = [];

  for (let j = 0; j < grammarN3Datas.length; j++) {
    const tempGrammar2 = {
      id: grammarN3Datas[j]["id"],
      grammar: grammarN3Datas[j]["grammar"],
      means: grammarN3Datas[j]["means"],
      description: grammarN3Datas[j]["description"],
      connectionWays: grammarN3Datas[j]["connectionWays"],
      examples: [],
    };
    console.log("tempGrammar2", tempGrammar2);

    grammarN3List.push(tempGrammar2);
  }

  for (let j = 0; j < grammarN3ExamDatas.length; j++) {
    const id = grammarN3ExamDatas[j]["id"];

    let idIndex = undefined;
    for (let k = 0; k < grammarN3List.length; k++) {
      if (grammarN3List[k]["id"] == id) {
        idIndex = k;
        break;
      }
    }
    if (idIndex == undefined) {
      continue;
    }

    const grammar = grammarN3List[idIndex].grammar;
    let exampleQuiz;

    if (grammarN3ExamDatas[j]["exampleQuiz"] != undefined) {
      exampleQuiz = grammarN3ExamDatas[j]["exampleQuiz"];
    } else {
      exampleQuiz = grammar;
    }
    const tempGrammar2Exam = {
      answer: exampleQuiz,
      word: grammarN3ExamDatas[j]["exampleJapan"],
      mean: grammarN3ExamDatas[j]["exampleKorean"],
    };
    grammarN3List[idIndex].examples.push(tempGrammar2Exam);
  }

  console.log(grammarN3List);

  return grammarN3List;
};
export const execlTo2345JsonJLPT = (level) => {
  console.log(level);

  const jlpt_n = japanN2345Books.Sheets[level];
  const datas = xlsx.utils.sheet_to_json(jlpt_n);
  console.log("datas.length", datas.length);
  const json = [];

  for (let i = 0; i < datas.length; i++) {
    var word = datas[i]["단어"];
    var yomikata = datas[i]["히라가나"];
    if (yomikata.includes("\n")) {
      yomikata = yomikata.split("\n")[0];
    }
    yomikata =  yomikata.trim();
    if(yomikata[0] !='-' && yomikata[yomikata.length -1] != '-' && yomikata.includes('-')) {
      console.log(yomikata);
      yomikata= yomikata.replaceAll('-','');
      console.log(yomikata);
    }

    if (word == undefined) {
      word = yomikata;
    } else {
      if (word.includes("\n")) {
        word = word.split("\n")[0];
      }
    }
    var mean = datas[i]["뜻"];
    
    // console.log(mean);
    if(mean ==undefined) continue;
    if (mean.includes(";")) {
      mean=  mean.replaceAll(';', ', ');
    }
    word = word.trim();
    
    mean = mean.trim();
    const noDayVoca = {
      id: i,
      word,
      yomikata,
      mean,
    };
    id++;
    json.push(noDayVoca);
  }
  const resultList = [];

  const stepCont = Math.floor(json.length / 210);
  const restStep = Math.floor(json.length % 210);
  // 0 210
  // 210 420
  // 420 630
  // 630
  var tmp = 0;
  for (; tmp < stepCont; tmp++) {
    resultList.push(json.slice(tmp * 210, tmp * 210 + 210));
  }
  if (restStep != 0) {
    console.log("tmp", tmp);

    console.log(
      "json.slice(tmp * 210 + 210, json.length)",
      json.slice(stepCont * 210 + 210)
    );

    resultList.push(json.slice((stepCont - 1) * 210 + 210));
  }

  console.log("stepCont", stepCont);
  console.log("restStep", restStep);
  for (var tt = 0; tt < resultList.length; tt++) {
    for (var bb = 0; bb < resultList[tt].length; bb++) {
      resultList[tt][bb] = {
        ...resultList[tt][bb],
        headTitle: "챕터" + (tt + 1 ),
      };
    }
  }
  return resultList;
};

export const execlToJsonJLPT = (headTitle) => {
  console.log(headTitle);

  const sheet = japanN1Books.Sheets[headTitle];
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

export const execlToJson2316JlptVocaBySort = (headTitle) => {

  const returnValue= [[],[],[],[],[],[]];
  const headTitlesheet = japan2316Books.Sheets[headTitle];
  const headTitleDatas = xlsx.utils.sheet_to_json(headTitlesheet);

  const headTitleRelatedsheet = japan2316Books.Sheets[headTitle + "-연관"];
  const headTitleRelatedDatas = xlsx.utils.sheet_to_json(headTitleRelatedsheet);

  const headTitleWords = [];
  const headTitleId = [];

  const headTitleRelatedId = [];
  const headTitleRelatedWords = [];

for (let i = 0; i < headTitleRelatedDatas.length; i++) {
    const yomikata = headTitleRelatedDatas[i]["yomikata"];
    const word = headTitleRelatedDatas[i]["word"];
    const mean = headTitleRelatedDatas[i]["mean"];
    const id = headTitleRelatedDatas[i]['japanese_id'];
    if (yomikata == undefined && word == undefined && mean == undefined) {
      continue;
    }
    headTitleRelatedId.push(headTitleRelatedDatas[i]["japanese_id"]);
    const relatedWord = {
      yomikata,
      word,
      mean,
      id,
    };

    headTitleRelatedWords.push(relatedWord);
  }

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


    const voca = {
      id,
      japan,
      korea,
      undoc,
      hundoc,
      headTitle,
      jlpt_level,
    };

    switch(jlpt_level) {
      case 1 :
          returnValue[0].push(voca);
        break;
        case 2 :
          returnValue[1].push(voca);
        break;
        case 3 :
          returnValue[2].push(voca);
        break;
        case 4 :
          returnValue[3].push(voca);
        break;
        case 5 :
          returnValue[4].push(voca);
        break;
        default:
          returnValue[5].push(voca);
        break;
    }
  }
  for(let i = 0 ; i < returnValue.length ; i++) {
    for(let j = 0 ; j< returnValue[i].length ;j++) {
      const relatedVoca = [];
      for(let z = 0 ; z < headTitleRelatedWords.length ; z++) {
        if(headTitleRelatedWords[z].id == returnValue[i][j].id) {
          relatedVoca.push(headTitleRelatedWords[z]);
        }
      }
      returnValue[i][j] = {...returnValue[i][j] , relatedVoca}; 
    }
  }
  return returnValue;

}

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
    const yomikata = headTitleRelatedDatas[i]["yomikata"];
    const word = headTitleRelatedDatas[i]["word"];
    const mean = headTitleRelatedDatas[i]["mean"];
    if (yomikata == undefined && word == undefined && mean == undefined) {
      continue;
    }
    headTitleRelatedId.push(headTitleRelatedDatas[i]["japanese_id"]);
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

      // if (headTitleId[i] < headTitleRelatedId[j]) {
      //   break;
      // }
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

  const json = [];
  for (let i = 0; i < datas.length; i++) {
    let day = datas[i]["Day"];

    const a = day.substring(3);
    console.log(a);
    if(datas[i]["단어"] == undefined) {
      console.log('datas[i]["단어"]');
      continue;
    }
    const noDayVoca = {
      word: datas[i]["단어"],
      mean: datas[i]["뜻"],
    };

    if (json[a] == undefined) {
      json[a] = [];
    }
    json[a].push(noDayVoca);
  }


  console.log(json.length);

  return json;
};
