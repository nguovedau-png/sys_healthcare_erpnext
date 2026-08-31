import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as TelegramBot from 'node-telegram-bot-api';
import axios from 'axios';

@Injectable()
export class BotService {
    private readonly logger = new Logger(BotService.name);
    private telegramBot: TelegramBot;

    constructor(private configService: ConfigService) {
        const telegramToken = this.configService.get<string>('TELEGRAM_BOT_TOKEN');
        if (telegramToken) {
            this.telegramBot = new TelegramBot(telegramToken, { polling: false });
        }
    }

    async sendToTelegram(message: string, chatId?: string) {
        try {
            const targetChatId = chatId || this.configService.get<string>('TELEGRAM_CHAT_ID');
            if (!this.telegramBot || !targetChatId) {
                this.logger.warn('Telegram bot not configured or chat ID missing');
                return;
            }
            await this.telegramBot.sendMessage(targetChatId, message, { parse_mode: 'HTML' });
            this.logger.log('Message sent to Telegram');
        } catch (error) {
            this.logger.error(`Failed to send message to Telegram: ${error.message}`);
        }
    }

    async sendToSlack(message: string) {
        try {
            const webhookUrl = this.configService.get<string>('SLACK_WEBHOOK_URL');
            if (!webhookUrl) {
                this.logger.warn('Slack Webhook URL not configured');
                return;
            }
            await axios.post(webhookUrl, { text: message });
            this.logger.log('Message sent to Slack');
        } catch (error) {
            this.logger.error(`Failed to send message to Slack: ${error.message}`);
        }
    }

    async sendToFacebook(message: string) {
        try {
            const pageAccessToken = this.configService.get<string>('FACEBOOK_PAGE_ACCESS_TOKEN');
            const pageId = this.configService.get<string>('FACEBOOK_PAGE_ID');
            if (!pageAccessToken || !pageId) {
                this.logger.warn('Facebook Page Access Token or Page ID not configured');
                return;
            }
            const url = `https://graph.facebook.com/v19.0/${pageId}/feed`;
            await axios.post(url, {
                message,
                access_token: pageAccessToken,
            });
            this.logger.log('Message posted to Facebook');
        } catch (error) {
            this.logger.error(`Failed to post message to Facebook: ${error.message}`);
        }
    }
}
