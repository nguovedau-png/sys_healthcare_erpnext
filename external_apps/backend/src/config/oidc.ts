import { PrismaAdapter } from '../modules/oidc/oidc.adapter';
import prisma from './prisma';

export default async function initOidcProvider(issuer: string) {
    // Dynamic import for ESM package using eval to bypass TS transpilation to require()
    const { default: Provider } = await (eval('import("oidc-provider")') as Promise<any>);

    const configuration: any = {
        adapter: PrismaAdapter,
        clients: [], // Client kind handled by Adapter
        interactions: {
            url(ctx: any, interaction: any) {
                return `/login?interaction=${interaction.uid}`;
            },
        },
        cookies: {
            keys: [process.env.JWT_SECRET || 'some-secret'],
        },
        claims: {
            openid: ['sub'],
            profile: ['name', 'nickname', 'picture', 'updated_at'],
            email: ['email', 'email_verified'],
        },
        features: {
            devInteractions: { enabled: false },
            introspection: { enabled: true },
            revocation: { enabled: true },
        },
        async findAccount(ctx: any, id: any) {
            const user = await prisma.user.findUnique({ where: { id } });
            if (!user) return undefined;
            return {
                accountId: id,
                async claims(use: any, scope: any) {
                    return {
                        sub: id,
                        email: user.email,
                        email_verified: true,
                        name: user.fullName,
                        picture: user.avatar,
                    };
                },
            };
        },
    };

    const oidc = new Provider(issuer, configuration);
    oidc.proxy = true;

    return oidc;
}
