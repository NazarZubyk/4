import { Module } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { VehiclesController } from './vehicles.controller';
import { vehicleProviders } from './vehicle.providers';

@Module({
  controllers: [VehiclesController],
  providers: [VehiclesService,...vehicleProviders],
})
export class VehiclesModule {}
