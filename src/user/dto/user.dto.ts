import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { EmailIsUnic } from "../validation/email-is-unic";

export class UserDTO {
    
    @IsNotEmpty({message: 'The name can not be empty'})
    name: string;
    
    @IsEmail(undefined, {message: 'Email is invalid'})
    @EmailIsUnic({message: 'A user have been created with this email'})
    email: string;

    @MinLength(6, {message: 'Password must be 6 characters long'})
    password: string;
}