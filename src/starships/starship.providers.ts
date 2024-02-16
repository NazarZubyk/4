import { DataSource } from 'typeorm';
import { Starship } from './entities/starship.entity';

export const starshipProviders = [
  {
    provide: 'STARSHIP_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Starship),
    inject: ['DATA_SOURCE'],
  },
];
