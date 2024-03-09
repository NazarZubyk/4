import { Film } from '../../../resources/films/entities/film.entity';
import { Person } from '../../../resources/people/entities/person.entity';
import { Species } from '../../../resources/species/entities/species.entity';

export class ReturnPlanetDto {
  id: number;
  climate: string;
  diameter: number;
  gravity: number;
  name: string;
  orbital_period: number;
  population: number;
  rotation_period: number;
  surface_water: number;
  terrain: string;
  url: string;
  created: string;
  edited: string;
  species: Species[] | string[];
  films: Film[] | string[];
  residents: Person[] | string[];
}
