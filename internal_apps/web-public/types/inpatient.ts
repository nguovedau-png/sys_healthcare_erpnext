export interface Bed {
    id: string;
    code: string; // Mã giường (B01, B02...)
    room: string; // Phòng (P301)
    department: string; // Khoa (Nội, Ngoại...)
    status: 'available' | 'occupied' | 'maintenance' | 'cleaning';
    patientId?: string; // Bệnh nhân đang nằm (nếu có)
    patientName?: string;
    admissionDate?: string;
}

export interface DailyRecord {
    id: string;
    admissionId: string;
    date: string;
    doctorName: string;
    note: string; // Diễn biến bệnh
    orders: string[]; // Y lệnh (Thuốc, XN...)
    vitals: {
        temp: number; // Nhiệt độ
        pulse: number; // Mạch
        bp: string; // Huyết áp
        sp02: number;
    };
}

export interface Admission {
    id: string;
    patientId: string;
    patientName: string;
    dob: string;
    gender: 'Nam' | 'Nữ';
    diagnosis: string; // Chẩn đoán vào viện
    admissionDate: string;
    dischargeDate?: string;
    department: string;
    bedId?: string;
    bedName?: string;
    status: 'active' | 'discharged' | 'transfer';
    doctorInCharge: string;
}

export const MOCK_BEDS: Bed[] = [
    { id: 'b1', code: 'G-01', room: 'P301', department: 'Khoa Nội', status: 'occupied', patientId: 'p1', patientName: 'Nguyễn Văn A', admissionDate: '2024-12-18' },
    { id: 'b2', code: 'G-02', room: 'P301', department: 'Khoa Nội', status: 'available' },
    { id: 'b3', code: 'G-03', room: 'P302', department: 'Khoa Ngoại', status: 'occupied', patientId: 'p2', patientName: 'Trần Thị B', admissionDate: '2024-12-19' },
    { id: 'b4', code: 'G-04', room: 'P302', department: 'Khoa Ngoại', status: 'maintenance' },
];

export const MOCK_ADMISSIONS: Admission[] = [
    {
        id: 'adm1', patientId: 'p1', patientName: 'Nguyễn Văn A', dob: '1990-01-01', gender: 'Nam',
        diagnosis: 'Viêm phổi cộng đồng', admissionDate: '2024-12-18', department: 'Khoa Nội',
        bedId: 'b1', bedName: 'G-01 - P301', status: 'active', doctorInCharge: 'BS. Lê Văn X'
    },
    {
        id: 'adm2', patientId: 'p2', patientName: 'Trần Thị B', dob: '1985-05-05', gender: 'Nữ',
        diagnosis: 'Hậu phẫu ruột thừa ngày 2', admissionDate: '2024-12-19', department: 'Khoa Ngoại',
        bedId: 'b3', bedName: 'G-03 - P302', status: 'active', doctorInCharge: 'BS. Phạm Thị Y'
    }
];
