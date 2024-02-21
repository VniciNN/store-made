import { Injectable } from "@nestjs/common";
import { UserEntity } from "./user.entity";

@Injectable()
export class UserRepository {
    private users: UserEntity[] = [];

    async saveNewUser(user: UserEntity) {
        this.users.push(user);
        console.log(this.users)
    }

    async showUsers() {
        return this.users;
    }

    async userExists(email: string) { 
        const possibleUser = this.users.find((user) => user.email === email);

        return possibleUser !== undefined;
    }
}