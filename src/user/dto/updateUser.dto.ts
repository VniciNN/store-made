import { IsEmail, IsNotEmpty, IsOptional, MinLength } from "class-validator";
import { EmailIsUnic } from "../validation/email-is-unic";

export class UpdateUserDTO {
    
    @IsNotEmpty({message: 'The name can not be empty'})
    @IsOptional()
    name: string;
    
    @IsEmail(undefined, {message: 'Email is invalid'})
    @EmailIsUnic({message: 'A user have been created with this email'})
    @IsOptional()
    email: string;

    @MinLength(6, {message: 'Password must be 6 characters long'})
    @IsOptional()
    password: string;
}