import Word from "../models/Word";
import { books } from "../excelData";
import { postRelatedWords } from "./relatedWordsController";

/*
{
  words_by_firstword = [
    words_by_level  : {
        level : 1,
        total_cnt : 56
        word : [
          ...
        ]
      }
      ...
    ]
}
  */
export const getWordsByFirstword = async (req, res, next) => {
  const { firstWord } = req.query;

  let words = [[]];

  let words_by_firstword = [0];

  words_by_firstword[0] = {
    level: 0,
    total_cnt: 0,
    word: [],
  };
  for (let i = 1; i <= 5; i++) {
    const word = await Word.find({ firstWord, level: i + "" });
    words[i] = word;
    words_by_firstword[i] = {
      level: i,
      total_cnt: word.length,
      word,
    };
  }

  // console.log(words_by_firstword);
  const a = {
    words_by_firstword,
  };
  return res.json(a);
};

// get words from execl file
const postWords = async (firstWord) => {
  await Word.deleteMany({ firstWord });
  let book;

  let endIndex = 3;
  switch (firstWord) {
    case "ga":
      endIndex = 332;
      book = books.Sheets["Sheet1"];
      break;
    case "na":
      endIndex = 29;
      book = books.Sheets["Sheet2"];
      break;
    case "da":
      endIndex = 93;
      book = books.Sheets["Sheet3"];
      break;
    case "ra":
      endIndex = 116;
      book = books.Sheets["Sheet4"];
      break;
    default:
      return;
  }
  for (let i = 2; i <= endIndex; i++) {
    let tmpLevel = Math.floor(Math.random() * 5) + 1;
    await Word.create({
      id: book["A" + i].w,
      kangi: book["B" + i].w,
      mean: book["C" + i].w,
      undoc: book["D" + i].w,
      hundoc: book["E" + i].w,
      firstWord,
      level: tmpLevel,
    });
  }
};

export const postExcel = async (req, res, next) => {
  const { firstWord } = req.query;

  await postWords(firstWord);
  await postRelatedWords(firstWord);

  return res.json("Success");
};
