import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CommunityService } from './community.service';
import { PaginationDto } from '@app/common';

@Controller()
export class CommunityController {
    constructor(private readonly communityService: CommunityService) { }

    // --- Forum ---
    @MessagePattern({ cmd: 'get_forum_topics' })
    getForumTopics(@Payload() query: PaginationDto) {
        return this.communityService.getForumTopics(query);
    }

    @MessagePattern({ cmd: 'get_forum_topic' })
    getForumTopic(@Payload() id: number) {
        return this.communityService.getForumTopic(id);
    }

    @MessagePattern({ cmd: 'create_forum_topic' })
    createForumTopic(@Payload() data: any) {
        return this.communityService.createForumTopic(data);
    }

    @MessagePattern({ cmd: 'update_forum_topic' })
    updateForumTopic(@Payload() payload: { id: number, data: any }) {
        return this.communityService.updateForumTopic(payload.id, payload.data);
    }

    @MessagePattern({ cmd: 'delete_forum_topic' })
    deleteForumTopic(@Payload() id: number) {
        return this.communityService.deleteForumTopic(id);
    }

    @MessagePattern({ cmd: 'create_forum_reply' })
    createForumReply(@Payload() data: { topicId: number; content: string; authorId: string; authorName: string }) {
        return this.communityService.createForumReply(data);
    }

    @MessagePattern({ cmd: 'delete_forum_reply' })
    deleteForumReply(@Payload() id: number) {
        return this.communityService.deleteForumReply(id);
    }

    // --- QA ---
    @MessagePattern({ cmd: 'get_qa_questions' })
    getQAQuestions(@Payload() query: PaginationDto) {
        return this.communityService.getQAQuestions(query);
    }

    @MessagePattern({ cmd: 'get_qa_question' })
    getQAQuestion(@Payload() id: number) {
        return this.communityService.getQAQuestion(id);
    }

    @MessagePattern({ cmd: 'create_qa_question' })
    createQAQuestion(@Payload() data: any) {
        return this.communityService.createQAQuestion(data);
    }

    @MessagePattern({ cmd: 'update_qa_question' })
    updateQAQuestion(@Payload() payload: { id: number, data: any }) {
        return this.communityService.updateQAQuestion(payload.id, payload.data);
    }

    @MessagePattern({ cmd: 'delete_qa_question' })
    deleteQAQuestion(@Payload() id: number) {
        return this.communityService.deleteQAQuestion(id);
    }

    // --- Support Groups ---
    @MessagePattern({ cmd: 'get_support_groups' })
    getSupportGroups(@Payload() query: PaginationDto) {
        return this.communityService.getSupportGroups(query);
    }

    @MessagePattern({ cmd: 'get_support_group' })
    getSupportGroup(@Payload() id: number) {
        return this.communityService.getSupportGroup(id);
    }

    @MessagePattern({ cmd: 'create_support_group' })
    createSupportGroup(@Payload() data: any) {
        return this.communityService.createSupportGroup(data);
    }

    @MessagePattern({ cmd: 'update_support_group' })
    updateSupportGroup(@Payload() payload: { id: number, data: any }) {
        return this.communityService.updateSupportGroup(payload.id, payload.data);
    }

    @MessagePattern({ cmd: 'delete_support_group' })
    deleteSupportGroup(@Payload() id: number) {
        return this.communityService.deleteSupportGroup(id);
    }

    // --- Moderation ---
    @MessagePattern({ cmd: 'get_moderation_reports' })
    getModerationReports(@Payload() query: PaginationDto) {
        return this.communityService.getModerationReports(query);
    }

    @MessagePattern({ cmd: 'create_moderation_report' })
    createModerationReport(@Payload() data: any) {
        return this.communityService.createModerationReport(data);
    }

    @MessagePattern({ cmd: 'update_moderation_report' })
    updateModerationReport(@Payload() payload: { id: number, data: any }) {
        return this.communityService.updateModerationReport(payload.id, payload.data);
    }

    @MessagePattern({ cmd: 'delete_moderation_report' })
    deleteModerationReport(@Payload() id: number) {
        return this.communityService.deleteModerationReport(id);
    }
}
