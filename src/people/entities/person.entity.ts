import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Image } from 'src/images/entities/image.entity';
import { Species } from 'src/species/entities/species.entity';
import { Vehicle } from 'src/vehicles/entities/vehicle.entity';
import { Starship } from 'src/starships/entities/starship.entity';
import { Film } from 'src/films/entities/film.entity';
import { Planet } from 'src/planets/entities/planet.entity';

@Entity()
export class Person {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  height: number;

  @Column()
  mass: number;

  @Column()
  hair_color: string;

  @Column()
  skin_color: string;

  @Column()
  eye_color: string;

  @Column()
  birth_year: string;

  @Column()
  gender: string;

  @Column()
  created: string;

  @Column()
  edited: string;


  @Column()
  url: string;

  @ManyToOne(() => Planet, (planet) => planet.residents)
  homeworld: Planet[];

  @ManyToOne(() => Film, (film) => film.characters)
  films: Film[];

  @OneToMany(() => Species, (species) => species.people)
  species: Species[];

  @OneToMany(() => Vehicle, (vehicle) => vehicle.pilots)
  vehicles: Vehicle[];

  @OneToMany(() => Starship, (starship) => starship.pilots)
  starships: Starship[];

  @OneToMany(() => Image, (image) => image.person)
  images: Image[];
}
