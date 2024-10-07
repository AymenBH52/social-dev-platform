/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

import { User } from './entities/user.entity';



 
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  // Find all users
  @Get()
  async getUsers(): Promise<User[]>{
    return this.usersService.findAll();
  }

  // Find user by id
  @Get(':id')
  async getUser(@Param('id') id: string): Promise<User>{
    return this.usersService.findOne(+id);
  }
  
}
