import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import AppController from './app.controller';
import AppService from './app.service';
import PostsModule from './posts/post.module';
import UserModule from './users/user.module';
import Post from './posts/entities/post';
import { User } from './users/user.entitie';

@Module({
    imports: [
        PostsModule,
        UserModule,
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: 'Bandapixels1!',
            database: 'blog2',
            entities: [Post, User],
            synchronize: true,
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export default class AppModule {}
