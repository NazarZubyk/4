import { Module } from '@nestjs/common';
import { PlanetsService } from './planets.service';
import { PlanetsController } from './planets.controller';
import { planetProviders } from './planet.providers';

@Module({
  controllers: [PlanetsController],
  providers: [PlanetsService, ...planetProviders],
})
export class PlanetsModule {}
