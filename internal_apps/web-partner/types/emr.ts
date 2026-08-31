export interface MedicalRecord {
    id: string;
    patientId: string;
    patientName: string;
    visitDate: string;
    reason: string; // Lý do khám
    history: string; // Tiền sử
    symptoms: string; // Triệu chứng
    diagnosis: string; // Chẩn đoán
    treatment: string; // Hướng điều trị
    doctorName: string;
    attachments: string[]; // File đình kèm
}

export const MOCK_RECORDS: MedicalRecord[] = [
    {
        id: 'EMR-001',
        patientId: 'P001',
        patientName: 'Nguyễn Văn A',
        visitDate: '2023-11-15',
        reason: 'Đau đầu kéo dài',
        history: 'Tăng huyết áp 5 năm',
        symptoms: 'Đau vùng thái dương, chóng mặt',
        diagnosis: 'Tăng huyết áp độ 2 / Rối loạn tiền đình',
        treatment: 'Kê đơn thuốc hạ áp, nghỉ ngơi',
        doctorName: 'BS. Lê Văn X',
        attachments: []
    },
    {
        id: 'EMR-002',
        patientId: 'P002',
        patientName: 'Trần Thị B',
        visitDate: '2023-12-10',
        reason: 'Ho, sốt cao',
        history: 'Không có',
        symptoms: 'Sốt 39 độ, ho có đờm, đau họng',
        diagnosis: 'Viêm phế quản cấp',
        treatment: 'Kháng sinh, hạ sốt, long đờm',
        doctorName: 'BS. Phạm Thị Y',
        attachments: []
    }
];
