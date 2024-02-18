import { Film } from 'src/resources/films/entities/film.entity';
import { Person } from 'src/resources/people/entities/person.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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
  created: string;
  @Column()
  crew: number;
  @Column()
  edited: string;
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
  @Column()
  url: string;

  @ManyToMany(() => Person, (person) => person.vehicles)
  @JoinTable({ name: 'person_vehicle' })
  pilots: Person[];
  
  @ManyToMany(() => Film,(film)=>film.vehicles)
  @JoinTable({ name: 'vehicle_film' })
  films: Film[];
}
