export interface Booking {
    id: string; // Helper for frontend
    Name: string;
    Phone: string;
    Email?: string;
    Address?: string;
    DateOfBirthday: string; // datetime
    Sex: string;
    AppointmentDate: string; // datetime
    DateCreate: string; // datetime
    UserId?: string; // uniqueidentifier
    Status: 'pending' | 'confirmed' | 'completed' | 'cancelled' | string;
    TreatmentInfo?: string;
    TreatmentPlaceBooking: string; // uniqueidentifier - Place/Facility ID
    Type: 'online' | 'offline' | string;
    Note?: string;
    ServiceId: number;
    DoctorId?: string; // uniqueidentifier
    NoExpected: number;
}

// Helper to format status for display
export function getBookingStatusText(status: string): string {
    const map: Record<string, string> = {
        'pending': 'Chờ xác nhận',
        'confirmed': 'Đã xác nhận',
        'completed': 'Hoàn thành',
        'cancelled': 'Đã hủy'
    };
    return map[status] || status;
}

export function getBookingStatusColor(status: string): string {
    const map: Record<string, string> = {
        'pending': 'bg-yellow-100 text-yellow-700',
        'confirmed': 'bg-blue-100 text-blue-700',
        'completed': 'bg-green-100 text-green-700',
        'cancelled': 'bg-red-100 text-red-700'
    };
    return map[status] || 'bg-gray-100 text-gray-700';
}
