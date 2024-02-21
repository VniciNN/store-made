import { ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator } from "class-validator";
import { UserRepository } from "../user.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
@ValidatorConstraint({async: true})
export class EmailIsUnicValidator implements ValidatorConstraintInterface {
    
    constructor(private userRepository: UserRepository) {}
    
    async validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> {
        console.log(value)
        const userWithEmailExist = await this.userRepository.userExists(value)
        return !userWithEmailExist;
    };
};

export const EmailIsUnic = (validationsOption: ValidationOptions) => {
    return (object: object, prop: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName: prop,
            options: validationsOption,
            constraints: [],
            validator: EmailIsUnicValidator,
        });
    } ;
};