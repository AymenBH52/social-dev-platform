import { Body, Controller, Get, NotFoundException, Param, Patch, Post } from '@nestjs/common';
import { PostsService } from './posts.service';
import { Post as PostEntity } from './entities/post.entity';
import { Comment } from 'src/comment/entities/comment.entity';
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  /* @Post()
  async create(@Body('content') content: string): Promise<PostEntity> {
    return this.postsService.createPost(content);
  }

  @Get()
  async findAll(): Promise<PostEntity[]> {
    return this.postsService.findAll();
  }

  // Endpoint pour ajouter un like à un post
  @Patch(':id/like')
  async likePost(@Param('id') id: number): Promise<PostEntity> {
    return this.postsService.likePost(id);
  }
   // Endpoint pour ajouter un dislike à un post
   @Patch(':id/dislike')
   async dislikePost(@Param('id') id: number): Promise<PostEntity> {
    
     return  this.postsService.dislikePost(id);
     
   }
 */
}
