import express from "express";
import {
    deleteJapans,
    getJapansByJlptLevel,
    getJapansByKangiId,
    uploadJapans,
} from "../controller/japanController";

const japanRouter = express.Router();

japanRouter.get("/:id([0-9a-f]*)", getJapansByKangiId);
japanRouter.get("/jlpt", getJapansByJlptLevel);
japanRouter.post("/upload", uploadJapans);
japanRouter.delete("/", deleteJapans);
export default japanRouter;
