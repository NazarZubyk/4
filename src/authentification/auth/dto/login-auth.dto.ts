import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class SignInDto {
  @IsNotEmpty()
  @ApiProperty({ required: true })
  username: string;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  password: string;
}
