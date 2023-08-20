import { IsEnum, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { UserRole } from '../user-role.enum';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  username: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  password: string;

  @IsNotEmpty()
  @IsEnum(UserRole)
  role: UserRole;

  @IsNotEmpty()
  @IsString()
  @MaxLength(40)
  name: string;
}
