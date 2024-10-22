/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Put,
} from '@nestjs/common';

import { CreateUserDto } from '../dto/create-user.dto';

import { User } from '../entities/user.entity';
import { ApiResponse } from '@nestjs/swagger';

import { RoleEnum } from '../enums/enums';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { Role } from 'src/auth/decorators/roles.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Express } from 'express';
import { extname } from 'path';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: "L'utilisateur a été créé avec succès.",
  })
  @ApiResponse({ status: 400, description: 'Requête invalide.' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  // Find all users
  @Role(RoleEnum.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Get()
  @ApiResponse({ status: 200, description: 'Liste de tous les utilisateurs.' })
  async getUsers(): Promise<User[]> {
    return this.usersService.findAll();
  }
  // Find user by id
  @UseGuards(JwtGuard)
  @Get(':id')
  @ApiResponse({ status: 200, description: "L'utilisateur trouvé." })
  @ApiResponse({ status: 404, description: 'Utilisateur non trouvé.' })
  async getUser(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(+id);
  }

  @UseGuards(JwtGuard)
  @Put(':id')
  @ApiResponse({ status: 200, description: "L'utilisateur trouvé." })
  @ApiResponse({ status: 404, description: 'Utilisateur non trouvé.' })
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.update(+id, updateUserDto);
  }

  //**Update user profile picture**
  @Post(':id/upload-profile-picture')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/profile-pictures',
        filename: (req, file, cb) => {
          const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
          const ext = extname(file.originalname);
          cb(null, `${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  async uploadProfilePicture(
    @Param('id') userId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const imageUrl = `/uploads/profile-pictures/${file.filename}`;
    await this.usersService.updateUserProfilePicture(userId, imageUrl);
    return { imageUrl, message: 'Profile picture uploaded successfully' };
  }
  //**Update user profile picture**
}
