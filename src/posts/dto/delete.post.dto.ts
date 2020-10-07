import { IsJWT, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { DeepPartial } from 'typeorm';

export default class DeletePostDto {
    constructor(data: DeepPartial<DeletePostDto>) {
        Object.assign(this, data);
    }

    @IsNotEmpty()
    @IsString()
    id!: number;

    @IsNotEmpty()
    @IsString()
    user_id!: number;

    @IsNotEmpty()
    @IsJWT()
    @MinLength(50)
    @MaxLength(200)
    accessToken!: string;
}
