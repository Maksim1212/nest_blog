import { Response } from 'express';
import { Body, Controller, Delete, Get, Post, Put, Query, Res } from '@nestjs/common';
import { validateOrReject } from 'class-validator';
import { DeepPartial } from 'typeorm';

import PostService from './post.service';
import JWTCheckerInterface from '../interfaces/jwt.checker.interface';
import PermissionCheckerInterface from '../interfaces/permission.checker.interface';
import CreatePostDto from './dto/create.post.dto';
import UpdatePostDto from './dto/update.post.dto';
import DeletePostDto from './dto/delete.post.dto';
import LikePostDto from './dto/like.post.dto';
import LikesDataInterface from './interfaces/likes.data.interface';
import SortPostDto from './dto/sort.post.dto';

const errorMessage = 'wrong token';
const forbiddenMessage = 'you are do not have permissions to perform this operation';

@Controller('posts')
export default class PostsController {
    constructor(
        private readonly postService: PostService,
        private readonly jwtChecker: JWTCheckerInterface,
        private readonly permissionChecker: PermissionCheckerInterface,
    ) {}

    @Get()
    async findAll(@Res() res: Response): Promise<Response> {
        const posts = await this.postService.findAll();
        return res.json(posts);
    }

    @Post()
    async create(@Body() newPost: DeepPartial<CreatePostDto>, @Res() res: Response): Promise<Response> {
        await validateOrReject(new CreatePostDto(newPost));
        const results = await this.postService.cretePost(newPost);
        return res.json(results);
    }

    @Get('/:id')
    async findById(@Query('id') id: number, @Res() res: Response): Promise<Response> {
        const post = await this.postService.findByPostId(id);
        return res.status(200).json(post);
    }

    @Get('/user/:id')
    private async findByUserId(@Query('id') id: number, @Res() res: Response): Promise<Response> {
        const posts = await this.postService.findByUserId(id);
        return res.status(200).json(posts);
    }

    @Put('/update')
    private async updateById(@Body() updatePost: DeepPartial<UpdatePostDto>, @Res() res: Response): Promise<Response> {
        await validateOrReject(new UpdatePostDto(updatePost));
        const isAuth = await this.jwtChecker.isAuthJWT(updatePost.accessToken);
        if (!isAuth) {
            return res.status(401).json(errorMessage);
        }

        const post = await this.postService.findOrfail(updatePost.id);

        const isAdmin = await this.permissionChecker.isAdmin(updatePost.author_id);

        if (isAdmin || post.author_id === updatePost.author_id) {
            const postData = {
                body: updatePost.body,
                title: updatePost.title,
            };
            await this.postService.updatePostById(updatePost.id, postData);
            return res.status(200).json({
                message: 'post updated successfully',
            });
        }

        return res.status(403).json(forbiddenMessage);
    }

    @Delete('/')
    private async deleteById(@Body() deletePost: DeepPartial<DeletePostDto>, @Res() res: Response): Promise<Response> {
        await validateOrReject(new DeletePostDto(deletePost));
        const isAuth = await this.jwtChecker.isAuthJWT(deletePost.accessToken);
        if (!isAuth) {
            return res.status(401).json(errorMessage);
        }

        const post = await this.postService.findOrfail(deletePost.id);

        const isAdmin = await this.permissionChecker.isAdmin(deletePost.user_id);

        if (isAdmin || post.author_id === deletePost.user_id) {
            await this.postService.deletePost(deletePost.id);
            return res.status(200).json({
                message: 'post deleted successfully',
            });
        }

        return res.status(403).json(forbiddenMessage);
    }

    @Put('/like')
    private async addLike(@Body() likePost: DeepPartial<LikePostDto>, @Res() res: Response): Promise<Response> {
        await validateOrReject(new LikePostDto(likePost));
        const postData = await this.postService.findOrfail(likePost.post_id);
        let like: string;
        const likes = [];
        if (postData.likes !== null) {
            like = postData.likes.find(id => id === `${likePost.user_id}`);
            likes.push(...postData.likes);
        }
        if (like === undefined) {
            likes.push(likePost.user_id);
            const likesData: LikesDataInterface = { likes };
            await this.postService.updatePostById(likePost.post_id, likesData);
            const data = await this.postService.findByPostId(likePost.post_id);
            return res.status(200).json({ data });
        }

        return res.status(200).json({
            message: 'you have already liked this post',
        });
    }

    @Post('/sort')
    private async sort(@Body() sortPost: DeepPartial<SortPostDto>, @Res() res: Response): Promise<Response> {
        const sortingParametr = sortPost.parametr;
        const posts = await this.postService.sortByDate(sortingParametr);
        return res.status(200).json(posts);
    }

    @Post('/likes')
    private async sortByLikes(@Body() sortPost: DeepPartial<SortPostDto>, @Res() res: Response): Promise<Response> {
        const sortingParametr = sortPost.parametr;
        const posts = await this.postService.sortByLikes(sortingParametr);
        return res.status(200).json(posts);
    }
}
