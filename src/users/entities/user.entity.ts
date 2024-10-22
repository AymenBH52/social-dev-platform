/* eslint-disable prettier/prettier */
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from './role.entity';
import { RoleEnum } from '../enums/enums';
import { Experience } from './experience.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  username: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ default: false })
  isActive: boolean;

  @Column({ nullable: true })
  profilePicture: string;

  @Column()
  state: string;

  @Column()
  stateid: string;

  @Column()
  country: string;

  @Column()
  countryid: string;

  @Column()
  jobTitle: string;

  @Column({ nullable: true })
  about: string;

  @ManyToOne(() => Role, (role) => role.users, { eager: true })
  role: Role;

  @OneToMany(() => Experience, (experience) => experience.user, { eager: true })
  experiences: Experience[];
}
