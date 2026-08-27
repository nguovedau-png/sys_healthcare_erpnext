import { Request, Response, NextFunction } from 'express';
import cacheService from '../utils/cache';
import logger from '../utils/logger';

export const cacheMiddleware = (ttl: number = 300) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        if (req.method !== 'GET') {
            return next();
        }

        const key = `cache:${req.originalUrl || req.url}`;

        try {
            const cachedResponse = await cacheService.get(key);
            if (cachedResponse) {
                logger.info(`Cache hit: ${key}`);
                // @ts-ignore
                return res.status(200).json(cachedResponse); // Assuming standard JSON response
            }

            // Capture original send/json
            const originalSend = res.json;
            // @ts-ignore
            res.json = (body) => {
                // Determine if success before caching? Usually we cache 200 responses.
                // But res.statusCode might not be set yet if just calling json.
                // Assuming status 200 if not specified
                if (res.statusCode === 200) {
                    cacheService.set(key, body, ttl);
                }
                return originalSend.call(res, body);
            };

            next();
        } catch (error) {
            logger.error('Cache middleware error', error);
            next();
        }
    };
};
