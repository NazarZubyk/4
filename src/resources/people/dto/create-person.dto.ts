import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsArray, IsUrl, IsDateString } from 'class-validator';
import { Film } from 'src/resources/films/entities/film.entity';
import { Planet } from 'src/resources/planets/entities/planet.entity';
import { Species } from 'src/resources/species/entities/species.entity';
import { Starship } from 'src/resources/starships/entities/starship.entity';
import { Vehicle } from 'src/resources/vehicles/entities/vehicle.entity';
import { Image } from 'src/resources/images/entities/image.entity';
import { callbackify } from 'util';


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


