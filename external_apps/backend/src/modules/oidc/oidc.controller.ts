import { Request, Response } from 'express';
import prisma from '../../config/prisma';
import crypto from 'crypto';

export class OidcController {

    // List all clients for the current user
    static async getClients(req: Request, res: Response) {
        try {
            const userId = (req.user as any).id;
            const clients = await prisma.oidcClientApp.findMany({
                where: { userId }
            });
            res.json({ success: true, data: clients });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    // Create a new OIDC Client
    static async createClient(req: Request, res: Response) {
        try {
            const userId = (req.user as any).id;
            const { clientName, redirectUris, logoUri, clientUri } = req.body;

            // Generate ID and Secret
            const clientId = crypto.randomBytes(16).toString('hex');
            const clientSecret = crypto.randomBytes(32).toString('hex');

            const client = await prisma.oidcClientApp.create({
                data: {
                    clientId,
                    clientSecret, // Store raw for now. In prod, store hash and show once.
                    clientName,
                    redirectUris: redirectUris || [],
                    responseTypes: ['code'],
                    grantTypes: ['authorization_code', 'refresh_token'],
                    userId,
                    logoUri,
                    clientUri
                }
            });

            res.status(201).json({ success: true, data: client });
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message });
        }
    }

    // Delete Client
    static async deleteClient(req: Request, res: Response) {
        try {
            const userId = (req.user as any).id;
            const { id } = req.params;

            await prisma.oidcClientApp.delete({
                where: { id, userId } // Ensure ownership
            });

            res.json({ success: true, message: 'Client deleted' });
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message });
        }
    }
}
