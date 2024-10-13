import { Injectable } from '@nestjs/common';
import { UsersService } from './users/users.service';
import { UUID } from 'crypto';
import { User } from './users/entities/user.entity';

@Injectable()
export class AppService {
  constructor(private usersService: UsersService) {}

  getHello(): string {
    return 'Hello World!';
  }
}
