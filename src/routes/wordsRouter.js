import express from "express";
import {
  postExcel
} from "../controller/wordsController";

// localhost:4000/words
const wordRouter = express.Router();

// ?firstWord=ga ..
wordRouter.get("/", postExcel);

export default wordRouter;