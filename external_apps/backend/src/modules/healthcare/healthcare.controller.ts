import { Request, Response } from 'express';
import { AuthRequest } from '../../middlewares/auth.middleware';
import { ForbiddenError, HealthcareError } from './healthcare.errors';
import { HealthcareService } from './healthcare.service';
import { getERPNextClient } from './erpnext.client';
import { parseAmendment, parseAppointment, parseEncounter, parsePatient, parseScopeQuery, parseTransition } from './healthcare.validation';

function actor(req: AuthRequest) { return req.user as { id: string; role?: { name?: string; isSystem?: boolean } | null }; }
function sendError(res: Response, error: unknown) {
    if (error instanceof HealthcareError) return res.status(error.statusCode).json({ success: false, code: error.code, message: error.message, ...(error.details ? { details: error.details } : {}) });
    return res.status(500).json({ success: false, code: 'INTERNAL_ERROR', message: 'Internal server error' });
}

export class HealthcareController {
    static async erpnextStatus(req: Request, res: Response) {
        try {
            const current = actor(req as AuthRequest);
            const role = current.role?.name;
            if (!(current.role?.isSystem && role === 'Admin') && !['platform_admin', 'tenant_admin', 'integration_operator'].includes(role || '')) throw new ForbiddenError('ERPNext integration status is restricted');
            const client = getERPNextClient();
            if (!client) return res.json({ success: true, data: { configured: false, reachable: false } });
            await client.health();
            return res.json({ success: true, data: { configured: true, reachable: true } });
        } catch (error) {
            if (error instanceof HealthcareError) return sendError(res, error);
            return res.json({ success: true, data: { configured: true, reachable: false } });
        }
    }
    static async searchPatients(req: Request, res: Response) {
        try {
            const scope = parseScopeQuery(req.query);
            const result = await HealthcareService.searchPatients(actor(req as AuthRequest), scope.tenantId, scope.facilityId, scope.q);
            return res.json({ success: true, data: result });
        } catch (error) { return sendError(res, error); }
    }

    static async registerPatient(req: Request, res: Response) {
        try { return res.status(201).json({ success: true, data: await HealthcareService.registerPatient(actor(req as AuthRequest), parsePatient(req.body)) }); }
        catch (error) { return sendError(res, error); }
    }

    static async listAppointments(req: Request, res: Response) {
        try {
            const scope = parseScopeQuery(req.query);
            return res.json({ success: true, data: await HealthcareService.listAppointments(actor(req as AuthRequest), scope.tenantId, scope.facilityId, scope.from, scope.to) });
        } catch (error) { return sendError(res, error); }
    }

    static async createAppointment(req: Request, res: Response) {
        try { return res.status(201).json({ success: true, data: await HealthcareService.createAppointment(actor(req as AuthRequest), parseAppointment(req.body)) }); }
        catch (error) { return sendError(res, error); }
    }

    static async createEncounter(req: Request, res: Response) {
        try { return res.status(201).json({ success: true, data: await HealthcareService.createEncounter(actor(req as AuthRequest), parseEncounter(req.body)) }); }
        catch (error) { return sendError(res, error); }
    }

    static async submitEncounter(req: Request, res: Response) {
        try { return res.json({ success: true, data: await HealthcareService.submitEncounter(actor(req as AuthRequest), req.params.id) }); }
        catch (error) { return sendError(res, error); }
    }

    static async amendEncounter(req: Request, res: Response) {
        try { const amendment = parseAmendment(req.body); return res.status(201).json({ success: true, data: await HealthcareService.amendEncounter(actor(req as AuthRequest), req.params.id, amendment.reason, amendment.patch) }); }
        catch (error) { return sendError(res, error); }
    }

    static async transitionAppointment(req: Request, res: Response) {
        try { return res.json({ success: true, data: await HealthcareService.transitionAppointment(actor(req as AuthRequest), req.params.id, parseTransition(req.body?.status)) }); }
        catch (error) { return sendError(res, error); }
    }
}
