import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import CommentController from './comment.controller';
import CommentService from './comment.service';
import Comment from './comment.entity';

@Module({
    controllers: [CommentController],
    providers: [CommentService],
    imports: [TypeOrmModule.forFeature([Comment])],
})
export default class CommentModule {}
