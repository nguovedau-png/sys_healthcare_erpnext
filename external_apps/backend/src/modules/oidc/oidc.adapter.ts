import { Adapter, AdapterPayload } from 'oidc-provider';
import prisma from '../../config/prisma';

export class PrismaAdapter implements Adapter {
    model: string;

    constructor(name: string) {
        this.model = name;
    }

    async upsert(id: string, payload: AdapterPayload, expiresIn: number): Promise<void> {
        const expiresAt = new Date(Date.now() + expiresIn * 1000);
        await prisma.oidcStorage.upsert({
            where: {
                id: id
            },
            update: {
                payload: payload as any,
                expiresAt,
                grantId: payload.grantId,
                userCode: payload.userCode,
                uid: payload.uid,
                type: this.model
            },
            create: {
                id,
                type: this.model,
                payload: payload as any,
                grantId: payload.grantId,
                userCode: payload.userCode,
                uid: payload.uid,
                expiresAt
            }
        });
    }

    async find(id: string): Promise<AdapterPayload | undefined> {
        // Special handling for Client model
        if (this.model === 'Client') {
            const clientApp = await prisma.oidcClientApp.findUnique({
                where: { clientId: id }
            });
            if (!clientApp) return undefined;

            return {
                client_id: clientApp.clientId,
                client_secret: clientApp.clientSecret,
                redirect_uris: clientApp.redirectUris,
                post_logout_redirect_uris: clientApp.postLogoutRedirectUris,
                response_types: clientApp.responseTypes as any,
                grant_types: clientApp.grantTypes as any,
                scope: clientApp.scope,
                client_name: clientApp.clientName,
                logo_uri: clientApp.logoUri || undefined,
                client_uri: clientApp.clientUri || undefined,
                // Add other standard fields if necessary
            };
        }

        const doc = await prisma.oidcStorage.findUnique({
            where: { id }
        });
        if (!doc || doc.type !== this.model || (doc.expiresAt && doc.expiresAt < new Date())) {
            return undefined;
        }
        return doc.payload as AdapterPayload;
    }

    async findByUserCode(userCode: string): Promise<AdapterPayload | undefined> {
        const doc = await prisma.oidcStorage.findFirst({
            where: { userCode }
        });
        if (!doc || doc.type !== this.model || (doc.expiresAt && doc.expiresAt < new Date())) {
            return undefined;
        }
        return doc.payload as AdapterPayload;
    }

    async findByUid(uid: string): Promise<AdapterPayload | undefined> {
        const doc = await prisma.oidcStorage.findUnique({
            where: { uid }
        });
        if (!doc || doc.type !== this.model || (doc.expiresAt && doc.expiresAt < new Date())) {
            return undefined;
        }
        return doc.payload as AdapterPayload;
    }

    async consume(id: string): Promise<void> {
        await prisma.oidcStorage.update({
            where: { id },
            data: { consumedAt: new Date() }
        });
    }

    async destroy(id: string): Promise<void> {
        await prisma.oidcStorage.delete({
            where: { id }
        });
    }

    async revokeByGrantId(grantId: string): Promise<void> {
        await prisma.oidcStorage.deleteMany({
            where: { grantId }
        });
    }
}
