import { Controller, Get, Post, Body, Param, Inject, ParseIntPipe, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AnalyzeSymptomsDto } from './dto/analyze-symptoms.dto';
import { firstValueFrom } from 'rxjs';

@Controller('ai')
export class AIController {
    constructor(
        @Inject('AI_SERVICE') private readonly aiClient: ClientProxy,
    ) { }

    @Get('recommendations')
    getRecommendations(@Query('type') type?: string) {
        return firstValueFrom(this.aiClient.send({ cmd: 'getRecommendations' }, type));
    }

    @Post('recommendations/:id/feedback')
    handleFeedback(@Param('id', ParseIntPipe) id: number, @Body('status') status: string) {
        return firstValueFrom(this.aiClient.send({ cmd: 'handleFeedback' }, { id, status }));
    }

    @Post('analyze-symptoms')
    analyzeSymptoms(@Body() body: AnalyzeSymptomsDto) {
        return firstValueFrom(this.aiClient.send({ cmd: 'analyze_symptoms' }, body.symptoms));
    }

    @Get('stats')
    getAIStats() {
        return firstValueFrom(this.aiClient.send({ cmd: 'getAIStats' }, {}));
    }

    @Get('performance')
    getModelPerformance() {
        return firstValueFrom(this.aiClient.send({ cmd: 'getModelPerformance' }, {}));
    }
}
