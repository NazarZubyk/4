import { Inject, Injectable } from '@nestjs/common';
import { CreateStarshipDto } from './dto/create-starship.dto';
import { UpdateStarshipDto } from './dto/update-starship.dto';
import { Repository } from 'typeorm';
import { Starship } from './entities/starship.entity';

@Injectable()
export class StarshipsService {

  constructor(
    @Inject('STARSHIP_REPOSITORY')
    private starshipRepository: Repository<Starship>,
  ){}

  async create(createStarshipDto: CreateStarshipDto) {
    await this.starshipRepository.save(createStarshipDto)
    return 'This action adds a new starship';
  }

  async findAll() {
    await this.starshipRepository.find()
    return `This action returns all starships`;
  }

  async findOne(name: string) {
    return await this.starshipRepository.findOneBy({name:name});
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
