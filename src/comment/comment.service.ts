import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async create(content: string): Promise<Comment> {
    const comment = this.commentRepository.create({ content }); 
    return this.commentRepository.save(comment);
  }

  
  async findAll(): Promise<Comment[]> {
    return this.commentRepository.find();
  }
}
