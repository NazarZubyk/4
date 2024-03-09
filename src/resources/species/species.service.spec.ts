import { Test, TestingModule } from '@nestjs/testing';
import { SpeciesService } from './species.service';

describe('SpeciesService', () => {
  let service: SpeciesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpeciesService,
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

    service = module.get<SpeciesService>(SpeciesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
