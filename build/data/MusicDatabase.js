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
exports.MusicDatabase = void 0;
const GenreDatabase_1 = require("./GenreDatabase");
const BaseDatabase_1 = require("./BaseDatabase");
class MusicDatabase extends BaseDatabase_1.BaseDatabase {
    createMusic(music) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.getConnection()
                    .insert({
                    id: music.musicId,
                    title: music.title,
                    author: music.author,
                    date: new Date(music.date),
                    file: music.file,
                    album: music.album,
                    user_id: music.userId,
                    url_photo: music.urlPhoto
                })
                    .into(MusicDatabase.TABLE_NAME);
            }
            catch (error) {
                throw new Error(error.sqlMessage || error.message);
            }
        });
    }
    getMusicById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.getConnection()
                    .select("*")
                    .from(MusicDatabase.TABLE_NAME)
                    .where({ id });
                return result;
            }
            catch (error) {
                throw new Error(error.sqlMessage || error.message);
            }
        });
    }
    getAllMusics() {
        return __awaiter(this, void 0, void 0, function* () {
            const genreDatabase = new GenreDatabase_1.GenreDatabase();
            try {
                const allMusics = yield this.getConnection()
                    .select("*")
                    .from(MusicDatabase.TABLE_NAME);
                let allMusicsAndGenres = [];
                for (let item of allMusics) {
                    const genreIds = yield genreDatabase.getGenreByMusicId(item.id);
                    const genreNames = yield genreDatabase.getGenreByNameOrId([], genreIds);
                    allMusicsAndGenres.push(Object.assign(Object.assign({}, item), { genre: genreNames }));
                }
                return allMusicsAndGenres;
            }
            catch (error) {
                throw new Error(error.sqlMessage || error.message);
            }
        });
    }
}
exports.MusicDatabase = MusicDatabase;
MusicDatabase.TABLE_NAME = "labemusic_music";
