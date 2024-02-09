import { Module } from '@nestjs/common';
import { PeopleController } from './people.controller';
import { peopleProviders } from './people.providers';
import { PeopleService } from './people.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [PeopleController],
  providers: [...peopleProviders, PeopleService],
})
export class PeopleModule {}
