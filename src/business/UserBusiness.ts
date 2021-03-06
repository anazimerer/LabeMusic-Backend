import { UserDatabase } from './../data/UserDatabase';
import { GenericError } from './../error/GenericError';
import { NotFoundError } from './../error/NotFoundError';
import { InvalidParameterError } from './../error/InvalidParameterError';
import { Authenticator } from './../services/Authenticator';
import { HashManager } from './../services/HashManager';
import { IdGenerator } from './../services/IdGenerator';
import { UserInputDTO, LoginInputDTO, User } from './../model/User';

export class UserBusiness {
    constructor(
        private userDatabase: UserDatabase,
        private idGenerator: IdGenerator,
        private hashManager: HashManager,
        private authenticator: Authenticator
    ) { }
    async createUser(input: UserInputDTO): Promise<string> {
        if (!input.name || !input.nickname || !input.email || !input.password) {
            throw new InvalidParameterError("Fill all the blanks")
        }

        if (input.password.length < 6) {
            throw new GenericError("Your password must be at least 6 characters")
        }

        if (input.email.indexOf('@') === -1) {
            throw new InvalidParameterError("Invalid email")

        }

        const id: string = this.idGenerator.generate()
        const hashPassword = await this.hashManager.hash(input.password)
        await this.userDatabase.createUser(id, input.name, input.nickname, input.email, hashPassword)
        const token: string = this.authenticator.generateToken({ id })

        return token;
    }

    async getUser(input: LoginInputDTO): Promise<string> {
        if ((!input.email && !input.nickname) || !input.password) {
            throw new InvalidParameterError("Requires email or nickname and password")
        }

        if (input.email && input.email.indexOf('@') === -1) {
            throw new InvalidParameterError("Invalid email")

        }

        const userFromDb: User = await this.userDatabase.getUser(input.nickname, input.email)

        if (!userFromDb) {
            throw new NotFoundError("User not found")
        }

        const passwordIsCorrect: boolean = await this.hashManager.compare(input.password, userFromDb.getPassword())

        if (!passwordIsCorrect) {
            throw new NotFoundError("Incorrect password")
        }

        const token: string = this.authenticator.generateToken({ id: userFromDb.getId() })

        if (!token) {
            throw new NotFoundError("User not found")
        }

        return token;

    }
}