import { Controller, Get, Post, Put, Delete, Body, Param, Query, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PaginationDto } from '@app/common';

@Controller('seminars')
export class SeminarController {
    constructor(@Inject('SEMINAR_SERVICE') private readonly client: ClientProxy) { }

    // --- Seminars ---
    @Get()
    getSeminars(@Query() query: PaginationDto) {
        return this.client.send({ cmd: 'get_seminars' }, query);
    }

    @Get(':id')
    getSeminarById(@Param('id') id: string) {
        return this.client.send({ cmd: 'get_seminar_by_id' }, parseInt(id));
    }

    @Post()
    createSeminar(@Body() data: any) {
        return this.client.send({ cmd: 'create_seminar' }, data);
    }

    @Put(':id')
    updateSeminar(@Param('id') id: string, @Body() data: any) {
        return this.client.send({ cmd: 'update_seminar' }, { id: parseInt(id), data });
    }

    @Delete(':id')
    deleteSeminar(@Param('id') id: string) {
        return this.client.send({ cmd: 'delete_seminar' }, parseInt(id));
    }

    // --- Banners ---
    @Get('banners')
    getBanners(@Query() query: PaginationDto) {
        return this.client.send({ cmd: 'get_seminar_banners' }, query);
    }

    @Post('banners')
    createBanner(@Body() data: any) {
        return this.client.send({ cmd: 'create_seminar_banner' }, data);
    }

    @Delete('banners/:id')
    deleteBanner(@Param('id') id: string) {
        return this.client.send({ cmd: 'delete_seminar_banner' }, parseInt(id));
    }

    // --- Attendees ---
    @Get('attendees')
    getAttendees(@Query() query: PaginationDto & { seminarId?: string }) {
        const payload = {
            ...query,
            seminarId: query.seminarId ? parseInt(query.seminarId) : undefined
        };
        return this.client.send({ cmd: 'get_seminar_attendees' }, payload);
    }

    @Post('attendees')
    createAttendee(@Body() data: any) {
        return this.client.send({ cmd: 'create_seminar_attendee' }, data);
    }

    @Put('attendees/:id')
    updateAttendee(@Param('id') id: string, @Body() data: any) {
        return this.client.send({ cmd: 'update_seminar_attendee' }, { id: parseInt(id), data });
    }

    @Delete('attendees/:id')
    deleteAttendee(@Param('id') id: string) {
        return this.client.send({ cmd: 'delete_seminar_attendee' }, parseInt(id));
    }

    @Get('attendees/stats/:seminarId')
    getAttendeeStats(@Param('seminarId') seminarId: string) {
        return this.client.send({ cmd: 'get_seminar_attendee_stats' }, parseInt(seminarId));
    }

    // --- Invitations ---
    @Get('invitations')
    getInvitations(@Query() query: PaginationDto) {
        return this.client.send({ cmd: 'get_seminar_invitations' }, query);
    }

    @Post('invitations')
    createInvitation(@Body() data: any) {
        return this.client.send({ cmd: 'create_seminar_invitation' }, data);
    }

    // --- Sessions ---
    @Get('sessions')
    getSessions(@Query() query: PaginationDto) {
        return this.client.send({ cmd: 'get_seminar_sessions' }, query);
    }

    @Post('sessions')
    createSession(@Body() data: any) {
        return this.client.send({ cmd: 'create_seminar_session' }, data);
    }

    @Put('sessions/:id')
    updateSession(@Param('id') id: string, @Body() data: any) {
        return this.client.send({ cmd: 'update_seminar_session' }, { id: parseInt(id), data });
    }

    @Delete('sessions/:id')
    deleteSession(@Param('id') id: string) {
        return this.client.send({ cmd: 'delete_seminar_session' }, parseInt(id));
    }

    // --- Speakers ---
    @Get('speakers')
    getSpeakers(@Query() query: PaginationDto) {
        return this.client.send({ cmd: 'get_seminar_speakers' }, query);
    }

    @Post('speakers')
    createSpeaker(@Body() data: any) {
        return this.client.send({ cmd: 'create_seminar_speaker' }, data);
    }

    @Put('speakers/:id')
    updateSpeaker(@Param('id') id: string, @Body() data: any) {
        return this.client.send({ cmd: 'update_seminar_speaker' }, { id: parseInt(id), data });
    }

    @Delete('speakers/:id')
    deleteSpeaker(@Param('id') id: string) {
        return this.client.send({ cmd: 'delete_seminar_speaker' }, parseInt(id));
    }
}
