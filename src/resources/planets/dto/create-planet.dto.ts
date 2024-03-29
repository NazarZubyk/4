import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Film } from '../../../resources/films/entities/film.entity';
import { Person } from '../../../resources/people/entities/person.entity';
import { Species } from '../../../resources/species/entities/species.entity';

export class CreatePlanetDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly climate: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  readonly diameter: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  readonly gravity: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly name: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  readonly orbital_period: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  readonly population: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  readonly rotation_period: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  readonly surface_water: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly terrain: string;

  @ApiProperty({ type: () => Species, isArray: true })
  readonly species: Species[];

  @ApiProperty({ type: () => Film, isArray: true })
  readonly films: Film[];

  @ApiProperty({ type: () => Person, isArray: true })
  readonly residents: Person[];
}
