import { Person } from "src/resources/people/entities/person.entity";

export class ReturnImageDto {
    id: number;
    path: string;
    created: string;
    edited: string;
    url: string;
    person: Person|string;
  }
  