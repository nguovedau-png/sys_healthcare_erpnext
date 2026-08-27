import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    ServiceUnavailableException,
    HttpException,
} from '@nestjs/common';
import { Observable, from, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as CircuitBreaker from 'opossum';

@Injectable()
export class CircuitBreakerInterceptor implements NestInterceptor {
    private breakers: Map<string, CircuitBreaker> = new Map();

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest();
        if (!request) return next.handle();

        const path = request.route?.path || request.url;
        const method = request.method;
        const breakerKey = `${method}:${path}`;

        let breaker = this.breakers.get(breakerKey);

        if (!breaker) {
            const options = {
                timeout: 5000, // If our function takes longer than 5 seconds, trigger a failure
                errorThresholdPercentage: 50, // When 50% of requests fail, open the circuit
                resetTimeout: 30000, // After 30 seconds, try again.
                errorFilter: (err: any) => {
                    if (err instanceof HttpException && err.getStatus() < 500) {
                        return true; // Don't count 4xx as failures
                    }
                    return false;
                },
            };

            // Wrap the next.handle() execute logic
            const action = (handler: CallHandler) => handler.handle().toPromise();

            breaker = new CircuitBreaker(action, options);

            breaker.fallback((err: any) => {
                if (err instanceof HttpException) {
                    throw err;
                }
                throw new ServiceUnavailableException('Service temporarily unavailable (Circuit Breaker)');
            });

            this.breakers.set(breakerKey, breaker);
        }

        // Execution
        return from(breaker.fire(next)).pipe(
            catchError((err) => {
                // If it's already a Nest exception thrown by fallback or elsewhere, just rethrow
                return throwError(() => err);
            }),
        );
    }
}
