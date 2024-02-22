import { Module } from '@nestjs/common';
import { PeopleController } from './people.controller';
import { peopleProviders } from './people.providers';
import { PeopleService } from './people.service';
import { DatabaseModule } from 'src/database/database.module';
import { ImagesModule } from '../images/images.module';
import { FilmsModule } from '../films/films.module';
import { StarshipsModule } from '../starships/starships.module';
import { VehiclesModule } from '../vehicles/vehicles.module';
import { SpeciesModule } from '../species/species.module';
import { PlanetsModule } from '../planets/planets.module';
import { imageProviders } from '../images/image.providers';


@Module({
  imports: [ DatabaseModule ],
  controllers: [PeopleController],
  providers: [ PeopleService],
})
export class PeopleModule {}
