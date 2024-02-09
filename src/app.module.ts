import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PeopleModule } from './people/people.module';
import { DatabaseModule } from './database/database.module';
import { ImagesModule } from './images/images.module';
import { FilmsModule } from './films/films.module';
import { StarshipsModule } from './starships/starships.module';
import { VehiclesModule } from './vehicles/vehicles.module';
import { SpeciesModule } from './species/species.module';
import { PlanetsModule } from './planets/planets.module';

@Module({
  imports: [
    PeopleModule,
    DatabaseModule,
    ImagesModule,
    FilmsModule,
    StarshipsModule,
    VehiclesModule,
    SpeciesModule,
    PlanetsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
