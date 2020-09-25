"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserBusiness_1 = require("./../../../src/business/UserBusiness");
describe("Testing login function", () => {
    let userDatabase = {
        getUser: jest.fn((email, nickname) => { return undefined; })
    };
    let idGenerator = {
        generate: jest.fn(() => "id")
    };
    let hashManager = {
        hash: jest.fn(() => "hash"),
        compare: jest.fn((password, UserPassword) => false)
    };
    let authenticator = {
        generateToken: jest.fn(() => "token")
    };
    test('Should return error if empty nickname and email', () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions(1);
        const userBusiness = new UserBusiness_1.UserBusiness(userDatabase, idGenerator, hashManager, authenticator);
        const input = {
            nickname: "",
            email: "",
            password: "123456"
        };
        try {
            yield userBusiness.getUser(input);
        }
        catch (error) {
            expect(error.message).toEqual("Requires email or nickname and password");
        }
    }));
    test('Should return error if empty password', () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions(1);
        const userBusiness = new UserBusiness_1.UserBusiness(userDatabase, idGenerator, hashManager, authenticator);
        const input = {
            nickname: "teste",
            email: "teste@teste.com",
            password: ""
        };
        try {
            yield userBusiness.getUser(input);
        }
        catch (error) {
            expect(error.message).toEqual("Requires email or nickname and password");
        }
    }));
    test('Should return error when user is not found', () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions(2);
        try {
            const userBusiness = new UserBusiness_1.UserBusiness(userDatabase, idGenerator, hashManager, authenticator);
            const input = {
                nickname: "notfound",
                email: "notfound@teste.com",
                password: "123456"
            };
            yield userBusiness.getUser(input);
        }
        catch (error) {
            expect(error.message).toEqual("User not found");
            expect(userDatabase.getUser).toHaveBeenCalledWith("notfound", "notfound@teste.com");
        }
    }));
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
});
