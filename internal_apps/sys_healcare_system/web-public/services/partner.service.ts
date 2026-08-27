import apiService from './api';

export interface PaginationParams {
    page?: number;
    limit?: number;
    search?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
    data: T[];
    meta: {
        total: number;
        page: number;
        lastPage: number;
        limit: number;
    };
}


export interface Pharmacy {
    id: number;
    name: string;
    address: string;
    phone: string;
    email?: string;
    website?: string;
    description?: string;
    rating?: number;
    reviewCount?: number;
    isVerified?: boolean;
    thumbnail?: string;
    outletOwner?: string;
    gppNumber?: string;
    gppImage?: string;
    pointsCMEOnline?: number;
    memberRank?: string;
    status?: string;
    provinceCode?: string;
    districtCode?: string;
    wardCode?: string;
    streetName?: string;
    os?: string;
    token?: string;
    scName?: string;
    dynamicLink?: string;
    bannerLandingPage?: string;
    createdAt?: string;
}

export interface Pharmacist {
    id: number;
    fullName: string;
    phoneNumber: string;
    address: string;
    specialistly?: string;
    career?: string;
    provinceCode?: string;
    districtCode?: string;
    wardCode?: string;
    streetName?: string;
    os?: string;
    token?: string;
    scName?: string;
    pointsCMEOnline?: number;
    memberRank?: string;
    dynamicLink?: string;
    bannerLandingPage?: string;
    isVerified?: boolean;
    rating?: number;
    reviewCount?: number;
    status?: string;
    createdAt?: string;
}

export interface Doctor {
    id: number;
    name: string;
    specialty: string;
    hospital?: string;
    phone: string;
    email?: string;
    description?: string;
    rating?: number;
    isVerified?: boolean;
    thumbnail?: string;
    createdAt?: string;
}

export interface Hospital {
    id: number;
    name: string;
    address: string;
    phone: string;
    website?: string;
    description?: string;
    departments?: string[];
    beds?: number;
    rating?: number;
    isVerified?: boolean;
    thumbnail?: string;
    createdAt?: string;
}

export interface Clinic {
    id: number;
    name: string;
    address: string;
    phone: string;
    email?: string;
    description?: string;
    specialties?: string[];
    rating?: number;
    isVerified?: boolean;
    thumbnail?: string;
    createdAt?: string;
}

export interface Patient {
    id: number;
    name: string;
    phone: string;
    email?: string;
    visits: number;
    lastVisit?: string;
    status: string;
    createdAt?: string;
}

class PartnerService {
    private readonly baseUrl = '/partners';

    // Clinics
    async getClinics(params?: PaginationParams): Promise<PaginatedResponse<Clinic>> {
        return apiService.get(`${this.baseUrl}/clinics`, params);
    }

    async getClinic(id: number): Promise<Clinic> {
        return apiService.get(`${this.baseUrl}/clinics/${id}`);
    }

    async createClinic(data: Partial<Clinic>): Promise<Clinic> {
        return apiService.post(`${this.baseUrl}/clinics`, data);
    }

    async updateClinic(id: number, data: Partial<Clinic>): Promise<Clinic> {
        return apiService.put(`${this.baseUrl}/clinics/${id}`, data);
    }

    async deleteClinic(id: number): Promise<void> {
        await apiService.delete(`${this.baseUrl}/clinics/${id}`);
    }

    // Hospitals
    async getHospitals(params?: PaginationParams): Promise<PaginatedResponse<Hospital>> {
        return apiService.get(`${this.baseUrl}/hospitals`, params);
    }

    async getHospital(id: number): Promise<Hospital> {
        return apiService.get(`${this.baseUrl}/hospitals/${id}`);
    }

    async createHospital(data: Partial<Hospital>): Promise<Hospital> {
        return apiService.post(`${this.baseUrl}/hospitals`, data);
    }

    async updateHospital(id: number, data: Partial<Hospital>): Promise<Hospital> {
        return apiService.put(`${this.baseUrl}/hospitals/${id}`, data);
    }

    async deleteHospital(id: number): Promise<void> {
        await apiService.delete(`${this.baseUrl}/hospitals/${id}`);
    }

    // Pharmacies
    async getPharmacies(params?: PaginationParams): Promise<PaginatedResponse<Pharmacy>> {
        return apiService.get(`${this.baseUrl}/pharmacies`, params);
    }

    async getPharmacy(id: number): Promise<Pharmacy> {
        return apiService.get(`${this.baseUrl}/pharmacies/${id}`);
    }

    async createPharmacy(data: Partial<Pharmacy>): Promise<Pharmacy> {
        return apiService.post(`${this.baseUrl}/pharmacies`, data);
    }

    async updatePharmacy(id: number, data: Partial<Pharmacy>): Promise<Pharmacy> {
        return apiService.put(`${this.baseUrl}/pharmacies/${id}`, data);
    }

    async deletePharmacy(id: number): Promise<void> {
        await apiService.delete(`${this.baseUrl}/pharmacies/${id}`);
    }

    // --- Pharmacists ---
    async getPharmacists(params?: PaginationParams): Promise<PaginatedResponse<Pharmacist>> {
        return apiService.get(`${this.baseUrl}/pharmacists`, params);
    }

    async getPharmacist(id: number): Promise<Pharmacist> {
        return apiService.get(`${this.baseUrl}/pharmacists/${id}`);
    }

    async createPharmacist(data: Partial<Pharmacist>): Promise<Pharmacist> {
        return apiService.post(`${this.baseUrl}/pharmacists`, data);
    }

    async updatePharmacist(id: number, data: Partial<Pharmacist>): Promise<Pharmacist> {
        return apiService.put(`${this.baseUrl}/pharmacists/${id}`, data);
    }

    async deletePharmacist(id: number): Promise<void> {
        await apiService.delete(`${this.baseUrl}/pharmacists/${id}`);
    }

    // Doctors
    async getDoctors(params?: PaginationParams): Promise<PaginatedResponse<Doctor>> {
        return apiService.get(`${this.baseUrl}/doctors`, params);
    }

    async getDoctor(id: number): Promise<Doctor> {
        return apiService.get(`${this.baseUrl}/doctors/${id}`);
    }

    async createDoctor(data: Partial<Doctor>): Promise<Doctor> {
        return apiService.post(`${this.baseUrl}/doctors`, data);
    }

    async updateDoctor(id: number, data: Partial<Doctor>): Promise<Doctor> {
        return apiService.put(`${this.baseUrl}/doctors/${id}`, data);
    }

    async deleteDoctor(id: number): Promise<void> {
        await apiService.delete(`${this.baseUrl}/doctors/${id}`);
    }

    // Patients
    async getPatients(): Promise<PaginatedResponse<Patient>> {
        return apiService.get(`${this.baseUrl}/patients`);
    }

    async getPatient(id: number): Promise<Patient> {
        return apiService.get(`${this.baseUrl}/patients/${id}`);
    }

    async createPatient(data: Partial<Patient>): Promise<Patient> {
        return apiService.post(`${this.baseUrl}/patients`, data);
    }

    async updatePatient(id: number, data: Partial<Patient>): Promise<Patient> {
        return apiService.put(`${this.baseUrl}/patients/${id}`, data);
    }

    async deletePatient(id: number): Promise<void> {
        await apiService.delete(`${this.baseUrl}/patients/${id}`);
    }

    // Pending Partners
    async getPendingPartners(): Promise<any[]> {
        return apiService.get(`${this.baseUrl}/pending`);
    }
}

export default new PartnerService();
