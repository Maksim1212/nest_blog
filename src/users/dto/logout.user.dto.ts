import { IsNotEmpty, IsNumber } from 'class-validator';
import { DeepPartial } from 'typeorm';

export default class LogoutUserDto {
    constructor(data: DeepPartial<LogoutUserDto>) {
        Object.assign(this, data);
    }

    @IsNotEmpty()
    @IsNumber()
    user_id!: number;
}