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
    async getSeminars(): Promise<Seminar[]> {
        const response = await apiService.get(this.baseUrl);
        return (response as any).data || response;
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
    async getBanners(): Promise<SeminarBanner[]> {
        const response = await apiService.get(`${this.baseUrl}/banners`);
        return (response as any).data || response;
    }

    async createBanner(data: Partial<SeminarBanner>): Promise<SeminarBanner> {
        const response = await apiService.post(`${this.baseUrl}/banners`, data);
        return (response as any).data || response;
    }

    async deleteBanner(id: number): Promise<void> {
        await apiService.delete(`${this.baseUrl}/banners/${id}`);
    }

    // --- Attendees ---
    async getAttendees(seminarId?: number): Promise<SeminarAttendee[]> {
        const url = seminarId ? `${this.baseUrl}/attendees?seminarId=${seminarId}` : `${this.baseUrl}/attendees`;
        const response = await apiService.get(url);
        return (response as any).data || response;
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

    // --- Invitations ---
    async getInvitations(): Promise<SeminarInvitation[]> {
        const response = await apiService.get(`${this.baseUrl}/invitations`);
        return (response as any).data || response;
    }

    async createInvitation(data: Partial<SeminarInvitation>): Promise<SeminarInvitation> {
        const response = await apiService.post(`${this.baseUrl}/invitations`, data);
        return (response as any).data || response;
    }

    // --- Sessions ---
    async getSessions(): Promise<SeminarSession[]> {
        const response = await apiService.get(`${this.baseUrl}/sessions`);
        return (response as any).data || response;
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
    async getSpeakers(): Promise<SeminarSpeaker[]> {
        const response = await apiService.get(`${this.baseUrl}/speakers`);
        return (response as any).data || response;
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
