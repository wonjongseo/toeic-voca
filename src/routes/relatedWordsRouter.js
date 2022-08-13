import express from "express";
import { getRelatedWordById } from "../controller/relatedWordsController";

const relatedWordRouter = express.Router();
relatedWordRouter.get("/:id([0-9a-f]*)", getRelatedWordById);

export default relatedWordRouter;
