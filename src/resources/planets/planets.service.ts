import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { CreatePlanetDto } from './dto/create-planet.dto';
import { UpdatePlanetDto } from './dto/update-planet.dto';
import { In, Repository } from 'typeorm';
import { Planet } from './entities/planet.entity';
import { Person } from '../people/entities/person.entity';
import { Film } from '../films/entities/film.entity';
import { Species } from '../species/entities/species.entity';
import { Starship } from '../starships/entities/starship.entity';
import { Vehicle } from '../vehicles/entities/vehicle.entity';
import { generateURLforGETsByID } from 'src/utils/generatorURLs';

@Injectable()
export class PlanetsService {

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

  async create(createPlanetDto: CreatePlanetDto) {

    const existingPlanet = await this.planetRepository.findOne({ where: { name: createPlanetDto.name } });
 
    if (existingPlanet) {
      throw new ConflictException(`Planet with name '${createPlanetDto.name}' already exists`);
    }

    // Assuming you need to fetch related entities before saving
    const films = await this.filmRepository.find({
      where:{
        id:In(createPlanetDto.films)
      }
    })
    const species = await this.speciesRepository.find({
      where:{
        id: In(createPlanetDto.species)
      }
    })
    const residents = await this.peopleRepository.find({
      where:{
        id:In(createPlanetDto.residents)
      }
    })

    // Create a new planet entity and assign values from DTO
    const planet = new Planet();
    Object.assign(planet, createPlanetDto);



    // Assign fetched entities to the planet
    planet.films = films;
    planet.species = species;
    planet.residents = residents;

    // Save the planet entity
    const savedPlanet = await this.planetRepository.save(planet);

    //generate url by ID
    savedPlanet.url = await generateURLforGETsByID('planets',savedPlanet.id);

    //save URL in db 
    await this.peopleRepository.save(savedPlanet);

    return savedPlanet;
  }

  async findAll() {
    return await this.planetRepository.find();
  }

  async findOne(id: number) {
    return await this.planetRepository.findOneBy({id:id});
  }

  async update(id: number, updatePlanetDto: UpdatePlanetDto) {

    const planet = await this.planetRepository.findOneBy({id:id})
    if(!planet){
      throw new Error(`Can't fint planet by id - ${id}`)
    }

    await Object.assign(planet,updatePlanetDto);
    await this.planetRepository.save(planet);

    return `This action updates a #${id} planet`;
  }

  async remove(id: number) {
    const planet = await this.planetRepository.findOneBy({id:id})
    await this.planetRepository.remove(planet);
    return `This action removes a #${id} planet`;
  }
}
