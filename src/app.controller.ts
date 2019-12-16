import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'features/auth/auth.service';
import { UserDto } from '@users/user.interface';
import { User } from '@shared/decorators/user.decorator';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@User() user: UserDto) {
    return this.authService.login(user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@User() user: UserDto) {
    return user;
  }
}
