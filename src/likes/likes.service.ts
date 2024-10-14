import { Delete, Injectable, Param } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { Like } from './entities/like.entity';
import { Repository } from 'typeorm/repository/Repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/posts/entities/post.entity';

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(Like)
    private likesRepository: Repository<Like>,
  ) {}

  async likePost(user: User, post: Post): Promise<Like> {
    const like = this.likesRepository.create({ user, post });
    return this.likesRepository.save(like);
  }

  async unlikePost(userId: number, postId: number): Promise<void> {
    await this.likesRepository.delete({ user: { id: userId }, post: { id: postId } });
  }

  async countLikes(postId: number): Promise<number> {
    return this.likesRepository.count({ where: { post: { id: postId } } });
  }
}
