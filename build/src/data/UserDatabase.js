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
exports.UserDatabase = void 0;
const BaseDatabase_1 = require("./BaseDatabase");
const User_1 = require("../model/User");
class UserDatabase extends BaseDatabase_1.BaseDatabase {
    createUser(id, name, nickname, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.getConnection()
                    .insert({
                    id,
                    name,
                    nickname,
                    email,
                    password
                })
                    .into(UserDatabase.TABLE_NAME);
            }
            catch (error) {
                throw new Error(error.sqlMessage || error.message);
            }
        });
    }
    getUser(nickname, email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!email) {
                    const result = yield this.getConnection()
                        .select("*")
                        .from(UserDatabase.TABLE_NAME)
                        .where({ nickname });
                    return User_1.User.toUserModel(result[0]);
                }
                else {
                    const result = yield this.getConnection()
                        .select("*")
                        .from(UserDatabase.TABLE_NAME)
                        .where({ email });
                    return User_1.User.toUserModel(result[0]);
                }
            }
            catch (error) {
                throw new Error(error.sqlMessage || error.message);
            }
        });
    }
}
exports.UserDatabase = UserDatabase;
UserDatabase.TABLE_NAME = "labemusic_user";
