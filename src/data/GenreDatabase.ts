import { BaseDatabase } from './BaseDatabase';
export class GenreDatabase extends BaseDatabase {
    public static TABLE_GENRE = "labemusic_genre"
    public static TABLE_MUSIC_GENRE = "labemusic_music_genre"

    public async getGenre(name: string): Promise<any> {
        try {
            const result = await this.getConnection()
                .select("id")
                .from(GenreDatabase.TABLE_GENRE)
                .where({ name })
            return result[0].id
        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }
    public async insertGenreToMusic(musicId: string, genreId: string) {
        try {
            console.log("music id " + musicId)
            console.log("genre id " + genreId)
            await this.getConnection()
                .insert({
                    music_id: musicId,
                    genre_id: genreId
                })
                .into(GenreDatabase.TABLE_MUSIC_GENRE)
        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }
}