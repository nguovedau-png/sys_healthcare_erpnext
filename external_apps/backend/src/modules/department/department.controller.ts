import { Request, Response } from 'express';
import { DepartmentService } from './department.service';

export class DepartmentController {
    static async create(req: Request, res: Response) {
        try {
            const result = await DepartmentService.create(req.body);
            res.status(201).json({ success: true, data: result });
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message });
        }
    }

    static async findAll(req: Request, res: Response) {
        try {
            const result = await DepartmentService.findAll();
            res.status(200).json({ success: true, data: result });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    static async findOne(req: Request, res: Response) {
        try {
            const result = await DepartmentService.findOne(req.params.id);
            if (!result) return res.status(404).json({ success: false, message: 'Department not found' });
            res.status(200).json({ success: true, data: result });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    static async update(req: Request, res: Response) {
        try {
            const result = await DepartmentService.update(req.params.id, req.body);
            res.status(200).json({ success: true, data: result });
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message });
        }
    }

    static async delete(req: Request, res: Response) {
        try {
            await DepartmentService.delete(req.params.id);
            res.status(200).json({ success: true, message: 'Department deleted' });
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message });
        }
    }
}
