"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(id, name, nickname, email, password) {
        this.id = id;
        this.name = name;
        this.nickname = nickname;
        this.email = email;
        this.password = password;
    }
    getId() {
        return this.id;
    }
    getName() {
        return this.name;
    }
    getNickname() {
        return this.nickname;
    }
    getEmail() {
        return this.email;
    }
    getPassword() {
        return this.password;
    }
    setId(id) {
        this.id = id;
    }
    setName(name) {
        this.name = name;
    }
    setNickname(name) {
        this.name = name;
    }
    setEmail(email) {
        this.email = email;
    }
    setPassword(password) {
        this.password = password;
    }
    static toUserModel(user) {
        return new User(user.id, user.name, user.nickname, user.email, user.password);
    }
}
exports.User = User;
