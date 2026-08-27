import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import prisma from '../config/prisma';

export interface AuthRequest extends Request {
    user?: any;
}

export const authenticate = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    const token = authHeader.split(' ')[1];
    const decoded: any = verifyToken(token);

    if (!decoded) {
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }

    try {
        const user = await prisma.user.findUnique({
            where: { id: decoded.userId },
            include: { role: { include: { permissions: { include: { permission: true } } } } },
        });

        if (!user) {
            return res.status(401).json({ message: 'Unauthorized: User not found' });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const authorize = (resources: string[], action: string) => {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        const user = req.user;

        if (!user || !user.role) {
            return res.status(403).json({ message: 'Forbidden: No role assigned' });
        }

        if (user.role.isSystem && user.role.name === 'Admin') {
            return next(); // Admin has full access
        }

        const hasPermission = user.role.permissions.some((rp: any) =>
            resources.includes(rp.permission.resource) && rp.permission.action === action
        );

        if (!hasPermission) {
            return res.status(403).json({ message: `Forbidden: Missing permission for ${resources.join(', ')}:${action}` });
        }

        next();
    };
};
