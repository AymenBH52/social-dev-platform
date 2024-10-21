import { Injectable, NotFoundException } from '@nestjs/common';
import { Post } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from 'src/comment/entities/comment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>, 
  ) {}

  // Add post
  async createPost(content: string): Promise<Post> {
    const post = this.postRepository.create({ content });
    return this.postRepository.save(post);
  }

  // display posts
  async findAll(): Promise<Post[]> {
    return this.postRepository.find({ relations: ['comments'] }); 
  }

  // likes management
  async likePost(id: number): Promise<Post> {
    const post = await this.postRepository.findOneBy({ id });
    post.likes += 1;
    return this.postRepository.save(post);
  }

  // dislikes management
  async dislikePost(id: number): Promise<Post> {
    const post = await this.postRepository.findOneBy({ id });
    post.dislikes += 1; // Incrémenter les dislikes
    return this.postRepository.save(post);
  }

  // Add comment to post
  async addComment(postId: number, content: string): Promise<Post> {
    const post = await this.postRepository.findOne({ where: { id: postId }, relations: ['comments'] });
    if (!post) {
      throw new NotFoundException('Post not found');
    }

    const comment = this.commentRepository.create({ content, post });
    await this.commentRepository.save(comment);
    
    return this.postRepository.findOne({ where: { id: postId }, relations: ['comments'] });
  }
}
