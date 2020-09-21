import { GenreDatabase } from './GenreDatabase';
import { CreateMusicInputDTO, MusicOutputDTO } from './../model/Music';
import { BaseDatabase } from './BaseDatabase';


export class MusicDatabase extends BaseDatabase {
    public static TABLE_NAME = "labemusic_music"

    public async createMusic(
        music: CreateMusicInputDTO
    ): Promise<void> {
        try {
            await this.getConnection()
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
                .into(MusicDatabase.TABLE_NAME)
        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

    public async getMusicById(id: string): Promise<MusicOutputDTO> {
        try {
            const result: MusicOutputDTO | any = await this.getConnection()
                .select("*")
                .from(MusicDatabase.TABLE_NAME)
                .where({ id })

            return result
        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

    public async getAllMusics(): Promise<any> {
        const genreDatabase = new GenreDatabase()
        try {
            const allMusics: MusicOutputDTO[] = await this.getConnection()
                .select("*")
                .from(MusicDatabase.TABLE_NAME);

            let allMusicsAndGenres = []
            for (let item of allMusics) {
                const genreIds = await genreDatabase.getGenreByMusicId(item.id)
                const genreNames = await genreDatabase.getGenreByNameOrId([], genreIds)
                allMusicsAndGenres.push({
                    ...item,
                    genre: genreNames
                })
            }
            return allMusicsAndGenres

        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }
}