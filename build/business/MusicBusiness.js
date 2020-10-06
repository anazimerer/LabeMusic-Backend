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
exports.MusicBusiness = void 0;
const GenericError_1 = require("./../error/GenericError");
const InvalidParameterError_1 = require("./../error/InvalidParameterError");
class MusicBusiness {
    constructor(musicDatabase, genreDatabase, idGenerator, authenticator) {
        this.musicDatabase = musicDatabase;
        this.genreDatabase = genreDatabase;
        this.idGenerator = idGenerator;
        this.authenticator = authenticator;
    }
    createMusic(input, genreName, token) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!input.title || !input.author || !input.date || !input.album || !input.file || !input.urlPhoto) {
                throw new InvalidParameterError_1.InvalidParameterError("Missing input");
            }
            if (genreName.length <= 0) {
                throw new InvalidParameterError_1.InvalidParameterError("Requires genre");
            }
            if (!token) {
                throw new GenericError_1.GenericError("Requires token");
            }
            const authenticationData = this.authenticator.getData(token);
            if (!authenticationData.id || !authenticationData) {
                throw new InvalidParameterError_1.InvalidParameterError("Requires valid token");
            }
            const genreId = yield this.genreDatabase.getGenreByNameOrId(genreName, []);
            if (genreId.length !== genreName.length) {
                throw new InvalidParameterError_1.InvalidParameterError("Some genre is not valid");
            }
            const musicId = this.idGenerator.generate();
            const music = {
                musicId: musicId,
                title: input.title,
                author: input.author,
                date: input.date,
                file: input.file,
                album: input.album,
                userId: authenticationData.id,
                urlPhoto: input.urlPhoto
            };
            yield this.musicDatabase.createMusic(music);
            const insertGenreToMusicInput = {
                musicId: musicId,
                genreIds: genreId
            };
            yield this.genreDatabase.insertGenreToMusic(insertGenreToMusicInput);
        });
    }
    getMusicById(id, token) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id || !token) {
                throw new InvalidParameterError_1.InvalidParameterError("Missing id");
            }
            const authenticationData = this.authenticator.getData(token);
            if (!authenticationData) {
                throw new InvalidParameterError_1.InvalidParameterError("Requires valid token");
            }
            const music = yield this.musicDatabase.getMusicById(id);
            const genreId = yield this.genreDatabase.getGenreByMusicId(id);
            if (!genreId) {
                throw new GenericError_1.GenericError("Genres not found");
            }
            const genreNames = yield this.genreDatabase.getGenreByNameOrId([], genreId);
            if (genreId.length !== genreNames.length) {
                throw new GenericError_1.GenericError("Some genre is not found");
            }
            const result = {
                music: music,
                genre: genreNames
            };
            return result;
        });
    }
    getFeed(token) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!token) {
                throw new InvalidParameterError_1.InvalidParameterError("Missing token");
            }
            const authenticationData = this.authenticator.getData(token);
            if (!authenticationData) {
                throw new InvalidParameterError_1.InvalidParameterError("Requires valid token");
            }
            const allMusics = yield this.musicDatabase.getAllMusics();
            if (!allMusics || allMusics.length === 0) {
                throw new GenericError_1.GenericError("Musics not found");
            }
            return allMusics;
        });
    }
}
exports.MusicBusiness = MusicBusiness;
