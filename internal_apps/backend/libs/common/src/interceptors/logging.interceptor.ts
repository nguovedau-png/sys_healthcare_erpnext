import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTTP');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url, body } = request;
    const correlationId = request.headers['x-correlation-id'] || uuidv4();
    request.headers['x-correlation-id'] = correlationId;

    const now = Date.now();
    const userAgent = request.get('user-agent') || '';

    return next.handle().pipe(
      tap(() => {
        const response = context.switchToHttp().getResponse();
        const duration = Date.now() - now;
        const statusCode = response.statusCode;

        this.logger.log(
          JSON.stringify({
            correlationId,
            method,
            url,
            statusCode,
            duration: `${duration}ms`,
            userAgent,
            timestamp: new Date().toISOString(),
          }),
        );

        if (duration > 500) {
          this.logger.warn(
            `Slow Request Warning: ${method} ${url} took ${duration}ms`,
          );
        }
      }),
      catchError((error) => {
        const duration = Date.now() - now;
        this.logger.error(
          JSON.stringify({
            correlationId,
            method,
            url,
            duration: `${duration}ms`,
            error: error.message,
            stack: error.stack,
            timestamp: new Date().toISOString(),
          }),
        );
        return throwError(() => error);
      }),
    );
  }
}
