import xlsx from "xlsx";

export const workbook = xlsx.readFile(__dirname + "/../public/일본어책.xlsx");
export const books = xlsx.readFile(__dirname + "/../public/book_all.xlsx");
