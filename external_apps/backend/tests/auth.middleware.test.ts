import { authorize, AuthRequest } from '../src/middlewares/auth.middleware';

describe('authorize middleware', () => {
    function invoke(user: any, resources: string[] = ['system'], action = 'manage') {
        const req = { user } as AuthRequest;
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as any;
        const next = jest.fn();
        authorize(resources, action)(req, res, next);
        return { res, next };
    }

    test('denies an authenticated user without a role', () => {
        const { res, next } = invoke(undefined);
        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.json).toHaveBeenCalledWith({ message: 'Forbidden: No role assigned' });
        expect(next).not.toHaveBeenCalled();
    });

    test('denies a role without the requested system permission', () => {
        const { res, next } = invoke({ role: { name: 'User', isSystem: false, permissions: [] } });
        expect(res.status).toHaveBeenCalledWith(403);
        expect(next).not.toHaveBeenCalled();
    });

    test('allows an exact system/manage permission', () => {
        const { res, next } = invoke({ role: { name: 'Integration admin', isSystem: false, permissions: [{ permission: { resource: 'system', action: 'manage' } }] } });
        expect(next).toHaveBeenCalledTimes(1);
        expect(res.status).not.toHaveBeenCalled();
    });

    test('allows the system Admin break-glass role', () => {
        const { res, next } = invoke({ role: { name: 'Admin', isSystem: true, permissions: [] } });
        expect(next).toHaveBeenCalledTimes(1);
        expect(res.status).not.toHaveBeenCalled();
    });
});
