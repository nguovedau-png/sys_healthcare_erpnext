import { Expo, ExpoPushMessage } from 'expo-server-sdk';
import logger from '../../utils/logger';

class NotificationService {
    private expo: Expo;

    constructor() {
        this.expo = new Expo();
    }

    async sendPush(tokens: string[], title: string, body: string, data?: any) {
        const messages: ExpoPushMessage[] = [];

        for (const token of tokens) {
            if (!Expo.isExpoPushToken(token)) {
                logger.warn(`Push token ${token} is not valid`);
                continue;
            }

            messages.push({
                to: token,
                sound: 'default',
                title,
                body,
                data,
            });
        }

        const chunks = this.expo.chunkPushNotifications(messages);
        const tickets = [];

        for (const chunk of chunks) {
            try {
                const ticketChunk = await this.expo.sendPushNotificationsAsync(chunk);
                tickets.push(...ticketChunk);
            } catch (error) {
                logger.error('Error sending push notification chunk', error);
            }
        }

        return tickets;
    }
}

export default new NotificationService();
