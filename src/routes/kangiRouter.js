import express from "express";
import {
    deleteKangis,
    getKangiAll,
    getKangisByLevel,
    uploadKangi,
} from "../controller/kangiController";

const kangiRouter = express.Router();

kangiRouter.get("/", getKangiAll);
kangiRouter.get("/level", getKangisByLevel);
kangiRouter.post("/upload", uploadKangi);
kangiRouter.delete("/delete-all", deleteKangis);

export default kangiRouter;
