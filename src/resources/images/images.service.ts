import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { Image } from './entities/image.entity';
import { Repository } from 'typeorm';

import { unlink } from 'fs';
import { port } from 'src/main';
import { Person } from '../people/entities/person.entity';

@Injectable()
export class ImagesService {
  constructor(
    @Inject('IMAGE_REPOSITORY')
    private imagesRepository: Repository<Image>,
    @Inject('PEOPLE_REPOSITORY')
    private peopleRepository: Repository<Person>,
  ) {}

  async create(file: Express.Multer.File, name: string) {
    
    const person = await this.peopleRepository.findOne({where:{
      name: name,
    }});

    if (!person) {
      unlink(file.path, () => {});
      throw new NotFoundException('Person not found');
    }

    await this.imagesRepository.save({
      path: file.path,
      personID: person.id,
      url: ''
    });

    const image = await this.imagesRepository.findOneBy({ path: file.path });
    image.url = `http://localhost:${port}/images/${image.id}`;
    await this.imagesRepository.save(image);

    return 'This action adds a new image';
  }

  findAll() {
    return this.imagesRepository.find();
  }

  findOne(id: number) {
    return this.imagesRepository.findOneBy({ id: id });
  }

  async update(id: number, updateImageDto: UpdateImageDto) {
    const imageToUpdate = await this.imagesRepository.findOneBy({
      id: id,
    });

    if (!imageToUpdate) {
      throw new NotFoundException(`Person with id #${id} not found`);
    }

    Object.assign(imageToUpdate, updateImageDto);

    await this.imagesRepository.save(imageToUpdate);

    return `This action updates a #${id} image`;
  }

  async remove(id: number) {
    const img = await this.imagesRepository.findOneBy({ id: id });
    this.imagesRepository.remove(img);
    return `This action removes a #${id} image`;
  }
}
