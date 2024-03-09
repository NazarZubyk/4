import { Test, TestingModule } from '@nestjs/testing';
import { PeopleController } from './people.controller';
import { PeopleService } from './people.service';

describe('PeopleController', () => {
  let controller: PeopleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PeopleController],
      providers: [PeopleService,
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
        },
        {
          provide:'IMAGE_REPOSITORY',
          useValue:{}
        },
        {
          provide:'STARSHIP_REPOSITORY',
          useValue:{}
        },
        {
          provide:'VEHICLE_REPOSITORY',
          useValue:{}
        },],
    }).compile();

    controller = module.get<PeopleController>(PeopleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
