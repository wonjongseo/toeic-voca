import express from "express";
import { postExcel, getWordsByFirstword } from "../controller/wordsController";

// localhost:4000/words
const wordRouter = express.Router();

// ?firstWord=ga ..
wordRouter.post("/", postExcel);

// ?firstWord=ga ..
wordRouter.get("/", getWordsByFirstword);

export default wordRouter;
