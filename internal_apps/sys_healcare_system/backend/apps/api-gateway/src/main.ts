import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';
import { WinstonModule } from 'nest-winston';
import { AppModule } from './app.module';
import { loggerConfig, AllExceptionsFilter } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger(loggerConfig),
  });
  app.enableCors();
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
        "img-src": ["'self'", "data:", "https://images.unsplash.com", "https://picsum.photos", "http://localhost:3000"],
        "connect-src": ["'self'", "http://localhost:3000", "http://localhost:5050"],
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
  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
