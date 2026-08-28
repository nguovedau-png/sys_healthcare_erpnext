import logger from '../../utils/logger';
import { getERPNextClient } from '../healthcare/erpnext.client';

type SyncUser = {
    email?: string | null;
    fullName?: string | null;
    phoneNumber?: string | null;
};

export class ERPNextSyncService {
    private static requireClient() {
        const client = getERPNextClient();
        if (!client) throw new Error('ERPNext integration is not configured');
        return client;
    }

    static async upsertCustomer(user: SyncUser) {
        if (!user.email) return null;
        const client = ERPNextSyncService.requireClient();
        const result = await client.upsertCustomer({
            customer_name: user.fullName?.trim() || user.email.split('@')[0],
            email_id: user.email,
            mobile_no: user.phoneNumber || undefined,
        });
        logger.info('ERPNext customer sync completed', { emailDomain: user.email.split('@')[1] || 'unknown' });
        return result;
    }

    static async deleteCustomer(email: string) {
        if (!email) return null;
        const client = ERPNextSyncService.requireClient();
        const existing = await client.findCustomerByEmail(email);
        if (!existing) return null;
        const result = await client.deleteCustomer(existing.name);
        logger.info('ERPNext customer deletion sync completed', { emailDomain: email.split('@')[1] || 'unknown' });
        return result;
    }
}
