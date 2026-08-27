export interface LabResult {
    id: string;
    patientId: string;
    patientName: string;
    testName: string; // Tên xét nghiệm (Huyết học, Sinh hóa...)
    orderDate: string;
    status: 'pending' | 'processing' | 'completed';
    results: {
        indicator: string; // Chỉ số (RBC, WBC...)
        value: string; // Giá trị
        unit: string; // Đơn vị
        reference: string; // Tham chiếu
        isAbnormal: boolean;
    }[];
    doctorName: string;
}

export interface ImagingOrder {
    id: string;
    patientId: string;
    patientName: string;
    modality: 'X-Ray' | 'CT' | 'MRI' | 'Ultrasound'; // Loại hình
    bodyPart: string; // Vị trí chụp
    orderDate: string;
    status: 'scheduled' | 'processing' | 'completed';
    imageUrl?: string; // Link đến ảnh DICOM (demo)
    report?: string; // Kết quả đọc phim
    radiologist?: string; // Bác sĩ CĐHA
}

export const MOCK_LAB_RESULTS: LabResult[] = [
    {
        id: 'LAB-001',
        patientId: 'P001',
        patientName: 'Nguyễn Văn A',
        testName: 'Công thức máu (CBC)',
        orderDate: '2024-12-20T09:00:00Z',
        status: 'completed',
        doctorName: 'BS. Trần Văn X',
        results: [
            { indicator: 'RBC', value: '5.2', unit: 'M/µL', reference: '4.5-5.5', isAbnormal: false },
            { indicator: 'WBC', value: '12.5', unit: 'K/µL', reference: '4.0-10.0', isAbnormal: true },
            { indicator: 'PLT', value: '250', unit: 'K/µL', reference: '150-450', isAbnormal: false },
        ]
    },
    {
        id: 'LAB-002',
        patientId: 'P002',
        patientName: 'Lê Thị B',
        testName: 'Sinh hóa máu',
        orderDate: '2024-12-20T10:15:00Z',
        status: 'processing',
        doctorName: 'BS. Lê Thị Y',
        results: []
    }
];

export const MOCK_IMAGING_ORDERS: ImagingOrder[] = [
    {
        id: 'IMG-001',
        patientId: 'P003',
        patientName: 'Hoàng Văn C',
        modality: 'X-Ray',
        bodyPart: 'Ngực thẳng (Chest PA)',
        orderDate: '2024-12-20T08:30:00Z',
        status: 'completed',
        radiologist: 'BS. Phạm Văn Z',
        imageUrl: '/styles/img/xray_demo.jpg', // Placeholder
        report: 'Hình ảnh viêm phổi thùy dưới phổi phải. Tim không to.'
    },
    {
        id: 'IMG-002',
        patientId: 'P001',
        patientName: 'Nguyễn Văn A',
        modality: 'CT',
        bodyPart: 'Sọ não',
        orderDate: '2024-12-20T09:30:00Z',
        status: 'scheduled',
        radiologist: 'BS. Phạm Văn Z'
    }
];
