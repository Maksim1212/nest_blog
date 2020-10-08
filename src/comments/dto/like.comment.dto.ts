import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { DeepPartial } from 'typeorm';

export default class LikeCommentDto {
    constructor(data: DeepPartial<LikeCommentDto>) {
        Object.assign(this, data);
    }

    @IsNotEmpty()
    @IsString()
    id!: number;

    @IsNotEmpty()
    @IsString()
    user_id!: number;

    @IsNotEmpty()
    @IsString()
    @MinLength(50)
    @MaxLength(200)
    accessToken!: string;
}
