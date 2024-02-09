import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
  created: string;
  @Column()
  crew: number;
  @Column()
  edited: string;
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

  url: string;

  films: string[];
  pilots: string[];
}
