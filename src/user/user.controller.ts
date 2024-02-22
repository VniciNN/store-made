import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { UserDTO } from "./dto/user.dto";
import { UserEntity } from "./user.entity";
import { v4 as uuid } from 'uuid';
import { ListUserDTO } from "./dto/listUser.dto";
import { UpdateUserDTO } from "./dto/updateUser.dto";

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


    @Put('/:id')
    async updateUser(@Param('id') id: string, @Body() dataToUpdate: UpdateUserDTO) {
        const userUpdated = await this.userRepository.update(id, dataToUpdate)

        return {
            user: userUpdated,
            message: 'Usuário atualizado com sucesso'
        }
    }

    @Delete()
    async removeUser(@Param('id') id: string) {
        const userRemoved = await this.userRepository.delete(id);

        return {
            user: userRemoved,
            message: 'Usuário removido com sucesso'
        }
    }
}