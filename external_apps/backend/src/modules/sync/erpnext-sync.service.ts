import axios from 'axios';
import logger from '../../utils/logger';

// Load config from environment
const ERPNEXT_URL = process.env.ERPNEXT_URL || 'http://localhost:8080';
const API_KEY = process.env.ERPNEXT_API_KEY || '34d3ffa6c8413eb'; // Matches previous setup
const API_SECRET = process.env.ERPNEXT_API_SECRET || 'f9b1825f3caeb98';

export class ERPNextSyncService {
    /**
     * Map User fields from Backend to ERPNext Customer fields
     */
    private static mapToCustomer(user: any) {
        return {
            customer_name: user.fullName || user.email.split('@')[0],
            customer_type: 'Individual',
            customer_group: 'All Customer Groups',
            territory: 'All Territories',
            email_id: user.email,
            mobile_no: user.phoneNumber || '',
        };
    }

    /**
     * Sync (Create or Update) Customer to ERPNext
     */
    static async upsertCustomer(user: any) {
        if (!user.email) return;

        try {
            logger.info(`Syncing user ${user.email} to ERPNext Customer...`);
            const customerData = this.mapToCustomer(user);

            // Search for existing customer by email_id
            const searchRes = await axios.get(`${ERPNEXT_URL}/api/resource/Customer`, {
                params: {
                    filters: JSON.stringify([['email_id', '=', user.email]]),
                },
                headers: {
                    Authorization: `token ${API_KEY}:${API_SECRET}`,
                },
            });

            if (searchRes.data.data && searchRes.data.data.length > 0) {
                // Update existing
                const customerName = searchRes.data.data[0].name;
                await axios.put(`${ERPNEXT_URL}/api/resource/Customer/${customerName}`, customerData, {
                    headers: {
                        Authorization: `token ${API_KEY}:${API_SECRET}`,
                    },
                });
                logger.info(`Updated customer ${user.email} in ERPNext (Name: ${customerName})`);
            } else {
                // Create new
                await axios.post(`${ERPNEXT_URL}/api/resource/Customer`, customerData, {
                    headers: {
                        Authorization: `token ${API_KEY}:${API_SECRET}`,
                    },
                });
                logger.info(`Created new customer ${user.email} in ERPNext`);
            }
        } catch (error: any) {
            logger.error(`Failed to upsert customer ${user.email} in ERPNext:`, error.response?.data || error.message);
            throw error; // Rethrow to let the worker handle retry
        }
    }

    /**
     * Delete Customer in ERPNext if it exists
     * Note: ERPNext may prevent deletion if there are linked documents.
     */
    static async deleteCustomer(email: string) {
        if (!email) return;

        try {
            logger.info(`Attempting to delete customer ${email} in ERPNext...`);

            const searchRes = await axios.get(`${ERPNEXT_URL}/api/resource/Customer`, {
                params: {
                    filters: JSON.stringify([['email_id', '=', email]]),
                },
                headers: {
                    Authorization: `token ${API_KEY}:${API_SECRET}`,
                },
            });

            if (searchRes.data.data && searchRes.data.data.length > 0) {
                const customerName = searchRes.data.data[0].name;
                await axios.delete(`${ERPNEXT_URL}/api/resource/Customer/${customerName}`, {
                    headers: {
                        Authorization: `token ${API_KEY}:${API_SECRET}`,
                    },
                });
                logger.info(`Deleted customer ${email} from ERPNext`);
            } else {
                logger.info(`Customer ${email} not found in ERPNext to delete.`);
            }
        } catch (error: any) {
            logger.warn(`Failed to delete customer ${email} in ERPNext:`, error.response?.data || error.message);
            // Optionally we might want to just disable it instead if deletion fails
        }
    }
}
