import { GenreDatabase } from './../data/GenreDatabase';
import { GenericError } from './../error/GenericError';
import { InvalidParameterError } from './../error/InvalidParameterError';
import { MusicInputDTO, GenreInputDTO } from './../model/Music';
import { Authenticator } from './../services/Authenticator';
import { IdGenerator } from './../services/IdGenerator';
import { MusicDatabase } from './../data/MusicDatabase';
export class MusicBusiness {
    constructor(
        private musicDatabase: MusicDatabase,
        private genreDatabase: GenreDatabase,
        private idGenerator: IdGenerator,
        private authenticator: Authenticator,
    ) { }

    async createMusic(
        input: MusicInputDTO,
        genreName: string,
        token: string) {
        if (!input.title || !input.author || !input.date || !input.album || !input.file || !genreName) {
            throw new InvalidParameterError("Missing input")
        }

        if (!token) {
            throw new GenericError("Requires token")
        }

        const authenticationData = this.authenticator.getData(token);


        if (!authenticationData.id) {
            throw new InvalidParameterError("Requires valid token")
        }

        const genreId = await this.genreDatabase.getGenre(genreName)

        if (!genreId) {
            throw new InvalidParameterError("Invalid genre")
        }

        const musicId = this.idGenerator.generate();

        await this.musicDatabase.createMusic(
            musicId,
            input.title,
            input.author,
            input.date,
            input.file,
            input.album,
            authenticationData.id
        );

        await this.genreDatabase.insertGenreToMusic(musicId, genreId);
    }
}