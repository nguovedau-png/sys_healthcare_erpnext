import { Injectable, OnModuleInit, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { PrismaService } from './prisma';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import {
    PaginationDto,
    getPaginationOptions,
    createPaginatedResponse,
    buildSearchQuery,
    CacheUtil
} from '@app/common';

@Injectable()
export class PartnerService implements OnModuleInit {
    constructor(
        private readonly prisma: PrismaService,
        private readonly elasticsearchService: ElasticsearchService,
        @Inject(CACHE_MANAGER) private cacheManager: Cache
    ) { }

    async onModuleInit() {
        await this.seedData();
        await this.ensureIndices();
        await this.syncAllToElasticsearch();
    }

    private async ensureIndices() {
        const indices = ['doctors', 'clinics', 'hospitals', 'pharmacies'];
        for (const index of indices) {
            const exists = await this.elasticsearchService.indices.exists({ index });
            if (!exists) {
                await this.elasticsearchService.indices.create({ index });
                console.log(`Created Elasticsearch index: ${index}`);
            }
        }
    }

    private async syncAllToElasticsearch() {
        console.log('Starting full sync to Elasticsearch...');
        
        const [doctors, clinics, hospitals, pharmacies] = await Promise.all([
            this.prisma.doctor.findMany(),
            this.prisma.clinic.findMany(),
            this.prisma.hospital.findMany(),
            this.prisma.pharmacy.findMany(),
        ]);

        await Promise.all([
            ...doctors.map((d: any) => this.indexPartner('doctors', d)),
            ...clinics.map((c: any) => this.indexPartner('clinics', c)),
            ...hospitals.map((h: any) => this.indexPartner('hospitals', h)),
            ...pharmacies.map((p: any) => this.indexPartner('pharmacies', p)),
        ]);
        
        console.log('Finished full sync to Elasticsearch.');
    }

    private async indexPartner(index: string, data: any) {
        try {
            await this.elasticsearchService.index({
                index,
                id: data.id.toString(),
                document: data,
            });
        } catch (error) {
            console.error(`Error indexing ${index} ID ${data.id}:`, error);
        }
    }

    private async deletePartnerIndex(index: string, id: number) {
        try {
            await this.elasticsearchService.delete({
                index,
                id: id.toString(),
            });
        } catch (error) {
            console.error(`Error deleting ${index} ID ${id} from index:`, error);
        }
    }

    private async seedData() {
        // Seed Doctors
        const doctorsCount = await this.prisma.doctor.count();
        if (doctorsCount === 0) {
            await this.prisma.doctor.createMany({
                data: [
                    { name: 'BS. Nguyễn Văn An', specialty: 'Tim mạch', hospital: 'Bệnh viện Chợ Rẫy', phone: '0901234567', email: 'nva@choray.vn', rating: 4.8, isVerified: true, description: 'Chuyên gia tim mạch can thiệp, 15 năm kinh nghiệm' },
                    { name: 'BS. Trần Thị Bích', specialty: 'Nhi khoa', hospital: 'Bệnh viện Nhi Đồng 1', phone: '0907654321', email: 'ttb@nhi.vn', rating: 4.9, isVerified: true, description: 'Bác sĩ nhi khoa, chuyên điều trị bệnh nhiễm khuẩn' },
                    { name: 'TS.BS. Lê Minh Cường', specialty: 'Thần kinh', hospital: 'Bệnh viện 115', phone: '0909111222', email: 'lmc@bv115.vn', rating: 4.7, isVerified: true, description: 'Tiến sĩ thần kinh học, chuyên điều trị đột quỵ' },
                    { name: 'BS. Phạm Thị Dung', specialty: 'Sản phụ khoa', hospital: 'Bệnh viện Từ Dũ', phone: '0908222333', email: 'ptd@tudu.vn', rating: 4.6, isVerified: false, description: 'Chuyên khoa sản, hơn 10 năm kinh nghiệm' },
                    { name: 'PGS.TS. Hoàng Văn Em', specialty: 'Ngoại khoa', hospital: 'Bệnh viện Chợ Rẫy', phone: '0907333444', email: 'hve@choray.vn', rating: 4.9, isVerified: true, description: 'Phó giáo sư ngoại khoa, chuyên phẫu thuật nội soi' },
                    { name: 'BS. Võ Thị Phương', specialty: 'Da liễu', hospital: 'Bệnh viện Da liễu TP.HCM', phone: '0906444555', email: 'vtp@dalieu.vn', rating: 4.5, isVerified: true, description: 'Bác sĩ da liễu thẩm mỹ' },
                    { name: 'BS. Đặng Minh Giang', specialty: 'Mắt', hospital: 'Bệnh viện Mắt TP.HCM', phone: '0905555666', email: 'dmg@mat.vn', rating: 4.8, isVerified: false, description: 'Chuyên khoa mắt, phẫu thuật cận thị' },
                    { name: 'BS. Ngô Thị Hoa', specialty: 'Tai mũi họng', hospital: 'Bệnh viện Tai Mũi Họng', phone: '0904666777', email: 'nth@tmh.vn', rating: 4.4, isVerified: true, description: 'Bác sĩ TMH, chuyên điều trị viêm xoang' },
                    { name: 'BS. Trương Văn Ích', specialty: 'Nội tiết', hospital: 'Bệnh viện Đại học Y Dược', phone: '0903777888', email: 'tvi@yduoc.vn', rating: 4.7, isVerified: true, description: 'Chuyên khoa nội tiết, điều trị tiểu đường' },
                    { name: 'BS. Lý Thị Kim', specialty: 'Răng hàm mặt', hospital: 'Nha khoa Paris', phone: '0902888999', email: 'ltk@paris.vn', rating: 4.6, isVerified: false, description: 'Bác sĩ nha khoa thẩm mỹ' },
                ]
            });
        }

        // Seed Hospitals
        const hospitalsCount = await this.prisma.hospital.count();
        if (hospitalsCount === 0) {
            await this.prisma.hospital.createMany({
                data: [
                    { name: 'Bệnh viện Chợ Rẫy', address: '201B Nguyễn Chí Thanh, Q.5, TP.HCM', phone: '028-38554137', website: 'http://choray.vn', departments: ['Tim mạch', 'Ngoại khoa', 'Nội khoa', 'Cấp cứu'], beds: 1800, rating: 4.7, isVerified: true, description: 'Bệnh viện đa khoa hạng đặc biệt' },
                    { name: 'Bệnh viện Nhi Đồng 1', address: '341 Sư Vạn Hạnh, Q.10, TP.HCM', phone: '028-38650100', website: 'http://bvnd1.org.vn', departments: ['Nhi khoa', 'Sơ sinh', 'Nhi ngoại'], beds: 650, rating: 4.6, isVerified: true, description: 'Bệnh viện nhi đồng lớn nhất miền Nam' },
                    { name: 'Bệnh viện 115', address: '527 Sư Vạn Hạnh, Q.10, TP.HCM', phone: '028-38650115', website: 'http://bv115.com.vn', departments: ['Cấp cứu', 'Thần kinh', 'Chấn thương chỉnh hình'], beds: 500, rating: 4.5, isVerified: true, description: 'Bệnh viện cấp cứu chuyên sâu' },
                    { name: 'Bệnh viện Từ Dũ', address: '284 Cống Quỳnh, Q.1, TP.HCM', phone: '028-38297676', website: 'http://tudu.com.vn', departments: ['Sản', 'Phụ khoa', 'Kế hoạch hóa gia đình'], beds: 400, rating: 4.8, isVerified: true, description: 'Bệnh viện sản phụ khoa hàng đầu' },
                    { name: 'Bệnh viện Đại học Y Dược', address: '215 Hồng Bàng, Q.5, TP.HCM', phone: '028-38554269', website: 'http://bvdaihoc.com.vn', departments: ['Đa khoa', 'Nghiên cứu', 'Đào tạo'], beds: 800, rating: 4.6, isVerified: true, description: 'Bệnh viện đào tạo và nghiên cứu' },
                    { name: 'Bệnh viện Nhân Dân 115', address: '527 Sư Vạn Hạnh, Q.10, TP.HCM', phone: '028-39577115', departments: ['Nội khoa', 'Ngoại khoa'], beds: 300, rating: 4.3, isVerified: false, description: 'Bệnh viện đa khoa khu vực' },
                    { name: 'Bệnh viện FV', address: '6 Nguyễn Lương Bằng, Q.7, TP.HCM', phone: '028-54113333', website: 'http://fvhospital.com', departments: ['Đa khoa quốc tế', 'Phẫu thuật', 'Chẩn đoán hình ảnh'], beds: 200, rating: 4.9, isVerified: true, description: 'Bệnh viện quốc tế cao cấp' },
                    { name: 'Bệnh viện Ung Bướu TP.HCM', address: '3 Nơ Trang Long, Bình Thạnh, TP.HCM', phone: '028-38990281', website: 'http://ungbuou.org.vn', departments: ['Ung thư', 'Xạ trị', 'Hóa trị'], beds: 600, rating: 4.7, isVerified: true, description: 'Bệnh viện chuyên khoa ung bướu' },
                ]
            });
        }

        // Seed Clinics
        const clinicsCount = await this.prisma.clinic.count();
        if (clinicsCount === 0) {
            await this.prisma.clinic.createMany({
                data: [
                    { name: 'Phòng khám Đa khoa Hoàn Mỹ', address: '60-62 Phan Xích Long, Phú Nhuận, TP.HCM', phone: '028-39971010', email: 'info@hoanmy.com', specialties: ['Nội khoa', 'Ngoại khoa', 'Sản phụ khoa'], rating: 4.5, isVerified: true, description: 'Phòng khám đa khoa uy tín' },
                    { name: 'Phòng khám Family Medical Practice', address: '34 Lê Duẩn, Q.1, TP.HCM', phone: '028-38227848', email: 'hcmc@vietnammedicalpractice.com', specialties: ['Nội khoa', 'Nhi khoa', 'Gia đình'], rating: 4.7, isVerified: true, description: 'Phòng khám quốc tế' },
                    { name: 'Phòng khám Đa khoa Sài Gòn', address: '123 Nguyễn Thị Minh Khai, Q.3, TP.HCM', phone: '028-39301919', specialties: ['Tim mạch', 'Tiêu hóa', 'Hô hấp'], rating: 4.4, isVerified: true, description: 'Phòng khám chuyên khoa' },
                    { name: 'Phòng khám Nhi Đồng', address: '456 Lê Văn Sỹ, Q.3, TP.HCM', phone: '028-39303030', email: 'nhi@clinic.vn', specialties: ['Nhi khoa', 'Tiêm chủng'], rating: 4.6, isVerified: false, description: 'Chuyên khám và điều trị nhi' },
                    { name: 'Phòng khám Da liễu Thẩm mỹ Đông Á', address: '789 Cách Mạng Tháng 8, Q.10, TP.HCM', phone: '028-39757575', specialties: ['Da liễu', 'Thẩm mỹ'], rating: 4.3, isVerified: true, description: 'Chuyên da liễu và thẩm mỹ' },
                    { name: 'Phòng khám Răng hàm mặt Nha Khoa Paris', address: '234 Pasteur, Q.3, TP.HCM', phone: '028-38234567', email: 'paris@dental.vn', specialties: ['Nha khoa', 'Implant', 'Niềng răng'], rating: 4.8, isVerified: true, description: 'Nha khoa thẩm mỹ cao cấp' },
                ]
            });
        }

        // Seed Pharmacies
        const pharmaciesCount = await this.prisma.pharmacy.count();
        if (pharmaciesCount === 0) {
            await this.prisma.pharmacy.createMany({
                data: [
                    { name: 'Nhà thuốc Long Châu', address: '123 Nguyễn Văn Linh, Q.7, TP.HCM', phone: '1800-6928', email: 'longchau@fpt.vn', website: 'https://nhathuoclongchau.com.vn', outletOwner: 'Nguyễn Văn A', memberRank: 'platinum', status: 'active', pointsCMEOnline: 15500, isVerified: true, gppNumber: 'GPP-2024-001', rating: 4.8, reviewCount: 1250 },
                    { name: 'Nhà thuốc Pharmacity', address: '456 Lê Văn Việt, Q.9, TP.HCM', phone: '1800-6821', email: 'pharmacity@fpt.vn', website: 'https://pharmacity.vn', outletOwner: 'Trần Thị B', memberRank: 'gold', status: 'active', pointsCMEOnline: 8200, isVerified: true, gppNumber: 'GPP-2024-002', rating: 4.7, reviewCount: 980 },
                    { name: 'Nhà thuốc An Khang', address: '789 Cách Mạng Tháng 8, Q.10, TP.HCM', phone: '028-39876543', email: 'ankhang@gmail.com', outletOwner: 'Lê Văn C', memberRank: 'silver', status: 'active', pointsCMEOnline: 5400, isVerified: true, gppNumber: 'GPP-2024-003', rating: 4.5, reviewCount: 450 },
                    { name: 'Nhà thuốc Phương Chính', address: '321 Lý Thường Kiệt, Q.11, TP.HCM', phone: '028-39123456', outletOwner: 'Phạm Thị D', memberRank: 'bronze', status: 'active', pointsCMEOnline: 2100, isVerified: false, gppNumber: 'GPP-2024-004', rating: 4.3, reviewCount: 220 },
                    { name: 'Nhà thuốc Medicare', address: '567 Điện Biên Phủ, Q.3, TP.HCM', phone: '028-39234567', email: 'medicare@vn.com', website: 'https://medicare.vn', outletOwner: 'Hoàng Văn E', memberRank: 'platinum', status: 'active', pointsCMEOnline: 18900, isVerified: true, gppNumber: 'GPP-2024-005', rating: 4.9, reviewCount: 1580 },
                    { name: 'Nhà thuốc Đức Tâm', address: '890 Nguyễn Trãi, Q.5, TP.HCM', phone: '028-39345678', outletOwner: 'Võ Thị F', memberRank: 'gold', status: 'active', pointsCMEOnline: 9800, isVerified: true, gppNumber: 'GPP-2024-006', rating: 4.6, reviewCount: 720 },
                    { name: 'Nhà thuốc Bảo Châu', address: '234 Phan Văn Trị, Gò Vấp, TP.HCM', phone: '028-39456789', email: 'baochau@yahoo.com', outletOwner: 'Đặng Minh G', memberRank: 'silver', status: 'active', pointsCMEOnline: 6300, isVerified: true, gppNumber: 'GPP-2024-007', rating: 4.4, reviewCount: 380 },
                    { name: 'Nhà thuốc Thiên Hòa', address: '678 Quang Trung, Gò Vấp, TP.HCM', phone: '028-39567890', outletOwner: 'Ngô Thị H', memberRank: 'bronze', status: 'active', pointsCMEOnline: 3200, isVerified: false, rating: 4.2, reviewCount: 150 },
                    { name: 'Nhà thuốc Sài Gòn', address: '901 Lê Hồng Phong, Q.10, TP.HCM', phone: '028-39678901', email: 'saigon@pharmacy.vn', outletOwner: 'Trương Văn I', memberRank: 'gold', status: 'active', pointsCMEOnline: 11200, isVerified: true, gppNumber: 'GPP-2024-008', rating: 4.7, reviewCount: 890 },
                    { name: 'Nhà thuốc Minh Đức', address: '345 Hoàng Văn Thụ, Tân Bình, TP.HCM', phone: '028-39789012', outletOwner: 'Lý Thị K', memberRank: 'platinum', status: 'active', pointsCMEOnline: 16700, isVerified: true, gppNumber: 'GPP-2024-009', rating: 4.8, reviewCount: 1120 },
                ]
            });
        }

        // Seed Pharmacists
        const pharmacistsCount = await this.prisma.pharmacist.count();
        if (pharmacistsCount === 0) {
            await this.prisma.pharmacist.createMany({
                data: [
                    { fullName: 'Dược sĩ Nguyễn Văn An', phoneNumber: '0909111222', address: '123 Lê Lợi, Q.1, TP.HCM', specialistly: 'Dược lâm sàng', career: 'Dược sĩ chính', pointsCMEOnline: 12000, memberRank: 'gold', status: 'active', isVerified: true, rating: 4.7, reviewCount: 85 },
                    { fullName: 'Dược sĩ Trần Thị Bình', phoneNumber: '0909222333', address: '456 Nguyễn Huệ, Q.1, TP.HCM', specialistly: 'Dược học cổ truyền', career: 'Dược sĩ tư vấn', pointsCMEOnline: 18500, memberRank: 'platinum', status: 'active', isVerified: true, rating: 4.9, reviewCount: 120 },
                    { fullName: 'Dược sĩ Lê Minh Cường', phoneNumber: '0909333444', address: '789 Pasteur, Q.3, TP.HCM', specialistly: 'Dược lâm sàng', career: 'Trưởng phòng', pointsCMEOnline: 15200, memberRank: 'platinum', status: 'active', isVerified: true, rating: 4.8, reviewCount: 95 },
                    { fullName: 'Dược sĩ Phạm Thị Dung', phoneNumber: '0909444555', address: '321 Điện Biên Phủ, Bình Thạnh, TP.HCM', specialistly: 'Dược phẩm', career: 'Dược sĩ', pointsCMEOnline: 8900, memberRank: 'silver', status: 'active', isVerified: false, rating: 4.5, reviewCount: 42 },
                    { fullName: 'Dược sĩ Hoàng Văn Em', phoneNumber: '0909555666', address: '567 Cộng Hòa, Tân Bình, TP.HCM', specialistly: 'Dược lý học', career: 'Dược sĩ chính', pointsCMEOnline: 13400, memberRank: 'gold', status: 'active', isVerified: true, rating: 4.6, reviewCount: 78 },
                    { fullName: 'Dược sĩ Võ Thị Phương', phoneNumber: '0909666777', address: '890 Nguyễn Văn Cừ, Q.5, TP.HCM', specialistly: 'Dược thực phẩm', career: 'Dược sĩ tư vấn', pointsCMEOnline: 10500, memberRank: 'gold', status: 'active', isVerified: true, rating: 4.7, reviewCount: 65 },
                    { fullName: 'Dược sĩ Đặng Minh Giang', phoneNumber: '0909777888', address: '234 Lý Thường Kiệt, Q.10, TP.HCM', specialistly: 'Dược lâm sàng', career: 'Dược sĩ', pointsCMEOnline: 7200, memberRank: 'bronze', status: 'active', isVerified: false, rating: 4.3, reviewCount: 28 },
                    { fullName: 'Dược sĩ Ngô Thị Hoa', phoneNumber: '0909888999', address: '678 Hoàng Hoa Thám, Tân Bình, TP.HCM', specialistly: 'Dược học cổ truyền', career: 'Dược sĩ chính', pointsCMEOnline: 16800, memberRank: 'platinum', status: 'active', isVerified: true, rating: 4.9, reviewCount: 110 },
                ]
            });
        }

        // Seed Patients
        const patientsCount = await this.prisma.patient.count();
        if (patientsCount === 0) {
            await this.prisma.patient.createMany({
                data: [
                    { name: 'Nguyễn Văn Bình', age: 58, gender: 'Nam', diagnosis: 'Tăng huyết áp', phone: '0912345678', email: 'nvb@gmail.com', visits: 5, lastVisit: '2026-04-16', status: 'active' },
                    { name: 'Trần Thị Cẩm', age: 34, gender: 'Nữ', diagnosis: 'Đái tháo đường type 2', phone: '0987234567', email: 'ttc@gmail.com', visits: 3, lastVisit: '2026-04-15', status: 'active' },
                    { name: 'Lê Minh Đức', age: 67, gender: 'Nam', diagnosis: 'Suy tim độ II', phone: '0905123456', visits: 8, lastVisit: '2026-04-10', status: 'inactive' },
                    { name: 'Phạm Thị D', age: 25, gender: 'Nữ', diagnosis: 'Sốt xuất huyết', phone: '0904444444', email: 'ptd@yahoo.com', visits: 2, lastVisit: '2025-12-25', status: 'active' },
                    { name: 'Hoàng Văn E', age: 40, gender: 'Nam', diagnosis: 'Viêm dạ dày', phone: '0905555555', visits: 12, lastVisit: '2025-12-05', status: 'active' },
                    { name: 'Võ Thị F', age: 32, gender: 'Nữ', diagnosis: 'Rối loạn tiền đình', phone: '0906666666', email: 'vtf@outlook.com', visits: 6, lastVisit: '2025-12-18', status: 'active' },
                    { name: 'Đặng Minh G', age: 45, gender: 'Nam', diagnosis: 'Gout', phone: '0907777777', visits: 4, lastVisit: '2025-12-22', status: 'inactive' },
                    { name: 'Ngô Thị H', age: 28, gender: 'Nữ', diagnosis: 'Viêm phế quản', phone: '0908888888', email: 'nth@gmail.com', visits: 9, lastVisit: '2025-12-08', status: 'active' },
                    { name: 'Trương Văn I', age: 50, gender: 'Nam', diagnosis: 'Thoái hóa cột sống', phone: '0909999999', visits: 1, lastVisit: '2025-12-28', status: 'active' },
                    { name: 'Lý Thị K', age: 38, gender: 'Nữ', diagnosis: 'Đau nửa đầu', phone: '0900000000', email: 'ltk@hotmail.com', visits: 7, lastVisit: '2025-12-12', status: 'active' },
                ]
            });
        }

        // Seed Staff
        const staffCount = await this.prisma.staff.count();
        if (staffCount === 0) {
            await this.prisma.staff.createMany({
                data: [
                    { staffId: 'S01', name: 'BS. Nguyễn Văn A', role: 'Bác sĩ', department: 'Khoa Nội', status: 'active', phone: '0901234567' },
                    { staffId: 'S02', name: 'ĐD. Trần Thị B', role: 'Điều dưỡng', department: 'Khoa Ngoại', status: 'on-leave', phone: '0909999999' },
                    { staffId: 'S03', name: 'BS. Lê C', role: 'Bác sĩ', department: 'Cấp cứu', status: 'active', phone: '0908888888' },
                ]
            });
        }

        // Seed Departments
        const deptCount = await this.prisma.department.count();
        if (deptCount === 0) {
            await this.prisma.department.createMany({
                data: [
                    { name: 'Khoa Nội Tổng hợp', head: 'BS.CKII Nguyễn Văn A', staffCount: 15, bedCount: 50 },
                    { name: 'Khoa Ngoại Tổng quát', head: 'ThS.BS Trần Văn B', staffCount: 20, bedCount: 45 },
                    { name: 'Khoa Nhi', head: 'BS.CKI Lê Thị C', staffCount: 12, bedCount: 30 },
                    { name: 'Khoa Cấp cứu', head: 'BS. Phạm D', staffCount: 25, bedCount: 20 },
                ]
            });
        }

        // Seed ServiceItems
        const servicesCount = await this.prisma.serviceItem.count();
        if (servicesCount === 0) {
            await this.prisma.serviceItem.createMany({
                data: [
                    { serviceId: 'SV01', name: 'Khám Nội tổng quát', category: 'Khám bệnh', price: 150000, insurance: true },
                    { serviceId: 'SV02', name: 'Khám Chuyên khoa (Tim mạch/Nội tiết)', category: 'Khám bệnh', price: 300000, insurance: true },
                    { serviceId: 'SV03', name: 'Siêu âm ổ bụng tổng quát', category: 'CĐHA', price: 250000, insurance: true },
                    { serviceId: 'SV04', name: 'X-Quang Phổi thẳng', category: 'CĐHA', price: 180000, insurance: true },
                    { serviceId: 'SV05', name: 'Gói khám sức khỏe VIP', category: 'Gói khám', price: 5000000, insurance: false },
                ]
            });
        }
    }

    // --- Doctors ---
    async getDoctors(query: PaginationDto) {
        const cacheKey = `partners:doctors:${JSON.stringify(query)}`;
        const cached = await this.cacheManager.get(cacheKey);
        if (cached) return cached;

        const { skip, take, orderBy } = getPaginationOptions(query);

        if (query.search) {
            const result = await this.elasticsearchService.search({
                index: 'doctors',
                from: skip,
                size: take,
                query: {
                    multi_match: {
                        query: query.search,
                        fields: ['name', 'specialty', 'hospital', 'email', 'description'],
                    },
                },
            });

            const total = typeof result.hits.total === 'number' ? result.hits.total : result.hits.total?.value || 0;
            const data = result.hits.hits.map((hit) => hit._source);
            const response = createPaginatedResponse(data, total, query);
            await this.cacheManager.set(cacheKey, response, 300000);
            return response;
        }

        const where = buildSearchQuery(query.search, 'name', 'specialty', 'hospital', 'email');

        const [data, total] = await Promise.all([
            this.prisma.doctor.findMany({ where, skip, take, orderBy }),
            this.prisma.doctor.count({ where }),
        ]);

        const response = createPaginatedResponse(data, total, query);
        await this.cacheManager.set(cacheKey, response, 300000); // 5 mins
        return response;
    }

    async getDoctor(id: number) {
        const cacheKey = CacheUtil.getInternalKey('partner', 'doctor', String(id));
        const cached = await this.cacheManager.get(cacheKey);
        console.log(`[Cache] getDoctor id=${id} key=${cacheKey} hit=${!!cached}`);
        if (cached) return cached;

        const doctor = await this.prisma.doctor.findUnique({ where: { id } });
        if (doctor) await this.cacheManager.set(cacheKey, doctor, 300000);
        return doctor;
    }

    async createDoctor(data: any) {
        const result = await this.prisma.doctor.create({ data });
        await this.indexPartner('doctors', result);
        await this.invalidateCache('doctors');
        return result;
    }

    async updateDoctor(id: number, data: any) {
        const result = await this.prisma.doctor.update({ where: { id }, data });
        await this.indexPartner('doctors', result);
        await this.invalidateCache('doctors', id);
        return result;
    }

    async deleteDoctor(id: number) {
        const result = await this.prisma.doctor.delete({ where: { id } });
        await this.deletePartnerIndex('doctors', id);
        await this.invalidateCache('doctors', id);
        return result;
    }

    // --- Clinics ---
    async getClinics(query: PaginationDto) {
        const cacheKey = CacheUtil.getInternalKey('partner', 'clinics', query);
        const cached = await this.cacheManager.get(cacheKey);
        if (cached) return cached;

        const { skip, take, orderBy } = getPaginationOptions(query);

        if (query.search) {
            const result = await this.elasticsearchService.search({
                index: 'clinics',
                from: skip,
                size: take,
                query: {
                    multi_match: {
                        query: query.search,
                        fields: ['name', 'address', 'email', 'description', 'specialties'],
                    },
                },
            });

            const total = typeof result.hits.total === 'number' ? result.hits.total : result.hits.total?.value || 0;
            const data = result.hits.hits.map((hit) => hit._source);
            const response = createPaginatedResponse(data, total, query);
            await this.cacheManager.set(cacheKey, response, 300000);
            return response;
        }

        const where = buildSearchQuery(query.search, 'name', 'address', 'email');

        const [data, total] = await Promise.all([
            this.prisma.clinic.findMany({ where, skip, take, orderBy }),
            this.prisma.clinic.count({ where }),
        ]);

        const response = createPaginatedResponse(data, total, query);
        await this.cacheManager.set(cacheKey, response, 300000);
        return response;
    }

    async getClinic(id: number) {
        const cacheKey = CacheUtil.getInternalKey('partner', 'clinic', String(id));
        const cached = await this.cacheManager.get(cacheKey);
        if (cached) return cached;

        const clinic = await this.prisma.clinic.findUnique({ where: { id } });
        if (clinic) await this.cacheManager.set(cacheKey, clinic, 300000);
        return clinic;
    }

    async createClinic(data: any) {
        const result = await this.prisma.clinic.create({ data });
        await this.indexPartner('clinics', result);
        await this.invalidateCache('clinics');
        return result;
    }

    async updateClinic(id: number, data: any) {
        const result = await this.prisma.clinic.update({ where: { id }, data });
        await this.indexPartner('clinics', result);
        await this.invalidateCache('clinics', id);
        return result;
    }

    async deleteClinic(id: number) {
        const result = await this.prisma.clinic.delete({ where: { id } });
        await this.deletePartnerIndex('clinics', id);
        await this.invalidateCache('clinics', id);
        return result;
    }

    // --- Hospitals ---
    async getHospitals(query: PaginationDto) {
        const cacheKey = CacheUtil.getInternalKey('partner', 'hospitals', query);
        const cached = await this.cacheManager.get(cacheKey);
        if (cached) return cached;

        const { skip, take, orderBy } = getPaginationOptions(query);

        if (query.search) {
            const result = await this.elasticsearchService.search({
                index: 'hospitals',
                from: skip,
                size: take,
                query: {
                    multi_match: {
                        query: query.search,
                        fields: ['name', 'address', 'website', 'description', 'departments'],
                    },
                },
            });

            const total = typeof result.hits.total === 'number' ? result.hits.total : result.hits.total?.value || 0;
            const data = result.hits.hits.map((hit) => hit._source);
            const response = createPaginatedResponse(data, total, query);
            await this.cacheManager.set(cacheKey, response, 300000);
            return response;
        }

        const where = buildSearchQuery(query.search, 'name', 'address', 'website');

        const [data, total] = await Promise.all([
            this.prisma.hospital.findMany({ where, skip, take, orderBy }),
            this.prisma.hospital.count({ where }),
        ]);

        const response = createPaginatedResponse(data, total, query);
        await this.cacheManager.set(cacheKey, response, 300000);
        return response;
    }

    async getHospital(id: number) {
        const cacheKey = CacheUtil.getInternalKey('partner', 'hospital', String(id));
        const cached = await this.cacheManager.get(cacheKey);
        if (cached) return cached;

        const hospital = await this.prisma.hospital.findUnique({ where: { id } });
        if (hospital) await this.cacheManager.set(cacheKey, hospital, 300000);
        return hospital;
    }

    async createHospital(data: any) {
        const result = await this.prisma.hospital.create({ data });
        await this.indexPartner('hospitals', result);
        await this.invalidateCache('hospitals');
        return result;
    }

    async updateHospital(id: number, data: any) {
        const result = await this.prisma.hospital.update({ where: { id }, data });
        await this.indexPartner('hospitals', result);
        await this.invalidateCache('hospitals', id);
        return result;
    }

    async deleteHospital(id: number) {
        const result = await this.prisma.hospital.delete({ where: { id } });
        await this.deletePartnerIndex('hospitals', id);
        await this.invalidateCache('hospitals', id);
        return result;
    }

    // --- Pharmacies ---
    async getPharmacies(query: PaginationDto) {
        const { skip, take, orderBy } = getPaginationOptions(query);

        if (query.search) {
            const result = await this.elasticsearchService.search({
                index: 'pharmacies',
                from: skip,
                size: take,
                query: {
                    multi_match: {
                        query: query.search,
                        fields: ['name', 'address', 'email', 'outletOwner', 'description'],
                    },
                },
            });

            const total = typeof result.hits.total === 'number' ? result.hits.total : result.hits.total?.value || 0;
            const data = result.hits.hits.map((hit) => hit._source);
            return createPaginatedResponse(data, total, query);
        }

        const where = buildSearchQuery(query.search, 'name', 'address', 'email', 'outletOwner');

        const [data, total] = await Promise.all([
            this.prisma.pharmacy.findMany({ where, skip, take, orderBy }),
            this.prisma.pharmacy.count({ where }),
        ]);

        return createPaginatedResponse(data, total, query);
    }

    async getPharmacy(id: number) {
        return this.prisma.pharmacy.findUnique({ where: { id } });
    }

    async createPharmacy(data: any) {
        const result = await this.prisma.pharmacy.create({ data });
        await this.indexPartner('pharmacies', result);
        return result;
    }

    async updatePharmacy(id: number, data: any) {
        const result = await this.prisma.pharmacy.update({ where: { id }, data });
        await this.indexPartner('pharmacies', result);
        return result;
    }

    async deletePharmacy(id: number) {
        const result = await this.prisma.pharmacy.delete({ where: { id } });
        await this.deletePartnerIndex('pharmacies', id);
        return result;
    }

    // --- Pharmacists ---
    async getPharmacists(query: PaginationDto) {
        const { skip, take, orderBy } = getPaginationOptions(query);
        const where = buildSearchQuery(query.search, 'fullName', 'phoneNumber', 'address', 'specialistly');

        const [data, total] = await Promise.all([
            this.prisma.pharmacist.findMany({ where, skip, take, orderBy }),
            this.prisma.pharmacist.count({ where }),
        ]);

        return createPaginatedResponse(data, total, query);
    }

    async getPharmacist(id: number) {
        return this.prisma.pharmacist.findUnique({ where: { id } });
    }

    async createPharmacist(data: any) {
        return this.prisma.pharmacist.create({ data });
    }

    async updatePharmacist(id: number, data: any) {
        return this.prisma.pharmacist.update({ where: { id }, data });
    }

    async deletePharmacist(id: number) {
        return this.prisma.pharmacist.delete({ where: { id } });
    }

    // --- Patients ---
    async getPatients(query: PaginationDto) {
        const { skip, take, orderBy } = getPaginationOptions(query);
        const where = buildSearchQuery(query.search, 'name', 'phone', 'email');

        const [data, total] = await Promise.all([
            this.prisma.patient.findMany({ where, skip, take, orderBy }),
            this.prisma.patient.count({ where }),
        ]);

        return createPaginatedResponse(data, total, query);
    }

    async getPatient(id: number) {
        return this.prisma.patient.findUnique({ where: { id } });
    }

    async createPatient(data: any) {
        return this.prisma.patient.create({ data });
    }

    async updatePatient(id: number, data: any) {
        return this.prisma.patient.update({ where: { id }, data });
    }

    async deletePatient(id: number) {
        return this.prisma.patient.delete({ where: { id } });
    }

    // --- Pending Partners (Cross-entity) ---
    async getPendingPartners() {
        const [doctors, clinics, hospitals, pharmacies, pharmacists] = await Promise.all([
            this.prisma.doctor.findMany({ where: { status: 'pending' } }),
            this.prisma.clinic.findMany({ where: { status: 'pending' } }),
            this.prisma.hospital.findMany({ where: { status: 'pending' } }),
            this.prisma.pharmacy.findMany({ where: { status: 'pending' } }),
            this.prisma.pharmacist.findMany({ where: { status: 'pending' } }),
        ]);

        return [
            ...doctors.map((d: any) => ({ ...d, type: 'doctor' })),
            ...clinics.map((c: any) => ({ ...c, type: 'clinic' })),
            ...hospitals.map((h: any) => ({ ...h, type: 'hospital' })),
            ...pharmacies.map((p: any) => ({ ...p, type: 'pharmacy' })),
            ...pharmacists.map((ph: any) => ({ ...ph, type: 'pharmacist' })),
        ].sort((a: any, b: any) => b.createdAt.getTime() - a.createdAt.getTime());
    }

    // --- Search ---
    async searchDiseases(query: { search?: string; page?: number; limit?: number }) {
        const page = parseInt(String(query.page || '1'));
        const limit = parseInt(String(query.limit || '20'));
        const skip = (page - 1) * limit;
        const search = query.search || '';

        const where = search ? {
            OR: [
                { name: { contains: search, mode: 'insensitive' as const } },
                { otherName: { contains: search, mode: 'insensitive' as const } },
                { description: { contains: search, mode: 'insensitive' as const } },
                { category: { contains: search, mode: 'insensitive' as const } }
            ]
        } : {};

        const [data, total] = await Promise.all([
            this.prisma.disease.findMany({
                where,
                skip,
                take: limit,
                orderBy: { name: 'asc' }
            }),
            this.prisma.disease.count({ where })
        ]);

        return {
            data,
            meta: { total, page, lastPage: Math.ceil(total / limit), limit }
        };
    }

    async searchMedicines(query: { search?: string; page?: number; limit?: number }) {
        const page = parseInt(String(query.page || '1'));
        const limit = parseInt(String(query.limit || '20'));
        const skip = (page - 1) * limit;
        const search = query.search || '';

        const where = search ? {
            OR: [
                { name: { contains: search, mode: 'insensitive' as const } },
                { otherName: { contains: search, mode: 'insensitive' as const } },
                { genericName: { contains: search, mode: 'insensitive' as const } },
                { category: { contains: search, mode: 'insensitive' as const } }
            ]
        } : {};

        const [data, total] = await Promise.all([
            this.prisma.medicine.findMany({
                where,
                skip,
                take: limit,
                orderBy: { name: 'asc' }
            }),
            this.prisma.medicine.count({ where })
        ]);

        return {
            data,
            meta: { total, page, lastPage: Math.ceil(total / limit), limit }
        };
    }

    private async invalidateCache(type: string, id?: number) {
        try {
            const store = (this.cacheManager as any)?.store;
            
            // 1. Delete specific entity key directly (always works)
            if (id) {
                const resource = type === 'doctors' ? 'doctor' : 
                                 type === 'clinics' ? 'clinic' :
                                 type === 'hospitals' ? 'hospital' :
                                 type === 'pharmacies' ? 'pharmacy' :
                                 type === 'pharmacists' ? 'pharmacist' : type;
                                 
                const singleKey = `partner:v1:${resource}:${id}`;
                console.log(`[Cache] Directly deleting key: ${singleKey}`);
                await this.cacheManager.del(singleKey);
            }

            // 2. Try to delete pattern/multiple keys if store supports it
            if (store && typeof store.keys === 'function') {
                const keys = await store.keys() as string[];
                if (keys && Array.isArray(keys)) {
                    const pattern = `partner:v1:${type}`;
                    const toDelete = keys.filter((key: string) => key.startsWith(pattern));
                    console.log(`[Cache] Pattern invalidating ${toDelete.length} keys for ${type}.`);
                    await Promise.all(toDelete.map((key: string) => this.cacheManager.del(key)));
                }
            } else {
                console.log('[Cache] Store does not support keys() - plural cache might persist until TTL');
            }
        } catch (error) {
            console.error('[Cache] Error invalidating cache:', error);
        }
    }

    // --- Staff ---
    async getStaffList(query: PaginationDto) {
        const { skip, take, orderBy } = getPaginationOptions(query);
        const where = buildSearchQuery(query.search, 'name', 'role', 'department', 'phone');
        const [data, total] = await Promise.all([
            this.prisma.staff.findMany({ where, skip, take, orderBy }),
            this.prisma.staff.count({ where }),
        ]);
        return createPaginatedResponse(data, total, query);
    }
    async getStaff(id: number) {
        return this.prisma.staff.findUnique({ where: { id } });
    }
    async createStaff(data: any) {
        return this.prisma.staff.create({ data });
    }
    async updateStaff(id: number, data: any) {
        return this.prisma.staff.update({ where: { id }, data });
    }
    async deleteStaff(id: number) {
        return this.prisma.staff.delete({ where: { id } });
    }

    // --- Departments ---
    async getDepartments(query: PaginationDto) {
        const { skip, take, orderBy } = getPaginationOptions(query);
        const where = buildSearchQuery(query.search, 'name', 'head');
        const [data, total] = await Promise.all([
            this.prisma.department.findMany({ where, skip, take, orderBy }),
            this.prisma.department.count({ where }),
        ]);
        return createPaginatedResponse(data, total, query);
    }
    async getDepartment(id: number) {
        return this.prisma.department.findUnique({ where: { id } });
    }
    async createDepartment(data: any) {
        return this.prisma.department.create({ data });
    }
    async updateDepartment(id: number, data: any) {
        return this.prisma.department.update({ where: { id }, data });
    }
    async deleteDepartment(id: number) {
        return this.prisma.department.delete({ where: { id } });
    }

    // --- ServiceItems ---
    async getServiceItems(query: PaginationDto) {
        const { skip, take, orderBy } = getPaginationOptions(query);
        const where = buildSearchQuery(query.search, 'name', 'category');
        const [data, total] = await Promise.all([
            this.prisma.serviceItem.findMany({ where, skip, take, orderBy }),
            this.prisma.serviceItem.count({ where }),
        ]);
        return createPaginatedResponse(data, total, query);
    }
    async getServiceItem(id: number) {
        return this.prisma.serviceItem.findUnique({ where: { id } });
    }
    async createServiceItem(data: any) {
        return this.prisma.serviceItem.create({ data });
    }
    async updateServiceItem(id: number, data: any) {
        return this.prisma.serviceItem.update({ where: { id }, data });
    }
    async deleteServiceItem(id: number) {
        return this.prisma.serviceItem.delete({ where: { id } });
    }

    // --- VN Administrative 2025 (Provinces & Wards) ---
    async getProvinces() {
        return this.prisma.province.findMany({
            orderBy: { name: 'asc' }
        });
    }

    async getProvince(code: string) {
        return this.prisma.province.findUnique({
            where: { code }
        });
    }

    async getWardsByProvince(provinceCode: string) {
        return this.prisma.ward.findMany({
            where: { provinceCode },
            orderBy: { name: 'asc' }
        });
    }

    async getWard(code: string) {
        return this.prisma.ward.findUnique({
            where: { code }
        });
    }
}
