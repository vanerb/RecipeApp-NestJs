import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, IsUUID } from 'class-validator';

export class CreateUserDto {

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsStrongPassword()
  @IsNotEmpty()
  password: string
}
