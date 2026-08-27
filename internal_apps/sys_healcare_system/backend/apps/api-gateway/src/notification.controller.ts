import { Controller, Get, Post, Put, Delete, Body, Param, Inject, Query, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PaginationDto, CurrentUser } from '@app/common';

@Controller('notifications')
export class NotificationController {
    constructor(@Inject('NOTIFICATION_SERVICE') private readonly client: ClientProxy) { }

    @Get()
    getUserNotifications(@CurrentUser() user: any, @Query() query: PaginationDto) {
        return this.client.send({ cmd: 'getUserNotifications' }, { userId: user.userId, query });
    }

    @Put(':id/read')
    markNotificationAsRead(@Param('id') id: string) {
        return this.client.send({ cmd: 'markNotificationAsRead' }, parseInt(id));
    }

    @Delete(':id')
    deleteNotification(@Param('id') id: string) {
        return this.client.send({ cmd: 'deleteNotification' }, parseInt(id));
    }
}
