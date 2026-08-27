import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<{ headers?: { authorization?: string }; user?: unknown }>();
    const authorization = request.headers?.authorization;
    const [scheme, token] = authorization?.split(' ') ?? [];
    const secret = process.env.JWT_SECRET;
    if (scheme !== 'Bearer' || !token || !secret) {
      throw new UnauthorizedException('Bearer access token is required');
    }

    try {
      request.user = this.jwtService.verify(token, { secret });
      return true;
    } catch {
      throw new UnauthorizedException('Invalid or expired access token');
    }
  }
}
