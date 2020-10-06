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
exports.GenreBusiness = void 0;
const InvalidParameterError_1 = require("./../error/InvalidParameterError");
class GenreBusiness {
    constructor(genreDatabase, idGenerator, authenticator) {
        this.genreDatabase = genreDatabase;
        this.idGenerator = idGenerator;
        this.authenticator = authenticator;
    }
    getGenreByMusicId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id) {
                throw new InvalidParameterError_1.InvalidParameterError("Missing id");
            }
            const genre = yield this.genreDatabase.getGenreByMusicId(id);
            return genre;
        });
    }
}
exports.GenreBusiness = GenreBusiness;
