import { IdGenerator } from './../services/IdGenerator';
import { GenreName } from '../model/Music';
import { BaseDatabase } from './BaseDatabase';
export class GenreDatabase extends BaseDatabase {
    public static TABLE_GENRE = "labemusic_genre"
    public static TABLE_MUSIC_GENRE = "labemusic_music_genre"

    public async getGenreByName(genreName: string[]): Promise<any> {

        const genreIds = genreName.map(async (item: any) => {
            const name = item
            console.log("name item " + name)
            const response = await this.getConnection()
                .select("id")
                .from(GenreDatabase.TABLE_GENRE)
                .where({ name })

            console.log("getgenreByname " + response)
            return response[0].id
        })
        return genreIds
        //const genreIds = genreName.map(async (item) => {
        //    const name = item
        //    const result = await this.getConnection()
        //        .select("id")
        //        .from(GenreDatabase.TABLE_GENRE)
        //        .where({ name })
        //    return result[0].id
        //})
        //return genreIds
        //      

    }

    public async getGenreById(genreId: string[]): Promise<any> {
        try {
            console.log("entrou no genreById")
            let genreNames: string[] = []
            genreId.forEach(async (item) => {
                const result = await this.getConnection()
                    .select({ id: item })
                    .from(GenreDatabase.TABLE_GENRE)
                    .where({ name });
                genreNames.push(result[0].name)
            });
            console.log(genreNames)
            return genreNames
        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }
    public async insertGenreToMusic(musicId: string, genreId: string[]) {
        try {
            console.log("entrou no insert")
            genreId.forEach(async (item) => {
                await this.getConnection()
                    .insert({
                        music_id: musicId,
                        genre_id: item
                    })
                    .into(GenreDatabase.TABLE_MUSIC_GENRE)
            })
            console.log("saiu do insert")

        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }
}