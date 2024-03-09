import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
// This should be a real class/interface representing a user entity

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private usersRepository: Repository<User>,
  ) {}

  async create(user: CreateUserDto): Promise<User> {
    const saltRounds = 10;

    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(user.password, salt);

    if (hash) {
      user.password = hash;
      return await this.usersRepository.save(user);
    } else {
      throw new InternalServerErrorException('password was not be hashed');
    }
  }

  async findOne(username: string): Promise<User | undefined> {
    const user = await this.usersRepository.findOne({
      where: {
        username: username,
      },
    });
    return user;
  }
}
