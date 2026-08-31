import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SeminarService } from './seminar.service';
import { PaginationDto } from '@app/common';

@Controller()
export class SeminarController {
    constructor(private readonly seminarService: SeminarService) { }

    // --- Seminars ---
    @MessagePattern({ cmd: 'get_seminars' })
    getSeminars(@Payload() query: PaginationDto) {
        return this.seminarService.getSeminars(query);
    }

    @MessagePattern({ cmd: 'get_seminar_by_id' })
    getSeminarById(@Payload() id: number) {
        return this.seminarService.getSeminarById(id);
    }

    @MessagePattern({ cmd: 'create_seminar' })
    createSeminar(@Payload() data: any) {
        return this.seminarService.createSeminar(data);
    }

    @MessagePattern({ cmd: 'update_seminar' })
    updateSeminar(@Payload() payload: { id: number; data: any }) {
        return this.seminarService.updateSeminar(payload.id, payload.data);
    }

    @MessagePattern({ cmd: 'delete_seminar' })
    deleteSeminar(@Payload() id: number) {
        return this.seminarService.deleteSeminar(id);
    }

    // --- Banners ---
    @MessagePattern({ cmd: 'get_seminar_banners' })
    getBanners(@Payload() query: PaginationDto) {
        return this.seminarService.getBanners(query);
    }

    @MessagePattern({ cmd: 'create_seminar_banner' })
    createBanner(@Payload() data: any) {
        return this.seminarService.createBanner(data);
    }

    @MessagePattern({ cmd: 'delete_seminar_banner' })
    deleteBanner(@Payload() id: number) {
        return this.seminarService.deleteBanner(id);
    }

    // --- Attendees ---
    @MessagePattern({ cmd: 'get_seminar_attendees' })
    getAttendees(@Payload() query: PaginationDto & { seminarId?: number }) {
        return this.seminarService.getAttendees(query);
    }

    @MessagePattern({ cmd: 'create_seminar_attendee' })
    createAttendee(@Payload() data: any) {
        return this.seminarService.createAttendee(data);
    }

    @MessagePattern({ cmd: 'update_seminar_attendee' })
    updateAttendee(@Payload() payload: { id: number; data: any }) {
        return this.seminarService.updateAttendee(payload.id, payload.data);
    }

    @MessagePattern({ cmd: 'delete_seminar_attendee' })
    async delete_seminar_attendee(id: number) {
        return this.seminarService.deleteAttendee(id);
    }

    @MessagePattern({ cmd: 'get_seminar_attendee_stats' })
    async get_seminar_attendee_stats(seminarId: number) {
        return this.seminarService.getAttendeeStats(seminarId);
    }

    // --- Invitations ---
    @MessagePattern({ cmd: 'get_seminar_invitations' })
    getInvitations(@Payload() query: PaginationDto) {
        return this.seminarService.getInvitations(query);
    }

    @MessagePattern({ cmd: 'create_seminar_invitation' })
    createInvitation(@Payload() data: any) {
        return this.seminarService.createInvitation(data);
    }

    // --- Sessions ---
    @MessagePattern({ cmd: 'get_seminar_sessions' })
    getSessions(@Payload() query: PaginationDto) {
        return this.seminarService.getSessions(query);
    }

    @MessagePattern({ cmd: 'create_seminar_session' })
    createSession(@Payload() data: any) {
        return this.seminarService.createSession(data);
    }

    @MessagePattern({ cmd: 'update_seminar_session' })
    updateSession(@Payload() payload: { id: number; data: any }) {
        return this.seminarService.updateSession(payload.id, payload.data);
    }

    @MessagePattern({ cmd: 'delete_seminar_session' })
    deleteSession(@Payload() id: number) {
        return this.seminarService.deleteSession(id);
    }

    // --- Speakers ---
    @MessagePattern({ cmd: 'get_seminar_speakers' })
    getSpeakers(@Payload() query: PaginationDto) {
        return this.seminarService.getSpeakers(query);
    }

    @MessagePattern({ cmd: 'create_seminar_speaker' })
    createSpeaker(@Payload() data: any) {
        return this.seminarService.createSpeaker(data);
    }

    @MessagePattern({ cmd: 'update_seminar_speaker' })
    updateSpeaker(@Payload() payload: { id: number; data: any }) {
        return this.seminarService.updateSpeaker(payload.id, payload.data);
    }

    @MessagePattern({ cmd: 'delete_seminar_speaker' })
    deleteSpeaker(@Payload() id: number) {
        return this.seminarService.deleteSpeaker(id);
    }
}
