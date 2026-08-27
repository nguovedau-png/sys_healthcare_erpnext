import apiService from './api';

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

export interface Clinic {
    id: number;
    name: string;
    address: string;
    phone: string;
    email?: string;
    website?: string;
    description?: string;
    rating?: number;
    specialties?: string[];
    isVerified?: boolean;
    thumbnail?: string;
    status?: string;
    openingHours?: any;
    createdAt?: string;
}

export interface Hospital {
    id: number;
    name: string;
    address: string;
    phone: string;
    email?: string;
    website?: string;
    description?: string;
    rating?: number;
    level?: string;
    beds?: number;
    isVerified?: boolean;
    thumbnail?: string;
    departments?: string[];
    status?: string;
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
    image?: string;
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
    async getClinics(params?: any): Promise<{ data: Clinic[], meta: any }> {
        return await apiService.get(`${this.baseUrl}/clinics`, { params });
    }

    async getClinic(id: number): Promise<Clinic> {
        return await apiService.get(`${this.baseUrl}/clinics/${id}`);
    }

    async createClinic(data: Partial<Clinic>): Promise<Clinic> {
        return await apiService.post(`${this.baseUrl}/clinics`, data);
    }

    async updateClinic(id: number, data: Partial<Clinic>): Promise<Clinic> {
        return await apiService.put(`${this.baseUrl}/clinics/${id}`, data);
    }

    async deleteClinic(id: number): Promise<void> {
        await apiService.delete(`${this.baseUrl}/clinics/${id}`);
    }

    // Hospitals
    async getHospitals(params?: any): Promise<{ data: Hospital[], meta: any }> {
        return await apiService.get(`${this.baseUrl}/hospitals`, { params });
    }

    async getHospital(id: number): Promise<Hospital> {
        return await apiService.get(`${this.baseUrl}/hospitals/${id}`);
    }

    async createHospital(data: Partial<Hospital>): Promise<Hospital> {
        return await apiService.post(`${this.baseUrl}/hospitals`, data);
    }

    async updateHospital(id: number, data: Partial<Hospital>): Promise<Hospital> {
        return await apiService.put(`${this.baseUrl}/hospitals/${id}`, data);
    }

    async deleteHospital(id: number): Promise<void> {
        await apiService.delete(`${this.baseUrl}/hospitals/${id}`);
    }

    // Pharmacies
    async getPharmacies(params?: any): Promise<{ data: Pharmacy[], meta: any }> {
        return await apiService.get(`${this.baseUrl}/pharmacies`, { params });
    }

    async getPharmacy(id: number): Promise<Pharmacy> {
        return await apiService.get(`${this.baseUrl}/pharmacies/${id}`);
    }

    async createPharmacy(data: Partial<Pharmacy>): Promise<Pharmacy> {
        return await apiService.post(`${this.baseUrl}/pharmacies`, data);
    }

    async updatePharmacy(id: number, data: Partial<Pharmacy>): Promise<Pharmacy> {
        return await apiService.put(`${this.baseUrl}/pharmacies/${id}`, data);
    }

    async deletePharmacy(id: number): Promise<void> {
        await apiService.delete(`${this.baseUrl}/pharmacies/${id}`);
    }

    // --- Pharmacists ---
    async getPharmacists(params?: any): Promise<{ data: Pharmacist[], meta: any }> {
        return await apiService.get(`${this.baseUrl}/pharmacists`, { params });
    }

    async getPharmacist(id: number): Promise<Pharmacist> {
        return await apiService.get(`${this.baseUrl}/pharmacists/${id}`);
    }

    async createPharmacist(data: Partial<Pharmacist>): Promise<Pharmacist> {
        return await apiService.post(`${this.baseUrl}/pharmacists`, data);
    }

    async updatePharmacist(id: number, data: Partial<Pharmacist>): Promise<Pharmacist> {
        return await apiService.put(`${this.baseUrl}/pharmacists/${id}`, data);
    }

    async deletePharmacist(id: number): Promise<void> {
        await apiService.delete(`${this.baseUrl}/pharmacists/${id}`);
    }

    // Doctors
    async getDoctors(params?: any): Promise<{ data: Doctor[], meta: any }> {
        return await apiService.get(`${this.baseUrl}/doctors`, { params });
    }

    async getDoctor(id: number): Promise<Doctor> {
        return await apiService.get(`${this.baseUrl}/doctors/${id}`);
    }

    async createDoctor(data: Partial<Doctor>): Promise<Doctor> {
        return await apiService.post(`${this.baseUrl}/doctors`, data);
    }

    async updateDoctor(id: number, data: Partial<Doctor>): Promise<Doctor> {
        return await apiService.put(`${this.baseUrl}/doctors/${id}`, data);
    }

    async deleteDoctor(id: number): Promise<void> {
        await apiService.delete(`${this.baseUrl}/doctors/${id}`);
    }

    // Patients
    async getPatients(params?: any): Promise<{ data: Patient[], meta: any }> {
        return await apiService.get(`${this.baseUrl}/patients`, { params });
    }

    async getPatient(id: number): Promise<Patient> {
        return await apiService.get(`${this.baseUrl}/patients/${id}`);
    }

    async createPatient(data: Partial<Patient>): Promise<Patient> {
        return await apiService.post(`${this.baseUrl}/patients`, data);
    }

    async updatePatient(id: number, data: Partial<Patient>): Promise<Patient> {
        return await apiService.put(`${this.baseUrl}/patients/${id}`, data);
    }

    async deletePatient(id: number): Promise<void> {
        await apiService.delete(`${this.baseUrl}/patients/${id}`);
    }

    // Pending Partners
    async getPendingPartners(): Promise<any[]> {
        return await apiService.get(`${this.baseUrl}/pending`);
    }
}

export default new PartnerService();
