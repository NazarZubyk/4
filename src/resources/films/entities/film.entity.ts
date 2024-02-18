import { Person } from 'src/resources/people/entities/person.entity';
import { Planet } from 'src/resources/planets/entities/planet.entity';
import { Species } from 'src/resources/species/entities/species.entity';
import { Starship } from 'src/resources/starships/entities/starship.entity';
import { Vehicle } from 'src/resources/vehicles/entities/vehicle.entity';
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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


  @ManyToMany(()=>Vehicle,(vehicle)=>vehicle.films,{ cascade: true })
  @JoinTable({ name: 'vehicle_film' })
  vehicles: Vehicle[];

  @ManyToMany(()=>Species,(species)=>species.films,{ cascade: true })
  @JoinTable({name: 'film_species'})
  species: Species[];


  @ManyToMany(()=>Starship,(starship)=>starship.films,{ cascade: true })
  @JoinTable({ name: 'film_starships' })
  starships: Starship[];

  @ManyToMany(()=>Planet,(planet)=>planet.films,{ cascade: true })
  @JoinTable({name: 'film_planets'})
  planets: Planet[];

  @ManyToMany(()=>Person,(person)=>person.films)
  @JoinTable({ name: 'person_film' })
  characters: Person[];
}
