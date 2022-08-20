import xlsx from "xlsx";
import RelatedWord from "./models/RelatedWord";
import Word from "./models/Word";

export const workbook = xlsx.readFile(__dirname + "/../public/일본어책.xlsx");
export const books = xlsx.readFile(__dirname + "/../public/book_all.xlsx");
export const stepCnt = 15;

export const postWords = async (firstWord) => {
  await Word.deleteMany({ firstWord });
  let book;

  if (firstWord == "ja") {
    return;
  }

  book = books.Sheets[firstWord];
  let i = 2;
  while (true) {
    const idObj = book["A" + i];
    const kangiObj = book["B" + i];
    const meanObj = book["C" + i];
    const undocObj = book["D" + i];
    const hundocObj = book["E" + i];
    // const levelObj = book["F" + i];

    if (
      idObj === undefined ||
      kangiObj === undefined ||
      meanObj === undefined ||
      undocObj === undefined ||
      hundocObj === undefined
    ) {
      if (idObj !== undefined && idObj.w != "end") {
        i++;
        continue;
      } else {
        break;
      }
    }

    const id = idObj.w;
    const kangi = kangiObj.w;
    const mean = meanObj.w;
    const undoc = undocObj.w;
    const hundoc = hundocObj.w;

    let tmpLevel = Math.floor(Math.random() * 5) + 1;
    await Word.create({
      id,
      kangi,
      mean,
      undoc,
      hundoc,
      firstWord,
      level: tmpLevel,
    });

    i++;
  }
};

export const postRelatedWords = async (firstWord) => {
  await RelatedWord.deleteMany({ firstWord });

  let book;

  if (
    firstWord === "ja" ||
    firstWord === "tya" ||
    firstWord === "ka" ||
    firstWord === "ta" ||
    firstWord === "pa"
  ) {
    return;
  }

  book = books.Sheets[firstWord];
  let i = 2;
  while (true) {
    const yomikataObj = book["H" + i];
    const kangiObj = book["I" + i];
    const meanObj = book["J" + i];
    const idObj = book["K" + i];
    if (
      yomikataObj === undefined ||
      kangiObj === undefined ||
      meanObj === undefined ||
      idObj === undefined
    ) {
      if (idObj !== undefined && idObj.w != "end") {
        i++;
        continue;
      } else {
        break;
      }
    }
    await RelatedWord.create({
      yomikata: book["H" + i].w,
      kangi: book["I" + i].w,
      mean: book["J" + i].w,
      id: book["K" + i].w,
      firstWord,
    });
    i++;
  }
};
