import { Controller, Get, Patch, Body, Param, Inject, ParseIntPipe } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller('engagement')
export class EngagementController {
    constructor(
        @Inject('ENGAGEMENT_SERVICE') private readonly engagementClient: ClientProxy,
    ) { }

    @Get('comments')
    getComments() {
        return firstValueFrom(this.engagementClient.send({ cmd: 'get_comments' }, {}));
    }

    @Get('activities')
    getActivities() {
        return firstValueFrom(this.engagementClient.send({ cmd: 'get_activities' }, { userId: 'user-001' }));
    }

    @Patch('comments/:id/status')
    updateCommentStatus(@Param('id', ParseIntPipe) id: number, @Body('status') status: string) {
        return firstValueFrom(this.engagementClient.send({ cmd: 'update_comment_status' }, { id, status }));
    }

    @Get('comments/stats')
    getCommentStats() {
        return firstValueFrom(this.engagementClient.send({ cmd: 'get_comment_stats' }, {}));
    }
}
