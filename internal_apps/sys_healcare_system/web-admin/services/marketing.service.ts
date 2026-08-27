import apiService from './api';

export interface Campaign {
    id: number;
    name: string;
    type: string;
    status: string;
    sent: number;
    opened: number;
    clicked: number;
    budget?: string;
}

export interface EmailCampaign {
    id: number;
    subject: string;
    recipients: number;
    sentDate: string;
    openRate: string;
    clickRate: string;
    status: string;
}

export interface Promotion {
    id: number;
    code: string;
    name: string;
    createDate: string;
    endDate?: string;
    systemSource: string;
    link: string;
    type: string;
    key?: string;
    isSystem: boolean;
    updateDate?: string;
    description?: string;
    imageLink?: string;
    videoLink?: string;
    status: string;
    userNameCreate?: string;
    userNameUpdate?: string;
    dynamicLink?: string;
    bannerLandingPage?: string;
}

export interface PushNotification {
    id: number;
    title: string;
    message: string;
    recipients: number;
    sentTime: string;
    delivered: number;
    clicked: number;
    status: string;
}

export interface Voucher {
    id: number;
    code: string;
    name: string;
    discount: string;
    minOrder: string;
    used: number;
    maxUses: number;
    expiry: string;
    status: string;
}

class MarketingService {
    private readonly baseUrl = '/marketing';

    // Campaigns
    async getCampaigns(params?: any): Promise<{ data: Campaign[], meta: any }> {
        const response = await apiService.get(`${this.baseUrl}/campaigns`, { params });
        return response as any;
    }

    async createCampaign(data: Partial<Campaign>): Promise<Campaign> {
        const response = await apiService.post(`${this.baseUrl}/campaigns`, data);
        return (response as any).data || response;
    }

    async updateCampaign(id: number, data: Partial<Campaign>): Promise<Campaign> {
        const response = await apiService.put(`${this.baseUrl}/campaigns/${id}`, data);
        return (response as any).data || response;
    }

    async deleteCampaign(id: number): Promise<void> {
        await apiService.delete(`${this.baseUrl}/campaigns/${id}`);
    }

    // Emails
    async getEmailCampaigns(params?: any): Promise<{ data: EmailCampaign[], meta: any }> {
        const response = await apiService.get(`${this.baseUrl}/emails`, { params });
        return response as any;
    }

    async createEmailCampaign(data: Partial<EmailCampaign>): Promise<EmailCampaign> {
        const response = await apiService.post(`${this.baseUrl}/emails`, data);
        return (response as any).data || response;
    }

    async deleteEmailCampaign(id: number): Promise<void> {
        await apiService.delete(`${this.baseUrl}/emails/${id}`);
    }

    // Promotions
    async getPromotions(params?: any): Promise<{ data: Promotion[], meta: any }> {
        const response = await apiService.get(`${this.baseUrl}/promotions`, { params });
        return response as any;
    }

    async createPromotion(data: Partial<Promotion>): Promise<Promotion> {
        const response = await apiService.post(`${this.baseUrl}/promotions`, data);
        return (response as any).data || response;
    }

    async updatePromotion(id: number, data: Partial<Promotion>): Promise<Promotion> {
        const response = await apiService.put(`${this.baseUrl}/promotions/${id}`, data);
        return (response as any).data || response;
    }

    async deletePromotion(id: number): Promise<void> {
        await apiService.delete(`${this.baseUrl}/promotions/${id}`);
    }

    // Push Notifications
    async getPushNotifications(params?: any): Promise<{ data: PushNotification[], meta: any }> {
        const response = await apiService.get(`${this.baseUrl}/push-notifications`, { params });
        return response as any;
    }

    async createPushNotification(data: Partial<PushNotification>): Promise<PushNotification> {
        const response = await apiService.post(`${this.baseUrl}/push-notifications`, data);
        return (response as any).data || response;
    }

    async deletePushNotification(id: number): Promise<void> {
        await apiService.delete(`${this.baseUrl}/push-notifications/${id}`);
    }

    // Vouchers
    async getVouchers(params?: any): Promise<{ data: Voucher[], meta: any }> {
        const response = await apiService.get(`${this.baseUrl}/vouchers`, { params });
        return response as any;
    }

    async createVoucher(data: Partial<Voucher>): Promise<Voucher> {
        const response = await apiService.post(`${this.baseUrl}/vouchers`, data);
        return (response as any).data || response;
    }

    async updateVoucher(id: number, data: Partial<Voucher>): Promise<Voucher> {
        const response = await apiService.put(`${this.baseUrl}/vouchers/${id}`, data);
        return (response as any).data || response;
    }

    async deleteVoucher(id: number): Promise<void> {
        await apiService.delete(`${this.baseUrl}/vouchers/${id}`);
    }
}

export default new MarketingService();
