import { Injectable } from '@nestjs/common';

import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  
  async create(createPostDto: CreatePostDto, user: User): Promise<Post> {
    const newPost = this.postRepository.create({ ...createPostDto, author: user });
    return this.postRepository.save(newPost);
  }

  async findAll(): Promise<Post[]> {
    return this.postRepository.find({ relations: ['author', 'comments', 'likes'] });
  }

  async findOne(id: number): Promise<Post> {
    return this.postRepository.findOne({ where: { id }, relations: ['author', 'comments', 'likes'] });
  }

}
