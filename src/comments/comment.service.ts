import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, UpdateResult, Repository } from 'typeorm';

import Comment from './comment.entitie';
import {
    AllCommentsInterface,
    CommentDataInterface,
    OneCommentInterface,
} from './interfaces/comment.service.interface';
import LikesInterface from './interfaces/likes.interface';

@Injectable()
export default class PostService {
    constructor(
        @InjectRepository(Comment)
        private commentsRepository: Repository<Comment>,
    ) {}

    findAll(): Promise<AllCommentsInterface> {
        return this.commentsRepository.find();
    }

    create(data: any): Promise<OneCommentInterface[]> {
        const comment = this.commentsRepository.create(data);
        return this.commentsRepository.save(comment);
    }

    findOrfail(id: number): Promise<OneCommentInterface> {
        return this.commentsRepository.findOneOrFail(id);
    }

    findByPostId(id: number): Promise<OneCommentInterface> {
        return this.commentsRepository.findOneOrFail(id);
    }

    updateComment(id: number, likesData: LikesInterface): Promise<UpdateResult> {
        return this.commentsRepository.update(id, likesData);
    }

    findOne(id: number): Promise<OneCommentInterface> {
        return this.commentsRepository.findOne(id);
    }

    deleteById(id: number): Promise<DeleteResult> {
        return this.commentsRepository.delete(id);
    }
}
