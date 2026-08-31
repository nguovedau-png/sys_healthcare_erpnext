import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AIService } from './ai.service';

@Controller()
export class AIController {
    constructor(private readonly aiService: AIService) { }

    @MessagePattern({ cmd: 'getRecommendations' })
    getRecommendations(type?: string) {
        return this.aiService.getRecommendations(type);
    }

    @MessagePattern({ cmd: 'handleFeedback' })
    handleFeedback(payload: { id: number, status: string }) {
        return this.aiService.handleFeedback(payload.id, payload.status);
    }

    @MessagePattern({ cmd: 'getAIStats' })
    getAIStats() {
        return this.aiService.getAIStats();
    }

    @MessagePattern({ cmd: 'getModelPerformance' })
    getModelPerformance() {
        return this.aiService.getModelPerformance();
    }

    @MessagePattern({ cmd: 'analyze_symptoms' })
    analyzeSymptoms(text: string) {
        return this.aiService.analyzeSymptoms(text);
    }
}
