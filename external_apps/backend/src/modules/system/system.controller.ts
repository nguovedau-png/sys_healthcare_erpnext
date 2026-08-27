import { Request, Response } from 'express';
import { LanguageService, SettingService, HealthService } from './system.service';

export class SystemController {

    // Language
    static async createLanguage(req: Request, res: Response) {
        try {
            const result = await LanguageService.create(req.body);
            res.status(201).json({ success: true, data: result });
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message });
        }
    }

    static async getLanguages(req: Request, res: Response) {
        try {
            const result = await LanguageService.findAll();
            res.status(200).json({ success: true, data: result });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    static async updateLanguage(req: Request, res: Response) {
        try {
            const result = await LanguageService.update(req.params.id, req.body);
            res.status(200).json({ success: true, data: result });
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message });
        }
    }

    static async deleteLanguage(req: Request, res: Response) {
        try {
            await LanguageService.delete(req.params.id);
            res.status(200).json({ success: true, message: 'Language deleted' });
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message });
        }
    }

    // Settings
    static async getSettings(req: Request, res: Response) {
        try {
            // Check if user is admin or authenticated to see private settings
            // For simplicity, let's assume specific endpoint or query param for public
            // @ts-ignore
            const isAdmin = req.user?.role?.name === 'Admin';
            const result = await SettingService.findAll(isAdmin);
            res.status(200).json({ success: true, data: result });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    static async updateSetting(req: Request, res: Response) {
        try {
            const result = await SettingService.update(req.params.key, req.body.value);
            res.status(200).json({ success: true, data: result });
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message });
        }
    }

    // Health
    static async getHealth(req: Request, res: Response) {
        try {
            const result = await HealthService.check();
            res.status(200).json({ success: true, data: result });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
}
