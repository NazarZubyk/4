import { Test, TestingModule } from '@nestjs/testing';
import { StarshipsController } from './starships.controller';
import { StarshipsService } from './starships.service';
import { CreateStarshipDto } from './dto/create-starship.dto';
import { ReturnStarshipDto } from './dto/return-starship.dto';
import { Starship } from './entities/starship.entity';

describe('StarshipsController', () => {
  let controller: StarshipsController;
  let service: StarshipsService;

  beforeEach(async () => {
    

    const module: TestingModule = await Test.createTestingModule({
      controllers: [StarshipsController],
      providers: [StarshipsService,
      {
        provide:'PEOPLE_REPOSITORY',
        useValue:{}
      },
      {
        provide:'FILM_REPOSITORY',
        useValue:{}
      },
      {
        provide:'STARSHIP_REPOSITORY',
        useValue:{}
      },
    ],
    }).compile();

    controller = module.get<StarshipsController>(StarshipsController);
    service = module.get<StarshipsService>(StarshipsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a new starship', async () => {
    const createStarshipDto: CreateStarshipDto = {
      MGLT: '100',
      cargo_capacity: 500,
      consumables: '1 month',
      cost_in_credits: 1000000,
      crew: '10',
      hyperdrive_rating: '2.0',
      length: 150,
      manufacturer: 'Corellian Engineering Corporation',
      max_atmosphering_speed: '950',
      model: 'CR90 corvette',
      name: 'Starship Name',
      passengers: 100,
      starship_class: 'Capital ship',
      films: [], // Assuming an array of Film objects
      pilots: [], // Assuming an array of Person objects
    };
    const returnStarshipDto: ReturnStarshipDto = {
      id: 1,
      MGLT: '100',
      cargo_capacity: 500,
      consumables: '1 month',
      cost_in_credits: 1000000,
      crew: '10',
      hyperdrive_rating: '2.0',
      length: 150,
      manufacturer: 'Corellian Engineering Corporation',
      max_atmosphering_speed: '950',
      model: 'CR90 corvette',
      name: 'Starship Name',
      passengers: 100,
      starship_class: 'Capital ship',
      created: '2024-03-09T10:00:00Z', // Assuming format is UTC ISO string
      edited: '2024-03-09T10:00:00Z', // Assuming format is UTC ISO string
      url: 'http://example.com/starships/1',
      films: [], // Assuming an array of Film objects or strings
      pilots: [], // Assuming an array of Person objects or strings
    };
    jest.spyOn(service, 'create').mockResolvedValueOnce(returnStarshipDto as Starship);

    const result = await controller.create(createStarshipDto);

    expect(result).toEqual(returnStarshipDto);
  });
  
});
