import { Request, Response } from 'express';
import { ChatService } from './chat.service';

export class ChatController {

    static async createChannel(req: Request, res: Response) {
        try {
            // @ts-ignore
            const creatorId = req.user.id;
            const result = await ChatService.createChannel({ ...req.body, creatorId });
            res.status(201).json({ success: true, data: result });
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message });
        }
    }

    static async getChannels(req: Request, res: Response) {
        try {
            // @ts-ignore
            const userId = req.user.id;
            const result = await ChatService.getUserChannels(userId);
            res.status(200).json({ success: true, data: result });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    static async sendMessage(req: Request, res: Response) {
        try {
            // @ts-ignore
            const userId = req.user.id;
            const { channelId } = req.params;
            const { content, type } = req.body;
            const result = await ChatService.sendMessage(userId, channelId, content, type);
            res.status(201).json({ success: true, data: result });
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message });
        }
    }

    static async getMessages(req: Request, res: Response) {
        try {
            const { channelId } = req.params;
            const { page, limit } = req.query;
            const result = await ChatService.getMessages(channelId, Number(page), Number(limit));
            res.status(200).json({ success: true, data: result });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
}
