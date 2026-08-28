import Redis from 'ioredis';
import logger from '../utils/logger';

const redisConfig = {
    host: process.env.REDIS_HOST || 'localhost',
    port: Number.parseInt(process.env.REDIS_PORT || '6379', 10),
    password: process.env.REDIS_PASSWORD || undefined,
    lazyConnect: process.env.NODE_ENV === 'test' || process.env.REDIS_DISABLED === 'true',
    enableOfflineQueue: false,
    maxRetriesPerRequest: 1,
};

const redis = new Redis(redisConfig);

redis.on('connect', () => {
    logger.info('Redis connected (Cache)');
});

redis.on('error', (err) => {
    if (process.env.NODE_ENV !== 'test') logger.error('Redis error', err);
});

export default redis;
