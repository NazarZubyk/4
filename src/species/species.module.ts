import { Module } from '@nestjs/common';
import { SpeciesService } from './species.service';
import { SpeciesController } from './species.controller';
import { speciesProviders } from './species.providers';

@Module({
  controllers: [SpeciesController],
  providers: [SpeciesService, ...speciesProviders],
})
export class SpeciesModule {}
