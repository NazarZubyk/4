import { Film } from '../../../resources/films/entities/film.entity';
import { Planet } from '../../../resources/planets/entities/planet.entity';
import { Species } from '../../../resources/species/entities/species.entity';
import { Starship } from '../../../resources/starships/entities/starship.entity';
import { Vehicle } from '../../../resources/vehicles/entities/vehicle.entity';
import { Image } from '../../../resources/images/entities/image.entity';

export class ReturnPersonDto {
  id: number;

  name: string;

  height: number;

  mass: number;

  hair_color: string;

  skin_color: string;

  eye_color: string;

  birth_year: string;

  gender: string;

  created: string;

  edited: string;

  url: string;

  homeworld: Planet[] | string[];

  films: Film[] | string[];

  species: Species[] | string[];

  vehicles: Vehicle[] | string[];

  starships: Starship[] | string[];

  images: Image[] | string[];
}
