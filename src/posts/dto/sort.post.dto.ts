import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { DeepPartial } from 'typeorm';

export default class SortPostDto {
    constructor(data: DeepPartial<SortPostDto>) {
        Object.assign(this, data);
    }

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(4)
    parametr!: string;
}
