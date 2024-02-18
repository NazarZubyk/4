import { Module } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { VehiclesController } from './vehicles.controller';
import { vehicleProviders } from './vehicle.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [VehiclesController],
  providers: [VehiclesService,...vehicleProviders],
})
export class VehiclesModule {}
