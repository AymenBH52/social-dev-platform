import { Controller, Post, Body, Get } from '@nestjs/common';
import { CommentService } from './comment.service';
import { Comment } from './entities/comment.entity';

@Controller('comments')
export class CommentController {
 /*  constructor(private readonly commentService: CommentService) {}

  // Route pour créer un commentaire
  @Post()
  async create(@Body('content') content: string): Promise<Comment> {
    return this.commentService.create(content);
  }

  // Route pour récupérer tous les commentaires
  @Get()
  async findAll(): Promise<Comment[]> {
    return this.commentService.findAll();
  } */
}
