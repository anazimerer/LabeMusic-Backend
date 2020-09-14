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
        genreName: string[],
        token: string) {
        if (!input.title || !input.author || !input.date || !input.album || !input.file) {
            throw new InvalidParameterError("Missing input")
        }

        if (genreName.length <= 0) {
            throw new InvalidParameterError("Requires genre")
        }

        if (!token) {
            throw new GenericError("Requires token")
        }

        const authenticationData = this.authenticator.getData(token);


        if (!authenticationData.id) {
            throw new InvalidParameterError("Requires valid token")
        }

        const genreId: string[] = await this.genreDatabase.getGenreByName(genreName)

        console.log("Array de ids" + genreId)
        if (genreId.length !== genreName.length) {
            throw new InvalidParameterError("Some genre is not valid")
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

    async getMusicById(id: string, token: string) {
        if (!id || !token) {
            throw new InvalidParameterError("Missing id")
        }
        const authenticationData = this.authenticator.getData(token);

        if (!authenticationData) {
            throw new InvalidParameterError("Requires valid token")
        }

        const music = await this.musicDatabase.getMusicById(id)

        return music;
    }


}