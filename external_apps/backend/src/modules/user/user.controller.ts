import { Request, Response } from 'express';
import { UserService } from './user.service';

export class UserController {
    static async create(req: Request, res: Response) {
        try {
            const user = await UserService.create(req.body);
            res.status(201).json({ success: true, data: user });
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message });
        }
    }

    static async findAll(req: Request, res: Response) {
        try {
            const result = await UserService.findAll(req.query);
            res.status(200).json({ success: true, ...result });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    static async findOne(req: Request, res: Response) {
        try {
            const user = await UserService.findOne(req.params.id);
            if (!user) return res.status(404).json({ success: false, message: 'User not found' });
            res.status(200).json({ success: true, data: user });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    static async update(req: Request, res: Response) {
        try {
            const user = await UserService.update(req.params.id, req.body);
            res.status(200).json({ success: true, data: user });
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message });
        }
    }

    static async delete(req: Request, res: Response) {
        try {
            await UserService.delete(req.params.id);
            res.status(200).json({ success: true, message: 'User deleted' });
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message });
        }
    }
}
