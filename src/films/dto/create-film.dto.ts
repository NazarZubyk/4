import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsArray, IsUrl } from 'class-validator';

export class CreateFilmDto {
  @ApiProperty()
  @IsNumber()
  readonly id: number;

  @ApiProperty()
  @IsString()
  readonly created: string;

  @ApiProperty()
  @IsString()
  readonly director: string;

  @ApiProperty()
  @IsString()
  readonly edited: string;

  @ApiProperty()
  @IsNumber()
  readonly episode_id: number;

  @ApiProperty()
  @IsString()
  readonly opening_crawl: string;

  @ApiProperty()
  @IsString()
  readonly producer: string;

  @ApiProperty()
  @IsString()
  readonly release_date: string;

  @ApiProperty()
  @IsString()
  readonly title: string;

  @ApiProperty()
  @IsString()
  readonly url: string;

  @ApiProperty()
  @IsArray()
  @IsUrl({}, { each: true })
  readonly vehicles: string[];

  @ApiProperty()
  @IsArray()
  @IsUrl({}, { each: true })
  readonly species: string[];

  @ApiProperty()
  @IsArray()
  @IsUrl({}, { each: true })
  readonly starships: string[];

  @ApiProperty()
  @IsArray()
  @IsUrl({}, { each: true })
  readonly planets: string[];

  @ApiProperty()
  @IsArray()
  @IsUrl({}, { each: true })
  readonly characters: string[];
}
