import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import PostController from './posts.controller';
import PostsService from './post.service';
import Post from './entities/post';

@Module({
    controllers: [PostController],
    providers: [PostsService],
    imports: [TypeOrmModule.forFeature([Post])],
})
export default class PostsModule {}
