import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Species } from 'src/resources/species/entities/species.entity';
import { Vehicle } from 'src/resources/vehicles/entities/vehicle.entity';
import { Starship } from 'src/resources/starships/entities/starship.entity';
import { Planet } from 'src/resources/planets/entities/planet.entity';
import { Film } from 'src/resources/films/entities/film.entity';
import { Image } from 'src/resources/images/entities/image.entity';

@Entity()
export class Person {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique:true})
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

  @CreateDateColumn()
  created: string;

  @UpdateDateColumn()
  edited: string;  


  @Column({nullable: true})
  url: string;

  @ManyToOne(() => Planet, (planet) => planet.residents,{ cascade: true })
  homeworld: Planet[];

  @ManyToMany(() => Film, (film) => film.characters,{ cascade: true })
  @JoinTable({ name: 'person_film' })
  films: Film[];

  @ManyToMany(() => Species, (species) => species.people,{ cascade: true })
  @JoinTable({ name: 'person_species'})
  species: Species[];

  @ManyToMany(() => Vehicle, (vehicle) => vehicle.pilots,{ cascade: true })
  @JoinTable({ name: 'person_vehicle' })
  vehicles: Vehicle[];

  @ManyToMany(() => Starship, (starship) => starship.pilots,{ cascade: true })
  @JoinTable({ name: 'person_starships' })
  starships: Starship[];

  @OneToMany(() => Image, (image) => image.person,{ cascade: true })
  images: Image[];
}
