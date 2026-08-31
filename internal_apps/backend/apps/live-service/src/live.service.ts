import { Injectable, OnModuleInit, NotFoundException } from '@nestjs/common';
import { PrismaService } from './prisma';
import { LiveProvider, Prisma } from '@prisma/client-live-service';

@Injectable()
export class LiveService implements OnModuleInit {
    constructor(private readonly prisma: PrismaService) { }

    async onModuleInit() {
        await this.seedData();
    }

    private async seedData() {
        const sessions = [
            {
                title: 'Hội thảo: Cập nhật điều trị Đái tháo đường 2024',
                description: 'Chương trình đào tạo y khoa liên tục về các phương pháp mới trong điều trị đái tháo đường, với sự tham gia của các chuyên gia đầu ngành.',
                provider: LiveProvider.WEBRTC,
                streamKey: 'live_key_webrtc_01',
                serverUrl: 'rtmp://live.healthcare-system.com/app',
                isStreaming: true,
            },
            {
                title: 'Zoom Meeting: Giao ban bác sĩ toàn quốc',
                description: 'Họp giao ban định kỳ hàng tháng giữa các bệnh viện tuyến trung ương và địa phương.',
                provider: LiveProvider.ZOOM,
                providerConfig: {
                    meetingId: '884 1234 5678',
                    password: 'medical_sync',
                    joinUrl: 'https://zoom.us/j/88412345678'
                },
                isStreaming: false,
            },
            {
                title: 'Agora Live: Phẫu thuật nội soi trực tuyến',
                description: 'Truyền hình trực tiếp ca phẫu thuật nội soi khớp gối từ phòng mổ số 1.',
                provider: LiveProvider.AGORA,
                providerConfig: {
                    appId: 'agora_app_id_demo',
                    channel: 'surgery_room_1',
                    token: 'mock_agora_token'
                },
                isStreaming: false,
            },
            {
                title: 'Jitsi Meet: Tư vấn sức khỏe cộng đồng',
                description: 'Buổi tư vấn miễn phí cho người dân về cách phòng tránh các bệnh hô hấp mùa đông.',
                provider: LiveProvider.JITSI,
                providerConfig: {
                    roomName: 'tu-van-suc-khoe-mua-dong',
                    subject: 'Sức khỏe hô hấp'
                },
                isStreaming: false,
            }
        ];

        for (const session of sessions) {
            const exists = await this.prisma.livestream.findFirst({
                where: { title: session.title }
            });
            if (!exists) {
                const created = await this.prisma.livestream.create({ data: session });
                // Add some messages for the first session
                if (session.provider === LiveProvider.WEBRTC) {
                    await this.prisma.liveChatMessage.createMany({
                        data: [
                            { livestreamId: created.id, userName: 'Dr. Hai', content: 'Chào mọi người, chúng ta bắt đầu lúc 9h nhé!', userRole: 'Host' },
                            { livestreamId: created.id, userName: 'Pharma Tien', content: 'Rất mong chờ bài báo cáo hôm nay.', userRole: 'Viewer' },
                            { livestreamId: created.id, userName: 'Nurse Lan', content: 'Âm thanh hình ảnh tốt.', userRole: 'Moderator' },
                        ],
                    });
                }
            }
        }
    }

    async getLiveConfigs() {
        return this.prisma.livestream.findMany({
            orderBy: { updatedAt: 'desc' },
            include: { _count: { select: { viewers: true } } }
        });
    }

    async getLiveConfig(id: number) {
        const live = await this.prisma.livestream.findUnique({
            where: { id },
            include: { _count: { select: { viewers: true } } }
        });
        if (!live) throw new NotFoundException(`Livestream with ID ${id} not found`);
        return live;
    }

    async createLiveSession(data: any) {
        // Logic to generate provider config would go here based on data.provider
        let providerConfig = data.providerConfig || {};

        if (data.provider === LiveProvider.AGORA) {
            // Mock Agora token generation
            providerConfig = { ...providerConfig, appId: 'mock_agora_app_id', token: 'mock_token' };
        } else if (data.provider === LiveProvider.ZOOM) {
            // Mock Zoom meeting creation
            providerConfig = { ...providerConfig, meetingId: Date.now().toString(), joinUrl: 'https://zoom.us/mock' };
        }

        return this.prisma.livestream.create({
            data: {
                ...data,
                providerConfig,
            },
        });
    }

    async updateLiveConfig(id: number, data: any) {
        return this.prisma.livestream.update({
            where: { id },
            data,
        });
    }

    async deleteLiveSession(id: number) {
        return this.prisma.livestream.delete({
            where: { id },
        });
    }

    async getLiveMessages(livestreamId: number) {
        return this.prisma.liveChatMessage.findMany({
            where: { livestreamId },
            orderBy: { createdAt: 'asc' },
        });
    }

    async sendLiveMessage(data: any) {
        return this.prisma.liveChatMessage.create({
            data,
        });
    }

    async addViewer(livestreamId: number, viewerData: { userId: string, userName: string }) {
        return this.prisma.liveViewer.create({
            data: {
                livestreamId,
                ...viewerData
            }
        });
    }

    async removeViewer(livestreamId: number, userId: string) {
        // Logically set leftAt or delete. Setting leftAt for history.
        // Assuming one active session per user per stream for simplicity in this update
        const viewer = await this.prisma.liveViewer.findFirst({
            where: { livestreamId, userId, leftAt: null }
        });

        if (viewer) {
            return this.prisma.liveViewer.update({
                where: { id: viewer.id },
                data: { leftAt: new Date() }
            });
        }
        return null;
    }

    async getViewers(livestreamId: number) {
        return this.prisma.liveViewer.findMany({
            where: { livestreamId, leftAt: null }
        });
    }
}
