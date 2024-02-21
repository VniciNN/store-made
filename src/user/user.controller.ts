import { Body, Controller, Get, Post } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { UserDTO } from "./dto/user.dto";
import { UserEntity } from "./user.entity";
import { v4 as uuid } from 'uuid';
import { ListUserDTO } from "./dto/listUser.dto";

@Controller('/users')
export class UserController {
    
    constructor(private userRepository: UserRepository) {}

    @Post()
    async saveUser(@Body() userData: UserDTO) {
        const userEntity = new UserEntity;
        userEntity.email = userData.email;
        userEntity.name = userData.name;
        userEntity.password = userData.password;
        userEntity.id = uuid();
        this.userRepository.saveNewUser(userEntity);
        return { id: userEntity.id, message: 'Usuário criado com sucesso' };
    }

    @Get()
    async showUsers() {
        const users = await this.userRepository.showUsers();
        const listUsers = users.map(
            user => new ListUserDTO(
                user.id,
                user.name
            )
        )

        return listUsers;
    }
}