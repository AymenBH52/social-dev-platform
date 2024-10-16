/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { RoleEnum } from './enums/enums';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
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
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const user = new User();
    user.username = createUserDto.username;
    user.firstname = createUserDto.firstname;
    user.lastname = createUserDto.lastname;
    user.email = createUserDto.email;
    user.password = hashedPassword;

    if (createUserDto.role) {
      const userRole = await this.roleRepository.findOne({
        where: { name: createUserDto.role },
      });
      user.role = userRole;
    } else {
      const userRole = await this.roleRepository.findOne({
        where: { name: RoleEnum.USER as RoleEnum },
      });
      user.role = userRole;
    }
    return this.userRepository.save(user);
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
}
