import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  films: string[];
  residents: string[];
}
