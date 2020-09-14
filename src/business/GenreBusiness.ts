import { InvalidParameterError } from './../error/InvalidParameterError';
import { GenreDatabase } from "../data/GenreDatabase";
import { MusicDatabase } from "../data/MusicDatabase";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

export class GenreBusiness {
    constructor(
        private genreDatabase: GenreDatabase,
        private idGenerator: IdGenerator,
        private authenticator: Authenticator,
    ) { }

    async getGenreById(id: string[]) {
        if (!id) {
            throw new InvalidParameterError("Missing id")
        }

        const genre = await this.genreDatabase.getGenreById(id)

        return genre;
    }
}