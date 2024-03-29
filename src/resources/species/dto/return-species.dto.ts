import { Film } from '../../../resources/films/entities/film.entity';
import { Person } from '../../../resources/people/entities/person.entity';
import { Planet } from '../../../resources/planets/entities/planet.entity';

export class ReturnSpeciesDto {
  id: number;
  average_height: number;
  average_lifespan: number;
  classification: string;
  designation: string;
  eye_colors: string;
  hair_colors: string;
  language: string;
  name: string;
  skin_colors: string;
  created: string;
  edited: string;
  url: string;
  homeworld: Planet[] | string[];
  people: Person[] | string[];
  films: Film[] | string[];
}
