import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateImageDto {
  
  
  @ApiProperty({ type: 'string', format: 'binary', required: true })
  file: Express.Multer.File
 
  @ApiProperty({ required: false })
  @IsString()
  @IsNotEmpty()
  readonly personeName: string;
}
