import apiService from './api';

export interface BackgroundJob {
    id: number;
    jobType: string;
    jobId: string;
    name: string;
    data: any;
    status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'RETRYING';
    progress: number;
    attempts: number;
    maxAttempts: number;
    error?: string;
    scheduledAt?: string;
    startedAt?: string;
    completedAt?: string;
    createdAt: string;
}

class JobService {
    async getJobs(jobType?: string, status?: string): Promise<BackgroundJob[]> {
        return apiService.get('/v1/background-jobs', { jobType, status });
    }
    
    async getStats(): Promise<any> {
        return apiService.get('/v1/background-jobs/stats');
    }

    async createJob(data: any): Promise<BackgroundJob> {
        return apiService.post('/v1/background-jobs', data);
    }

    async deleteJob(id: number): Promise<void> {
        await apiService.delete(`/v1/background-jobs/${id}`);
    }
}

export default new JobService();
