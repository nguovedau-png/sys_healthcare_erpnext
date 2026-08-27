import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { LiveService } from './live.service';

@Controller()
export class LiveController {
    constructor(private readonly liveService: LiveService) { }

    @MessagePattern({ cmd: 'getLiveSessions' })
    getLiveSessions() {
        return this.liveService.getLiveConfigs();
    }

    @MessagePattern({ cmd: 'getLiveSession' })
    getLiveSession(id: number) {
        return this.liveService.getLiveConfig(id);
    }

    @MessagePattern({ cmd: 'createLiveSession' })
    createLiveSession(data: any) {
        return this.liveService.createLiveSession(data);
    }

    @MessagePattern({ cmd: 'updateLiveSession' })
    updateLiveSession(payload: { id: number, data: any }) {
        return this.liveService.updateLiveConfig(payload.id, payload.data);
    }

    @MessagePattern({ cmd: 'deleteLiveSession' })
    deleteLiveSession(id: number) {
        return this.liveService.deleteLiveSession(id);
    }

    @MessagePattern({ cmd: 'getLiveMessages' })
    getLiveMessages(payload: { livestreamId: number }) {
        return this.liveService.getLiveMessages(payload.livestreamId);
    }

    @MessagePattern({ cmd: 'sendLiveMessage' })
    sendLiveMessage(data: any) {
        return this.liveService.sendLiveMessage(data);
    }

    @MessagePattern({ cmd: 'addViewer' })
    addViewer(payload: { livestreamId: number, viewerData: { userId: string, userName: string } }) {
        return this.liveService.addViewer(payload.livestreamId, payload.viewerData);
    }

    @MessagePattern({ cmd: 'removeViewer' })
    removeViewer(payload: { livestreamId: number, userId: string }) {
        return this.liveService.removeViewer(payload.livestreamId, payload.userId);
    }

    @MessagePattern({ cmd: 'getViewers' })
    getViewers(payload: { livestreamId: number }) {
        return this.liveService.getViewers(payload.livestreamId);
    }
}
