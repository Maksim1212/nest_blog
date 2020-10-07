import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { DeepPartial } from 'typeorm';

export default class LikePostDto {
    constructor(data: DeepPartial<LikePostDto>) {
        Object.assign(this, data);
    }

    @IsNotEmpty()
    @IsString()
    post_id!: number;

    @IsNotEmpty()
    @IsString()
    user_id!: number;

    @IsNotEmpty()
    @IsString()
    @MinLength(50)
    @MaxLength(200)
    accessToken!: string;
}
