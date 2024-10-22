import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Experience {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  company: string;

  @Column()
  startDate: Date;

  @Column({ nullable: true })
  endDate: Date;

  @Column('text')
  description: string;

  @ManyToOne(() => User, (user) => user.experiences, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  user: User;
}
