import express from "express";
import {
    deleteJapans,
    getJapansByKangiId,
    uploadJapans,
} from "../controller/japanController";

const japanRouter = express.Router();

japanRouter.get("/:id([0-9a-f]*)", getJapansByKangiId);
japanRouter.post("/upload", uploadJapans);
japanRouter.delete("/", deleteJapans);
export default japanRouter;
