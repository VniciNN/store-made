import { Injectable } from "@nestjs/common";

@Injectable()
export class UserRepository {
    private users = [];

    async saveNewUser(user) {
        this.users.push(user);
        console.log(this.users)
    }

    async showUsers() {
        return this.users;
    }
}