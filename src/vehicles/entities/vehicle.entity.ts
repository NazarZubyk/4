import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  url: string;

  pilots: string[];
  films: string[];
}
