import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateJobPostingDto, UpdateJobPostingDto } from './dto/job-posting.dto';

@Injectable()
export class JobPostingService implements OnModuleInit {
    private readonly logger = new Logger(JobPostingService.name);

    constructor(private prisma: PrismaService) { }

    async onModuleInit() {
        await this.seedData();
    }

    private async seedData() {
        const count = await this.prisma.jobPosting.count();
        if (count === 0) {
            await this.prisma.jobPosting.createMany({
                data: [
                    {
                        pharmacyId: 'PH-001',
                        pharmacyName: 'Nhà thuốc Long Châu',
                        position: 'Dược sĩ bán thuốc',
                        description: 'Tư vấn và bán thuốc cho khách hàng.',
                        requirements: ['Tốt nghiệp Đại học Dược', 'Kinh nghiệm 1 năm'],
                        salary: '10-15 triệu',
                        location: 'TP.HCM',
                        type: 'full-time',
                        status: 'open'
                    },
                    {
                        pharmacyId: 'PH-002',
                        pharmacyName: 'Nhà thuốc Pharmacity',
                        position: 'Nhân viên kho dược',
                        description: 'Quản lý xuất nhập tồn kho dược.',
                        requirements: ['Tốt nghiệp Cao đẳng Dược', 'Trung thực, cẩn thận'],
                        salary: '8-12 triệu',
                        location: 'Hà Nội',
                        type: 'part-time',
                        status: 'open'
                    }
                ]
            });
        }
    }

    async create(createDto: CreateJobPostingDto) {
        return this.prisma.jobPosting.create({
            data: createDto,
        });
    }

    async findAll(filters?: { pharmacyId?: string; status?: string; type?: string }) {
        this.logger.debug('Querying job postings', {
            hasPharmacyFilter: Boolean(filters?.pharmacyId),
            status: filters?.status,
            type: filters?.type,
        });
        return this.prisma.jobPosting.findMany({
            where: {
                ...(filters?.pharmacyId && { pharmacyId: filters.pharmacyId }),
                ...(filters?.status && { status: filters.status }),
                ...(filters?.type && { type: filters.type }),
            },
            include: {
                _count: {
                    select: { applications: true },
                },
            },
            orderBy: { postedDate: 'desc' },
        });
    }

    async findOne(id: string) {
        return this.prisma.jobPosting.findUnique({
            where: { id },
            include: {
                applications: {
                    orderBy: { appliedDate: 'desc' },
                },
            },
        });
    }

    async update(id: string, updateDto: UpdateJobPostingDto) {
        return this.prisma.jobPosting.update({
            where: { id },
            data: updateDto,
        });
    }

    async remove(id: string) {
        return this.prisma.jobPosting.delete({
            where: { id },
        });
    }
}
