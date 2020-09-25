"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MusicController = void 0;
const GenreBusiness_1 = require("../src/business/GenreBusiness");
const MusicBusiness_1 = require("../src/business/MusicBusiness");
const IdGenerator_1 = require("../src/services/IdGenerator");
const MusicDatabase_1 = require("../src/data/MusicDatabase");
const Authenticator_1 = require("../src/services/Authenticator");
const BaseDatabase_1 = require("../src/data/BaseDatabase");
const GenreDatabase_1 = require("../src/data/GenreDatabase");
class MusicController {
    createMusic(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const input = {
                    title: req.body.title,
                    author: req.body.author,
                    date: req.body.date,
                    file: req.body.file,
                    album: req.body.album,
                    urlPhoto: req.body.url_photo
                };
                const genre = req.body.genre;
                const token = req.headers.authorization;
                yield MusicController.musicBusiness.createMusic(input, genre, token);
                res.status(200).send("Music created successfully");
            }
            catch (error) {
                res.status(error.errorCode || 400).send({ message: error.message });
            }
            yield BaseDatabase_1.BaseDatabase.destroyConnection();
        });
    }
    getMusic(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const token = req.headers.authorization; //
                const result = yield MusicController.musicBusiness.getMusicById(id, token); //
                res.status(200).send(result); //
            }
            catch (error) {
                res.status(error.errorCode || 400).send({ message: error.message });
            }
            yield BaseDatabase_1.BaseDatabase.destroyConnection();
        });
    }
    getFeed(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const result = yield MusicController.musicBusiness.getFeed(token);
                res.status(200).send({ result });
            }
            catch (error) {
                res.status(error.errorCode || 400).send({ message: error.message });
            }
        });
    }
}
exports.MusicController = MusicController;
MusicController.musicBusiness = new MusicBusiness_1.MusicBusiness(new MusicDatabase_1.MusicDatabase(), new GenreDatabase_1.GenreDatabase(), new IdGenerator_1.IdGenerator(), new Authenticator_1.Authenticator());
MusicController.genreBusiness = new GenreBusiness_1.GenreBusiness(new GenreDatabase_1.GenreDatabase(), new IdGenerator_1.IdGenerator(), new Authenticator_1.Authenticator());
