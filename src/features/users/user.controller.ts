import {
  Body,
  Controller,
  Get,
  Put,
  UseGuards,
  Post,
  UseFilters,
  Delete,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { UserService } from './user.service';
import { UserDto, UpdateUserDto } from './user.interface';
import { GeneralExceptionsFilter } from '@shared/general-exception.filter';
import { AuthGuard } from '@nestjs/passport';

@UseFilters(new GeneralExceptionsFilter())
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':username')
  async findByUsername(@Param('username') username: string) {
    const user = await this.userService.findByUsername(username);
    return user;
  }

  @Post()
  signUp(@Body() user: UserDto): Promise<UserDto> {
    return this.userService.addUser(user);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<string> {
    const result = await this.userService.deleteUser(id);

    if (!result.affected) {
      throw new HttpException(
        'Product could not be deleted',
        HttpStatus.NOT_FOUND,
      );
    }

    return id;
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() product: UpdateUserDto,
  ): Promise<UpdateUserDto> {
    const result = await this.userService.updateUser(id, product);

    if (!result.raw.changedRows) {
      throw new HttpException(
        'Product could not be updated',
        HttpStatus.NOT_FOUND,
      );
    }

    return product;
  }
}
