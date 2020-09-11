import { MusicBusiness } from './../business/MusicBusiness';
import { Request, Response } from 'express';
import { MusicInputDTO } from "../model/Music";
import { IdGenerator } from '../services/IdGenerator';
import { MusicDatabase } from '../data/MusicDatabase';
import { Authenticator } from '../services/Authenticator';
import { BaseDatabase } from '../data/BaseDatabase';
import { GenreDatabase } from '../data/GenreDatabase';

export class MusicController {
    private static musicBusiness = new MusicBusiness(
        new MusicDatabase(),
        new GenreDatabase(),
        new IdGenerator(),
        new Authenticator())

    async createMusic(req: Request, res: Response) {
        try {
            const input: MusicInputDTO = {
                title: req.body.title,
                author: req.body.author,
                date: req.body.date,
                file: req.body.file,
                album: req.body.album
            }


            const genre = req.body.genre
            const token = req.headers.authorization as string

            const result = await MusicController.musicBusiness.createMusic(input, genre, token)

            res.status(200).send("Music created successfully")

        } catch (error) {
            res.status(error.errorCode || 400).send({ message: error.message });
        }

        await BaseDatabase.destroyConnection()
    }
}

