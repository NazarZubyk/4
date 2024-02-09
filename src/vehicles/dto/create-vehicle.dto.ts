import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsArray, IsUrl } from 'class-validator';

export class CreateVehicleDto {
  @ApiProperty()
  @IsNumber()
  readonly cargo_capacity: number;

  @ApiProperty()
  @IsString()
  readonly consumables: string;

  @ApiProperty()
  @IsNumber()
  readonly cost_in_credits: number;

  @ApiProperty()
  @IsString()
  readonly created: string;

  @ApiProperty()
  @IsNumber()
  readonly crew: number;

  @ApiProperty()
  @IsString()
  readonly edited: string;

  @ApiProperty()
  @IsNumber()
  readonly length: number;

  @ApiProperty()
  @IsString()
  readonly manufacturer: string;

  @ApiProperty()
  @IsNumber()
  readonly max_atmosphering_speed: number;

  @ApiProperty()
  @IsString()
  readonly model: string;

  //@ApiProperty()
  @IsString()
  readonly name: string;

  @ApiProperty()
  @IsNumber()
  readonly passengers: number;

  @ApiProperty()
  @IsString()
  readonly vehicle_class: string;

  @ApiProperty()
  @IsString()
  readonly url: string;

  @ApiProperty()
  @IsArray()
  @IsUrl({}, { each: true })
  readonly pilots: string[];

  @ApiProperty()
  @IsArray()
  @IsUrl({}, { each: true })
  readonly films: string[];
}
