import { stringify } from 'querystring';
import { IdGenerator } from './../services/IdGenerator';
import { GenreName } from '../model/Music';
import { BaseDatabase } from './BaseDatabase';
export class GenreDatabase extends BaseDatabase {
    public static TABLE_GENRE = "labemusic_genre"
    public static TABLE_MUSIC_GENRE = "labemusic_music_genre"

    public async getGenreByName(genreName: string[]): Promise<any> {
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
    }

    public async getGenreById(genreIds: string[]): Promise<any> {
        let genreNames: string[] = []

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

    public async getGenreByMusicId(musicId: string): Promise<any> {
        try {
            const result = await this.getConnection().raw(
                `
                SELECT * 
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
    public async insertGenreToMusic(musicId: string, genreId: string[]) {
        try {
            const insertGenreToMusic = genreId.map(item => {
                return {
                    genre_id: item,
                    music_id: musicId
                }
            })
            await this.getConnection().insert(insertGenreToMusic).into("labemusic_music_genre")


        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }
}
