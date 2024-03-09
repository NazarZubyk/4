import { Film } from '../../../resources/films/entities/film.entity';
import { Person } from '../../../resources/people/entities/person.entity';
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
export class Starship {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  MGLT: string;
  @Column()
  cargo_capacity: number;
  @Column()
  consumables: string;
  @Column()
  cost_in_credits: number;

  @Column()
  crew: string;

  @Column()
  hyperdrive_rating: string;
  @Column()
  length: number;
  @Column()
  manufacturer: string;
  @Column()
  max_atmosphering_speed: string;
  @Column()
  model: string;
  @Column()
  name: string;
  @Column()
  passengers: number;
  @Column()
  starship_class: string;

  @CreateDateColumn()
  created: string;

  @UpdateDateColumn()
  edited: string;

  @Column({ nullable: true })
  url: string;

  @ManyToMany(() => Film, (film) => film.starships)
  @JoinTable({ name: 'film_starships' })
  films: Film[];

  @ManyToMany(() => Person, (person) => person.starships)
  @JoinTable({ name: 'person_starships' })
  pilots: Person[];
}
