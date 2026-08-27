// Prescription Management Types

export interface Prescription {
    id: string;
    code: string; // Mã đơn thuốc
    patientId?: string;
    patientName: string;
    patientPhone?: string;
    patientDOB?: string;
    doctorId?: string;
    doctorName?: string;
    hospitalName?: string; // Nơi kê đơn
    diagnosis: string;
    createdDate: string;
    dispensedDate?: string;
    status: 'new' | 'dispensed' | 'cancelled';
    medicines: PrescriptionItem[];
    note?: string;
    pharmacistId?: string; // Dược sĩ bán thuốc
    pharmacistName?: string;
}

export interface PrescriptionItem {
    id: string;
    medicineName: string;
    quantity: number;
    unit: string;
    usage: string; // Cách dùng (Sáng 1, Chiều 1, sau ăn)
    note?: string;
}

// Helper functions
export function getPrescriptionStatusText(status: string): string {
    const map: Record<string, string> = {
        new: 'Đơn mới',
        dispensed: 'Đã cấp thuốc',
        cancelled: 'Đã hủy'
    };
    return map[status] || status;
}

export function getPrescriptionStatusColor(status: string): string {
    const map: Record<string, string> = {
        new: 'bg-blue-100 text-blue-700',
        dispensed: 'bg-green-100 text-green-700',
        cancelled: 'bg-red-100 text-red-700'
    };
    return map[status] || 'bg-gray-100 text-gray-700';
}
