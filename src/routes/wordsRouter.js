import express from "express";
import {
  postExcel,
  getWordsByFirstword,
  getWordsByLevel,
  getFirstameCnt as getFirstnameCnt,
} from "../controller/wordsController";

// localhost:4000/words
const wordRouter = express.Router();

// ?firstWord=ga ..
wordRouter.post("/", postExcel);

// ?firstWord=ga ..
wordRouter.get("/", getWordsByFirstword);

wordRouter.get("/level", getWordsByLevel);

wordRouter.get("/cnt", getFirstnameCnt);

export default wordRouter;
