import redis from '../config/redis';
import logger from './logger';

class CacheService {
    private defaultTTL = 3600; // 1 hour

    async get<T>(key: string): Promise<T | null> {
        try {
            const data = await redis.get(key);
            if (data) {
                return JSON.parse(data) as T;
            }
            return null;
        } catch (error) {
            logger.error(`Cache get error for key ${key}`, error);
            return null;
        }
    }

    async set(key: string, value: any, ttl?: number): Promise<void> {
        try {
            const stringValue = JSON.stringify(value);
            if (ttl) {
                await redis.set(key, stringValue, 'EX', ttl);
            } else {
                await redis.set(key, stringValue, 'EX', this.defaultTTL);
            }
        } catch (error) {
            logger.error(`Cache set error for key ${key}`, error);
        }
    }

    async del(key: string): Promise<void> {
        try {
            await redis.del(key);
        } catch (error) {
            logger.error(`Cache del error for key ${key}`, error);
        }
    }

    async invalidatePattern(pattern: string): Promise<void> {
        try {
            const keys = await redis.keys(pattern);
            if (keys.length > 0) {
                await redis.del(...keys);
                logger.info(`Invalidated cache pattern: ${pattern} (${keys.length} keys)`);
            }
        } catch (error) {
            logger.error(`Cache invalidate error for pattern ${pattern}`, error);
        }
    }

    async getAllKeys(pattern: string = '*'): Promise<string[]> {
        try {
            return await redis.keys(pattern);
        } catch (error) {
            logger.error('Cache getAllKeys error', error);
            return [];
        }
    }

    async getTtl(key: string): Promise<number> {
        try {
            return await redis.ttl(key);
        } catch (error) {
            return -1;
        }
    }
}

export default new CacheService();
