import { IsNotEmpty, IsString, MaxLength, MinLength, IsEmail } from 'class-validator';
import { DeepPartial } from 'typeorm';

export default class LoginUserDto {
    constructor(data: DeepPartial<LoginUserDto>) {
        Object.assign(this, data);
    }

    @IsNotEmpty()
    @IsEmail()
    email!: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(50)
    password!: string;
}