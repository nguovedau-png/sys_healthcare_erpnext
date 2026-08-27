import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const prisma = new PrismaClient();

// ERPNext Configuration
const ERPNEXT_URL = 'http://localhost:8080';
const API_KEY = 'admin_key_789';
const API_SECRET = 'admin_secret_789';

async function syncUsersToERPNext() {
    console.log('Starting synchronization...');

    try {
        // 1. Get all users from backend DB
        const users = await prisma.user.findMany({
            where: {
                isActive: true
            }
        });

        console.log(`Found ${users.length} users to sync.`);

        for (const user of users) {
            console.log(`Syncing user: ${user.email}...`);

            // ERPNext Customer Object
            // Note: We do NOT sync the password as requested.
            const customerData = {
                customer_name: user.fullName || user.email.split('@')[0],
                customer_type: 'Individual',
                customer_group: 'All Customer Groups',
                territory: 'All Territories',
                email_id: user.email,
                mobile_no: user.phoneNumber || ''
            };

            try {
                // Check if customer already exists by email
                const searchResponse = await axios.get(`${ERPNEXT_URL}/api/resource/Customer`, {
                    params: {
                        filters: JSON.stringify([['email_id', '=', user.email]])
                    },
                    headers: {
                        'Authorization': `token ${API_KEY}:${API_SECRET}`
                    }
                });

                if (searchResponse.data.data && searchResponse.data.data.length > 0) {
                    console.log(`Customer ${user.email} already exists in ERPNext. Skipping...`);
                    continue;
                }

                // Create new Customer
                await axios.post(`${ERPNEXT_URL}/api/resource/Customer`, customerData, {
                    headers: {
                        'Authorization': `token ${API_KEY}:${API_SECRET}`
                    }
                });

                console.log(`Successfully synced ${user.email} to ERPNext Customer.`);
            } catch (error: any) {
                console.error(`Error syncing user ${user.email}:`, error.response?.data || error.message);
            }
        }

        console.log('Synchronization completed.');
    } catch (error) {
        console.error('Synchronization failed:', error);
    } finally {
        await prisma.$disconnect();
    }
}

syncUsersToERPNext();
