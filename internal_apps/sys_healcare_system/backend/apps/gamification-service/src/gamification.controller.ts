import { Controller } from '@nestjs/common';
import { MessagePattern, EventPattern, Payload } from '@nestjs/microservices';
import { GamificationService } from './gamification.service';

@Controller()
export class GamificationController {
    // ... constructor

    @EventPattern('booking_completed')
    async handleBookingCompleted(data: any) {
        return this.gamificationService.awardPointsForBooking(data);
    }

    // ... other methods
    constructor(private readonly gamificationService: GamificationService) { }

    @MessagePattern({ cmd: 'getLeaderboard' })
    getLeaderboard() {
        return this.gamificationService.getLeaderboard();
    }

    @MessagePattern({ cmd: 'getBadges' })
    getBadges() {
        return this.gamificationService.getBadges();
    }

    @MessagePattern({ cmd: 'getPointRules' })
    getPointRules() {
        return this.gamificationService.getPointRules();
    }

    @MessagePattern({ cmd: 'getGamificationStats' })
    getGamificationStats() {
        return this.gamificationService.getGamificationStats();
    }

    @MessagePattern({ cmd: 'createBadge' })
    createBadge(data: any) {
        return this.gamificationService.createBadge(data);
    }

    @MessagePattern({ cmd: 'updatePointRule' })
    updatePointRule(payload: { id: number, points: number }) {
        return this.gamificationService.updatePointRule(payload.id, payload.points);
    }

    @MessagePattern({ cmd: 'getChallenges' })
    getChallenges() {
        return this.gamificationService.getChallenges();
    }

    @MessagePattern({ cmd: 'getChallenge' })
    getChallenge(@Payload() id: number) {
        return this.gamificationService.getChallenge(id);
    }

    @MessagePattern({ cmd: 'joinChallenge' })
    joinChallenge(@Payload() payload: { challengeId: number; userId: number; userName: string }) {
        return this.gamificationService.joinChallenge(payload.challengeId, payload.userId, payload.userName);
    }

    @MessagePattern({ cmd: 'updateChallengeProgress' })
    updateChallengeProgress(@Payload() payload: { challengeId: number; userId: number; progress: number }) {
        return this.gamificationService.updateChallengeProgress(payload.challengeId, payload.userId, payload.progress);
    }
}
