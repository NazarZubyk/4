
import {  ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import {  UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    username: string,
    pass: string,
  ): Promise<{ access_token: string }> {

    const user = await this.usersService.findOne(username);
    
    return new Promise((resolve, reject) => {
      bcrypt.compare(pass, user.password, async (err, result) => {
        if (err) {
          reject(new InternalServerErrorException('An error occurred while checking the password.'));
        } else if (result) {
          const payload = { sub: user.id, username: user.username };
          
          const access_token = await this.jwtService.signAsync(payload);
          
          resolve({ access_token });
        } else {
          reject(new UnauthorizedException('Invalid credentials.'));
        }
      });
    });
}

  async create(
    username: string,
    pass: string,
  ){
    const user = await this.usersService.findOne(username);
    if(user){
      throw new ConflictException(`Person with name '${user.username}' already exists`);
    }

    const savedUser = await this.usersService.create({
      username: username,
      password: pass,
    })

    return `user - ${savedUser.username} added`
  }
}


