import { GenreNameInputAndOutputDTO } from "./Genre";

export interface MusicInputDTO {
    title: string,
    author: string,
    date: Date,
    file: string,
    album: string
}

export interface MusicOutputDTO {
    id: string
    title: string,
    author: string,
    date: Date,
    file: string,
    album: string,
    userId: string
}
export interface CreateMusicInputDTO {
    musicId: string
    title: string,
    author: string,
    date: Date,
    file: string,
    album: string,
    userId: string
}

export interface MusicAndGenreOutputDTO {
    music: MusicOutputDTO,
    genre: GenreNameInputAndOutputDTO
}
export class Music {
    constructor(
        private id: string,
        private title: string,
        private author: string,
        private date: Date,
        private file: string,
        private album: string
    ) { }

    static toMusicModel(music: any): Music {
        return new Music(music.id, music.title, music.author, music.date, music.file, music.album);
    }
}