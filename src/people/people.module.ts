import { Module } from '@nestjs/common';
import { PeopleController } from './people.controller';
import { DatabaseModule } from 'src/ database.module';
import { peopleProviders } from './people.providers';
import { PeopleService } from './people.service';

@Module({
  imports: [DatabaseModule],
  controllers: [PeopleController],
  providers: [...peopleProviders,
    PeopleService],
})
export class PeopleModule {}
