import { DataSource } from 'typeorm';
import { Planet } from './entities/planet.entity';

export const planetProviders = [
  {
    provide: 'PLANET_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Planet),
    inject: ['DATA_SOURCE'],
  },
];
