import dotenv from 'dotenv';
import { setupWorkers } from './modules/queue/queue.service';
import prisma from './config/prisma';
import logger from './utils/logger';

dotenv.config();

async function bootstrap() {
    try {
        await prisma.$connect();
        logger.info('Worker Database connected successfully');

        setupWorkers();

        logger.info('Worker process started successfully');
    } catch (error) {
        logger.error('Failed to start worker process', error);
        process.exit(1);
    }
}

bootstrap();
