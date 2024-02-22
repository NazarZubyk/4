import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { CreateStarshipDto } from './dto/create-starship.dto';
import { UpdateStarshipDto } from './dto/update-starship.dto';
import { In, Repository } from 'typeorm';
import { Starship } from './entities/starship.entity';
import { Person } from '../people/entities/person.entity';
import { Planet } from '../planets/entities/planet.entity';
import { Film } from '../films/entities/film.entity';
import { Species } from '../species/entities/species.entity';
import { Vehicle } from '../vehicles/entities/vehicle.entity';
import { generateURLforGETsByID } from 'src/utils/generatorURLs';

@Injectable()
export class StarshipsService {

  constructor(
    @Inject('PEOPLE_REPOSITORY')
    private peopleRepository: Repository<Person>,
    @Inject('FILM_REPOSITORY')
    private filmRepository: Repository<Film>,
    @Inject('SPECIES_REPOSITORY')
    private speciesRepository: Repository<Species>,
    @Inject('STARSHIP_REPOSITORY')
    private starshipRepository: Repository<Starship>,
  ){}

  async create(createStarshipDto: CreateStarshipDto) {

    const existingStarship = await this.starshipRepository.findOne({ where: { name: createStarshipDto.name } });
    
    if (existingStarship) {
      throw new ConflictException(`Starship with name '${createStarshipDto.name}' already exists`);
    }

    // Assuming you need to fetch related entities before saving
    const films = await this.filmRepository.find({
      where:{
        id:In(createStarshipDto.films)
      }
    })
    console.log('4')
    const pilots = await this.peopleRepository.find({
      where:{
        id: In(createStarshipDto.pilots)
      }
    })
  

    // Create a new planet entity and assign values from DTO
    const starship = new Starship();
    Object.assign(starship, createStarshipDto);



    // Assign fetched entities to the species
    starship.films = films;
    starship.pilots = pilots;
    
    console.log('1')
    console.log(starship)
    // Save the species entity
    const savedStarship = await this.starshipRepository.save(starship);
    console.log('2')
    //generate  save  url by ID
    savedStarship.url = await generateURLforGETsByID('starships',savedStarship.id);
    await this.starshipRepository.save(savedStarship);
    
    return savedStarship;
  }

  async findAll() {
    await this.starshipRepository.find()
    return `This action returns all starships`;
  }

  async findOne(id: number) {
    return await this.starshipRepository.findOneBy({id:id});
  }

  async update(id: number, updateStarshipDto: UpdateStarshipDto) {
    if(!updateStarshipDto){
      throw new Error('updateStarshipDto is not correct')
    }
    const starship = await this.starshipRepository.findOneBy({id:id});
    
    await Object.assign(starship,updateStarshipDto);

    this.starshipRepository.save(starship);

    return `This action updates a #${id} starship`;
  }

  async remove(id: number) {
    const starship = await this.starshipRepository.findOneBy({id:id});
    await this.starshipRepository.remove(starship);
    return `This action removes a #${id} starship`;
  }
}
