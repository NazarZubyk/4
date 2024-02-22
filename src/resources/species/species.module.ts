import { Module } from '@nestjs/common';
import { SpeciesService } from './species.service';
import { SpeciesController } from './species.controller';
import { speciesProviders } from './species.providers';
import { DatabaseModule } from 'src/database/database.module';
import { PeopleModule } from '../people/people.module';
import { FilmsModule } from '../films/films.module';
import { PlanetsModule } from '../planets/planets.module';

@Module({
  imports: [
    DatabaseModule
  ],
  controllers: [SpeciesController],
  providers: [SpeciesService, ...speciesProviders],
})
export class SpeciesModule {}
