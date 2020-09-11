export interface GenreInputDTO {
    id: string,
    name: GenreName
}

export interface MusicInputDTO {
    title: string,
    author: string,
    date: Date,
    file: string,
    album: string
}
export enum GenreName {
    AXÉ = "AXÉ",
    FUNK = "FUNK",
    SERTANEJO = "SERTANEJO",
    MPB = "MPB",
    ROCK = "ROCK",
    HIPHOP = "HIP HOP",
    CLASSICA = "CLÁSSICA",
    GROOVE = "GROOVE",
    RAP = "RAP",
    REGGAE = "REGGAE",
    SAMBA = "SAMBA",
    FORRÓ = "FORRÓ",
    OUTRO = "OUTRO"
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