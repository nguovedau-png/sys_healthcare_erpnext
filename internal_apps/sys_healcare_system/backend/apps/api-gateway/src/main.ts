import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';
import { WinstonModule } from 'nest-winston';
import { AppModule } from './app.module';
import { loggerConfig, AllExceptionsFilter } from '@app/common';

const bootstrapLogger = new Logger('ApiGatewayBootstrap');

function parseList(value: string | undefined, fallback: string[]): string[] {
  const values = value?.split(',').map((item) => item.trim()).filter(Boolean);
  return values?.length ? values : fallback;
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger(loggerConfig),
  });
  const frontendOrigins = parseList(
    process.env.FRONTEND_ORIGINS || process.env.EXPECTED_ORIGIN,
    ['http://localhost:3000'],
  );
  if (process.env.NODE_ENV === 'production' && !process.env.FRONTEND_ORIGINS) {
    bootstrapLogger.warn('FRONTEND_ORIGINS is not configured; using the development origin fallback');
  }
  app.enableCors({
    origin: frontendOrigins,
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  }));
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  // Security
  const helmet = require('helmet');
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
        'img-src': parseList(process.env.CSP_IMAGE_SOURCES, [
          "'self'",
          'data:',
          'https://images.unsplash.com',
          'https://picsum.photos',
        ]),
        'connect-src': parseList(process.env.CSP_CONNECT_SOURCES, [
          "'self'",
          ...frontendOrigins,
          'http://localhost:5050',
        ]),
      },
    },
  }));

  // Performance
  const compression = require('compression');
  app.use(compression());

  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapterHost));

  // Global Logging
  const { LoggingInterceptor } = require('@app/common');
  app.useGlobalInterceptors(new LoggingInterceptor());

  // Swagger Configuration
  const { DocumentBuilder, SwaggerModule } = require('@nestjs/swagger');
  const config = new DocumentBuilder()
    .setTitle('Healthcare SaaS API')
    .setDescription('Microservices API Gateway Documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
      queue: 'api_gateway_queue',
      queueOptions: { durable: true },
    },
  });

  await app.startAllMicroservices();
  const port = process.env.PORT || 3000;
  await app.listen(port);
  bootstrapLogger.log(`Application is running on port ${port}`);
}
bootstrap();
