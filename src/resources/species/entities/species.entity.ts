import { Film } from 'src/resources/films/entities/film.entity';
import { Person } from 'src/resources/people/entities/person.entity';
import { Planet } from 'src/resources/planets/entities/planet.entity';
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

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
  designation: string;


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

  @CreateDateColumn()
  created: string;

  @UpdateDateColumn()
  edited: string;  

  @Column({nullable:true})
  url: string;

  @ManyToMany(()=>Planet,(planet)=>planet.species)
  @JoinTable({name: 'planet_species'})
  homeworld: Planet[];


  @ManyToMany(() => Person, (person) => person.species)
  @JoinTable({name: 'person_species'})
  people: Person[];

  @ManyToMany(()=>Film,(film)=>film.species)
  @JoinTable({name: 'film_species'})
  films: Film[];
}
