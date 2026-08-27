import api from './api';
import { JobPosting, JobApplication } from '@/types/job-application';

export const jobsService = {
    // Job Postings
    getJobPostings: async (params?: { pharmacyId?: string; status?: string; type?: string }) => {
        const response = await api.get<JobPosting[]>('/jobs/postings', params);

        return response;
    },

    getJobPosting: async (id: string) => {
        const response = await api.get<JobPosting>(`/jobs/postings/${id}`);
        return response;
    },

    createJobPosting: async (data: any) => {
        const response = await api.post<JobPosting>('/jobs/postings', data);
        return response;
    },

    updateJobPosting: async (id: string, data: any) => {
        const response = await api.put<JobPosting>(`/jobs/postings/${id}`, data);
        return response;
    },

    deleteJobPosting: async (id: string) => {
        const response = await api.delete(`/jobs/postings/${id}`);
        return response;
    },

    // Job Applications
    getJobApplications: async (params?: { jobPostingId?: string; pharmacistId?: string; pharmacyId?: string; status?: string }) => {
        const response = await api.get<JobApplication[]>('/jobs/applications', params);
        return response;
    },

    getJobApplicationStats: async (params?: { pharmacistId?: string; pharmacyId?: string }) => {
        const response = await api.get<any>('/jobs/applications/stats', params);
        return response;
    },

    getJobApplication: async (id: string) => {
        const response = await api.get<JobApplication>(`/jobs/applications/${id}`);
        return response;
    },

    createJobApplication: async (data: any) => {
        const response = await api.post<JobApplication>('/jobs/applications', data);
        return response;
    },

    updateJobApplication: async (id: string, data: any) => {
        const response = await api.put<JobApplication>(`/jobs/applications/${id}`, data);
        return response;
    },

    deleteJobApplication: async (id: string) => {
        const response = await api.delete(`/jobs/applications/${id}`);
        return response;
    }
};
