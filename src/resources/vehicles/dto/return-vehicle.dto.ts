import { Film } from "src/resources/films/entities/film.entity";
import { Person } from "src/resources/people/entities/person.entity";

export class ReturnVehicleDto {
    id: number;
    cargo_capacity: number;
    consumables: string;
    cost_in_credits: number;
    crew: number;
    length: number;
    manufacturer: string;
    max_atmosphering_speed: number;
    model: string;
    name: string;
    passengers: number;
    vehicle_class: string;
    created: string;
    edited: string;
    url: string;
    pilots: Person[]|string[];
    films: Film[]|string[];
  }