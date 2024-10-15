import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { PostsService } from 'src/posts/posts.service';
import { Request } from 'express';


export class CommentsController {
 /*  constructor(
    private readonly commentsService: CommentsService,
    private readonly postsService: PostsService,
  ) {}
 
  @Post()
  async create(
    @Param('postId') postId: number,
    @Body() createCommentDto: CreateCommentDto,
    @Req() req: Request,
  ) {
    const post = await this.postsService.findOne(postId);
    return this.commentsService.create(createCommentDto, post, req.user);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.commentsService.remove(id);
  } */
}
