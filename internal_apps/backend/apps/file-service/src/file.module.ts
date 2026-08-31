import { Module } from '@nestjs/common';
import { FileManagementController } from './file.controller';
import { FileManagementService } from './file.service';
import { PrismaService } from './prisma';

@Module({
  imports: [],
  controllers: [FileManagementController],
  providers: [FileManagementService, PrismaService],
})
export class FileManagementModule { }
