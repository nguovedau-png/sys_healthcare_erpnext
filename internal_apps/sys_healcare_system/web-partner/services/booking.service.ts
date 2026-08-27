import apiService from './api';

export interface Appointment {
    id: number;
    patientId: string;
    patientName: string;
    patientPhone: string;
    doctorId: string;
    doctorName: string;
    date: string;
    time: string;
    service: string;
    status: string;
    createdAt: string;
}

export interface LabTest {
    id: number;
    orderCode: string;
    patientId: string;
    patientName: string;
    patientPhone: string;
    testType: string;
    hospital: string;
    fee: number;
    testDate: string;
    status: string;
    createdAt: string;
}

export interface PharmacyOrder {
    id: number;
    code: string;
    customerId: string;
    customerName: string;
    customerPhone: string;
    pharmacy: string;
    itemsCount: number;
    totalAmount: number;
    date: string;
    status: string;
    createdAt: string;
}

export interface RefundRequest {
    id: number;
    orderCode: string;
    customerId: string;
    customerName: string;
    originalOrder: string;
    amount: number;
    reason: string;
    requestDate: string;
    status: string;
    createdAt: string;
}

class BookingService {
    private readonly baseUrl = '/bookings';

    // Appointments
    async getAppointments(): Promise<Appointment[]> {
        const response = await apiService.get(`${this.baseUrl}/appointments`);
        return (response as any).data || response;
    }

    async getAppointment(id: number): Promise<Appointment> {
        const response = await apiService.get(`${this.baseUrl}/appointments/${id}`);
        return (response as any).data || response;
    }

    async createAppointment(data: Partial<Appointment>): Promise<Appointment> {
        const response = await apiService.post(`${this.baseUrl}/appointments`, data);
        return (response as any).data || response;
    }

    async updateAppointment(id: number, data: Partial<Appointment>): Promise<Appointment> {
        const response = await apiService.put(`${this.baseUrl}/appointments/${id}`, data);
        return (response as any).data || response;
    }

    async deleteAppointment(id: number): Promise<void> {
        await apiService.delete(`${this.baseUrl}/appointments/${id}`);
    }

    // Lab Tests
    async getLabTests(): Promise<LabTest[]> {
        const response = await apiService.get(`${this.baseUrl}/lab-tests`);
        return (response as any).data || response;
    }

    async createLabTest(data: Partial<LabTest>): Promise<LabTest> {
        const response = await apiService.post(`${this.baseUrl}/lab-tests`, data);
        return (response as any).data || response;
    }

    async updateLabTest(id: number, data: Partial<LabTest>): Promise<LabTest> {
        const response = await apiService.put(`${this.baseUrl}/lab-tests/${id}`, data);
        return (response as any).data || response;
    }

    async deleteLabTest(id: number): Promise<void> {
        await apiService.delete(`${this.baseUrl}/lab-tests/${id}`);
    }

    // Pharmacy Orders
    async getPharmacyOrders(): Promise<PharmacyOrder[]> {
        const response = await apiService.get(`${this.baseUrl}/pharmacy-orders`);
        return (response as any).data || response;
    }

    async updatePharmacyOrder(id: number, data: Partial<PharmacyOrder>): Promise<PharmacyOrder> {
        const response = await apiService.put(`${this.baseUrl}/pharmacy-orders/${id}`, data);
        return (response as any).data || response;
    }

    async deletePharmacyOrder(id: number): Promise<void> {
        await apiService.delete(`${this.baseUrl}/pharmacy-orders/${id}`);
    }

    // Refunds
    async getRefundRequests(): Promise<RefundRequest[]> {
        const response = await apiService.get(`${this.baseUrl}/refunds`);
        return (response as any).data || response;
    }

    async updateRefundRequest(id: number, data: Partial<RefundRequest>): Promise<RefundRequest> {
        const response = await apiService.put(`${this.baseUrl}/refunds/${id}`, data);
        return (response as any).data || response;
    }

    async deleteRefundRequest(id: number): Promise<void> {
        await apiService.delete(`${this.baseUrl}/refunds/${id}`);
    }
}

export default new BookingService();
