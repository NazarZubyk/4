import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { imageProviders } from './image.providers';
import { DatabaseModule } from 'src/database/database.module';
import { peopleProviders } from 'src/people/people.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [ImagesController],
  providers: [ImagesService, ...imageProviders, ...peopleProviders],
})
export class ImagesModule {}