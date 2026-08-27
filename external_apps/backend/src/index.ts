import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import IORedis from 'ioredis';
import logger, { stream } from './utils/logger';
import prisma from './config/prisma';
import path from 'path';

dotenv.config();

const app = express();
export default app; // Export app for testing

// Serve static files from uploads directory
// Serve static files from uploads directory with dynamic resizing
import { MediaController } from './modules/media/media.controller';
console.log('Registering uploads regex route');
app.get(/\/uploads\/(.*)/, MediaController.serveMedia);
// Fallback for direct static access if needed (though serveMedia handles it)
// app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

const httpServer = createServer(app);

// Redis Adapter Setup
const redisConfig = {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379'),
    password: process.env.REDIS_PASSWORD,
};
const pubClient = new IORedis(redisConfig);
const subClient = pubClient.duplicate();

const io = new Server(httpServer, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
    adapter: createAdapter(pubClient, subClient),
});

import rateLimit from 'express-rate-limit';
import { RedisStore } from 'rate-limit-redis';

// ... existing imports ...

// Middleware
app.use(morgan(process.env.NODE_ENV === 'development' ? 'dev' : 'combined', { stream }));
app.use(helmet());
app.use(cors());

// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Limit each IP to 100 requests per windowMs
    standardHeaders: true,
    legacyHeaders: false,
    store: new RedisStore({
        // @ts-expect-error - Known issue with ioredis types compatibility
        sendCommand: (...args: string[]) => pubClient.call(...args),
    }),
    message: 'Too many requests from this IP, please try again after 15 minutes',
});

// Apply to all routes
app.use(limiter);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(cookieParser());

// Swagger
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'HD Template API',
            version: '1.0.0',
            description: 'API Documentation for HD Template Project',
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT || 3000}/api/v1`,
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ['./src/modules/**/*.ts'], // Path to the API docs
};

const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

import authRoutes from './modules/auth/auth.routes';
import userRoutes from './modules/user/user.routes';
import roleRoutes from './modules/rbac/role.routes';
import permissionRoutes from './modules/rbac/permission.routes';
import departmentRoutes from './modules/department/department.routes';
import employeeRoutes from './modules/employee/employee.routes';
import auditLogRoutes from './modules/audit-log/audit-log.routes';
import systemRoutes from './modules/system/system.routes';
import chatRoutes from './modules/chat/chat.routes';
import jobRoutes from './modules/job/job.routes';
import healthcareRoutes from './modules/healthcare/healthcare.routes';


// ...
app.use('/api/v1/jobs', jobRoutes);
app.use('/api/v1/departments', departmentRoutes);
import mediaRoutes from './modules/media/media.routes';
import webhookRoutes from './modules/webhook/webhook.routes';
import cacheRoutes from './modules/system/cache.routes';
import oidcRoutes from './modules/oidc/oidc.routes';
import initOidcProvider from './config/oidc';
import { getMetrics, metricsMiddleware } from './middlewares/metrics.middleware';
import { auditMiddleware } from './middlewares/audit.middleware';

// Audit Middleware - placed before routes to intercept requests
app.use(auditMiddleware);

// Routes
// Routes
// function to setup routes (async)
async function setupRoutes() {
    // Metrics Endpoint (Exposed for Prometheus)
    app.get('/metrics', getMetrics);

    // Global Metrics Middleware
    app.use(metricsMiddleware);

    if (process.env.IS_MEDIA === 'true') {
        logger.info('Starting in MEDIA mode');
        app.use('/api/v1/media', mediaRoutes);
    } else {
        // API Mode (default)
        app.use('/api/v1/auth', authRoutes);
        app.use('/api/v1/users', userRoutes);
        app.use('/api/v1/roles', roleRoutes);
        app.use('/api/v1/permissions', permissionRoutes);
        app.use('/api/v1/departments', departmentRoutes);
        app.use('/api/v1/employees', employeeRoutes);
        app.use('/api/v1/audit-logs', auditLogRoutes);
        app.use('/api/v1/system', systemRoutes);
        app.use('/api/v1/chat', chatRoutes);
        app.use('/api/v1/jobs', jobRoutes);

        app.use('/api/v1/webhooks', webhookRoutes);
        app.use('/api/v1/cache', cacheRoutes);

        // OIDC Management API
        app.use('/api/v1/oidc', oidcRoutes);
        app.use('/api/v1/healthcare', healthcareRoutes);

        // OIDC Provider Middleware (Mounts at /oidc)
        const oidc = await initOidcProvider(process.env.API_URL || 'http://localhost:3000');
        app.use('/oidc', oidc.callback());
    }
}

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', timestamp: new Date() });
});

// Socket.io
io.on('connection', (socket) => {
    logger.info(`Socket connected: ${socket.id}`);

    socket.on('disconnect', () => {
        logger.info(`Socket disconnected: ${socket.id}`);
    });
});



const PORT = process.env.PORT || 3000;

async function bootstrap() {
    try {
        await prisma.$connect();
        logger.info('Database connected successfully');

        await setupRoutes();

        // Listen on all network interfaces (0.0.0.0) for iOS Simulator access
        httpServer.listen(PORT, () => {
            logger.info(`Server is running on port ${PORT}`);
            logger.info(`Server accessible at http://0.0.0.0:${PORT}`);
            logger.info(`Swagger docs available at http://localhost:${PORT}/api-docs`);
        });
    } catch (error) {
        logger.error('Failed to connect to database', error);
        process.exit(1);
    }
}

if (process.env.NODE_ENV !== 'test') {
    bootstrap();
}

export { app, io };
