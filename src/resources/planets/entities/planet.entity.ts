import { Film } from 'src/resources/films/entities/film.entity';
import { Person } from 'src/resources/people/entities/person.entity';
import { Species } from 'src/resources/species/entities/species.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Planet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  climate: string;

  @Column()
  created: string;

  @Column()
  diameter: number;

  @Column()
  edited: string;

  @Column()
  gravity: number;

  @Column()
  name: string;

  @Column()
  orbital_period: number;

  @Column()
  population: number;

  @Column()
  rotation_period: number;

  @Column()
  surface_water: number;

  @Column()
  terrain: string;

  @Column()
  url: string;


  @ManyToMany(()=>Species,(spacies)=>spacies.homeworld)
  @JoinTable({name: 'planet_species'})
  species: Species[];

  @ManyToMany(()=>Film,(film)=>film.planets)
  @JoinTable({name: 'film_planets'})
  films: Film[];

  @OneToMany(()=>Person,(person)=>person.homeworld)
  residents: Person[];
}
