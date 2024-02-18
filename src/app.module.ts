import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PeopleModule } from './resources/people/people.module';
import { DatabaseModule } from './database/database.module';
import { ImagesModule } from './resources/images/images.module';
import { FilmsModule } from './resources/films/films.module';
import { StarshipsModule } from './resources/starships/starships.module';
import { VehiclesModule } from './resources/vehicles/vehicles.module';
import { SpeciesModule } from './resources/species/species.module';
import { PlanetsModule } from './resources/planets/planets.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from './interceptors/response.interceptor';

@Module({
  imports: [
    PeopleModule,
    DatabaseModule,
    ImagesModule,
    FilmsModule,
    StarshipsModule,
    VehiclesModule,
    SpeciesModule,
    PlanetsModule,
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },],
})
export class AppModule {}
