/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { create } from 'domain';
import { CreateUserDto } from './users/dto/create-user.dto';
import { UsersService } from './users/users.service';

@Controller('users')
export class AppController {
  constructor(private readonly usersService : UsersService) {}

  @Post()
  async createUser(@Body() CreateUserDto: CreateUserDto){
    return this.usersService.create(CreateUserDto);
  }

  
}
