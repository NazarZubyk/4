import { Module } from '@nestjs/common';
import { StarshipsService } from './starships.service';
import { StarshipsController } from './starships.controller';
import { starshipProviders } from './starship.providers';
import { DatabaseModule } from '../../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [StarshipsController],
  providers: [StarshipsService, ...starshipProviders],
})
export class StarshipsModule {}
