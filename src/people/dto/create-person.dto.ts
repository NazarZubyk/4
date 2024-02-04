import { IsArray, IsDate, IsDateString, IsNotEmpty, IsNumber, IsNumberString, IsString, IsUrl } from "class-validator";

export class CreatePersonDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;
  @IsNotEmpty()
  @IsNumberString()
  readonly height: number;
  @IsNotEmpty()
  @IsNumberString()
  readonly mass: number;
  @IsNotEmpty()
  @IsString()
  readonly hair_color: string;
  @IsNotEmpty()
  @IsString()
  readonly skin_color: string;
  @IsNotEmpty()
  @IsString()
  readonly eye_color: string;
  @IsNotEmpty()
  @IsString()
  readonly birth_year: string;
  @IsNotEmpty()
  @IsString()
  readonly gender: string;
  @IsNotEmpty()
  @IsString()
  readonly homeworld: string;
  @IsArray()
  @IsUrl({}, { each: true })
  readonly films: string[];
  @IsArray()
  @IsUrl({}, { each: true })
  readonly species: string[];
  @IsArray()
  @IsUrl({}, { each: true })
  readonly vehicles: string[];
  @IsArray()
  @IsUrl({}, { each: true })
  readonly starships: string[];
  @IsNotEmpty()
  @IsDateString()
  readonly created: string;
  @IsNotEmpty()
  @IsDateString()
  readonly edited: string;
  @IsNotEmpty()
  @IsUrl()
  readonly url: string;
}
