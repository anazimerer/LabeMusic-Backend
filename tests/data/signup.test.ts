import { User } from './../../src/model/User';
import { UserBusiness } from '../../src/business/UserBusiness';
import { HashManager } from '../../src/services/HashManager';
import { UserInputDTO } from '../../src/model/User';
import { hash } from 'bcryptjs';

describe('Testing signup function', () => {
    let userDatabase = {
        createUser: jest.fn((user: User) => { })
    };

    let idGenerator = {
        generate: jest.fn(() => "id")
    };

    let hashManager = {
        hash: jest.fn(() => "hash")
    };

    let authenticator = {
        generateToken: jest.fn(() => "token")
    };

    test('Should return error when empty name', async () => {
        expect.assertions(1);
        const userBusiness = new UserBusiness(
            userDatabase as any,
            idGenerator as any,
            hashManager as any,
            authenticator as any
        )

        const input: UserInputDTO = {
            name: "",
            nickname: "teste nickname",
            email: "teste@gmail.com",
            password: "123456"
        }

        try {
            await userBusiness.createUser(input)
        } catch (error) {
            expect(error.message).toEqual("Fill all the blanks")
        }
    });

    test('Should return error when empty nickname', async () => {
        expect.assertions(1);
        const userBusiness = new UserBusiness(
            userDatabase as any,
            idGenerator as any,
            hashManager as any,
            authenticator as any
        )

        const input: UserInputDTO = {
            name: "Teste",
            nickname: "",
            email: "teste@gmail.com",
            password: "123456"
        }

        try {
            await userBusiness.createUser(input)
        } catch (error) {
            expect(error.message).toEqual("Fill all the blanks")
        }
    });

    test('Should return error when empty email', async () => {
        expect.assertions(1);
        const userBusiness = new UserBusiness(
            userDatabase as any,
            idGenerator as any,
            hashManager as any,
            authenticator as any
        )

        const input: UserInputDTO = {
            name: "Teste",
            nickname: "teste nickname",
            email: "",
            password: "123456"
        }

        try {
            await userBusiness.createUser(input)
        } catch (error) {
            expect(error.message).toEqual("Fill all the blanks")
        }
    });

    test('Should return error when empty password', async () => {
        expect.assertions(1);

        const userBusiness = new UserBusiness(
            userDatabase as any,
            idGenerator as any,
            hashManager as any,
            authenticator as any
        )

        const input: UserInputDTO = {
            name: "Teste",
            nickname: "nickname",
            email: "teste@gmail.com",
            password: ""
        }

        try {
            await userBusiness.createUser(input)
        } catch (error) {
            expect(error.message).toEqual("Fill all the blanks")
        }
    });

    test('Should return error when email is not valid', async () => {
        expect.assertions(1);

        const userBusiness = new UserBusiness(
            userDatabase as any,
            idGenerator as any,
            hashManager as any,
            authenticator as any
        )

        const input: UserInputDTO = {
            name: "Teste",
            nickname: "nickname",
            email: "gmail.com",
            password: "123456"
        }

        try {
            await userBusiness.createUser(input)
        } catch (error) {
            expect(error.message).toEqual("Invalid email")
        }
    });

    test('Should return error when password is incorrect', async () => {
        expect.assertions(1);

        const userBusiness = new UserBusiness(
            userDatabase as any,
            idGenerator as any,
            hashManager as any,
            authenticator as any
        )

        const input: UserInputDTO = {
            name: "Teste",
            nickname: "nickname",
            email: "gmail.com",
            password: "22"
        }
        try {
            await userBusiness.createUser(input)
        } catch (error) {
            expect(error.message).toEqual("Your password must be at least 6 characters")

        }
    });

    test('Should return access token before create user', async () => {

        const userBusiness = new UserBusiness(
            userDatabase as any,
            idGenerator as any,
            hashManager as any,
            authenticator as any
        )

        const input: UserInputDTO = {
            name: "Teste",
            nickname: "nickname",
            email: "teste.zimerer@gmail.com",
            password: "123456"
        }

        await userBusiness.createUser(input)
        expect(hashManager.hash).toBeCalled()
        expect(userDatabase.createUser).toBeCalledWith(
            "id", "Teste", "nickname", "teste.zimerer@gmail.com", "hash")
        expect(authenticator.generateToken).toHaveReturnedWith("token")
    });
});

