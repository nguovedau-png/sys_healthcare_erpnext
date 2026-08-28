import { Request, Response } from 'express';
import { AuthRequest } from '../../middlewares/auth.middleware';
import { ForbiddenError, HealthcareError, ServiceUnavailableError } from './healthcare.errors';
import { HealthcareService } from './healthcare.service';
import { getERPNextClient } from './erpnext.client';
import { parseAmendment, parseAppointment, parseBillingIntent, parseEncounter, parseFamilyLink, parsePaymentEvent, parseQueueCheckIn, parseQueueQuery, parseQueueTransition, parseRefund, parsePatient, parseScopeQuery, parseTransition } from './healthcare.validation';

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

    static async listFamilyLinks(req: Request, res: Response) {
        try {
            const scope = parseScopeQuery(req.query);
            return res.json({ success: true, data: await HealthcareService.listFamilyLinks(actor(req as AuthRequest), scope.tenantId, scope.facilityId, req.params.patientId) });
        } catch (error) { return sendError(res, error); }
    }

    static async createFamilyLink(req: Request, res: Response) {
        try {
            const scope = parseScopeQuery({ ...req.body, q: undefined, from: undefined, to: undefined });
            const link = parseFamilyLink(req.body);
            return res.status(201).json({ success: true, data: await HealthcareService.createFamilyLink(actor(req as AuthRequest), scope.tenantId, scope.facilityId, req.params.patientId, link) });
        } catch (error) { return sendError(res, error); }
    }

    static async revokeFamilyLink(req: Request, res: Response) {
        try {
            const scope = parseScopeQuery(req.query);
            return res.json({ success: true, data: await HealthcareService.revokeFamilyLink(actor(req as AuthRequest), scope.tenantId, scope.facilityId, req.params.linkId) });
        } catch (error) { return sendError(res, error); }
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

    static async checkInAppointment(req: Request, res: Response) {
        try { return res.status(201).json({ success: true, data: await HealthcareService.checkInAppointment(actor(req as AuthRequest), req.params.id, parseQueueCheckIn(req.body || {})) }); }
        catch (error) { return sendError(res, error); }
    }

    static async listQueue(req: Request, res: Response) {
        try {
            const scope = parseQueueQuery(req.query);
            const queueDate = scope.queueDate || new Date();
            queueDate.setUTCHours(0, 0, 0, 0);
            return res.json({ success: true, data: await HealthcareService.listQueue(actor(req as AuthRequest), scope.tenantId, scope.facilityId, queueDate, scope.status) });
        } catch (error) { return sendError(res, error); }
    }

    static async transitionQueueTicket(req: Request, res: Response) {
        try { return res.json({ success: true, data: await HealthcareService.transitionQueueTicket(actor(req as AuthRequest), req.params.id, parseQueueTransition(req.body?.status)) }); }
        catch (error) { return sendError(res, error); }
    }

    static async createBillingIntent(req: Request, res: Response) {
        try { return res.status(201).json({ success: true, data: await HealthcareService.createBillingIntent(actor(req as AuthRequest), parseBillingIntent(req.body)) }); }
        catch (error) { return sendError(res, error); }
    }

    static async paymentWebhook(req: Request, res: Response) {
        try {
            const secret = process.env.PAYMENT_WEBHOOK_SECRET;
            if (!secret) throw new ServiceUnavailableError('Payment webhook is not configured');
            const signature = String(req.header('x-payment-signature') || '');
            const timestamp = String(req.header('x-payment-timestamp') || '');
            const rawBody = (req as Request & { rawBody?: string }).rawBody || JSON.stringify(req.body);
            if (!signature || !timestamp || !HealthcareService.verifyPaymentWebhook(secret, rawBody, signature, timestamp)) throw new ForbiddenError('Invalid payment webhook signature');
            const event = parsePaymentEvent(req.body);
            return res.json({ success: true, data: await HealthcareService.processPaymentEvent(event) });
        } catch (error) { return sendError(res, error); }
    }

    static async requestRefund(req: Request, res: Response) {
        try { return res.status(201).json({ success: true, data: await HealthcareService.requestRefund(actor(req as AuthRequest), req.params.id, parseRefund(req.body)) }); }
        catch (error) { return sendError(res, error); }
    }
}
