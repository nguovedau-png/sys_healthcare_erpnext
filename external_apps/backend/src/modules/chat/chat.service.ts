import prisma from '../../config/prisma';
import { io } from '../../index';

export class ChatService {
    static async createChannel(data: { name?: string; isGroup?: boolean; creatorId: string; memberIds: string[] }) {
        const { name, isGroup, creatorId, memberIds } = data;

        const channel = await prisma.channel.create({
            data: {
                name,
                isGroup: isGroup ?? false,
                creatorId,
                members: {
                    create: [creatorId, ...memberIds].map(id => ({
                        userId: id,
                        isAdmin: id === creatorId
                    }))
                }
            },
            include: { members: { include: { user: true } } }
        });

        return channel;
    }

    static async getUserChannels(userId: string) {
        return prisma.channel.findMany({
            where: {
                members: { some: { userId } }
            },
            include: {
                members: { include: { user: true } },
                messages: { orderBy: { createdAt: 'desc' }, take: 1 } // Last message
            }
        });
    }

    static async sendMessage(userId: string, channelId: string, content: string, type: string = 'text') {
        const message = await prisma.message.create({
            data: {
                channelId,
                senderId: userId,
                content,
                type
            },
            include: { sender: true }
        });

        // Emit socket event
        io.to(channelId).emit('new_message', message);

        return message;
    }

    static async getMessages(channelId: string, page: number = 1, limit: number = 20) {
        const skip = (page - 1) * limit;
        const messages = await prisma.message.findMany({
            where: { channelId },
            skip,
            take: limit,
            orderBy: { createdAt: 'desc' },
            include: { sender: true }
        });
        return messages.reverse();
    }
}
