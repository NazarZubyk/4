import { Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { UpdateImageDto } from './dto/update-image.dto';
import { Image } from './entities/image.entity';
import { Repository } from 'typeorm';
import { DeleteObjectCommand, GetObjectCommand, GetObjectCommandOutput, PutObjectCommand, PutObjectCommandOutput, S3Client } from '@aws-sdk/client-s3';
import { unlink } from 'fs';
import { port } from 'src/main';
import { Person } from '../people/entities/person.entity';
import { ReturnImageDto } from './dto/return-image.dto';
import { ConfigService } from '@nestjs/config';
import { generateFilename } from 'src/utils/generatorUniqueFileName';
import { BUCKET_NAME } from 'src/utils/constant';
import { NodeJsClient } from "@smithy/types";


@Injectable()
export class ImagesService {
  private readonly s3Client = new S3Client({
    region: this.configService.getOrThrow('AWS_S3_REGION'),
    credentials: {
      accessKeyId: this.configService.getOrThrow('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.getOrThrow('AWS_SECRET_ACCESS_KEY'),
    },

  })as NodeJsClient<S3Client>
  
  

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

    
    const key = await generateFilename(file);
    
    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: key,
        Body: file.buffer,
      })
    )

    // const data:GetObjectCommandOutput = await this.s3Client.send(new GetObjectCommand({
    //   Bucket:bucketName,
    //   Key: key
    // }))

    await this.imagesRepository.save({
      keyAWS: key,
      person: person,
      url: ''
    });

    const image = await this.imagesRepository.findOneBy({ keyAWS: key });
    image.url = `http://localhost:${port}/images/${image.id}`;
    await this.imagesRepository.save(image);

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
    let image:ReturnImageDto  = await  this.imagesRepository.findOne({
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

    const dataFromAws = await this.s3Client.send(new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: image.keyAWS,
    }))
   
      const data = await dataFromAws.Body.transformToString('base64')
       
    delete image.keyAWS;
   
    return{image: image,
            data:data };
  }

  async update(id: number, updateImageDto: UpdateImageDto, file: Express.Multer.File ) {
      //get person and image from repository
      const person = await this.peopleRepository.findOne({where:{
        name: updateImageDto.personeName
      }});

      const imageToUpdate = await this.imagesRepository.findOneBy({
        id: id,
      });

      //if image not exist we can't it change
      if (!imageToUpdate) {
        throw new NotFoundException(`Image with id #${id} not found`);
      }
      //update person if exist
      imageToUpdate.person = person ? person : imageToUpdate.person;
      // if haven't file it is end
      if(!file){
        await this.imagesRepository.save(imageToUpdate);
        return `This action updates a #${id} image`;
      }
      //if file exist need delete ald file from awsS3 
      const ansAWS = await this.s3Client.send(new DeleteObjectCommand({
        Bucket: BUCKET_NAME,
        Key: imageToUpdate.keyAWS,
      }))
      //if can't delete old file have problem
      if(!ansAWS.DeleteMarker){
        throw new NotFoundException(`Image with id #${id} can not found in aws`);
      }
      //if delete success generate key and rewrite DB
      const key = await generateFilename(file);
    
      await this.s3Client.send(
        new PutObjectCommand({
          Bucket: BUCKET_NAME,
          Key: key,
          Body: file.buffer,
        })
      )
      imageToUpdate.keyAWS = key;
      await this.imagesRepository.save(imageToUpdate);

      return `This action updates a #${id} image`;
  }

  async remove(id: number) {
    const img = await this.imagesRepository.findOneBy({ id: id });

    if(!img){
      throw new NotFoundException(`Image with id #${id} not found`);
    }
    const ansAWS = await this.s3Client.send(new DeleteObjectCommand({
        Bucket: BUCKET_NAME,
        Key: img.keyAWS,
      }))
    
   
    if(!ansAWS.DeleteMarker){
      throw new NotFoundException(`Image with id #${id} not found`);
    }

    await this.imagesRepository.remove(img);

    return `This action removes a #${id} image`;
  }
}
