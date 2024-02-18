import { Inject, Injectable } from '@nestjs/common';
import { CreateSpeciesDto } from './dto/create-species.dto';
import { UpdateSpeciesDto } from './dto/update-species.dto';
import { privateDecrypt } from 'crypto';
import { Repository } from 'typeorm';
import { Species } from './entities/species.entity';

@Injectable()
export class SpeciesService {

  constructor(
    @Inject('SPECIES_REPOSITORY')
    private speciesRepository: Repository<Species>,
  ){}

  async create(createSpeciesDto: CreateSpeciesDto) {
    await this.speciesRepository.save(createSpeciesDto)
    return 'This action adds a new species';
  }

  async findAll() {
    return await this.speciesRepository.find()
  }

  async findOne(id: number) {
    return await this.speciesRepository.findOneBy({id:id});
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
