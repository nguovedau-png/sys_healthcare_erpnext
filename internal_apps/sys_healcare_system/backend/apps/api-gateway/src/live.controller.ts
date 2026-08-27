import { Controller, Get, Patch, Post, Delete, Body, Param, Inject, ParseIntPipe } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller('live')
export class LiveController {
    constructor(
        @Inject('LIVE_SERVICE') private readonly liveClient: ClientProxy,
    ) { }

    @Get('sessions')
    getLiveSessions() {
        return firstValueFrom(this.liveClient.send({ cmd: 'getLiveSessions' }, {}));
    }

    @Get('sessions/:id')
    getLiveSession(@Param('id', ParseIntPipe) id: number) {
        return firstValueFrom(this.liveClient.send({ cmd: 'getLiveSession' }, id));
    }

    @Post('sessions')
    createLiveSession(@Body() data: any) {
        return firstValueFrom(this.liveClient.send({ cmd: 'createLiveSession' }, data));
    }

    @Patch('sessions/:id')
    updateLiveSession(@Param('id', ParseIntPipe) id: number, @Body() data: any) {
        return firstValueFrom(this.liveClient.send({ cmd: 'updateLiveSession' }, { id, data }));
    }

    @Delete('sessions/:id')
    deleteLiveSession(@Param('id', ParseIntPipe) id: number) {
        return firstValueFrom(this.liveClient.send({ cmd: 'deleteLiveSession' }, id));
    }

    @Get('sessions/:id/messages')
    getLiveMessages(@Param('id', ParseIntPipe) id: number) {
        return firstValueFrom(this.liveClient.send({ cmd: 'getLiveMessages' }, { livestreamId: id }));
    }

    @Post('sessions/:id/messages')
    sendLiveMessage(@Param('id', ParseIntPipe) id: number, @Body() data: any) {
        return firstValueFrom(this.liveClient.send({ cmd: 'sendLiveMessage' }, { ...data, livestreamId: id }));
    }

    @Post('sessions/:id/viewers')
    addViewer(@Param('id', ParseIntPipe) id: number, @Body() data: { userId: string, userName: string }) {
        return firstValueFrom(this.liveClient.send({ cmd: 'addViewer' }, { livestreamId: id, viewerData: data }));
    }

    @Delete('sessions/:id/viewers/:userId')
    removeViewer(@Param('id', ParseIntPipe) id: number, @Param('userId') userId: string) {
        return firstValueFrom(this.liveClient.send({ cmd: 'removeViewer' }, { livestreamId: id, userId }));
    }

    @Get('sessions/:id/viewers')
    getViewers(@Param('id', ParseIntPipe) id: number) {
        return firstValueFrom(this.liveClient.send({ cmd: 'getViewers' }, { livestreamId: id }));
    }
}
