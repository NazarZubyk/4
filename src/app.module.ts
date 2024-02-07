import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PeopleModule } from './people/people.module';
import { DatabaseModule } from './database/database.module';
import { ImagesModule } from './images/images.module';

@Module({
  imports: [PeopleModule,DatabaseModule, ImagesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
