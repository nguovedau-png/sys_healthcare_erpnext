import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateJobApplicationDto, UpdateJobApplicationDto } from './dto/job-application.dto';

@Injectable()
export class JobApplicationService {
    constructor(private prisma: PrismaService) { }

    async create(createDto: CreateJobApplicationDto) {
        return this.prisma.jobApplication.create({
            data: createDto,
        });
    }

    async findAll(filters?: { jobPostingId?: string; pharmacistId?: string; pharmacyId?: string; status?: string }) {
        return this.prisma.jobApplication.findMany({
            where: {
                ...(filters?.jobPostingId && { jobPostingId: filters.jobPostingId }),
                ...(filters?.pharmacistId && { pharmacistId: filters.pharmacistId }),
                ...(filters?.pharmacyId && { pharmacyId: filters.pharmacyId }),
                ...(filters?.status && { status: filters.status }),
            },
            include: {
                jobPosting: true,
            },
            orderBy: { appliedDate: 'desc' },
        });
    }

    async findOne(id: string) {
        return this.prisma.jobApplication.findUnique({
            where: { id },
            include: {
                jobPosting: true,
            },
        });
    }

    async update(id: string, updateDto: UpdateJobApplicationDto) {
        const data: any = { ...updateDto };
        if (updateDto.status === 'reviewed' && !updateDto.reviewedDate) {
            data.reviewedDate = new Date();
        }
        return this.prisma.jobApplication.update({
            where: { id },
            data,
        });
    }

    async remove(id: string) {
        return this.prisma.jobApplication.delete({
            where: { id },
        });
    }

    async getStats(pharmacistId?: string, pharmacyId?: string) {
        const where: any = {};
        if (pharmacistId) where.pharmacistId = pharmacistId;
        if (pharmacyId) where.pharmacyId = pharmacyId;

        const [total, pending, reviewed, interviewed, accepted, rejected] = await Promise.all([
            this.prisma.jobApplication.count({ where }),
            this.prisma.jobApplication.count({ where: { ...where, status: 'pending' } }),
            this.prisma.jobApplication.count({ where: { ...where, status: 'reviewed' } }),
            this.prisma.jobApplication.count({ where: { ...where, status: 'interviewed' } }),
            this.prisma.jobApplication.count({ where: { ...where, status: 'accepted' } }),
            this.prisma.jobApplication.count({ where: { ...where, status: 'rejected' } }),
        ]);

        return {
            totalApplications: total,
            pending,
            reviewed,
            interviewed,
            accepted,
            rejected,
        };
    }
}
