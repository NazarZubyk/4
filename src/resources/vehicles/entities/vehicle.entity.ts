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
export class Vehicle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cargo_capacity: number;
  @Column()
  consumables: string;
  @Column()
  cost_in_credits: number;

  @Column()
  crew: number;

  @Column()
  length: number;
  @Column()
  manufacturer: string;
  @Column()
  max_atmosphering_speed: number;
  @Column()
  model: string;
  @Column()
  name: string;
  @Column()
  passengers: number;
  @Column()
  vehicle_class: string;

  @CreateDateColumn()
  created: string;

  @UpdateDateColumn()
  edited: string;

  @Column({ nullable: true })
  url: string;

  @ManyToMany(() => Person, (person) => person.vehicles)
  @JoinTable({ name: 'person_vehicle' })
  pilots: Person[];

  @ManyToMany(() => Film, (film) => film.vehicles)
  @JoinTable({ name: 'vehicle_film' })
  films: Film[];
}
