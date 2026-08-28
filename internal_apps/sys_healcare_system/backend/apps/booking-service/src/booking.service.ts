import { Injectable, OnModuleInit, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PrismaService } from './prisma';
import { PaginationDto, getPaginationOptions, createPaginatedResponse, buildSearchQuery } from '@app/common';
import {
    assertAppointmentInput,
    assertAppointmentTransition,
    assertConsultationUpdateAllowed,
    assertConsultationInput,
    assertLabTestInput,
    assertPharmacyOrderInput,
    assertPrescriptionInput,
    assertRefundInput,
    normalizeVietnamesePhone,
    sanitizeAppointmentData,
} from './booking.rules';

@Injectable()
export class BookingService implements OnModuleInit {
    constructor(
        private readonly prisma: PrismaService,
        @Inject('GAMIFICATION_SERVICE') private gamificationClient: ClientProxy,
        @Inject('SURVEY_SERVICE') private surveyClient: ClientProxy,
    ) { }

    async onModuleInit() {
        await this.gamificationClient.connect();
        await this.surveyClient.connect();
        if (process.env.SEED_DEMO_DATA === 'true') {
            await this.seedData();
        }
    }

    private async seedData() {
        const appointmentCount = await this.prisma.appointment.count();
        if (appointmentCount === 0) {
            await this.prisma.appointment.createMany({
                data: [
                    {
                        patientName: 'Nguyễn Văn A',
                        patientPhone: '0901234567',
                        email: 'nguyenvana@example.com',
                        address: '123 Nguyễn Văn Linh, Q7, TP.HCM',
                        dob: '1990-01-01T00:00:00Z',
                        sex: 'Nam',
                        appointmentDate: new Date('2025-12-25T09:00:00Z'),
                        status: 'pending',
                        treatmentPlaceBooking: 'place-01',
                        type: 'offline',
                        serviceId: 101,
                        noExpected: 1,
                        note: 'Đau đầu, chóng mặt'
                    },
                    {
                        patientName: 'Trần Thị B',
                        patientPhone: '0987654321',
                        email: 'tranthib@example.com',
                        address: '456 Lê Văn Việt, Q9, TP.HCM',
                        dob: '1995-05-15T00:00:00Z',
                        sex: 'Nữ',
                        appointmentDate: new Date('2025-12-26T14:30:00Z'),
                        status: 'confirmed',
                        treatmentPlaceBooking: 'place-01',
                        type: 'online',
                        serviceId: 102,
                        doctorId: 'doc-01',
                        noExpected: 1,
                        note: 'Tái khám tim mạch'
                    },
                    {
                        patientName: 'Lê Văn C',
                        patientPhone: '0912345678',
                        address: '789 Võ Văn Ngân, Thủ Đức',
                        dob: '1988-10-20T00:00:00Z',
                        sex: 'Nam',
                        appointmentDate: new Date('2025-12-27T10:00:00Z'),
                        status: 'completed',
                        treatmentPlaceBooking: 'place-02',
                        type: 'offline',
                        serviceId: 103,
                        noExpected: 2,
                        treatmentInfo: 'Đã kê đơn thuốc'
                    }
                ]
            });
        }

        const prescriptionCount = await this.prisma.prescription.count();
        if (prescriptionCount === 0) {
            await this.prisma.prescription.createMany({
                data: [
                    {
                        code: 'RX-2024-1234',
                        patientName: 'Nguyễn Thanh Tùng',
                        patientPhone: '0901234567',
                        diagnosis: 'Viêm họng cấp',
                        doctorName: 'BS. Lê Văn Minh',
                        hospitalName: 'BV Đa khoa Tâm Anh',
                        status: 'new',
                        medicines: [
                            { id: 'm1', medicineName: 'Augmentin 1g', quantity: 14, unit: 'Viên', usage: 'Sáng 1, Chiều 1 (sau ăn)' },
                            { id: 'm2', medicineName: 'Panadol Extra', quantity: 10, unit: 'Viên', usage: 'Uống khi sốt > 38.5 độ' },
                            { id: 'm3', medicineName: 'Alpha Choay', quantity: 20, unit: 'Viên', usage: 'Ngậm dưới lưỡi, 2 viên/lần x 2 lần/ngày' }
                        ]
                    },
                    {
                        code: 'RX-2024-1235',
                        patientName: 'Trần Thị Mai',
                        patientPhone: '0987654321',
                        diagnosis: 'Rối loạn tiền đình',
                        doctorName: 'BS. Phạm Thu Hường',
                        hospitalName: 'Phòng khám Đa khoa Quốc tế',
                        status: 'dispensed',
                        dispensedDate: new Date('2024-12-19T14:30:00Z'),
                        pharmacistName: 'DS. Nguyễn Thị B',
                        medicines: [
                            { id: 'm4', medicineName: 'Tanganil 500mg', quantity: 30, unit: 'Viên', usage: 'Sáng 1, Chiều 1' },
                            { id: 'm5', medicineName: 'Ginkgo Biloba', quantity: 60, unit: 'Viên', usage: 'Sáng 1, trưa 1' }
                        ]
                    }
                ]
            });
        }

        const pharmacyOrderCount = await this.prisma.pharmacyOrder.count();
        if (pharmacyOrderCount === 0) {
            await this.prisma.pharmacyOrder.createMany({
                data: [
                    { code: 'DH-00128', customerId: 'c1', customerName: 'Nguyễn Văn B', customerPhone: '0901234567', pharmacy: 'Long Châu', date: '16/04/2026', totalAmount: 450000, status: 'processing', itemsCount: 3, type: 'Thuốc' },
                    { code: 'DH-00127', customerId: 'c2', customerName: 'Trần Thị C', customerPhone: '0987654321', pharmacy: 'Pharmacity', date: '15/04/2026', totalAmount: 120000, status: 'completed', itemsCount: 1, type: 'Xét nghiệm' },
                    { code: 'DH-00126', customerId: 'c3', customerName: 'Lê Văn D', customerPhone: '0912345678', pharmacy: 'An Khang', date: '14/04/2026', totalAmount: 850000, status: 'pending', itemsCount: 5, type: 'Thiết bị' },
                    { code: 'DH-00125', customerId: 'c4', customerName: 'Phạm Minh E', customerPhone: '0905555555', pharmacy: 'Minh Châu', date: '13/04/2026', totalAmount: 230000, status: 'cancelled', itemsCount: 2, type: 'Thuốc' },
                ]
            });
        }

        const consultationCount = await this.prisma.consultation.count();
        if (consultationCount === 0) {
            await this.prisma.consultation.createMany({
                data: [
                    { patientId: '2104140005', patientName: 'MGT VA DOITUONGUD', patientGender: 'F', patientAge: 30, type: 'Thu phí', line: 'Đúng tuyến', status: 'waiting' },
                    { patientId: '2104140008', patientName: 'TESTHU DVKY KBENH', patientGender: 'M', patientAge: 30, type: 'Nhân BHYT', line: 'Đúng tuyến', status: 'waiting' },
                    { patientId: '2104140003', patientName: 'THUỘC', patientGender: 'M', patientAge: 30, type: 'BHYT', line: 'Đúng tuyến', status: 'examining' },
                    { patientId: '2104140004', patientName: 'TEST MIEM GIAM', patientGender: 'F', patientAge: 34, type: 'Thu phí', line: 'Trái tuyến', status: 'waiting' },
                    { patientId: '2104140006', patientName: 'LÊ CHÁNH', patientGender: 'M', patientAge: 34, type: 'Thu phí', line: 'Đúng tuyến', status: 'waiting' },
                ]
            });
        }
    }

    // --- Appointments ---

    async getAppointments(query: PaginationDto) {
        const { skip, take, orderBy } = getPaginationOptions(query);
        const where = buildSearchQuery(query.search, 'patientName', 'doctorName', 'service', 'note');

        const [data, total] = await Promise.all([
            this.prisma.appointment.findMany({
                where,
                skip,
                take,
                orderBy: orderBy || { createdAt: 'desc' }
            }),
            this.prisma.appointment.count({ where }),
        ]);

        return createPaginatedResponse(data, total, query);
    }

    async getAppointment(id: number) {
        return this.prisma.appointment.findUnique({ where: { id } });
    }

    async createAppointment(data: Record<string, unknown>) {
        const sanitized = sanitizeAppointmentData(data);
        assertAppointmentInput(sanitized, { requireSlot: true });
        const normalizedData: Record<string, unknown> = {
            ...sanitized,
            patientPhone: normalizeVietnamesePhone(sanitized.patientPhone),
            appointmentDate: new Date(String(sanitized.appointmentDate)),
            status: sanitized.status ?? 'pending',
        };
        if (!normalizedData.doctorId) throw new Error('doctorId is required for a bookable appointment');
        const existing = await this.prisma.appointment.findFirst({
            where: {
                doctorId: String(normalizedData.doctorId),
                appointmentDate: normalizedData.appointmentDate as Date,
                status: { notIn: ['cancelled', 'no_show'] },
            },
        });
        if (existing) throw new Error('Practitioner already has an appointment at this time');
        try {
            return await this.prisma.appointment.create({ data: normalizedData as any });
        } catch (error) {
            if (this.isUniqueViolation(error)) throw new Error('Practitioner already has an appointment at this time');
            throw error;
        }
    }

    async updateAppointment(id: number, data: Record<string, unknown>) {
        const current = await this.prisma.appointment.findUnique({ where: { id } });
        if (!current) throw new Error('Appointment not found');
        const sanitized = sanitizeAppointmentData(data);
        assertAppointmentInput({ ...current, ...sanitized });
        if (sanitized.status !== undefined) assertAppointmentTransition(current.status, String(sanitized.status));
        const updateData = {
            ...sanitized,
            ...(sanitized.patientPhone ? { patientPhone: normalizeVietnamesePhone(sanitized.patientPhone) } : {}),
            ...(sanitized.appointmentDate ? { appointmentDate: new Date(String(sanitized.appointmentDate)) } : {}),
        };
        try {
            const appointment = await this.prisma.appointment.update({ where: { id }, data: updateData as any });
            if (current.status !== 'completed' && appointment.status === 'completed') {
            const eventPayload = {
                userId: appointment.patientId, // Assuming patientId maps to userId
                appointmentId: appointment.id,
                doctorName: appointment.doctorName,
                // specialty: appointment.service, // Use service instead? Or just omit
                timestamp: new Date(),
            };
                this.gamificationClient.emit('booking_completed', eventPayload);
                this.surveyClient.emit('booking_completed', eventPayload);
            }
            return appointment;
        } catch (error) {
            if (this.isUniqueViolation(error)) throw new Error('Practitioner already has an appointment at this time');
            throw error;
        }
    }

    async deleteAppointment(id: number) {
        const current = await this.prisma.appointment.findUnique({ where: { id } });
        if (!current) throw new Error('Appointment not found');
        assertAppointmentTransition(current.status, 'cancelled');
        return this.prisma.appointment.update({ where: { id }, data: { status: 'cancelled' } });
    }

    // --- Lab Tests ---
    async getLabTests(query: PaginationDto) {
        const { skip, take, orderBy } = getPaginationOptions(query);
        const where = buildSearchQuery(query.search, 'testType', 'patientName', 'hospital', 'status');

        const [data, total] = await Promise.all([
            this.prisma.labTest.findMany({
                where,
                skip,
                take,
                orderBy: orderBy || { createdAt: 'desc' }
            }),
            this.prisma.labTest.count({ where }),
        ]);

        return createPaginatedResponse(data, total, query);
    }

    async getLabTest(id: number) {
        return this.prisma.labTest.findUnique({ where: { id } });
    }

    async createLabTest(data: Record<string, unknown>) {
        assertLabTestInput(data);
        return this.prisma.labTest.create({ data: data as any });
    }

    async updateLabTest(id: number, data: Record<string, unknown>) {
        const current = await this.prisma.labTest.findUnique({ where: { id } });
        if (!current) throw new Error('Lab test not found');
        assertLabTestInput({ ...current, ...data });
        if (current.status === 'completed' && Object.keys(data).some((key) => key !== 'status')) throw new Error('Completed lab test is immutable');
        return this.prisma.labTest.update({ where: { id }, data: data as any });
    }

    async deleteLabTest(id: number) {
        return this.prisma.labTest.delete({ where: { id } });
    }

    // --- Pharmacy Orders ---
    async getPharmacyOrders(query: PaginationDto) {
        const { skip, take, orderBy } = getPaginationOptions(query);
        const where = buildSearchQuery(query.search, 'code', 'customerName', 'pharmacy', 'status');

        const [data, total] = await Promise.all([
            this.prisma.pharmacyOrder.findMany({
                where,
                skip,
                take,
                orderBy: orderBy || { createdAt: 'desc' }
            }),
            this.prisma.pharmacyOrder.count({ where }),
        ]);

        return createPaginatedResponse(data, total, query);
    }

    async getPharmacyOrder(id: number) {
        return this.prisma.pharmacyOrder.findUnique({ where: { id } });
    }

    async createPharmacyOrder(data: Record<string, unknown>) {
        assertPharmacyOrderInput(data);
        return this.prisma.pharmacyOrder.create({ data: data as any });
    }

    async updatePharmacyOrder(id: number, data: Record<string, unknown>) {
        const current = await this.prisma.pharmacyOrder.findUnique({ where: { id } });
        if (!current) throw new Error('Pharmacy order not found');
        assertPharmacyOrderInput({ ...current, ...data });
        if (current.status === 'completed' && Object.keys(data).some((key) => key !== 'status')) throw new Error('Completed pharmacy order is immutable');
        return this.prisma.pharmacyOrder.update({ where: { id }, data: data as any });
    }

    async deletePharmacyOrder(id: number) {
        return this.prisma.pharmacyOrder.delete({ where: { id } });
    }

    // --- Refunds ---
    async getRefundRequests(query: PaginationDto) {
        const { skip, take, orderBy } = getPaginationOptions(query);
        const where = buildSearchQuery(query.search, 'reason', 'status', 'patientName');

        const [data, total] = await Promise.all([
            this.prisma.refundRequest.findMany({
                where,
                skip,
                take,
                orderBy: orderBy || { createdAt: 'desc' }
            }),
            this.prisma.refundRequest.count({ where }),
        ]);

        return createPaginatedResponse(data, total, query);
    }

    async getRefundRequest(id: number) {
        return this.prisma.refundRequest.findUnique({ where: { id } });
    }

    async createRefundRequest(data: Record<string, unknown>) {
        assertRefundInput(data);
        return this.prisma.refundRequest.create({ data: data as any });
    }

    async updateRefundRequest(id: number, data: Record<string, unknown>) {
        const current = await this.prisma.refundRequest.findUnique({ where: { id } });
        if (!current) throw new Error('Refund request not found');
        assertRefundInput({ ...current, ...data });
        if (current.status !== 'pending' && Object.keys(data).some((key) => key !== 'status')) throw new Error('Processed refund request is immutable');
        return this.prisma.refundRequest.update({ where: { id }, data: data as any });
    }

    async deleteRefundRequest(id: number) {
        return this.prisma.refundRequest.delete({ where: { id } });
    }

    // --- Prescriptions ---
    async getPrescriptions(query: PaginationDto) {
        const { skip, take, orderBy } = getPaginationOptions(query);
        const where = buildSearchQuery(query.search, 'code', 'patientName', 'patientPhone', 'diagnosis', 'doctorName', 'hospitalName', 'status');

        const [data, total] = await Promise.all([
            this.prisma.prescription.findMany({
                where,
                skip,
                take,
                orderBy: orderBy || { createdAt: 'desc' }
            }),
            this.prisma.prescription.count({ where }),
        ]);

        return createPaginatedResponse(data, total, query);
    }

    async getPrescription(id: number) {
        return this.prisma.prescription.findUnique({ where: { id } });
    }

    async createPrescription(data: Record<string, unknown>) {
        assertPrescriptionInput(data);
        return this.prisma.prescription.create({ data: data as any });
    }

    async updatePrescription(id: number, data: Record<string, unknown>) {
        const current = await this.prisma.prescription.findUnique({ where: { id } });
        if (!current) throw new Error('Prescription not found');
        assertPrescriptionInput({ ...current, ...data }, { existingStatus: current.status });
        return this.prisma.prescription.update({ where: { id }, data: data as any });
    }

    async deletePrescription(id: number) {
        return this.prisma.prescription.delete({ where: { id } });
    }

    // --- Consultations ---
    async getConsultations(query: PaginationDto) {
        const { skip, take, orderBy } = getPaginationOptions(query);
        const where = buildSearchQuery(query.search, 'patientName', 'patientId', 'status', 'type');

        const [data, total] = await Promise.all([
            this.prisma.consultation.findMany({
                where,
                skip,
                take,
                orderBy: orderBy || { createdAt: 'desc' }
            }),
            this.prisma.consultation.count({ where }),
        ]);

        return createPaginatedResponse(data, total, query);
    }

    async getConsultation(id: number) {
        return this.prisma.consultation.findUnique({ where: { id } });
    }

    async createConsultation(data: Record<string, unknown>) {
        assertConsultationInput(data);
        return this.prisma.consultation.create({ data: data as any });
    }

    async updateConsultation(id: number, data: Record<string, unknown>) {
        const current = await this.prisma.consultation.findUnique({ where: { id } });
        if (!current) throw new Error('Consultation not found');
        assertConsultationUpdateAllowed(current.status, data);
        return this.prisma.consultation.update({ where: { id }, data: data as any });
    }

    async deleteConsultation(id: number) {
        const current = await this.prisma.consultation.findUnique({ where: { id } });
        if (!current) throw new Error('Consultation not found');
        if (current.status === 'completed') throw new Error('Completed consultation is immutable');
        return this.prisma.consultation.update({ where: { id }, data: { status: 'absent' } });
    }

    private isUniqueViolation(error: unknown): boolean {
        return Boolean(error && typeof error === 'object' && (error as { code?: string }).code === 'P2002');
    }
}
