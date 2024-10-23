import { PostsService } from "src/posts/posts.service";

/* eslint-disable prettier/prettier */
@WebSocketGateway(8001, { cors: '*' })
export class PostGateway {
    @WebSocketServer()
    server;

    constructor(private readonly postService: PostsService) {}


    //Gérer les messages de post 
    @SubscribeMessage('message')
    async handleMessage(@MessageBody() data: { content: string; userId: number }): Promise<void> {

        // Vérifiez que le contenu est valide
        if (!data.content || typeof data.content !== 'string') {
            throw new Error('Invalid content');
        }

        // Vérifiez que l'utilisateur est valide
        // Récupérez l'utilisateur à partir de l'ID
        const user = await this.userService.findById(data.userId);

        // Créez un nouveau post
        const newPost = await this.postService.createPost(data.content, user);

        // Envoyez le nouveau post à tous les clients connectés
        this.server.emit('message', newPost);
    }

    //Gérer les likes 
    @SubscribeMessage('likePost')
    async handleLikePost(@MessageBody() data: { postId: number; userId: number }): Promise<void> {
        const user = await this.userService.findById(data.userId); // Exemple
        const updatedPost = await this.postService.likePost(data.postId, user);
        this.server.emit('postLiked', updatedPost);
    }

    //Gérer les dislikes
    @SubscribeMessage('dislikePost')
    async handleDislikePost(@MessageBody() data: { postId: number; userId: number }): Promise<void> {
        const user = await this.userService.findById(data.userId); // Exemple
        const updatedPost = await this.postService.dislikePost(data.postId, user);
        this.server.emit('postDisliked', updatedPost);
    }


    //Ajouter un commentaire
    @SubscribeMessage('addComment')
    async handleAddComment(
        @MessageBody() data: { postId: number; content: string; userId: number }
    ): Promise<void> {
        // Ajoutez ici la logique pour l'ajout de commentaires en fonction de l'utilisateur
    }
}
function WebSocketServer(): (target: PostGateway, propertyKey: "server") => void {
    throw new Error("Function not implemented.");
}

function WebSocketGateway(arg0: number, arg1: { cors: string; }): (target: typeof PostGateway) => void | typeof PostGateway {
    throw new Error("Function not implemented.");
}

function SubscribeMessage(arg0: string): (target: PostGateway, propertyKey: "handleMessage", descriptor: TypedPropertyDescriptor<(data: { content: string; userId: number; }) => Promise<void>>) => void | TypedPropertyDescriptor<...> {
    throw new Error("Function not implemented.");
}

function MessageBody(): (target: PostGateway, propertyKey: "handleMessage", parameterIndex: 0) => void {
    throw new Error("Function not implemented.");
}

