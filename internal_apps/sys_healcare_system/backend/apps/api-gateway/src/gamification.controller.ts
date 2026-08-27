import { Controller, Get, Post, Patch, Body, Param, Inject, ParseIntPipe } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller('gamification')
export class GamificationController {
    constructor(
        @Inject('GAMIFICATION_SERVICE') private readonly gamificationClient: ClientProxy,
    ) { }

    @Get('leaderboard')
    getLeaderboard() {
        return firstValueFrom(this.gamificationClient.send({ cmd: 'getLeaderboard' }, {}));
    }

    @Get('badges')
    getBadges() {
        return firstValueFrom(this.gamificationClient.send({ cmd: 'getBadges' }, {}));
    }

    @Get('rules')
    getPointRules() {
        return firstValueFrom(this.gamificationClient.send({ cmd: 'getPointRules' }, {}));
    }

    @Get('stats')
    getStats() {
        return firstValueFrom(this.gamificationClient.send({ cmd: 'getGamificationStats' }, {}));
    }

    @Post('badges')
    createBadge(@Body() data: any) {
        return firstValueFrom(this.gamificationClient.send({ cmd: 'createBadge' }, data));
    }

    @Patch('rules/:id')
    updatePointRule(@Param('id', ParseIntPipe) id: number, @Body('points') points: number) {
        return firstValueFrom(this.gamificationClient.send({ cmd: 'updatePointRule' }, { id, points }));
    }

    @Get('challenges')
    getChallenges() {
        return firstValueFrom(this.gamificationClient.send({ cmd: 'getChallenges' }, {}));
    }

    @Get('challenges/:id')
    getChallenge(@Param('id', ParseIntPipe) id: number) {
        return firstValueFrom(this.gamificationClient.send({ cmd: 'getChallenge' }, id));
    }

    @Post('challenges/:id/join')
    joinChallenge(
        @Param('id', ParseIntPipe) challengeId: number,
        @Body() body: { userId: number; userName: string }
    ) {
        return firstValueFrom(this.gamificationClient.send({ cmd: 'joinChallenge' }, { challengeId, ...body }));
    }

    @Patch('challenges/:challengeId/progress')
    updateProgress(
        @Param('challengeId', ParseIntPipe) challengeId: number,
        @Body() body: { userId: number; progress: number }
    ) {
        return firstValueFrom(this.gamificationClient.send({ cmd: 'updateChallengeProgress' }, { challengeId, ...body }));
    }
}
