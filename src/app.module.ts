import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import AppController from './app.controller';
import AppService from './app.service';
import PostsModule from './posts/post.module';
import Post from './posts/entities/post';

// import { Connection } from 'typeorm';

@Module({
    imports: [
        PostsModule,
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: 'Bandapixels1!',
            database: 'blog',
            entities: [Post],
            synchronize: true,
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export default class AppModule {}
