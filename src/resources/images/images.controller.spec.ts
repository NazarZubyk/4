import { Test, TestingModule } from '@nestjs/testing';
import { ImagesController } from './images.controller';
import { ImagesService } from './images.service';
import { ConfigService } from '@nestjs/config';

describe('ImagesController', () => {
  let controller: ImagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImagesController],
      providers: [ImagesService,
        {
          provide: ConfigService,
          useValue: {
            getOrThrow: jest.fn(), // Mock the getOrThrow method or any other methods used in your service
          }
        },
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

    controller = module.get<ImagesController>(ImagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
