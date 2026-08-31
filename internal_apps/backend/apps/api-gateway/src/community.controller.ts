import { Controller, Get, Post, Put, Delete, Body, Param, Inject, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PaginationDto } from '@app/common';

@Controller('community')
export class CommunityController {
    constructor(@Inject('COMMUNITY_SERVICE') private readonly client: ClientProxy) { }

    // --- Forum ---
    @Get('forum/topics')
    getForumTopics(@Query() query: PaginationDto) {
        return this.client.send({ cmd: 'get_forum_topics' }, query);
    }

    @Get('forum/topics/:id')
    getForumTopic(@Param('id') id: string) {
        return this.client.send({ cmd: 'get_forum_topic' }, parseInt(id));
    }

    @Post('forum/topics')
    createForumTopic(@Body() data: any) {
        return this.client.send({ cmd: 'create_forum_topic' }, data);
    }

    @Put('forum/topics/:id')
    updateForumTopic(@Param('id') id: string, @Body() data: any) {
        return this.client.send({ cmd: 'update_forum_topic' }, { id: parseInt(id), data });
    }

    @Delete('forum/topics/:id')
    deleteForumTopic(@Param('id') id: string) {
        return this.client.send({ cmd: 'delete_forum_topic' }, parseInt(id));
    }

    // --- Forum Replies ---
    @Post('forum/topics/:topicId/replies')
    createForumReply(@Param('topicId') topicId: string, @Body() data: any) {
        return this.client.send({ cmd: 'create_forum_reply' }, { ...data, topicId: parseInt(topicId) });
    }

    @Delete('forum/replies/:id')
    deleteForumReply(@Param('id') id: string) {
        return this.client.send({ cmd: 'delete_forum_reply' }, parseInt(id));
    }

    // --- QA ---
    @Get('qa/questions')
    getQAQuestions(@Query() query: PaginationDto) {
        return this.client.send({ cmd: 'get_qa_questions' }, query);
    }

    @Get('qa/questions/:id')
    getQAQuestion(@Param('id') id: string) {
        return this.client.send({ cmd: 'get_qa_question' }, parseInt(id));
    }

    @Post('qa/questions')
    createQAQuestion(@Body() data: any) {
        return this.client.send({ cmd: 'create_qa_question' }, data);
    }

    @Put('qa/questions/:id')
    updateQAQuestion(@Param('id') id: string, @Body() data: any) {
        return this.client.send({ cmd: 'update_qa_question' }, { id: parseInt(id), data });
    }

    @Delete('qa/questions/:id')
    deleteQAQuestion(@Param('id') id: string) {
        return this.client.send({ cmd: 'delete_qa_question' }, parseInt(id));
    }

    // --- Support Groups ---
    @Get('groups')
    getSupportGroups(@Query() query: PaginationDto) {
        return this.client.send({ cmd: 'get_support_groups' }, query);
    }

    @Get('groups/:id')
    getSupportGroup(@Param('id') id: string) {
        return this.client.send({ cmd: 'get_support_group' }, parseInt(id));
    }

    @Post('groups')
    createSupportGroup(@Body() data: any) {
        return this.client.send({ cmd: 'create_support_group' }, data);
    }

    @Put('groups/:id')
    updateSupportGroup(@Param('id') id: string, @Body() data: any) {
        return this.client.send({ cmd: 'update_support_group' }, { id: parseInt(id), data });
    }

    @Delete('groups/:id')
    deleteSupportGroup(@Param('id') id: string) {
        return this.client.send({ cmd: 'delete_support_group' }, parseInt(id));
    }

    // --- Moderation ---
    @Get('moderation/reports')
    getModerationReports(@Query() query: PaginationDto) {
        return this.client.send({ cmd: 'get_moderation_reports' }, query);
    }

    @Post('moderation/reports')
    createModerationReport(@Body() data: any) {
        return this.client.send({ cmd: 'create_moderation_report' }, data);
    }

    @Put('moderation/reports/:id')
    updateModerationReport(@Param('id') id: string, @Body() data: any) {
        return this.client.send({ cmd: 'update_moderation_report' }, { id: parseInt(id), data });
    }

    @Delete('moderation/reports/:id')
    deleteModerationReport(@Param('id') id: string) {
        return this.client.send({ cmd: 'delete_moderation_report' }, parseInt(id));
    }
}
