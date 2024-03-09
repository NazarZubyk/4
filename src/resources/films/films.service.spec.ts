import { Test, TestingModule } from '@nestjs/testing';
import { FilmsService } from './films.service';

describe('FilmsService', () => {
  let service: FilmsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FilmsService,
        {
          provide: 'PEOPLE_REPOSITORY',
          useValue: {}
        },
        {
          provide: 'PLANET_REPOSITORY',
          useValue: {}
        },
        {
          provide: 'FILM_REPOSITORY',
          useValue: {}
        },
        {
          provide: 'SPECIES_REPOSITORY',
          useValue: {}
        },
        {
          provide: 'STARSHIP_REPOSITORY',
          useValue: {}
        },
        {
          provide: 'VEHICLE_REPOSITORY',
          useValue: {}
        },],
    }).compile();

    service = module.get<FilmsService>(FilmsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
