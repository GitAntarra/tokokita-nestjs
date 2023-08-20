import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly userReposiroty: Repository<Users>,
  ) {}

  async addUser(createUserDto: CreateUserDto): Promise<Users> {
    const { username, name, password, role } = createUserDto;

    try {
      // hashing password
      const hashPass = await this.encryptPassword(password);
      const createUser = this.userReposiroty.create({
        username,
        password: hashPass,
        name,
        role,
      });
      const saveUser = await this.userReposiroty.save(createUser);
      return saveUser;
    } catch (err) {
      if (err.errno === 1062) {
        throw new ConflictException(`username ${username} already registred`);
      }

      throw new InternalServerErrorException();
    }
  }

  async encryptPassword(password: string): Promise<string> {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);

    return hash;
  }

  async showUsers(): Promise<Users[]> {
    return await this.userReposiroty.find();
  }

  async getUserById(id: string): Promise<Users> {
    const user = await this.userReposiroty.findOne({ where: { id } });
    if (!user) {
      throw new BadRequestException(`User Is Not Found`);
    }
    return user;
  }

  async updateUser(id: string, updateData: UpdateUserDto): Promise<Users> {
    console.log(updateData);

    const { username, password, role, name } = updateData;
    const user = await this.getUserById(id);

    user.username = username;
    user.role = role;
    user.name = name;
    if (password) {
      user.password = password;
    }
    const updateUser = await this.userReposiroty.save(user);
    return updateUser;
  }

  async deleteUser(id: string): Promise<void> {
    try {
      await this.getUserById(id);

      await this.userReposiroty.softDelete(id);
    } catch (err) {
      console.log(err);

      throw new InternalServerErrorException();
    }
  }
}
