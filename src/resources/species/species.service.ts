import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSpeciesDto } from './dto/create-species.dto';
import { UpdateSpeciesDto } from './dto/update-species.dto';
import { privateDecrypt } from 'crypto';
import { In, Repository } from 'typeorm';
import { Species } from './entities/species.entity';
import { Person } from '../people/entities/person.entity';
import { Planet } from '../planets/entities/planet.entity';
import { Film } from '../films/entities/film.entity';
import { Starship } from '../starships/entities/starship.entity';
import { Vehicle } from '../vehicles/entities/vehicle.entity';
import { generateURLforGETsByID } from 'src/utils/generatorURLs';
import { ReturnSpeciesDto } from './dto/return-species.dto';

@Injectable()
export class SpeciesService {

  constructor(
    @Inject('PEOPLE_REPOSITORY')
    private peopleRepository: Repository<Person>,
    @Inject('PLANET_REPOSITORY')
    private planetRepository: Repository<Planet>,
    @Inject('FILM_REPOSITORY')
    private filmRepository: Repository<Film>,
    @Inject('SPECIES_REPOSITORY')
    private speciesRepository: Repository<Species>,
  ){}

  async create(createSpeciesDto: CreateSpeciesDto) {

    const existingSpecies = await this.speciesRepository.findOne({ where: { name: createSpeciesDto.name } });
 
    if (existingSpecies) {
      throw new ConflictException(`Species with name '${createSpeciesDto.name}' already exists`);
    }

    // Assuming you need to fetch related entities before saving
    const films = await this.filmRepository.find({
      where:{
        id:In(createSpeciesDto.films)
      }
    })
    const homeworld = await this.planetRepository.find({
      where:{
        id: In(createSpeciesDto.homeworld)
      }
    })
    const people = await this.peopleRepository.find({
      where:{
        id:In(createSpeciesDto.people)
      }
    })

    // Create a new planet entity and assign values from DTO
    const species = new Species();
    Object.assign(species, createSpeciesDto);



    // Assign fetched entities to the species
    species.films = films;
    species.homeworld = homeworld;
    species.people = people;

    // Save the species entity
    const savedSpecies = await this.speciesRepository.save(species);

    //generate  save  url by ID
    savedSpecies.url = await generateURLforGETsByID('species',savedSpecies.id);
    await this.speciesRepository.save(savedSpecies);
    
    return savedSpecies;
  }
  async findAll() {
    const species: ReturnSpeciesDto[] = await this.speciesRepository.find({
      relations: ['homeworld', 'people', 'films'],
    });
  
    species.forEach((species) => {
      species.homeworld = species.homeworld ? species.homeworld.map((planet) => planet.url) : [];
      species.people = species.people ? species.people.map((person) => person.url) : [];
      species.films = species.films ? species.films.map((film) => film.url) : [];
    });
  
    return species;
  }

  async findOne(id: number) {
    const species:ReturnSpeciesDto = await this.speciesRepository.findOne({
      relations: ['homeworld', 'people', 'films'],
      where:{id:id} 
    });

    if(!species){
      throw new NotFoundException(`Species with id - ${species.id} not found`)
    }
    species.homeworld = species.homeworld ? species.homeworld.map((planet) => planet.url) : [];
    species.people = species.people ? species.people.map((person) => person.url) : [];
    species.films = species.films ? species.films.map((film) => film.url) : [];

    return species;
  }

  async update(id: number, updateSpeciesDto: UpdateSpeciesDto) {
    const species = await this.speciesRepository.findOneBy({id:id});
    
    if(!species){
      throw new Error(`can't find species by id ${id}`)
    }

    await Object.assign(species,updateSpeciesDto);

    await this.speciesRepository.save(species);

    return `This action updates a #${id} species`;
  }

  async remove(id: number) {
    const species = await this.speciesRepository.findOneBy({id:id})
    await this.speciesRepository.remove(species);
    return `This action removes a #${id} species`;
  }
}
