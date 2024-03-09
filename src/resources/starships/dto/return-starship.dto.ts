import { Film } from '../../../resources/films/entities/film.entity';
import { Person } from '../../../resources/people/entities/person.entity';

export class ReturnStarshipDto {
  id: number;
  MGLT: string;
  cargo_capacity: number;
  consumables: string;
  cost_in_credits: number;
  crew: string;
  hyperdrive_rating: string;
  length: number;
  manufacturer: string;
  max_atmosphering_speed: string;
  model: string;
  name: string;
  passengers: number;
  starship_class: string;
  created: string;
  edited: string;
  url: string;
  films: Film[] | string[];
  pilots: Person[] | string[];
}
