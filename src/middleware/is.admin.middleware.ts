import { Injectable, NestMiddleware } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import UserService from '../users/user.service';
import PermissionCheckerInterface from '../interfaces/permission.checker.interface';
import { User } from '../users/user.entity';

@Injectable()
export default class PermissionChecker implements NestMiddleware {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    async use(id = 1): Promise<boolean> {
        console.log('8228');
        const user = await this.usersRepository.findOne(id);
        console.log(user);
        if (user && user.is_admin) {
            return true;
        }
        console.log(false);
        return false;
    }
}
