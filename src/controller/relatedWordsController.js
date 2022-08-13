import { async } from "regenerator-runtime";
import { books, workbook } from "../excelData";
import RelatedWord from "../models/RelatedWord";

export const postRelatedWords = async (firstWord) => {
  await RelatedWord.deleteMany({ firstWord });
  let endIndex = 3;
  let book;

  switch (firstWord) {
    case "ga":
      book = books.Sheets["ga"];
      endIndex = 1626;
      break;
    case "na":
      book = books.Sheets["na"];
      endIndex = 144;
      break;
    case "da":
      book = books.Sheets["da"];
      endIndex = 488;
      break;
    case "ra":
      book = books.Sheets["ra"];
      endIndex = 547;
      break;
    case "ma":
      endIndex = 506;
      book = books.Sheets["ma"];
      break;

    case "ba":
      endIndex = 709;
      book = books.Sheets["ba"];
      break;
    case "sa":
      endIndex = 1413;
      book = books.Sheets["sa"];
      break;
    case "a":
      endIndex = 604; // must change
      book = books.Sheets["a"];
      break;
    // case "ja":
    // endIndex = ; // must change
    // book = books.Sheets["ja"];
    // break;

    // case "tya":
    //   endIndex = 609; // must change
    //   book = books.Sheets["Sheet13"];
    //   break;

    // case "ka":
    //   endIndex = ; // must change
    //   book = books.Sheets["Sheet13"];
    //   break;

    // case "ta":
    // endIndex = 68; // must change
    // book = books.Sheets["Sheet12"];
    // break;

    // case "pa":
    // endIndex = ; // must change
    // book = books.Sheets["Sheet11"];
    // break;

    case "ha":
      endIndex = 609; // must change
      book = books.Sheets["ha"];
      break;

    case "acc": // 등
      endIndex = 13; // must change
      book = books.Sheets["acc"];
      break;
    default:
      return;
  }

  for (let i = 2; i <= endIndex; i++) {
    await RelatedWord.create({
      yomikata: book["H" + i].w,
      kangi: book["I" + i].w,
      mean: book["J" + i].w,
      id: book["K" + i].w,
      firstWord,
    });
  }
};

export const getReleatedWordsById = async (req, res, next) => {
  const { id } = req.query;

  console.log(id);
  const related = await RelatedWord.find({ id });

  return res.json(related);
};

export const getRelatedWordById = async (req, res, next) => {
  const { id } = req.params;

  const relateds = await RelatedWord.find({ id });

  return res.json(relateds);
};
