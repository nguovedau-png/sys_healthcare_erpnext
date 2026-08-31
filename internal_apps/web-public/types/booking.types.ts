export interface Service {
    id: string;
    name: string;
    description: string;
    icon: string;
    category: string;
    price?: string;
}

export interface Provider {
    id: string;
    name: string;
    type: 'doctor' | 'hospital';
    specialty?: string;
    avatar?: string;
    rating: number;
    reviewCount: number;
    address: string;
    experience?: string;
    price?: string;
    availability: string;
}

export interface TimeSlot {
    id: string;
    time: string;
    available: boolean;
}

export interface PatientInfo {
    fullName: string;
    phone: string;
    email: string;
    dateOfBirth: string;
    gender: 'male' | 'female' | 'other';
    notes: string;
}

export interface BookingData {
    service?: Service;
    provider?: Provider;
    date?: Date;
    timeSlot?: TimeSlot;
    patientInfo?: PatientInfo;
}

export interface BookingResponse {
    success: boolean;
    bookingId?: string;
    message: string;
}
