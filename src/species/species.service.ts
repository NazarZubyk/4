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

  findOne(id: number) {
    return `This action returns a #${id} species`;
  }

  update(id: number, updateSpeciesDto: UpdateSpeciesDto) {
    return `This action updates a #${id} species`;
  }

  remove(id: numsber) {
    return `This action removes a #${id} species`;
  }
}
