import { Inject, Injectable } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { Person } from './entities/person.entity';
import { EntitiesPaginationDto } from './dto/entities-pagination.dto';
import { Repository } from 'typeorm';

@Injectable()
export class PeopleService {
  constructor(
    @Inject('PEOPLE_REPOSITORY')
    private peopleRepository: Repository<Person>,
  ) {}

  async create(createPersonDto: CreatePersonDto) {
    await this.peopleRepository.save(createPersonDto);
    return 'This action adds a new person';
  }

  async findAll() {
    return await this.peopleRepository.find();
  }

  async findOne(name: string) {
    const personFind = await this.peopleRepository.findOneBy({
      name: name,
    });
    return personFind;
  }

  async update(name: string, updatePersonDto: UpdatePersonDto) {
    const personToUpdate = await this.peopleRepository.findOneBy({
      name: name,
    });

    if (!personToUpdate) {
      return `Person with id #${name} not found`;
    }

    Object.assign(personToUpdate, updatePersonDto);

    await this.peopleRepository.save(personToUpdate);

    return `This action updates a #${name} person`;
  }

  async entitiesWithPagination(page: number, size: number) {
    const totalItems = await this.peopleRepository.count(); //entities.length;

    // get size from req or 10 by deffolt
    size = size ? size : 10;
    //number of pages
    const pages = Math.ceil(totalItems / size);
    //get page from req or las by deffolt
    page = page ? page : pages;

    const startIndex = (page - 1) * size;
    const endIndex = Math.min(startIndex + size, totalItems);

    //const entitiesRes: CreatePersonDto[] = entities.slice(startIndex, endIndex);
    const entitiesRes: CreatePersonDto[] = await this.peopleRepository.find({
      skip: startIndex,
      take: endIndex - startIndex + 1,
    });

    const dataRes: EntitiesPaginationDto = {
      entities: entitiesRes,
      meta: {
        totalItems: totalItems,
        currentPage: page,
        pageSize: size,
        totalPages: pages,
      },
    };
    //console.log(dataRes)
    return dataRes;
  }

  async remove(name: string) {
    const personToDelete = await this.peopleRepository.findOneBy({
      name: name,
    });

    if (personToDelete !== undefined) {
      await this.peopleRepository.remove(personToDelete);
      return `This action removes a #${name} person`;
    }

    return `#${name} person is not exist`;
  }
}
