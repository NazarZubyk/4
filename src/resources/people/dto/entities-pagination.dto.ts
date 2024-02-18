import { CreatePersonDto } from './create-person.dto';

export class EntitiesPaginationDto {
  entities: CreatePersonDto[];
  meta: {
    totalItems: number;
    currentPage: number;
    pageSize: number;
    totalPages: number;
  };
}
