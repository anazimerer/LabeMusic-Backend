import { GenreDatabase } from './../data/GenreDatabase';
import { GenericError } from './../error/GenericError';
import { InvalidParameterError } from './../error/InvalidParameterError';
import { MusicInputDTO, CreateMusicInputDTO, MusicOutputDTO, MusicAndGenreOutputDTO } from './../model/Music';
import { InsertGenreToMusicInputDTO } from './../model/Genre'
import { AuthenticationData, Authenticator } from './../services/Authenticator';
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
        token: string): Promise<void> {

        if (!input.title || !input.author || !input.date || !input.album || !input.file || !input.urlPhoto) {
            throw new InvalidParameterError("Missing input")
        }

        if (genreName.length <= 0) {
            throw new InvalidParameterError("Requires genre")
        }

        if (!token) {
            throw new GenericError("Requires token")
        }

        const authenticationData: AuthenticationData = this.authenticator.getData(token);


        if (!authenticationData.id || !authenticationData) {
            throw new InvalidParameterError("Requires valid token")
        }

        const genreId: string[] = await this.genreDatabase.getGenreByNameOrId(genreName, [])

        if (genreId.length !== genreName.length) {
            throw new InvalidParameterError("Some genre is not valid")
        }

        const musicId: string = this.idGenerator.generate();

        const music: CreateMusicInputDTO = {
            musicId: musicId,
            title: input.title,
            author: input.author,
            date: input.date,
            file: input.file,
            album: input.album,
            userId: authenticationData.id,
            urlPhoto: input.urlPhoto
        }
        await this.musicDatabase.createMusic(music);

        const insertGenreToMusicInput: InsertGenreToMusicInputDTO = {
            musicId: musicId,
            genreIds: genreId as string[]
        }
        await this.genreDatabase.insertGenreToMusic(insertGenreToMusicInput);
    }

    async getMusicById(id: string, token: string): Promise<MusicAndGenreOutputDTO> {
        if (!id || !token) {
            throw new InvalidParameterError("Missing id")
        }
        const authenticationData: AuthenticationData = this.authenticator.getData(token);

        if (!authenticationData) {
            throw new InvalidParameterError("Requires valid token")
        }
        const music: MusicOutputDTO = await this.musicDatabase.getMusicById(id)
        const genreId: string[] = await this.genreDatabase.getGenreByMusicId(id)

        if (!genreId) {
            throw new GenericError("Genres not found")
        }

        const genreNames: string[] = await this.genreDatabase.getGenreByNameOrId([], genreId)

        if (genreId.length !== genreNames.length) {
            throw new GenericError("Some genre is not found")
        }

        const result: MusicAndGenreOutputDTO = {
            music: music,
            genre: genreNames
        }
        return result;
    }

    async getFeed(token: string): Promise<string[] | undefined> {
        if (!token) {
            throw new InvalidParameterError("Missing token")
        }

        const authenticationData: AuthenticationData = this.authenticator.getData(token);

        if (!authenticationData) {
            throw new InvalidParameterError("Requires valid token")
        }

        const allMusics: string[] = await this.musicDatabase.getAllMusics()

        if (!allMusics || allMusics.length === 0) {
            throw new GenericError("Musics not found")
        }

        return allMusics
    }
}
