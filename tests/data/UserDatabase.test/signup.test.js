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
const UserBusiness_1 = require("../../../src/business/UserBusiness");
describe('Testing signup function', () => {
    let userDatabase = {
        createUser: jest.fn((user) => { })
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
    test('Should return error when empty name', () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions(1);
        const userBusiness = new UserBusiness_1.UserBusiness(userDatabase, idGenerator, hashManager, authenticator);
        const input = {
            name: "",
            nickname: "teste nickname",
            email: "teste@gmail.com",
            password: "123456"
        };
        try {
            yield userBusiness.createUser(input);
        }
        catch (error) {
            expect(error.message).toEqual("Fill all the blanks");
        }
    }));
    test('Should return error when empty nickname', () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions(1);
        const userBusiness = new UserBusiness_1.UserBusiness(userDatabase, idGenerator, hashManager, authenticator);
        const input = {
            name: "Teste",
            nickname: "",
            email: "teste@gmail.com",
            password: "123456"
        };
        try {
            yield userBusiness.createUser(input);
        }
        catch (error) {
            expect(error.message).toEqual("Fill all the blanks");
        }
    }));
    test('Should return error when empty email', () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions(1);
        const userBusiness = new UserBusiness_1.UserBusiness(userDatabase, idGenerator, hashManager, authenticator);
        const input = {
            name: "Teste",
            nickname: "teste nickname",
            email: "",
            password: "123456"
        };
        try {
            yield userBusiness.createUser(input);
        }
        catch (error) {
            expect(error.message).toEqual("Fill all the blanks");
        }
    }));
    test('Should return error when empty password', () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions(1);
        const userBusiness = new UserBusiness_1.UserBusiness(userDatabase, idGenerator, hashManager, authenticator);
        const input = {
            name: "Teste",
            nickname: "nickname",
            email: "teste@gmail.com",
            password: ""
        };
        try {
            yield userBusiness.createUser(input);
        }
        catch (error) {
            expect(error.message).toEqual("Fill all the blanks");
        }
    }));
    test('Should return error when email is not valid', () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions(1);
        const userBusiness = new UserBusiness_1.UserBusiness(userDatabase, idGenerator, hashManager, authenticator);
        const input = {
            name: "Teste",
            nickname: "nickname",
            email: "gmail.com",
            password: "123456"
        };
        try {
            yield userBusiness.createUser(input);
        }
        catch (error) {
            expect(error.message).toEqual("Invalid email");
        }
    }));
    test('Should return error when password is incorrect', () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions(1);
        const userBusiness = new UserBusiness_1.UserBusiness(userDatabase, idGenerator, hashManager, authenticator);
        const input = {
            name: "Teste",
            nickname: "nickname",
            email: "gmail.com",
            password: "22"
        };
        try {
            yield userBusiness.createUser(input);
        }
        catch (error) {
            expect(error.message).toEqual("Your password must be at least 6 characters");
        }
    }));
    test('Should return access token before create user', () => __awaiter(void 0, void 0, void 0, function* () {
        const userBusiness = new UserBusiness_1.UserBusiness(userDatabase, idGenerator, hashManager, authenticator);
        const input = {
            name: "Teste",
            nickname: "nickname",
            email: "teste.zimerer@gmail.com",
            password: "123456"
        };
        yield userBusiness.createUser(input);
        expect(hashManager.hash).toBeCalled();
        expect(userDatabase.createUser).toBeCalledWith("id", "Teste", "nickname", "teste.zimerer@gmail.com", "hash");
        expect(authenticator.generateToken).toHaveReturnedWith("token");
    }));
});
