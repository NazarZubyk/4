import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Film {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  created: string;

  @Column()
  director: string;

  @Column()
  edited: string;

  @Column()
  episode_id: number;

  @Column()
  opening_crawl: string;

  @Column()
  producer: string;

  @Column()
  release_date: string;

  @Column()
  title: string;

  @Column()
  url: string;

  vehicles: string[];
  species: string[];
  starships: string[];
  planets: string[];
  characters: string[];
}
