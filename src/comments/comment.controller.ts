import { Response } from 'express';
import { Body, Controller, Delete, Get, Post, Put, Query, Res } from '@nestjs/common';
import { validateOrReject } from 'class-validator';
import { DeepPartial } from 'typeorm';

import LikesDataInterface from 'src/posts/interfaces/likes.data.interface';
import CommentService from './comment.service';
import JWTCheckerInterface from '../interfaces/jwt.checker.interface';
import PermissionCheckerInterface from '../interfaces/permission.checker.interface';
import CreateCommentDto from './dto/create.comment.dto';
import LikeCommentDto from './dto/like.comment.dto';
import DeleteCommentDto from './dto/delete.comment.dto';

const errorMessage = 'wrong token';
const forbiddenMessage = 'you are do not have permissions to perform this operation';

@Controller('comments')
export default class CommentController {
    constructor(
        private readonly commentService: CommentService,
        // private readonly jwtChecker: JWTCheckerInterface,
        // private readonly permissionChecker: PermissionCheckerInterface,
    ) {}

    @Get('/')
    private async findAll(@Res() res: Response): Promise<Response> {
        const comments = await this.commentService.findAll();
        return res.status(200).json(comments);
    }

    // @Post('/create')
    // private async create(@Body() newComment: DeepPartial<CreateCommentDto>, @Res() res: Response): Promise<Response> {
    //     await validateOrReject(new CreateCommentDto(newComment));
    //     const isAuth = await this.jwtChecker.isAuthJWT(newComment.accessToken);
    //     if (isAuth) {
    //         await this.commentService.create(newComment);
    //         return res.status(200).json({
    //             message: 'comment added successfully',
    //         });
    //     }
    //     return res.status(401).json(errorMessage);
    // }

    @Get('/:id')
    private async findByPostId(@Query('id') id: number, @Res() res: Response): Promise<Response> {
        const comments = await this.commentService.findByPostId(id);
        return res.status(200).json(comments);
    }

    @Put('/like')
    private async addLike(@Body() likePost: DeepPartial<LikeCommentDto>, @Res() res: Response): Promise<Response> {
        await validateOrReject(new LikeCommentDto(likePost));
        const commentData = await this.commentService.findOrfail(likePost.id);
        let like: string;
        const likes = [];
        if (commentData.likes !== null) {
            like = commentData.likes.find(id => id === `${likePost.user_id}`);
            likes.push(...commentData.likes);
        }
        if (like === undefined) {
            likes.push(likePost.user_id);
            const likesData: LikesDataInterface = { likes };
            await this.commentService.updateComment(likePost.id, likesData);
            const data = await this.commentService.findOrfail(likePost.id);
            return res.status(200).json({ data });
        }

        return res.status(200).json({
            message: 'you have already liked this comment',
        });
    }

    // @Delete('/')
    // private async deleteById(
    //     @Body() deleteComment: DeepPartial<DeleteCommentDto>,
    //     @Res() res: Response,
    // ): Promise<Response> {
    //     const isAuth = await this.jwtChecker.isAuthJWT(deleteComment.accessToken);
    //     if (!isAuth) {
    //         return res.status(401).json(errorMessage);
    //     }
    //     const comment = await this.commentService.findOrfail(deleteComment.id);

    //     const isAdmin = await this.permissionChecker.isAdmin(deleteComment.user_id);

    //     if (isAdmin || comment.author_id === deleteComment.user_id) {
    //         await this.commentService.deleteById(deleteComment.id);
    //         return res.status(200).json({
    //             message: 'comment deleted successfully',
    //         });
    //     }

    //     return res.status(403).json(forbiddenMessage);
    // }
}
