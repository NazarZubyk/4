import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Film } from 'src/films/entities/film.entity';
import { Person } from 'src/people/entities/person.entity';
import { Planet } from 'src/planets/entities/planet.entity';

export class CreateSpeciesDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  readonly average_height: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  readonly average_lifespan: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly classification: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly created: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly designation: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly edited: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly eye_colors: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly hair_colors: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly language: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly skin_colors: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly url: string;

  @ApiProperty({ type: () => Planet, isArray: true })
  readonly homeworld: Planet[];

  @ApiProperty({ type: () => Person, isArray: true })
  readonly people: Person[];

  @ApiProperty({ type: () => Film, isArray: true })
  readonly films: Film[];
}
