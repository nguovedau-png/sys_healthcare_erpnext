import admin from 'firebase-admin';
import { Expo, ExpoPushMessage } from 'expo-server-sdk';
import path from 'path';
import logger from '../../utils/logger';

// Initialize Firebase Admin
try {
    const credentialPath = process.env.FIREBASE_CREDENTIAL_PATH || './firebase-key.json';
    const resolvedPath = path.isAbsolute(credentialPath) ? credentialPath : path.resolve(process.cwd(), credentialPath);

    const serviceAccount = require(resolvedPath);
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
    logger.info('Firebase Admin initialized');
} catch (error) {
    logger.warn('Firebase Admin initialization failed or key not found. Push notifications will not work.');
}

// Initialize Expo
const expo = new Expo();

export class NotificationService {
    static async sendPushNotification(token: string, title: string, body: string, data?: any) {
        // Decide which service to use based on token format
        if (token.startsWith('ExponentPushToken') || token.startsWith('ExpoPushToken')) {
            return this.sendExpoPushNotification([token], title, body, data);
        }

        try {
            if (!admin.apps.length) return;

            await admin.messaging().send({
                token,
                notification: {
                    title,
                    body,
                },
                data: data ? Object.keys(data).reduce((acc: any, key) => {
                    acc[key] = String(data[key]); // Data must be string
                    return acc;
                }, {}) : {},
            });
            logger.info(`Push notification sent to FCM token ${token}`);
        } catch (error) {
            logger.error('Error sending FCM push notification', error);
        }
    }

    static async sendExpoPushNotification(tokens: string[], title: string, body: string, data?: any) {
        const messages: ExpoPushMessage[] = [];
        for (const pushToken of tokens) {
            if (!Expo.isExpoPushToken(pushToken)) {
                logger.error(`Push token ${pushToken} is not a valid Expo push token`);
                continue;
            }

            messages.push({
                to: pushToken,
                sound: 'default',
                title,
                body,
                data,
            });
        }

        const chunks = expo.chunkPushNotifications(messages);
        const tickets = [];
        for (const chunk of chunks) {
            try {
                const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
                tickets.push(...ticketChunk);
            } catch (error) {
                logger.error('Error sending Expo push notification chunk', error);
            }
        }
        logger.info(`Expo push notifications sent to ${tokens.length} devices`);
    }

    static async sendMulticastNotification(tokens: string[], title: string, body: string, data?: any) {
        // Multi-service multicast
        const expoTokens = tokens.filter(t => t.startsWith('ExponentPushToken') || t.startsWith('ExpoPushToken'));
        const fcmTokens = tokens.filter(t => !t.startsWith('ExponentPushToken') && !t.startsWith('ExpoPushToken'));

        if (expoTokens.length > 0) {
            await this.sendExpoPushNotification(expoTokens, title, body, data);
        }

        if (fcmTokens.length > 0 && admin.apps.length > 0) {
            try {
                await admin.messaging().sendEachForMulticast({
                    tokens: fcmTokens,
                    notification: {
                        title,
                        body
                    },
                    data: data ? Object.keys(data).reduce((acc: any, key) => {
                        acc[key] = String(data[key]);
                        return acc;
                    }, {}) : {},
                });
                logger.info(`FCM Multicast notification sent to ${fcmTokens.length} devices`);
            } catch (error) {
                logger.error('Error sending FCM multicast notification', error);
            }
        }
    }
}
