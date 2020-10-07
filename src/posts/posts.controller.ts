import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { validateOrReject } from 'class-validator';
import { DeepPartial } from 'typeorm';
import { Response } from 'express';

import PostService from './post.service';
import CreatePostDto from './dto/create.post.dto';

@Controller('posts')
export default class PostsController {
    constructor(private readonly postService: PostService) {}

    @Get()
    async findAll(@Res() res: Response): Promise<Response> {
        const posts = await this.postService.findAll();
        return res.json({ posts });
    }

    // @Post()
    // async create(@Body() newPost: DeepPartial<CreatePostDto>): Promise<Response> {
    //     await validateOrReject(new CreatePostDto(newPost));
    //     return this.postService.cretePost(newPost);
    // }
}
