import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Planet } from '../../../resources/planets/entities/planet.entity';
import { Species } from '../../../resources/species/entities/species.entity';
import { Vehicle } from '../../../resources/vehicles/entities/vehicle.entity';
import { Starship } from '../../../resources/starships/entities/starship.entity';
import { Person } from '../../../resources/people/entities/person.entity';

export class CreateFilmDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly director: string;

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

  @ApiProperty({ type: () => Person, isArray: true })
  readonly characters: Person[];

  @ApiProperty({ type: () => Planet, isArray: true })
  readonly planets: Planet[];

  @ApiProperty({ type: () => Species, isArray: true })
  readonly species: Species[];

  @ApiProperty({ type: () => Vehicle, isArray: true })
  readonly vehicles: Vehicle[];

  @ApiProperty({ type: () => Starship, isArray: true })
  readonly starships: Starship[];
}
