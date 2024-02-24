import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { Image } from './entities/image.entity';
import { Repository } from 'typeorm';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { unlink } from 'fs';
import { port } from 'src/main';
import { Person } from '../people/entities/person.entity';
import { ReturnImageDto } from './dto/return-image.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ImagesService {
  private readonly s3Client = new S3Client({
    region: this.configService.getOrThrow('AWS_S3_REGION'),
    credentials: {
      accessKeyId: this.configService.getOrThrow('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.getOrThrow('AWS_SECRET_ACCESS_KEY'),
    },

  })

  constructor(
    @Inject('IMAGE_REPOSITORY')
    private imagesRepository: Repository<Image>,
    @Inject('PEOPLE_REPOSITORY')
    private peopleRepository: Repository<Person>,
    private readonly configService : ConfigService
  ) {}

  async create(file: Express.Multer.File, name: string) {
    
    const person = await this.peopleRepository.findOne({where:{
      name: name,
    }});

    if (!person) {
      unlink(file.path, () => {});
      throw new NotFoundException('Person not found');
    }

    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: 'simple-storage-ku',
        Key: file.originalname,
        Body: file.buffer,
      })
    )

    // await this.imagesRepository.save({
    //   path: file.path,
    //   personID: person.id,
    //   url: ''
    // });

    // const image = await this.imagesRepository.findOneBy({ path: file.path });
    // image.url = `http://localhost:${port}/images/${image.id}`;
    // await this.imagesRepository.save(image);

    return 'This action adds a new image';
  }

  async findAll() {
    const images:ReturnImageDto[] = await this.imagesRepository.find({
      relations: ['person'],
    });


    images.forEach((image) => {
      if(
        image.person instanceof Person
      ){
        image.person = image.person.url ? image.person.url : '';
      }else{
        image.person = '';
      }
    });
  
    return images;
  }

  async findOne(id: number) {
    const image:ReturnImageDto  = await  this.imagesRepository.findOne({
      relations: ['person'],
      where:{ id: id }
    });

    if(!image){
      throw new NotFoundException(`Image with id - ${id} not found`)
    }

    
    if(
      image.person instanceof Person
    ){
      image.person = image.person.url ? image.person.url : '';
    }else{
      image.person = '';
    }

    return image;
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
