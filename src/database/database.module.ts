import { Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';
import { peopleProviders } from 'src/resources/people/people.providers';
import { imageProviders } from 'src/resources/images/image.providers';
import { filmProviders } from 'src/resources/films/film.providers';
import { planetProviders } from 'src/resources/planets/planet.providers';
import { speciesProviders } from 'src/resources/species/species.providers';
import { starshipProviders } from 'src/resources/starships/starship.providers';
import { vehicleProviders } from 'src/resources/vehicles/vehicle.providers';

@Module({
  imports: [], 
  providers: [
    ...databaseProviders,
    ...peopleProviders,
    ...imageProviders,
    ...filmProviders,
    ...planetProviders,
    ...speciesProviders,
    ...starshipProviders,
    ...vehicleProviders
  ],
  exports: [
    ...databaseProviders,
    ...peopleProviders,
    ...imageProviders,
    ...filmProviders,
    ...planetProviders,
    ...speciesProviders,
    ...starshipProviders,
    ...vehicleProviders
  ],
})
export class DatabaseModule {}
