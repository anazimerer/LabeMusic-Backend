import { InsertGenreToMusicInputDTO, GenreName } from './../model/Genre';
import { BaseDatabase } from './BaseDatabase';
export class GenreDatabase extends BaseDatabase {
    public static TABLE_GENRE = "labemusic_genre"
    public static TABLE_MUSIC_GENRE = "labemusic_music_genre"

    public async getGenreByNameOrId(genreName?: string[], genreId?: string[]): Promise<any> {
        try {
            if (genreName && genreName.length > 0) {
                let genreIds: string[] = []
                for (let genre of genreName) {
                    const result = await this.getConnection().raw(`
                        SELECT id 
                        FROM ${GenreDatabase.TABLE_GENRE} 
                        WHERE name IN("${genre}");
                    `)
                    genreIds.push(result[0][0].id)
                }
                return genreIds

            } else if (genreId && genreId.length > 0) {
                let genreNames: string[] | any = []
                for (let genre of genreId) {
                    const result = await this.getConnection().raw(`
                        SELECT name 
                        FROM ${GenreDatabase.TABLE_GENRE} 
                        WHERE id IN("${genre}");
                    `)
                    genreNames.push(result[0][0].name)
                }
                return genreNames
            }
        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

    public async getGenreByMusicId(musicId: string): Promise<string[]> {
        try {
            const result = await this.getConnection().raw(
                `SELECT * 
                FROM labemusic_music_genre
                WHERE music_id="${musicId}";`
            )

            const genreIds: string[] = result[0].map((item: any) => {
                return item.genre_id
            })
            return genreIds
        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

    public async insertGenreToMusic(input: InsertGenreToMusicInputDTO): Promise<void> {
        try {
            const insertGenreToMusic = input.genreIds.map((item: any) => {
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
