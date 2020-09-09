import { BaseDatabase } from './../data/BaseDatabase';
import { User, UserInputDTO, LoginInputDTO } from './../model/User';
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

    async login(req: Request, res: Response): Promise<void> {
        try {
            const input: LoginInputDTO = {
                email: req.body.email,
                nickname: req.body.nickname,
                password: req.body.password
            }

            const userBusiness = new UserBusiness()
            const token = await userBusiness.getUser(input)

            if (!token) {
                throw new Error("Invalid login")
            }

            res.status(200).send({ token })
        } catch (error) {
            res.status(error.errorCode || 400).send({ message: error.message });
        }
    }
}