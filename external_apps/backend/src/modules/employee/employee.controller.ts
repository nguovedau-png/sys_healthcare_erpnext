import { Request, Response } from 'express';
import { EmployeeService } from './employee.service';

export class EmployeeController {
    static async create(req: Request, res: Response) {
        try {
            const result = await EmployeeService.create(req.body);
            res.status(201).json({ success: true, data: result });
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message });
        }
    }

    static async findAll(req: Request, res: Response) {
        try {
            const result = await EmployeeService.findAll(req.query);
            res.status(200).json({ success: true, ...result });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    static async findOne(req: Request, res: Response) {
        try {
            const result = await EmployeeService.findOne(req.params.id);
            if (!result) return res.status(404).json({ success: false, message: 'Employee not found' });
            res.status(200).json({ success: true, data: result });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    static async update(req: Request, res: Response) {
        try {
            const result = await EmployeeService.update(req.params.id, req.body);
            res.status(200).json({ success: true, data: result });
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message });
        }
    }

    static async delete(req: Request, res: Response) {
        try {
            await EmployeeService.delete(req.params.id);
            res.status(200).json({ success: true, message: 'Employee deleted' });
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message });
        }
    }
}
