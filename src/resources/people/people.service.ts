import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { Person } from './entities/person.entity';
import { EntitiesPaginationDto } from './dto/entities-pagination.dto';
import { In, Repository } from 'typeorm';
import { generateURLforGETsByID } from '../../utils/generatorURLs';
import { Planet } from '../planets/entities/planet.entity';
import { Film } from '../films/entities/film.entity';
import { Species } from '../species/entities/species.entity';
import { Image } from '../images/entities/image.entity';
import { Starship } from '../starships/entities/starship.entity';
import { Vehicle } from '../vehicles/entities/vehicle.entity';
import { ReturnPersonDto } from './dto/return-person.dto';

@Injectable()
export class PeopleService {
  constructor(
    @Inject('PEOPLE_REPOSITORY')
    private peopleRepository: Repository<Person>,
    @Inject('PLANET_REPOSITORY')
    private planetRepository: Repository<Planet>,
    @Inject('FILM_REPOSITORY')
    private filmRepository: Repository<Film>,
    @Inject('SPECIES_REPOSITORY')
    private speciesRepository: Repository<Species>,
    @Inject('IMAGE_REPOSITORY')
    private imagesRepository: Repository<Image>,
    @Inject('STARSHIP_REPOSITORY')
    private starshipRepository: Repository<Starship>,
    @Inject('VEHICLE_REPOSITORY')
    private vehicleRepository: Repository<Vehicle>,
  ) {}

  async create(createPersonDto: CreatePersonDto) {
    //find and taste dublicate
    const existingPerson = await this.peopleRepository.findOne({
      where: { name: createPersonDto.name },
    });

    if (existingPerson) {
      throw new ConflictException(
        `Person with name '${createPersonDto.name}' already exists`,
      );
    }

    const homeworld = await this.planetRepository.find({
      where: {
        id: In(createPersonDto.homeworld),
      },
    });

    const films = await this.filmRepository.find({
      where: {
        id: In(createPersonDto.films),
      },
    });

    const species = await this.speciesRepository.find({
      where: {
        id: In(createPersonDto.species),
      },
    });

    const vehicles = await this.vehicleRepository.find({
      where: {
        id: In(createPersonDto.vehicles),
      },
    });

    const starships = await this.starshipRepository.find({
      where: {
        id: In(createPersonDto.starships),
      },
    });

    const images = await this.imagesRepository.find({
      where: {
        id: In(createPersonDto.images),
      },
    });

    //ctrate entity and transpot data
    const person = new Person();
    Object.assign(person, createPersonDto);

    person.homeworld = homeworld;
    person.films = films;
    person.species = species;
    person.vehicles = vehicles;
    person.starships = starships;
    person.images = images;

    //save i db (generate unique ID)
    const savedPerson = await this.peopleRepository.save(person);

    //generate url by ID
    savedPerson.url = await generateURLforGETsByID('people', savedPerson.id);

    //save URL in db
    await this.peopleRepository.save(savedPerson);

    return savedPerson;
  }

  async findAll() {
    const people: ReturnPersonDto[] = await this.peopleRepository.find({
      relations: [
        'films',
        'species',
        'vehicles',
        'starships',
        'images',
        'homeworld',
      ],
    });

    people.forEach((person) => {
      person.starships = person.starships
        ? person.starships.map((starship) => starship.url)
        : [];
      person.films = person.films ? person.films.map((film) => film.url) : [];
      person.species = person.species
        ? person.species.map((specoes) => specoes.url)
        : [];
      person.vehicles = person.vehicles
        ? person.vehicles.map((vehicle) => vehicle.url)
        : [];
      person.images = person.images
        ? person.images.map((image) => image.url)
        : [];
      person.homeworld = person.homeworld
        ? person.homeworld.map((homeworld) => homeworld.url)
        : [];
    });
    return people;
  }

  async findOne(id: number) {
    const person: ReturnPersonDto = await this.peopleRepository.findOne({
      relations: [
        'films',
        'species',
        'vehicles',
        'starships',
        'images',
        'homeworld',
      ],
      where: {
        id: id,
      },
    });

    if (!person) {
      throw new NotFoundException(`Person  with id - ${id} not found`);
    }

    person.starships = person.starships
      ? person.starships.map((starship) => starship.url)
      : [];
    person.films = person.films ? person.films.map((film) => film.url) : [];
    person.species = person.species
      ? person.species.map((specoes) => specoes.url)
      : [];
    person.vehicles = person.vehicles
      ? person.vehicles.map((vehicle) => vehicle.url)
      : [];
    person.images = person.images
      ? person.images.map((image) => image.url)
      : [];
    person.homeworld = person.homeworld
      ? person.homeworld.map((homeworld) => homeworld.url)
      : [];

    return person;
  }

  async update(name: string, updatePersonDto: UpdatePersonDto) {
    const personToUpdate = await this.peopleRepository.findOneBy({
      name: name,
    });

    if (!personToUpdate) {
      throw new NotFoundException(`Person with name '${name}' not found`);
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
