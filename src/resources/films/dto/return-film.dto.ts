import { Person } from '../../../resources/people/entities/person.entity';
import { Planet } from '../../../resources/planets/entities/planet.entity';
import { Species } from '../../../resources/species/entities/species.entity';
import { Starship } from '../../../resources/starships/entities/starship.entity';
import { Vehicle } from '../../../resources/vehicles/entities/vehicle.entity';

export class ReturnFilmDto {
  id: number;
  director: string;
  episode_id: number;
  opening_crawl: string;
  producer: string;
  release_date: string;
  title: string;
  created: string;
  edited: string;
  url: string;
  vehicles: Vehicle[] | string[];
  species: Species[] | string[];
  starships: Starship[] | string[];
  planets: Planet[] | string[];
  characters: Person[] | string[];
}
