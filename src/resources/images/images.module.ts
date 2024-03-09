import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { imageProviders } from './image.providers';
import { DatabaseModule } from '../../database/database.module';
import { peopleProviders } from '../../resources/people/people.providers';
import { ThrottlerModule } from '@nestjs/throttler';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ThrottlerModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        throttlers: [
          {
            ttl: configService.getOrThrow('UPLOAD_RATE_TTL'),
            limit: configService.getOrThrow('UPLOAD_RATE_LIMIT'),
          },
        ],
        errorMessage: 'error throttling occurs',
      }),
      inject: [ConfigService],
    }),
    DatabaseModule,
  ],
  controllers: [ImagesController],
  providers: [ImagesService, ...imageProviders, ...peopleProviders],
})
export class ImagesModule {}
