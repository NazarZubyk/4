import { Person } from 'src/people/entities/person.entity';
import { Planet } from 'src/planets/entities/planet.entity';
import { Species } from 'src/species/entities/species.entity';
import { Starship } from 'src/starships/entities/starship.entity';
import { Vehicle } from 'src/vehicles/entities/vehicle.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Film {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  created: string;

  @Column()
  director: string;

  @Column()
  edited: string;

  @Column()
  episode_id: number;

  @Column()
  opening_crawl: string;

  @Column()
  producer: string;

  @Column()
  release_date: string;

  @Column()
  title: string;

  @Column()
  url: string;

  @OneToMany(()=>Vehicle,(vehicle)=>vehicle.films)
  vehicles: Vehicle[];

  @OneToMany(()=>Species,(species)=>species.films)
  species: Species[];

  @OneToMany(()=>Starship,(starship)=>starship.films)
  starships: Starship[];

  @OneToMany(()=>Planet,(planet)=>planet.films)
  planets: Planet[];

  @OneToMany(()=>Person,(person)=>person.films)
  characters: string[];
}
