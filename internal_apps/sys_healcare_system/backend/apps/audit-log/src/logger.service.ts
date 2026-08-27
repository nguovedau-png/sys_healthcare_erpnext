import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma';
import { LogLevel } from '@prisma/client-audit-log';
import {
  PaginationDto,
  getPaginationOptions,
  createPaginatedResponse,
  buildSearchQuery
} from '@app/common';

@Injectable()
export class LoggerService {
  constructor(private prisma: PrismaService) { }

  async log(level: LogLevel, message: string, category: string) {
    return this.prisma.log.create({
      data: {
        level,
        message,
        category,
      },
    });
  }

  async getLogs(query: PaginationDto & {
    level?: LogLevel;
    category?: string;
    startDate?: Date;
    endDate?: Date;
  }) {
    const { skip, take, orderBy } = getPaginationOptions(query);
    const where: any = buildSearchQuery(query.search, 'message', 'category');

    if (query.level) where.level = query.level;
    if (query.category) where.category = query.category;
    if (query.startDate || query.endDate) {
      where.timestamp = {};
      if (query.startDate) where.timestamp.gte = query.startDate;
      if (query.endDate) where.timestamp.lte = query.endDate;
    }

    const [data, total] = await Promise.all([
      this.prisma.log.findMany({
        where,
        skip,
        take,
        orderBy: orderBy || { timestamp: 'desc' },
      }),
      this.prisma.log.count({ where }),
    ]);

    return createPaginatedResponse(data, total, query);
  }
}
