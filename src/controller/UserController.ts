import { BaseDatabase } from './../data/BaseDatabase';
import { User, UserInputDTO } from './../model/User';
import { Request, Response } from 'express'
import { UserBusiness } from '../business/UserBusiness';

export class UserController {
    async signup(req: Request, res: Response): Promise<void> {
        try {
            const input: UserInputDTO = {
                name: req.body.name,
                nickname: req.body.nickname,
                email: req.body.email,
                password: req.body.password
            }

            const userBusiness = new UserBusiness
            const token = await userBusiness.createUser(input)

            res.status(200).send({ token })
        } catch (error) {
            res.status(error.errorCode || 400).send({ message: error.message });
        }

        await BaseDatabase.destroyConnection()
    }
}