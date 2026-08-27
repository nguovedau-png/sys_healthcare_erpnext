import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { EngagementService } from './engagement.service';
import { CommentStatus } from '@prisma/client-engagement-service';

@Controller()
export class EngagementController {
    constructor(private readonly engagementService: EngagementService) { }

    @MessagePattern({ cmd: 'get_comments' })
    getComments() {
        return this.engagementService.getComments();
    }

    @MessagePattern({ cmd: 'get_activities' })
    getActivities(data: { userId: string }) {
        return this.engagementService.getActivities(data.userId);
    }

    @MessagePattern({ cmd: 'update_comment_status' })
    updateCommentStatus(payload: { id: number, status: CommentStatus }) {
        return this.engagementService.updateCommentStatus(payload.id, payload.status);
    }

    @MessagePattern({ cmd: 'get_comment_stats' })
    getCommentStats() {
        return this.engagementService.getCommentStats();
    }
}
