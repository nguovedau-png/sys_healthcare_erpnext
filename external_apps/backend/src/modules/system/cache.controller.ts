import { Request, Response } from 'express';
import cacheService from '../../utils/cache';

export class CacheController {

    static async getKeys(req: Request, res: Response) {
        try {
            const pattern = (req.query.pattern as string) || '*';
            const keys = await cacheService.getAllKeys(pattern);

            // Optional: Get details (value/ttl) for each key? 
            // For now just return keys to be fast, or maybe enrich data.
            // Let's return list of objects { key, ttl } for better UI?
            // Doing mget or pipeline might be heavy if too many keys.
            // Let's just return keys and let client fetch details if needed, 
            // OR fetch details for the first N keys.
            // Given "view data", better to have list first, then click to view details.

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
