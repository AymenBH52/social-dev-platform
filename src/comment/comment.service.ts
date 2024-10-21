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

  // Méthode pour créer un commentaire
  async create(content: string): Promise<Comment> {
    const comment = this.commentRepository.create({ content }); // Assurez-vous que 'content' est une propriété de Comment
    return this.commentRepository.save(comment);
  }

  // Méthode pour récupérer tous les commentaires
  async findAll(): Promise<Comment[]> {
    return this.commentRepository.find();
  }
}
