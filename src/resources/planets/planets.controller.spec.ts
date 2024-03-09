import { Test, TestingModule } from '@nestjs/testing';
import { PlanetsController } from './planets.controller';
import { PlanetsService } from './planets.service';

describe('PlanetsController', () => {
  let controller: PlanetsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlanetsController],
      providers: [PlanetsService,
        {
          provide:'PEOPLE_REPOSITORY',
          useValue:{}
        },
        {
          provide:'PLANET_REPOSITORY',
          useValue:{}
        },
        {
          provide:'FILM_REPOSITORY',
          useValue:{}
        },
        {
          provide:'SPECIES_REPOSITORY',
          useValue:{}
        },],
    }).compile();

    controller = module.get<PlanetsController>(PlanetsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
