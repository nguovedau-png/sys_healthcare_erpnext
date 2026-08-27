import { Request, Response } from 'express';
import { RoleService } from './role.service';

export class RoleController {
    static async create(req: Request, res: Response) {
        try {
            const role = await RoleService.create(req.body);
            res.status(201).json({ success: true, data: role });
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message });
        }
    }

    static async findAll(req: Request, res: Response) {
        try {
            const roles = await RoleService.findAll();
            res.status(200).json({ success: true, data: roles });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    static async findOne(req: Request, res: Response) {
        try {
            const role = await RoleService.findOne(req.params.id);
            if (!role) return res.status(404).json({ success: false, message: 'Role not found' });
            res.status(200).json({ success: true, data: role });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    static async update(req: Request, res: Response) {
        try {
            const role = await RoleService.update(req.params.id, req.body);
            res.status(200).json({ success: true, data: role });
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message });
        }
    }

    static async delete(req: Request, res: Response) {
        try {
            await RoleService.delete(req.params.id);
            res.status(200).json({ success: true, message: 'Role deleted' });
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message });
        }
    }
}
