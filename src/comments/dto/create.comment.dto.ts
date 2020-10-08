import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { DeepPartial } from 'typeorm';

export default class CreateCommentDto {
    constructor(data: DeepPartial<CreateCommentDto>) {
        Object.assign(this, data);
    }

    @IsNotEmpty()
    @IsString()
    author_id!: number;

    @IsNotEmpty()
    @IsString()
    post_id!: number;

    @IsNotEmpty()
    @IsString()
    @MinLength(1)
    @MaxLength(1000)
    body!: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(50)
    @MaxLength(200)
    accessToken!: string;
}
