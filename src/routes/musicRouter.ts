import express from "express";
import { MusicController } from "../controller/MusicControler";


export const musicRouter = express.Router();

const musicController = new MusicController();

musicRouter.post("/", musicController.createMusic);
//musicRouter.get("/:id", musicController.getMusic);
musicRouter.get("/feed", musicController.getFeed);
