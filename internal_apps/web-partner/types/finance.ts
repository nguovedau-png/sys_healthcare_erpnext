export interface BillingStats {
    totalRevenue: number; // Tổng doanh thu
    insuranceClaimed: number; // Đã quyết toán BHYT
    pendingPayment: number; // Chờ thanh toán
    outstandingDept: number; // Nợ chưa thu (Viện phí)
}

export interface Invoice {
    id: string;
    patientId: string;
    patientName: string;
    serviceType: 'Inpatient' | 'Outpatient' | 'Pharmacy' | 'Lab';
    amount: number;
    insuranceCovered: number; // BHYT chi trả
    patientPaid: number; // Bệnh nhân nộp
    status: 'paid' | 'pending' | 'partially-paid' | 'cancelled';
    date: string;
    items: InvoiceItem[];
}

export interface InvoiceItem {
    id: string;
    name: string; // Tên dịch vụ/thuốc
    quantity: number;
    unitPrice: number;
    total: number;
    isInsuranceSupported: boolean;
}

export interface InsuranceClaim {
    id: string;
    patientId: string;
    patientName: string;
    cardNo: string; // Số thẻ BHYT
    examDate: string;
    diagnosis: string; // Chẩn đoán ICD-10
    totalCost: number;
    insurancePay: number;
    patientPay: number;
    status: 'draft' | 'submitted' | 'approved' | 'rejected';
    gatewayStatus: string; // Trạng thái cổng BHYT (XML valid/invalid)
}

export const MOCK_INVOICES: Invoice[] = [
    {
        id: 'INV-001',
        patientId: 'P001',
        patientName: 'Nguyễn Văn A',
        serviceType: 'Outpatient',
        amount: 500000,
        insuranceCovered: 400000,
        patientPaid: 100000,
        status: 'paid',
        date: '2024-12-20T10:00:00Z',
        items: []
    },
    {
        id: 'INV-002',
        patientId: 'P002',
        patientName: 'Trần Thị B',
        serviceType: 'Inpatient',
        amount: 15000000,
        insuranceCovered: 12000000,
        patientPaid: 0,
        status: 'pending',
        date: '2024-12-19T14:30:00Z',
        items: []
    }
];
