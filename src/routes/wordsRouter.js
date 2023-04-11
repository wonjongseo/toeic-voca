import express from "express";
import {
  post2316JlptVoca,
  postAllJlptVoca,
  postJlptGrammar,
  postToeicVoca,
  postJlptVoca,
  postAll2316JlptVoca,
  postJlptN2345Voca,
} from "../controller/wordsController";

// localhost:4000/words
const wordRouter = express.Router();

// ?firstWord=ga ..

wordRouter.get("/", postToeicVoca);
wordRouter.get("/n", postJlptN2345Voca);
wordRouter.get("/book", post2316JlptVoca);
wordRouter.get("/book-all", postAll2316JlptVoca);
wordRouter.get("/grammar", postJlptGrammar);
wordRouter.get("/japan", postJlptVoca);
wordRouter.get("/japan-all", postAllJlptVoca);

export default wordRouter;
