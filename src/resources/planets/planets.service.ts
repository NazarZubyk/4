import { Inject, Injectable } from '@nestjs/common';
import { CreatePlanetDto } from './dto/create-planet.dto';
import { UpdatePlanetDto } from './dto/update-planet.dto';
import { Repository } from 'typeorm';
import { Planet } from './entities/planet.entity';

@Injectable()
export class PlanetsService {

  constructor(
    @Inject('PLANET_REPOSITORY')
    private planetRepository: Repository<Planet>,
  ){}

  async create(createPlanetDto: CreatePlanetDto) {

    await this.planetRepository.save(createPlanetDto)

    return 'This action adds a new planet';
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
