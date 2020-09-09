export class User {
    constructor(
        private id: string,
        private name: string,
        private nickname: string,
        private email: string,
        private password: string,
    ) { }

    getId() {
        return this.id;
    }

    getName() {
        return this.name
    }

    getNickname() {
        return this.nickname
    }

    getEmail() {
        return this.email;
    }

    getPassword() {
        return this.password;
    }

    setId(id: string) {
        this.id = id;
    }

    setName(name: string) {
        this.name = name;
    }

    setNickname(name: string) {
        this.name = name;
    }

    setEmail(email: string) {
        this.email = email;
    }

    setPassword(password: string) {
        this.password = password;
    }

    static toUserModel(user: any): User {
        return new User(user.id, user.name, user.nickname, user.email, user.password);
    }
}

export interface UserInputDTO {
    email: string;
    password: string;
    name: string;
    nickname: string;
}

export interface LoginInputDTO {
    email?: string;
    nickname?: string;
    password: string;
}