import express from "express";
import {
  post2316JlptVoca,
  postN1AllJlptVoca,
  postJlptGrammar,
  postToeicVoca,
  postN1JlptVoca,
  postAll2316JlptVoca,
  postJlptN2345Voca,
  postJlptGrammarN2N3,
  postAll2316SortByLevel,
} from "../controller/wordsController";

// localhost:4000/words
const wordRouter = express.Router();

// ?firstWord=ga ..

wordRouter.get("/", postToeicVoca);
wordRouter.get("/n", postJlptN2345Voca);
wordRouter.get("/book", post2316JlptVoca);
wordRouter.get("/book-all", postAll2316JlptVoca);
wordRouter.get("/book-all-sort", postAll2316SortByLevel);
wordRouter.get("/grammar", postJlptGrammar);
wordRouter.get("/grammar-n3", postJlptGrammarN2N3);
wordRouter.get("/japan", postN1JlptVoca);

wordRouter.get("/japan-all", postN1AllJlptVoca);

export default wordRouter;
