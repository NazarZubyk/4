import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { Image } from './entities/image.entity';
import { Repository } from 'typeorm';
import { Person } from 'src/people/entities/person.entity';
import { unlink } from 'fs';

@Injectable()
export class ImagesService {

  constructor(
    @Inject('IMAGE_REPOSITORY')
    private imagesRepository: Repository<Image>,
    @Inject('PEOPLE_REPOSITORY')
    private peopleRepository: Repository<Person>,
  ) {}

  async create(file: Express.Multer.File, createImageDto: CreateImageDto) {
    console.log(file)
    const person = await this.peopleRepository.findOneBy({
      name: createImageDto.personeName
    })

    if (!person) {
      unlink(file.path,()=>{})
      throw new NotFoundException('Person not found');
    }

    await this.imagesRepository.save({
      
      path: file.path,
      personID: person.id

    })
    return 'This action adds a new image';
  }

  findAll() {
    return `This action returns all images`;
  }

  findOne(id: number) {
    return `This action returns a #${id} image`;
  }

  update(id: number, updateImageDto: UpdateImageDto) {
    return `This action updates a #${id} image`;
  }

  remove(id: number) {
    return `This action removes a #${id} image`;
  }
}
