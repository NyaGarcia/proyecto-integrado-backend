import { AuthUser } from './user-auth.interface';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from '@users/user.interface';
import { UserService } from '@users/user.service';
import { EncryptionService } from '@shared/services/encryption.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private encryption: EncryptionService,
  ) {}

  async validateUser(username: string, password: string): Promise<UserDto> {
    const user = await this.userService.findByUsername(username);

    if (user && this.encryption.isPasswordValid(user.password, password)) {
      return user;
    }

    return null;
  }

  async login({ username, id, email }: UserDto) {
    const payload = { username, sub: id, email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
