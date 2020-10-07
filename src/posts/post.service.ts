import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import Post from './entities/post';

@Injectable()
export default class PostService {
    constructor(
        @InjectRepository(Post)
        private postsRepository: Repository<Post>,
    ) {}

    findAll(): Promise<Post[]> {
        return this.postsRepository.find();
    }

    findOne(id: string): Promise<Post> {
        return this.postsRepository.findOne(id);
    }

    async remove(id: string): Promise<void> {
        await this.postsRepository.delete(id);
    }
}
