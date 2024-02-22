
import { Person } from 'src/resources/people/entities/person.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  path: string;


  @CreateDateColumn()
  created: string;

  @UpdateDateColumn()
  edited: string;  


  @Column()
  url: string;

  @ManyToOne(() => Person, (person) => person.images)
  person: Person;
}
