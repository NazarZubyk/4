import { Film } from "src/resources/films/entities/film.entity";
import { Planet } from "src/resources/planets/entities/planet.entity";
import { Species } from "src/resources/species/entities/species.entity";
import { Starship } from "src/resources/starships/entities/starship.entity";
import { Vehicle } from "src/resources/vehicles/entities/vehicle.entity";
import { Image } from 'src/resources/images/entities/image.entity';

export class ReturnPersonDto{
    
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
  

    homeworld: Planet[]|string[];
  
   
  
    films: Film[]|string[];
  

    species: Species[]|string[];
  

    vehicles: Vehicle[]|string[];

    starships: Starship[]|string[];
 
    images: Image[]|string[];
}