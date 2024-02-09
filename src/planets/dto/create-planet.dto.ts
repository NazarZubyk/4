import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumberString, IsString, IsUrl } from 'class-validator';

export class CreatePlanetDto {
  @ApiProperty()
  @IsString()
  climate: string;

  @ApiProperty()
  @IsString()
  created: string;

  @ApiProperty()
  @IsNumberString()
  diameter: number;

  @ApiProperty()
  @IsString()
  edited: string;

  @ApiProperty()
  @IsNumberString()
  gravity: number;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNumberString()
  orbital_period: number;

  @ApiProperty()
  @IsNumberString()
  population: number;

  @ApiProperty()
  @IsNumberString()
  rotation_period: number;

  @ApiProperty()
  @IsNumberString()
  surface_water: number;

  @ApiProperty()
  @IsString()
  terrain: string;

  @ApiProperty({ format: 'url' })
  @IsString()
  @IsUrl()
  url: string;

  @ApiProperty({ type: [String], format: 'url', isArray: true })
  @IsArray()
  @IsUrl({}, { each: true })
  films: string[];

  @ApiProperty()
  @IsArray()
  residents: string[];
}
