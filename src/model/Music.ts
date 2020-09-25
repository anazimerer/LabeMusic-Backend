export interface MusicInputDTO {
    title: string,
    author: string,
    date: Date,
    file: string,
    album: string,
    urlPhoto: string
}

export interface MusicOutputDTO {
    id: string
    title: string,
    author: string,
    date: Date,
    file: string,
    album: string,
    userId: string,
    urlPhoto: string
}
export interface CreateMusicInputDTO {
    musicId: string
    title: string,
    author: string,
    date: Date,
    file: string,
    album: string,
    userId: string,
    urlPhoto: string
}

export interface MusicAndGenreOutputDTO {
    music: MusicOutputDTO,
    genre: string[]
}
export class Music {
    constructor(
        private id: string,
        private title: string,
        private author: string,
        private date: Date,
        private file: string,
        private album: string,
        private urlPhoto: string
    ) { }

    static toMusicModel(music: any): Music {
        return new Music(music.id, music.title, music.author, music.date, music.file, music.album, music.urlPhoto);
    }
}