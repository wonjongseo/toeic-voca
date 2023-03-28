import express from "express";
import {
  post2316JlptVoca,
  postJlptGrammar,
  postJlptVoca,
  postToeicVoca,
} from "../controller/wordsController";

// localhost:4000/words
const wordRouter = express.Router();

// ?firstWord=ga ..

wordRouter.get("/", postJlptVoca);
wordRouter.get("/book", post2316JlptVoca);
wordRouter.get("/grammar", postJlptGrammar);
wordRouter.get("/japan", postToeicVoca);

export default wordRouter;
