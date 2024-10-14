import { Controller, Get, Post, Param, Delete, Req } from '@nestjs/common';
import { LikesService } from './likes.service';
import { PostsService } from 'src/posts/posts.service';

export class LikesController {
 /*  constructor(
    private readonly likesService: LikesService,
    private readonly postsService: PostsService,
  ) {}

  @Post()
  async likePost(@Param('postId') postId: number, @Req() req: Request) {
    const post = await this.postsService.findOne(postId);
    return this.likesService.likePost(post, req.user);
  }

  @Delete(':id')
  async removeLike(@Param('id') id: number) {
    return this.likesService.removeLike(id);
  } */}