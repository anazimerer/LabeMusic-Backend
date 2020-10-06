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
exports.UserBusiness = void 0;
const GenericError_1 = require("./../error/GenericError");
const NotFoundError_1 = require("./../error/NotFoundError");
const InvalidParameterError_1 = require("./../error/InvalidParameterError");
class UserBusiness {
    constructor(userDatabase, idGenerator, hashManager, authenticator) {
        this.userDatabase = userDatabase;
        this.idGenerator = idGenerator;
        this.hashManager = hashManager;
        this.authenticator = authenticator;
    }
    createUser(input) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!input.name || !input.nickname || !input.email || !input.password) {
                throw new InvalidParameterError_1.InvalidParameterError("Fill all the blanks");
            }
            if (input.password.length < 6) {
                throw new GenericError_1.GenericError("Your password must be at least 6 characters");
            }
            if (input.email.indexOf('@') === -1) {
                throw new InvalidParameterError_1.InvalidParameterError("Invalid email");
            }
            const id = this.idGenerator.generate();
            const hashPassword = yield this.hashManager.hash(input.password);
            yield this.userDatabase.createUser(id, input.name, input.nickname, input.email, hashPassword);
            const token = this.authenticator.generateToken({ id });
            return token;
        });
    }
    getUser(input) {
        return __awaiter(this, void 0, void 0, function* () {
            if ((!input.email && !input.nickname) || !input.password) {
                throw new InvalidParameterError_1.InvalidParameterError("Requires email or nickname and password");
            }
            if (input.email && input.email.indexOf('@') === -1) {
                throw new InvalidParameterError_1.InvalidParameterError("Invalid email");
            }
            const userFromDb = yield this.userDatabase.getUser(input.nickname, input.email);
            if (!userFromDb) {
                throw new NotFoundError_1.NotFoundError("User not found");
            }
            const passwordIsCorrect = yield this.hashManager.compare(input.password, userFromDb.getPassword());
            if (!passwordIsCorrect) {
                throw new NotFoundError_1.NotFoundError("Incorrect password");
            }
            const token = this.authenticator.generateToken({ id: userFromDb.getId() });
            if (!token) {
                throw new NotFoundError_1.NotFoundError("User not found");
            }
            return token;
        });
    }
}
exports.UserBusiness = UserBusiness;
