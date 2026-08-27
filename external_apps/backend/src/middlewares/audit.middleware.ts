import { Response, NextFunction } from 'express';
import { AuthRequest } from './auth.middleware';
import { AuditLogService } from '../modules/audit-log/audit-log.service';

export const auditMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    // Save original start time
    const startTime = Date.now();

    // Hook into response finish event
    res.on('finish', async () => {
        // Only log state-changing methods or if not success
        // Usually we want to log mutations. GET requests can be ignored to save space, 
        // unless it's sensitive data access (which is hard to determine generically).
        // Let's log POST, PUT, PATCH, DELETE.
        if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method)) {

            // Only log if request was successful (2xx) or maybe 4xx/5xx too?
            // Usually we want to know if someone TRIED to do something.
            // But if it failed with 401, req.user might be missing.

            // Determine resource from path (simple heuristic)
            // e.g., /api/v1/users/123 -> users
            const pathParts = req.baseUrl ? req.baseUrl.split('/') : req.path.split('/');
            // filtering out empty strings and 'api', 'v1'
            const pertinentParts = pathParts.filter(p => p && p !== 'api' && p !== 'v1');
            const resource = pertinentParts.length > 0 ? pertinentParts[0] : 'unknown';

            // Determine Action
            let action = 'UNKNOWN';
            switch (req.method) {
                case 'POST': action = 'CREATE'; break;
                case 'PUT':
                case 'PATCH': action = 'UPDATE'; break;
                case 'DELETE': action = 'DELETE'; break;
            }

            // Extract User ID if authenticated
            const userId = req.user?.id;

            try {
                await AuditLogService.log({
                    userId,
                    action,
                    resource,
                    ipAddress: req.ip || req.socket.remoteAddress,
                    userAgent: req.get('user-agent'),
                    method: req.method,
                    path: req.originalUrl,
                    // We can't easily get 'before' without querying DB.
                    // 'after' typically is in req.body for create/update, but that's input data.
                    // Storing req.body as 'after' metadata is a decent approximation for input.
                    // BEWARE: Passwords in body!
                    after: sanitizeBody(req.body)
                });
            } catch (err) {
                console.error('Audit Log Error:', err);
            }
        }
    });

    next();
};

const sanitizeBody = (body: any) => {
    if (!body) return null;
    const sanitized = { ...body };
    // Remove sensitive fields
    const sensitiveFields = ['password', 'confirmPassword', 'token', 'refreshToken', 'twoFactorSecret'];
    sensitiveFields.forEach(field => {
        if (sanitized[field]) sanitized[field] = '[REDACTED]';
    });
    return sanitized;
};
