
import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Request,
    UseGuards
  } from '@nestjs/common';
  import { AuthGuard } from './auth.guard';
  import { AuthService } from './auth.service';
  import { signInDto } from './dto/login-auth.dto';
  import { ApiTags } from '@nestjs/swagger';
  import { Public } from './public';
  
  @ApiTags('auth')
  @Controller('auth')
  export class AuthController {
    constructor(
      private authService: AuthService
      ) {}
    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: signInDto) {
      return this.authService.signIn(signInDto.username, signInDto.password);
    }
    
    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('register')
    redister(@Body() signInDto: signInDto) {
      return this.authService.create(signInDto.username, signInDto.password);
    }
  
    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
      return req.user;
    }
  }
  