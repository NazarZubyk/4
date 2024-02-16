import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsArray, IsUrl, IsDateString } from 'class-validator';
import { Film } from 'src/films/entities/film.entity';
import { Planet } from 'src/planets/entities/planet.entity';
import { Species } from 'src/species/entities/species.entity';
import { Starship } from 'src/starships/entities/starship.entity';
import { Vehicle } from 'src/vehicles/entities/vehicle.entity';
import { Image } from 'src/images/entities/image.entity';

export class CreatePersonDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly name: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  readonly height: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  readonly mass: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly hair_color: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly skin_color: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly eye_color: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly birth_year: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly gender: string;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty()
  readonly created: string;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty()
  readonly edited: string;

  @IsNotEmpty()
  @IsUrl()
  @ApiProperty()
  readonly url: string;

  @ApiProperty({ type: () => Planet, isArray: true })
  readonly homeworld: Planet[];

  @ApiProperty({ type: () => Film, isArray: true })
  readonly films: Film[];

  @ApiProperty({ type: () => Species, isArray: true })
  readonly species: Species[];

  @ApiProperty({ type: () => Vehicle, isArray: true })
  readonly vehicles: Vehicle[];

  @ApiProperty({ type: () => Starship, isArray: true })
  readonly starships: Starship[];

  @ApiProperty({ type: () => Image, isArray: true })
  readonly images: Image[];
}
