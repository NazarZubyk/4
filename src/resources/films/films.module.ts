import { Module } from '@nestjs/common';
import { FilmsService } from './films.service';
import { FilmsController } from './films.controller';
import { filmProviders } from './film.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [FilmsController],
  providers: [FilmsService,...filmProviders],
})
export class FilmsModule {}
