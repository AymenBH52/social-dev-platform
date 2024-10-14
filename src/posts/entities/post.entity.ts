import { Comment } from "src/comments/entities/comment.entity";
import { Like } from "src/likes/entities/like.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";

@Entity()
export class Post {
    @Column()
    id:number;

    @Column()
    title:string;
    
    @Column()
    content:string;
    
    @ManyToOne(() => User, (user) => user.posts)
    author: User;
  
    @OneToMany(() => Comment, (comment) => comment.post)
    comments: Comment[];
  
    @OneToMany(() => Like, (like) => like.post)
    likes: Like[];
}
