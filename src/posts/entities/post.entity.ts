import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Comment } from 'src/comment/entities/comment.entity';

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    content: string;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ default: 0 })
    likes: number;

    @Column({ default: 0 })
    dislikes: number;
    @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];
}
