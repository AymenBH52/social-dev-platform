import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  // Créer un nouveau commentaire
  async create(createCommentDto: CreateCommentDto): Promise<Comment> {
    const newComment = this.commentRepository.create(createCommentDto);
    return this.commentRepository.save(newComment);
  }

  // Trouver un commentaire par son id
  async findOne(id: number): Promise<Comment> {
    return this.commentRepository.findOne({ where: { id } });
  }

  // Supprimer un commentaire par son id
  async remove(id: number): Promise<void> {
    await this.commentRepository.delete(id);
  }
}
