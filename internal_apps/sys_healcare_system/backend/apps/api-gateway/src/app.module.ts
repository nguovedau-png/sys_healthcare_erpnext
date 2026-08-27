import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { APP_INTERCEPTOR, APP_GUARD } from '@nestjs/core';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { JwtModule } from '@nestjs/jwt';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { RequestLoggerMiddleware } from './middleware/request-logger.middleware';
import { LoggingInterceptor, CircuitBreakerInterceptor, AuditInterceptor } from '@app/common';
import { AppController } from './app.controller';
import { AuthController } from './auth.controller';
import { UserController } from './user.controller';
import { RoleController } from './role.controller';
import { ErpController } from './erp.controller';
import { LoggerController } from './logger.controller';
import { PaymentController } from './payment.controller';
import { FileController } from './file.controller';
import { SettingController } from './setting.controller';
import { SearchController } from './search.controller';
import { BackgroundJobController } from './backgroundjob.controller';
import { ContentController } from './content.controller';
import { EducationController } from './education.controller';
import { PartnerController } from './partner.controller';
import { CommunityController } from './community.controller';
import { BookingController } from './booking.controller';
import { MarketingController } from './marketing.controller';
import { FinanceController } from './finance.controller';
import { SeminarController } from './seminar.controller';
import { ReportController } from './report.controller';
import { SurveyController } from './survey.controller';
import { AIController } from './ai.controller';
import { AnalyticController } from './analytic.controller';
import { EngagementController } from './engagement.controller';
import { GamificationController } from './gamification.controller';
import { LiveController } from './live.controller';
import { ShopController } from './shop.controller';
import { JobsController } from './jobs.controller';
import { NotificationController } from './notification.controller';
import { HealthController } from './health.controller';
import { AppService } from './app.service';
import { NotificationGateway } from './gateway/notification.gateway';
import { NotificationEventController } from './notification-event.controller';
import { ChatGateway } from './gateway/chat.gateway';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Module({
  imports: [
    JwtModule.register({ secret: process.env.JWT_SECRET || 'development-insecure-secret-change-me' }),
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 100,
    }]),
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
          queue: 'auth_queue',
          queueOptions: {
            durable: true,
          },
        },
      },
      {
        name: 'USER_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
          queue: 'user_queue',
          queueOptions: {
            durable: true,
          },
        },
      },
      {
        name: 'ERP_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
          queue: 'erp_queue',
          queueOptions: {
            durable: true,
          },
        },
      },
      {
        name: 'LOGGER_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
          queue: 'logger_queue',
          queueOptions: {
            durable: true,
          },
        },
      },
      {
        name: 'PAYMENT_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
          queue: 'payment_queue',
          queueOptions: {
            durable: true,
          },
        },
      },
      {
        name: 'FILE_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
          queue: 'file_queue',
          queueOptions: {
            durable: true,
          },
        },
      },
      {
        name: 'NOTIFICATION_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
          queue: 'notification_queue',
          queueOptions: {
            durable: true,
          },
        },
      },
      {
        name: 'SETTING_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
          queue: 'setting_queue',
          queueOptions: {
            durable: true,
          },
        },
      },
      {
        name: 'SEARCH_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
          queue: 'search_queue',
          queueOptions: {
            durable: true,
          },
        },
      },
      {
        name: 'BACKGROUNDJOB_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
          queue: 'backgroundjob_queue',
          queueOptions: {
            durable: true,
          },
        },
      },
      {
        name: 'CONTENT_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
          queue: 'content_queue',
          queueOptions: {
            durable: true,
          },
        },
      },
      {
        name: 'COMMUNITY_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
          queue: 'community_queue',
          queueOptions: {
            durable: true,
          },
        },
      },
      {
        name: 'BOOKING_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
          queue: 'booking_queue',
          queueOptions: {
            durable: true,
          },
        },
      },
      {
        name: 'EDUCATION_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
          queue: 'education_queue',
          queueOptions: {
            durable: true,
          },
        },
      },
      {
        name: 'PARTNER_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
          queue: 'partner_queue',
          queueOptions: {
            durable: true,
          },
        },
      },
      {
        name: 'MARKETING_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
          queue: 'marketing_queue',
          queueOptions: {
            durable: true,
          },
        },
      },
      {
        name: 'FINANCE_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
          queue: 'finance_queue',
          queueOptions: {
            durable: true,
          },
        },
      },
      {
        name: 'SEMINAR_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
          queue: 'seminar_queue',
          queueOptions: {
            durable: true,
          },
        },
      },
      {
        name: 'REPORT_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
          queue: 'report_queue',
          queueOptions: {
            durable: true,
          },
        },
      },
      {
        name: 'SURVEY_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
          queue: 'survey_queue',
          queueOptions: {
            durable: true,
          },
        },
      },
      {
        name: 'AI_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
          queue: 'ai_queue',
          queueOptions: {
            durable: true,
          },
        },
      },
      {
        name: 'ANALYTIC_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
          queue: 'analytic_queue',
          queueOptions: {
            durable: true,
          },
        },
      },
      {
        name: 'ENGAGEMENT_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
          queue: 'engagement_queue',
          queueOptions: {
            durable: true,
          },
        },
      },
      {
        name: 'GAMIFICATION_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
          queue: 'gamification_queue',
          queueOptions: {
            durable: true,
          },
        },
      },
      {
        name: 'LIVE_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
          queue: 'live_queue',
          queueOptions: {
            durable: true,
          },
        },
      },
      {
        name: 'SHOP_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
          queue: 'shop_queue',
          queueOptions: {
            durable: true,
          },
        },
      },
      {
        name: 'JOBS_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
          queue: 'jobs_queue',
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],
  controllers: [AppController, AuthController, UserController, RoleController, ErpController, LoggerController, PaymentController, FileController, SettingController, SearchController, BackgroundJobController, ContentController, EducationController, PartnerController, CommunityController, BookingController, MarketingController, FinanceController, SeminarController, ReportController, SurveyController, AIController, AnalyticController, EngagementController, GamificationController, LiveController, ShopController, JobsController, NotificationController, NotificationEventController, HealthController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: CircuitBreakerInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: AuditInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    NotificationGateway,
    ChatGateway,
    JwtAuthGuard,
  ],
  exports: [NotificationGateway, ChatGateway],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RequestLoggerMiddleware)
      .forRoutes('*');
  }
}
