import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    Logger,
    Inject,
    Optional,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AuditInterceptor implements NestInterceptor {
    private readonly logger = new Logger('AuditInterceptor');

    constructor(
        @Optional() @Inject('LOGGER_SERVICE') private readonly client: ClientProxy,
    ) { }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest();
        if (!request) {
            return next.handle();
        }

        const { method, url, user, body, ip } = request;

        // Only audit data-changing methods
        const auditMethods = ['POST', 'PUT', 'DELETE', 'PATCH'];
        if (!auditMethods.includes(method)) {
            return next.handle();
        }

        const startTime = Date.now();

        return next.handle().pipe(
            tap({
                next: (data) => {
                    const duration = Date.now() - startTime;
                    this.logAction(method, url, user, body, ip, 'SUCCESS', duration, data);
                },
                error: (error) => {
                    const duration = Date.now() - startTime;
                    this.logAction(method, url, user, body, ip, 'FAILURE', duration, { error: error.message });
                },
            }),
        );
    }

    private logAction(
        method: string,
        url: string,
        user: any,
        body: any,
        ip: string,
        status: string,
        duration: number,
        response: any,
    ) {
        const auditLog = {
            userId: user?.id || 'ANONYMOUS',
            userEmail: user?.email || 'N/A',
            action: `${method} ${url}`,
            method,
            url,
            payload: body,
            response,
            status,
            ip,
            duration,
            timestamp: new Date(),
        };

        this.logger.log(`Audit Log: ${auditLog.action} - ${status}`);

        if (this.client) {
            this.client.emit({ cmd: 'log.create' }, {
                level: 'info',
                category: 'AUDIT',
                message: JSON.stringify(auditLog),
            }).subscribe({
                error: (err) => this.logger.error(`Failed to send audit log to LOGGER_SERVICE: ${err.message}`),
            });
        } else {
            this.logger.warn('LOGGER_SERVICE client not found, audit log only printed to console.');
        }
    }
}
