import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dtos/auth.dto';
import * as bcrypt from 'bcrypt';
import { UserEntity } from '../database/entities/User.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(authDto: AuthDto) {
    const user = await this.validateUser(authDto);
    return this.generateToken(user);
  }

  private async generateToken(user: UserEntity) {
    const payload = { id: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  private async validateUser(authDto: AuthDto) {
    const user = await this.usersService.findOneByEmail(authDto.email);
    if (!user) {
      throw new UnauthorizedException({ message: 'Incorrect email' });
    }
    const passwordEquals = await bcrypt.compare(
      authDto.password,
      user.password,
    );
    if (!passwordEquals) {
      throw new UnauthorizedException({ message: 'Incorrect password' });
    }
    return user;
  }
}
