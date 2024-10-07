/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
 
  // Create a new user
  async create(createUserDto: CreateUserDto) : Promise<User>{
    const newUser = this.userRepository.create(createUserDto);
    return this.userRepository.save(newUser);
  }

  // Find all users
  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  // Find user by id
  async findOne(id: number): Promise<User> {
    return this.userRepository.findOne({where:{id}});
  }
 
}
