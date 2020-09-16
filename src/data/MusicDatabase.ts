import { CreateMusicInputDTO, MusicOutputDTO } from './../model/Music';
import moment from 'moment';
import { BaseDatabase } from './BaseDatabase';

export class MusicDatabase extends BaseDatabase {
    public static TABLE_NAME = "labemusic_music"

    public async createMusic(
        music: CreateMusicInputDTO
    ) {

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

    public async getMusicById(id: string) {

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
}