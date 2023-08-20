import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Users } from './users.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  async addUser(@Body() createUser: CreateUserDto): Promise<Users> {
    return this.userService.addUser(createUser);
  }
}
