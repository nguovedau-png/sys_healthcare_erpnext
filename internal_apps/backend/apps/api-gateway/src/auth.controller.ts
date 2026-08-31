import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller('auth')
export class AuthController {
    constructor(
        @Inject('AUTH_SERVICE') private readonly authService: ClientProxy,
    ) { }

    @Post('login')
    async login(@Body() data: any) {
        return firstValueFrom(this.authService.send({ cmd: 'auth.login' }, data));
    }

    @Post('register')
    async register(@Body() data: any) {
        return firstValueFrom(this.authService.send({ cmd: 'auth.register' }, data));
    }

    @Post('refresh-token')
    async refreshToken(@Body() data: { token?: string; refreshToken?: string }) {
        const refreshToken = data?.refreshToken || data?.token;
        if (!refreshToken) throw new Error('Refresh token is required');
        return firstValueFrom(this.authService.send({ cmd: 'auth.refresh' }, { refreshToken }));
    }
}
