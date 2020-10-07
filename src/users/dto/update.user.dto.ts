import { IsNotEmpty, IsString, MaxLength, MinLength, IsEmail } from 'class-validator';
import { DeepPartial } from 'typeorm';

export default class UpdateUserDto {
    constructor(data: DeepPartial<UpdateUserDto>) {
        Object.assign(this, data);
    }

    @IsNotEmpty()
    @IsEmail()
    email!: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(30)
    password!: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(30)
    newPassword!: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(100)
    @MaxLength(200)
    accessToken!: string;
}
