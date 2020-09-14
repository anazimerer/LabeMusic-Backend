import moment from 'moment';
import { BaseDatabase } from './BaseDatabase';

export class MusicDatabase extends BaseDatabase {
    public static TABLE_NAME = "labemusic_music"

    public async createMusic(
        id: string,
        title: string,
        author: string,
        date: Date,
        file: string,
        album: string,
        userId: string
    ) {

        try {
            await this.getConnection()
                .insert({
                    id: id,
                    title: title,
                    author: author,
                    date: new Date(date),
                    file: file,
                    album: album,
                    user_id: userId
                })
                .into(MusicDatabase.TABLE_NAME)
        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

    public async getMusicById(id: string) {
        try {
            const result = await this.getConnection()
                .select("*")
                .from(MusicDatabase.TABLE_NAME)
                .where({ id })
            return result
        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }


}