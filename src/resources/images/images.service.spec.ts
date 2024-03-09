import { Test, TestingModule } from '@nestjs/testing';
import { ImagesService } from './images.service';
import { imageProviders } from './image.providers';
import { ConfigService } from '@nestjs/config'; // Import ConfigService

describe('ImagesService', () => {
  let service: ImagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ImagesService,
        // Provide mock implementation for ConfigService
        {
          provide: ConfigService,
          useValue: {
            getOrThrow: jest.fn(), // Mock the getOrThrow method or any other methods used in your service
          }
        },
        {
          provide: 'DATA_SOURCE',
          useValue: {} // Mock DataSource implementation
        },
        {
          provide: 'IMAGE_REPOSITORY',
          useValue: {} // Mock DataSource implementation
        },
        {
          provide: 'PEOPLE_REPOSITORY',
          useValue: {} // Mock PEOPLE_REPOSITORY implementation
        },
      ],
    }).compile();

    service = module.get<ImagesService>(ImagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
