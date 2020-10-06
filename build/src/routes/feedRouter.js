"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.feedRouter = void 0;
const express_1 = __importDefault(require("express"));
const MusicControler_1 = require("../controller/MusicControler");
exports.feedRouter = express_1.default.Router();
const musicController = new MusicControler_1.MusicController();
exports.feedRouter.get("/", musicController.getFeed);
