import apiService from './api';

export interface Seminar {
    id: number;
    title: string;
    date: string;
    location: string;
    capacity: number;
    registrations: number;
    status: string;
}

export interface SeminarBanner {
    id: number;
    seminarId: number;
    image: string;
    priority: number;
    seminar?: Seminar;
}

export interface SeminarAttendee {
    id: number;
    seminarId: number;
    name: string;
    email: string;
    phone: string;
    checkedIn: boolean;
    checkinTime?: string;
    seminar?: Seminar;
}

export interface SeminarInvitation {
    id: number;
    seminarId: number;
    sent: number;
    opened: number;
    registered: number;
    date: string;
    seminar?: Seminar;
}

export interface SeminarSession {
    id: number;
    seminarId: number;
    time: string;
    topic: string;
    speaker: string;
    seminar?: Seminar;
}

export interface SeminarSpeaker {
    id: number;
    name: string;
    title: string;
    photo: string;
    bio?: string;
    seminars: number;
}

class SeminarService {
    private readonly baseUrl = '/seminars';

    // --- Seminars ---
    async getSeminars(params?: any): Promise<{ data: Seminar[], meta: any }> {
        const response = await apiService.get(`${this.baseUrl}`, { params });
        return response as any;
    }

    async getSeminarById(id: number): Promise<Seminar> {
        const response = await apiService.get(`${this.baseUrl}/${id}`);
        return (response as any).data || response;
    }

    async createSeminar(data: Partial<Seminar>): Promise<Seminar> {
        const response = await apiService.post(this.baseUrl, data);
        return (response as any).data || response;
    }

    async updateSeminar(id: number, data: Partial<Seminar>): Promise<Seminar> {
        const response = await apiService.put(`${this.baseUrl}/${id}`, data);
        return (response as any).data || response;
    }

    async deleteSeminar(id: number): Promise<void> {
        await apiService.delete(`${this.baseUrl}/${id}`);
    }

    // --- Banners ---
    async getBanners(params?: any): Promise<{ data: SeminarBanner[], meta: any }> {
        const response = await apiService.get(`${this.baseUrl}/banners`, { params });
        return response as any;
    }

    async createBanner(data: Partial<SeminarBanner>): Promise<SeminarBanner> {
        const response = await apiService.post(`${this.baseUrl}/banners`, data);
        return (response as any).data || response;
    }

    async deleteBanner(id: number): Promise<void> {
        await apiService.delete(`${this.baseUrl}/banners/${id}`);
    }

    // --- Attendees ---
    async getAttendees(params?: any): Promise<{ data: SeminarAttendee[], meta: any }> {
        const response = await apiService.get(`${this.baseUrl}/attendees`, { params });
        return response as any;
    }

    async createAttendee(data: Partial<SeminarAttendee>): Promise<SeminarAttendee> {
        const response = await apiService.post(`${this.baseUrl}/attendees`, data);
        return (response as any).data || response;
    }

    async updateAttendee(id: number, data: Partial<SeminarAttendee>): Promise<SeminarAttendee> {
        const response = await apiService.put(`${this.baseUrl}/attendees/${id}`, data);
        return (response as any).data || response;
    }

    async deleteAttendee(id: number): Promise<void> {
        await apiService.delete(`${this.baseUrl}/attendees/${id}`);
    }

    async getAttendeeStats(seminarId: number): Promise<{ total: number, checkedIn: number }> {
        return await apiService.get(`${this.baseUrl}/attendees/stats/${seminarId}`);
    }

    // --- Invitations ---
    async getInvitations(params?: any): Promise<{ data: SeminarInvitation[], meta: any }> {
        const response = await apiService.get(`${this.baseUrl}/invitations`, { params });
        return response as any;
    }

    async createInvitation(data: Partial<SeminarInvitation>): Promise<SeminarInvitation> {
        const response = await apiService.post(`${this.baseUrl}/invitations`, data);
        return (response as any).data || response;
    }

    // --- Sessions ---
    async getSessions(params?: any): Promise<{ data: SeminarSession[], meta: any }> {
        const response = await apiService.get(`${this.baseUrl}/sessions`, { params });
        return response as any;
    }

    async createSession(data: Partial<SeminarSession>): Promise<SeminarSession> {
        const response = await apiService.post(`${this.baseUrl}/sessions`, data);
        return (response as any).data || response;
    }

    async updateSession(id: number, data: Partial<SeminarSession>): Promise<SeminarSession> {
        const response = await apiService.put(`${this.baseUrl}/sessions/${id}`, data);
        return (response as any).data || response;
    }

    async deleteSession(id: number): Promise<void> {
        await apiService.delete(`${this.baseUrl}/sessions/${id}`);
    }

    // --- Speakers ---
    async getSpeakers(params?: any): Promise<{ data: SeminarSpeaker[], meta: any }> {
        const response = await apiService.get(`${this.baseUrl}/speakers`, { params });
        return response as any;
    }

    async createSpeaker(data: Partial<SeminarSpeaker>): Promise<SeminarSpeaker> {
        const response = await apiService.post(`${this.baseUrl}/speakers`, data);
        return (response as any).data || response;
    }

    async updateSpeaker(id: number, data: Partial<SeminarSpeaker>): Promise<SeminarSpeaker> {
        const response = await apiService.put(`${this.baseUrl}/speakers/${id}`, data);
        return (response as any).data || response;
    }

    async deleteSpeaker(id: number): Promise<void> {
        await apiService.delete(`${this.baseUrl}/speakers/${id}`);
    }
}

export default new SeminarService();
