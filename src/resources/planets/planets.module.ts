import { Module } from '@nestjs/common';
import { PlanetsService } from './planets.service';
import { PlanetsController } from './planets.controller';
import { planetProviders } from './planet.providers';
import { DatabaseModule } from '../../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [PlanetsController],
  providers: [PlanetsService, ...planetProviders],
})
export class PlanetsModule {}
