import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { PostsService } from '../posts/posts.service';

@WebSocketGateway(8001, { cors: '*' })
export class PostGateway {
  @WebSocketServer()
  server;

  constructor(private readonly postService: PostsService) {}


  @SubscribeMessage('message')
  async handleMessage(@MessageBody() content: string): Promise<void> {
    const newPost = await this.postService.createPost(content);
    this.server.emit('message', newPost);
  }

  @SubscribeMessage('fetchPosts')
  async handleFetchPosts(): Promise<void> {
    const posts = await this.postService.findAll();
    this.server.emit('posts', posts);
  }

  @SubscribeMessage('likePost')
  async handleLikePost(@MessageBody() postId: number): Promise<void> {
    const updatedPost = await this.postService.likePost(postId);
    this.server.emit('postLiked', updatedPost); 
  }

 
  @SubscribeMessage('dislikePost')
  async handleDislikePost(@MessageBody() postId: number): Promise<void> {
    const updatedPost = await this.postService.dislikePost(postId);
    this.server.emit('postDisliked', updatedPost);
  }


  @SubscribeMessage('addComment')
  async handleAddComment(
    @MessageBody() data: { postId: number; content: string }
  ): Promise<void> {
    const newComment = await this.postService.addComment(data.postId, data.content);
    this.server.emit('commentAdded', newComment); 
  }
}
