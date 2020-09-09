import { Authenticator } from './../services/Authenticator';
import { InvalidParameterError } from './../error/InvalidParameterError';
import { HashManager } from './../services/HashManager';
import { IdGenerator } from './../services/IdGenerator';
import { UserInputDTO } from './../model/User';
import { UserDatabase } from '../data/UserDatabase';

export class UserBusiness {
    async createUser(input: UserInputDTO) {
        if (!input.name || !input.nickname || !input.email || !input.password) {
            throw new InvalidParameterError("Fill all the blanks")
        }

        if (input.password.length < 6) {
            throw new Error("Your password must be at least 6 characters")
        }

        const idGenerator = new IdGenerator()
        const id = idGenerator.generate()

        const hashManager = new HashManager()
        const hashPassword = await hashManager.hash(input.password)

        const userDatabase = new UserDatabase()
        await userDatabase.createUser(id, input.name, input.nickname, input.email, hashPassword)

        const authenticator = new Authenticator()
        const token = authenticator.generateToken({ id })

        return token;
    }
}