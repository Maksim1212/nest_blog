import { Module, MiddlewareConsumer, NestModule, Get, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// import JWTChecker from '../middleware/is.auth';
import PostController from './posts.controller';
import PostService from './post.service';
import Post from './entities/post';
import { AuditMiddleware } from '../middleware/audit.middleware';
import PermissionChecker from '../middleware/is.admin.middleware';
import UserService from '../users/user.service';
import UserModule from '../users/user.module';

@Module({
    imports: [TypeOrmModule.forFeature([Post])],
    controllers: [PostController],
    providers: [PostService],
})
export default class PostModule implements NestModule {
    // eslint-disable-next-line class-methods-use-this
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuditMiddleware)
            .forRoutes(
                { path: '/posts/like', method: RequestMethod.PUT },
                { path: '/posts/', method: RequestMethod.DELETE },
                { path: '/posts/update', method: RequestMethod.PUT },
                { path: '/posts/', method: RequestMethod.POST },
                { path: '/posts', method: RequestMethod.GET },
            );
        consumer
            .apply(PermissionChecker)
            .forRoutes(
                { path: '/posts/like', method: RequestMethod.PUT },
                { path: '/posts/', method: RequestMethod.DELETE },
                { path: '/posts/update', method: RequestMethod.PUT },
                { path: '/posts/', method: RequestMethod.POST },
                { path: '/posts', method: RequestMethod.GET },
            );
    }
}
