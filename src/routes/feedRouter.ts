import express from "express";
import { MusicController } from "../controller/MusicControler";


export const feedRouter = express.Router();

const musicController = new MusicController();

feedRouter.get("/", musicController.getFeed);
