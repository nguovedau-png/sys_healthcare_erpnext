import { Request, Response } from 'express';
import { PermissionService } from './permission.service';

export class PermissionController {
    static async create(req: Request, res: Response) {
        try {
            const permission = await PermissionService.create(req.body);
            res.status(201).json({ success: true, data: permission });
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message });
        }
    }

    static async findAll(req: Request, res: Response) {
        try {
            const permissions = await PermissionService.findAll();
            res.status(200).json({ success: true, data: permissions });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    static async update(req: Request, res: Response) {
        try {
            const permission = await PermissionService.update(req.params.id, req.body);
            res.status(200).json({ success: true, data: permission });
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message });
        }
    }

    static async delete(req: Request, res: Response) {
        try {
            await PermissionService.delete(req.params.id);
            res.status(200).json({ success: true, message: 'Permission deleted' });
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message });
        }
    }
}
