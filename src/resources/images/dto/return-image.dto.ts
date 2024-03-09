import { Person } from '../../../resources/people/entities/person.entity';

export class ReturnImageDto {
  id: number;
  created: string;
  edited: string;
  url: string;
  keyAWS: string;
  person: Person | string;
}
