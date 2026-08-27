import Redis from 'ioredis';
import logger from '../utils/logger';

const redisConfig = {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379'),
    password: process.env.REDIS_PASSWORD,
};

const redis = new Redis(redisConfig);

redis.on('connect', () => {
    logger.info('Redis connected (Cache)');
});

redis.on('error', (err) => {
    logger.error('Redis error', err);
});

export default redis;
