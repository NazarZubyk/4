import { Film } from 'src/films/entities/film.entity';
import { Person } from 'src/people/entities/person.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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
  @Column()
  url: string;

  @ManyToOne(()=>Film,(film)=>film.starships)
  films: Film[];

  @ManyToOne(() => Person, (person) => person.starships)
  pilots: Person[];
}
