import { Test, TestingModule } from '@nestjs/testing';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';

describe('FilmsController', () => {
  let controller: FilmsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
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
        },
      ],
    }).compile();

    controller = module.get<FilmsController>(FilmsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
