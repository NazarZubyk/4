import { DataSource } from 'typeorm';
import { Species } from './entities/species.entity';

export const speciesProviders = [
  {
    provide: 'SPECIES_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Species),
    inject: ['DATA_SOURCE'],
  },
];
