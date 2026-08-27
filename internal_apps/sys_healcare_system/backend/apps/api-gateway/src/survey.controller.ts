import { Controller, Get, Post, Patch, Delete, Body, Param, Inject, ParseIntPipe } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller('surveys')
export class SurveyController {
    constructor(
        @Inject('SURVEY_SERVICE') private readonly surveyClient: ClientProxy,
    ) { }

    @Get()
    getSurveys() {
        return firstValueFrom(this.surveyClient.send({ cmd: 'getSurveys' }, {}));
    }

    @Get(':id')
    getSurveyById(@Param('id', ParseIntPipe) id: number) {
        return firstValueFrom(this.surveyClient.send({ cmd: 'getSurveyById' }, id));
    }

    @Post()
    createSurvey(@Body() data: any) {
        return firstValueFrom(this.surveyClient.send({ cmd: 'createSurvey' }, data));
    }

    @Patch(':id')
    updateSurvey(@Param('id', ParseIntPipe) id: number, @Body() data: any) {
        return firstValueFrom(this.surveyClient.send({ cmd: 'updateSurvey' }, { id, data }));
    }

    @Delete(':id')
    deleteSurvey(@Param('id', ParseIntPipe) id: number) {
        return firstValueFrom(this.surveyClient.send({ cmd: 'deleteSurvey' }, id));
    }

    @Post(':id/responses')
    submitResponse(@Param('id', ParseIntPipe) id: number, @Body() data: any) {
        return firstValueFrom(this.surveyClient.send({ cmd: 'submitResponse' }, { ...data, surveyId: id }));
    }

    @Get(':id/responses')
    getResponses(@Param('id', ParseIntPipe) id: number) {
        return firstValueFrom(this.surveyClient.send({ cmd: 'getResponses' }, id));
    }

    @Get(':id/analytics')
    getAnalytics(@Param('id', ParseIntPipe) id: number) {
        return firstValueFrom(this.surveyClient.send({ cmd: 'getAnalytics' }, id));
    }
}
