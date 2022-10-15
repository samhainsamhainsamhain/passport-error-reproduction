import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './user.dto';
import { ValidateCreateUserPipe } from './validate-create-user.pipe';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  async fetchUsers() {
    const users = await this.userService.fetchUsers();
    return users;
  }

  @Post()
  @UsePipes(new ValidationPipe())
  createUser(@Body(ValidateCreateUserPipe) createUserDto: CreateUserDto) {
    const { confirmPassword, ...userDetails } = createUserDto;
    this.userService.createUser(userDetails);
    return {
      statusCode: 201,
      message: `${userDetails.username} is successfully registered!`,
    };
  }
}
