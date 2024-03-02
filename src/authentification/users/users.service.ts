
import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import bcrypt from 'bcrypt';
// This should be a real class/interface representing a user entity


@Injectable()
export class UsersService {
 constructor(
  @Inject('USERS_REPOSITORY')
    private usersRepository: Repository<User>,
 ){}

  async create(user:CreateUserDto):Promise<User>{

    const saltRounds = 10;
    let password = null;

    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) {
        throw new InternalServerErrorException('can not add salt to password')
      } else {
        bcrypt.hash(user.password, salt, (err, hash) => {
          if (err) {
            throw new InternalServerErrorException('can not hash password')
          } else {
            password = hash;
          }
        });
      }
    });

    if(password){
      user.password = password;
      return await this.usersRepository.save(user)
    }else{
      throw new InternalServerErrorException('password was not be hashed')
    }
    
  }

  async findOne(username: string): Promise<User | undefined> {

    

    const user = await this.usersRepository.findOne({where: {
      username:username
    }}) 
    return user;
  }
}
