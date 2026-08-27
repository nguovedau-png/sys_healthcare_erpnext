import { PrismaClient } from '../../../node_modules/@prisma/client-booking-service';

const prisma = new PrismaClient();

async function main() {
    console.log('Start seeding booking-service...');

    // Appointments
    const appointments = [
        {
            patientId: 'patient-1',
            patientName: 'Nguyễn Văn A',
            patientPhone: '0901234567',
            doctorId: '1',
            doctorName: 'BS. Nguyễn Văn An',
            date: '15/04/2026',
            time: '08:00',
            service: 'Khám tổng quát',
            status: 'confirmed',
        },
        {
            patientId: 'patient-2',
            patientName: 'Trần Thị B',
            patientPhone: '0907654321',
            doctorId: '2',
            doctorName: 'BS. Lê Thị Bình',
            date: '16/04/2026',
            time: '14:30',
            service: 'Tư vấn tim mạch',
            status: 'pending',
        },
        {
            patientId: 'patient-1',
            patientName: 'Nguyễn Văn A',
            patientPhone: '0901234567',
            doctorId: '5',
            doctorName: 'BS. Phạm Văn Em',
            date: '20/04/2026',
            time: '09:00',
            service: 'Khám nội khoa',
            status: 'confirmed',
        }
    ];

    for (const app of appointments) {
        await prisma.appointment.create({ data: app });
    }
    console.log('Seeded Appointments');

    // Lab Tests
    const labTests = [
        {
            orderCode: 'LAB-2026-001',
            patientId: 'patient-1',
            patientName: 'Nguyễn Văn A',
            patientPhone: '0901234567',
            testType: 'Xét nghiệm máu tổng quát',
            hospital: 'Bệnh viện Chợ Rẫy',
            fee: 550000,
            testDate: '12/04/2026',
            status: 'completed',
        },
        {
            orderCode: 'LAB-2026-002',
            patientId: 'patient-3',
            patientName: 'Lê Văn C',
            patientPhone: '0912334455',
            testType: 'Chụp X-Quang phổi',
            hospital: 'Bệnh viện Bạch Mai',
            fee: 300000,
            testDate: '14/04/2026',
            status: 'pending',
        }
    ];

    for (const test of labTests) {
        await prisma.labTest.upsert({
            where: { orderCode: test.orderCode },
            update: {},
            create: test,
        });
    }
    console.log('Seeded Lab Tests');

    // Pharmacy Orders
    const pharmacyOrders = [
        {
            code: 'PHAR-001',
            customerId: 'user-123',
            customerName: 'Nguyễn Văn A',
            customerPhone: '0901234567',
            pharmacy: 'Nhà thuốc Long Châu 01',
            itemsCount: 5,
            totalAmount: 1250000,
            date: '10/04/2026',
            status: 'completed',
        },
        {
            code: 'PHAR-002',
            customerId: 'user-456',
            customerName: 'Trần Thị B',
            customerPhone: '0907654321',
            pharmacy: 'Nhà thuốc An Khang 05',
            itemsCount: 2,
            totalAmount: 450000,
            date: '11/04/2026',
            status: 'shipping',
        }
    ];

    for (const order of pharmacyOrders) {
        await prisma.pharmacyOrder.upsert({
            where: { code: order.code },
            update: {},
            create: order,
        });
    }
    console.log('Seeded Pharmacy Orders');

    // Refund Requests
    const refundRequests = [
        {
            orderCode: 'PHAR-003',
            customerId: 'user-789',
            customerName: 'Lê Văn C',
            originalOrder: 'PHAR-003',
            amount: 200000,
            reason: 'Sản phẩm hết hạn sử dụng',
            requestDate: '12/04/2026',
            status: 'pending',
        }
    ];

    for (const req of refundRequests) {
        await prisma.refundRequest.upsert({
            where: { orderCode: req.orderCode },
            update: {},
            create: req,
        });
    }
    console.log('Seeded Refund Requests');

    console.log('Seeding finished.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
