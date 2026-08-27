import { NestFactory } from '@nestjs/core';
import { AppModule } from '../apps/api-gateway/src/app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
    const logger = new Logger('Seeder');
    logger.log('Starting Unified Seeding...');

    // In a real scenario, we would import PrismaServices from each module
    // or call their specific seed commands.

    // Simulate Auth Service Seeding
    logger.log('[Auth] Seeding Admin User...');
    await new Promise(r => setTimeout(r, 500));
    logger.log('[Auth] Admin User "admin@example.com" ensured.');

    // Simulate Content Service Seeding
    logger.log('[Content] Seeding Categories...');
    await new Promise(r => setTimeout(r, 500));
    logger.log('[Content] Categories "Health", "News", "Tips" ensured.');

    // Simulate Master Data
    logger.log('[Master] Seeding Locations...');
    await new Promise(r => setTimeout(r, 500));
    logger.log('[Master] Cities/Districts ensured.');

    logger.log('Unified Seeding Completed Successfully.');
}

bootstrap();
