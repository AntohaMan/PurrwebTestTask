import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'Ivanov Ivan', description: 'User name' })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({ example: 'user@gmail.com', description: 'Email' })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  readonly email: string;

  @ApiProperty({ example: '12345678', description: 'Password' })
  @IsNotEmpty()
  @IsString()
  @Length(6, 16, { message: 'password length should be 6-16 characters' })
  readonly password: string;
}
