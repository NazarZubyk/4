import { Module } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { VehiclesController } from './vehicles.controller';
import { vehicleProviders } from './vehicle.providers';
import { DatabaseModule } from 'src/database/database.module';
import { PeopleModule } from '../people/people.module';
import { FilmsModule } from '../films/films.module';

@Module({
  imports: [
    DatabaseModule
  ],
  controllers: [VehiclesController],
  providers: [VehiclesService,...vehicleProviders],
})
export class VehiclesModule {}
