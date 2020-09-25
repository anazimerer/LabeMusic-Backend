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
exports.GenreDatabase = void 0;
const BaseDatabase_1 = require("./BaseDatabase");
class GenreDatabase extends BaseDatabase_1.BaseDatabase {
    getGenreByNameOrId(genreName, genreId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (genreName && genreName.length > 0) {
                    let genreIds = [];
                    for (let genre of genreName) {
                        const result = yield this.getConnection().raw(`
                        SELECT id 
                        FROM ${GenreDatabase.TABLE_GENRE} 
                        WHERE name IN("${genre}");
                    `);
                        genreIds.push(result[0][0].id);
                    }
                    return genreIds;
                }
                else if (genreId && genreId.length > 0) {
                    let genreNames = [];
                    for (let genre of genreId) {
                        const result = yield this.getConnection().raw(`
                        SELECT name 
                        FROM ${GenreDatabase.TABLE_GENRE} 
                        WHERE id IN("${genre}");
                    `);
                        genreNames.push(result[0][0].name);
                    }
                    return genreNames;
                }
            }
            catch (error) {
                throw new Error(error.sqlMessage || error.message);
            }
        });
    }
    getGenreByMusicId(musicId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.getConnection().raw(`SELECT * 
                FROM labemusic_music_genre
                WHERE music_id="${musicId}";`);
                const genreIds = result[0].map((item) => {
                    return item.genre_id;
                });
                return genreIds;
            }
            catch (error) {
                throw new Error(error.sqlMessage || error.message);
            }
        });
    }
    insertGenreToMusic(input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const insertGenreToMusic = input.genreIds.map((item) => {
                    return {
                        music_id: input.musicId,
                        genre_id: item,
                    };
                });
                yield this.getConnection().insert(insertGenreToMusic).into("labemusic_music_genre");
            }
            catch (error) {
                throw new Error(error.sqlMessage || error.message);
            }
        });
    }
}
exports.GenreDatabase = GenreDatabase;
GenreDatabase.TABLE_GENRE = "labemusic_genre";
GenreDatabase.TABLE_MUSIC_GENRE = "labemusic_music_genre";
