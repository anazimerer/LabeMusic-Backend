"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Music = void 0;
class Music {
    constructor(id, title, author, date, file, album, urlPhoto) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.date = date;
        this.file = file;
        this.album = album;
        this.urlPhoto = urlPhoto;
    }
    static toMusicModel(music) {
        return new Music(music.id, music.title, music.author, music.date, music.file, music.album, music.urlPhoto);
    }
}
exports.Music = Music;
