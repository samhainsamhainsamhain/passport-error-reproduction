import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { hashPassword } from 'src/utils/helpers';
import {
  CreateUserParams,
  FindOneUserParams,
  UpdateUserParams,
} from 'src/utils/types/users/types';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  fetchUsers() {
    return this.userRepository.find();
  }

  findOneUser(userDetails: FindOneUserParams) {
    return this.userRepository.findOneBy({ username: userDetails.username });
  }

  async createUser(userDetails: CreateUserParams) {
    const existingUser = await this.userRepository.findOneBy({
      username: userDetails.username,
    });
    if (existingUser) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }
    const password = await hashPassword(userDetails.password);
    const newUser = this.userRepository.create({ ...userDetails, password });
    return this.userRepository.save(newUser);
  }
}
