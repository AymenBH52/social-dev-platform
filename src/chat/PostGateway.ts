@WebSocketGateway(8001, { cors: '*' })
export class PostGateway {
    @WebSocketServer()
    server;

    constructor(private readonly postService: PostsService) {}

    @SubscribeMessage('message')
    async handleMessage(@MessageBody() data: { content: string; userId: number }): Promise<void> {
        if (!data.content || typeof data.content !== 'string') {
            throw new Error('Invalid content');
        }

        // Assurez-vous de récupérer l'utilisateur ici en fonction de userId
        const user = await this.userService.findById(data.userId); // Exemple
        const newPost = await this.postService.createPost(data.content, user);
        this.server.emit('message', newPost);
    }

    @SubscribeMessage('likePost')
    async handleLikePost(@MessageBody() data: { postId: number; userId: number }): Promise<void> {
        const user = await this.userService.findById(data.userId); // Exemple
        const updatedPost = await this.postService.likePost(data.postId, user);
        this.server.emit('postLiked', updatedPost);
    }

    @SubscribeMessage('dislikePost')
    async handleDislikePost(@MessageBody() data: { postId: number; userId: number }): Promise<void> {
        const user = await this.userService.findById(data.userId); // Exemple
        const updatedPost = await this.postService.dislikePost(data.postId, user);
        this.server.emit('postDisliked', updatedPost);
    }

    @SubscribeMessage('addComment')
    async handleAddComment(
        @MessageBody() data: { postId: number; content: string; userId: number }
    ): Promise<void> {
        // Ajoutez ici la logique pour l'ajout de commentaires en fonction de l'utilisateur
    }
}
