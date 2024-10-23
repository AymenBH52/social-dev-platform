/* eslint-disable prettier/prettier */
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { Role } from '../entities/role.entity';
import { RoleEnum } from '../enums/enums';
import * as bcrypt from 'bcrypt';
import { Experience } from '../entities/experience.entity';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(Experience)
    private readonly experienceRepository: Repository<Experience>,
  ) {}

  // async create(createUserDto: CreateUserDto): Promise<User> {
  //   const newUser = this.userRepository.create(createUserDto);
  //   return this.userRepository.save(newUser);
  // }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: any): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  async findByUsername(username: string): Promise<User> {
    return this.userRepository.findOne({ where: { username } });
  }

  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findOneBy({ email });
  }
  async getUser({ username, password }): Promise<User | undefined> {
    return this.userRepository.findOne({
      where: { username, password },
    });
  }

  async update(id: number, dto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['experiences'],
    });

    if (!user) {
      throw new Error('User not found');
    }

    const existingExperienceIds = new Set(
      user.experiences.map((exp) => exp.id),
    );

    const newExperienceIds = new Set(
      dto.experiences.filter((exp) => exp.id).map((exp) => exp.id),
    );

    const experiencesToDelete = user.experiences.filter(
      (exp) => !newExperienceIds.has(exp.id),
    );

    if (experiencesToDelete.length > 0) {
      await this.experienceRepository.remove(experiencesToDelete);
    }

    const updatedExperiences = await Promise.all(
      dto.experiences.map(async (expDto) => {
        if (expDto.id && existingExperienceIds.has(expDto.id)) {
          await this.experienceRepository.update(expDto.id, {
            ...expDto,
            user,
          });
          return this.experienceRepository.findOne({
            where: { id: expDto.id },
          });
        } else {
          const newExperience = this.experienceRepository.create({
            ...expDto,
            user,
          });
          return this.experienceRepository.save(newExperience);
        }
      }),
    );

    // Update user's experiences array
    user.experiences = updatedExperiences;
    await this.userRepository.save(user);

    return user;
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

      const { password, profilePicture, role, experiences, ...rest } =
        createUserDto;

      const user = this.userRepository.create({
        ...rest,
        password: hashedPassword,
        profilePicture: profilePicture || undefined,
        experiences: experiences || [],
      });

      const roleName = role || RoleEnum.USER;
      const userRole = await this.roleRepository.findOne({
        where: { name: roleName },
      });
      if (!userRole) {
        throw new InternalServerErrorException(`Role ${roleName} not found`);
      }
      user.role = userRole;

      return await this.userRepository.save(user);
    } catch (error) {
      console.error('Error creating user:', error);
      throw new InternalServerErrorException(error);
    }
  }

  async addRolesToDb() {
    const roles = Object.values(RoleEnum);
    roles.forEach(async (role) => {
      const existingRole = await this.roleRepository.findOne({
        where: { name: role },
      });
      if (!existingRole) {
        const newRole = new Role();
        newRole.name = role;
        await this.roleRepository.save(newRole);
      }
    });
  }

  //**Update user profile picture**
  async updateUserProfilePicture(userId: string, imageUrl: string) {
    const user = await this.userRepository.findOne({
      where: { id: Number(userId) },
    });
    if (!user) {
      throw new Error('User not found');
    }
    user.profilePicture = imageUrl;
    await this.userRepository.save(user);
    return user;
  }
  //**Update user profile picture**
}
