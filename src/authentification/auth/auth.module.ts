
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { APP_GUARD } from '@nestjs/core';
import { UsersModule } from '../users/users.module';
import * as dotenv from 'dotenv';
import { CombinedGuard } from './guards/combined.guard';
import { AuthGuard } from './guards/auth.guard';
import { RolesGuard } from './guards/roles.guard';

dotenv.config();

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_CONSTANT,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [
    AuthGuard,
    RolesGuard,
    AuthService,
    {
      provide: APP_GUARD,
      useClass: CombinedGuard,
    },
    
      ],
  controllers: [AuthController],
})
export class AuthModule {}
