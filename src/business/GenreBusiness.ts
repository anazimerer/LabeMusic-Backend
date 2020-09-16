import { InvalidParameterError } from './../error/InvalidParameterError';
import { GenreDatabase } from "../data/GenreDatabase";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";


export class GenreBusiness {
    constructor(
        private genreDatabase: GenreDatabase,
        private idGenerator: IdGenerator,
        private authenticator: Authenticator,
    ) { }

    async getGenreByMusicId(id: string): Promise<string[]> {
        if (!id) {
            throw new InvalidParameterError("Missing id")
        }

        const genre: string[] = await this.genreDatabase.getGenreByMusicId(id)

        return genre;
    }
}