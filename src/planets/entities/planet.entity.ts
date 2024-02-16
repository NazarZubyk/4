import { Film } from 'src/films/entities/film.entity';
import { Person } from 'src/people/entities/person.entity';
import { Species } from 'src/species/entities/species.entity';
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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

  @OneToMany(()=>Species,(spacies)=>spacies.homeworld)
  species: Species[];

  @ManyToOne(()=>Film,(film)=>film.planets)
  films: Film[];

  @OneToMany(()=>Person,(person)=>person.homeworld)
  residents: Person[];
}
