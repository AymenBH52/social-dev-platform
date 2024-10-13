/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { create } from 'domain';
import { CreateUserDto } from './users/dto/create-user.dto';
import { UsersService } from './users/users.service';

@Controller()
export class AppController {
  // constructor(private readonly usersService: UsersService) {}
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
