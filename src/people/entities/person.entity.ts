import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Image } from '../../images/entities/image.entity';

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
  homeworld: string;
  @Column()
  url: string;

  @Column('simple-array')
  films: string[];
  @Column('simple-array')
  species: string[];
  @Column('simple-array')
  vehicles: string[];
  @Column('simple-array')
  starships: string[];

  @OneToMany(() => Image, (image) => image.person)
  images: Image[];
}
