import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Film } from 'src/resources/films/entities/film.entity';
import { Person } from 'src/resources/people/entities/person.entity';

export class CreateStarshipDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly MGLT: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  readonly cargo_capacity: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly consumables: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  readonly cost_in_credits: number;



  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly crew: string;



  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly hyperdrive_rating: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  readonly length: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly manufacturer: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly max_atmosphering_speed: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly model: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly name: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  readonly passengers: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly starship_class: string;



  @ApiProperty({ type: () => Film, isArray: true })
  readonly films: Film[];

  @ApiProperty({ type: () => Person, isArray: true })
  readonly pilots: Person[];
}
