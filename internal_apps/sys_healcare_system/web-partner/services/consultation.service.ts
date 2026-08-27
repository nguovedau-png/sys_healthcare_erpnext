import apiService from './api';

export interface VitalSigns {
    pulse?: number;
    bp?: string;
    temp?: number;
    spo2?: number;
}

export interface Consultation {
    id: number;
    patientId: string;
    patientName: string;
    patientGender?: string;
    patientAge?: number;
    type?: string;
    line?: string;
    reason?: string;
    history?: string;
    vitalSigns?: VitalSigns;
    clinicalNotes?: string;
    diagnosisCodes?: string[];
    status: string;
    createdAt: string;
    updatedAt: string;
}

class ConsultationService {
    private readonly baseUrl = '/bookings/consultations';

    async getConsultations(params?: any): Promise<Consultation[]> {
        const response = await apiService.get(this.baseUrl, params);
        return (response as any).data || response;
    }

    async getConsultation(id: number): Promise<Consultation> {
        const response = await apiService.get(`${this.baseUrl}/${id}`);
        return (response as any).data || response;
    }

    async createConsultation(data: Partial<Consultation>): Promise<Consultation> {
        const response = await apiService.post(this.baseUrl, data);
        return (response as any).data || response;
    }

    async updateConsultation(id: number, data: Partial<Consultation>): Promise<Consultation> {
        const response = await apiService.put(`${this.baseUrl}/${id}`, data);
        return (response as any).data || response;
    }

    async deleteConsultation(id: number): Promise<void> {
        await apiService.delete(`${this.baseUrl}/${id}`);
    }
}

export default new ConsultationService();
