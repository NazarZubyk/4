import { Injectable } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { Person } from './entities/person.entity';
import { EntitiesPaginationDto } from './dto/entities-pagination.dto';

let entities: Person[] = [];

@Injectable()
export class PeopleService {
  create(createPersonDto: CreatePersonDto) {
    entities.push(createPersonDto);
    return 'This action adds a new person';
  }

  findAll() {
    return JSON.stringify(entities);
  }

  findOne(name: string) {
    const personFind = entities.find((person) => person.name === name);
    return JSON.stringify(personFind);
  }

  update(name: string, updatePersonDto: UpdatePersonDto) {

    const personToUpdate = entities.find((person) => person.name === name);

    if (!personToUpdate) {
      return `Person with id #${name} not found`;
    }

    for (const key in updatePersonDto) {
      if (updatePersonDto.hasOwnProperty(key)) {
        personToUpdate[key] = updatePersonDto[key];
      }
    }

    return `This action updates a #${name} person`;
  }

  entitiesWithPagination(page:number,size:number){
    const totalItems = entities.length;
    
    // get size from req or 10 by deffolt
    size = size ? size : 10;
    //number of pages
    const pages = Math.ceil(totalItems/size);
    //get page from req or las by deffolt
    page = page ? page : pages
    
    const startIndex = (page - 1) * size;
    const endIndex = Math.min(startIndex + size, totalItems);
    
    const entitiesRes: CreatePersonDto[] = entities.slice(startIndex, endIndex);
    

    const dataRes:EntitiesPaginationDto = {
      entities: entitiesRes,
      meta: {
        totalItems: totalItems,    
        currentPage: page,     
        pageSize: size,       
        totalPages: pages      
      }
    }
    console.log(dataRes)
    return dataRes;

  }

  remove(name: string) {
    const personToDeleteIndex = entities.findIndex(
      (person) => person.name === name,
    );

    if (personToDeleteIndex !== -1) {
      entities.splice(personToDeleteIndex, 1);
      return `This action removes a #${name} person`;
    }

    return `#${name} person is not exist`;
  }
}
