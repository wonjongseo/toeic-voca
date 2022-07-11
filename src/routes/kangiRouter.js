import express from "express";
import {
    deleteKangis,
    getKangiByStep,
    getKangiAll,
    getKangisByLevel,
    uploadKangi,
    getKangiAllByLevel,
} from "../controller/kangiController";

const kangiRouter = express.Router();

kangiRouter.get("/all", getKangiAll);
kangiRouter.get("/", getKangiByStep);
kangiRouter.get("/levels", getKangiAllByLevel);
kangiRouter.get("/level", getKangisByLevel);
kangiRouter.post("/upload", uploadKangi);
kangiRouter.delete("/delete-all", deleteKangis);

export default kangiRouter;
