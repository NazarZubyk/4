import { Film } from 'src/films/entities/film.entity';
import { Person } from 'src/people/entities/person.entity';
import { Planet } from 'src/planets/entities/planet.entity';
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Species {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  average_height: number;

  @Column()
  average_lifespan: number;

  @Column()
  classification: string;

  @Column()
  created: string;

  @Column()
  designation: string;

  @Column()
  edited: string;

  @Column()
  eye_colors: string;

  @Column()
  hair_colors: string;

  @Column()
  language: string;

  @Column()
  name: string;

  @Column()
  skin_colors: string;

  url: string;

  @ManyToOne(()=>Planet,(planet)=>planet.species)
  homeworld: Planet[];


  @ManyToOne(() => Person, (person) => person.species)
  people: Person[];

  @ManyToOne(()=>Film,(film)=>film.species)
  films: Film[];
}
