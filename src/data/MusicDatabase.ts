import { CreateMusicInputDTO, ListMusicOutputDTO, MusicOutputDTO, MusicAndGenreIds } from './../model/Music';
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
                    user_id: music.userId
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

    public async getGenreByMusicId2(musicId: string): Promise<string[]> {
        try {
            const result = await this.getConnection().raw(
                `
                SELECT * 
                FROM labemusic_music_genre
                WHERE music_id="${musicId}";`
            )

            const genreNames: string[] = result[0].map((item: any) => {
                return item.genre_name
            })
            return genreNames
        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

    public async getAllMusics(): Promise<any> {
        try {
            const allMusics: ListMusicOutputDTO[] = await this.getConnection()
                .select("*")
                .from(MusicDatabase.TABLE_NAME);

            //const allMusicsIds = allMusics.map((item: any) => {
            //    return item.id
            //})

            let allMusicsAndGenres = {}
            //for (let music of allMusics) {
            //    const id = music.musics.id
            //    const genreNames: string[] = await this.getGenreByMusicId2(id)
            //    allMusicsAndGenres = { ...music, genre: genreNames }
            //}
            return allMusics

        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }
}