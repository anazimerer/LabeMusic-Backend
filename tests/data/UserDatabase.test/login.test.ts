import { UserBusiness } from './../../../src/business/UserBusiness';
import { User, UserInputDTO, LoginInputDTO } from "../../../src/model/User";

describe("Testing login function", () => {
    let userDatabase = {
        getUser: jest.fn((email?: string, nickname?: string) => { return undefined })
    };

    let idGenerator = {
        generate: jest.fn(() => "id")
    };

    let hashManager = {
        hash: jest.fn(() => "hash"),
        compare: jest.fn((password: string, UserPassword: string) => false)
    };

    let authenticator = {
        generateToken: jest.fn(() => "token")
    };

    test('Should return error if empty nickname and email', async () => {
        expect.assertions(1)

        const userBusiness = new UserBusiness(
            userDatabase as any,
            idGenerator as any,
            hashManager as any,
            authenticator as any
        )

        const input: LoginInputDTO = {
            nickname: "",
            email: "",
            password: "123456"
        }

        try {
            await userBusiness.getUser(input)
        } catch (error) {
            expect(error.message).toEqual("Requires email or nickname and password")
        }
    })

    test('Should return error if empty password', async () => {
        expect.assertions(1)

        const userBusiness = new UserBusiness(
            userDatabase as any,
            idGenerator as any,
            hashManager as any,
            authenticator as any
        )

        const input: LoginInputDTO = {
            nickname: "teste",
            email: "teste@teste.com",
            password: ""
        }

        try {
            await userBusiness.getUser(input)
        } catch (error) {
            expect(error.message).toEqual("Requires email or nickname and password")
        }
    })

    test('Should return error when user is not found', async () => {
        expect.assertions(2)
        try {
            const userBusiness = new UserBusiness(
                userDatabase as any,
                idGenerator as any,
                hashManager as any,
                authenticator as any
            )

            const input: LoginInputDTO = {
                nickname: "notfound",
                email: "notfound@teste.com",
                password: "123456"
            }

            await userBusiness.getUser(input)
        } catch (error) {
            expect(error.message).toEqual("User not found")
            expect(userDatabase.getUser).toHaveBeenCalledWith("notfound", "notfound@teste.com")
        }
    })

    // test('Should return error when password is incorrect', async () => {
    //     expect.assertions(3)
    // 
    //     const userBusiness = new UserBusiness(
    //         userDatabase as any,
    //         idGenerator as any,
    //         hashManager as any,
    //         authenticator as any
    //     )
    // 
    //     const input: LoginInputDTO = {
    //         nickname: "teste",
    //         email: "teste@teste.com",
    //         password: "123455"
    //     }
    // 
    //     let getUser = jest.fn((email?: string, nickname?: string) => {
    //         return new User(
    //             "id",
    //             "Teste",
    //             "teste",
    //             "teste@teste.com",
    //             "123455"
    //         )
    //     })
    // 
    //     try {
    //         userDatabase = { getUser }
    //         await userBusiness.getUser(input)
    // 
    //     } catch (error) {
    //         expect(error.message).toEqual("Incorrect password")
    //         expect(getUser).toHaveBeenCalledWith("teste@teste.com", "teste")
    //         expect(hashManager.compare).toHaveBeenCalledWith('123455', '123456')
    //     }
    // })
})