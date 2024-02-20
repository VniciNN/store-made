import { Controller, Post } from "@nestjs/common";

@Controller('/users')
export class userController {
    
    @Post()
    async saveUser() {
        return 'user created!'
    }

}