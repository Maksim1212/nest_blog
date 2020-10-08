import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, UpdateResult, Repository } from 'typeorm';

import Post from './entities/post';
import LikesDataInterface from './interfaces/likes.data.interface';
import { GetAllPostsInterface, OnePostInterface, PostDataInterface } from './interfaces/post.service.interface';

@Injectable()
export default class PostService {
    constructor(
        @InjectRepository(Post)
        private postsRepository: Repository<Post>,
    ) {}

    findAll(): Promise<Post[]> {
        return this.postsRepository.find();
    }

    cretePost(postData: any): Promise<OnePostInterface[]> {
        const post = this.postsRepository.create(postData);
        return this.postsRepository.save(post);
    }

    findByPostId(id: number): Promise<OnePostInterface> {
        return this.postsRepository.findOne(id);
    }

    findByUserId(id: number): Promise<OnePostInterface[]> {
        return this.postsRepository.find({ author_id: id });
    }

    updatePostById(id: number, body: any): Promise<UpdateResult> {
        return this.postsRepository.update(id, body);
    }

    deletePost(id: number): Promise<DeleteResult> {
        return this.postsRepository.delete(id);
    }

    findOrfail(id: number): Promise<OnePostInterface> {
        return this.postsRepository.findOneOrFail(id);
    }

    sortByDate(sortingParametr: any): Promise<GetAllPostsInterface> {
        return this.postsRepository
            .createQueryBuilder('post')
            .orderBy('creation_time', sortingParametr)
            .getMany();
    }

    sortByLikes(sortingParametr: any): Promise<GetAllPostsInterface> {
        return this.postsRepository
            .createQueryBuilder('post')
            .orderBy('likes', sortingParametr)
            .getMany();
    }
}
