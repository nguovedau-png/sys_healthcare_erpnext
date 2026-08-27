import client from 'prom-client';
import { Request, Response, NextFunction } from 'express';

// Create a Registry
const register = new client.Registry();

// Add default metrics (CPU, Heap, etc.)
client.collectDefaultMetrics({ register, prefix: 'node_' });

// Define custom metrics
const httpRequestDurationMicroseconds = new client.Histogram({
    name: 'http_request_duration_seconds',
    help: 'Duration of HTTP requests in seconds',
    labelNames: ['method', 'route', 'status_code'],
    buckets: [0.1, 0.5, 1, 1.5, 2, 5],
    registers: [register]
});

const httpRequestsTotal = new client.Counter({
    name: 'http_requests_total',
    help: 'Total number of HTTP requests',
    labelNames: ['method', 'route', 'status_code'],
    registers: [register]
});

// Middleware to tracking
export const metricsMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const end = httpRequestDurationMicroseconds.startTimer();

    // Intercept response finish
    res.on('finish', () => {
        const route = req.route ? req.route.path : 'unknown_route';
        const statusCode = res.statusCode.toString();

        httpRequestsTotal.inc({
            method: req.method,
            route: route,
            status_code: statusCode
        });

        end({
            method: req.method,
            route: route,
            status_code: statusCode
        });
    });

    next();
};

export const getMetrics = async (req: Request, res: Response) => {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
};
