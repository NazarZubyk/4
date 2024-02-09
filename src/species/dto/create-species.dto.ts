import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsArray, IsUrl } from 'class-validator';

export class CreateSpeciesDto {
  @ApiProperty()
  @IsNumber()
  readonly average_height: number;

  @ApiProperty()
  @IsNumber()
  readonly average_lifespan: number;

  @ApiProperty()
  @IsString()
  readonly classification: string;

  @ApiProperty()
  @IsString()
  readonly created: string;

  @ApiProperty()
  @IsString()
  readonly designation: string;

  @ApiProperty()
  @IsString()
  readonly edited: string;

  @ApiProperty()
  @IsString()
  readonly eye_colors: string;

  @ApiProperty()
  @IsString()
  readonly hair_colors: string;

  @ApiProperty()
  @IsString()
  readonly language: string;

  //@ApiProperty()
  @IsString()
  readonly name: string;

  @ApiProperty()
  @IsString()
  readonly skin_colors: string;

  @ApiProperty()
  @IsString()
  readonly url: string;

  @ApiProperty()
  @IsArray()
  @IsUrl({}, { each: true })
  readonly films: string[];

  @ApiProperty()
  @IsArray()
  @IsString({ each: true })
  readonly people: string[];
}
