import { Module } from '@nestjs/common';
import { CpeController } from './cpe.controller';
import { CpeService } from './cpe.service';
import { EducationController } from './education.controller';
import { EducationService } from './education.service';
import { PrismaService } from './prisma';
import { CommonModule } from '@app/common';

@Module({
    imports: [CommonModule],
    controllers: [EducationController, CpeController],
    providers: [EducationService, PrismaService, CpeService],
})
export class EducationModule { }
