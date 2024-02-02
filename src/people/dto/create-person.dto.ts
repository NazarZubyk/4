export class CreatePersonDto {
  readonly name: string;
  readonly height: number;
  readonly mass: number;
  readonly hair_color: string;
  readonly skin_color: string;
  readonly eye_color: string;
  readonly birth_year: string;
  readonly gender: string;
  readonly homeworld: string;
  readonly films: string[];
  readonly species: string[];
  readonly vehicles: string[];
  readonly starships: string[];
  readonly created: string;
  readonly edited: string;
  readonly url: string;
}