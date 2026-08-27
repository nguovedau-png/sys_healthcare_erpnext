
import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
    private logger = new Logger('HTTP');

    use(req: Request, res: Response, next: NextFunction) {
        const { ip, method, originalUrl } = req;
        const userAgent = req.get('user-agent') || '';

        this.logger.log(
            `Incoming Request: ${method} ${originalUrl} - ${userAgent} ${ip}`,
        );

        res.on('finish', () => {
            const { statusCode } = res;
            this.logger.log(
                `Response Sent: ${method} ${originalUrl} ${statusCode} - ${userAgent} ${ip}`,
            );
        });

        next();
    }
}
