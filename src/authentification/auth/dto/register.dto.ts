import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Role } from '../enums/role.enum';

export class RegisterDto {
  @IsNotEmpty()
  @ApiProperty({ required: true })
  username: string;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  password: string;

  @ApiProperty({
    enum: Role,
    default: Role.User,
    description: 'User Role',
    enumName: 'Role',
  })
  role: Role;
}
