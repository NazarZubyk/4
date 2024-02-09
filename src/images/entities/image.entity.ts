import { Person } from 'src/people/entities/person.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  path: string;

  @Column()
  url: string;

  @ManyToOne(() => Person, (person) => person.images)
  person: Person;
}
