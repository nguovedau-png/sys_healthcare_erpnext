import { Request, Response } from 'express';
import { AuditLogService } from './audit-log.service';

export class AuditLogController {

    static async findAll(req: Request, res: Response) {
        try {
            const result = await AuditLogService.findAll(req.query);
            res.status(200).json({ success: true, ...result });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
}
