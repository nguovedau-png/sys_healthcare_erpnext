import { Request, Response } from 'express';
import cacheService from '../../utils/cache';

export class CacheController {

    static async getKeys(req: Request, res: Response) {
        try {
            const pattern = (req.query.pattern as string) || '*';
            const keys = await cacheService.getAllKeys(pattern);

            // Return key names only; values are fetched explicitly through getKeyDetail
            // to avoid exposing the entire cache or performing an unbounded multi-read.

            res.status(200).json({ success: true, data: keys });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    static async getKeyDetail(req: Request, res: Response) {
        try {
            const key = req.query.key as string;
            if (!key) throw new Error('Key is required');

            const value = await cacheService.get(key);
            const ttl = await cacheService.getTtl(key);

            res.status(200).json({ success: true, data: { key, value, ttl } });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    static async setKey(req: Request, res: Response) {
        try {
            const { key, value, ttl } = req.body;
            await cacheService.set(key, value, ttl);
            res.status(200).json({ success: true, message: 'Key set successfully' });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    static async deleteKey(req: Request, res: Response) {
        try {
            const key = req.query.key as string;
            if (!key) throw new Error('Key is required');

            await cacheService.del(key);
            res.status(200).json({ success: true, message: 'Key deleted' });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    static async clearAll(req: Request, res: Response) {
        try {
            await cacheService.invalidatePattern('*');
            res.status(200).json({ success: true, message: 'All cache cleared' });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
}
