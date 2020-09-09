import { UserDatabase } from './../data/UserDatabase';
import { GenericError } from './../error/GenericError';
import { NotFoundError } from './../error/NotFoundError';
import { InvalidParameterError } from './../error/InvalidParameterError';
import { Authenticator } from './../services/Authenticator';
import { HashManager } from './../services/HashManager';
import { IdGenerator } from './../services/IdGenerator';
import { UserInputDTO, LoginInputDTO, User } from './../model/User';

export class UserBusiness {
    async createUser(input: UserInputDTO) {
        if (!input.name || !input.nickname || !input.email || !input.password) {
            throw new InvalidParameterError("Fill all the blanks")
        }

        if (input.password.length < 6) {
            throw new GenericError("Your password must be at least 6 characters")
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

    async getUser(input: LoginInputDTO) {
        if ((!input.email && !input.nickname) || !input.password) {
            throw new InvalidParameterError("Requires email or nickname and password")
        }

        const userDatabase = new UserDatabase();
        const userFromDb: User = await userDatabase.getUser(input.nickname, input.email)

        const hashManager = new HashManager()
        const passwordIsCorrect = await hashManager.compare(input.password, userFromDb.getPassword())

        if (!passwordIsCorrect) {
            throw new NotFoundError("Incorrect password")
        }

        const authenticator = new Authenticator()
        const token = authenticator.generateToken({ id: userFromDb.getId() })

        if (!token) {
            throw new NotFoundError("User not fond")
        }

        return token;

    }
}