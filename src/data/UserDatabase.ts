import { LoginInputDTO } from './../model/User';
import { BaseDatabase } from './BaseDatabase';
import { User } from '../model/User';

export class UserDatabase extends BaseDatabase {
    public static TABLE_NAME = "labemusic_user"

    public async createUser(
        id: string,
        name: string,
        nickname: string,
        email: string,
        password: string
    ): Promise<void> {
        try {
            await this.getConnection()
                .insert({
                    id,
                    name,
                    nickname,
                    email,
                    password
                })
                .into(UserDatabase.TABLE_NAME)
        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    public async getUser(
        nickname?: string,
        email?: string
    ): Promise<any> {
        try {
            if (!email) {
                const result = await this.getConnection()
                    .select("*")
                    .from(UserDatabase.TABLE_NAME)
                    .where({ nickname })
                return User.toUserModel(result[0]);
            } else {
                const result = await this.getConnection()
                    .select("*")
                    .from(UserDatabase.TABLE_NAME)
                    .where({ email })
                return User.toUserModel(result[0]);
            }

        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }
}