import { timingSafeEqual } from 'node:crypto';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class ErpNextSyncGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const configuredToken = process.env.ERPNEXT_SYNC_TOKEN;
    const request = context.switchToHttp().getRequest<{ headers?: Record<string, string | string[] | undefined> }>();
    const providedToken = request.headers?.['x-erpnext-sync-token'];
    const token = Array.isArray(providedToken) ? providedToken[0] : providedToken;

    if (!configuredToken || !token) {
      throw new UnauthorizedException('ERPNext sync authorization required');
    }

    const expected = Buffer.from(configuredToken);
    const provided = Buffer.from(token);
    if (expected.length !== provided.length || !timingSafeEqual(expected, provided)) {
      throw new UnauthorizedException('ERPNext sync authorization required');
    }
    return true;
  }
}
