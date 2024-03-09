import { Test, TestingModule } from '@nestjs/testing';
import { PeopleService } from './people.service';

describe('PeopleService', () => {
  let service: PeopleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
        },
      ],
    }).compile();

    service = module.get<PeopleService>(PeopleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
