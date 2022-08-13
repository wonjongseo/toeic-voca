import Word from "../models/Word";
import { books } from "../excelData";
import { postRelatedWords } from "./relatedWordsController";

export const getWordsByFirstword = async (req, res, next) => {
  const { firstWord } = req.query;

  /*
        // protoTypes: {
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
  // let words = [[]];
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
 */
  const words = await Word.find({ firstWord });

  return res.json(words);

  const words_by_firstword = {
    words,
    total_cnt: words.length,
  };

  return res.json(words_by_firstword);
};

// get words from execl file
const postWords = async (firstWord) => {
  await Word.deleteMany({ firstWord });
  let book;

  let endIndex = 3;
  switch (firstWord) {
    case "ga": // ㄱ
      endIndex = 332;
      book = books.Sheets["ga"];
      break;
    case "na": // ㄴ
      endIndex = 29;
      book = books.Sheets["na"];
      break;
    case "da": // ㄷ
      endIndex = 93;
      book = books.Sheets["da"];
      break;
    case "ra": // ㄹ
      endIndex = 116;
      book = books.Sheets["ra"];
      break;
    case "ma": // ㅁ
      endIndex = 109;
      book = books.Sheets["ma"];
      break;
    case "ba": // ㅂ
      endIndex = 170;
      book = books.Sheets["ba"];
      break;
    case "sa": // ㅅ
      endIndex = 279;
      book = books.Sheets["sa"];
      break;
    case "a": // ㅇ
      endIndex = 234; // must change
      book = books.Sheets["a"];
      break;

    // case "ja": // ㅈ
    // endIndex = ; // must change
    // book = books.Sheets["ja"];
    // break;

    case "tya": // ㅊ
      endIndex = 85; // must change
      book = books.Sheets["tya"];
      break;

    case "ka": // ㅋ
      endIndex = 2;
      book = books.Sheets["ka"];
      break;

    case "ta": // ㅌ
      endIndex = 47; // must change
      book = books.Sheets["ta"];
      break;

    case "pa": // ㅍ
      endIndex = 68; // must change
      book = books.Sheets["pa"];
      break;
    case "ha": // ㅎ
      endIndex = 156; // must change
      book = books.Sheets["ha"];
      break;
    case "acc": // 등
      endIndex = 5; // must change
      book = books.Sheets["acc"];
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
