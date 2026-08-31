import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { redisStore } from 'cache-manager-redis-yet';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { AuditInterceptor } from './interceptors/audit.interceptor';

@Module({
  imports: [
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        store: await redisStore({
          socket: {
            host: configService.get('REDIS_HOST', 'localhost'),
            port: parseInt(configService.get('REDIS_PORT', '6379'), 10),
          },
          ttl: 600, // 10 minutes default
        }),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [HttpExceptionFilter, LoggingInterceptor, AuditInterceptor],
  exports: [CacheModule, HttpExceptionFilter, LoggingInterceptor, AuditInterceptor],
})
export class CommonModule { }
