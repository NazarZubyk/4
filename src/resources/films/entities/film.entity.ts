import { Person } from '../../../resources/people/entities/person.entity';
import { Planet } from '../../../resources/planets/entities/planet.entity';
import { Species } from '../../../resources/species/entities/species.entity';
import { Starship } from '../../../resources/starships/entities/starship.entity';
import { Vehicle } from '../../../resources/vehicles/entities/vehicle.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Film {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  director: string;

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

  @CreateDateColumn()
  created: string;

  @UpdateDateColumn()
  edited: string;

  @Column({ nullable: true })
  url: string;

  @ManyToMany(() => Vehicle, (vehicle) => vehicle.films, { cascade: true })
  @JoinTable({ name: 'vehicle_film' })
  vehicles: Vehicle[];

  @ManyToMany(() => Species, (species) => species.films, { cascade: true })
  @JoinTable({ name: 'film_species' })
  species: Species[];

  @ManyToMany(() => Starship, (starship) => starship.films, { cascade: true })
  @JoinTable({ name: 'film_starships' })
  starships: Starship[];

  @ManyToMany(() => Planet, (planet) => planet.films, { cascade: true })
  @JoinTable({ name: 'film_planets' })
  planets: Planet[];

  @ManyToMany(() => Person, (person) => person.films)
  @JoinTable({ name: 'person_film' })
  characters: Person[];
}
