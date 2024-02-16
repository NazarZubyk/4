import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsNumber, IsString, IsUrl } from 'class-validator';
import { Planet } from 'src/planets/entities/planet.entity';
import { Film } from 'src/films/entities/film.entity';
import { Species } from 'src/species/entities/species.entity';
import { Vehicle } from 'src/vehicles/entities/vehicle.entity';
import { Starship } from 'src/starships/entities/starship.entity';
import { Image } from 'src/images/entities/image.entity';

export class CreateFilmDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly created: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly director: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly edited: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  readonly episode_id: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly opening_crawl: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly producer: string;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty()
  readonly release_date: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly title: string;

  @IsNotEmpty()
  @IsUrl()
  @ApiProperty()
  readonly url: string;

  // Define types using the second format
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

