import { Test, TestingModule } from '@nestjs/testing';
import { VehiclesController } from './vehicles.controller';
import { VehiclesService } from './vehicles.service';

describe('VehiclesController', () => {
  let controller: VehiclesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VehiclesController],
      providers: [VehiclesService,
        {
          provide:'FILM_REPOSITORY',
          useValue:{}
        },
        {
          provide:'VEHICLE_REPOSITORY',
          useValue:{}
        },
        {
          provide:'PEOPLE_REPOSITORY',
          useValue:{}
        },
      ],
    }).compile();

    controller = module.get<VehiclesController>(VehiclesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
