import { Body, Controller, Get, Post } from "@nestjs/common";
import { UserRepository } from "./user.repository";

@Controller('/users')
export class UserController {
    
    constructor(private userRepository: UserRepository) {}

    @Post()
    async saveUser(@Body() userData) {
        this.userRepository.saveNewUser(userData);
        return userData;
    }

    @Get()
    async showUsers() {
        return this.userRepository.showUsers();
    }
}