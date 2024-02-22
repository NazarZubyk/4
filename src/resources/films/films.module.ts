import { Module } from '@nestjs/common';
import { FilmsService } from './films.service';
import { FilmsController } from './films.controller';
import { filmProviders } from './film.providers';
import { DatabaseModule } from 'src/database/database.module';
import { PeopleModule } from '../people/people.module';
import { StarshipsModule } from '../starships/starships.module';
import { VehiclesModule } from '../vehicles/vehicles.module';
import { SpeciesModule } from '../species/species.module';
import { PlanetsModule } from '../planets/planets.module';

@Module({
  imports: [
    DatabaseModule
  ],
  controllers: [FilmsController],
  providers: [FilmsService,...filmProviders],
})
export class FilmsModule {}
