import { Controller } from '@nestjs/common';
import { MessagePattern, EventPattern } from '@nestjs/microservices';
import { SurveyService } from './survey.service';

@Controller()
export class SurveyController {
    // ... constructor

    @EventPattern('booking_completed')
    async handleBookingCompleted(data: any) {
        return this.surveyService.assignPostConsultationSurvey(data);
    }

    // ... other methods
    constructor(private readonly surveyService: SurveyService) { }

    @MessagePattern({ cmd: 'getSurveys' })
    getSurveys() {
        return this.surveyService.getSurveys();
    }

    @MessagePattern({ cmd: 'getSurveyById' })
    getSurveyById(id: number) {
        return this.surveyService.getSurveyById(id);
    }

    @MessagePattern({ cmd: 'createSurvey' })
    createSurvey(data: any) {
        return this.surveyService.createSurvey(data);
    }

    @MessagePattern({ cmd: 'updateSurvey' })
    updateSurvey(payload: { id: number, data: any }) {
        return this.surveyService.updateSurvey(payload.id, payload.data);
    }

    @MessagePattern({ cmd: 'deleteSurvey' })
    deleteSurvey(id: number) {
        return this.surveyService.deleteSurvey(id);
    }

    @MessagePattern({ cmd: 'submitResponse' })
    submitResponse(data: any) {
        return this.surveyService.submitResponse(data);
    }

    @MessagePattern({ cmd: 'getResponses' })
    getResponses(surveyId: number) {
        return this.surveyService.getResponses(surveyId);
    }

    @MessagePattern({ cmd: 'getAnalytics' })
    getAnalytics(surveyId: number) {
        return this.surveyService.getAnalytics(surveyId);
    }
}
