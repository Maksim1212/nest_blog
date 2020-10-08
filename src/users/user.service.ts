import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateResult, Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

import { User } from './user.entity';
import { UpdateDataInterface } from './interfaces/user.model.interface';
import { OneUserInterface, CreateUserDataInterface } from './interfaces/user.service.interface';

@Injectable()
export default class UserService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    findByEmail(email: string): Promise<OneUserInterface> {
        return this.usersRepository.findOne({ where: { email } });
    }

    createUser(data: any): Promise<OneUserInterface[]> {
        const newUser = this.usersRepository.create(data);
        return this.usersRepository.save(newUser);
    }

    updateUser(id: number, password: QueryDeepPartialEntity<User>): Promise<UpdateResult> {
        return this.usersRepository.update(id, password);
    }

    findByUserId(id: number): Promise<OneUserInterface> {
        return this.usersRepository.findOne(id);
    }

    dropUserToken(id: number, data: UpdateDataInterface): Promise<UpdateResult> {
        return this.usersRepository.update(id, data);
    }
}
