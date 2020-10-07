import { IsNotEmpty, IsString, MaxLength, MinLength, IsEmail } from 'class-validator';
import { DeepPartial } from 'typeorm';

export default class CreateUserDto {
    constructor(data: DeepPartial<CreateUserDto>) {
        Object.assign(this, data);
    }

    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    @MaxLength(30)
    name!: string;

    @IsNotEmpty()
    @IsEmail()
    email!: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(30)
    password!: string;
}