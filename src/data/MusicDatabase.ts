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
            const result = await this.getConnection().raw(
                `
                SELECT 
                m.id,
                m.title,
                m.author,
                m.file,
                m.album, 
                m.user_id,
                m.date,
                g.name as "genre"
                FROM labemusic_music m
                JOIN labemusic_music_genre mg
                ON m.id = mg.music_id
                JOIN labemusic_genre g 
                ON mg.genre_id = g.id
                WHERE m.id= "${id}";
                `)
            return result[0][0]
        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }
}