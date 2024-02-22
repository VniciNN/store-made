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

    private findById(id: string) {
        const possibleUser = this.users.find(
            userSaved => userSaved.id === id
        );

        if(!possibleUser) {
            throw new Error('User not found')
        }
        return possibleUser;
    }

    async update(id: string, updateData: Partial<UserEntity>) {
        const user = this.findById(id)

        Object.entries(updateData).forEach(([chave, valor]) => {
            if(chave === 'id') {
                return;
            }

            user[chave] = valor
        })

        return user;

    }

    async delete(id: string) {
        const user = this.findById(id);
        this.users = this.users.filter(
            user => user.id !== id
        )
        
        return user;
    }
}