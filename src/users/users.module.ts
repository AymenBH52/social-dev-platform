/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { ExperienceController } from './controllers/experience.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Role } from './entities/role.entity';
import { Experience } from './entities/experience.entity';
import { UsersService } from './services/users.service';
import { ExperienceService } from './services/experience.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role, Experience])],
  controllers: [UsersController, ExperienceController],
  providers: [UsersService, ExperienceService],
  exports: [UsersService, ExperienceService],
})
export class UsersModule {}
