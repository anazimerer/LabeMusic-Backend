export interface GenreInputDTO {
    id: string[],
    name: GenreName
}

export interface GenreNameInputAndOutputDTO {
    genreNames: string[]
}

export interface GenreIdInputAndOutputDTO {
    genreIds: string[]
}

export interface InsertGenreToMusicInputDTO {
    musicId: string,
    genreIds: GenreIdInputAndOutputDTO
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
