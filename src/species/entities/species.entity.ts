import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
  homeworld: string;

  people: string[];
  films: string[];
}
