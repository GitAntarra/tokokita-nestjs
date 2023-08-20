import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

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
}
