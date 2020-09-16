import { InsertGenreToMusicInputDTO, GenreName, GenreIdInputAndOutputDTO, GenreNameInputAndOutputDTO } from './../model/Genre';
import { BaseDatabase } from './BaseDatabase';
export class GenreDatabase extends BaseDatabase {
    public static TABLE_GENRE = "labemusic_genre"
    public static TABLE_MUSIC_GENRE = "labemusic_music_genre"

    public async getGenreByName(genreName: GenreNameInputAndOutputDTO): Promise<GenreIdInputAndOutputDTO> {
        let genreIds: GenreIdInputAndOutputDTO | any = []

        for (let genre of genreName.genreNames) {
            const result = await this.getConnection().raw(`
                SELECT id 
                FROM ${GenreDatabase.TABLE_GENRE} 
                WHERE name IN("${genre}");
            `)
            genreIds.push(result[0][0].id)
        }
        return genreIds
    }

    public async getGenreById(genreIds: string[]): Promise<GenreNameInputAndOutputDTO> {
        let genreNames: GenreNameInputAndOutputDTO | any = []

        for (let genre of genreIds) {
            const result = await this.getConnection().raw(`
                SELECT name 
                FROM ${GenreDatabase.TABLE_GENRE} 
                WHERE id IN("${genre}");
            `)
            genreNames.push(result[0][0].name)
        }
        return genreNames
    }

    public async getGenreByMusicId(musicId: string): Promise<GenreIdInputAndOutputDTO> {
        try {
            const result = await this.getConnection().raw(
                `
                SELECT * 
                FROM labemusic_music_genre
                WHERE music_id="${musicId}";`
            )

            const genreIds: GenreIdInputAndOutputDTO = result[0].map((item: any) => {
                return item.genre_id
            })

            return genreIds
        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }
    public async insertGenreToMusic(input: InsertGenreToMusicInputDTO): Promise<void> {
        try {
            const insertGenreToMusic = input.genreIds.genreIds.map((item: any) => {
                return {
                    music_id: input.musicId,
                    genre_id: item,
                }
            })
            await this.getConnection().insert(insertGenreToMusic).into("labemusic_music_genre")
        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }
}
